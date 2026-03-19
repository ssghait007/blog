import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const { public: { siteUrl: SITE_URL } } = useRuntimeConfig()

  const feed = new Feed({
    title: 'Sachin Ghait Blog',
    description: 'Knowledge shared is knowledge squared. A space to reflect on personal growth and share insights with the developer community.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Sachin Ghait`,
    author: {
      name: 'Sachin Ghait',
      link: SITE_URL,
    },
  })

  const posts = await queryCollection(event, 'blog')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .all()

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}${post.path}`,
      link: `${SITE_URL}${post.path}`,
      description: post.description,
      date: new Date(post.createdAt),
      author: [{ name: post.author }],
      category: [{ name: post.category }],
    })
  }

  setResponseHeader(event, 'content-type', 'application/xml')
  return feed.rss2()
})
