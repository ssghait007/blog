export function useReadingHistory() {
  const STORAGE_KEY = 'readingHistory'
  const MAX_ENTRIES = 5

  function getHistory() {
    if (import.meta.server) return []
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  }

  function trackVisit(post) {
    if (import.meta.server || !post) return
    const history = getHistory().filter((item) => item.path !== post.path)
    history.unshift({
      path: post.path,
      title: post.title,
      image: post.image,
      category: post.category,
      readingTime: post.readingTime,
      visitedAt: Date.now(),
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_ENTRIES)))
  }

  function clearHistory() {
    if (import.meta.server) return
    localStorage.removeItem(STORAGE_KEY)
  }

  return { getHistory, trackVisit, clearHistory }
}
