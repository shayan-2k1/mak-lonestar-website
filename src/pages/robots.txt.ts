import type { APIRoute } from 'astro';
import { abs } from '../lib/url';

// Indexing is opt-in: preview deployments stay out of search results so the prototype
// never competes with the live website. Set PUBLIC_ALLOW_INDEXING=true on production.
export const GET: APIRoute = () => {
  const allow = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';
  const sitemap = abs('/sitemap-index.xml');
  const body = allow
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Preview build: indexing disabled\nUser-agent: *\nDisallow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
