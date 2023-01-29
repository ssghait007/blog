<template>
  <header class="text-gray-600 body-font w-full">
    <div
      class="bg-gradient-to-r from-green-400 to-blue-500 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <nuxt-link
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full fill-current"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-5 text-xl">Sachin Ghait</span>
      </nuxt-link>

      <div class="relative ml-auto w-64 z-10">
        <input
          type="text"
          class="w-full pl-10 pr-4 py-2 leading-tight text-gray-600 bg-white border border-gray-400 rounded-full focus:outline-none focus:border-indigo-500"
          placeholder="Search"
          v-model="search"
        />
        <smooth-reflow tag="ul" class="results">
          <li
            @click="onClick(article.path)"
            class="p-2 bg-white text-gray-800 rounded shadow-md cursor-pointer border-b border-gray-300 hover:bg-gray-200 hover:text-blue-400"
            v-for="article of articles"
            :key="article.path"
          >
            {{ article.title }}
          </li>
        </smooth-reflow>
      </div>

      <nav
        class="md:ml-auto flex flex-wrap items-center text-lg justify-center"
      >
        <nuxt-link
          v-for="category in categories"
          :key="category"
          class="mr-5 text-gray-300"
          :to="`/blog/${category.toLowerCase()}`"
        >
          {{ category }}</nuxt-link
        >
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      categories: ["Frontend", "Backend", "Cloud", "Developer"],
      articles: [],
    };
  },
  methods: {
    onClick(slug) {
      this.search = "";
      this.$router.push(slug);
    },
  },
  watch: {
    async search(search) {
      if (!search) {
        this.articles = [];
        return;
      }

      this.articles = await this.$content("blog")
        .sortBy("createdAt", "desc")
        .search(search)
        .fetch();
    },
  },
};
</script>

<style>
.results {
  position: absolute;
  top: 1;
  left: 0;
  width: 100%;
}
</style>
