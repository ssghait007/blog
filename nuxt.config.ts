export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'netlify-static',
    prerender: {
      routes: ['/rss.xml'],
    },
  },

  // App configuration
  app: {
    head: {
      title: 'sachin-ghait-blog',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Blog about developer learning',
        },
        // Open Graph tags
        { property: 'og:url', content: 'https://onthegoalways.com' },
        { property: 'og:site_name', content: 'Sachin Ghait Blog' },
        { property: 'og:logo', content: 'https://onthegoalways.com/favicon.ico' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Sachin Ghait Blog RSS Feed', href: '/rss.xml' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var d=document.documentElement,s=localStorage.getItem('darkMode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}}catch(e){}})()`,
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // Global CSS
  css: ['~/assets/css/fonts.css', '~/assets/css/buttons.css', '~/assets/css/animations.css'],

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-gtag',
  ],

  // Google Analytics configuration - optimized loading
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    // Defer loading for better performance
    loadingStrategy: 'defer',
  },

  // Development tools
  devtools: { enabled: true },

  // Build optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Enable content hashing for cache busting
          entryFileNames: '_nuxt/[name].[hash].js',
          chunkFileNames: '_nuxt/[name].[hash].js',
          assetFileNames: '_nuxt/[name].[hash].[ext]',
        },
      },
    },
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      siteUrl: 'https://onthegoalways.com',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    },
  },

  // SEO and meta
  site: {
    url: 'https://onthegoalways.com',
    name: 'Sachin Ghait Blog',
  },
})
