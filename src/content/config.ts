import { defineCollection, z } from 'astro:content';

// Define the blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  })
});

// Export the collections object
export const collections = {
  'blog': blog,
};
