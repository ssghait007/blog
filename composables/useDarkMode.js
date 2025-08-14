import { ref, readonly } from 'vue'

export const useDarkMode = () => {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateDOM()
    saveToStorage()
  }

  const updateDOM = () => {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('darkMode', JSON.stringify(isDark.value))
    }
  }

  const loadFromStorage = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('darkMode')
      if (stored) {
        isDark.value = JSON.parse(stored)
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        isDark.value = prefersDark
      }
      updateDOM()
    }
  }

  const initDarkMode = () => {
    loadFromStorage()

    // Listen for system theme changes
    if (import.meta.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
          isDark.value = e.matches
          updateDOM()
        }
      })
    }
  }

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    initDarkMode,
  }
}
