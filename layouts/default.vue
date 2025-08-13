<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Skip Links -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
    <a
      href="#navigation"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-40 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      Skip to navigation
    </a>
    
    <Header/>
    <main id="main-content">
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
// Nuxt 3 uses Composition API by default
// The middleware functionality will be handled differently in pages
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

/* Enhanced focus indicators for accessibility */
*:focus {
  outline: 2px solid #8B5CF6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Better focus for interactive elements */
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #8B5CF6;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

/* Dark mode focus styles */
.dark *:focus,
.dark a:focus,
.dark button:focus,
.dark input:focus,
.dark select:focus,
.dark textarea:focus {
  outline: 2px solid #A855F7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
}

/* Skip link focus styles are already defined above */

/* Reduced motion support for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
