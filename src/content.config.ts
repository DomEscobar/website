import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.enum(['de', 'en']),
    slug: z.string(),
    canonicalSlug: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    topic: z.string(),
    summary: z.string(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.enum(['de', 'en']),
    slug: z.string(),
    canonicalSlug: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum(['Skill', 'Tool', 'Template', 'Workflow', 'Prompt']),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['Draft', 'Experimental', 'Stable']).default('Experimental'),
    homepageUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    downloadUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, tools };
