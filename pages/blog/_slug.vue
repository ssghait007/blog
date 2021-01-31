<template>
  <section class="text-gray-600 body-font">
    <div
      class="container mx-auto flex flex-col px-5 py-24 justify-center items-center"
    >
      <img
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="post.image"
      />
      <nuxt-content :document="post" />
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
    console.log(post)
    return { post }
  },
}
</script>
<style>
.nuxt-content {
  width: 700px;
}
.nuxt-content h2 {
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
}
/* .nuxt-content h1 {
  @apply title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900;
} */
.nuxt-content p {
  margin-top: 5px;
}
</style>
