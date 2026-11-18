# Audit → Implementation Checklist

Source: the page-by-page audit of maklonestar.com (18 Nov 2026). Each finding is mapped to what the prototype does about it.

Legend: **Now** = built into this prototype · **Public** = built using information already published by MAK Lonestar · **Owner** = needs the owner to confirm or supply · **Creds** = needs accounts, credentials or integrations

| # | Audit finding | Category | What the prototype does |
|---|---|---|---|
| 1 | Footer phone link dials a placeholder (tel:5125550199); legacy pages dial a fictional UK number | Now | One phone constant (`src/data/site.ts`) drives every tel: link: `tel:+19452437844` |
| 2 | Legacy URLs (/who-we-are/, /contact-us/, /what-we-do/) still indexed with conflicting copy | Now | 301 redirects in `vercel.json` and `public/_redirects` (Netlify) |
| 3 | Two CMT URLs (/services/construction-materials/ vs …-testing/) | Now | Single URL `/services/construction-materials-testing/`, old one 301s |
| 4 | Dead `#` links (Services menu, See All Projects, project items, footer address) | Now | Every link points to a real page; address links to Google Maps; automated link checker in `scripts/check-links.mjs` |
| 5 | Empty /services/ hub | Now | Real services hub with all four services, industries and process |
| 6 | Environmental Engineering claimed but no page | Public + Owner | Page built from the firm's own published description; specific scopes (e.g., Phase I/II ESA) left for owner confirmation |
| 7 | Generic contact form, no plan upload, no project fields | Now + Creds | New `/request-a-proposal/` form: role, project address, services multi-select, schedule, plan upload, validation, success/error states. Delivery needs a form endpoint (env var) |
| 8 | Off-brand copy ("industrial team", "structural integrity", "project management") | Now | All copy rewritten around geotechnical engineering, CMT, drilling, environmental |
| 9 | Brand name used five different ways | Now | "MAK Lonestar Consulting, LLC" (legal) / "MAK Lonestar" (short) everywhere |
| 10 | 12 vs 15+ years conflict | Public | "15+ years" (principal engineer's experience, as on current site); firm founded 2022 |
| 11 | "Written by: Developer", read time on homepage, filename alt text | Now | Clean per-page meta, OG and Twitter tags; descriptive alt text/ARIA labels on every graphic |
| 12 | All-caps awkward H1, multiple H1s, skipped heading levels | Now | One H1 per page, ordered H2/H3 hierarchy |
| 13 | No structured data | Now | Organization + ProfessionalService (LocalBusiness), WebSite, Service, BreadcrumbList, FAQPage JSON-LD |
| 14 | No privacy policy / terms | Now + Owner | Privacy & terms page drafted; needs owner/legal review |
| 15 | Autoplay hero video, heavy LCP | Now | Hero is a lightweight inline SVG illustration; no video. Motion respects reduced-motion settings |
| 16 | Stock Unsplash photos, no real company photos | Owner | Custom technical illustrations (no fake "project photos"). Photo slots documented for a real photo shoot |
| 17 | Projects not documented | Public + Owner | Filterable portfolio of the five published projects; scopes, photos and results need owner input before case-study pages |
| 18 | No team / credentials page | Public + Owner | About page with principal engineer, firm registration, MBE, standards; certifying body, team bios and technician certifications need owner input |
| 19 | Unbacked "90% repeat business" stat | Owner | Omitted until the owner confirms the basis |
| 20 | Career page empty | Public + Owner | Careers page with roles MAK has advertised and an application form; live openings and pay need confirmation before JobPosting schema |
| 21 | No service-area content | Public | One substantive DFW / North Texas service-area page (no thin doorway pages) |
| 22 | NAP inconsistent across directories (Tudor Ln address, other phones) | Owner | Site uses one NAP string; directory clean-up is an off-site task |
| 23 | Google Business Profile, GA4/GTM, Search Console | Creds | Not wired; documented in README |
| 24 | Blog posts (2) with author/category issues | Owner | Not migrated in the prototype; migration plan in next steps |
| 25 | Lab accreditation (AASHTO re:source, USACE) not shown | Owner | Not claimed. Site says work follows ASTM/AASHTO/TxDOT/IBC/NCTCOG procedures, as the current site does |
