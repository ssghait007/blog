// llms-full.txt: full markdown of every published post in one file, so an AI
// assistant can read the whole blog in a single fetch.
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const { public: { siteUrl: SITE_URL } } = useRuntimeConfig()

  const posts = await queryCollection(event, 'blog')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .all()

  const docs = await Promise.all(
    posts.map(async (post) => {
      // Post paths are /blog/<slug>; the source file is content/blog/<slug>.md
      const file = join(process.cwd(), 'content', `${post.path.replace(/^\//, '')}.md`)
      const raw = await readFile(file, 'utf8').catch(() => '')
      const body = raw.replace(/^---[\s\S]*?---\s*/, '').trim()
      return `# ${post.title}

URL: ${SITE_URL}${post.path}
Author: ${post.author}
Published: ${post.createdAt.slice(0, 10)}${post.updatedAt ? `\nUpdated: ${post.updatedAt.slice(0, 10)}` : ''}
Category: ${post.category}
Tags: ${post.tags.join(', ')}

${body}`
    })
  )

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# Sachin Ghait Blog: full text\n\n> Source: ${SITE_URL}/llms.txt\n\n${docs.join('\n\n---\n\n')}\n`
})
