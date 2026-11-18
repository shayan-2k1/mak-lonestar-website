// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is the canonical origin used for canonical tags, Open Graph URLs and the sitemap.
// Set it to the production domain when the site goes live (see README → Environment variables).
const SITE_URL = process.env.SITE_URL || 'https://maklonestar.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
