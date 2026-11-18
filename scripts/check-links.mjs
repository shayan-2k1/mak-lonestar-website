// Post-build quality check: internal links, anchors and on-page SEO for every page in dist/.
// Usage: npm run build && npm run check:links
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(DIST);

const toPath = (file) => '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '');
const exists = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  const p = join(DIST, clean);
  return existsSync(p) && statSync(p).isFile() || existsSync(join(p, 'index.html'));
};

let problems = 0;
const warn = (page, msg) => { problems++; console.log(`✗ ${page}: ${msg}`); };
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const file of files.sort()) {
  const html = readFileSync(file, 'utf8');
  const page = toPath(file);
  const pageIds = ids(html);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) warn(page, 'missing <title>');
  else if (title.length > 65) warn(page, `title is ${title.length} chars`);
  if (!desc) warn(page, 'missing meta description');
  else if (desc.length > 165) warn(page, `description is ${desc.length} chars`);
  if (h1s !== 1) warn(page, `${h1s} <h1> elements`);
  if (!/<link rel="canonical"/.test(html)) warn(page, 'missing canonical');
  if (!/property="og:image"/.test(html)) warn(page, 'missing og:image');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { warn(page, `invalid JSON-LD: ${e.message}`); }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) warn(page, `img without alt: ${m[0].slice(0, 80)}`);
  // heading order: no jumps of more than one level
  let prev = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) { const l = +m[1]; if (prev && l > prev + 1) warn(page, `heading jumps h${prev} → h${l}`); prev = l; }
  // links
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    if (href === '#') { warn(page, 'link to "#"'); continue; }
    if (href.startsWith('#')) { if (!pageIds.has(href.slice(1))) warn(page, `missing anchor ${href}`); continue; }
    if (href.startsWith('/') && !exists(href)) warn(page, `broken link ${href}`);
    if (href.includes('#') && href.startsWith('/')) {
      const [p, a] = href.split('#');
      const target = join(DIST, p, 'index.html');
      if (existsSync(target) && !ids(readFileSync(target, 'utf8')).has(a)) warn(page, `missing anchor ${href}`);
    }
  }
  // duplicate ids on a page
  const all = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = all.filter((v, i) => all.indexOf(v) !== i);
  if (dup.length) warn(page, `duplicate ids: ${[...new Set(dup)].join(', ')}`);
}
console.log(problems ? `\n${problems} problem(s) in ${files.length} pages` : `✓ ${files.length} pages checked: links, anchors, titles, descriptions, H1s, canonicals, JSON-LD and heading order all pass`);
process.exit(problems ? 1 : 0);
