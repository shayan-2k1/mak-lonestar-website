// Projects published on MAK Lonestar's current website (name and address only).
// The firm has not published the scope of services, dates or outcomes for these projects,
// so none are shown. Fill `scope`, `services` and `photo` with the owner before turning each
// into a case-study page (see docs/OWNER-CONFIRMATION.md).

export interface Project {
  id: string;
  name: string;
  address: string;
  city: string;
  sector: 'Industrial & warehouse' | 'Hospitality' | 'Retail & fuel' | 'Education';
  region: 'Dallas–Fort Worth' | 'East Texas' | 'Central Texas';
  county: string;
  summary: string;
  services?: string[]; // CONFIRM with owner
  scope?: string;      // CONFIRM with owner
}

export const projects: Project[] = [
  {
    id: 'warehouse-flex-rockwall',
    name: 'Warehouse Flex Space',
    address: '1760 Airport Road',
    city: 'Rockwall, TX',
    sector: 'Industrial & warehouse',
    region: 'Dallas–Fort Worth',
    county: 'Rockwall County',
    summary: 'Flex warehouse development on the east side of the Metroplex.',
  },
  {
    id: 'lane-supply-arlington',
    name: 'Lane Supply Warehouse',
    address: '125 Luttrell Ln',
    city: 'Arlington, TX',
    sector: 'Industrial & warehouse',
    region: 'Dallas–Fort Worth',
    county: 'Tarrant County',
    summary: 'Warehouse facility for Lane Supply in Arlington.',
  },
  {
    id: 'radiant-stem-irving',
    name: 'Radiant STEM Academy Extension',
    address: '2001 W Walnut Hill Ln',
    city: 'Irving, TX',
    sector: 'Education',
    region: 'Dallas–Fort Worth',
    county: 'Dallas County',
    summary: 'Building extension for a STEM academy campus in Irving.',
  },
  {
    id: 'home2-mount-pleasant',
    name: 'Home2 Suites Hotel',
    address: 'West 130 Tankersley Road',
    city: 'Mount Pleasant, TX',
    sector: 'Hospitality',
    region: 'East Texas',
    county: 'Titus County',
    summary: 'Hotel development in Mount Pleasant, East Texas.',
  },
  {
    id: 'c-store-harker-heights',
    name: 'C-Store & Gas Station',
    address: '1829 FM 2410',
    city: 'Harker Heights, TX',
    sector: 'Retail & fuel',
    region: 'Central Texas',
    county: 'Bell County',
    summary: 'Convenience store and fuel station in Harker Heights, Central Texas.',
  },
];

export const sectors = [...new Set(projects.map((p) => p.sector))];
export const regions = [...new Set(projects.map((p) => p.region))];
