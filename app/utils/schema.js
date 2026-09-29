// Helpers that build schema.org JSON-LD so search engines and AI assistants
// can read site, author and post facts exactly.

export const SITE_URL = 'https://onthegoalways.com'
export const SITE_NAME = 'Sachin Ghait Blog'
export const SITE_DESCRIPTION =
  'Practical developer notes by Sachin Ghait on cloud (AWS, GCP), DevOps, web security, Git, automation and AI tooling, with tested steps and sources.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hand-drawn.webp`

export const PERSON_ID = `${SITE_URL}/authors/sachin-ghait#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const authorSlugOf = (name) => name.toLowerCase().replace(/\s+/g, '-')

// Turn a stored author record into Person schema
export const personSchema = (author) => {
  const social = author.social || {}
  const sameAs = [
    social.github && `https://github.com/${social.github}`,
    social.twitter && `https://x.com/${social.twitter.replace(/^@/, '')}`,
    social.linkedin && `https://www.linkedin.com/in/${social.linkedin}`,
  ].filter(Boolean)

  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${SITE_URL}/authors/${author.slug}`,
    image: author.avatar?.startsWith('/') ? `${SITE_URL}${author.avatar}` : author.avatar,
    ...(author.worksFor ? { worksFor: { '@type': 'Organization', name: author.worksFor } } : {}),
    ...(author.alumniOf ? { alumniOf: { '@type': 'CollegeOrUniversity', name: author.alumniOf } } : {}),
    ...(author.location ? { homeLocation: { '@type': 'Place', name: author.location } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(author.specialties?.length ? { knowsAbout: author.specialties } : {}),
  }
}

export const publisherSchema = () => ({
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
})

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

// Plain text of a minimark node ([tag, props, ...children] or string).
// Inline elements are joined without extra spaces; block elements with one.
const INLINE_TAGS = new Set(['a', 'code', 'strong', 'em', 'span', 'b', 'i', 'kbd', 'mark', 'del'])
const textOf = (node) => {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  return node
    .slice(2)
    .map((child, index) => {
      const inline = typeof child === 'string' || INLINE_TAGS.has(child?.[0])
      return (index > 0 && !inline ? ' ' : '') + textOf(child)
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

export const wordCountOf = (body) =>
  (body?.value || []).map(textOf).join(' ').split(/\s+/).filter(Boolean).length

// Build FAQPage from the "Frequently Asked Questions" section (h3 = question)
export const faqSchema = (body) => {
  const nodes = body?.value || []
  const start = nodes.findIndex(
    (n) => Array.isArray(n) && n[0] === 'h2' && /frequently asked/i.test(textOf(n))
  )
  if (start === -1) return null

  const questions = []
  for (const node of nodes.slice(start + 1)) {
    if (!Array.isArray(node)) continue
    if (node[0] === 'h2') break
    if (node[0] === 'h3') {
      questions.push({ name: textOf(node), answer: [] })
    } else if (questions.length) {
      questions.at(-1).answer.push(textOf(node))
    }
  }

  const entries = questions
    .filter((q) => q.answer.join('').trim())
    .map((q) => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: { '@type': 'Answer', text: q.answer.join(' ').trim() },
    }))

  return entries.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: entries }
    : null
}

// "5 min read" -> "PT5M"
export const isoDurationOf = (readingTime) => {
  const minutes = String(readingTime || '').match(/\d+/)?.[0]
  return minutes ? `PT${minutes}M` : undefined
}

// Register one or more JSON-LD blocks. Stable keys stop hydration from
// duplicating the tags that were already rendered into the static HTML.
export const useJsonLd = (blocks) => {
  useHead({
    script: blocks.filter(Boolean).map((block, index) => ({
      key: `jsonld-${block['@type'] || index}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    })),
  })
}

// Common per-page SEO: title, description, canonical, OG and Twitter tags
export const usePageSeo = ({ title, description, path, image, type = 'website' }) => {
  const url = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE
  useSeoMeta({
    title,
    description,
    ogType: type,
    ogUrl: url,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
