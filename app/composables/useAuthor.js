export const useAuthor = async (authorName) => {
  if (!authorName) {
    return {
      author: null,
      error: 'Author name is required',
    }
  }

  try {
    // Convert author name to slug format (lowercase, replace spaces with hyphens)
    const slug = authorName.toLowerCase().replace(/\s+/g, '-')

    // Query the author content
    const author = await queryCollection('authors').path(`/authors/${slug}`).first()

    if (!author) {
      // Return default author data if not found
      return {
        author: {
          name: authorName,
          avatar: '/images/authors/default-avatar.jpg', // fallback avatar
          title: 'Guest Author',
          bio: 'Guest contributor to the blog.',
          slug,
          social: {},
        },
        error: null,
      }
    }

    return {
      author,
      error: null,
    }
  } catch (error) {
    return {
      author: {
        name: authorName,
        avatar: '/images/authors/default-avatar.jpg',
        title: 'Guest Author',
        bio: 'Guest contributor to the blog.',
        slug: authorName.toLowerCase().replace(/\s+/g, '-'),
        social: {},
      },
      error: error.message,
    }
  }
}

export const useAllAuthors = async () => {
  try {
    const authors = await queryCollection('authors').all()
    return {
      authors,
      error: null,
    }
  } catch (error) {
    return {
      authors: [],
      error: error.message,
    }
  }
}
