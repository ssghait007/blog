<template>
  <section class="text-gray-600 body-font">
    <div class="flex md:ml-10 p-5 sm:ml-0">
      <nuxt-link :to="'/blog'">
        <button class="btn focus:outline-none">&larr; Back</button>
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

        <h2
          class="uppercase text-green-500 font-bold text-lg lg:mt-16 tracking-wider"
        >
          Table of contents
        </h2>
        <nav class="mt-4 mb-8 text-blue-500">
          <ul class="list-decimal">
            <li
              class="toc-list text-left m-4"
              v-for="(link) of post.toc"
              :key="link.id"
            >
              <a
              class="underline decoration-pink-500"
                :href="`#${link.id}`"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </nav>


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
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },

        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: this.post.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description,
        },
        { hid: 'og:image', property: 'og:image', content: this.post.image },
      ],
    }
  },

}
</script>
<style>
.nuxt-content {
  width: 100%;
}
</style>
