<template>
  <section class="text-gray-600 dark:text-gray-300 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="_filteredPosts.length" class="flex flex-wrap -m-4">
        <div
          v-for="post in _filteredPosts"
          :key="post._path"
          class="p-4 md:w-1/3"
        >
          <BlogCard :post="post" />
        </div>
      </div>
      <div v-else class="flex flex-wrap -m-4 text-gray-900 dark:text-gray-100">
        <div class="text-center w-full">
          <h2
            class="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4"
          >
            No {{ category }} posts found
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Check back later for new {{ category.toLowerCase() }} content!
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center mb-8">
      <NuxtLink to="/blog">
        <button
          class="btn focus:outline-none"
          aria-label="Navigate to blog posts"
        >
          ← Back to All Posts
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
// Define props
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

// Fetch blog posts for the specific category
const { data: posts } = await useAsyncData(`blog-posts-${props.category}`, () =>
  queryContent('blog')
    .where({ category: props.category })
    .sort({ createdAt: -1 })
    .find()
)

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
