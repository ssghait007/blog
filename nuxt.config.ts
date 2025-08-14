export default defineNuxtConfig({
  // Static site generation
  ssr: true,
  nitro: {
    preset: 'netlify-static',
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
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Global CSS
  css: ['~/assets/css/fonts.css'],

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-gtag',
  ],

  // Google Analytics configuration - optimized loading
  // @ts-ignore
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    // Defer loading for better performance
    loadingStrategy: 'defer',
  },

  // Development tools
  devtools: { enabled: true },

  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Reduce bundle size
  },

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

  // Content configuration
  content: {
    // Configure @nuxt/content options here
    highlight: {
      theme: 'github-dark',
    },
    markdown: {
      toc: {
        depth: 5,
        searchDepth: 5,
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
