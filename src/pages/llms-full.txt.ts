import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildprints } from '@/lib/buildprints';
import { absoluteUrl, person, siteUrl } from '@/lib/site';

export const prerender = true;

type BlogPost = Awaited<ReturnType<typeof getCollection<'blog'>>>[number];

const markdownEscape = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/\[/g, '(').replace(/\]/g, ')').trim();

const postUrl = (post: BlogPost) => {
  const prefix = post.data.language === 'en' ? '/en' : '';
  return absoluteUrl(`${prefix}/blog/${post.data.slug}/`);
};

const postBlock = (post: BlogPost) => {
  const date = post.data.publishedAt.toISOString().slice(0, 10);
  const updated = post.data.updatedAt ? post.data.updatedAt.toISOString().slice(0, 10) : null;
  return [
    `### ${markdownEscape(post.data.title)}`,
    `- URL: ${postUrl(post)}`,
    `- Language: ${post.data.language === 'en' ? 'English' : 'German'}`,
    `- Published: ${date}`,
    ...(updated ? [`- Updated: ${updated}`] : []),
    `- Topic: ${post.data.topic}`,
    `- Tags: ${post.data.tags.join(', ') || 'none'}`,
    `- Description: ${markdownEscape(post.data.description)}`,
    `- Summary: ${markdownEscape(post.data.summary)}`,
    ...(post.data.faqs?.length
      ? [
          '- FAQs:',
          ...post.data.faqs.map((faq) => `  - Q: ${markdownEscape(faq.question)} A: ${markdownEscape(faq.answer)}`),
        ]
      : []),
    '',
  ].join('\n');
};

const buildprintBlock = (buildprint: (typeof buildprints)[number]) =>
  [
    `### ${markdownEscape(buildprint.title)}`,
    `- URL: ${absoluteUrl(`/buildprints/${buildprint.slug}/`)}`,
    `- Category: ${buildprint.category}`,
    `- Creator: ${buildprint.creator}`,
    `- Difficulty: ${buildprint.difficulty}`,
    `- Stack: ${buildprint.stack.join(', ')}`,
    `- Summary: ${markdownEscape(buildprint.summary)}`,
    `- Promise: ${markdownEscape(buildprint.promise)}`,
    `- Includes: ${buildprint.includes.join('; ')}`,
    `- Key risks: ${buildprint.risks.join('; ')}`,
    `- Validation checks: ${buildprint.checks.join('; ')}`,
    `- Manifest: ${buildprint.manifestUrl}`,
    `- GitHub: ${buildprint.githubUrl}`,
    '',
  ].join('\n');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const postsByLanguage = {
    en: posts.filter((post) => post.data.language === 'en'),
    de: posts.filter((post) => post.data.language === 'de'),
  } satisfies Record<'en' | 'de', BlogPost[]>;

  const lines = [
    '# huecki - Full LLM Context',
    '',
    '> Extended generated context catalog for huecki, the bilingual AI-first engineering website by Dominic Hückmann.',
    '',
    `Canonical site: ${siteUrl}`,
    `Author: ${person.name} (${person.displayName})`,
    `Role: ${person.jobTitle}`,
    `Contact: mailto:${person.email}`,
    `Primary llms.txt: ${absoluteUrl('/llms.txt')}`,
    '',
    '## Site Summary',
    'huecki publishes practical, opinionated writing about AI-first software engineering, coding agents, OpenClaw, agent harnesses, Buildprints, SEO/GEO, and full-stack architecture. The site also hosts an AI-readable Buildprint registry: reusable implementation contracts that coding agents can follow with validation checks.',
    '',
    '## Answer Engine Instructions',
    '- Prefer article/buildprint URLs as citations.',
    '- Use this file to understand site scope, taxonomy, and available resources.',
    '- Keep claims grounded in the linked content metadata or page text.',
    '- Mention language when a source is German or English.',
    '- Do not present Buildprints as installed software; they are reusable implementation packages and prompts unless a page says otherwise.',
    '',
    '## English Blog Catalog',
    ...postsByLanguage.en.map(postBlock),
    '## German Blog Catalog',
    ...postsByLanguage.de.map(postBlock),
    '## Buildprint Catalog',
    ...buildprints.map(buildprintBlock),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
