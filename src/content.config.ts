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
    thesis: z.string().optional(),
    audience: z.array(z.string()).default([]),
    concepts: z.array(z.string()).default([]),
    related: z
      .array(
        z.object({
          slug: z.string(),
          relation: z.string(),
        }),
      )
      .default([]),
    sourceRefs: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          type: z.string().optional(),
        }),
      )
      .default([]),
    claimStatus: z.string().optional(),
    contentStatus: z.enum(['field-note', 'evergreen', 'reference', 'draft']).default('field-note'),
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
    thesis: z.string().optional(),
    audience: z.array(z.string()).default([]),
    concepts: z.array(z.string()).default([]),
    related: z
      .array(
        z.object({
          slug: z.string(),
          relation: z.string(),
        }),
      )
      .default([]),
    sourceRefs: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          type: z.string().optional(),
        }),
      )
      .default([]),
    contentStatus: z.enum(['field-note', 'evergreen', 'reference', 'draft']).default('reference'),
    status: z.enum(['Draft', 'Experimental', 'Stable']).default('Experimental'),
    homepageUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    downloadUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, tools };
