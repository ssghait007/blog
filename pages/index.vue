<template>
  <section class="text-gray-600 dark:text-gray-300 body-font">
    <div
      class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center"
    >
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1
          class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-100"
        >
          Learning, growing, and sharing...
        </h1>
        <p class="mb-8 leading-relaxed dark:text-gray-300">
          A space to reflect on personal growth and share insights with the community, A place to share my experiences and connect with like-minded individuals
        </p>
        <div class="flex justify-center">
          <NuxtLink to="/blog">
            <button class="btn focus:outline-none" aria-label="Navigate to blog posts">To Blog</button>
          </NuxtLink>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img
          class="object-cover object-center rounded-md"
          alt="webDevTrends"
          src="https://raw.githubusercontent.com/ssghait007/blog/main/assets/hand-drawn.webp"
        />
      </div>
    </div>
  </section>
</template>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
