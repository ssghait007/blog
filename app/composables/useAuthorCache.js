const useAuthorCacheState = () => useState('authorCache', () => new Map())
const useAuthorPromisesState = () => useState('authorPromises', () => new Map())

const createFallbackAuthor = (authorName, slug) => ({
  name: authorName,
  avatar:
    'https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p',
  title: 'Guest Author',
  bio: 'Guest contributor to the blog.',
  slug,
  social: {},
})

const fetchAuthorData = async (authorName, slug) => {
  try {
    const author = await queryCollection('authors').path(`/authors/${slug}`).first()
    return author || createFallbackAuthor(authorName, slug)
  } catch (_error) {
    return createFallbackAuthor(authorName, slug)
  }
}

export const useAuthorCache = () => {
  const authorCache = useAuthorCacheState()
  const authorPromises = useAuthorPromisesState()

  const getAuthor = async (authorName) => {
    if (!authorName) {
      return null
    }

    const slug = authorName.toLowerCase().replace(/\s+/g, '-')

    // Return cached author if available
    if (authorCache.value.has(slug)) {
      return authorCache.value.get(slug)
    }

    // Return existing promise if already fetching
    if (authorPromises.value.has(slug)) {
      return await authorPromises.value.get(slug)
    }

    // Create new fetch promise
    const fetchPromise = fetchAuthorData(authorName, slug).then(
      (authorData) => {
        authorCache.value.set(slug, authorData)
        authorPromises.value.delete(slug)
        return authorData
      }
    )

    // Store the promise
    authorPromises.value.set(slug, fetchPromise)
    return await fetchPromise
  }

  const preloadAuthors = async (authorNames) => {
    const uniqueAuthors = [...new Set(authorNames.filter(Boolean))]
    const promises = uniqueAuthors.map((name) => getAuthor(name))
    await Promise.all(promises)
  }

  const getCachedAuthor = (authorName) => {
    if (!authorName) {
      return null
    }
    const slug = authorName.toLowerCase().replace(/\s+/g, '-')
    return authorCache.value.get(slug) || null
  }

  return {
    getAuthor,
    preloadAuthors,
    getCachedAuthor,
  }
}
