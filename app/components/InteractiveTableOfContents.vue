<template>
  <div
    class="interactive-toc bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm dark:shadow-gray-900/10"
  >
    <h2
      id="toc-heading"
      class="uppercase text-purple-500 font-bold text-lg tracking-wider mb-4"
    >
      Table of contents
    </h2>

    <nav class="toc-navigation" role="navigation" aria-labelledby="toc-heading">
      <ul class="space-y-1">
        <li
          v-for="link in tocData"
          :key="link.id"
          class="toc-item"
          :class="`depth-${link.depth}`"
        >
          <a
            :href="`#${link.id}`"
            class="toc-link block py-2 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 no-underline text-gray-600 dark:text-gray-300"
            @click="_handleLinkClick($event, link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  tocData: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const _handleLinkClick = (event, sectionId) => {
  event.preventDefault()

  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    const headerOffset = 100 // Account for fixed header and progress bar
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped>
.interactive-toc {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.toc-navigation {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.toc-navigation::-webkit-scrollbar {
  width: 4px;
}

.toc-navigation::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.dark .toc-navigation::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

.toc-navigation::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.dark .toc-navigation::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

.toc-navigation::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.dark .toc-navigation::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.toc-link {
  text-decoration: none !important;
}

.toc-link:hover {
  text-decoration: none !important;
}

/* Depth-based indentation */
.toc-item.depth-1 {
  margin-left: 0;
}

.toc-item.depth-2 {
  margin-left: 0.5rem;
}

.toc-item.depth-3 {
  margin-left: 1rem;
}

.toc-item.depth-4 {
  margin-left: 1.5rem;
}

.toc-item.depth-5 {
  margin-left: 2rem;
}

.toc-item.depth-6 {
  margin-left: 2.5rem;
}

/* Border left indicator */
.border-l-3 {
  border-left-width: 3px;
}

/* Responsive design */
@media (min-width: 1024px) {
  .interactive-toc {
    position: sticky;
    top: 120px;
    max-height: calc(100vh - 140px);
  }
}

@media (max-width: 768px) {
  .interactive-toc {
    margin: 0 0.5rem;
  }

  .toc-item.depth-3 {
    margin-left: 0.75rem;
  }

  .toc-item.depth-4 {
    margin-left: 1rem;
  }

  .toc-item.depth-5 {
    margin-left: 1.25rem;
  }

  .toc-item.depth-6 {
    margin-left: 1.5rem;
  }
}
</style>
