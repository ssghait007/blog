<template>
  <aside
    v-if="author"
    class="not-prose text-left my-10 rounded-lg border border-gray-200 dark:border-gray-700 p-5 flex gap-4 items-start"
    aria-label="About the author"
  >
    <img
      :src="author.avatar"
      :alt="`Photo of ${author.name}`"
      width="56"
      height="56"
      loading="lazy"
      class="rounded-full w-14 h-14 object-cover"
    >
    <div class="text-sm text-gray-600 dark:text-gray-300">
      <p class="font-semibold text-gray-900 dark:text-gray-100">
        Written by
        <NuxtLink :to="`/authors/${author.slug}`" rel="author" class="hover:underline">{{ author.name }}</NuxtLink>
        <span class="font-normal text-gray-500 dark:text-gray-400">, {{ author.title }}</span>
      </p>
      <p class="mt-1 leading-relaxed">{{ author.bio }}</p>
      <p class="mt-2 flex gap-4">
        <a v-if="author.social?.github" :href="`https://github.com/${author.social.github}`" rel="me noopener" class="hover:underline">GitHub</a>
        <a v-if="author.social?.linkedin" :href="`https://www.linkedin.com/in/${author.social.linkedin}`" rel="me noopener" class="hover:underline">LinkedIn</a>
      </p>
      <p v-if="verified" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Last reviewed <time :datetime="verified">{{ reviewed }}</time>
      </p>
    </div>
  </aside>
</template>

<script setup>
import { format } from 'date-fns'

const props = defineProps({
  authorName: { type: String, required: true },
  verified: { type: String, default: '' },
})

const { data: author } = await useAsyncData(`author-box-${props.authorName}`, () =>
  queryCollection('authors').where('name', '=', props.authorName).first()
)

const reviewed = computed(() => (props.verified ? format(new Date(props.verified), 'MMM d, yyyy') : ''))
</script>
