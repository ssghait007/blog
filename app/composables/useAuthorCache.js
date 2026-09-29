// Plain object, not a Map: useState is serialized into the static payload, and a
// Map serializes to {}, which left the cache empty after hydration and made every
// card fall back to the placeholder avatar.
const useAuthorCacheState = () => useState('authorCache', () => ({}))

// In-flight requests only need to live for the current render, so they aren't state
const pendingAuthors = new Map()

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
  
  const getAuthor = async (authorName) => {
    if (!authorName) {
      return null
    }

    const slug = authorName.toLowerCase().replace(/\s+/g, '-')

    // Return cached author if available
    if (slug in authorCache.value) {
      return authorCache.value[slug]
    }

    // Return existing promise if already fetching
    if (pendingAuthors.has(slug)) {
      return await pendingAuthors.get(slug)
    }

    // Create new fetch promise
    const fetchPromise = fetchAuthorData(authorName, slug).then(
      (authorData) => {
        authorCache.value[slug] = authorData
        pendingAuthors.delete(slug)
        return authorData
      }
    )

    // Store the promise
    pendingAuthors.set(slug, fetchPromise)
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
    return authorCache.value[slug] || null
  }

  return {
    getAuthor,
    preloadAuthors,
    getCachedAuthor,
  }
}
