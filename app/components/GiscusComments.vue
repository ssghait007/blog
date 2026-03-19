<template>
  <div ref="container" class="giscus-wrapper" />
</template>

<script setup>
const { isDark } = useDarkMode()
const container = ref(null)
let currentTheme = null

function loadGiscus() {
  if (!container.value) return

  // Clear existing iframe if any
  const existing = container.value.querySelector('.giscus')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'ssghait007/blog')
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzMzQzODY5NzE=')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOE-5XG84C4xdN')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'en')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  currentTheme = isDark.value ? 'dark' : 'light'
  container.value.appendChild(script)
}

// Sync theme changes with giscus iframe
watch(isDark, (dark) => {
  const newTheme = dark ? 'dark' : 'light'
  if (newTheme === currentTheme) return
  currentTheme = newTheme

  const iframe = container.value?.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: newTheme } } },
      'https://giscus.app'
    )
  }
})

onMounted(() => {
  loadGiscus()
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.dark .giscus-wrapper {
  border-top-color: #374151;
}
</style>
