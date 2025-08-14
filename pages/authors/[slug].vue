<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Author Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Author Avatar -->
          <div class="flex-shrink-0">
            <img
              :src="author.avatar"
              :alt="`${author.name} avatar`"
              class="w-32 h-32 rounded-full object-cover border border-indigo-500"
            >
          </div>

          <!-- Author Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ author.name }}
            </h1>
            <p class="text-xl text-indigo-600 dark:text-indigo-400 mb-4">
              {{ author.title }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ author.bio }}
            </p>

            <!-- Author Details -->
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div v-if="author.location" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ author.location }}
              </div>
              <div v-if="author.joinedDate" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                Joined {{ formatDate(author.joinedDate) }}
              </div>
            </div>

            <!-- Social Links -->
            <div v-if="author.social" class="flex justify-center md:justify-start gap-4">
              <a
                v-if="author.social.github"
                :href="`https://github.com/${author.social.github}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                v-if="author.social.twitter"
                :href="`https://twitter.com/${author.social.twitter.replace('@', '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                v-if="author.social.linkedin"
                :href="`https://linkedin.com/in/${author.social.linkedin}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                v-if="author.website"
                :href="author.website"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Specialties -->
      <div v-if="author.specialties && author.specialties.length" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Specialties</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="specialty in author.specialties"
            :key="specialty"
            class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
          >
            {{ specialty }}
          </span>
        </div>
      </div>

      <!-- Author Content -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <ContentRenderer :value="author" class="prose dark:prose-invert max-w-none" />
      </div>

      <!-- Author's Posts -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Posts by {{ author.name }}</h2>
        <div v-if="authorPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in authorPosts"
            :key="post._path"
            class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <NuxtLink :to="post._path">
              <img
                v-if="post.image"
                :src="post.image"
                :alt="`Featured image for ${post.title}`"
                class="w-full h-48 object-cover"
              >
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {{ post.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {{ post.description }}
                </p>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(post.createdAt) }} • {{ post.readingTime }}
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
        <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
          No posts found by this author yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'

const route = useRoute()
const slug = route.params.slug

// Fetch author data
const { data: author } = await useAsyncData(`author-${slug}`, () =>
  queryContent('authors').where({ slug }).findOne()
)

// Handle 404 if author not found
if (!author.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Author not found',
  })
}

// Fetch author's posts
const { data: authorPosts } = await useAsyncData(`author-posts-${slug}`, () =>
  queryContent('blog').where({ author: author.value.name }).find()
)

// SEO
useSeoMeta({
  title: `${author.value.name} - Author Profile`,
  description: author.value.bio,
  ogTitle: `${author.value.name} - Author Profile`,
  ogDescription: author.value.bio,
  ogImage: author.value.avatar,
  twitterCard: 'summary',
  twitterTitle: `${author.value.name} - Author Profile`,
  twitterDescription: author.value.bio,
  twitterImage: author.value.avatar,
})

const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy')
}
</script>
