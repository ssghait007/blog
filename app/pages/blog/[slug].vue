<template>
  <div>
    <ReadingProgress />
    <section class="text-gray-600 dark:text-gray-300 body-font">
    <div ref="backButton" class="flex justify-center md:ml-10 p-5 sm:ml-0">
      <button class="btn focus:outline-none" aria-label="Navigate to blog posts" @click="navigate('/blog')">&larr; Back</button>
    </div>

    <div
      class="text-left container mx-auto flex flex-col px-5 py-0 justify-center items-center"
    >
      <img
        v-if="data?.image"
        ref="heroImage"
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="data.image"
      >

      <div v-if="data" class="lg:w-4/6 md:w-5/6 w-full flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
        <span>{{ data.author }}</span>
        <span>&middot;</span>
        <span>{{ _formatDate(data.createdAt) }}</span>
        <span>&middot;</span>
        <span>{{ data.readingTime }}</span>
        <FreshnessBadge v-if="data.createdAt" :date="data.updatedAt || data.createdAt" variant="detailed" />
      </div>

      <div class="lg:w-4/6 md:w-5/6 w-full">
        <ClientOnly>
          <TextToSpeech :audio-src="data?.audioSrc" />
        </ClientOnly>
      </div>

      <div v-if="data?.toc?.links?.length > 0" class="lg:mt-16 mb-8">
        <LazyInteractiveTableOfContents :toc-data="data.toc.links" />
      </div>

      <div class="lg:w-4/6 md:w-5/6 w-full m-auto">
        <ContentRenderer
          v-if="data"
          :value="data"
          class="prose dark:prose-invert max-w-none text-left"
          data-pagefind-body
        />

        <ClientOnly>
          <GiscusComments />
        </ClientOnly>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
const { navigate } = useTactileNav()

const backButton = ref(null)
const heroImage = ref(null)

useScrollReveal([backButton, heroImage], { staggerDelay: 50 })

import { format } from 'date-fns'

const _formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM d, yyyy')
}

const route = useRoute()
const slug = route.params.slug

// Fetch the blog post content
const { data } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

// Track reading history
const { trackVisit } = useReadingHistory()
onMounted(() => {
  if (data.value) trackVisit(data.value)
})

// Set SEO meta tags
if (data.value) {
  useSeoMeta({
    title: data.value.title,
    description: data.value.description,
    ogType: 'article',
    ogTitle: data.value.title,
    ogDescription: data.value.description,
    ogImage: data.value.image,
  })
}

// Handle 404 if post not found
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
  })
}
</script>

