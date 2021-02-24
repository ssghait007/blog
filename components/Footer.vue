<template>
  <footer class="text-gray-600 body-font">
    <div
      class="px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col"
    >
      <div
        class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10"
      >
        <a
          class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
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
          <span class="ml-3 text-xl">Sachin Ghait</span>
        </a>
        <p class="mt-2 text-sm text-gray-600">
          Knowledge shared is knowledge squared.
        </p>
      </div>
      <div
        class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first"
      >
        <div
          v-for="i in ['Frontend', 'Backend', 'Cloud']"
          :key="i"
          class="lg:w-1/4 md:w-1/2 w-full px-4"
        >
          <h2
            class="title-font font-medium text-gray-800 hover:text-blue-600 tracking-widest text-lg mb-3"
          >
            {{ i }}
          </h2>
          <nav class="list-none mb-10">
            <li v-for="j in [1, 2, 3, 4]" :key="j">
              <a class="text-gray-600 hover:text-blue-600">Coming soon..</a>
            </li>
          </nav>
        </div>
        <div class="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-gray-800 hover:text-blue-600 tracking-widest text-lg mb-3"
          >
            About
          </h2>
          <nav class="list-none mb-10">
            <li>
              <nuxt-link
                class="text-gray-600 hover:text-blue-600"
                :to="`/privacy-policy`"
              >
                Privacy policy
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="text-gray-600 hover:text-blue-600"
                :to="`/contact`"
              >
                Contact
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="text-gray-600 hover:text-blue-600"
                :to="`/about-us`"
              >
                About us
              </nuxt-link>
            </li>
          </nav>
        </div>
      </div>
    </div>

    <div class="bg-gray-200">
      <div class="mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-gray-500 text-sm text-center sm:text-left">
          © 2021 Sachin Ghait —
          <a
            href="https://github.com/ssghait007"
            rel="noopener noreferrer"
            class="text-gray-600 ml-1"
            target="_blank"
            >@ssghait007</a
          >
        </p>
        <Social></Social>
      </div>
    </div>
  </footer>
</template>
