import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteUrl } from '@/lib/site';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Hücki SEO/GEO Blog',
    description: 'Bilingual AI-first engineering, SEO, and software architecture articles by Dominic Hückmann.',
    site: context.site?.toString() ?? siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `${post.data.language === 'en' ? '/en' : ''}/blog/${post.data.slug}/`,
    })),
  });
}
