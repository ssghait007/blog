// Adds a "Copy" button to every code block inside .prose content.
// Blocks render after hydration (ClientOnly), so a MutationObserver picks them up.
export const useCodeCopy = () => {
  let observer

  const addButtons = () => {
    for (const pre of document.querySelectorAll('.prose pre')) {
      if (pre.dataset.copyReady) {
        continue
      }
      pre.dataset.copyReady = 'true'

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'code-copy-btn'
      button.textContent = 'Copy'
      button.setAttribute('aria-label', 'Copy code to clipboard')
      button.addEventListener('click', async () => {
        const text = (pre.querySelector('code') || pre).innerText.trimEnd()
        try {
          await navigator.clipboard.writeText(text)
          button.textContent = 'Copied'
        } catch {
          button.textContent = 'Press Ctrl+C'
        }
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 1800)
      })
      pre.appendChild(button)
    }
  }

  onMounted(() => {
    addButtons()
    observer = new MutationObserver(addButtons)
    observer.observe(document.body, { childList: true, subtree: true })
  })
  onBeforeUnmount(() => observer?.disconnect())
}
