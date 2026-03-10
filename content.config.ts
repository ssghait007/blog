import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  highlight: {
    theme: 'github-dark',
  },
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        published: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string().optional(),
        image: z.string(),
        author: z.string(),
        authorTitle: z.string(),
        readingTime: z.string(),
        tags: z.array(z.string()),
        proficiency: z.string(),
      }),
    }),
    authors: defineCollection({
      type: 'page',
      source: 'authors/**',
      schema: z.object({
        name: z.string(),
        slug: z.string(),
        avatar: z.string(),
        title: z.string(),
        bio: z.string(),
        location: z.string().optional(),
        website: z.string().optional(),
        joinedDate: z.string().optional(),
        social: z
          .object({
            github: z.string().optional(),
            twitter: z.string().optional(),
            linkedin: z.string().optional(),
            email: z.string().optional(),
          })
          .optional(),
        specialties: z.array(z.string()).optional(),
      }),
    }),
  },
})
