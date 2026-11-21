// Single source of truth for business information.
// Everything here is taken from MAK Lonestar's own published website (Nov 2026).
// Items marked CONFIRM must be verified with the owner before production launch
// (see docs/OWNER-CONFIRMATION.md).

export const site = {
  legalName: 'MAK Lonestar Consulting, LLC',
  name: 'MAK Lonestar',
  tagline: 'Building strong foundations',
  founded: '2022',
  firmRegistration: 'F-24443', // Texas PE Firm Registration No. (published on current site)
  principal: {
    name: 'Muhammad Awais Khan, P.E.', // form used on LinkedIn and TBPE records (current site shows "Muhammad A. Khan, P.E.")
    photo: '/images/muhammad-awais-khan-pe.webp', // from the firm's current About page; request a higher-resolution original
    title: 'Principal Engineer',
    experience: '15+ years', // geotechnical experience, as published
    education: "Master's degree in civil engineering",
  },
  founder: 'Shaista Souri', // CONFIRM — current About page says the firm was founded in 2022 by Shaista Souri
  phone: { display: '(945) 243-7844', href: 'tel:+19452437844', e164: '+1-945-243-7844' },
  email: 'info@maklonestar.com',
  address: {
    street: '940 N Beltline Rd, Ste 107',
    city: 'Irving',
    region: 'TX',
    postalCode: '75061',
    country: 'US',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=940+N+Beltline+Rd+Ste+107+Irving+TX+75061',
  hours: { days: 'Monday – Friday', time: '8:00 AM – 5:00 PM', schema: 'Mo-Fr 08:00-17:00' },
  standards: ['ASTM', 'AASHTO', 'TxDOT', 'IBC', 'NCTCOG'],
  equipment: 'Company-owned CME-55 truck-mounted drill rig',
  // Geography of the Metroplex used on the service-area map (not a claim of county-level coverage).
  metroCounties: ['Wise', 'Denton', 'Collin', 'Hunt', 'Parker', 'Tarrant', 'Dallas', 'Rockwall', 'Hood', 'Johnson', 'Ellis', 'Kaufman'],
  sameAs: [] as string[], // CONFIRM company LinkedIn URL, Google Business Profile URL
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const nav = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Geotechnical Engineering', href: '/services/geotechnical-engineering/' },
      { label: 'Construction Materials Testing', href: '/services/construction-materials-testing/' },
      { label: 'Geotechnical & Environmental Drilling', href: '/services/geotechnical-drilling/' },
      { label: 'Environmental Engineering', href: '/services/environmental-engineering/' },
    ],
  },
  { label: 'Projects', href: '/projects/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Service Area', href: '/service-area/' },
  { label: 'About', href: '/about/' },
  { label: 'Careers', href: '/career/' },
  { label: 'Contact', href: '/contact/' },
];
