<template>
  <section ref="container" class="text-gray-700 dark:text-gray-200 body-font" aria-label="Blog posts">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="filteredPosts.length" class="flex flex-wrap -m-4" role="list">
        <article
          v-for="post in filteredPosts"
          :key="post._path"
          class="p-4 md:w-1/3"
          role="listitem"
        >
          <BlogCard 
            :post="post"
            :card-ref="el => cardRefs[post._path] = el"
          />
        </article>
      </div>
      <div v-else class="flex flex-wrap -m-4 text-gray-900 dark:text-gray-100" role="status">
        No posts in this section
      </div>
    </div>
    <nav class="flex justify-center mb-8" aria-label="Site navigation">
      <NuxtLink to="/">
        <button class="btn focus:outline-none" aria-label="Navigate to home page">To Home</button>
      </NuxtLink>
    </nav>
  </section>
</template>

<script setup>
import { useParallax } from "@vueuse/core";

// Fetch all blog posts sorted by creation date (newest first)
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('blog').sort({ createdAt: -1 }).find()
)


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
