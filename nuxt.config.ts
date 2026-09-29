export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'netlify-static',
    prerender: {
      // Write /blog/x.html instead of /blog/x/index.html so Cloudflare Pages serves
      // /blog/x directly (matching our canonical URLs) instead of 308-redirecting to /blog/x/
      autoSubfolderIndex: false,
      routes: ['/rss.xml', '/sitemap.xml', '/llms.txt', '/llms-full.txt'],
    },
  },

  // App configuration
  app: {
    head: {
      title: 'Sachin Ghait: Developer notes on cloud, DevOps and security',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Practical developer notes by Sachin Ghait on cloud (AWS, GCP), DevOps, web security, Git, automation and AI tooling, with tested steps and sources.',
        },
        { name: 'author', content: 'Sachin Ghait' },
        // Open Graph tags
        { property: 'og:url', content: 'https://onthegoalways.com' },
        { property: 'og:site_name', content: 'Sachin Ghait Blog' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://onthegoalways.com/assets/hand-drawn.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
