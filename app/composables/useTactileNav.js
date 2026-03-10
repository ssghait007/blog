export const useTactileNav = () => {
  let timeoutId = null

  const navigate = (path) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      navigateTo(path)
    }, 500)
  }

  onBeforeUnmount(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return { navigate }
}
