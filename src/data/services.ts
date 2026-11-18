// Service content. Scopes are taken from the services MAK Lonestar lists on its current website;
// copy is rewritten in original language. Anything not published by the firm is left out or
// listed in docs/OWNER-CONFIRMATION.md.

export type ArtKind = 'geotech' | 'cmt' | 'drilling' | 'environmental';
export interface Faq { q: string; a: string }
export interface Service {
  slug: string;
  href: string;
  name: string;
  short: string;
  art: ArtKind;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  summary: string;
  intro: string[];
  scopes: { title: string; text: string }[];
  deliverablesTitle: string;
  deliverables: string[];
  process: { title: string; text: string }[];
  audiences: { title: string; text: string }[];
  faqs: Faq[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: 'geotechnical-engineering',
    href: '/services/geotechnical-engineering/',
    name: 'Geotechnical Engineering',
    short: 'Soil borings, laboratory testing and engineering analysis that turn site conditions into foundation, earthwork and pavement recommendations.',
    art: 'geotech',
    seoTitle: 'Geotechnical Engineering in Dallas–Fort Worth | MAK Lonestar',
    seoDescription: 'Geotechnical investigations, expansive soil evaluation and foundation recommendations for DFW projects, under a licensed Texas P.E. Request a proposal.',
    h1: 'Geotechnical engineering in Dallas–Fort Worth',
    lead: 'Know what the ground will do before the foundation is designed. We drill, sample and test the soils on your site, then give your structural engineer and contractor recommendations they can build from.',
    summary: 'Subsurface investigations, expansive clay evaluation, and recommendations for foundations, earthwork and pavements.',
    intro: [
      'Much of the Metroplex sits on high-plasticity clays that swell when they take on water and shrink as they dry. Left unaccounted for, that movement cracks slabs, racks door frames and lifts pavements. A site-specific geotechnical investigation measures how your soils behave and sets the design parameters that keep the structure stable.',
      'Every MAK Lonestar geotechnical project is completed under the responsible charge of a licensed Texas Professional Engineer, and the same team carries it from the first call through the final report.',
    ],
    scopes: [
      { title: 'Soil investigation and site assessment', text: 'Borings, sampling, groundwater observations and laboratory testing, compiled into a clear picture of subsurface conditions across the site.' },
      { title: 'Foundation and expansive soil evaluation', text: 'Design parameters for slab-on-grade, pier-and-beam and drilled-pier foundations, including potential vertical rise (PVR) estimates for clay sites.' },
      { title: 'Earthwork and pavement recommendations', text: 'Subgrade preparation, fill and compaction criteria, moisture conditioning and pavement section recommendations for parking and drives.' },
      { title: 'Slope stability and erosion protection', text: 'Evaluation of slopes, channels and embankments, carried through to practical design recommendations.' },
      { title: 'Retaining structures and embankments', text: 'Earth pressure and bearing parameters for walls and embankments sized to the subsurface conditions found.' },
      { title: 'Dewatering design', text: 'Recommendations to keep excavations stable and workable where groundwater is encountered.' },
      { title: 'Pre-engineered metal building footings', text: 'Early review of isolated footing designs for metal buildings, where site-specific soil data matters most.' },
    ],
    deliverablesTitle: 'What your geotechnical report includes',
    deliverables: [
      'Boring location plan and boring logs',
      'Soil classifications and groundwater observations',
      'Laboratory test results',
      'Foundation design recommendations and parameters',
      'Earthwork, subgrade and drainage recommendations',
      'Pavement recommendations',
      'A report written for the structural engineer, the contractor and the building department',
    ],
    process: [
      { title: 'Plan review', text: 'We review the site, proposed structures and loads, and define the boring program.' },
      { title: 'Soil borings', text: 'Our crew drills and samples at the selected locations with our own truck-mounted rig.' },
      { title: 'Laboratory testing', text: 'Samples are tested for the properties your design depends on.' },
      { title: 'Engineering analysis', text: 'Field and lab data are evaluated against the project scope.' },
      { title: 'Report and recommendations', text: 'The report is issued electronically to you and your authorized team.' },
      { title: 'Construction support', text: 'Materials testing and field observation confirm the recommendations are built as intended.' },
    ],
    audiences: [
      { title: 'Developers and property owners', text: 'Understand subsurface risk early, compare foundation options and avoid surprises after the purchase.' },
      { title: 'Architects and structural engineers', text: 'Design parameters and recommendations you can use directly in foundation design.' },
      { title: 'Municipal and public agencies', text: 'Documentation that follows the TxDOT, NCTCOG and agency procedures your project requires.' },
    ],
    faqs: [
      { q: 'When do I need a geotechnical investigation?', a: 'Before the foundation and site grading are designed, and ideally before you finalize a property purchase. Building departments, lenders and structural engineers commonly require one for new commercial structures.' },
      { q: 'What is potential vertical rise (PVR)?', a: 'PVR is an estimate of how much expansive clay could swell upward under a slab. It is commonly calculated with TxDOT method Tex-124-E using laboratory test results, and it drives decisions such as subgrade moisture conditioning, select fill thickness or a structurally suspended floor.' },
      { q: 'How many borings will my site need?', a: 'It depends on the size of the property, the type of construction, the structural loads and what the first borings reveal. We propose a boring program after reviewing your site plan, so you are not paying for borings you do not need or missing ones you do.' },
      { q: 'Do you work outside Dallas–Fort Worth?', a: 'Our home base is Irving and most of our work is in the Metroplex and North Texas. We also take on projects elsewhere in Texas; recent examples include Mount Pleasant and Harker Heights.' },
      { q: 'How is geotechnical engineering different from materials testing?', a: 'Geotechnical engineering happens before design: it characterizes the soils and sets the foundation and earthwork criteria. Construction materials testing happens during construction: it verifies that soil, concrete, steel and asphalt are placed to meet those criteria and the project specifications.' },
    ],
    related: ['geotechnical-drilling', 'construction-materials-testing'],
  },
  {
    slug: 'construction-materials-testing',
    href: '/services/construction-materials-testing/',
    name: 'Construction Materials Testing',
    short: 'Field and laboratory testing plus special inspection, so soil, concrete, steel, masonry and asphalt meet the plans and specifications.',
    art: 'cmt',
    seoTitle: 'Materials Testing & Special Inspection DFW | MAK Lonestar',
    seoDescription: 'Compaction, concrete, masonry, asphalt and steel testing plus IBC special inspection for DFW construction projects. Book with 24 hours’ notice.',
    h1: 'Construction materials testing and special inspection',
    lead: 'Catch problems while they can still be fixed. Our technicians test and observe soil, concrete, steel, masonry and asphalt as your project is built, and report results to the people who need them.',
    summary: 'Compaction, concrete and aggregate, masonry, steel, asphalt and roofing testing, plus IBC special inspection.',
    intro: [
      'Construction materials testing verifies that what goes into the ground and the structure matches the plans, the specifications and the geotechnical recommendations. Done well, it protects the schedule as much as the building: urgent results reach your team the same day, and a clean record is ready at closeout.',
      'We follow ASTM and AASHTO procedures, along with TxDOT, IBC and NCTCOG requirements where they apply, and provide special inspection under the International Building Code.',
    ],
    scopes: [
      { title: 'Soil and compaction testing', text: 'Field density and moisture testing, soil classification, lift-by-lift compaction verification and subgrade stabilization checks.' },
      { title: 'Concrete and aggregate testing', text: 'Aggregate evaluation, mix-design review, fresh concrete field testing, specimen preparation and laboratory compressive-strength testing.' },
      { title: 'Drilled pier and pile observation', text: 'Verification of depth, bearing material, reinforcement and concrete placement for deep foundations.' },
      { title: 'Reinforcing steel and post-tension', text: 'Pre-pour inspection of reinforcing and post-tension systems against the approved drawings.' },
      { title: 'Masonry testing', text: 'Sampling and compressive-strength testing of mortar, grout and masonry prisms.' },
      { title: 'Structural steel observation', text: 'Observation of fabrication and erection, including bolting and welding, in the shop and in the field.' },
      { title: 'Asphalt paving (HMAC)', text: 'Material sampling, placement observation, temperature monitoring and field-density verification against the approved mix design.' },
      { title: 'Roofing inspection and testing', text: 'Inspection for conformance with the roofing specification and documentation requirements.' },
    ],
    deliverablesTitle: 'What you receive',
    deliverables: [
      'Field results that need attention communicated to the project team right away',
      'Reports issued after review by the project manager',
      'Documented quality verification for owners, engineers and building officials',
      'TxDOT- and AASHTO-format documentation for public agency projects',
      'A complete testing record ready for project closeout',
    ],
    process: [
      { title: 'Schedule', text: 'Give us at least 24 hours’ notice with the activity, location and time.' },
      { title: 'Review', text: 'We review the specifications, site location and required testing frequency.' },
      { title: 'Field testing', text: 'A technician tests in place and collects samples such as concrete cylinders, mortar cubes, grout prisms or soil.' },
      { title: 'Immediate communication', text: 'Any failing or borderline result goes to the project team on the spot.' },
      { title: 'Laboratory testing', text: 'Samples are tested under the applicable procedures.' },
      { title: 'Reporting', text: 'After technical review, the report is issued to your distribution list.' },
    ],
    audiences: [
      { title: 'General contractors', text: 'Technicians dispatched around pour and inspection windows, with results that keep the schedule moving.' },
      { title: 'Owners and developers', text: 'Independent, documented verification that the building was built to the drawings.' },
      { title: 'Municipalities and public agencies', text: 'Testing and documentation that follow TxDOT and AASHTO requirements.' },
    ],
    faqs: [
      { q: 'What is construction materials testing?', a: 'Field and laboratory testing performed during construction to confirm that soil, concrete, aggregates, asphalt and other materials meet the plans and specifications.' },
      { q: 'What is special inspection?', a: 'Special inspection is third-party inspection required by Chapter 17 of the International Building Code for certain work, such as structural concrete, reinforcing steel, masonry, structural steel and soils. The project’s statement of special inspections lists what is required.' },
      { q: 'How much notice do you need?', a: 'At least 24 hours. Tell us the activity, location and window, and we coordinate the technician around your pour or inspection schedule.' },
      { q: 'What does asphalt testing involve?', a: 'Material sampling, verification against the approved mix design, placement-temperature monitoring and field-density testing of the compacted mat.' },
      { q: 'Do you test to TxDOT specifications?', a: 'Yes, we follow TxDOT test procedures where a project requires them. If your contract names specific laboratory accreditations or technician certifications, include them in your request so we can confirm them before scheduling.' },
    ],
    related: ['geotechnical-engineering', 'geotechnical-drilling'],
  },
  {
    slug: 'geotechnical-drilling',
    href: '/services/geotechnical-drilling/',
    name: 'Geotechnical & Environmental Drilling',
    short: 'Our own truck-mounted rig and crew for soil borings, Shelby tube and SPT sampling, and groundwater observations.',
    art: 'drilling',
    seoTitle: 'Geotechnical & Environmental Drilling in DFW | MAK Lonestar',
    seoDescription: 'Soil borings, Shelby tube and SPT sampling and groundwater observations with a company-owned CME-55 truck-mounted rig. Serving DFW and North Texas.',
    h1: 'Geotechnical and environmental drilling',
    lead: 'Direct investigation of soil, rock and groundwater by our own crew. Because we run our own rig, field work, laboratory testing and engineering stay coordinated under one roof.',
    summary: 'Soil borings with our own CME-55 truck-mounted rig: Shelby tube and SPT sampling, field classification and groundwater observations.',
    intro: [
      'Drilling is the field portion of a subsurface investigation. It recovers the samples and records the observations that every laboratory test and engineering recommendation depends on, so how carefully it is done matters.',
      'MAK Lonestar operates a company-owned CME-55 truck-mounted drill rig across the Dallas–Fort Worth Metroplex and surrounding North Texas communities, for residential, commercial, industrial and municipal projects.',
    ],
    scopes: [
      { title: 'Geotechnical soil borings', text: 'Borings that log soil, rock, fill and groundwater, with each change in material documented.' },
      { title: 'Shelby tube sampling', text: 'Relatively undisturbed samples of cohesive soils for strength, consolidation and swell testing.' },
      { title: 'Standard Penetration Testing (SPT)', text: 'Blow counts that indicate the relative density of granular soils and the consistency of cohesive soils.' },
      { title: 'Disturbed and undisturbed sampling', text: 'Sampling procedures that preserve sample condition and keep every sample traceable to its boring and depth.' },
      { title: 'Field classification', text: 'Visual classification of samples during drilling, with pocket penetrometer readings for an early indication of consistency.' },
      { title: 'Groundwater observations', text: 'Water levels recorded during and after drilling.' },
      { title: 'Environmental drilling', text: 'Borings that recover soil and groundwater for environmental site evaluation.' },
      { title: 'Samples for the laboratory', text: 'Samples delivered for moisture content, Atterberg limits, sieve analysis, swell and strength testing.' },
    ],
    deliverablesTitle: 'What the field work provides',
    deliverables: [
      'Field boring logs with material changes and depths',
      'Recovered, labeled samples traceable to boring and depth',
      'SPT blow counts and pocket penetrometer readings',
      'Groundwater observations during and after drilling',
      'Samples ready for laboratory testing and engineering evaluation',
    ],
    process: [
      { title: 'Project review', text: 'Site location, development plans and structural loads.' },
      { title: 'Boring program', text: 'Number, location and depth of borings for the scope.' },
      { title: 'Utility clearance and mobilization', text: 'Locates are cleared before the rig mobilizes to site.' },
      { title: 'Drilling and sampling', text: 'Borings advanced and samples recovered and logged.' },
      { title: 'Laboratory testing', text: 'Samples tested for the properties the design needs.' },
      { title: 'Evaluation and reporting', text: 'Results evaluated and reported by our engineers.' },
    ],
    audiences: [
      { title: 'Developers and owners', text: 'Field data gathered by the same firm that will interpret it.' },
      { title: 'Engineering firms', text: 'Drilling and sampling to support your own analysis and design.' },
      { title: 'Municipal projects', text: 'Borings for roadway, utility and facility work in North Texas.' },
    ],
    faqs: [
      { q: 'What is the difference between drilling and a geotechnical investigation?', a: 'Drilling is the field portion: advancing borings, recovering samples and logging what is found. A full geotechnical investigation adds laboratory testing and engineering analysis and ends with a report and recommendations.' },
      { q: 'How many borings will my project need?', a: 'That depends on the size of the property, the construction type, the structural loads and the conditions found. We set the boring program during scoping.' },
      { q: 'What area do you drill in?', a: 'Dallas–Fort Worth and surrounding North Texas. Send us your project address to confirm.' },
      { q: 'How long does it take?', a: 'It depends on the number of borings, the laboratory testing required and current workload. You receive a project-specific timeline when we scope the work.' },
    ],
    related: ['geotechnical-engineering', 'environmental-engineering'],
  },
  {
    slug: 'environmental-engineering',
    href: '/services/environmental-engineering/',
    name: 'Environmental Engineering',
    short: 'Evaluation of site conditions and potential environmental concerns, to inform development, financing and regulatory decisions.',
    art: 'environmental',
    seoTitle: 'Environmental Engineering in DFW | MAK Lonestar',
    seoDescription: 'Environmental site evaluation and investigation of potential environmental concerns for DFW development projects, supported by soil and groundwater sampling.',
    h1: 'Environmental engineering and site evaluation',
    lead: 'Understand the environmental condition of a property before you buy, finance or build on it. We evaluate site conditions, investigate potential concerns and give you information you can act on.',
    summary: 'Site condition evaluation and investigation of potential environmental concerns, supported by soil and groundwater sampling.',
    intro: [
      'Environmental questions can stall a land purchase, a loan or a permit. A former fuel station, an old industrial use, imported fill or a nearby release can all raise them. Getting reliable information early keeps those questions from turning into delays.',
      'MAK Lonestar evaluates site conditions and investigates potential environmental concerns, using our own drilling capability to recover soil and groundwater where sampling is needed. Each scope is defined with you around what your buyer, lender or agency actually requires.',
    ],
    scopes: [
      { title: 'Site condition evaluation', text: 'Review of the property and its surroundings to identify potential environmental concerns before development decisions are made.' },
      { title: 'Investigation of potential concerns', text: 'Targeted investigation where a concern is identified, to understand whether and where it affects the site.' },
      { title: 'Soil and groundwater sampling', text: 'Environmental borings and sample recovery with our own drilling crew, coordinated with laboratory analysis.' },
      { title: 'Development and regulatory support', text: 'Findings organized to support development, financing and regulatory decisions.' },
    ],
    deliverablesTitle: 'What you receive',
    deliverables: [
      'A scope defined around your transaction, lender or agency requirements',
      'Documented site observations and sampling locations',
      'Laboratory results for samples collected',
      'Findings and recommendations for next steps',
    ],
    process: [
      { title: 'Scoping', text: 'We discuss the property, its history and who will rely on the findings.' },
      { title: 'Review', text: 'Available site information and observable conditions are reviewed.' },
      { title: 'Field work', text: 'Site reconnaissance and, where needed, soil and groundwater sampling.' },
      { title: 'Laboratory analysis', text: 'Samples are analyzed for the constituents of concern.' },
      { title: 'Evaluation', text: 'Results are evaluated against the project’s objectives.' },
      { title: 'Reporting', text: 'Findings and recommendations are issued to you and your authorized team.' },
    ],
    audiences: [
      { title: 'Buyers and developers', text: 'Information on site conditions before you commit to a property.' },
      { title: 'Lenders and their borrowers', text: 'Findings organized around the lender’s requirements.' },
      { title: 'Public agencies', text: 'Site evaluation for public facility and infrastructure projects.' },
    ],
    faqs: [
      { q: 'Can environmental and geotechnical work be coordinated on the same site?', a: 'Often, yes. Because we run our own drilling crew, environmental sampling and geotechnical borings can be planned together when both are needed, which can reduce mobilizations. We confirm this during scoping.' },
      { q: 'What should I send to get a proposal?', a: 'The property address, a site plan or survey if you have one, what you know about past uses, and who will rely on the report (for example, a buyer, lender or agency) along with any scope they require.' },
      { q: 'Do you work on properties outside Dallas–Fort Worth?', a: 'Most of our work is in the Metroplex and North Texas. Send us the project address and we will confirm.' },
    ],
    related: ['geotechnical-drilling', 'geotechnical-engineering'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)!;
