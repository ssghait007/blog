export default defineEventHandler(async (event) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://onthegoalways.com/sitemap.xml`

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
