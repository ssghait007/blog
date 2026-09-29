// Runs after `nuxt generate`: writes a clean markdown mirror of every
// published post to dist/blog/<slug>.md (linked from each post via rel="alternate").
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const SITE_URL = 'https://onthegoalways.com'
const srcDir = join(process.cwd(), 'content', 'blog')
const outDir = join(process.cwd(), 'dist', 'blog')

const field = (frontmatter, name) =>
  frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'))?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? ''

await mkdir(outDir, { recursive: true })
let count = 0

for (const file of (await readdir(srcDir)).filter((name) => name.endsWith('.md'))) {
  const raw = await readFile(join(srcDir, file), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) continue
  const [, frontmatter, body] = match
  if (field(frontmatter, 'published') !== 'true') continue

  const slug = file.replace(/\.md$/, '')
  const updated = field(frontmatter, 'updatedAt')
  const header = [
    `# ${field(frontmatter, 'title')}`,
    '',
    `URL: ${SITE_URL}/blog/${slug}`,
    `Author: ${field(frontmatter, 'author')}`,
    `Published: ${field(frontmatter, 'createdAt').slice(0, 10)}`,
    updated ? `Updated: ${updated.slice(0, 10)}` : null,
    `Category: ${field(frontmatter, 'category')}`,
    '',
  ]
    .filter((line) => line !== null)
    .join('\n')

  await writeFile(join(outDir, `${slug}.md`), `${header}\n${body.trim()}\n`)
  count += 1
}

console.log(`postgenerate: wrote ${count} markdown mirrors to dist/blog/`)
