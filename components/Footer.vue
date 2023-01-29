<template>
  <footer class="text-white body-font">
    <div class="custom-shape-divider-bottom-1629545681">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
    <div
      class="px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col"
      style="background-color: #69c5c5;"
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
          <span class="ml-3 text-xl text-gray-800">Sachin Ghait</span>
        </a>
        <p class="mt-2 text-sm text-white">
          Knowledge shared is knowledge squared.
        </p>
      </div>
      <div
        class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first"
      >
        <div v-for="i in []" :key="i" class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-gray-800 hover:text-blue-600 tracking-widest text-lg mb-3"
          >
            {{ i }}
          </h2>
          <nav class="list-none mb-10">
            <li v-for="j in [1, 2, 3, 4]" :key="j">
              <a class="text-white hover:text-blue-600">Coming soon..</a>
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
                class="text-white hover:text-blue-600"
                :to="`/privacy-policy`"
              >
                Privacy policy
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="text-gray-50 hover:text-blue-600"
                :to="`/contact`"
              >
                Contact
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="text-white hover:text-blue-600"
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
        <p class="text-gray-700 text-sm text-center sm:text-left">
          © 2021 Sachin Ghait —
          <a
            href="https://github.com/ssghait007"
            rel="noopener noreferrer"
            class="text-grey-700 ml-1"
            target="_blank"
            >@ssghait007</a
          >
        </p>
        <Social></Social>
      </div>
    </div>
  </footer>
</template>

<style>
.custom-shape-divider-bottom-1629545681 {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1629545681 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 66px;
}

.custom-shape-divider-bottom-1629545681 .shape-fill {
    fill: #69C5C5;
}
</style>
