// Client testimonials as published on MAK Lonestar's current homepage (Nov 2026).
// Longer testimonials are shown as excerpts. Before launch, confirm the full wording,
// each client's permission and their preferred title (docs/OWNER-CONFIRMATION.md).

export interface Testimonial { quote: string; name: string; role: string; context?: string }

export const testimonials: Testimonial[] = [
  {
    quote: 'Your team is professional, responsive, technically knowledgeable, and committed to delivering quality work promptly.',
    name: 'Shawn Valk II',
    role: 'Project Manager, LIV Group Inc. (dba Platinum Construction)',
  },
  {
    quote: '…has consistently gone above and beyond to provide high-quality geotechnical engineering services.',
    name: 'Morris H. Layton III, PE',
    role: 'President & Principal Engineer, Levi Jay & Associates Inc.',
  },
  {
    quote: '…knowledgeable, responsive, and easy to work with.',
    name: 'Tom Pennell',
    role: 'Manufacturer Representative, SIKA USA',
    context: 'On concrete strength, core and aggregate testing',
  },
  {
    quote: 'I appreciate your professionalism and consistent dedication to delivering high quality projects.',
    name: 'Jose Bear',
    role: 'Sinacola',
  },
  {
    quote: 'Great work, very reliable and professional. Highly recommended.',
    name: 'Alfredo Esparza',
    role: 'CDE Investments, LLC',
  },
];
