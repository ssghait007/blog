export default defineNuxtConfig({
  // Static site generation
  ssr: true,
  nitro: {
    preset: 'netlify-static'
  },

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
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-gtag'],

  // Google Analytics configuration
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  // Development tools
  devtools: { enabled: true },

  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Reduce bundle size
  },

  // Content configuration
  content: {
    // Configure @nuxt/content options here
    highlight: {
      theme: 'github-dark'
    },
    markdown: {
      toc: {
        depth: 5,
        searchDepth: 5
      }
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      siteUrl: 'https://onthegoalways.com',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  // SEO and meta
  site: {
    url: 'https://onthegoalways.com',
    name: 'Sachin Ghait Blog'
  }
})
