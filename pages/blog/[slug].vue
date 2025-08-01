<template>
  <div>
    <ReadingProgress />
    <section class="text-gray-600 body-font">
    <div class="flex justify-center md:ml-10 p-5 sm:ml-0">
      <NuxtLink to="/blog">
        <button class="btn focus:outline-none" aria-label="Navigate to blog posts">&larr; Back</button>
      </NuxtLink>
    </div>

    <div
      class="text-left overflow-hidden container mx-auto flex flex-col px-5 py-0 justify-center items-center"
    >
      <img
        v-if="data?.image"
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="data.image"
      />

      <h2
        v-if="data?.toc && data.toc.length > 0"
        class="uppercase text-green-500 font-bold text-lg lg:mt-16 tracking-wider"
      >
        Table of contents
      </h2>
      <nav v-if="data?.toc && data.toc.length > 0" class="mt-4 mb-8 text-blue-500">
        <ul class="list-decimal">
          <li
            class="toc-list text-left m-4"
            v-for="link of data.toc"
            :key="link.id"
          >
            <a
              class="underline decoration-pink-500"
              :href="`#${link.id}`"
            >{{ link.text }}</a>
          </li>
        </ul>
      </nav>

      <ContentDoc class="m-auto text-left prose" />
    </div>
  </section>
  </div>
</template>

<script setup>
import { format } from 'date-fns'

const route = useRoute()
const slug = route.params.slug

// Fetch the blog post content
const { data } = await useAsyncData(`blog-${slug}`, () =>
  queryContent('blog', slug).findOne()
)

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
    statusMessage: 'Blog post not found'
  })
}
</script>

<style>
.prose {
  width: 100%;
}
</style>
