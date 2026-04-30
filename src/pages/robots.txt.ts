import type { APIRoute } from 'astro';
import { siteUrl } from '@/lib/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', siteUrl).toString()}`,
    `Host: ${new URL(siteUrl).host}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
