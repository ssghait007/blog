<template>
  <section class="text-gray-600 dark:text-gray-300 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="_filteredPosts.length" class="flex flex-wrap -m-4">
        <div
          v-for="post in _filteredPosts"
          ref="cardRefs"
          :key="post.path"
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
    <div ref="navButton" class="flex justify-center mb-8">
      <button
        class="btn focus:outline-none"
        aria-label="Navigate to blog posts"
        @click="navigate('/blog')"
      >
        ← Back to All Posts
      </button>
    </div>
  </section>
</template>

<script setup>
const { navigate } = useTactileNav()

const cardRefs = ref([])
const navButton = ref(null)

useScrollReveal(cardRefs, { staggerDelay: 40, maxStagger: 6 })
useScrollReveal(navButton)

// Define props
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

// Fetch blog posts for the specific category
const { data: posts } = await useAsyncData(`blog-posts-${props.category}`, () =>
  queryCollection('blog').where('category', '=', props.category).order('createdAt', 'DESC').all()
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

// SEO and structured data for the category page
const CATEGORY_DESCRIPTIONS = {
  Frontend: 'Frontend and web guides by Sachin Ghait: Nuxt blogs, CORS, security headers, CloudFront hosting, WebAssembly and browser extensions.',
  Backend: 'Backend guides by Sachin Ghait: an MCP server with PostgreSQL and Selenium browser automation.',
  Cloud: 'Cloud guides by Sachin Ghait on AWS Lambda in a VPC and cutting GCP VM costs, with real configurations.',
  Developer: 'Developer productivity guides by Sachin Ghait: Git, Go testing, Raspberry Pi, Pi-hole, automation and AI workflow tips.',
}
const categoryPath = `/blog/${props.category.toLowerCase()}`
const categoryPosts = (posts.value || []).filter((post) => post.published)
usePageSeo({
  title: `${props.category} posts | Sachin Ghait`,
  description: CATEGORY_DESCRIPTIONS[props.category] || `${props.category} posts by Sachin Ghait.`,
  path: categoryPath,
})
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${props.category} posts`,
    url: `${SITE_URL}${categoryPath}`,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}${post.path}`,
        name: post.title,
      })),
    },
  },
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: props.category, url: `${SITE_URL}${categoryPath}` },
  ]),
])
</script>
