<template>
  <div
    class="reading-progress-container fixed top-0 left-0 w-full z-50 h-1 bg-gray-200 dark:bg-gray-700"
    :class="{ 'opacity-0': !showProgress, 'opacity-100': showProgress }"
  >
    <div
      class="reading-progress-bar h-full bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-500 transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const showProgress = ref(false)

const updateProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  
  if (scrollHeight > 0) {
    const scrollPercentage = (scrollTop / scrollHeight) * 100
    progress.value = Math.min(Math.max(scrollPercentage, 0), 100)
    
    // Show progress bar only when user has scrolled a bit
    showProgress.value = scrollTop > 100
  }
}

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

const throttledUpdateProgress = throttle(updateProgress, 16) // ~60fps

onMounted(() => {
  window.addEventListener('scroll', throttledUpdateProgress, { passive: true })
  window.addEventListener('resize', throttledUpdateProgress, { passive: true })
  
  // Initial calculation
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledUpdateProgress)
  window.removeEventListener('resize', throttledUpdateProgress)
})
</script>

<style scoped>
.reading-progress-container {
  transition: opacity 0.3s ease-in-out;
  backdrop-filter: blur(8px);
}

.reading-progress-bar {
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
}

.dark .reading-progress-bar {
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
}

/* Smooth appearance on mobile */
@media (max-width: 768px) {
  .reading-progress-container {
    height: 2px;
  }
}
</style>