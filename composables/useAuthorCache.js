// Global author cache to prevent duplicate fetches
const authorCache = new Map()
const authorPromises = new Map()

export const useAuthorCache = () => {
  const getAuthor = async (authorName) => {
    if (!authorName) return null

    const slug = authorName.toLowerCase().replace(/\s+/g, '-')

    // Return cached author if available
    if (authorCache.has(slug)) {
      return authorCache.get(slug)
    }

    // Return existing promise if already fetching
    if (authorPromises.has(slug)) {
      return await authorPromises.get(slug)
    }

    // Create new fetch promise
    const fetchPromise = (async () => {
      try {
        const author = await queryContent('authors').where({ slug }).findOne()

        const authorData = author || {
          name: authorName,
          avatar: 'https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p',
          title: 'Guest Author',
          bio: 'Guest contributor to the blog.',
          slug: slug,
          social: {}
        }

        // Cache the result
        authorCache.set(slug, authorData)
        return authorData
      } catch (error) {
        console.warn(`Author lookup error for ${authorName}:`, error)

        const fallbackData = {
          name: authorName,
          avatar: 'https://lh3.googleusercontent.com/a-/AFdZucogzmfN7i7Vbb3zeC77T3vz5TAOF4wI4fYihn2I=s80-p',
          title: 'Guest Author',
          bio: 'Guest contributor to the blog.',
          slug: slug,
          social: {}
        }

        authorCache.set(slug, fallbackData)
        return fallbackData
      } finally {
        // Clean up promise cache
        authorPromises.delete(slug)
      }
    })()

    // Store the promise
    authorPromises.set(slug, fetchPromise)
    return await fetchPromise
  }

  const preloadAuthors = async (authorNames) => {
    const uniqueAuthors = [...new Set(authorNames.filter(Boolean))]
    const promises = uniqueAuthors.map(name => getAuthor(name))
    await Promise.all(promises)
  }

  const getCachedAuthor = (authorName) => {
    if (!authorName) return null
    const slug = authorName.toLowerCase().replace(/\s+/g, '-')
    return authorCache.get(slug) || null
  }

  return {
    getAuthor,
    preloadAuthors,
    getCachedAuthor
  }
}
