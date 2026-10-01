<template>
  <div>
    <section class="text-gray-600 dark:text-gray-300 body-font">
      <div
        class="hero-container container mx-auto flex px-5 py-12 md:flex-row flex-col items-center"
      >
        <div
          class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1
            ref="heroHeadline"
            class="headline sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-100"
          >
            Learning daily, growing endlessly,
            <span class="underline">sharing</span> proudly.
          </h1>
          <p ref="heroText" class="descriptive-text mb-8 leading-relaxed dark:text-gray-300">
            A shared space for documenting growth, celebrating experiments, and
            meeting those driven by curiosity and creativity.
          </p>
          <div ref="heroButton" class="flex justify-center">
            <button
              class="btn focus:outline-none"
              aria-label="Navigate to blog posts"
              @click="navigate('/blog')"
            >
              Explore
            </button>
          </div>
        </div>
        <div ref="heroImage" class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            class="object-cover object-center rounded-md"
            alt="Hand-drawn illustration of a person learning and sharing developer knowledge"
            src="/assets/hand-drawn.webp"
            width="700"
            height="394"
          />
        </div>
      </div>
    </section>
    <section class="max-w-6xl mx-auto px-5 pb-12 text-left text-gray-600 dark:text-gray-300" aria-labelledby="about-blog">
      <h2 id="about-blog" class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        What this blog covers
      </h2>
      <p class="leading-relaxed max-w-3xl mb-4">
        I'm <NuxtLink to="/authors/sachin-ghait" class="underline">Sachin Ghait</NuxtLink>, a lead developer. Since
        2021 I've written down what I learn while building and fixing things: tested, step-by-step guides on cloud
        (AWS, GCP), DevOps, web security, Git, Raspberry Pi projects, automation and AI tooling. Each post opens with a
        short summary, lists its sources and shows when it was last updated.
      </p>
      <ul class="space-y-2 max-w-3xl mb-6">
        <li v-for="topic in topics" :key="topic.to">
          <NuxtLink :to="topic.to" class="underline font-medium">{{ topic.label }}</NuxtLink>:
          {{ topic.about }}
        </li>
      </ul>
      <p class="max-w-3xl mb-6">
        New to the blog? Start with the <NuxtLink to="/glossary" class="underline">developer glossary</NuxtLink> for
        short definitions of terms like CORS, NAT gateway and MCP, or read the
        <NuxtLink to="/about-us" class="underline">about page</NuxtLink> to see how the posts are written and updated.
      </p>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Latest posts</h2>
      <ul class="space-y-2 max-w-3xl">
        <li v-for="post in latest" :key="post.path">
          <NuxtLink :to="post.path" class="font-medium text-gray-900 dark:text-gray-100 hover:underline">
            {{ post.title }}
          </NuxtLink>
          <span class="block text-sm">{{ post.description }}</span>
        </li>
      </ul>
    </section>
    <ClientOnly>
      <ContinueReading />
    </ClientOnly>
  </div>
</template>

<script setup>
const { navigate } = useTactileNav()

const topics = [
  { to: '/blog/cloud', label: 'Cloud', about: 'AWS Lambda in a VPC, NAT gateway costs and cutting GCP VM bills.' },
  { to: '/blog/backend', label: 'Backend', about: 'An MCP server with PostgreSQL and Selenium browser automation.' },
  { to: '/blog/frontend', label: 'Frontend', about: 'CORS, security headers, CloudFront-hosted SPAs, Nuxt and WebAssembly.' },
  { to: '/blog/developer', label: 'Developer tools', about: 'Git workflows, Go testing, Raspberry Pi projects, Pi-hole and AI-assisted coding.' },
]

const { data: latest } = await useAsyncData('home-latest', () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .select('path', 'title', 'description')
    .limit(8)
    .all()
)
const { data: owner } = await useAsyncData('home-owner', () =>
  queryCollection('authors').where('slug', '=', 'sachin-ghait').first()
)

usePageSeo({
  title: 'Sachin Ghait: Developer notes on cloud, DevOps and security',
  description: SITE_DESCRIPTION,
  path: '/',
})
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  },
  owner.value
    ? { '@context': 'https://schema.org', ...personSchema(owner.value) }
    : null,
])

const heroHeadline = ref(null)
const heroText = ref(null)
const heroButton = ref(null)
const heroImage = ref(null)

useScrollReveal([heroHeadline, heroText, heroButton, heroImage], {
  staggerDelay: 50,
})
</script>

<style>
.headline {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #35495e;
}

.dark .headline {
  color: #f7fafc;
}

.underline {
  font-family: "Playfair Display", serif;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
  text-decoration-color: #526488;
  letter-spacing: 0.05em;
}

.dark .underline {
  text-decoration-color: #cbd5e0;
}

.descriptive-text {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}

/* Apply Inter to all small text elements */
p,
button,
.btn,
.links,
.subtitle {
  font-family: "Inter", sans-serif !important;
}

/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
/* Hero only. This used to target every .container on the site once the home page had loaded. */
.hero-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
