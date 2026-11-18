// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import basePath from './integrations/base-path.mjs';

// SITE_URL is the canonical origin used for canonical tags, Open Graph URLs and the sitemap.
// Set it to the production domain when the site goes live (see README → Environment variables).
const SITE_URL = process.env.SITE_URL || 'https://maklonestar.com';
// BASE_PATH is only needed when the site lives in a sub-folder, e.g. GitHub Pages project
// sites ("/mak-lonestar-website"). Leave it unset for a custom domain or Vercel/Netlify.
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    basePath(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
