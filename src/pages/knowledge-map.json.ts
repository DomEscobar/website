import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildKnowledgeMap } from '@/lib/agent-readable';

export const prerender = true;

export const GET: APIRoute = async () => {
  const [posts, tools] = await Promise.all([getCollection('blog'), getCollection('tools')]);

  return new Response(JSON.stringify(buildKnowledgeMap(posts, tools), null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });
};
