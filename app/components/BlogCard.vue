<template>
  <article
    class="card-wrapper h-full rounded-2xl overflow-hidden border border-black/[0.06] bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-white/[0.06] dark:shadow-none dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] flex flex-col"
  >
    <NuxtLink :to="post.path" class="block">
      <!-- Image with gradient overlay and floating badges -->
      <div class="card-image relative h-48 md:h-36 lg:h-48 overflow-hidden">
        <img
          class="w-full h-full object-cover object-center transition-transform duration-400 ease-out"
          :src="post.image"
          :alt="`Featured image for ${post.title}`"
        />
        <!-- Gradient overlay for badge readability -->
        <div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
        <!-- Floating badges -->
        <div class="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
          <span class="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide text-indigo-600 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 dark:text-indigo-400">
            {{ post.category }}
          </span>
          <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm">
            {{ post.readingTime }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <div class="p-6 flex flex-col flex-1">
      <!-- Title — 2-line clamp -->
      <h2>
        <NuxtLink
          :to="post.path"
          class="block"
        >
          <span
            class="text-lg font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
          >
            {{ post.title }}
          </span>
        </NuxtLink>
      </h2>

      <!-- Description — 3-line clamp -->
      <p class="mt-2.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
        {{ post.description }}
      </p>

      <!-- Tags — lowercase, soft indigo pills -->
      <ul
        class="flex flex-wrap gap-1.5 mt-5 mb-5 list-none"
        role="list"
      >
        <li
          v-for="tag in post.tags"
          :key="tag"
          class="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-500/15 dark:text-indigo-300"
        >
          {{ tag }}
        </li>
        <li
          v-if="post && post.proficiency"
          class="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-500/15 dark:text-indigo-300"
        >
          {{ post.proficiency }}
        </li>
      </ul>

      <!-- Footer -->
      <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <!-- Author -->
        <div class="flex items-center gap-2.5">
          <NuxtLink
            :to="`/authors/${
              _authorData?.slug ||
              post.author.toLowerCase().replace(/\s+/g, '-')
            }`"
          >
            <img
              class="w-9 h-9 object-cover rounded-full hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer"
              :alt="`${post.author} avatar`"
              :src="
                _authorData?.avatar ||
                'https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p'
              "
            />
          </NuxtLink>
          <div>
            <NuxtLink
              :to="`/authors/${
                _authorData?.slug ||
                post.author.toLowerCase().replace(/\s+/g, '-')
              }`"
              class="block text-[13px] font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
            >
              {{ post.author }}
            </NuxtLink>
            <div class="text-[11px] text-gray-400 dark:text-gray-500">
              {{ _authorData?.title || post.authorTitle }}
            </div>
          </div>
        </div>

        <!-- Date + Freshness -->
        <div class="text-right">
          <div class="text-xs font-medium text-gray-400">
            {{ _formatDate(post.createdAt) }}
          </div>
          <FreshnessBadge :date="post.updatedAt || post.createdAt" />
        </div>
      </div>
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
</script>

<style scoped>
/* Fix Safari/Chrome bug where border-radius jumps to square during transition */
.card-wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
}
.card-wrapper:hover .card-image img {
  transform: scale(1.03);
}
</style>
