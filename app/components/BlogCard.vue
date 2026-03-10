<template>
  <article
    ref="card"
    class="shadow-md h-full border border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-md hover:rounded hover:border-purple-500"
    :style="cardStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <NuxtLink :to="post.path">
      <img
        class="lg:h-48 md:h-36 w-full object-cover object-center"
        :src="post.image"
        :alt="`Featured image for ${post.title}`"
      />
    </NuxtLink>
    <div class="p-6">
      <header>
        <div class="flex justify-between items-center mb-1">
          <p
            class="tracking-widest text-xs title-font font-medium text-gray-500 dark:text-gray-400"
          >
            {{ post.category }}
          </p>
          <FreshnessBadge :date="post.updatedAt || post.createdAt" />
        </div>
        <h2>
          <NuxtLink
            :to="post.path"
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
  return format(new Date(date), 'MMM d, yyyy')
}

// Parallax — only active on the card being hovered, rAF throttled
const card = ref()
const cardStyle = ref({})
let rafId = null

const handleMouseMove = (e) => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const rect = card.value.getBoundingClientRect()
    const tilt = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const roll = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    cardStyle.value = {
      transform: `perspective(1000px) rotateX(${roll}deg) rotateY(${tilt}deg) translateZ(0)`,
      transformStyle: 'preserve-3d',
      transition: 'none',
    }
  })
}

const handleMouseLeave = () => {
  if (rafId) cancelAnimationFrame(rafId)
  cardStyle.value = { transition: 'transform 0.3s ease' }
  nextTick(() => { cardStyle.value = {} })
}
</script>

