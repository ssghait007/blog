export default defineNuxtConfig({
  // Modern deployment target
  ssr: true, // or false for SPA mode, true for SSR/SSG

  // App configuration
  app: {
    head: {
      title: 'sachin-ghait-blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Blog about developer learning',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },

  // Global CSS
  css: [],

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  // Development tools
  devtools: { enabled: true },

  // Content configuration
  content: {
    // Configure @nuxt/content options here
    highlight: {
      theme: 'github-dark'
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      siteUrl: 'https://onthegoalways.com'
    }
  },

  // SEO and meta
  site: {
    url: 'https://onthegoalways.com',
    name: 'Sachin Ghait Blog'
  }
})
