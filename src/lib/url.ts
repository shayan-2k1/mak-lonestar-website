// URL helpers that respect Astro's `base` (e.g. "/mak-lonestar-website" on GitHub Pages, "" on a custom domain).
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const SITE = import.meta.env.SITE || 'https://maklonestar.com';

/** Prefix a root-relative path ("/about/") with the base path. */
export const withBase = (p: string) =>
  p.startsWith('/') && !p.startsWith('//') && !(BASE && (p === BASE || p.startsWith(BASE + '/'))) ? BASE + p : p;

/** Remove the base path, giving the route as written in the source ("/about/"). */
export const stripBase = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);

/** Absolute URL for a root-relative path, used for canonical, Open Graph and JSON-LD. */
export const abs = (p: string) => new URL(withBase(p), SITE).href;
