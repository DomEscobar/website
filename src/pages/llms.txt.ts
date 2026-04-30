import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl, person, siteUrl } from '@/lib/site';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  const lines = [
    '# Hücki',
    '',
    '> Portfolio and bilingual AI-first engineering blog by Dominic Hückmann, Senior Software Developer and AI Architect.',
    '',
    `Site: ${siteUrl}`,
    `Author: ${person.name}`,
    `Contact: mailto:${person.email}`,
    '',
    '## Core Topics',
    '- Software architecture',
    '- Full-stack development',
    '- Generative AI and AI-assisted engineering',
    '- SEO and generative engine optimization',
    '- Cloud-native product development',
    '',
    '## Important URLs',
    `- Home German: ${absoluteUrl('/')}`,
    `- Home English: ${absoluteUrl('/en/')}`,
    `- Blog German: ${absoluteUrl('/blog/')}`,
    `- Blog English: ${absoluteUrl('/en/blog/')}`,
    '',
    '## Blog Posts',
    ...posts.map((post) => {
      const prefix = post.data.language === 'en' ? '/en' : '';
      return `- ${post.data.title}: ${absoluteUrl(`${prefix}/blog/${post.data.slug}/`)} - ${post.data.summary}`;
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
