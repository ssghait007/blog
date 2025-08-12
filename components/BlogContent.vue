<template>
  <section ref="container" class="text-gray-600 dark:text-gray-300 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="filteredPosts.length" class="flex flex-wrap -m-4">
        <div
          v-for="post in filteredPosts"
          :key="post._path"
          class="p-4 md:w-1/3"
        >
          <div
            :ref="el => cardRefs[post._path] = el"
            class="shadow-md h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-md hover:rounded hover:border-purple-300 transition duration-300 transform hover:-translate-y-3 card-parallax"

          >
            <NuxtLink :to="post._path">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                :src="post.image"
                alt="blog"
              />
            </NuxtLink>
            <div class="p-6">
              <h2
                class="tracking-widest text-xs title-font font-medium text-gray-500 dark:text-gray-400 mb-1"
              >
                {{ post.category }}
              </h2>
              <NuxtLink
                :to="post._path"
                class="text-indigo-500 hover:text-indigo-900 block items-center md:mb-2 lg:mb-0"
              >
                <h1
                  class="title-font text-lg text-left font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {{ post.title }}
                </h1>
              </NuxtLink>
              <p class="leading-relaxed text-left text-gray-600 dark:text-gray-300">
                {{ post.description }}
              </p>

              <div
                class="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium"
              >
                <a
                  v-for="tag in post.tags"
                  :key="tag"
                  class="m-1 px-2 py-1 rounded bg-green-500"
                >
                  {{ "#" + tag.toUpperCase() }}
                </a>
                <a
                  v-if="post && post.proficiency"
                  class="m-1 px-2 py-1 rounded bg-blue-500"
                >
                  {{ "#" + post.proficiency.toUpperCase() }}
                </a>
              </div>
              <div class="flex items-center mt-2 flex-wrap text-left">
                <img
                  class="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p"
                />
                <div class="pl-2">
                  <div class="font-medium">{{ post.author }}</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">
                    {{ post.authorTitle }}
                  </div>
                </div>
                <div class="ml-auto text-center text-gray-900 dark:text-gray-100">
                  <div class="font-medium text-xs">{{ post.readingTime }}</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">
                    {{ formatDate(post.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-wrap -m-4 text-gray-900 dark:text-gray-100">No posts in this section</div>
    </div>
    <div class="flex justify-center mb-8">
      <NuxtLink to="/">
        <button class="btn focus:outline-none" aria-label="Navigate to home page">To Home</button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { format } from "date-fns";
import { useParallax } from "@vueuse/core";

// Fetch all blog posts sorted by creation date (newest first)
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('blog').sort({ createdAt: -1 }).find()
)

// Format date function
const formatDate = (date) => {
  return format(new Date(date), "dd MMM yyyy");
}

// Filter posts based on published status and ensure they remain sorted
const filteredPosts = computed(() => {
  if (!posts.value) return []

  // Check if we should show unpublished posts (for development)
  const show = import.meta.client ? localStorage.getItem("show") : null
  let filtered = []

  if (show) {
    filtered = posts.value
  } else {
    filtered = posts.value.filter((post) => post.published)
  }

  // Sort by createdAt in descending order (newest first)
  return filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateB - dateA
  })
})

// Store card element refs
const cardRefs = ref({});

// Container for parallax effect
const container = ref();
const { tilt, roll } = useParallax(container);

// Apply parallax effect to all cards
const applyParallax = () => {
  if (import.meta.client) {
    Object.values(cardRefs.value).forEach((card) => {
      if (card) {
        const tiltValue = tilt.value * 10;
        const rollValue = roll.value * 10;

        card.style.transform = `perspective(1000px) rotateX(${rollValue}deg) rotateY(${tiltValue}deg) translateZ(0)`;
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.1s ease-out';
      }
    });
  }
};

// Watch for changes in tilt and roll
watch([tilt, roll], applyParallax);

// Initialize on mount
onMounted(() => {
  if (import.meta.client) {
    nextTick(() => {
      applyParallax();
    });
  }
});
</script>
