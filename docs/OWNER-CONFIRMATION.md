# Information to confirm with the owner

The prototype uses only facts MAK Lonestar already publishes. Everything below needs the owner's confirmation or materials before launch. Where to change it is noted in brackets.

## Must confirm before launch

| # | Item | Currently on the prototype | Why it matters |
|---|---|---|---|
| 1 | Main phone number | (945) 243-7844 on every page | The live site's footer dials a placeholder (512-555-0199) and legacy pages dial a fictional UK number. A Dallas County vendor list shows (214) 718-1250 and (972) 693-6318. [`src/data/site.ts`] |
| 2 | Office address | 940 N Beltline Rd, Ste 107, Irving, TX 75061 | Chamber of Commerce and Procore still list 2931 Tudor Ln. Google Business Profile should match. [`site.ts`] |
| 3 | Principal engineer's name format | Muhammad Awais Khan, P.E. (matches LinkedIn/TBPE) | The current site shows "Muhammad A. Khan, P.E." Confirm the preferred form. [`site.ts`] |
| 4 | Founder | "Founded in 2022 by Shaista Souri" (from the current About page) | Confirm wording and whether to show a founder bio. [`site.ts`, `about.astro`] |
| 5 | MBE certification | "MBE certified", no certifying body named | Add the certifying agency (e.g., NMSDC / DFW MSDC), certificate number and expiry, and any HUB/DBE/SBE certifications. |
| 6 | Testimonials | Five quotes, two shown as excerpts; punctuation tidied on one | Confirm full wording, permission to publish and each person's title. [`src/data/testimonials.ts`] |
| 7 | Privacy policy & terms | Draft written for the prototype | Owner (and counsel if desired) to review. [`src/pages/privacy-policy.astro`] |
| 8 | Logo | The firm's current logo, background removed from the website copy; favicon uses its crimson star | Ask for the original vector logo (SVG/AI/EPS) for the sharpest result. [`public/images/`, `src/components/Logo.astro`] |
| 9 | Environmental Engineering scope | Described in the firm's own general terms | Confirm exact services (e.g., Phase I ESA to ASTM E1527-21, Phase II sampling) and the qualified professional who signs them. [`src/data/services.ts`] |
| 10 | Form delivery | Demonstration mode (nothing is sent) | Choose a form service or API and the inbox that receives proposals, contact messages and job applications. |

## Needed to strengthen the site

| Item | Use on the site |
|---|---|
| Real photography: drill rig, crew in the field, lab, office, team headshots | Replace illustrations in heroes and cards. The principal engineer's headshot is in place (taken from the current site, ~460 px); a higher-resolution original would look sharper |
| Project details for each of the five projects: client type, services provided, scope (e.g., number of borings/depths), challenge, outcome, photos, client permission | Turn the Projects cards into case-study pages with `Project` data |
| Additional projects, including the Denton retail extension (public record, needs client permission) | Portfolio depth |
| Lab accreditation status (AASHTO re:source, CCRL, USACE) or confirmation that it is not held | Credentials section; never claimed until confirmed |
| Technician certifications (ACI, TxDOT, ICC special inspector, nuclear gauge / RSO) | Credentials and CMT page |
| Team members and bios | Team section on About |
| Typical turnaround times (e.g., geotechnical report, cylinder breaks) | Service pages and proposal page promise |
| Current job openings, pay ranges, benefits | Careers page and Google Jobs (`JobPosting`) structured data |
| Company LinkedIn URL, Google Business Profile URL | Footer links and `sameAs` in structured data |
| Public-sector vendor registrations and prequalifications (City of Dallas, Irving, Fort Worth, Dallas County, DFW Airport, NCTCOG) | Municipal section of Industries page |
| "90% repeat business" figure from the current About page | Omitted until its basis is confirmed |
| The two existing blog posts | Migrate with a named P.E. author byline |
| Analytics: GA4 property, GTM container, Search Console access | Conversion tracking for calls and form submissions |

## Off-site clean-up (not part of the website build)

- Update the address and phone on Chamber of Commerce, Procore Network, Bizapedia, Indeed and the Google Business Profile.
- Align job-board pay ranges and ZIP code (Indeed shows 75022).
- Use "MAK Lonestar Consulting" consistently on LinkedIn and directories.
