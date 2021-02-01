<template>
  <section class="text-gray-600 body-font">
    <div class="flex md:ml-10 p-5 sm:ml-0">
      <nuxt-link :to="'/blog'">
        <button
          class="rounded-full inline-flex text-white bg-gradient-to-r from-green-400 to-blue-500 border-0 py-2 px-6 focus:outline-none rounded text-lg"
        >
          &larr; Back
        </button>
      </nuxt-link>
    </div>
    <div
      class="text-left overflow-hidden container mx-auto flex flex-col px-5 py-12 justify-center items-center"
    >
      <img
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="post.image"
      />
      <nuxt-content class="m-auto text-left prose" :document="post" />
    </div>
  </section>
</template>

<script>
import { format } from 'date-fns'
export default {
  filters: {
    formatDate() {
      return format(new Date(), 'dd MMM yyyy')
    },
  },
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.slug).fetch()
    return { post }
  },
}
</script>
<style>
.nuxt-content {
  width: 100%;
}
</style>
