// llms.txt: a concise, machine-readable index of the site for AI assistants
// (see https://llmstxt.org). Generated at build time from published posts.
export default defineEventHandler(async (event) => {
  const { public: { siteUrl: SITE_URL } } = useRuntimeConfig()

  const posts = await queryCollection(event, 'blog')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .all()

  const byCategory = new Map<string, typeof posts>()
  for (const post of posts) {
    byCategory.set(post.category, [...(byCategory.get(post.category) ?? []), post])
  }

  const sections = [...byCategory.entries()]
    .map(([category, items]) => {
      const lines = items.map((post) => `- [${post.title}](${SITE_URL}${post.path}): ${post.description}`)
      return `## ${category}\n\n${lines.join('\n')}`
    })
    .join('\n\n')

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# Sachin Ghait Blog

> Practical developer notes by Sachin Ghait on cloud (AWS, GCP), DevOps, web security, Git, automation and AI tooling. Every post has a TL;DR, FAQs, sources and a published/updated date.

- Author: [Sachin Ghait](${SITE_URL}/authors/sachin-ghait), Lead Developer
- Full text of all posts in one file: [llms-full.txt](${SITE_URL}/llms-full.txt)
- Sitemap: ${SITE_URL}/sitemap.xml
- RSS: ${SITE_URL}/rss.xml

${sections}

## Site pages

- [About](${SITE_URL}/about-us): who writes this blog and its editorial policy
- [Contact](${SITE_URL}/contact): send feedback or corrections
`
})
