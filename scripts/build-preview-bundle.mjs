// Builds a single-file, hash-routed version of the site in preview-bundle/ for hosts that
// serve one HTML document (used for the shareable claude.ai preview link).
// The production site is dist/ (multi-page, clean URLs) — this bundle is only a demo wrapper.
// Usage: npm run build && npm run build:bundle
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const OUT = new URL('../preview-bundle/', import.meta.url).pathname;

const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(DIST);

const pathOf = (file) => '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '/');
const routeOf = (path) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
const routes = new Map(pages.map((f) => [pathOf(f), routeOf(pathOf(f))]));
routes.set('/404/', 'not-found');

const styles = new Set();
const scripts = new Set();
const sections = [];
let shell = null;

const read = (p) => readFileSync(join(DIST, p.replace(/^\//, '')), 'utf8');

for (const file of pages.sort()) {
  const html = readFileSync(file, 'utf8');
  const path = pathOf(file);
  const route = routes.get(path) ?? 'not-found';
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'MAK Lonestar';

  for (const m of html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)) styles.add(read(m[1]));
  for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) styles.add(m[1]);
  for (const m of html.matchAll(/<script type="module" src="([^"]+)"><\/script>/g)) scripts.add(read(m[1]));
  for (const m of html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)) scripts.add(m[1]);

  const start = html.indexOf('<main');
  const mainOpenEnd = html.indexOf('>', start) + 1;
  const end = html.indexOf('<footer');
  let body = html.slice(mainOpenEnd, end).replace(/<\/main>/, '');
  body = body.replace(/<script\b[\s\S]*?<\/script>/g, '');
  sections.push({ route, title, body });

  if (path === '/') {
    const headerStart = html.indexOf('<div class="utility"');
    const header = html.slice(headerStart, start).replace(/<script\b[\s\S]*?<\/script>/g, '');
    const footer = html.slice(end, html.indexOf('</footer>') + 9);
    const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'))
      .replace(/<link rel="stylesheet"[^>]*>/g, '')
      .replace(/<style>[\s\S]*?<\/style>/g, '')
      .replace(/<script type="module"[\s\S]*?<\/script>/g, '')
      .replace(/<link rel="(canonical|sitemap|preload|apple-touch-icon)"[^>]*>/g, '');
    shell = { head, header, footer };
  }
}

// Make ids unique across routes: an id used by more than one route is prefixed in each.
const idCount = new Map();
for (const s of sections) for (const id of new Set([...s.body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))) idCount.set(id, (idCount.get(id) || 0) + 1);
const dupes = new Set([...idCount].filter(([, n]) => n > 1).map(([id]) => id));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const s of sections) {
  const local = [...new Set([...s.body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))].filter((id) => dupes.has(id));
  if (!local.length) continue;
  const map = Object.fromEntries(local.map((id) => [id, `${s.route}--${id}`]));
  const swapList = (v) => v.split(/\s+/).map((t) => map[t] ?? t).join(' ');
  s.body = s.body
    .replace(/\s(id|for)="([^"]+)"/g, (m, a, v) => ` ${a}="${map[v] ?? v}"`)
    .replace(/\s(aria-labelledby|aria-describedby|aria-controls)="([^"]+)"/g, (m, a, v) => ` ${a}="${swapList(v)}"`)
    .replace(/url\(#([^)]+)\)/g, (m, v) => `url(#${map[v] ?? v})`)
    .replace(/href="#([^"]+)"/g, (m, v) => `href="#${map[v] ?? v}"`);
}

// Rewrite internal page links to hash routes.
const rewrite = (html) => html
  .replace(/href="(\/[^"]*)"/g, (m, href) => {
    const [p] = href.split(/[?#]/);
    const key = p.endsWith('/') ? p : p + '/';
    if (routes.has(key)) return `href="#${routes.get(key)}"`;
    return m;
  })
  .replace(/<li><a href="\/sitemap-index\.xml">Sitemap<\/a><\/li>/g, '')
  .replace(/href="\/favicon\.svg"/g, 'href="favicon.svg"');

let css = [...styles].join('\n').replace(/url\((['"]?)\/fonts\//g, 'url($1fonts/');
const routerJs = `
{
  const routes = [...document.querySelectorAll('[data-route]')];
  const byName = (n) => routes.find((r) => r.dataset.route === n);
  let current = null;
  const show = () => {
    const h = decodeURIComponent(location.hash.slice(1)) || 'home';
    let r = byName(h), target = null;
    if (!r) {
      const el = document.getElementById(h);
      if (el) { target = el; r = el.closest('[data-route]') || current || byName('home'); }
      else r = byName('not-found') || byName('home');
    }
    if (r !== current) {
      routes.forEach((x) => { x.hidden = x !== r; });
      current = r;
      document.title = r.dataset.title;
      document.querySelectorAll('.primary-nav a, .site-footer a').forEach((a) => {
        const on = a.getAttribute('href') === '#' + r.dataset.route;
        if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      document.querySelectorAll('.has-sub').forEach((li) => li.classList.toggle('is-current', r.dataset.route.startsWith('services')));
    }
    if (target) { target.scrollIntoView({ block: 'start' }); if (target.tabIndex < 0 && target.id !== 'main') target.focus({ preventScroll: true }); }
    else window.scrollTo(0, 0);
  };
  window.addEventListener('hashchange', show);
  show();
}`;

const out = `<!DOCTYPE html>
<html lang="en-US">
<head>
${rewrite(shell.head).replace(/<title>[^<]*<\/title>/, '<title>MAK Lonestar Consulting</title>').trim()}
<style>${css}</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${rewrite(shell.header)}
<main id="main" tabindex="-1">
${sections.map((s) => `<div data-route="${s.route}" data-title="${s.title}"${s.route === 'home' ? '' : ' hidden'}>\n${rewrite(s.body)}\n</div>`).join('\n')}
</main>
${rewrite(shell.footer)}
${[...scripts].map((js) => `<script type="module">${js}</script>`).join('\n')}
<script>${routerJs}</script>
</body>
</html>`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'fonts'), { recursive: true });
writeFileSync(join(OUT, 'index.html'), out);
for (const f of readdirSync(join(DIST, 'fonts'))) copyFileSync(join(DIST, 'fonts', f), join(OUT, 'fonts', f));
copyFileSync(join(DIST, 'favicon.svg'), join(OUT, 'favicon.svg'));
console.log(`preview-bundle/index.html: ${sections.length} routes, ${(out.length / 1024).toFixed(0)} KB, ${dupes.size} shared ids namespaced`);
