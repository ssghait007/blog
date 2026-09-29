// Pages whose content changes when posts change get the latest post date.
// Standalone pages (about, contact, privacy) are left without a lastmod
// rather than claiming a date that isn't real.
const LISTING_PAGES = ['/', '/blog', '/blog/frontend', '/blog/backend', '/blog/cloud', '/blog/developer']
const STANDALONE_PAGES = ['/about-us', '/contact', '/privacy-policy']

const toDay = (date: string) => new Date(date).toISOString().slice(0, 10)

export default defineEventHandler(async (event) => {
  const { public: { siteUrl: SITE_URL } } = useRuntimeConfig()

  const posts = await queryCollection(event, 'blog')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .all()

  // Only list authors who have published posts
  const postAuthors = new Set(posts.map((post) => post.author))
  const authors = (await queryCollection(event, 'authors').all()).filter(
    (author) => postAuthors.has(author.name)
  )

  // Site-wide pages change whenever a post is added or updated
  const latest = posts
    .map((post) => post.updatedAt || post.createdAt)
    .sort()
    .at(-1)
  const siteLastmod = latest ? toDay(latest) : toDay(new Date().toISOString())

  const latestByAuthor = new Map<string, string>()
  for (const post of posts) {
    const date = toDay(post.updatedAt || post.createdAt)
    const current = latestByAuthor.get(post.author)
    if (!current || date > current) latestByAuthor.set(post.author, date)
  }

  const urls: { path: string; lastmod?: string }[] = [
    ...LISTING_PAGES.map((path) => ({ path, lastmod: siteLastmod })),
    ...STANDALONE_PAGES.map((path) => ({ path })),
    ...posts.map((post) => ({
      path: post.path,
      lastmod: toDay(post.updatedAt || post.createdAt),
    })),
    ...authors.map((author) => ({
      path: `/authors/${author.slug}`,
      lastmod: latestByAuthor.get(author.name),
    })),
  ]

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url.path}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`
    )
    .join('\n')

  setResponseHeader(event, 'content-type', 'application/xml')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
})
