<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <button class="opacity-0" @click="show()" aria-label="Show all posts for development">Show all</button>
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          Contact Us
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Drop your feedback or query using the form below.
        </p>
      </div>
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <form name="contact" method="POST" data-netlify="true">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <input type="hidden" name="form-name" value="contact" />
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600"
                  >Name</label
                >
                <input
                  id="name"
                  type="text"
                  name="name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-600"
                  >Message</label
                >
                <textarea
                  id="message"
                  name="message"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div class="p-2 text-center w-full">
              <button type="submit" class="btn focus:outline-none" aria-label="Submit contact form">
                Submit
              </button>
            </div>

            <div
              class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"
            >
              <a class="text-indigo-500">sachinghaitblog@gmail.com</a>
              <p class="leading-normal my-5">Pune, MH 411006</p>
              <Social></Social>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// Show all posts function (for development)
const show = () => {
  if (process.client) {
    localStorage.setItem('show', "true")
  }
}
</script>
