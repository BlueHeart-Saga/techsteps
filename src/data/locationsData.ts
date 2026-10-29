/**
 * locationsData.ts
 * Comprehensive dataset for all 26 TechSteps UK regional locations.
 * Powers dynamic location landing pages at /locations/[slug] and the overview at /locations.
 */

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  name: string;
  region: string;
  countyOrArea: string;
  tagline: string;
  heroDescription: string;
  rating: string;
  reviewCount: number;
  featuredTestimonial: {
    author: string;
    company: string;
    role: string;
    timeAgo: string;
    text: string;
    stars: number;
  };
  boroughsOrDistricts: string[];
  localHubAddress: string;
  phone: string;
  leadTime: string;
  faqs: LocationFAQ[];
}

export const locationsList: LocationData[] = [
  {
    slug: 'london',
    name: 'London',
    region: 'Greater London',
    countyOrArea: 'Greater London & Home Counties',
    tagline: 'Free IT recycling near me in London',
    heroDescription: 'We collect redundant laptops, PCs, servers and business IT equipment across London and Greater London. Secure data destruction certificates always provided, carbon-negative recycling, free collection for 10 or more qualifying items.',
    rating: '4.9',
    reviewCount: 48,
    featuredTestimonial: {
      author: 'Sebastian Young',
      company: 'Canary Wharf Capital Group',
      role: 'Head of Infrastructure',
      timeAgo: '2 weeks ago',
      text: 'First-rate experience with TechSteps London team. Another company said the equipment wasn\'t enough to cover their costs and quoted us for £740+VAT. TechSteps collected 34 Dell OptiPlex desktops and 18 ThinkPads without any fee on the next day and delivered certificates within 48 hours.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'City of London', 'Canary Wharf', 'Westminster', 'Southwark', 'Camden', 'Islington',
      'Hackney', 'Hammersmith', 'Lambeth', 'Wandsworth', 'Croydon', 'Stratford',
      'Kensington & Chelsea', 'Whitechapel', 'Ealing', 'Brent', 'Hounslow', 'Greenwich',
      'Richmond', 'Barking & Dagenham', 'Barnet', 'Bromley', 'Enfield', 'Harrow',
      'Hillingdon', 'Havering', 'Kingston upon Thames', 'Merton', 'Newham', 'Redbridge',
      'Sutton', 'Waltham Forest'
    ],
    localHubAddress: 'TechSteps London Logistics Hub, Hainault Business Park, IG6 3UF',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Do you offer free IT recycling in London?',
        answer: 'Yes. We offer free collections when you have 10 or more qualifying laptops, PCs or servers across all 32 London boroughs. For smaller collections or specialised hardware, our logistics team confirms exact terms before booking.'
      },
      {
        question: 'How quickly can you collect in London?',
        answer: 'We routinely arrange collections within 24 to 48 hours, depending on your borough, building access requirements (loading bays, goods lifts), and collection volume.'
      },
      {
        question: 'Can you collect from multi-tenant offices and commercial business parks?',
        answer: 'Yes. We collect from high-rise offices in the City and Canary Wharf, schools, NHS healthcare trusts, shared co-working spaces, and commercial business parks across London.'
      },
      {
        question: 'Do you provide proof of recycling and data destruction?',
        answer: 'Yes. You receive an Environment Agency Waste Transfer Note upon hardware handover, followed by an itemised Certificate of Destruction and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to the equipment after collection?',
        answer: 'We adhere to a strict circular reuse-first policy. Where devices can be refurbished, they are cleaned, audited, and repurposed. Non-recoverable hardware is recycled into constituent metals and polymers with zero landfill.'
      },
      {
        question: 'Can you destroy data on-site in London offices?',
        answer: 'Yes. Our security-vetted engineers operate mobile hard drive shredding vehicles and mobile Blancco wiping rigs for witnessed on-site data destruction before equipment leaves your premises.'
      },
      {
        question: 'Do you collect outside central London?',
        answer: 'Yes. We cover all 32 London boroughs plus the M25 ring, Home Counties, Kent, Essex, Surrey, Berkshire, and Hertfordshire.'
      },
      {
        question: 'Can you support multi-site London collections?',
        answer: 'Yes. We coordinate consolidated rollouts across multiple commercial sites, branch offices, and corporate headquarters with unified audit reporting and centralized compliance manifests.'
      }
    ]
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    region: 'West Midlands',
    countyOrArea: 'West Midlands & Black Country',
    tagline: 'Free IT recycling near me in Birmingham',
    heroDescription: 'We collect redundant laptops, PCs, servers and business technology across Birmingham, Solihull, and the West Midlands. Certified ADISA erasure, zero-landfill WEEE recycling, and free collection for 10+ qualifying items.',
    rating: '4.9',
    reviewCount: 36,
    featuredTestimonial: {
      author: 'Marcus Vance',
      company: 'Midlands Manufacturing Alliance',
      role: 'IT Director',
      timeAgo: '1 month ago',
      text: 'Collected 65 desktop towers and 3 server racks from our Colmore Row head office. Punctual, professional BS 7858 vetted drivers, zero charges, and our disposal certificates arrived within 3 working days.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Birmingham City Centre', 'Colmore Business District', 'Digbeth', 'Jewellery Quarter',
      'Edgbaston', 'Solihull', 'Sutton Coldfield', 'Aston', 'Erdington', 'Longbridge',
      'Smethwick', 'West Bromwich', 'Dudley', 'Walsall', 'Wolverhampton', 'Halesowen'
    ],
    localHubAddress: 'TechSteps West Midlands Depot, Stafford Centre Hub, ST16 3AQ',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Birmingham businesses?',
        answer: 'Yes. Qualifying commercial collections of 10 or more PCs, laptops, or enterprise servers are completely free of charge across Birmingham and the wider West Midlands.'
      },
      {
        question: 'How quickly can a collection be booked in Birmingham?',
        answer: 'Standard collection windows are 24 to 48 hours following submission. Expedited next-day collections are also coordinated for urgent office moves.'
      },
      {
        question: 'Can you de-rack servers in Birmingham data centres?',
        answer: 'Yes. Our technicians can disconnect, de-rack, and remove heavy 1U–4U servers, SAN enclosures, and uninterruptible power supplies (UPS) from private data rooms.'
      },
      {
        question: 'What documentation is provided for GDPR audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note at collection, followed by serialised Blancco data erasure or physical shredding certificates.'
      },
      {
        question: 'Do you collect from university campuses and NHS hospitals in Birmingham?',
        answer: 'Yes. We regularly service universities, NHS trusts, multi-academy trusts, and legal chambers throughout Birmingham.'
      },
      {
        question: 'What happens to retired computer hardware?',
        answer: 'All equipment is handled under our circular-first zero-landfill commitment. Functional machines are refurbished; non-viable assets are separated for raw material recovery.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. When combined with qualifying core assets like laptops, desktops, or servers, we collect monitors, copiers, peripherals, and network cabling.'
      },
      {
        question: 'Can you collect from multiple sites in the West Midlands?',
        answer: 'Yes. We coordinate multi-point logistics across Birmingham, Coventry, Wolverhampton, and Solihull with single-manifest audit reports.'
      }
    ]
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    region: 'Greater Manchester',
    countyOrArea: 'North West England',
    tagline: 'Free IT recycling near me in Manchester',
    heroDescription: 'Certified business IT collection and secure data destruction across Manchester, Salford Quays, MediaCityUK, and Greater Manchester. Free pickup for 10+ qualifying enterprise devices.',
    rating: '5.0',
    reviewCount: 42,
    featuredTestimonial: {
      author: 'Rachel Gallagher',
      company: 'MediaCity Creative Labs',
      role: 'Operations Lead',
      timeAgo: '3 weeks ago',
      text: 'Brilliant service. Cleaned out our editing suites at MediaCity with over 80 Apple Mac workstations, monitors, and SAN arrays. Everything safely erased with Blancco certificates provided.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Manchester City Centre', 'Spinningfields', 'Northern Quarter', 'Salford Quays',
      'MediaCityUK', 'Trafford Park', 'Didsbury', 'Stockport', 'Bolton', 'Bury',
      'Oldham', 'Rochdale', 'Altrincham', 'Sale', 'Wigan', 'Stretford'
    ],
    localHubAddress: 'TechSteps North West Operations Desk, Manchester Logistics Centre',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Do you offer free IT collection in Manchester and Salford?',
        answer: 'Yes. Collections of 10 or more qualifying desktop PCs, corporate laptops, or servers are completely free throughout Greater Manchester and Cheshire.'
      },
      {
        question: 'Can you collect from high-rise buildings in Spinningfields and central Manchester?',
        answer: 'Yes. Our security-vetted drivers are experienced with loading bay protocols, freight lifts, and security registrations for Manchester financial and tech offices.'
      },
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We sanitise storage media using ADISA Standard 8.0 and NIST 800-88 Purge overwriting algorithms, or shred drives to DIN 66399 Level H-5 particles.'
      },
      {
        question: 'How quickly can TechSteps collect in Manchester?',
        answer: 'Typically within 1 to 2 working days. Scheduled weekend and evening out-of-hours pickups can also be coordinated upon scoping.'
      },
      {
        question: 'Do you provide proof for Environmental and ESG audits?',
        answer: 'Yes. Every collection includes an itemised Asset Tracking Manifest, Waste Transfer Note, and certified Carbon Offset Certificate for your ESG disclosures.'
      },
      {
        question: 'Can you destroy hard drives on-site in Manchester?',
        answer: 'Yes. Our dedicated on-site shredding truck can visit your facility and destroy magnetic and solid-state media under your staff\'s direct supervision.'
      },
      {
        question: 'Can we include redundant mobile phones and tablets?',
        answer: 'Yes. We process corporate smartphone fleets, iPads, Android tablets, and handheld devices with factory MDM sanitisation.'
      },
      {
        question: 'What is your environmental landfill policy?',
        answer: 'TechSteps operates a strict 0% landfill policy. 100% of equipment is either refurbished for extended lifecycle utility or separated into pure recyclable fractions.'
      }
    ]
  },
  {
    slug: 'dartford',
    name: 'Dartford',
    region: 'South East',
    countyOrArea: 'Kent & Greater London Gateway',
    tagline: 'Free IT recycling near me in Dartford & Kent',
    heroDescription: 'Direct from TechSteps UK National Headquarters in Dartford. Ultra-fast same-day and next-day IT collection, certified data shredding, and zero-landfill remarketing across Kent and South East London.',
    rating: '5.0',
    reviewCount: 54,
    featuredTestimonial: {
      author: 'Christopher Evans',
      company: 'Kent Logistics PLC',
      role: 'Director of Technology',
      timeAgo: '1 week ago',
      text: 'Having the TechSteps HQ nearby in Dartford meant same-day turnaround for our data centre decommission. Over 120 rackmount servers collected, wiped, and certified within 48 hours.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Dartford Town Centre', 'Crossways Boulevard', 'Ebbsfleet Valley', 'Greenhithe',
      'Swanley', 'Bexley', 'Bexleyheath', 'Erith', 'Gravesend', 'Sevenoaks',
      'Rochester', 'Chatham', 'Gillingham', 'Maidstone', 'Bromley', 'Sidcup'
    ],
    localHubAddress: 'TechSteps UK National Headquarters, Logistics Park, Crossways Boulevard, Dartford DA2 6QJ',
    phone: '0800 083 4700',
    leadTime: 'Same-day / 24 hours',
    faqs: [
      {
        question: 'Can I get same-day IT collection in Dartford?',
        answer: 'Yes. Because Dartford is the TechSteps UK national headquarters, priority same-day and next-day collections are frequently available for commercial facilities across Dartford and North Kent.'
      },
      {
        question: 'Is collection free for Dartford businesses?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for 100% free collection with complete compliance certification.'
      },
      {
        question: 'Can I drop off equipment directly at the Dartford HQ facility?',
        answer: 'Yes. Pre-scheduled client drop-offs are accepted at our Crossways Boulevard facility. Contact our logistics desk to arrange security pass clearance.'
      },
      {
        question: 'What data destruction certifications do you issue from Dartford HQ?',
        answer: 'We issue ADISA accredited Certificates of Destruction, Blancco Erasure Logs with drive serial numbers, and statutory Environment Agency Waste Transfer Notes.'
      },
      {
        question: 'Do you service the entire county of Kent from Dartford?',
        answer: 'Yes. Our fleet covers Dartford, Gravesend, Maidstone, Medway, Canterbury, Ashford, Tunbridge Wells, and all surrounding commercial zones.'
      },
      {
        question: 'How do you handle hazardous items like swollen laptop batteries?',
        answer: 'All damaged lithium-ion batteries are isolated and transported in ADR-compliant fire-retardant containers under UK dangerous goods regulations.'
      },
      {
        question: 'What happens to decommissioned servers and network switches?',
        answer: 'Hardware with secondary market value is tested, graded, and remarketed with revenue return shared back with your organisation.'
      },
      {
        question: 'Are your collection drivers security cleared?',
        answer: 'Yes. All drivers are directly employed, uniformed, and vetted to British Standard BS 7858, operating GPS-tracked vehicles with dead-lock security.'
      }
    ]
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    region: 'Yorkshire & the Humber',
    countyOrArea: 'West Yorkshire',
    tagline: 'Free IT recycling near me in Leeds',
    heroDescription: 'Certified corporate IT collection, WEEE recycling and secure data destruction across Leeds, Bradford, and West Yorkshire. Free pickup for 10+ qualifying laptops, PCs, and servers.',
    rating: '4.9',
    reviewCount: 31,
    featuredTestimonial: {
      author: 'Eleanor Booth',
      company: 'Yorkshire Legal Services',
      role: 'Facilities Manager',
      timeAgo: '1 month ago',
      text: 'Collected 45 laptops and 20 PCs from our Wellington Place office. Outstanding service from start to finish, with serialised destruction certificates supplied prompt as promised.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Leeds City Centre', 'Wellington Place', 'Headingley', 'Horsforth', 'Pudsey',
      'Morley', 'Bradford', 'Wakefield', 'Huddersfield', 'Halifax', 'Dewsbury', 'Harrogate'
    ],
    localHubAddress: 'TechSteps Yorkshire Regional Depot, Leeds Commercial Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Leeds businesses?',
        answer: 'Yes. Businesses, law firms, financial institutions, and universities in Leeds with 10 or more qualifying devices qualify for 100% free collection.'
      },
      {
        question: 'How quickly can you arrange collection in Leeds?',
        answer: 'Standard collection windows are 24 to 48 hours following confirmation. Priority slots can be scheduled for urgent lease-end handbacks.'
      },
      {
        question: 'Can you destroy legal and financial data securely?',
        answer: 'Yes. We apply military-grade Blancco overwriting or physical DIN 66399 shredding, fully compliant with SRA, FCA, and UK GDPR regulations.'
      },
      {
        question: 'Do you provide Environment Agency paperwork?',
        answer: 'Yes. An Environment Agency Waste Transfer Note is provided upon equipment handover, followed by comprehensive asset manifests.'
      },
      {
        question: 'Can you collect monitors, printers, and accessories?',
        answer: 'Yes. Peripherals and displays are collected alongside your core PC and laptop assets for complete WEEE recycling.'
      },
      {
        question: 'Do you service business parks outside central Leeds?',
        answer: 'Yes. We collect across Thorpe Park, White Rose Office Park, Bradford, Wakefield, Harrogate, and surrounding districts.'
      },
      {
        question: 'What is your policy on landfill waste?',
        answer: 'TechSteps enforces a strict 0% landfill policy. Everything collected is refurbished or recycled into constituent raw materials.'
      },
      {
        question: 'Can you handle multi-site collections across Yorkshire?',
        answer: 'Yes. We coordinate consolidated pickups across Leeds, Sheffield, York, and Hull under a single corporate account.'
      }
    ]
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    region: 'South West',
    countyOrArea: 'City of Bristol & South West',
    tagline: 'Free IT recycling near me in Bristol',
    heroDescription: 'Certified IT recycling and secure data erasure across Bristol, Bath, and the South West. Free collection for 10+ laptops, PCs, and enterprise hardware.',
    rating: '4.9',
    reviewCount: 29,
    featuredTestimonial: {
      author: 'Liam Davies',
      company: 'Avon Digital Media',
      role: 'Head of IT',
      timeAgo: '2 weeks ago',
      text: 'TechSteps handled our studio tech refresh seamlessly. Collected over 50 iMacs, Mac Minis, and network arrays with complete Blancco certificates delivered.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Bristol City Centre', 'Temple Quay', 'Clifton', 'Harbourside', 'Avonmouth',
      'Filton', 'Bradley Stoke', 'Aztec West', 'Bath', 'Keynsham', 'Clevedon', 'Portishead'
    ],
    localHubAddress: 'TechSteps South West Hub, Bristol Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Do you offer free IT collection in Bristol?',
        answer: 'Yes. Collections of 10 or more qualifying devices (laptops, PCs, servers) are completely free across Bristol, Bath, and South Gloucestershire.'
      },
      {
        question: 'How quickly can you collect in Bristol and Temple Quay?',
        answer: 'Our regional fleet routinely collects within 24 to 48 hours following scoping.'
      },
      {
        question: 'Can you collect from tech incubators and media studios?',
        answer: 'Yes. We work closely with digital creative agencies, aerospace engineering hubs in Filton, and corporate headquarters.'
      },
      {
        question: 'What compliance certificates are issued?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'Do you destroy data on solid-state drives (SSDs)?',
        answer: 'Yes. We use certified cryptographic erasure tools designed specifically for NVMe and SSD controllers, or 6mm shear shredding.'
      },
      {
        question: 'What happens to redundant IT hardware?',
        answer: 'We prioritise circular reuse and refurbishment. Non-reusable hardware is dismantled into metals and plastics with 0% landfill.'
      },
      {
        question: 'Can you collect heavy server racks from data centres?',
        answer: 'Yes. Our technicians handle de-racking, rail removal, and palletised transport for data centre installations.'
      },
      {
        question: 'Do you service Somerset, Wiltshire, and Gloucestershire?',
        answer: 'Yes. Our South West vehicles operate across Bristol, Bath, Swindon, Gloucester, and Cheltenham.'
      }
    ]
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    region: 'Scotland',
    countyOrArea: 'Greater Glasgow & Clyde Valley',
    tagline: 'Free IT recycling near me in Glasgow',
    heroDescription: 'Certified Scottish IT equipment collection, secure data destruction, and WEEE recycling across Glasgow and the Central Belt. Free pickup for 10+ qualifying commercial units.',
    rating: '5.0',
    reviewCount: 33,
    featuredTestimonial: {
      author: 'Fiona MacLeod',
      company: 'Clyde Financial Tech',
      role: 'Chief Technology Officer',
      timeAgo: '1 month ago',
      text: 'Excellent service in Glasgow City Centre. Collected 90 corporate laptops and 4 enterprise servers without disrupting our trading floor. Full SEPA and GDPR audit paperwork supplied.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Glasgow City Centre', 'Merchant City', 'West End', 'Blythswood Hill', 'Pacific Quay',
      'East Kilbride', 'Paisley', 'Cumbernauld', 'Hamilton', 'Motherwell', 'Clydebank', 'Coatbridge'
    ],
    localHubAddress: 'TechSteps Scotland Logistics Depot, Central Belt Operations',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT recycling free for Glasgow organisations?',
        answer: 'Yes. Commercial batches of 10 or more laptops, desktop PCs, or servers qualify for 100% free nationwide collection across Glasgow.'
      },
      {
        question: 'Are your Scottish operations regulated by SEPA?',
        answer: 'Yes. We are fully registered and compliant with the Scottish Environment Protection Agency (SEPA) and provide complete Waste Transfer documentation.'
      },
      {
        question: 'How quickly can TechSteps collect in Glasgow?',
        answer: 'Standard collection windows across Greater Glasgow and the M8 corridor are 24 to 48 hours from booking.'
      },
      {
        question: 'Can you wipe financial and healthcare data securely?',
        answer: 'Yes. We utilise ADISA accredited Blancco sanitisation software to NIST 800-88 standards and issue serialised destruction certificates.'
      },
      {
        question: 'Do you collect from multi-tenant office towers in Glasgow?',
        answer: 'Yes. Our BS 7858 vetted staff are experienced with loading bay coordination and goods lift access throughout Glasgow City Centre.'
      },
      {
        question: 'What happens to older laptops and desktops?',
        answer: 'Viable hardware is refurbished and remarketed with residual financial return. Non-functional devices are dismantled for zero-landfill material recovery.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. All peripheral workplace technology can be consolidated alongside your main computer and server collections.'
      },
      {
        question: 'Can you support multi-site collections across Scotland?',
        answer: 'Yes. We coordinate consolidated rollouts covering Glasgow, Edinburgh, Stirling, Dundee, and Aberdeen.'
      }
    ]
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland',
    countyOrArea: 'City of Edinburgh & Lothians',
    tagline: 'Free IT recycling near me in Edinburgh',
    heroDescription: 'Certified corporate IT collection, SEPA compliant WEEE disposal, and military-grade data erasure for Edinburgh financial, legal, and tech organisations. Free for 10+ devices.',
    rating: '4.9',
    reviewCount: 35,
    featuredTestimonial: {
      author: 'Alastair Campbell',
      company: 'Lothian Asset Management',
      role: 'Chief Information Security Officer',
      timeAgo: '3 weeks ago',
      text: 'Collected 70 corporate laptops and multiple server enclosures from our George Street office. Top security credentials, professional drivers, and rapid certificate issuance.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Edinburgh City Centre', 'New Town', 'Old Town', 'Leith', 'Edinburgh Park',
      'The Gyle', 'Haymarket', 'Morningside', 'Livingston', 'Dunfermline', 'Musselburgh', 'Dalkeith'
    ],
    localHubAddress: 'TechSteps Edinburgh Logistics Centre, Edinburgh Park Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free in Edinburgh?',
        answer: 'Yes. Qualifying business batches of 10 or more PCs, corporate laptops, or servers are collected free of charge across Edinburgh.'
      },
      {
        question: 'How quickly can you arrange pickup in Edinburgh?',
        answer: 'Our Scottish fleet services Edinburgh and Edinburgh Park every 24 to 48 hours.'
      },
      {
        question: 'Do you comply with SEPA and UK GDPR regulations?',
        answer: 'Yes. We provide full SEPA statutory transfer documentation and itemised ADISA certified data sanitisation certificates.'
      },
      {
        question: 'Can you collect from high-security financial offices?',
        answer: 'Yes. All drivers are BS 7858 vetted and operate GPS-tracked, lockable fleet vehicles for high-security transit.'
      },
      {
        question: 'Do you destroy data on-site in Edinburgh?',
        answer: 'Yes. Mobile shredding and witnessed software wiping services can be scheduled directly at your Edinburgh premises.'
      },
      {
        question: 'What happens to redundant computer equipment?',
        answer: 'We operate a circular-first policy. Working equipment is tested, wiped, and remarketed; damaged units are recycled into constituent metals.'
      },
      {
        question: 'Can you collect monitors, telepresence gear, and copiers?',
        answer: 'Yes. We accept all categories of workplace hardware including conference room screens and printers.'
      },
      {
        question: 'Do you service areas outside Edinburgh?',
        answer: 'Yes. We cover the Lothians, Fife, Livingston, Stirling, and the central Scottish corridor.'
      }
    ]
  },
  {
    slug: 'cardiff',
    name: 'Cardiff',
    region: 'Wales',
    countyOrArea: 'South Wales & Severn Estuary',
    tagline: 'Free IT recycling near me in Cardiff',
    heroDescription: 'Certified Welsh IT equipment disposal, WEEE compliance, and secure data sanitisation across Cardiff, Newport, and South Wales. Free pickup for 10+ qualifying enterprise items.',
    rating: '5.0',
    reviewCount: 27,
    featuredTestimonial: {
      author: 'Gethin Jones',
      company: 'Cardiff Bay Software',
      role: 'Infrastructure Manager',
      timeAgo: '1 month ago',
      text: 'Seamless collection of 55 ThinkPads and 12 workstations from our Cardiff Bay offices. Professional team, zero cost, and full destruction certificates provided.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Cardiff City Centre', 'Cardiff Bay', 'Cathays', 'Roath', 'Canton',
      'Newport', 'Penarth', 'Barry', 'Bridgend', 'Pontypridd', 'Caerphilly', 'Llantrisant'
    ],
    localHubAddress: 'TechSteps Wales Operations Hub, South Wales Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free for businesses in Cardiff?',
        answer: 'Yes. Collections of 10 or more laptops, desktop computers, or servers qualify for free pickup across Cardiff and South Wales.'
      },
      {
        question: 'How quickly can TechSteps collect in Cardiff?',
        answer: 'Standard response times are 24 to 48 hours from initial scoping.'
      },
      {
        question: 'Do you comply with Natural Resources Wales (NRW) standards?',
        answer: 'Yes. We are licensed waste brokers/carriers and provide full statutory transfer documentation.'
      },
      {
        question: 'What data destruction standards do you employ?',
        answer: 'We use ADISA accredited Blancco software wiping and DIN 66399 particle shredding with serialised certificates.'
      },
      {
        question: 'Can you collect from public sector and NHS Wales organisations?',
        answer: 'Yes. We frequently service NHS Wales health boards, local councils, universities, and schools.'
      },
      {
        question: 'What is your environmental approach to retired IT assets?',
        answer: 'We maintain a strict zero-landfill policy. Viable equipment is refurbished for extended use; scrap components enter certified recycling streams.'
      },
      {
        question: 'Can you collect commercial copiers and monitors?',
        answer: 'Yes. All IT peripherals and screens can be included alongside primary computer batches.'
      },
      {
        question: 'Do you service areas beyond Cardiff?',
        answer: 'Yes. We cover Newport, Swansea, Bridgend, the Valleys, and the M4 South Wales corridor.'
      }
    ]
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    region: 'East of England',
    countyOrArea: 'Cambridgeshire & Silicon Fen',
    tagline: 'Free IT recycling near me in Cambridge',
    heroDescription: 'Certified IT asset disposition, high-security data destruction, and laboratory technology recycling across Cambridge, Silicon Fen, and East Anglia. Free collection for 10+ devices.',
    rating: '5.0',
    reviewCount: 38,
    featuredTestimonial: {
      author: 'Dr. Helena Foster',
      company: 'Cambridge BioTech Innovations',
      role: 'Lab & IT Operations Lead',
      timeAgo: '2 weeks ago',
      text: 'Collected 40 high-performance workstations and 6 server units from Cambridge Science Park. Flawless handling of sensitive research data with complete audit manifests.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Cambridge City Centre', 'Cambridge Science Park', 'St John\'s Innovation Centre',
      'Silicon Fen', 'Granta Park', 'Babraham Research Campus', 'Ely', 'Newmarket',
      'Huntingdon', 'Royston', 'Peterborough', 'Saffron Walden'
    ],
    localHubAddress: 'TechSteps East of England Hub, Cambridge Science Corridor',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Cambridge science parks?',
        answer: 'Yes. Commercial collections of 10 or more laptops, CAD workstations, or servers are 100% free across Cambridge and Cambridgeshire.'
      },
      {
        question: 'How quickly can you collect in Cambridge?',
        answer: 'Our dedicated East Anglia vehicles service Cambridge, Granta Park, and Silicon Fen every 24 to 48 hours.'
      },
      {
        question: 'Can you handle proprietary research and R&D computing hardware?',
        answer: 'Yes. We adhere to strict NDA and ADISA security standards, providing multi-pass data destruction or physical disintegration on-site.'
      },
      {
        question: 'What documentation is provided for university and venture audits?',
        answer: 'You will receive an itemised Asset Manifest, Environment Agency Waste Transfer Note, and certified Destruction Certificate.'
      },
      {
        question: 'Do you collect from cleanrooms and laboratory environments?',
        answer: 'Yes. Our trained personnel can collect specialised rackmount controllers and computing units directly from science park facilities.'
      },
      {
        question: 'What happens to decommissioned laptops and PCs?',
        answer: 'Working devices are refurbished and remarketed with revenue return; obsolete units are dismantled with zero landfill waste.'
      },
      {
        question: 'Can you collect monitors, networking arrays, and telecom hardware?',
        answer: 'Yes. We accept all categories of business IT hardware and office peripherals.'
      },
      {
        question: 'Do you service areas beyond Cambridge?',
        answer: 'Yes. We cover Ely, Huntingdon, Peterborough, Royston, and throughout East Anglia.'
      }
    ]
  },
  {
    slug: 'oxford',
    name: 'Oxford',
    region: 'South East',
    countyOrArea: 'Oxfordshire & Thames Valley',
    tagline: 'Free IT recycling near me in Oxford',
    heroDescription: 'Certified IT recycling, scientific workstation de-installation, and secure data destruction across Oxford, Milton Park, and Oxfordshire. Free collection for 10+ qualifying assets.',
    rating: '4.9',
    reviewCount: 30,
    featuredTestimonial: {
      author: 'Edward Thornton',
      company: 'Oxford Therapeutics Labs',
      role: 'IT Director',
      timeAgo: '3 weeks ago',
      text: 'Collected 50 MacBooks and 15 precision workstations from Oxford Science Park. Fast turnaround, impeccable compliance certificates, and zero collection charges.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Oxford City Centre', 'Oxford Science Park', 'Oxford Business Park', 'Milton Park',
      'Headington', 'Cowley', 'Abingdon', 'Didcot', 'Bicester', 'Witney', 'Banbury', 'Kidlington'
    ],
    localHubAddress: 'TechSteps Thames Valley Hub, Oxford Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Oxford organisations?',
        answer: 'Yes. Qualifying collections of 10 or more laptops, PCs, or server chassis are completely free throughout Oxford and Oxfordshire.'
      },
      {
        question: 'How quickly can TechSteps collect in Oxford?',
        answer: 'Our Thames Valley team routinely collects within 24 to 48 hours from initial confirmation.'
      },
      {
        question: 'Can you destroy sensitive biotechnology and intellectual property data?',
        answer: 'Yes. We provide certified Blancco wiping to NIST 800-88 standards or witnessed physical shredding on-site.'
      },
      {
        question: 'Do you service university colleges and research institutes?',
        answer: 'Yes. We regularly manage hardware refreshes for collegiate universities, research hospitals, and biotech firms.'
      },
      {
        question: 'What compliance certificates are provided?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, serialised Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What is your zero-landfill guarantee?',
        answer: 'Every piece of IT hardware collected is either refurbished for extended lifecycle utility or recycled into pure metals and plastics.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. Peripherals and office displays can be consolidated alongside your primary computer hardware.'
      },
      {
        question: 'Do you collect across Oxfordshire?',
        answer: 'Yes. We service Abingdon, Didcot, Bicester, Banbury, Witney, and the wider M40 corridor.'
      }
    ]
  },
  {
    slug: 'reading',
    name: 'Reading',
    region: 'South East',
    countyOrArea: 'Berkshire & Thames Valley Silicon Corridor',
    tagline: 'Free IT recycling near me in Reading',
    heroDescription: 'Certified corporate IT collection, enterprise server decommissioning, and data erasure across Reading, Green Park, and the Thames Valley tech hub. Free pickup for 10+ devices.',
    rating: '5.0',
    reviewCount: 34,
    featuredTestimonial: {
      author: 'Sophie Palmer',
      company: 'Thames Valley Cloud Systems',
      role: 'Head of Infrastructure',
      timeAgo: '2 weeks ago',
      text: 'Collected 75 enterprise laptops and 8 rack servers from Green Park. Punctual, professional, and delivered our data erasure certificates within 48 hours.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Reading Town Centre', 'Green Park', 'Thames Valley Park', 'Winnersh Triangle',
      'Bracknell', 'Wokingham', 'Maidenhead', 'Slough', 'Newbury', 'Henley-on-Thames', 'Woodley', 'Theale'
    ],
    localHubAddress: 'TechSteps Thames Valley Logistics Centre, Reading Depot',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT recycling free in Reading and Green Park?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for 100% free collection across Reading and Berkshire.'
      },
      {
        question: 'How quickly can you arrange pickup in Reading?',
        answer: 'Our Thames Valley fleet provides collections within 24 to 48 hours following confirmation.'
      },
      {
        question: 'Can you de-rack servers in Reading data centres?',
        answer: 'Yes. Our security-vetted engineers handle cable tracing, de-racking, rail removal, and palletised transit.'
      },
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We adhere to ADISA Standard 8.0 and NIST 800-88 Purge standards, providing serialised erasure logs.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to retired enterprise laptops?',
        answer: 'Viable laptops are refurbished and remarketed with revenue return; damaged machines are recycled with zero landfill.'
      },
      {
        question: 'Can you collect monitors, printers, and accessories?',
        answer: 'Yes. Office screens and peripherals are accepted alongside qualifying PC and server batches.'
      },
      {
        question: 'Do you service areas beyond Reading?',
        answer: 'Yes. We cover Slough, Maidenhead, Bracknell, Wokingham, Newbury, and the entire M4 corridor.'
      }
    ]
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    region: 'North West',
    countyOrArea: 'Merseyside & North West',
    tagline: 'Free IT recycling near me in Liverpool',
    heroDescription: 'Certified IT recycling, commercial computer collection, and certified data destruction across Liverpool, Merseyside, and the North West. Free pickup for 10+ qualifying items.',
    rating: '4.9',
    reviewCount: 28,
    featuredTestimonial: {
      author: 'Daniel Craig',
      company: 'Mersey Maritime Logistics',
      role: 'IT Operations Manager',
      timeAgo: '1 month ago',
      text: 'Collected 45 desktop PCs and 20 laptops from our Liverpool Waterfront office. Excellent communication, prompt drivers, and our compliance documents arrived on time.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Liverpool City Centre', 'Commercial District', 'Baltic Triangle', 'Liverpool ONE',
      'Birkenhead', 'Bootle', 'Speke', 'Knowsley', 'St Helens', 'Southport', 'Wallasey', 'Crosby'
    ],
    localHubAddress: 'TechSteps North West Depot, Liverpool Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Liverpool organisations?',
        answer: 'Yes. Collections of 10 or more laptops, desktop PCs, or servers are completely free throughout Liverpool and Merseyside.'
      },
      {
        question: 'How quickly can TechSteps collect in Liverpool?',
        answer: 'Our regional fleet routinely collects within 24 to 48 hours from initial confirmation.'
      },
      {
        question: 'Do you collect from port authorities and logistics parks?',
        answer: 'Yes. We service shipping companies, corporate offices, public sector bodies, and tech studios across Liverpool.'
      },
      {
        question: 'What data destruction proof is provided?',
        answer: 'You will receive an Environment Agency Waste Transfer Note and serialised Certificate of Destruction.'
      },
      {
        question: 'Can you destroy hard drives on-site in Liverpool?',
        answer: 'Yes. Witnessed mobile shredding and software sanitisation can be booked directly at your facility.'
      },
      {
        question: 'What is your environmental landfill policy?',
        answer: 'TechSteps enforces a 100% zero-landfill policy. Everything collected is refurbished or recycled into constituent materials.'
      },
      {
        question: 'Can you collect monitors, copiers, and network cables?',
        answer: 'Yes. All workplace IT peripherals can be consolidated alongside your main computer hardware.'
      },
      {
        question: 'Do you service Wirral and Cheshire?',
        answer: 'Yes. We cover Birkenhead, Wallasey, Chester, St Helens, and surrounding North West areas.'
      }
    ]
  },
  {
    slug: 'sheffield',
    name: 'Sheffield',
    region: 'Yorkshire & the Humber',
    countyOrArea: 'South Yorkshire',
    tagline: 'Free IT recycling near me in Sheffield',
    heroDescription: 'Certified IT recycling, engineering computer collection, and WEEE disposal across Sheffield, Rotherham, and South Yorkshire. Free pickup for 10+ qualifying commercial assets.',
    rating: '5.0',
    reviewCount: 26,
    featuredTestimonial: {
      author: 'Martin Wright',
      company: 'Advanced Engineering Tech Sheffield',
      role: 'IT Systems Manager',
      timeAgo: '3 weeks ago',
      text: 'Collected 35 CAD workstations and 15 laptops from our Advanced Manufacturing Park site. Impeccable data security and zero fees.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Sheffield City Centre', 'Advanced Manufacturing Park', 'Attercliffe', 'Hillsborough',
      'Meadowhall', 'Rotherham', 'Doncaster', 'Barnsley', 'Chesterfield', 'Worksop'
    ],
    localHubAddress: 'TechSteps Yorkshire Hub, Sheffield Depot',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free in Sheffield?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis are completely free across Sheffield and South Yorkshire.'
      },
      {
        question: 'How quickly can you collect in Sheffield?',
        answer: 'Standard collection windows are 24 to 48 hours following confirmation.'
      },
      {
        question: 'Can you collect from industrial estates and manufacturing parks?',
        answer: 'Yes. We regularly collect from engineering facilities, universities, and commercial offices.'
      },
      {
        question: 'What data destruction standards do you employ?',
        answer: 'We apply ADISA Standard 8.0 and NIST 800-88 Purge standards, issuing full serialised certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to decommissioned IT hardware?',
        answer: 'Viable hardware is refurbished and remarketed; non-reusable devices enter certified zero-landfill material recovery.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. All workplace IT peripherals can be bundled alongside your primary computer hardware.'
      },
      {
        question: 'Do you service Rotherham, Doncaster, and Barnsley?',
        answer: 'Yes. We cover the entire South Yorkshire commercial region.'
      }
    ]
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    region: 'North East',
    countyOrArea: 'Tyne & Wear and North East',
    tagline: 'Free IT recycling near me in Newcastle',
    heroDescription: 'Certified corporate IT collection, WEEE disposal, and military-grade data erasure across Newcastle upon Tyne, Gateshead, and the North East. Free pickup for 10+ devices.',
    rating: '4.9',
    reviewCount: 25,
    featuredTestimonial: {
      author: 'Graeme Scott',
      company: 'Tyne Digital Systems',
      role: 'Head of Operations',
      timeAgo: '1 month ago',
      text: 'Collected 60 desktops and laptops from our Quayside office. Highly professional team, zero hidden fees, and destruction certificates supplied within 3 days.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Newcastle City Centre', 'Quayside', 'Jesmond', 'Gosforth', 'Newcastle Helix',
      'Gateshead', 'Sunderland', 'South Shields', 'North Shields', 'Tynemouth', 'Durham', 'Cramlington'
    ],
    localHubAddress: 'TechSteps North East Logistics Centre, Newcastle Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Newcastle businesses?',
        answer: 'Yes. Commercial collections of 10 or more qualifying devices qualify for 100% free collection across Newcastle and Tyne & Wear.'
      },
      {
        question: 'How quickly can you arrange collection in Newcastle?',
        answer: 'Our North East fleet services Newcastle and Gateshead within 24 to 48 hours.'
      },
      {
        question: 'Do you service tech hubs and university departments?',
        answer: 'Yes. We collect from Newcastle Helix, universities, NHS hospitals, and corporate offices.'
      },
      {
        question: 'What proof of data destruction is provided?',
        answer: 'You will receive an itemised Certificate of Destruction with serial numbers and an Environment Agency Waste Transfer Note.'
      },
      {
        question: 'Can you destroy hard drives on-site in Newcastle?',
        answer: 'Yes. Mobile on-site shredding and software sanitisation can be booked directly at your premises.'
      },
      {
        question: 'What happens to retired computer hardware?',
        answer: 'Hardware is refurbished under our circular reuse policy or dismantled into raw metals with zero landfill.'
      },
      {
        question: 'Can you collect monitors, copiers, and network equipment?',
        answer: 'Yes. Peripherals and displays are collected alongside your core PC and laptop batches.'
      },
      {
        question: 'Do you cover Sunderland, Durham, and Northumberland?',
        answer: 'Yes. Our vehicles cover the entire North East commercial corridor.'
      }
    ]
  },
  {
    slug: 'southampton',
    name: 'Southampton',
    region: 'South East',
    countyOrArea: 'Hampshire & Solent',
    tagline: 'Free IT recycling near me in Southampton',
    heroDescription: 'Certified business IT collection, marine logistics tech disposal, and secure data destruction across Southampton, Portsmouth, and Hampshire. Free pickup for 10+ devices.',
    rating: '5.0',
    reviewCount: 24,
    featuredTestimonial: {
      author: 'Helen Ward',
      company: 'Solent Maritime Technologies',
      role: 'IT Director',
      timeAgo: '3 weeks ago',
      text: 'Collected 40 laptops and 4 server racks from our Ocean Village office. Excellent communication, professional drivers, and rapid compliance turnaround.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Southampton City Centre', 'Ocean Village', 'Portswood', 'Shirley', 'Eastleigh',
      'Portsmouth', 'Fareham', 'Winchester', 'Romsey', 'Totton', 'Havant', 'Gosport'
    ],
    localHubAddress: 'TechSteps South Coast Depot, Southampton Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free in Southampton and Portsmouth?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for free pickup across Southampton and Hampshire.'
      },
      {
        question: 'How quickly can TechSteps collect in Southampton?',
        answer: 'Our South Coast vehicles collect within 24 to 48 hours following scoping.'
      },
      {
        question: 'Can you collect from port facilities and maritime offices?',
        answer: 'Yes. We regularly service port logistics, corporate offices, universities, and NHS trusts.'
      },
      {
        question: 'What data destruction standards do you employ?',
        answer: 'We apply ADISA Standard 8.0 and NIST 800-88 Purge standards, issuing complete audit certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to retired enterprise equipment?',
        answer: 'Viable hardware is refurbished and remarketed; damaged units enter certified zero-landfill recycling.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. Peripherals and office displays can be consolidated alongside your main computer hardware.'
      },
      {
        question: 'Do you service Winchester, Fareham, and the New Forest?',
        answer: 'Yes. We cover all commercial zones throughout Hampshire and the Solent area.'
      }
    ]
  },
  {
    slug: 'nottingham',
    name: 'Nottingham',
    region: 'East Midlands',
    countyOrArea: 'Nottinghamshire & East Midlands',
    tagline: 'Free IT recycling near me in Nottingham',
    heroDescription: 'Certified corporate IT collection, WEEE disposal, and secure data destruction across Nottingham, Derby, and the East Midlands. Free pickup for 10+ qualifying items.',
    rating: '4.9',
    reviewCount: 26,
    featuredTestimonial: {
      author: 'Oliver Bennett',
      company: 'Trent Creative Digital',
      role: 'Operations Director',
      timeAgo: '1 month ago',
      text: 'Collected 50 workstations and multiple laptops from our Lace Market studio. Punctual, zero charges, and our destruction certificates arrived quickly.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Nottingham City Centre', 'Lace Market', 'Hockley', 'West Bridgford', 'Beeston',
      'Derby', 'Mansfield', 'Newark-on-Trent', 'Ilkeston', 'Long Eaton', 'Hucknall', 'Arnold'
    ],
    localHubAddress: 'TechSteps East Midlands Depot, Nottingham Commercial Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free for Nottingham businesses?',
        answer: 'Yes. Qualifying commercial batches of 10 or more PCs, corporate laptops, or servers are completely free of charge.'
      },
      {
        question: 'How quickly can you arrange collection in Nottingham?',
        answer: 'Standard collection windows are 24 to 48 hours following confirmation.'
      },
      {
        question: 'Can you collect from creative agencies and universities in Nottingham?',
        answer: 'Yes. We service tech businesses, university campuses, NHS trusts, and corporate offices.'
      },
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We adhere to ADISA Standard 8.0 and NIST 800-88 Purge standards, providing itemised erasure logs.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to decommissioned laptops and PCs?',
        answer: 'Working devices are refurbished and remarketed with revenue return; obsolete units are recycled with zero landfill.'
      },
      {
        question: 'Can you collect monitors, printers, and accessories?',
        answer: 'Yes. Office screens and peripherals are accepted alongside qualifying PC and server batches.'
      },
      {
        question: 'Do you cover Derby and Mansfield?',
        answer: 'Yes. Our vehicles cover Nottinghamshire, Derbyshire, and the M1 corridor.'
      }
    ]
  },
  {
    slug: 'leicester',
    name: 'Leicester',
    region: 'East Midlands',
    countyOrArea: 'Leicestershire & East Midlands',
    tagline: 'Free IT recycling near me in Leicester',
    heroDescription: 'Certified IT recycling, commercial computer collection, and certified data destruction across Leicester, Loughborough, and Leicestershire. Free pickup for 10+ devices.',
    rating: '5.0',
    reviewCount: 23,
    featuredTestimonial: {
      author: 'Priya Sharma',
      company: 'Midland Retail Group',
      role: 'IT Asset Coordinator',
      timeAgo: '3 weeks ago',
      text: 'Collected 70 EPOS terminals and 40 laptops from our Leicester hub. Impeccable paperwork and smooth collection logistics throughout.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Leicester City Centre', 'Cultural Quarter', 'Oadby', 'Wigston', 'Loughborough',
      'Hinckley', 'Melton Mowbray', 'Coalville', 'Market Harborough', 'Braunstone'
    ],
    localHubAddress: 'TechSteps Midlands Hub, Leicester Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free in Leicester?',
        answer: 'Yes. Collections of 10 or more qualifying devices (laptops, PCs, servers) are completely free across Leicester and Leicestershire.'
      },
      {
        question: 'How quickly can you collect in Leicester?',
        answer: 'Our regional fleet routinely collects within 24 to 48 hours following scoping.'
      },
      {
        question: 'Can you collect from retail head offices and logistics centres?',
        answer: 'Yes. We work closely with commercial offices, retail distribution centres, and universities.'
      },
      {
        question: 'What compliance certificates are issued?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'Do you destroy data on solid-state drives (SSDs)?',
        answer: 'Yes. We use certified cryptographic erasure tools or 6mm shear shredding.'
      },
      {
        question: 'What happens to redundant IT hardware?',
        answer: 'We prioritise circular reuse and refurbishment. Non-reusable hardware is dismantled into metals and plastics with 0% landfill.'
      },
      {
        question: 'Can you collect heavy server racks from data centres?',
        answer: 'Yes. Our technicians handle de-racking, rail removal, and palletised transport.'
      },
      {
        question: 'Do you service Loughborough and Hinckley?',
        answer: 'Yes. We cover all commercial areas throughout Leicestershire.'
      }
    ]
  },
  {
    slug: 'coventry',
    name: 'Coventry',
    region: 'West Midlands',
    countyOrArea: 'Warwickshire & West Midlands',
    tagline: 'Free IT recycling near me in Coventry',
    heroDescription: 'Certified IT asset disposal, engineering workstation recycling, and secure data destruction across Coventry, Warwick, and Leamington Spa. Free pickup for 10+ devices.',
    rating: '4.9',
    reviewCount: 22,
    featuredTestimonial: {
      author: 'James Wilson',
      company: 'Automotive Design Technologies',
      role: 'IT Lead',
      timeAgo: '1 month ago',
      text: 'Collected 30 CAD workstations and multiple servers from our Coventry campus. First-rate service, security cleared staff, and zero collection fees.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Coventry City Centre', 'University of Warwick Science Park', 'Foleshill', 'Tile Hill',
      'Leamington Spa', 'Warwick', 'Kenilworth', 'Nuneaton', 'Rugby', 'Bedworth', 'Stratford-upon-Avon'
    ],
    localHubAddress: 'TechSteps West Midlands Depot, Coventry Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free for Coventry organisations?',
        answer: 'Yes. Commercial collections of 10 or more laptops, desktop PCs, or servers are completely free across Coventry and Warwickshire.'
      },
      {
        question: 'How quickly can TechSteps collect in Coventry?',
        answer: 'Our West Midlands fleet collects within 24 to 48 hours from initial confirmation.'
      },
      {
        question: 'Can you collect from automotive and engineering tech parks?',
        answer: 'Yes. We service engineering design labs, science parks, and corporate offices.'
      },
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We adhere to ADISA Standard 8.0 and NIST 800-88 Purge standards, providing serialised erasure certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to decommissioned laptops and workstations?',
        answer: 'Working devices are refurbished and remarketed with revenue return; obsolete units enter zero-landfill recycling.'
      },
      {
        question: 'Can you collect monitors, copiers, and network equipment?',
        answer: 'Yes. All IT peripherals can be bundled alongside your primary computer hardware.'
      },
      {
        question: 'Do you cover Leamington Spa, Warwick, and Rugby?',
        answer: 'Yes. We service all commercial zones across Coventry and Warwickshire.'
      }
    ]
  },
  {
    slug: 'milton-keynes',
    name: 'Milton Keynes',
    region: 'South East',
    countyOrArea: 'Buckinghamshire & Central Corridor',
    tagline: 'Free IT recycling near me in Milton Keynes',
    heroDescription: 'Certified corporate IT collection, WEEE disposal, and secure data sanitisation across Milton Keynes, Northampton, and Buckinghamshire. Free pickup for 10+ qualifying items.',
    rating: '5.0',
    reviewCount: 29,
    featuredTestimonial: {
      author: 'Karen Miller',
      company: 'Logistics Software Solutions MK',
      role: 'Operations Manager',
      timeAgo: '2 weeks ago',
      text: 'Collected 60 laptops and 25 desktop workstations from our Central Milton Keynes offices. Excellent communication and fast certificates.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Central Milton Keynes', 'Bletchley', 'Wolverton', 'Newport Pagnell', 'Tongwell',
      'Northampton', 'Bedford', 'Luton', 'Aylesbury', 'Buckingham', 'Towcester'
    ],
    localHubAddress: 'TechSteps Central Corridor Hub, Milton Keynes Depot',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free in Milton Keynes?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for free pickup across Milton Keynes and surrounding districts.'
      },
      {
        question: 'How quickly can you collect in Milton Keynes?',
        answer: 'Our central fleet provides collections within 24 to 48 hours following confirmation.'
      },
      {
        question: 'Can you collect from distribution hubs and corporate HQs?',
        answer: 'Yes. We regularly collect from business parks, logistics centres, and tech offices.'
      },
      {
        question: 'What data destruction standards do you employ?',
        answer: 'We apply ADISA Standard 8.0 and NIST 800-88 Purge standards, issuing full serialised certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to decommissioned IT hardware?',
        answer: 'Viable hardware is refurbished and remarketed; damaged units enter certified zero-landfill material recovery.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. All workplace IT peripherals can be consolidated alongside your primary computer hardware.'
      },
      {
        question: 'Do you cover Northampton, Bedford, and Luton?',
        answer: 'Yes. We service the entire central commercial corridor.'
      }
    ]
  },
  {
    slug: 'belfast',
    name: 'Belfast',
    region: 'Northern Ireland',
    countyOrArea: 'Greater Belfast & Northern Ireland',
    tagline: 'Free IT recycling near me in Belfast',
    heroDescription: 'Certified Northern Ireland IT equipment disposal, NIEA compliant WEEE recycling, and secure data erasure across Belfast and beyond. Free pickup for 10+ qualifying enterprise devices.',
    rating: '5.0',
    reviewCount: 21,
    featuredTestimonial: {
      author: 'Conor O\'Neill',
      company: 'Titanic Quarter Tech',
      role: 'IT Director',
      timeAgo: '1 month ago',
      text: 'Collected 50 corporate laptops and 10 server chassis from our Belfast office. Outstanding service, full NIEA compliance, and certificates delivered promptly.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Belfast City Centre', 'Titanic Quarter', 'Cathedral Quarter', 'Malone', 'Boucher Road',
      'Lisburn', 'Bangor', 'Newtownards', 'Antrim', 'Ballymena', 'Craigavon', 'Newry'
    ],
    localHubAddress: 'TechSteps Northern Ireland Logistics Depot, Belfast Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT recycling free for Belfast organisations?',
        answer: 'Yes. Commercial collections of 10 or more laptops, desktop PCs, or servers qualify for free collection across Greater Belfast.'
      },
      {
        question: 'Do you comply with Northern Ireland Environment Agency (NIEA) standards?',
        answer: 'Yes. We are fully registered and compliant with NIEA waste regulations and provide statutory transfer documentation.'
      },
      {
        question: 'How quickly can TechSteps collect in Belfast?',
        answer: 'Standard collection windows are 24 to 48 hours following scoping.'
      },
      {
        question: 'Can you destroy data securely for financial and legal clients in Belfast?',
        answer: 'Yes. We apply military-grade Blancco overwriting or physical DIN 66399 shredding with serialised certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive a statutory Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to redundant computer equipment?',
        answer: 'We operate a strict zero-landfill policy. Functional machines are refurbished; non-viable assets are recycled into raw materials.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. All workplace IT peripherals can be consolidated alongside your main computer collections.'
      },
      {
        question: 'Do you service areas beyond Belfast in Northern Ireland?',
        answer: 'Yes. We cover Lisburn, Bangor, Antrim, Newry, and throughout Northern Ireland.'
      }
    ]
  },
  {
    slug: 'aberdeen',
    name: 'Aberdeen',
    region: 'Scotland',
    countyOrArea: 'Grampian & Energy Sector Corridor',
    tagline: 'Free IT recycling near me in Aberdeen',
    heroDescription: 'Certified Scottish IT equipment collection, offshore tech decommissioning, and SEPA compliant WEEE disposal across Aberdeen and Aberdeenshire. Free for 10+ devices.',
    rating: '4.9',
    reviewCount: 20,
    featuredTestimonial: {
      author: 'Callum Fraser',
      company: 'North Sea Subsea Systems',
      role: 'IT & Data Security Lead',
      timeAgo: '3 weeks ago',
      text: 'Collected 40 ruggedized field laptops and 6 server enclosures from our Altens Industrial Estate facility. Flawless execution and prompt SEPA certificates.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Aberdeen City Centre', 'Altens Industrial Estate', 'Dyce', 'Bridge of Don',
      'Kingswells', 'Westhill', 'Inverurie', 'Stonehaven', 'Peterhead', 'Ellon'
    ],
    localHubAddress: 'TechSteps Scotland North Depot, Aberdeen Commercial Network',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free in Aberdeen?',
        answer: 'Yes. Qualifying commercial batches of 10 or more PCs, corporate laptops, or servers are completely free across Aberdeen.'
      },
      {
        question: 'Can you handle offshore and energy sector computing hardware?',
        answer: 'Yes. We are experienced with industrial workstations, rugged laptops, and high-security oil & gas exploration storage media.'
      },
      {
        question: 'Are your Scottish operations regulated by SEPA?',
        answer: 'Yes. We are registered with SEPA and provide complete statutory transfer documentation.'
      },
      {
        question: 'What data destruction proof is provided?',
        answer: 'You will receive an itemised Certificate of Destruction with serial numbers and an Environment Agency/SEPA Waste Transfer Note.'
      },
      {
        question: 'How quickly can you arrange collection in Aberdeen?',
        answer: 'Our Scottish fleet services Aberdeen, Dyce, and Altens within 24 to 48 hours.'
      },
      {
        question: 'What is your environmental landfill policy?',
        answer: 'TechSteps enforces a strict 0% landfill policy. Everything collected is refurbished or recycled into constituent materials.'
      },
      {
        question: 'Can you collect monitors, printers, and accessories?',
        answer: 'Yes. Office screens and peripherals are accepted alongside qualifying PC and server batches.'
      },
      {
        question: 'Do you cover Aberdeenshire and surrounding areas?',
        answer: 'Yes. We cover Westhill, Inverurie, Stonehaven, and throughout the Grampian region.'
      }
    ]
  },
  {
    slug: 'bournemouth',
    name: 'Bournemouth',
    region: 'South West',
    countyOrArea: 'Dorset & South Coast',
    tagline: 'Free IT recycling near me in Bournemouth',
    heroDescription: 'Certified business IT collection, financial services technology disposal, and secure data destruction across Bournemouth, Poole, and Dorset. Free pickup for 10+ devices.',
    rating: '5.0',
    reviewCount: 21,
    featuredTestimonial: {
      author: 'Neil Richardson',
      company: 'Dorset Insurance Group',
      role: 'IT Operations Manager',
      timeAgo: '1 month ago',
      text: 'Collected 55 desktops and 20 laptops from our Bournemouth office. Flawless service, security-vetted drivers, and our certificates arrived within 3 days.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Bournemouth Town Centre', 'Lansdowne Commercial Quarter', 'Boscombe', 'Poole',
      'Christchurch', 'Ferndown Industrial Estate', 'Wimborne', 'Ringwood', 'Wareham', 'Dorchester'
    ],
    localHubAddress: 'TechSteps South Coast Depot, Dorset Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT collection free in Bournemouth and Poole?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for free pickup across Bournemouth and Dorset.'
      },
      {
        question: 'How quickly can TechSteps collect in Bournemouth?',
        answer: 'Our South Coast fleet collects within 24 to 48 hours following scoping.'
      },
      {
        question: 'Can you destroy sensitive financial and insurance data?',
        answer: 'Yes. We apply military-grade Blancco overwriting or physical DIN 66399 shredding with serialised certificates.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to retired enterprise equipment?',
        answer: 'Viable hardware is refurbished and remarketed; damaged units enter certified zero-landfill recycling.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. Peripherals and office displays can be consolidated alongside your main computer hardware.'
      },
      {
        question: 'Do you service Christchurch and Poole?',
        answer: 'Yes. We service the entire Bournemouth, Christchurch, and Poole conurbation and wider Dorset.'
      },
      {
        question: 'Are your drivers security cleared?',
        answer: 'Yes. All drivers are BS 7858 vetted and operate GPS-tracked fleet vehicles.'
      }
    ]
  },
  {
    slug: 'brighton',
    name: 'Brighton',
    region: 'South East',
    countyOrArea: 'East Sussex & South Coast',
    tagline: 'Free IT recycling near me in Brighton',
    heroDescription: 'Certified IT recycling, creative agency tech disposal, and secure data sanitisation across Brighton, Hove, and Sussex. Free collection for 10+ qualifying items.',
    rating: '5.0',
    reviewCount: 27,
    featuredTestimonial: {
      author: 'Zoe Jenkins',
      company: 'Brighton Creative Media',
      role: 'Head of Technology',
      timeAgo: '2 weeks ago',
      text: 'Collected 45 Apple MacBooks and studio displays from our North Laine agency. Super smooth, carbon-neutral recycling, and zero collection fees.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Brighton City Centre', 'North Laine', 'The Lanes', 'Hove', 'Kemptown',
      'Portslade', 'Worthing', 'Lewes', 'Shoreham-by-Sea', 'Newhaven', 'Eastbourne'
    ],
    localHubAddress: 'TechSteps Sussex Depot, Brighton Commercial Hub',
    phone: '0800 083 4700',
    leadTime: '24–48 hours',
    faqs: [
      {
        question: 'Is IT equipment collection free for Brighton businesses?',
        answer: 'Yes. Qualifying commercial batches of 10 or more laptops, PCs, or server units are completely free across Brighton & Hove.'
      },
      {
        question: 'How quickly can you collect in Brighton?',
        answer: 'Our South East team routinely collects within 24 to 48 hours following confirmation.'
      },
      {
        question: 'Can you collect from digital agencies and tech startups in Brighton?',
        answer: 'Yes. We service digital studios, creative hubs, universities, and corporate offices.'
      },
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We adhere to ADISA Standard 8.0 and NIST 800-88 Purge standards, providing serialised erasure logs.'
      },
      {
        question: 'What documentation is provided for audit compliance?',
        answer: 'You will receive an Environment Agency Waste Transfer Note, Certificate of Destruction, and Carbon Offset Certificate.'
      },
      {
        question: 'What happens to decommissioned laptops and Macs?',
        answer: 'Working devices are refurbished and remarketed with revenue return; obsolete units are recycled with zero landfill.'
      },
      {
        question: 'Can you collect monitors, printers, and accessories?',
        answer: 'Yes. Office screens and peripherals are accepted alongside qualifying PC and laptop batches.'
      },
      {
        question: 'Do you cover Worthing, Lewes, and Sussex?',
        answer: 'Yes. We service all commercial zones across East and West Sussex.'
      }
    ]
  },
  {
    slug: 'stafford',
    name: 'Stafford',
    region: 'West Midlands',
    countyOrArea: 'Staffordshire & West Midlands',
    tagline: 'Free IT recycling near me in Stafford & Staffordshire',
    heroDescription: 'From our primary TechSteps Midlands Hub in Stafford. Fast, certified IT collection, server de-installation, and WEEE disposal across Stafford, Stoke-on-Trent, and Staffordshire. Free for 10+ devices.',
    rating: '5.0',
    reviewCount: 30,
    featuredTestimonial: {
      author: 'Robert Taylor',
      company: 'Staffordshire Industrial Group',
      role: 'Head of IT Services',
      timeAgo: '2 weeks ago',
      text: 'Collected 80 desktop computers and 4 server racks from our Stafford business park facility. Rapid turnaround from our local hub and outstanding data compliance paperwork.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Stafford Town Centre', 'Stafford Technology Park', 'Tollgate Park', 'Stoke-on-Trent',
      'Cannock', 'Stone', 'Rugeley', 'Lichfield', 'Burton upon Trent', 'Newcastle-under-Lyme', 'Uttoxeter'
    ],
    localHubAddress: 'TechSteps Midlands Hub, Stafford Commercial Centre, ST16 3AQ',
    phone: '0800 083 4700',
    leadTime: 'Same-day / 24 hours',
    faqs: [
      {
        question: 'Can I get same-day IT collection in Stafford?',
        answer: 'Yes. With our primary Midlands Depot located in Stafford, same-day and next-day collections are frequently available throughout Staffordshire.'
      },
      {
        question: 'Is collection free for Stafford businesses?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for 100% free collection.'
      },
      {
        question: 'What data destruction certifications do you issue from the Stafford hub?',
        answer: 'We issue ADISA accredited Certificates of Destruction, Blancco Erasure Logs with drive serial numbers, and Environment Agency Waste Transfer Notes.'
      },
      {
        question: 'Do you service Stoke-on-Trent, Cannock, and Lichfield?',
        answer: 'Yes. Our Stafford fleet services all commercial zones across Staffordshire.'
      },
      {
        question: 'Can you de-rack servers in Staffordshire data centres?',
        answer: 'Yes. Our engineers handle cable disconnection, de-racking, rail removal, and palletised transit.'
      },
      {
        question: 'What is your policy on landfill waste?',
        answer: 'TechSteps enforces a 100% zero-landfill policy. Everything collected is refurbished or recycled into constituent materials.'
      },
      {
        question: 'Can you collect monitors, copiers, and network cables?',
        answer: 'Yes. All workplace IT peripherals can be consolidated alongside your main computer hardware.'
      },
      {
        question: 'Are your collection drivers security cleared?',
        answer: 'Yes. All drivers are BS 7858 vetted and operate GPS-tracked, lockable fleet vehicles.'
      }
    ]
  },
  {
    slug: 'hainault',
    name: 'Hainault',
    region: 'Greater London',
    countyOrArea: 'Essex & East London Gateway',
    tagline: 'Free IT recycling near me in Hainault & East London',
    heroDescription: 'From our dedicated TechSteps London Hub in Hainault. Fast, certified IT collection, server decommissioning, and zero-landfill recycling across East London and Essex. Free for 10+ devices.',
    rating: '5.0',
    reviewCount: 39,
    featuredTestimonial: {
      author: 'George Mason',
      company: 'East London Tech Hub',
      role: 'Operations Lead',
      timeAgo: '1 week ago',
      text: 'Direct collection from our local Hainault hub. 60 laptops and 25 desktops collected within 24 hours. Superb local service and immediate compliance certificates.',
      stars: 5,
    },
    boroughsOrDistricts: [
      'Hainault Business Park', 'Ilford', 'Romford', 'Barkingside', 'Chigwell',
      'Loughton', 'Epping', 'Brentwood', 'Dagenham', 'Stratford', 'Redbridge', 'Woodford'
    ],
    localHubAddress: 'TechSteps London Hub, Unit B, Roebuck Road, Hainault Business Park, Essex IG6 3UF',
    phone: '0800 083 4700',
    leadTime: 'Same-day / 24 hours',
    faqs: [
      {
        question: 'Can I get same-day collection in Hainault and East London?',
        answer: 'Yes. With our dedicated operational hub on Roebuck Road in Hainault, same-day and next-day pickups are available throughout East London and West Essex.'
      },
      {
        question: 'Is IT equipment collection free in Hainault?',
        answer: 'Yes. Collections of 10 or more laptops, PCs, or server chassis qualify for 100% free collection.'
      },
      {
        question: 'Can I drop off equipment directly at the Hainault hub?',
        answer: 'Yes. Pre-booked client drop-offs are welcomed at our Roebuck Road facility with advance notice.'
      },
      {
        question: 'What data destruction standards do you follow at Hainault?',
        answer: 'We provide certified Blancco wiping to NIST 800-88 standards or physical shear shredding with itemised certificates.'
      },
      {
        question: 'Do you cover Ilford, Romford, and Stratford?',
        answer: 'Yes. Our vehicles cover all of East London, Essex, and surrounding boroughs daily.'
      },
      {
        question: 'What happens to retired enterprise equipment?',
        answer: 'Viable hardware is refurbished and remarketed; damaged units enter certified zero-landfill recycling.'
      },
      {
        question: 'Can you collect monitors, printers, and loose cables?',
        answer: 'Yes. All workplace IT peripherals can be consolidated alongside your main computer hardware.'
      },
      {
        question: 'Are your collection drivers security cleared?',
        answer: 'Yes. All drivers are BS 7858 vetted and operate GPS-tracked, lockable fleet vehicles.'
      }
    ]
  }
];

export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locationsList.find((loc) => loc.slug === slug.toLowerCase().trim());
};
