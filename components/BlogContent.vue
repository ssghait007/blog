<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div v-if="posts.length" class="flex flex-wrap -m-4">
        <div v-for="post in posts" :key="post.slug" class="p-4 md:w-1/3">
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
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                {{ post.title }}
              </h1>
              <p class="leading-relaxed mb-3">
                {{ post.description }}
              </p>
              <div class="flex items-center flex-wrap">
                <nuxt-link
                  :to="`/blog/${post.slug}`"
                  class="text-indigo-500 hover:text-indigo-900 inline-flex items-center md:mb-2 lg:mb-0"
                >
                  Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </nuxt-link>

                <span
                  class="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 2 border-gray-200"
                >
                  {{ post.createdAt | formatDate }}
                </span>
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
    },
  },
  props: {
    posts: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
