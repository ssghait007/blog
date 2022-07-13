<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="filteredPosts.length" class="flex flex-wrap -m-4">
        <div
          v-for="post in filteredPosts"
          :key="post.slug"
          class="p-4 md:w-1/3"
        >
          <div
            class="shadow-md h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-md hover:rounded hover:border-purple-300 transition duration-300 transform hover:-translate-y-3"
          >
            <nuxt-link :to="`/blog/${post.slug}`">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                :src="post.image"
                alt="blog"
              />
            </nuxt-link>
            <div class="p-6">
              <h2
                class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"
              >
                {{ post.category }}
              </h2>
              <nuxt-link
                :to="`/blog/${post.slug}`"
                class="text-indigo-500 hover:text-indigo-900 block items-center md:mb-2 lg:mb-0"
              >
                <h1
                  class="title-font text-lg text-left font-medium text-gray-900 hover:text-gray-600"
                >
                  {{ post.title }}
                </h1>
              </nuxt-link>
              <p class="leading-relaxed text-left">
                {{ post.description }}
              </p>

              <div
                class="
            flex flex-wrap
            justify-starts
            items-center
            py-3
            border-b-2
            text-xs text-white
            font-medium
          "
              >
                <a v-for="t in post.tags" class="m-1 px-2 py-1 rounded bg-green-500" :key="t"> {{"#"+t.toUpperCase()}} </a>
                <a v-if="post && post.proficiency" class="m-1 px-2 py-1 rounded bg-blue-500" :key="t"> {{"#"+ post.proficiency.toUpperCase()}} </a>
              </div>
              <div class="flex items-center mt-2 flex-wrap text-left">
                <img
                  class="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p"
                />
                <div class="pl-2">
                  <div class="font-medium">{{post.author}}</div>
                  <div class="text-gray-600 text-xs">{{post.authorTitle}}</div>
                </div>
                <div class="ml-auto text-center">
                  <div class="font-medium text-xs">{{post.readingTime}}</div>
                  <div class="text-gray-600 text-xs">
                    {{ post.createdAt | formatDate }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-wrap -m-4">No posts in this section</div>
    </div>
    <div class="flex justify-center">
      <nuxt-link :to="'/'">
        <button class="btn focus:outline-none">Home</button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { format } from 'date-fns'

export default {
  filters: {
    formatDate(date) {
      return format(new Date(date), 'dd MMM yyyy')
    }
  },
  props: {
    posts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    filteredPosts() {
      const show =
        typeof window !== 'undefined' ? localStorage.getItem('show') : null
      if (show) {
        return this.posts
      }
      return this.posts.filter(a => a.published)
    }
  }
}
</script>
