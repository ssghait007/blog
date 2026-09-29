<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="inline-block w-8 h-8 text-gray-400 mb-8"
          viewBox="0 0 975.036 975.036"
        >
          <path
            d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
          />
        </svg>
        <p class="leading-relaxed text-lg">
          Hi, I'm Sachin Ghait and I work as a lead developer. I'm always eager
          to learn something new every day. I started this blog to keep track of
          what I've learned about full-stack development, including front-end,
          back-end, cloud, and developer efficiency.
        </p>
        <span
          class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"
        />
        <h1 class="text-gray-900 font-medium title-font tracking-wider text-sm">
          Sachin Ghait
        </h1>
        <p class="text-gray-500">Lead Developer</p>
        <div class="text-left mt-10 leading-relaxed space-y-4">
          <h2 class="text-gray-900 font-medium text-lg">What you'll find here</h2>
          <p>
            Practical guides on cloud (AWS and GCP), DevOps, web security, Git, Raspberry Pi, automation and AI
            tooling. Every post starts with a short summary and ends with FAQs and the sources it relies on.
          </p>
          <h2 class="text-gray-900 font-medium text-lg">Editorial policy</h2>
          <p>
            I write about things I have actually set up or built. Posts show a published date and, when the content
            changes, an updated date. Corrections are welcome through the
            <NuxtLink to="/contact" class="underline">contact page</NuxtLink>.
          </p>
          <h2 class="text-gray-900 font-medium text-lg">Find me elsewhere</h2>
          <p>
            <a href="https://github.com/ssghait007" rel="me noopener" class="underline">GitHub</a>,
            <a href="https://www.linkedin.com/in/sachin-ghait-02977794" rel="me noopener" class="underline">LinkedIn</a>
            and <NuxtLink to="/authors/sachin-ghait" class="underline">my author profile</NuxtLink>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
usePageSeo({
  title: 'About Sachin Ghait, lead developer and author',
  description:
    'Sachin Ghait is a lead developer who writes tested guides on cloud, DevOps, web security, Git and automation. Learn about the blog and its editorial policy.',
  path: '/about-us',
})
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Sachin Ghait',
    url: `${SITE_URL}/about-us`,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
  },
])
</script>
