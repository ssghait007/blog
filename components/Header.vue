<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <NuxtLink
          class="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          to="/"
        >
          <div class="relative">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5 text-white"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
          <span class="text-xl font-semibold tracking-tight">Sachin Ghait</span>
        </NuxtLink>

        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md mx-8" role="search">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="search"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
              placeholder="Search articles..."
              aria-label="Search articles"
            >
          </div>

          <!-- Search Results -->
          <div v-if="searchResults.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-80 overflow-y-auto z-50" aria-live="polite" aria-label="Search results">
            <div
              v-for="article of searchResults"
              :key="article._path"
              class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors duration-150"
              @click="onClick(article._path)"
            >
              <div class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ article.title }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{{ article.description }}</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav id="navigation" class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="category in categories"
            :key="category"
            class="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors duration-200 relative group"
            :to="`/blog/${category.toLowerCase()}`"
            :aria-current="$route.path === `/blog/${category.toLowerCase()}` ? 'page' : undefined"
          >
            {{ category }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"/>
          </NuxtLink>
          
          <!-- Dark Mode Toggle -->
          <DarkModeToggle />
        </nav>

        <!-- Mobile Menu Button and Dark Mode Toggle -->
        <div class="md:hidden flex items-center space-x-2">
          <DarkModeToggle />
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            :aria-expanded="mobileMenuOpen"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
        <div class="flex flex-col space-y-3">
          <NuxtLink
            v-for="category in categories"
            :key="category"
            class="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1"
            :to="`/blog/${category.toLowerCase()}`"
            :aria-current="$route.path === `/blog/${category.toLowerCase()}` ? 'page' : undefined"
            @click="mobileMenuOpen = false"
          >
            {{ category }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const router = useRouter()

const search = ref('')
const mobileMenuOpen = ref(false)
const categories = ['Frontend', 'Backend', 'Cloud', 'Developer']

// Initialize dark mode
const { initDarkMode } = useDarkMode()
onMounted(() => {
  initDarkMode()
})

// Fetch all blog posts for search
const { data: allPosts } = await useAsyncData('all-blog-posts', () =>
  queryContent('blog').find()
)

const onClick = (slug) => {
  search.value = ''
  router.push(slug)
}

// Computed property for search results
const searchResults = computed(() => {
  if (!search.value || !allPosts.value) return []

  const searchTerm = search.value.toLowerCase()

  return allPosts.value
    .filter((post) => {
      // Only show published posts (unless in development mode)
      const show = import.meta.client ? localStorage.getItem('show') : null
      if (!show && !post.published) return false

      // Search in title and description
      return (
        post.title?.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      )
    })
    .slice(0, 5) // Limit to 5 results
    .sort((a, b) => {
      // Sort by creation date (newest first)
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB - dateA
    })
})

// Close mobile menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (mobileMenuOpen.value && !event.target.closest('header')) {
      mobileMenuOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
