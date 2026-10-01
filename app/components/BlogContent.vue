<template>
  <section
    class="text-gray-700 dark:text-gray-200 body-font"
    aria-label="Blog posts"
  >
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter posts by category">
          <button
            v-for="chip in categoryChips"
            :key="chip.name"
            type="button"
            class="px-3 py-1.5 rounded-full text-sm border transition-colors"
            :class="
              activeCategory === chip.name
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'
            "
            :aria-pressed="activeCategory === chip.name"
            @click="activeCategory = chip.name"
          >
            {{ chip.name }} <span class="opacity-70">({{ chip.count }})</span>
          </button>
        </div>
        <label class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          Sort by
          <select
            v-model="sortBy"
            class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A to Z</option>
            <option value="shortest">Shortest read</option>
          </select>
        </label>
      </div>
      <p class="sr-only" aria-live="polite">{{ _filteredPosts.length }} posts shown</p>
      <div v-if="_filteredPosts.length" class="flex flex-wrap -m-4" role="list">
        <article
          v-for="post in _filteredPosts"
          ref="cardRefs"
          :key="post.path"
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
    <nav ref="navButton" class="flex justify-center mb-8" aria-label="Site navigation">
      <button
        class="btn focus:outline-none"
        aria-label="Navigate to home page"
        @click="navigate('/')"
      >
        To Home
      </button>
    </nav>
  </section>
</template>

<script setup>
const { navigate } = useTactileNav()

const cardRefs = ref([])
const navButton = ref(null)

useScrollReveal(cardRefs, { staggerDelay: 40, maxStagger: 6 })
useScrollReveal(navButton)

// Fetch all blog posts sorted by creation date (newest first)
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('createdAt', 'DESC').all()
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

// Visible (published) posts, unless the dev override is set
const visiblePosts = computed(() => {
  if (!posts.value) {
    return []
  }
  const show = import.meta.client ? localStorage.getItem('show') : null
  return show ? posts.value : posts.value.filter((post) => post.published)
})

// Category chips with counts, plus the active filter and sort (kept in the URL)
const route = useRoute()
const router = useRouter()
const activeCategory = ref('All')
const sortBy = ref('newest')

const categoryChips = computed(() => {
  const counts = new Map()
  for (const post of visiblePosts.value) {
    counts.set(post.category, (counts.get(post.category) || 0) + 1)
  }
  return [
    { name: 'All', count: visiblePosts.value.length },
    ...[...counts.entries()].sort().map(([name, count]) => ({ name, count })),
  ]
})

const minutesOf = (post) => Number.parseInt(post.readingTime, 10) || 0

const _filteredPosts = computed(() => {
  const list = visiblePosts.value.filter(
    (post) => activeCategory.value === 'All' || post.category === activeCategory.value
  )
  const sorters = {
    newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    title: (a, b) => a.title.localeCompare(b.title),
    shortest: (a, b) => minutesOf(a) - minutesOf(b),
  }
  return [...list].sort(sorters[sortBy.value] || sorters.newest)
})

// Read filters from the URL after hydration, and keep the URL in sync
onMounted(() => {
  const { category, sort } = route.query
  if (typeof category === 'string' && categoryChips.value.some((chip) => chip.name === category)) {
    activeCategory.value = category
  }
  if (typeof sort === 'string') {
    sortBy.value = sort
  }
  watch([activeCategory, sortBy], () => {
    router.replace({
      query: {
        ...(activeCategory.value !== 'All' ? { category: activeCategory.value } : {}),
        ...(sortBy.value !== 'newest' ? { sort: sortBy.value } : {}),
      },
    })
  })
})

// SEO and structured data for the blog index
const publishedPosts = (posts.value || []).filter((post) => post.published)
usePageSeo({
  title: 'Blog: cloud, DevOps, security and automation guides | Sachin Ghait',
  description:
    'All posts by Sachin Ghait: tested how-tos on AWS, GCP, Git, web security, Raspberry Pi, automation and AI tooling.',
  path: '/blog',
})
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: `${SITE_NAME}: all posts`,
    url: `${SITE_URL}/blog`,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    blogPost: publishedPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}${post.path}`,
      datePublished: post.createdAt,
    })),
  },
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ]),
])
</script>
