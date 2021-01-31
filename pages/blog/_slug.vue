<template>
  <section class="text-gray-600 body-font">
    <div class="flex md:ml-10 p-5 sm:ml-0">
      <nuxt-link :to="'/blog'">
        <button
          class="rounded-full inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          &larr; Back
        </button>
      </nuxt-link>
    </div>
    <div
      class="text-left container mx-auto flex flex-col px-5 py-12 justify-center items-center"
    >
      <img
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="post.image"
      />
      <nuxt-content class="text-left" :document="post" />
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
.nuxt-content h4 {
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
  margin: 1.8em 0;
  line-height: 1.33;
}
.nuxt-content h1 {
  font-weight: bold;

  font-size: 30px;
  margin-top: 15px;
  border-bottom: 1px solid rgb(226, 217, 217);
}

a {
  color: #0c93e4;
  text-decoration: underline;
  text-decoration-skip: ink;
}
/* .nuxt-content h1 {
  @apply title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900;
} */
.nuxt-content p {
  margin-top: 5px;
}
pre > code {
  background-color: rgba(0, 0, 0, 0.05);
  display: block;
  padding: 0.5em;
  -webkit-text-size-adjust: none;
  overflow-x: auto;
  white-space: pre;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  padding: 2px 4px;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
ul {
  list-style-type: disc;
  margin: 1.2em 0;
  padding: 20px 40px;
}
</style>
