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
      <h1
        v-if="data"
        class="lg:w-4/6 md:w-5/6 w-full text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
      >
        {{ data.title }}
      </h1>

      <div v-if="data" class="lg:w-4/6 md:w-5/6 w-full flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
        <NuxtLink
          :to="`/authors/${authorSlugOf(data.author)}`"
          rel="author"
          class="hover:underline"
        >
          {{ data.author }}
        </NuxtLink>
        <span>&middot;</span>
        <time :datetime="data.createdAt">{{ _formatDate(data.createdAt) }}</time>
        <span>&middot;</span>
        <span>{{ data.readingTime }}</span>
        <FreshnessBadge v-if="data.createdAt" :date="data.updatedAt || data.createdAt" variant="detailed" />
      </div>

      <img
        v-if="data?.image"
        ref="heroImage"
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-8 max-h-[28rem] object-cover object-center rounded"
        :alt="data.title"
        :src="data.image"
      >


      <div class="lg:w-4/6 md:w-5/6 w-full">
        <ClientOnly>
          <TextToSpeech :audio-src="data?.audioSrc" />
        </ClientOnly>
      </div>

      <div v-if="data?.toc?.links?.length > 0" class="lg:mt-16 mb-8">
        <LazyInteractiveTableOfContents :toc-data="data.toc.links" />
      </div>

      <div class="lg:w-4/6 md:w-5/6 w-full m-auto">
        <ClientOnly>
          <ReadingModeToggle
            :description="data?.description"
            :toc="data?.toc?.links"
          >
            <ContentRenderer
              v-if="data"
              :value="data"
              class="prose dark:prose-invert max-w-none text-left"
              :data-pagefind-body="data.published ? '' : undefined"
            />
          </ReadingModeToggle>
          <template #fallback>
            <ContentRenderer
              v-if="data"
              :value="data"
              class="prose dark:prose-invert max-w-none text-left"
              :data-pagefind-body="data.published ? '' : undefined"
            />
          </template>
        </ClientOnly>

        <AuthorBox v-if="data" :author-name="data.author" :verified="data.updatedAt || data.createdAt" />
        <RelatedPosts v-if="data" :current-path="data.path" :tags="data.tags" :category="data.category" />

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

const { data: authorRecord } = await useAsyncData(`post-author-${slug}`, () =>
  data.value ? queryCollection('authors').where('name', '=', data.value.author).first() : null
)

// Track reading history
const { trackVisit } = useReadingHistory()
onMounted(() => {
  if (data.value) trackVisit(data.value)
})

// Set SEO meta tags and structured data
if (data.value) {
  const post = data.value
  const postUrl = `${SITE_URL}${route.path.replace(/\/$/, '')}`
  const ogImageUrl = post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`

  usePageSeo({
    title: post.title,
    description: post.description,
    path: route.path.replace(/\/$/, ''),
    image: ogImageUrl,
    type: 'article',
  })
  useSeoMeta({
    robots: post.published ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    articlePublishedTime: post.createdAt,
    articleModifiedTime: post.updatedAt || post.createdAt,
    articleAuthor: [post.author],
    articleSection: post.category,
    articleTag: post.tags,
  })

  const person = authorRecord.value
    ? personSchema(authorRecord.value)
    : {
        '@type': 'Person',
        name: post.author,
        jobTitle: post.authorTitle,
        url: `${SITE_URL}/authors/${authorSlugOf(post.author)}`,
      }

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: ogImageUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: person,
    publisher: publisherSchema(),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    articleSection: post.category,
    keywords: post.tags,
    inLanguage: 'en',
    wordCount: wordCountOf(post.body),
    timeRequired: isoDurationOf(post.readingTime),
    abstract: post.description,
    proficiencyLevel: post.proficiency,
  }

  useHead({
    link: [{ rel: 'alternate', type: 'text/markdown', href: `${postUrl}.md` }],
  })

  useJsonLd([
    blogPostingSchema,
    faqSchema(post.body),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.category, url: `${SITE_URL}/blog/${post.category.toLowerCase()}` },
      { name: post.title, url: postUrl },
    ]),
  ])
}

// Handle 404 if post not found
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
  })
}
</script>

