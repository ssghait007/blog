<template>
  <div class="interactive-toc bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm dark:shadow-gray-900/10">
    <h2 id="toc-heading" class="uppercase text-purple-500 font-bold text-lg tracking-wider mb-4">
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
            class="toc-link block py-2 px-3 rounded-md text-sm transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 no-underline"
            :class="{
              'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-l-3 border-purple-500 dark:border-purple-400 font-medium': activeSection === link.id,
              'text-gray-600 dark:text-gray-300': activeSection !== link.id
            }"
            @click="handleLinkClick($event, link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  tocData: {
    type: Array,
    required: true,
    default: () => []
  }
})

const activeSection = ref('')

const handleLinkClick = (event, sectionId) => {
  event.preventDefault()
  
  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    const headerOffset = 100 // Account for fixed header and progress bar
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // Update active section immediately
    activeSection.value = sectionId
  }
}

const updateActiveSection = () => {
  if (!props.tocData || props.tocData.length === 0) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // If near bottom of page, highlight last section
  if (scrollTop + windowHeight >= documentHeight - 100) {
    const lastSection = props.tocData[props.tocData.length - 1]
    if (lastSection) {
      activeSection.value = lastSection.id
      return
    }
  }
  
  // Find current section based on scroll position
  let currentSection = ''
  
  for (const link of props.tocData) {
    const element = document.getElementById(link.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 120) { // 120px offset for header
        currentSection = link.id
      } else {
        break
      }
    }
  }
  
  if (currentSection && currentSection !== activeSection.value) {
    activeSection.value = currentSection
  }
}

// Throttle function for performance
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  
  return function (...args) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

const throttledUpdateActiveSection = throttle(updateActiveSection, 100)

onMounted(async () => {
  await nextTick()
  
  // Initial active section detection
  updateActiveSection()
  
  // Add scroll listener
  window.addEventListener('scroll', throttledUpdateActiveSection, { passive: true })
  window.addEventListener('resize', throttledUpdateActiveSection, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledUpdateActiveSection)
  window.removeEventListener('resize', throttledUpdateActiveSection)
})
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