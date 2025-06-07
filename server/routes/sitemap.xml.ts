export default defineEventHandler(async (event) => {
  const siteUrl = 'https://onthegoalways.com'

  // Static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/blog/frontend', priority: '0.8', changefreq: 'weekly' },
    { path: '/blog/backend', priority: '0.8', changefreq: 'weekly' },
    { path: '/blog/cloud', priority: '0.8', changefreq: 'weekly' },
    { path: '/blog/developer', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/about-us', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.6', changefreq: 'yearly' }
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
