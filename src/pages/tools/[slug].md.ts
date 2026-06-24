import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { markdownResponse, toolMarkdown } from '@/lib/agent-readable';

export const prerender = true;

export async function getStaticPaths() {
  const tools = (await getCollection('tools')).filter((tool) => tool.data.language === 'de' && !tool.data.draft);
  return tools.map((tool) => ({
    params: { slug: tool.data.slug },
    props: { tool },
  }));
}

export const GET: APIRoute = ({ props }) => markdownResponse(toolMarkdown(props.tool));
