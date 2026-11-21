// When the site is built under a sub-path (GitHub Pages project sites), rewrite the
// root-relative links written in the source ("/services/", "/fonts/…") so they include
// the base. Links Astro already prefixed, absolute URLs and "//" URLs are left alone.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export default function basePath() {
  let base = '';
  return {
    name: 'base-path-links',
    hooks: {
      'astro:config:done': ({ config }) => { base = (config.base || '/').replace(/\/$/, ''); },
      'astro:build:done': ({ dir }) => {
        if (!base) return;
        const root = fileURLToPath(dir);
        const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const attr = new RegExp(`(\\s(?:href|src|action|content)=")\\/(?!\\/|${esc.slice(1)}\\/)`, 'g');
        const css = new RegExp(`url\\((['"]?)\\/(?!\\/|${esc.slice(1)}\\/)`, 'g');
        const walk = (d) => readdirSync(d).forEach((f) => {
          const p = join(d, f);
          if (statSync(p).isDirectory()) return walk(p);
          if (!/\.(html|css)$/.test(p)) return;
          const s = readFileSync(p, 'utf8');
          const fixSrcset = (html) => html.replace(/(\ssrcset=")([^"]*)"/g, (m, a, list) =>
            `${a}${list.split(',').map((c) => c.trim().replace(new RegExp(`^\\/(?!\\/|${esc.slice(1)}\\/)`), `${base}/`)).join(', ')}"`);
          const out = p.endsWith('.html') ? fixSrcset(s.replace(attr, `$1${base}/`).replace(css, `url($1${base}/`)) : s.replace(css, `url($1${base}/`);
          if (out !== s) writeFileSync(p, out);
        });
        walk(root);
      },
    },
  };
}
