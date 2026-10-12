// Adds a "Copy" button to every code block inside the given container.
// Blocks render after hydration (ClientOnly), so a MutationObserver scoped to the
// article container picks them up (unrelated page changes don't trigger scans).
export const useCodeCopy = (rootSelector = '.prose') => {
  let observer
  const timers = new Set()

  const addButtons = (root) => {
    for (const pre of root.querySelectorAll('pre')) {
      if (pre.dataset.copyReady) {
        continue
      }
      pre.dataset.copyReady = 'true'

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'code-copy-btn'
      button.textContent = 'Copy'
      button.setAttribute('aria-label', 'Copy code to clipboard')

      let resetTimer
      button.addEventListener('click', async () => {
        // Copy the code only, never the button's own label
        const clone = pre.cloneNode(true)
        clone.querySelector('.code-copy-btn')?.remove()
        const text = (clone.querySelector('code') || clone).textContent.trimEnd()
        try {
          await navigator.clipboard.writeText(text)
          button.textContent = 'Copied'
        } catch {
          button.textContent = 'Press Ctrl+C'
        }
        clearTimeout(resetTimer)
        timers.delete(resetTimer)
        resetTimer = setTimeout(() => {
          button.textContent = 'Copy'
          timers.delete(resetTimer)
        }, 1800)
        timers.add(resetTimer)
      })

      // The button lives inside the scrolling <pre>; keep it pinned to the visible corner
      pre.addEventListener('scroll', () => {
        button.style.transform = `translateX(${pre.scrollLeft}px)`
      }, { passive: true })

      pre.appendChild(button)
    }
  }

  onMounted(() => {
    const root = document.querySelector(rootSelector)
    if (!root) {
      return
    }
    addButtons(root)
    observer = new MutationObserver(() => addButtons(root))
    observer.observe(root, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    for (const timer of timers) {
      clearTimeout(timer)
    }
    timers.clear()
  })
}
