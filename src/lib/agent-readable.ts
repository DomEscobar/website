import type { CollectionEntry } from 'astro:content';
import { absoluteUrl, localizedPath } from '@/lib/site';
import { agentTopics, getEntryTopicIds, getTopic, markdownEscape } from '@/lib/agent-topics';

type BlogEntry = CollectionEntry<'blog'>;
type ToolEntry = CollectionEntry<'tools'>;

const dateOnly = (date: Date) => date.toISOString().slice(0, 10);

export const blogPath = (post: BlogEntry, markdown = false) => {
  const prefix = post.data.language === 'en' ? '/en' : '';
  const suffix = markdown ? '.md' : '/';
  return `${prefix}/blog/${post.data.slug}${suffix}`;
};

export const toolPath = (tool: ToolEntry, markdown = false) => {
  const prefix = tool.data.language === 'en' ? '/en' : '';
  const suffix = markdown ? '.md' : '/';
  return `${prefix}/tools/${tool.data.slug}${suffix}`;
};

export const cleanMdxBody = (body: string) =>
  body
    .replace(/^import\s+.*?;?\s*$/gm, '')
    .replace(/^export\s+.*?;?\s*$/gm, '')
    .replace(/<([A-Z][A-Za-z0-9_]*)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<([A-Z][A-Za-z0-9_]*)\b[\s\S]*?\/>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const linesOrNone = (label: string, values: string[]) => (values.length ? [`- ${label}: ${values.join(', ')}`] : []);

const sourceLines = (sources: { title: string; url: string; type?: string }[]) =>
  sources.length
    ? [
        '',
        '## Source References',
        '',
        ...sources.map((source) => `- [${markdownEscape(source.title)}](${source.url})${source.type ? ` (${source.type})` : ''}`),
      ]
    : [];

const relatedLines = (related: { slug: string; relation: string }[]) =>
  related.length
    ? [
        '',
        '## Related',
        '',
        ...related.map((item) => `- ${item.relation}: ${item.slug}`),
      ]
    : [];

const faqLines = (faqs: { question: string; answer: string }[] | undefined) =>
  faqs?.length
    ? [
        '',
        '## FAQ',
        '',
        ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
      ]
    : [];

export const blogMarkdown = (post: BlogEntry) => {
  const updated = post.data.updatedAt ?? post.data.publishedAt;
  const topicIds = getEntryTopicIds(post);
  const body = cleanMdxBody(post.body ?? '');
  const topics = topicIds.map((id) => getTopic(id)?.labels[post.data.language] ?? id);

  return [
    `# ${post.data.title}`,
    '',
    `Canonical URL: ${absoluteUrl(blogPath(post))}`,
    `Markdown URL: ${absoluteUrl(blogPath(post, true))}`,
    `Language: ${post.data.language === 'en' ? 'English' : 'German'}`,
    `Published: ${dateOnly(post.data.publishedAt)}`,
    `Updated: ${dateOnly(updated)}`,
    `Author: ${post.data.author}`,
    `Topic: ${post.data.topic}`,
    ...linesOrNone('Agent topics', topics),
    ...linesOrNone('Tags', post.data.tags),
    ...linesOrNone('Audience', post.data.audience ?? []),
    ...linesOrNone('Concepts', post.data.concepts ?? []),
    post.data.thesis ? `Thesis: ${post.data.thesis}` : undefined,
    `Content status: ${post.data.contentStatus}`,
    '',
    '## Summary',
    '',
    post.data.summary,
    '',
    '## Description',
    '',
    post.data.description,
    '',
    '## Body',
    '',
    body,
    ...faqLines(post.data.faqs),
    ...relatedLines(post.data.related ?? []),
    ...sourceLines(post.data.sourceRefs ?? []),
    '',
  ].filter((line): line is string => line !== undefined).join('\n');
};

export const toolMarkdown = (tool: ToolEntry) => {
  const updated = tool.data.updatedAt ?? tool.data.publishedAt;
  const topicIds = getEntryTopicIds(tool);
  const body = cleanMdxBody(tool.body ?? '');
  const topics = topicIds.map((id) => getTopic(id)?.labels[tool.data.language] ?? id);
  const links = [
    tool.data.homepageUrl && `Homepage: ${tool.data.homepageUrl}`,
    tool.data.repositoryUrl && `Repository: ${tool.data.repositoryUrl}`,
    tool.data.downloadUrl && `Download: ${tool.data.downloadUrl}`,
  ].filter(Boolean) as string[];

  return [
    `# ${tool.data.title}`,
    '',
    `Canonical URL: ${absoluteUrl(toolPath(tool))}`,
    `Markdown URL: ${absoluteUrl(toolPath(tool, true))}`,
    `Language: ${tool.data.language === 'en' ? 'English' : 'German'}`,
    `Published: ${dateOnly(tool.data.publishedAt)}`,
    `Updated: ${dateOnly(updated)}`,
    `Author: ${tool.data.author}`,
    `Category: ${tool.data.category}`,
    `Status: ${tool.data.status}`,
    ...linesOrNone('Agent topics', topics),
    ...linesOrNone('Tags', tool.data.tags),
    ...linesOrNone('Audience', tool.data.audience ?? []),
    ...linesOrNone('Concepts', tool.data.concepts ?? []),
    tool.data.thesis ? `Thesis: ${tool.data.thesis}` : undefined,
    `Content status: ${tool.data.contentStatus}`,
    ...links,
    '',
    '## Summary',
    '',
    tool.data.summary,
    '',
    '## Description',
    '',
    tool.data.description,
    '',
    '## Body',
    '',
    body,
    ...relatedLines(tool.data.related ?? []),
    ...sourceLines(tool.data.sourceRefs ?? []),
    '',
  ].filter((line): line is string => line !== undefined).join('\n');
};

export const markdownResponse = (body: string) =>
  new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });

export const buildKnowledgeMap = (posts: BlogEntry[], tools: ToolEntry[]) => {
  const publicPosts = posts.filter((post) => !post.data.draft);
  const publicTools = tools.filter((tool) => !tool.data.draft);
  const entries = [...publicPosts, ...publicTools];

  return {
    site: absoluteUrl('/'),
    generatedAt: new Date().toISOString(),
    indexes: {
      llms: absoluteUrl('/llms.txt'),
      llmsFull: absoluteUrl('/llms-full.txt'),
      rss: absoluteUrl('/rss.xml'),
      sitemap: absoluteUrl('/sitemap-index.xml'),
    },
    markdownConvention: {
      blog: '/en/blog/{slug}.md and /blog/{slug}.md',
      tools: '/en/tools/{slug}.md and /tools/{slug}.md',
    },
    topics: agentTopics.map((topic) => ({
      id: topic.id,
      title: topic.labels.en,
      titleDe: topic.labels.de,
      description: topic.descriptions.en,
      descriptionDe: topic.descriptions.de,
      urls: {
        en: absoluteUrl(localizedPath('en', `/topics/${topic.id}/`)),
        de: absoluteUrl(localizedPath('de', `/topics/${topic.id}/`)),
      },
      entries: entries
        .filter((entry) => getEntryTopicIds(entry).includes(topic.id))
        .map((entry) => ({
          collection: entry.collection,
          slug: entry.data.slug,
          title: entry.data.title,
          language: entry.data.language,
          canonicalUrl: absoluteUrl(entry.collection === 'blog' ? blogPath(entry as BlogEntry) : toolPath(entry as ToolEntry)),
          markdownUrl: absoluteUrl(entry.collection === 'blog' ? blogPath(entry as BlogEntry, true) : toolPath(entry as ToolEntry, true)),
          summary: entry.data.summary,
          tags: entry.data.tags,
        })),
    })),
    posts: publicPosts.map((post) => ({
      slug: post.data.slug,
      title: post.data.title,
      language: post.data.language,
      canonicalUrl: absoluteUrl(blogPath(post)),
      markdownUrl: absoluteUrl(blogPath(post, true)),
      publishedAt: dateOnly(post.data.publishedAt),
      updatedAt: dateOnly(post.data.updatedAt ?? post.data.publishedAt),
      topic: post.data.topic,
      agentTopicIds: getEntryTopicIds(post),
      tags: post.data.tags,
      summary: post.data.summary,
      related: post.data.related,
      sourceRefs: post.data.sourceRefs,
    })),
    tools: publicTools.map((tool) => ({
      slug: tool.data.slug,
      title: tool.data.title,
      language: tool.data.language,
      canonicalUrl: absoluteUrl(toolPath(tool)),
      markdownUrl: absoluteUrl(toolPath(tool, true)),
      publishedAt: dateOnly(tool.data.publishedAt),
      updatedAt: dateOnly(tool.data.updatedAt ?? tool.data.publishedAt),
      category: tool.data.category,
      status: tool.data.status,
      agentTopicIds: getEntryTopicIds(tool),
      tags: tool.data.tags,
      summary: tool.data.summary,
      related: tool.data.related,
      sourceRefs: tool.data.sourceRefs,
    })),
  };
};
