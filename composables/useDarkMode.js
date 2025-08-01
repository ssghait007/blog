export const useDarkMode = () => {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateDOM()
    saveToStorage()
  }

  const updateDOM = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('darkMode', JSON.stringify(isDark.value))
    }
  }

  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('darkMode')
      if (stored) {
        isDark.value = JSON.parse(stored)
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
      }
      updateDOM()
    }
  }

  const initDarkMode = () => {
    loadFromStorage()
    
    // Listen for system theme changes
    if (process.client) {
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
    initDarkMode
  }
}