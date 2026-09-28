const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/blog/frontend', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog/backend', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog/cloud', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog/developer', changefreq: 'weekly', priority: '0.8' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
]

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

  const urls = [
    ...STATIC_PAGES.map((page) => ({ ...page, lastmod: siteLastmod })),
    ...posts.map((post) => ({
      path: post.path,
      lastmod: toDay(post.updatedAt || post.createdAt),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...authors.map((author) => ({
      path: `/authors/${author.slug}`,
      lastmod: siteLastmod,
      changefreq: 'monthly',
      priority: '0.4',
    })),
  ]

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
