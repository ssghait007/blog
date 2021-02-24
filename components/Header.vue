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
      categories: ['Frontend', 'Backend', 'Cloud', 'Developer'],
    }
  },
}
</script>
