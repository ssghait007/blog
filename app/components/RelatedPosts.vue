<template>
  <nav v-if="related.length" class="not-prose my-10" aria-label="Related posts">
    <h2 class="text-left text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Related posts</h2>
    <ul class="space-y-4 text-left">
      <li v-for="post in related" :key="post.path" class="flex gap-4 items-start">
        <NuxtLink :to="post.path" class="shrink-0" tabindex="-1" aria-hidden="true">
          <img
            :src="post.image"
            alt=""
            width="96"
            height="64"
            loading="lazy"
            decoding="async"
            class="w-24 h-16 object-cover rounded-md bg-gray-200 dark:bg-gray-700"
          >
        </NuxtLink>
        <div>
          <NuxtLink :to="post.path" class="font-medium text-gray-900 dark:text-gray-100 hover:underline">
            {{ post.title }}
          </NuxtLink>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ post.description }}</p>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPath: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  category: { type: String, default: '' },
})

const { data: posts } = await useAsyncData(`related-${props.currentPath}`, () =>
  queryCollection('blog')
    .where('published', '=', true)
    .select('path', 'title', 'description', 'image', 'tags', 'category', 'createdAt')
    .all()
)

// Rank by shared tags, then same category, then recency
const related = computed(() =>
  (posts.value || [])
    .filter((post) => post.path !== props.currentPath)
    .map((post) => ({
      ...post,
      score:
        post.tags.filter((tag) => props.tags.includes(tag)).length * 2 +
        (post.category === props.category ? 1 : 0),
    }))
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score || b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4)
)
</script>
