import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedDate: z.coerce.date(),
    category: z.string(),
    categoryColor: z.enum(['blue', 'green', 'orange', 'purple', 'red']),
    author: z.string().default('Equipo Subdominio'),
    readingTime: z.number(),
    featured: z.boolean().default(false),
    slug: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};