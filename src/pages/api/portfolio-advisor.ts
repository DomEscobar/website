import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!import.meta.env.GOOGLE_GENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GOOGLE_GENAI_API_KEY is not configured.' }), {
        status: 503,
        headers: { 'content-type': 'application/json' },
      });
    }

    const { suggestPortfolioImprovements } = await import('@/ai/flows/ai-portfolio-improvement');
    const body = await request.json().catch(() => ({}));
    const locale = body.locale === 'en' ? 'en' : 'de';

    const portfolioContent =
      locale === 'de'
        ? 'Hücki - Senior Software Developer, Softwarearchitekt und AI Architect. Portfolio mit 10+ Jahren Erfahrung, AI-first Ansatz, Projekten wie DerPlanner AI, 1000 Prototypes, PDF Editor und CRM Canvas Board. Themen: KI, Softwarearchitektur, Fullstack, Cloud Native, TypeScript, React, Node.js und SEO.'
        : 'Hücki - Senior Software Developer, Software Architect, and AI Architect. Portfolio with 10+ years of experience, an AI-first approach, and projects including DerPlanner AI, 1000 Prototypes, PDF Editor, and CRM Canvas Board. Topics: AI, software architecture, full-stack development, cloud native, TypeScript, React, Node.js, and SEO.';

    const userEngagementMetrics =
      'Qualitative portfolio review requested from an on-page assistant. Prioritize clarity, discoverability, credibility, conversion paths, and GEO/SEO structure.';
    const designTrends =
      'Fast static pages, dark-mode design, clear topic clusters, structured data, concise summaries, author expertise, accessible CTAs, and AI-readable content blocks.';

    const response = await suggestPortfolioImprovements({
      portfolioContent,
      userEngagementMetrics,
      designTrends,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('AI advisor failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate portfolio improvements.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
