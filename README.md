# MAK Lonestar Consulting — Website (Revamp Prototype)

A complete rebuild of [maklonestar.com](https://maklonestar.com) for **MAK Lonestar Consulting, LLC**, a Texas-registered geotechnical engineering, construction materials testing and drilling firm in Irving, TX.

This is an independent prototype. It does not touch the live site, its hosting, DNS or database.

---

## What's inside

| Page | URL |
|---|---|
| Home | `/` |
| Services hub | `/services/` |
| Geotechnical Engineering | `/services/geotechnical-engineering/` |
| Construction Materials Testing & Special Inspection | `/services/construction-materials-testing/` |
| Geotechnical & Environmental Drilling | `/services/geotechnical-drilling/` |
| Environmental Engineering | `/services/environmental-engineering/` |
| Projects (filterable) | `/projects/` |
| Industries / who we serve | `/industries/` |
| Service area (DFW) | `/service-area/` |
| About & credentials | `/about/` |
| Careers + application form | `/career/` |
| Contact + contact form | `/contact/` |
| Request a proposal (with plan upload) | `/request-a-proposal/` |
| Privacy & terms (draft) | `/privacy-policy/` |
| 404 | `/404.html` |

Existing URLs are kept wherever the live site already had them (`/about/`, `/contact/`, `/career/`, the three service URLs) so search rankings carry over. Old legacy URLs 301-redirect to the new pages (see `vercel.json` and `public/_redirects`).

## Technology

- **[Astro 7](https://astro.build)**, static output. Pages ship as plain HTML and CSS, with a few small scripts (menu, tabs, project filter, forms). No UI framework and no runtime dependencies.
- **Fonts:** Archivo and Public Sans (SIL Open Font License), self-hosted Latin subsets in `public/fonts/`.
- **Brand:** the firm's own logo and the principal engineer's headshot live in `public/images/`. Site palette: blackland ink `#13201b`, limestone `#f1eee7`, iron-clay accent `#b0491f`.
- **Illustrations:** custom inline SVG (`src/components/art/`). No stock photos, no external image requests.
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph and Twitter tags, JSON-LD (Organization/ProfessionalService, WebSite, Service, FAQPage, BreadcrumbList), `sitemap-index.xml`, `robots.txt`.

Why Astro instead of WordPress/Elementor: the current site's audit found slow page builder output, leftover template metadata and duplicate legacy pages. A static build has no plugins to patch, no database to secure, and renders its main content in about 2 seconds in Lighthouse's simulated mobile test. If the owner prefers to stay on WordPress, this design and content can be ported to a block theme.

## Project structure

```
src/
  data/            ← edit business facts and content here
    site.ts          company name, phone, address, hours, navigation
    services.ts      all service page content (scopes, process, FAQs, SEO)
    projects.ts      portfolio entries
    testimonials.ts  client quotes
  components/      Header, Footer, cards, FAQ, form fields, illustrations
  layouts/Base.astro  <head>, SEO tags and structured data for every page
  pages/           one file per page; services/[slug].astro renders all four service pages
  scripts/forms.ts validation and submission for every form
  styles/global.css design tokens and shared styles
public/            fonts, favicon, OG image, Netlify _redirects/_headers
scripts/
  check-links.mjs          post-build link + SEO checker
  build-preview-bundle.mjs single-file demo build (used for the claude.ai preview link)
docs/
  IMPLEMENTATION-CHECKLIST.md  audit finding → what the build does
  OWNER-CONFIRMATION.md        information to confirm with the owner
  TEST-REPORT.md               testing and Lighthouse results
```

Most content changes only need edits to `src/data/*.ts`.

## Setup

Requires Node.js 22.23.4 or newer (Astro 7 requirement). Vercel and Netlify both offer Node 22.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production build to dist/
npm run preview      # serve dist/ locally
npm run check:links  # after build: links, anchors, titles, H1s, JSON-LD
```

## Environment variables

Copy `.env.example` to `.env` for local work, and set the same variables in your host's dashboard.

| Variable | Default | Purpose |
|---|---|---|
| `SITE_URL` | `https://maklonestar.com` | Canonical origin for canonical tags, OG URLs and the sitemap. |
| `PUBLIC_ALLOW_INDEXING` | `false` | `false` adds `noindex` and a disallow-all `robots.txt`, so previews never compete with the live site. Set to `true` **only** on the production deployment. |
| `BASE_PATH` | `/` | Sub-folder the site is served from. Only for GitHub Pages project sites (set by the workflow). |
| `PUBLIC_FORM_ENDPOINT` | *(empty)* | URL that accepts `multipart/form-data` POSTs. Empty = demonstration mode (forms validate, then clearly say nothing was sent). |

No secrets are stored in the code. The form endpoint URL is public by design, so use a service that protects against spam (honeypot field `company_website` is already included).

### Connecting the forms

Any endpoint that accepts multipart form posts and returns 2xx works. Options:

- **Formspree** (supports file uploads on paid plans): create a form, set `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`.
- **Basin, Getform or Web3Forms**: same pattern.
- **Your own API** (e.g., a Vercel serverless function that emails `info@maklonestar.com` and stores attachments). This is also where an AI intake step (auto-acknowledge, parse plans, draft a scoping checklist) would go.

Each submission includes `_form` (`proposal`, `contact` or `careers`) and `_page`. Successful sends push a `form_submit` event to `dataLayer` for GA4/GTM.

## Deployment

### Vercel (recommended)

1. Create a GitHub repository and push this project:
   ```bash
   git remote add origin https://github.com/<your-account>/mak-lonestar-website.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repository. Vercel detects Astro automatically (build `npm run build`, output `dist`).
3. Add environment variables: `SITE_URL` (use the Vercel preview URL for now) and `PUBLIC_ALLOW_INDEXING=false`.
4. Deploy. Share the `*.vercel.app` URL with the owner.

`vercel.json` already contains the legacy-URL redirects, security headers and long-term caching for fonts and assets.

### GitHub Pages (current preview)

The repository deploys itself to GitHub Pages on every push to `main` (`.github/workflows/deploy-pages.yml`). The workflow builds with `BASE_PATH=/<repo-name>` because GitHub serves project sites from a sub-folder, and an integration (`integrations/base-path.mjs`) prefixes every internal link with it.

- Live preview: `https://<owner>.github.io/<repo-name>/`
- To connect the forms, add a repository variable `PUBLIC_FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables) and re-run the workflow.
- GitHub Pages cannot do server redirects, so the legacy-URL 301s in `vercel.json` / `_redirects` only apply on Vercel or Netlify.

### Netlify (alternative)

Import the repo, build command `npm run build`, publish directory `dist`. `public/_redirects` and `public/_headers` are picked up automatically.

### Going live on maklonestar.com (after owner approval)

1. Complete `docs/OWNER-CONFIRMATION.md`.
2. Set `SITE_URL=https://maklonestar.com`, `PUBLIC_ALLOW_INDEXING=true` and `PUBLIC_FORM_ENDPOINT` on the production environment.
3. Point the domain at the new host only when the owner signs off. Keep the old WordPress site available on a subdomain until redirects are verified.
4. Submit `https://maklonestar.com/sitemap-index.xml` in Google Search Console and request indexing of the main pages.
5. Re-install GTM (`GTM-KWB2F7JL` on the current site) if the owner wants analytics; add a cookie notice if required.

## Preview bundle

`npm run build:bundle` packs every page into `preview-bundle/index.html` with hash routes (`#services-geotechnical-engineering`, `#contact`…). That is only used for the claude.ai preview link, which can host a single document. The real site is `dist/`.
