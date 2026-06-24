import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogPath, toolPath } from '@/lib/agent-readable';
import { agentTopics, getEntryTopicIds, topicUrl } from '@/lib/agent-topics';
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
    `- Markdown URL: ${absoluteUrl(blogPath(post, true))}`,
    `- Language: ${post.data.language === 'en' ? 'English' : 'German'}`,
    `- Published: ${date}`,
    ...(updated ? [`- Updated: ${updated}`] : []),
    `- Topic: ${post.data.topic}`,
    `- Agent topics: ${getEntryTopicIds(post).join(', ')}`,
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

const toolBlock = (tool: Awaited<ReturnType<typeof getCollection<'tools'>>>[number]) => {
  const date = tool.data.publishedAt.toISOString().slice(0, 10);
  const updated = tool.data.updatedAt ? tool.data.updatedAt.toISOString().slice(0, 10) : null;
  return [
    `### ${markdownEscape(tool.data.title)}`,
    `- URL: ${absoluteUrl(toolPath(tool))}`,
    `- Markdown URL: ${absoluteUrl(toolPath(tool, true))}`,
    `- Language: ${tool.data.language === 'en' ? 'English' : 'German'}`,
    `- Published: ${date}`,
    ...(updated ? [`- Updated: ${updated}`] : []),
    `- Category: ${tool.data.category}`,
    `- Status: ${tool.data.status}`,
    `- Agent topics: ${getEntryTopicIds(tool).join(', ')}`,
    `- Tags: ${tool.data.tags.join(', ') || 'none'}`,
    `- Description: ${markdownEscape(tool.data.description)}`,
    `- Summary: ${markdownEscape(tool.data.summary)}`,
    '',
  ].join('\n');
};

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const postsByLanguage = {
    en: posts.filter((post) => post.data.language === 'en'),
    de: posts.filter((post) => post.data.language === 'de'),
  } satisfies Record<'en' | 'de', BlogPost[]>;
  const tools = (await getCollection('tools'))
    .filter((tool) => !tool.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

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
    `Knowledge map: ${absoluteUrl('/knowledge-map.json')}`,
    '',
    '## Site Summary',
    'huecki publishes practical, opinionated writing about AI-first software engineering, coding agents, OpenClaw, agent harnesses, Buildprints, SEO/GEO, and full-stack architecture. The site also hosts an Agent Buildprint registry: executable phase-flow contracts that coding agents can follow with runtime evidence schemas, review loops, proof gates, and validation checks.',
    '',
    '## Answer Engine Instructions',
    '- Prefer article/buildprint URLs as citations.',
    '- Use this file to understand site scope, taxonomy, and available resources.',
    '- Keep claims grounded in the linked content metadata or page text.',
    '- Mention language when a source is German or English.',
    '- Do not present Buildprints as installed software; they are executable implementation contracts, phase-flow packets, prompts, and validation artifacts unless a page says otherwise.',
    '- Prefer per-page Markdown URLs for clean retrieval when available.',
    '',
    '## Agent-Readable Exports',
    `- Compact map: ${absoluteUrl('/llms.txt')}`,
    `- Full catalog: ${absoluteUrl('/llms-full.txt')}`,
    `- Knowledge graph: ${absoluteUrl('/knowledge-map.json')}`,
    '- Markdown route convention: /en/blog/{slug}.md, /blog/{slug}.md, /en/tools/{slug}.md, /tools/{slug}.md',
    '',
    '## Topic Hubs',
    ...agentTopics.map((topic) => `- ${topic.labels.en}: ${topicUrl('en', topic.id)} — ${topic.descriptions.en}`),
    '',
    '## Featured Learning Resource',
    '### AI Native Engineering: From prompt writer to AI system builder',
    `- English URL: ${absoluteUrl('/en/ai-native-engineering/')}`,
    `- German URL: ${absoluteUrl('/ai-native-engineering/')}`,
    '- Type: public developer course / interactive slide deck',
    '- Audience: software developers, tech leads, and AI-feature teams building LLM features, coding-agent workflows, and production AI systems.',
    '- Learning curve: mechanics (tokens, context windows, position effects, precision traps) -> contracts (Task Contracts, schemas, source boundaries, tools) -> workflows (decomposition, pipelines, skills) -> operations (evals, traces, rollout, cost/latency, UX trust, incident response, ownership).',
    '- Core thesis: AI-native engineering is not prompt cleverness; it is context design, decomposition, evidence, evals, controlled tools, and operational ownership.',
    '- Key artifacts: embedded Reveal.js deck at /decks/llm-native-lessons.html, related blog posts, Agent Buildprint links, and source references including Lost in the Middle, ReAct, Tree of Thoughts, DSPy, OWASP LLM Top 10, NIST AI RMF, and provider prompting docs.',
    '',
    '## English Blog Catalog',
    ...postsByLanguage.en.map(postBlock),
    '## German Blog Catalog',
    ...postsByLanguage.de.map(postBlock),
    '## Tool Catalog',
    ...tools.map(toolBlock),
    '## Buildprint Catalog',
    ...buildprints.map(buildprintBlock),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
