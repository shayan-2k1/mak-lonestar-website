# Testing & Optimization Report

Date: 18 November 2026 · Build: Astro 7.4.12 static output, 15 pages · Browser: Chrome (headless) via Playwright

## Summary

| Check | Result |
|---|---|
| Production build | ✅ Passes, no warnings |
| Link & SEO checker (`npm run check:links`) | ✅ 15/15 pages: no broken links or anchors, no `#` links, one H1 per page, titles ≤ 65 chars, descriptions ≤ 165 chars, canonicals and OG images present, all JSON-LD parses, no heading-level jumps, no duplicate ids |
| Console errors | ✅ None on any page |
| Horizontal overflow at 390 px | ✅ None (fixed one issue: off-canvas mobile menu widened the page) |
| Forms | ✅ Proposal, contact and careers forms tested (below) |
| Interactions | ✅ Mobile menu, services dropdown, Escape-to-close, service tabs (click + arrow keys), project filters, FAQ accordions |

## Lighthouse (mobile, simulated throttling)

Production configuration (`PUBLIC_ALLOW_INDEXING=true`):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 |
| Geotechnical Engineering | 99 | 100 | 100 | 100 |
| Contact | 99 | 100 | 100 | 100 |

Preview configuration (indexing off): Performance 99–100, Accessibility 100 on every page audited (14 pages), Best practices 100. SEO shows 66 **only** because preview builds are deliberately set to `noindex`; with indexing on it scores 100.

Core Web Vitals (lab): LCP 1.8–2.1 s, CLS 0, TBT 0–50 ms.

Remaining Lighthouse notes come from the local test server (no compression or cache headers). Vercel/Netlify serve with Brotli, and `vercel.json` / `_headers` set one-year caching for fonts and hashed assets.

### Accessibility fixes made during testing
- Raised contrast on the process "strata" bands, the service tab numbers and the lead testimonial caption to meet WCAG AA.
- Removed a logo `aria-label` that did not match its visible text.
- Forms: every field has a visible label, required markers announced to screen readers, inline errors linked by `aria-describedby`, an error summary that receives focus and links to each field, and status messages in a live region.
- Hero animation runs once (under 4 seconds) and is disabled for visitors who prefer reduced motion.

## Form test results

| Scenario | Result |
|---|---|
| Submit empty proposal form | Error summary lists 7 required items and receives focus |
| Invalid email (`bad@`) and short phone | Specific messages: "Enter a valid email address…", "Enter a 10-digit phone number…" |
| Wrong file type (`.exe`) | "virus.exe is not an accepted file type." |
| Valid file (`site-plan.pdf`) | Listed with file size |
| `?service=geotechnical-drilling` link from a service page | Drilling service pre-selected |
| Valid submission, no endpoint configured | Form replaced by an amber notice: request complete **but not sent**, with phone and email to use instead, plus "Show what would be sent" |
| Valid submission with endpoint | Posts multipart data; success message on 2xx, error message (form kept filled in) otherwise |
| Contact and careers forms | Required-field validation confirmed (résumé upload required on careers) |

## Responsive layouts

Screenshots reviewed at 1440 px (desktop) and 390 px (phone) for every page; the layouts use fluid breakpoints at 1100, 1000, 900, 860, 760, 640, 600 and 480 px, so tablet widths fall between tested layouts. Mobile navigation becomes a full-screen menu below 1100 px with the proposal button and click-to-call inside it.

## Structured data on the site

- Every page: `Organization` + `ProfessionalService` (name, address, phone, email, hours, area served, founding date) and `WebSite`
- Interior pages: `BreadcrumbList`
- Service pages: `Service` with an `OfferCatalog` of the listed scopes, and `FAQPage`
- About and Service area: `FAQPage`; Contact: `ContactPage`; Projects: `CollectionPage`; Services hub: `ItemList`

Run the production URL through Google's Rich Results Test after launch to confirm eligibility.
