export const useScrollReveal = (refs, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 50,
    maxStagger = 6,
  } = options

  onMounted(() => {
    if (!refs) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let elements = []
    if (Array.isArray(refs)) {
      elements = refs.map((r) => r.value).filter(Boolean)
    } else if (Array.isArray(refs.value)) {
      elements = refs.value.filter(Boolean)
    } else if (refs.value) {
      elements = [refs.value]
    }

    if (elements.length === 0) return

    for (const [i, el] of elements.entries()) {
      el.classList.add('scroll-reveal')
      const delay = Math.min(i, maxStagger) * staggerDelay
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`
      }
    }

    if (prefersReducedMotion) {
      for (const el of elements) {
        el.classList.add('revealed')
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin }
    )

    for (const el of elements) {
      observer.observe(el)
    }

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })
}
