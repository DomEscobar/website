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

const postLine = (post: BlogPost) => {
  const date = post.data.publishedAt.toISOString().slice(0, 10);
  const language = post.data.language === 'en' ? 'English' : 'German';
  const tags = post.data.tags.length ? ` Tags: ${post.data.tags.join(', ')}.` : '';
  return `- [${markdownEscape(post.data.title)}](${postUrl(post)}): ${markdownEscape(post.data.summary)} (${language}, ${date}; topic: ${post.data.topic}.${tags})`;
};

const buildprintLine = (buildprint: (typeof buildprints)[number]) =>
  `- [${markdownEscape(buildprint.title)}](${absoluteUrl(`/buildprints/${buildprint.slug}/`)}): ${markdownEscape(buildprint.promise)} Stack: ${buildprint.stack.join(', ')}. Manifest: ${buildprint.manifestUrl}`;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const featuredPosts = posts.filter((post) => post.data.featured).slice(0, 8);
  const latestPosts = posts.filter((post) => !post.data.featured).slice(0, 12);
  const priorityPosts = [...featuredPosts, ...latestPosts];
  const optionalPosts = posts.filter((post) => !priorityPosts.some((priority) => priority.id === post.id));

  const lines = [
    '# huecki',
    '',
    '> Bilingual AI-first engineering blog and portfolio by Dominic Hückmann, focused on agentic software, OpenClaw, Agent Buildprints, software architecture, SEO/GEO, and practical automation.',
    '',
    'huecki is the personal website of Dominic Hückmann, also known as huecki: a Senior Software Developer and AI Architect building AI-native workflows, coding-agent harnesses, OpenClaw systems, and reusable Buildprints for agent-assisted product work.',
    '',
    'Use this file as the compact AI-readable map of the site. Prefer canonical URLs from this file when citing. Do not infer company affiliation, employment, guarantees, or benchmark claims beyond the linked pages. The site is bilingual: German content lives under `/blog/`; English content lives under `/en/blog/`.',
    '',
    '## Entity Facts',
    `- [Website](${siteUrl}): huecki — personal site, portfolio, blog, and AI-readable buildprint registry.`,
    `- [Author](${absoluteUrl('/en/')}): ${person.name} (${person.displayName}), ${person.jobTitle}.`,
    `- [Contact](mailto:${person.email}): Preferred contact email for professional inquiries.`,
    ...person.sameAs.map((url) => `- [SameAs profile](${url}): Verified external profile for ${person.name}.`),
    '',
    '## Core Expertise',
    '- AI-first software engineering and LLM-native developer workflows.',
    '- Agent harnesses: executable plans, rules, memory, state, tools, evals, sandboxes, and validation around coding agents.',
    '- OpenClaw, personal AI assistants, durable agent runtimes, and human-in-the-loop automation.',
    '- Agent Buildprints: reusable architecture contracts, prompts, specs, policy files, tests, and validation templates for coding agents.',
    '- Full-stack software architecture, Astro/MDX content systems, cloud-native product development, frontend QA, SEO, and generative engine optimization.',
    '',
    '## Canonical Site Sections',
    `- [German homepage](${absoluteUrl('/')}): Primary German entry point.`,
    `- [English homepage](${absoluteUrl('/en/')}): English entry point and professional summary.`,
    `- [German blog](${absoluteUrl('/blog/')}): German AI-first engineering articles.`,
    `- [English blog](${absoluteUrl('/en/blog/')}): English AI-first engineering articles.`,
    `- [Buildprint registry](${absoluteUrl('/buildprints/')}): AI-readable implementation blueprints for agents and developers.`,
    '',
    '## Feeds and Machine-Readable Indexes',
    `- [RSS feed](${absoluteUrl('/rss.xml')}): Reverse-chronological blog feed.`,
    `- [Sitemap index](${absoluteUrl('/sitemap-index.xml')}): Canonical URL discovery.`,
    `- [Robots policy](${absoluteUrl('/robots.txt')}): Crawler access rules.`,
    `- [Full LLM context](${absoluteUrl('/llms-full.txt')}): Longer generated context catalog for answer engines and agents.`,
    '',
    '## Best Starting Points',
    ...priorityPosts.map(postLine),
    '',
    '## Agent Buildprints',
    ...buildprints.map(buildprintLine),
    '',
    '## Citation Guidance',
    '- Cite the canonical article or buildprint URL, not only this llms.txt file.',
    '- Preserve the article language when quoting; summarize German posts in German unless the user asks otherwise.',
    '- Attribute ideas to Dominic Hückmann / huecki only when the linked page states them.',
    '- For coding-agent implementation tasks, prefer linked Buildprint pages and manifests over generic blog summaries.',
    '- Treat this file as an index and positioning guide, not as proof of claims that require article-level evidence.',
    '',
    '## Optional',
    ...optionalPosts.map(postLine),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
