<template>
  <section
    class="text-gray-700 dark:text-gray-200 body-font"
    aria-label="Blog posts"
  >
    <div class="container px-5 py-12 mx-auto">
      <div v-if="_filteredPosts.length" class="flex flex-wrap -m-4" role="list">
        <article
          v-for="post in _filteredPosts"
          :key="post._path"
          class="p-4 md:w-1/3"
          role="listitem"
        >
          <BlogCard :post="post" />
        </article>
      </div>
      <div
        v-else
        class="flex flex-wrap -m-4 text-gray-900 dark:text-gray-100"
        role="status"
      >
        No posts in this section
      </div>
    </div>
    <nav class="flex justify-center mb-8" aria-label="Site navigation">
      <NuxtLink to="/">
        <button
          class="btn focus:outline-none"
          aria-label="Navigate to home page"
        >
          To Home
        </button>
      </NuxtLink>
    </nav>
  </section>
</template>

<script setup>
// Fetch all blog posts sorted by creation date (newest first)
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('blog').sort({ createdAt: -1 }).find()
)

// Preload all unique authors to prevent duplicate fetches
const { preloadAuthors } = useAuthorCache()
await useAsyncData('preload-authors', async () => {
  if (posts.value) {
    const authorNames = posts.value.map((post) => post.author).filter(Boolean)
    await preloadAuthors(authorNames)
  }
  return true
})

// Filter posts based on published status and ensure they remain sorted
const _filteredPosts = computed(() => {
  if (!posts.value) {
    return []
  }

  // Check if we should show unpublished posts (for development)
  const show = import.meta.client ? localStorage.getItem('show') : null
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
</script>
