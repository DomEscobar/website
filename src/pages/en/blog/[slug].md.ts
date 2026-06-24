import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogMarkdown, markdownResponse } from '@/lib/agent-readable';

export const prerender = true;

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((post) => post.data.language === 'en' && !post.data.draft);
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => markdownResponse(blogMarkdown(props.post));
