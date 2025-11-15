<template>
  <article
    ref="card"
    class="shadow-md h-full border border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-md hover:rounded hover:border-purple-500 card-parallax"
    :style="cardTransitionStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <NuxtLink :to="post._path">
      <img
        class="lg:h-48 md:h-36 w-full object-cover object-center"
        :src="post.image"
        :alt="`Featured image for ${post.title}`"
      />
    </NuxtLink>
    <div class="p-6">
      <header>
        <p
          class="tracking-widest text-xs title-font font-medium text-gray-500 dark:text-gray-400 mb-1"
        >
          {{ post.category }}
        </p>
        <h2>
          <NuxtLink
            :to="post._path"
            class="text-indigo-500 hover:text-indigo-900 block items-center md:mb-2 lg:mb-0"
          >
            <span
              class="title-font text-lg text-left font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {{ post.title }}
            </span>
          </NuxtLink>
        </h2>
      </header>
      <p class="leading-relaxed text-left text-gray-700 dark:text-gray-200">
        {{ post.description }}
      </p>

      <footer>
        <ul
          class="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium list-none"
          role="list"
        >
          <li
            v-for="tag in post.tags"
            :key="tag"
            class="m-1 px-2 py-1 rounded bg-green-500"
          >
            {{ "#" + tag.toUpperCase() }}
          </li>
          <li
            v-if="post && post.proficiency"
            class="m-1 px-2 py-1 rounded bg-blue-500"
          >
            {{ "#" + post.proficiency.toUpperCase() }}
          </li>
        </ul>
        <div class="flex items-center mt-2 flex-wrap text-left">
          <NuxtLink
            :to="`/authors/${
              _authorData?.slug ||
              post.author.toLowerCase().replace(/\s+/g, '-')
            }`"
          >
            <img
              class="w-10 h-10 object-cover rounded-full hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer"
              :alt="`${post.author} avatar`"
              :src="
                _authorData?.avatar ||
                'https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p'
              "
            />
          </NuxtLink>
          <div class="pl-2">
            <NuxtLink
              :to="`/authors/${
                _authorData?.slug ||
                post.author.toLowerCase().replace(/\s+/g, '-')
              }`"
              class="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {{ post.author }}
            </NuxtLink>
            <div class="text-gray-700 dark:text-gray-300 text-xs">
              {{ _authorData?.title || post.authorTitle }}
            </div>
          </div>
          <div class="ml-auto text-center text-gray-900 dark:text-gray-100">
            <div class="font-medium text-xs">{{ post.readingTime }}</div>
            <div class="text-gray-700 dark:text-gray-300 text-xs">
              {{ _formatDate(post.createdAt) }}
            </div>
          </div>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { format } from 'date-fns'
import { useParallax } from '@vueuse/core'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

// Get cached author data
const { getCachedAuthor } = useAuthorCache()
const _authorData = computed(() => getCachedAuthor(props.post.author))

const _formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy')
}

// Parallax effect for this card
const card = ref()
const isHovered = ref(false)
const { tilt, roll } = useParallax(card)

// Transition style for non-parallax properties
const cardTransitionStyle = computed(() => ({
  transition: 'box-shadow 0.3s, border-color 0.3s',
}))

// Mouse event handlers
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  // Reset transform when mouse leaves
  if (card.value && import.meta.client) {
    card.value.style.transform = ''
    card.value.style.transformStyle = ''
  }
}

// Apply styles dynamically only when hovered - NO transition for snappy response
watch([tilt, roll], () => {
  if (card.value && import.meta.client && isHovered.value) {
    const tiltValue = tilt.value * 10
    const rollValue = roll.value * 10

    card.value.style.transform = `perspective(1000px) rotateX(${rollValue}deg) rotateY(${tiltValue}deg) translateZ(0)`
    card.value.style.transformStyle = 'preserve-3d'
    card.value.style.transition = 'none' // No transition for instant parallax response
  }
})
</script>

<style scoped>
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .card-parallax {
    transform: none !important;
    transition: none !important;
  }

  .card-parallax:hover {
    transform: none !important;
  }
}
</style>
