export interface EquipmentTypeItem {
  category: string;
  description: string;
  items: string[];
}

export interface CollectionProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface SecurityPoint {
  title: string;
  description: string;
}

export interface CircularOption {
  title: string;
  tag: string;
  description: string;
}

export interface CollectionFaq {
  question: string;
  answer: string;
}

export interface RelatedCollectionService {
  title: string;
  slug: string;
  href: string;
  description: string;
  badge: string;
}

export interface CollectionServiceData {
  slug: string;
  route: string;
  navTitle: string;
  title: string;
  h1: string;
  valueProposition: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroBadge: string;
  equipmentTypesHeading: string;
  equipmentTypesIntro: string;
  typesCollected: EquipmentTypeItem[];
  processIntro: string;
  processSteps: CollectionProcessStep[];
  securityHeading: string;
  securityIntro: string;
  securityPoints: SecurityPoint[];
  circularHeading: string;
  circularIntro: string;
  circularOptions: CircularOption[];
  faqs: CollectionFaq[];
  relatedServicesHeading: string;
  relatedServicesIntro: string;
  relatedSlugs: string[];
}

export const collectionServices: Record<string, CollectionServiceData> = {
  'av-media-equipment-collection': {
    slug: 'av-media-equipment-collection',
    route: '/av-media-equipment-collection',
    navTitle: 'AV & Media Equipment Collection',
    title: 'AV & Media Equipment Collection',
    h1: 'Commercial AV & Media Equipment Collection Services',
    valueProposition:
      'Scheduled nationwide collection for redundant conference room displays, video conferencing bars, corporate projectors, public address systems, and media production hardware with end-to-end audit tracking.',
    metaTitle: 'AV & Media Equipment Collection UK | Commercial Audio-Visual Disposal | TechSteps',
    metaDescription:
      'Professional nationwide collection for redundant commercial audio-visual and media hardware. Secure transit, asset tracking, and compliant WEEE recycling.',
    heroImage: '/images/collection/av-media-collection-hero.jpg',
    heroImageAlt: 'TechSteps commercial AV and media equipment prepared in protective flight cases for secure collection',
    heroBadge: 'Commercial AV & Media Hardware',
    equipmentTypesHeading: 'Audio-Visual & Media Hardware We Collect',
    equipmentTypesIntro:
      'We collect a broad spectrum of commercial, institutional, and broadcast audio-visual assets from corporate offices, educational auditoriums, and media facilities.',
    typesCollected: [
      {
        category: 'Meeting & Conference Room Systems',
        description: 'Collaborative workplace and unified communications technology.',
        items: [
          'Video conferencing bars & PTZ cameras',
          'Interactive touchscreens & digital whiteboards',
          'Tabletop microphones, speakers & conferencing pods',
          'Control interfaces, touch panels & room scheduling screens',
        ],
      },
      {
        category: 'Display & Projection Equipment',
        description: 'Large-format and presentation display hardware.',
        items: [
          'Commercial monitors & ultra-wide presentation displays',
          'Digital signage panels & video wall modules',
          'Installation and portable digital projectors',
          'Motorised screens, mounting hardware & distribution matrices',
        ],
      },
      {
        category: 'Audio, Amplification & Studio Infrastructure',
        description: 'Sound reinforcement, broadcast, and production gear.',
        items: [
          'Rackmount audio amplifiers, mixers & DSP processors',
          'Ceiling, wall-mounted & stage loudspeaker arrays',
          'Wireless microphone receivers, antennas & transmitters',
          'Broadcast switchers, encoders, decoders & media servers',
        ],
      },
      {
        category: 'AV Cabling & Distribution Peripherals',
        description: 'Supporting infrastructure and interconnect technology.',
        items: [
          'HDMI, HDBaseT & SDI signal extenders and splitters',
          'Patch panels, AV distribution amplifiers & baluns',
          'Bulk audio-visual cabling looms and snake cables',
          'Heavy-duty floor boxes, pop-up modules & power units',
        ],
      },
    ],
    processIntro:
      'Our structured collection workflow ensures your redundant AV inventory is accurately logged, protected during transit, and processed with documented chain of custody.',
    processSteps: [
      {
        step: '01',
        title: 'Estate Assessment & Booking',
        description:
          'Submit your AV equipment schedule including approximate quantities, unit weights, and site access constraints. We arrange a scheduled collection window tailored to your building requirements.',
      },
      {
        step: '02',
        title: 'Secure On-Site Collection',
        description:
          'Our vetted logistics personnel arrive with specialised protective transit cases, foam-padded rolling bins, and anti-static materials to safely load all hardware from meeting rooms or tech stores.',
      },
      {
        step: '03',
        title: 'Documented Handover & Transit',
        description:
          'A Duty of Care waste transfer manifest is generated and counter-signed before departure. Assets are transported directly in tracked commercial vehicles to our processing facility.',
      },
      {
        step: '04',
        title: 'Intake Auditing & Sanitisation',
        description:
          'Hardware is unboxed, barcoded, and checked for embedded storage media, network configurations, or cached credentials on conferencing endpoints, followed by data wiping or degaussing.',
      },
      {
        step: '05',
        title: 'Recovery & Audit Certification',
        description:
          'Working units are routed for technical testing and reuse preparation, while unserviceable gear undergoes ethical WEEE material segregation. Complete inventory reports are issued to your portal.',
      },
    ],
    securityHeading: 'Data Security & On-Site Handling Protocols',
    securityIntro:
      'Modern commercial AV systems contain onboard memory, network credentials, call logs, and digital certificates that present institutional security risks if left unchecked.',
    securityPoints: [
      {
        title: 'Embedded Storage Media Sanitisation',
        description:
          'Video conferencing codecs, digital signage players, and smart displays often retain sensitive meeting recordings, cache files, and enterprise Wi-Fi profiles. All internal solid-state and flash storage is systematically wiped or physically destroyed.',
      },
      {
        title: 'Heavy & Fragile Asset Handling',
        description:
          'Large format interactive displays and commercial laser projectors require specialist de-installation handling. Our team utilises cushioned flight cases and screen-protection clamps to prevent glass fractures during de-racking and transport.',
      },
      {
        title: 'Full Chain-of-Custody Manifests',
        description:
          'Every batch is accompanied by serialised collection notes recording brand, model, and serial identification numbers, ensuring full traceability from your meeting rooms through to final disposition.',
      },
    ],
    circularHeading: 'Reuse, Refurbishment & Responsible WEEE Pathways',
    circularIntro:
      'TechSteps applies the waste hierarchy to maximise the economic and environmental lifespan of enterprise audio-visual technology.',
    circularOptions: [
      {
        title: 'Commercial Refurbishment & Secondary Life',
        tag: 'Circular Economy Priority',
        description:
          'Functional conference hardware, microphones, and professional projectors undergo diagnostic testing, cleaning, and firmware refreshes to enable sustainable re-deployment or circular resale.',
      },
      {
        title: 'Component & Module Harvesting',
        tag: 'Resource Conservation',
        description:
          'Where entire displays or codecs are uneconomic to repair, serviceable power supplies, optical engines, interface boards, and mounting components are salvaged to repair existing fleet equipment.',
      },
      {
        title: 'Compliant WEEE Materials Recovery',
        tag: 'Zero Landfill Alignment',
        description:
          'Damaged screens, copper cabling, aluminum enclosures, and chassis plastics are sorted into separated recycling streams through licensed UK treatment partners in accordance with environmental regulations.',
      },
    ],
    faqs: [
      {
        question: 'Do meeting room displays and codecs need to be de-mounted before collection?',
        answer:
          'We can collect equipment that is already unmounted and staged in your tech stores, or our team can perform scheduled de-installation from wall brackets and ceiling mounts upon prior arrangement.',
      },
      {
        question: 'How do you handle stored data on modern video conferencing bars?',
        answer:
          'Many unified communications devices store network logs, active directory links, and meeting history. During our secure intake audit, all microcontrollers and flash drives are factory-reset, sanitised, or physically removed where required.',
      },
      {
        question: 'Can you collect heavy conference room displays above 85 inches?',
        answer:
          'Yes. We operate specialised vehicle tail-lifts and padded screen transit flight cases designed specifically to transport large-format commercial panels up to 98 inches and modular video walls safely.',
      },
      {
        question: 'What documentation will our organisation receive after collection?',
        answer:
          'You will receive a formal Duty of Care Waste Transfer Note upon collection, followed by an itemised audit report detailing serial numbers, asset conditions, and certificates of recycling or data sanitisation.',
      },
    ],
    relatedServicesHeading: 'Explore Related Collection Disciplines',
    relatedServicesIntro:
      'Combine audio-visual hardware collections with our complementary IT asset retirement services.',
    relatedSlugs: [
      'computer-collection',
      'monitor-screen-collection',
      'server-collection',
    ],
  },

  'computer-collection': {
    slug: 'computer-collection',
    route: '/computer-collection',
    navTitle: 'Computer Collection',
    title: 'Computer Collection',
    h1: 'Enterprise Computer & Workstation Collection Services',
    valueProposition:
      'Reliable UK-wide collection for redundant desktop PCs, enterprise workstations, micro-towers, and corporate computer fleets with certified chain of custody and rigorous data protection.',
    metaTitle: 'Computer Collection Services UK | Desktop PC & Workstation Disposal | TechSteps',
    metaDescription:
      'Secure nationwide collection for redundant business desktop PCs, computer towers, and workstations. Fully auditable chain of custody, data wiping, and compliant recycling.',
    heroImage: '/images/collection/computer-collection-hero.jpg',
    heroImageAlt: 'TechSteps desktop computer towers and workstations organised on secure logistics carts for collection',
    heroBadge: 'Desktop PCs & Workstations',
    equipmentTypesHeading: 'Desktop Computers & Workstations We Collect',
    equipmentTypesIntro:
      'From corporate office rollouts to high-performance graphic rendering workstations, we collect all desktop form factors regardless of manufacturer or specification.',
    typesCollected: [
      {
        category: 'Corporate Desktop Towers & PCs',
        description: 'Standard business workstation fleets and office towers.',
        items: [
          'Full-tower, mid-tower & mini-tower desktop PCs',
          'Small Form Factor (SFF) & ultra-small business desktops',
          'Micro-PCs, mini desktop boxes & modular computing units',
          'Point-of-sale (POS) terminals & retail computer units',
        ],
      },
      {
        category: 'All-in-One (AIO) Systems',
        description: 'Integrated desktop systems with built-in displays.',
        items: [
          'Commercial All-in-One Windows workstations',
          'Apple iMacs, Mac Minis & Mac Studio desktops',
          'Medical cart PCs & clinical touch terminals',
          'Public kiosk computers & reception check-in systems',
        ],
      },
      {
        category: 'Precision & CAD Workstations',
        description: 'High-performance computing and enterprise engineering rigs.',
        items: [
          'Multi-GPU graphics, animation & CAD workstations',
          'Financial trading desk multi-display computers',
          'Data modelling workstations & laboratory analysis PCs',
          'Dual-socket Xeon & AMD Threadripper workstation towers',
        ],
      },
      {
        category: 'Peripherals & Ancillary Desktop Gear',
        description: 'Associated computing accessories and desktop hardware.',
        items: [
          'Keyboards, mice, desktop barcode scanners & trackpads',
          'Uninterruptible power supplies (UPS desktop units)',
          'Docking stations, port replicators & external enclosures',
          'Power bricks, kettle cables, internal components & RAM',
        ],
      },
    ],
    processIntro:
      'Our established collection protocol provides seamless operational clearance from offices, IT rooms, and regional depots across the UK.',
    processSteps: [
      {
        step: '01',
        title: 'Inventory Review & Logistics Planning',
        description:
          'Share your asset count, location details, and security requirements. We allocate appropriate vehicle capacity, loading equipment, and time slots matching your facility schedule.',
      },
      {
        step: '02',
        title: 'Security-Vetted Collection Crew',
        description:
          'Trained logistics specialists arrive on site to securely load your desktop hardware into lockable roll cages and anti-static transport containers with minimal disruption to your workforce.',
      },
      {
        step: '03',
        title: 'Sealed Chain of Custody Transit',
        description:
          'Roll cages and containers are numbered and secured with tamper-evident seals. Vehicles are tracked via GPS throughout transit directly to our secure processing centre.',
      },
      {
        step: '04',
        title: 'Hardware Audit & Drive Sanitisation',
        description:
          'Assets are checked against collection manifests. Hard drives and NVMe drives are extracted for certified data erasure or high-grade physical destruction based on your security tier.',
      },
      {
        step: '05',
        title: 'Asset Reporting & Manifest Handover',
        description:
          'You receive fully itemised audit manifests showing serial numbers, asset tags, hardware specifications, data sanitisation logs, and Environment Agency waste documentation.',
      },
    ],
    securityHeading: 'Data Protection & Drive Sanitisation Governance',
    securityIntro:
      'Desktop computers house sensitive corporate spreadsheets, databases, and client personal records. We enforce comprehensive data sanitisation protocols.',
    securityPoints: [
      {
        title: 'Certified Data Destruction Pathways',
        description:
          'All mechanical HDDs, solid-state drives (SSDs), and NVMe modules undergo multipass overwriting compliant with international standards, or physical degaussing and hydraulic crushing for failed or end-of-life media.',
      },
      {
        title: 'Asset Tag & Corporate Identification Removal',
        description:
          'Prior to any onward reuse or remarketing processing, all external corporate asset tags, company stickers, barcodes, and serial markings are cleanly removed to safeguard institutional anonymity.',
      },
      {
        title: 'Audit Trail for Compliance & Auditing',
        description:
          'Serialized audit trails ensure your compliance and IT governance teams can satisfy GDPR, ISO 27001, and Cyber Essentials verification requirements without administrative friction.',
      },
    ],
    circularHeading: 'Refurbishment Pathways & Circular Economy Recovery',
    circularIntro:
      'We champion extending the operational life of computing equipment before considering raw material recycling.',
    circularOptions: [
      {
        title: 'Hardware Testing & Life Extension',
        tag: 'Highest Value Pathway',
        description:
          'Modern business computers undergo diagnostic burn-in testing, thermal cleaning, and component upgrades to prepare them for secondary commercial deployment or corporate donation programmes.',
      },
      {
        title: 'Component Harvesting & Spares',
        tag: 'Resource Efficiency',
        description:
          'Processors, RAM modules, graphics cards, power supplies, and chassis fans are recovered from damaged units to maintain and repair functional desktop inventory.',
      },
      {
        title: 'WEEE Treatment & Precious Metal Recovery',
        tag: 'Certified Environmental Disposal',
        description:
          'Obsolete motherboards, circuitry, power units, and steel chassis are broken down into clean material fractions for domestic UK smelters and refiners under regulated environmental permits.',
      },
    ],
    faqs: [
      {
        question: 'Do we need to remove the hard drives before you collect our desktop PCs?',
        answer:
          'No. Our team can collect computers with drives intact. We barcode and track every hard drive on arrival and perform certified sanitisation or destruction. Alternatively, we can collect loose drives if you prefer to de-mount them beforehand.',
      },
      {
        question: 'Is there a minimum number of computers required for a collection?',
        answer:
          'We cater to both consolidated multi-site collections involving hundreds of workstations and smaller regional office collections. Contact our logistics team to confirm the most efficient logistics arrangement.',
      },
      {
        question: 'Can you provide lockable roll cages in advance of the collection date?',
        answer:
          'Yes. We can deliver secure, sealable wheeled cages to your premises ahead of your scheduled collection date so your internal IT team can stage computers conveniently.',
      },
      {
        question: 'Are cables, keyboards, and mice accepted alongside PC towers?',
        answer:
          'Yes. We accept all peripheral desktop accessories, mice, keyboards, docking stations, and power leads as part of the unified collection batch.',
      },
    ],
    relatedServicesHeading: 'Related Hardware Collection Services',
    relatedServicesIntro:
      'Complement your desktop collection with our dedicated laptop, screen, and server disposal disciplines.',
    relatedSlugs: [
      'laptop-collection',
      'monitor-screen-collection',
      'server-collection',
    ],
  },

  'laptop-collection': {
    slug: 'laptop-collection',
    route: '/laptop-collection',
    navTitle: 'Laptop Collection',
    title: 'Laptop Collection',
    h1: 'Corporate Laptop & Notebook Collection Services',
    valueProposition:
      'Security-cleared nationwide collection for redundant business laptops, ultrabooks, MacBooks, and mobile workstations, featuring protected transit, battery compliance, and sanitisation.',
    metaTitle: 'Laptop Collection Services UK | Corporate Notebook Disposal | TechSteps',
    metaDescription:
      'Secure UK collection for corporate laptops, MacBooks, and mobile workstations. Vetted logistics, lithium battery compliance, certified data erasure, and circular reuse.',
    heroImage: '/images/collection/laptop-collection-hero.jpg',
    heroImageAlt: 'TechSteps business laptops neatly arranged in foam-padded flight cases for secure corporate collection',
    heroBadge: 'Business Laptops & Ultrabooks',
    equipmentTypesHeading: 'Corporate Laptops & Mobile Workstations We Collect',
    equipmentTypesIntro:
      'We handle large-scale workplace laptop refreshes, remote worker device returns, and mixed mobile computing inventories across public and private sector organisations.',
    typesCollected: [
      {
        category: 'Enterprise Business Laptops',
        description: 'Standard corporate fleet devices from tier-one manufacturers.',
        items: [
          'Dell Latitude & XPS business laptops',
          'Lenovo ThinkPad & ThinkBook corporate systems',
          'HP EliteBook & ProBook enterprise notebooks',
          'Microsoft Surface Pro, Surface Laptop & Book series',
        ],
      },
      {
        category: 'Apple MacBooks & Workstations',
        description: 'Apple silicon and Intel-based macOS laptops.',
        items: [
          'Apple MacBook Air (M1, M2, M3 & Intel architectures)',
          'Apple MacBook Pro 13, 14 & 16-inch models',
          'T2-chip and Apple Silicon MDM-managed devices',
          'Legacy unibody MacBooks and corporate loaners',
        ],
      },
      {
        category: 'Mobile Workstations & Rugged Units',
        description: 'Demanding engineering, field, and clinical portable computers.',
        items: [
          'Precision CAD mobile workstations (Dell Precision, HP ZBook)',
          'Rugged field laptops (Panasonic Toughbook, Getac)',
          'Clinical and medical cart mobile computing units',
          'High-performance developer and analytical notebooks',
        ],
      },
      {
        category: 'Laptop Docks, Chargers & Mobile Peripherals',
        description: 'Charging and desktop interface hardware.',
        items: [
          'Thunderbolt & USB-C enterprise docking stations',
          'OEM original power supplies, chargers & AC adapters',
          'Privacy filters, laptop risers & peripheral hubs',
          'Padded laptop carry bags, sleeves & security cables',
        ],
      },
    ],
    processIntro:
      'Designed to streamline corporate refresh cycles while preserving continuous regulatory governance over every device.',
    processSteps: [
      {
        step: '01',
        title: 'Batch Scoping & Schedule Booking',
        description:
          'Specify your approximate device counts, operating systems, and building access criteria. We confirm dedicated collection slots and assign appropriately equipped collection transport.',
      },
      {
        step: '02',
        title: 'Specialised Padded Packing On-Site',
        description:
          'Our personnel pack laptops into multi-compartment foam-lined flight cases and cushioned tote boxes, preventing screen cracks, chassis bending, and battery impact damage.',
      },
      {
        step: '03',
        title: 'Tamper-Evident Transport Logistics',
        description:
          'Sealed transit boxes are loaded into tracked vehicles. Every consignment travels under signed Duty of Care transfer notes directly to our processing and sanitisation hub.',
      },
      {
        step: '04',
        title: 'Barcode Intake & Drive Erasure',
        description:
          'Each laptop is scanned into our tracking system. Solid-state drives and soldered flash modules undergo automated multipass data sanitisation with cryptographic verification.',
      },
      {
        step: '05',
        title: 'Detailed Certification & Reporting',
        description:
          'You receive complete audit documentation including serial numbers, asset tags, device health diagnostics, and individual data destruction certificates for your internal audit.',
      },
    ],
    securityHeading: 'Data Confidentiality & Lithium Battery Safety Protocols',
    securityIntro:
      'Laptops present unique risks: they carry confidential local data and contain high-capacity lithium-ion batteries that require strict regulatory transport compliance.',
    securityPoints: [
      {
        title: 'Cryptographic & Firmware Erasure',
        description:
          'Modern laptops utilise integrated NVMe drives and motherboard-soldered storage. We execute certified firmware-level erasure protocols compliant with NIST 800-88 standards to eradicate all residual company data.',
      },
      {
        title: 'Lithium-Ion Battery Safety Handling',
        description:
          'Damaged, swollen, or defective batteries represent fire hazards. Our staff visually inspect every device on collection and isolate compromised cells in specialised fire-retardant safety containers in accordance with ADR transport guidance.',
      },
      {
        title: 'MDM & Bios Lock Verification',
        description:
          'We inspect Apple DEP/MDM profiles, Intune registrations, and BIOS supervisor passwords, ensuring assets are clean and fully dereferenced from corporate tenant environments.',
      },
    ],
    circularHeading: 'Refurbishment, Reuse & Closed-Loop Recycling',
    circularIntro:
      'Maximising laptop reuse creates the highest environmental and economic dividend for enterprise sustainability programmes.',
    circularOptions: [
      {
        title: 'Testing, Grading & Secondary Deployment',
        tag: 'Highest Environmental Value',
        description:
          'Viable laptops undergo component diagnostics, screen inspection, battery health assessment, and deep cosmetic cleaning to prepare them for enterprise redeployment, resale, or community giving.',
      },
      {
        title: 'Spare Parts Harvesting',
        tag: 'Waste Prevention',
        description:
          'Working keyboards, trackpads, LCD panels, and internal batteries are harvested from units with motherboard failures to extend the life of other enterprise fleet machines.',
      },
      {
        title: 'Certified WEEE Materials Separation',
        tag: 'Zero Landfill Commitment',
        description:
          'Heavily damaged or obsolete laptops are stripped down into clean fractions: lithium batteries, aluminium casings, copper heatpipes, and circuit boards for licensed UK refining.',
      },
    ],
    faqs: [
      {
        question: 'Can you collect laptops from remote employees or only centralized offices?',
        answer:
          'We specialise in bulk collections from regional office hubs and IT consolidation depots. For distributed remote teams, we can coordinate scheduled consolidated batch pickups through your central locations.',
      },
      {
        question: 'What happens to laptops with BIOS passwords or BitLocker encryption?',
        answer:
          'Our certified erasure tools interface directly at hardware level to purge drive sectors regardless of BitLocker status. We appreciate receiving master BIOS passwords when available, but can reset or replace affected motherboards where needed.',
      },
      {
        question: 'Do we need to supply original boxes or packing materials?',
        answer:
          'No. Our logistics crews arrive fully equipped with protective foam-lined flight cases, anti-static packing sleeves, and secure wheeled containers, eliminating packing burden for your staff.',
      },
      {
        question: 'How do you handle MacBooks enrolled in Apple Business Manager (ABM)?',
        answer:
          'We recommend releasing serial numbers from your ABM portal prior to or during collection. We can verify device activation status during intake audit and advise your administration team accordingly.',
      },
    ],
    relatedServicesHeading: 'Complementary Collection Disciplines',
    relatedServicesIntro:
      'Bundle your laptop refresh with our comprehensive computer, mobile device, and monitor recycling services.',
    relatedSlugs: [
      'computer-collection',
      'mobile-device-collection',
      'monitor-screen-collection',
    ],
  },

  'mobile-device-collection': {
    slug: 'mobile-device-collection',
    route: '/mobile-device-collection',
    navTitle: 'Mobile Device Collection',
    title: 'Mobile Device Collection',
    h1: 'Enterprise Mobile Device & Tablet Collection Services',
    valueProposition:
      'Secure UK collection for corporate smartphones, tablets, iPads, and handheld enterprise terminals with certified factory sanitisation, MDM de-registration, and ethical recycling.',
    metaTitle: 'Mobile Device Collection UK | Corporate Smartphone & Tablet Disposal | TechSteps',
    metaDescription:
      'Professional UK collection for business smartphones, tablets, iPads, and mobile terminals. Secure handling, certified erasure, MDM verification, and WEEE compliance.',
    heroImage: '/images/collection/mobile-device-collection-hero.jpg',
    heroImageAlt: 'TechSteps enterprise smartphones, iPads and handheld terminals organised in protective flight cases for collection',
    heroBadge: 'Smartphones, Tablets & Terminals',
    equipmentTypesHeading: 'Enterprise Mobile Technology We Collect',
    equipmentTypesIntro:
      'We collect mixed mobile fleets, frontline operational handhelds, and executive smartphone inventories from enterprises, logistics hubs, and healthcare organisations.',
    typesCollected: [
      {
        category: 'Corporate Smartphones',
        description: 'Standard business communication and staff mobile phones.',
        items: [
          'Apple iPhone corporate fleets (all generations)',
          'Samsung Galaxy Enterprise Edition smartphones',
          'Google Pixel business handsets',
          'Rugged industrial smartphones & field communication units',
        ],
      },
      {
        category: 'Enterprise Tablets & iPads',
        description: 'Touchscreen computing devices for field and office use.',
        items: [
          'Apple iPad, iPad Air, iPad Mini & iPad Pro tablets',
          'Samsung Galaxy Tab commercial & rugged active devices',
          'Microsoft Surface Go & enterprise touch tablets',
          'Point-of-sale customer service display tablets',
        ],
      },
      {
        category: 'Warehousing & Handheld Terminals',
        description: 'Barcoding, logistics, and data capture mobile terminals.',
        items: [
          'Zebra, Honeywell & Datalogic barcode scanners',
          'Rugged mobile computers & inventory terminals',
          'RFID handheld readers & mobile label printers',
          'Vehicle-mounted mobile terminal computers',
        ],
      },
      {
        category: 'Mobile Accessories & Charging Stations',
        description: 'Supporting peripheral hardware and multi-unit docks.',
        items: [
          'Multi-bay charging cradles & terminal docking banks',
          'OEM charging blocks, USB-C/Lightning cables & adapters',
          'Heavy-duty protective cases, styluses & holster straps',
          'Spare lithium-ion mobile battery packs & power banks',
        ],
      },
    ],
    processIntro:
      'Our mobile collection workflow guarantees every handset is tracked, verified, and processed with strict regulatory oversight.',
    processSteps: [
      {
        step: '01',
        title: 'Device Quantities & Scope Review',
        description:
          'Inform us of your estimated device count, brands, and current MDM status. We establish a prompt, secure collection itinerary suited to your facilities.',
      },
      {
        step: '02',
        title: 'Foam-Padded On-Site Packing',
        description:
          'Our personnel pack devices into purpose-built, foam-lined flight cases with individual slots, preventing scratch damage and protecting sensitive touchscreens during handling.',
      },
      {
        step: '03',
        title: 'Secure Tracked Transit',
        description:
          'Cases are closed with serialized security ties and transported directly to our secure facility in GPS-tracked vehicles under signed transfer documentation.',
      },
      {
        step: '04',
        title: 'Diagnostic Intake & Data Erasure',
        description:
          'IMEI and serial numbers are scanned. Every device undergoes automated diagnostic testing and cryptographic sanitisation using certified mobile erasure systems.',
      },
      {
        step: '05',
        title: 'Comprehensive Audit Reporting',
        description:
          'You receive itemised manifests showing make, model, IMEI, serial number, cosmetic grade, and data sanitisation confirmation for every collected device.',
      },
    ],
    securityHeading: 'Data Protection, IMEI Auditing & MDM Protocols',
    securityIntro:
      'Mobile devices house enterprise email, multi-factor authentication tokens, VPN credentials, and confidential contacts requiring rigorous clearance.',
    securityPoints: [
      {
        title: 'Certified Mobile Factory Purge',
        description:
          'We use specialized mobile erasure systems to execute factory firmware resets and cryptographic data purging that permanently overwrite all internal NAND memory partitions.',
      },
      {
        title: 'MDM, iCloud & Knox Deregistration Check',
        description:
          'Each device is verified for active Apple ID/iCloud Activation Locks, Samsung Knox restrictions, or Google Factory Reset Protection (FRP) to ensure total decoupling from corporate infrastructure.',
      },
      {
        title: 'SIM & SD Card Extraction and Shredding',
        description:
          'During intake, all SIM cards, micro-SD storage cards, and eSIM profiles are identified, physically removed, and securely cross-cut destroyed to prevent cellular or data leakage.',
      },
    ],
    circularHeading: 'Circular Life Extension & Ethical Material Recovery',
    circularIntro:
      'Mobile devices represent rich concentrations of precious materials that should be reused or cleanly recovered.',
    circularOptions: [
      {
        title: 'Refurbishment & Resale Ecosystems',
        tag: 'Circular Economy Choice',
        description:
          'Functional smartphones and tablets undergo battery capacity testing, screen polishing, and firmware refreshes, preparing them for circular secondary commercial use.',
      },
      {
        title: 'Screen & Component Harvesting',
        tag: 'Part Reclaiming',
        description:
          'Cracked or liquid-damaged devices provide viable cameras, logic boards, microphone modules, and casing parts to maintain other working corporate devices.',
      },
      {
        title: 'Refining of Battery & Rare-Earth Metals',
        tag: 'WEEE Treatment',
        description:
          'Non-repairable units are processed through certified UK electronics refiners to extract gold, silver, palladium, cobalt, and lithium with zero landfill impact.',
      },
    ],
    faqs: [
      {
        question: 'Do we need to remove screen locks and PINs before you collect our phones?',
        answer:
          'While removing passcodes and MDM accounts accelerates processing, our automated diagnostic software can perform hard firmware wipes on most commercial devices. We can advise on procedures for locked Apple devices.',
      },
      {
        question: 'What happens if employee SIM cards are left inside the devices?',
        answer:
          'Our intake technicians manually eject every SIM tray and card slot. All discovered SIM and micro-SD cards are documented and destroyed in secure shredders, ensuring zero risk of phone number or data misuse.',
      },
      {
        question: 'Can you collect devices with swollen or cracked lithium batteries?',
        answer:
          'Yes, but please inform us beforehand. We bring specialized fire-retardant ADR safety containers to transport damaged or swollen batteries safely in compliance with UK transport regulations.',
      },
      {
        question: 'Do you provide certificate reports matching IMEI numbers?',
        answer:
          'Yes. Our final audit report itemises every device by its unique 15-digit IMEI number alongside serial and asset tag numbers, providing watertight proof for your compliance files.',
      },
    ],
    relatedServicesHeading: 'Related Hardware Collection Services',
    relatedServicesIntro:
      'Integrate mobile collections with our enterprise laptop and desktop computer disposal workflows.',
    relatedSlugs: [
      'laptop-collection',
      'computer-collection',
      'av-media-equipment-collection',
    ],
  },

  'monitor-screen-collection': {
    slug: 'monitor-screen-collection',
    route: '/monitor-screen-collection',
    navTitle: 'Monitor & Screen Collection',
    title: 'Monitor & Screen Collection',
    h1: 'Enterprise Monitor & Screen Collection Services',
    valueProposition:
      'Safe, compliant nationwide collection for commercial computer monitors, dual-display setups, ultrawide curved panels, and interactive screens with specialised protective handling.',
    metaTitle: 'Monitor & Screen Collection UK | Office Display Disposal | TechSteps',
    metaDescription:
      'Compliant UK collection for business computer monitors, curved screens, and commercial displays. Protective transit cages, WEEE compliance, and high recycling recovery.',
    heroImage: '/images/collection/monitor-screen-collection-hero.jpg',
    heroImageAlt: 'TechSteps commercial computer monitors and office screens secured in flight cases and rolling distribution cages',
    heroBadge: 'Monitors & Commercial Displays',
    equipmentTypesHeading: 'Display Technology & Screens We Collect',
    equipmentTypesIntro:
      'We collect the full spectrum of office computer monitors, curved workstations, touchscreens, and digital signage panels across the UK.',
    typesCollected: [
      {
        category: 'Standard Office Displays',
        description: 'Everyday corporate desktop monitors and dual-screen fleets.',
        items: [
          '21-inch to 27-inch business LED/LCD monitors',
          'Height-adjustable enterprise desktop displays (Dell, HP, Lenovo)',
          'Bezel-less dual-monitor workplace configurations',
          'Standard 1080p and 1440p productivity panels',
        ],
      },
      {
        category: 'Professional & Ultra-Wide Screens',
        description: 'Large-format and specialist creative workstation displays.',
        items: [
          '34-inch to 49-inch curved ultrawide panoramic monitors',
          'Colour-calibrated 4K and 5K creative graphic monitors',
          'High-refresh rate CAD and engineering displays',
          'Medical diagnostic review screens and clinical monitors',
        ],
      },
      {
        category: 'Interactive Touchscreens & Digital Displays',
        description: 'Commercial touch monitors and collaboration panels.',
        items: [
          'Interactive touchscreens and customer kiosk displays',
          'Commercial digital signage screens and advertising panels',
          'Industrial ruggedized touch monitors and panel PCs',
          'Point-of-sale checkout monitors and customer-facing displays',
        ],
      },
      {
        category: 'Monitor Arms, Stands & Cabling',
        description: 'Supporting ergonomics and mounting infrastructure.',
        items: [
          'Single, dual and quad monitor desk arms and gas-strut mounts',
          'Original OEM desktop monitor stands and baseplates',
          'DisplayPort, HDMI, USB-C and DVI connection leads',
          'External power supply bricks, IEC cables and adapters',
        ],
      },
    ],
    processIntro:
      'We remove the hazard and breakage risks associated with moving large quantities of fragile glass monitors from corporate premises.',
    processSteps: [
      {
        step: '01',
        title: 'Inventory Estimate & Booking',
        description:
          'Specify your monitor quantities, approximate screen sizes, and whether stands are detached. We schedule a convenient collection slot matching your building loading bay availability.',
      },
      {
        step: '02',
        title: 'Specialised Screen Protection On-Site',
        description:
          'Our personnel pack screens using slotted foam dividers, corrugated screen protectors, and dedicated padded roll cages to eliminate glass impact damage during clearance.',
      },
      {
        step: '03',
        title: 'Compliant Chain-of-Custody Transit',
        description:
          'Consignments are loaded onto tail-lift vehicles and secured with strapping. A formal Duty of Care waste transfer note is signed on site prior to dispatch.',
      },
      {
        step: '04',
        title: 'Testing, Grading & Sorting',
        description:
          'At our facility, monitors are unpacked, tested for panel health and dead pixels, and sorted into reuse candidates or certified material recycling streams.',
      },
      {
        step: '05',
        title: 'Reporting & Environmental Manifests',
        description:
          'You receive comprehensive audit manifests recording makes, models, screen dimensions, and recycling weight data for your corporate ESG reporting.',
      },
    ],
    securityHeading: 'Safe Handling & Hazardous Waste Compliance',
    securityIntro:
      'Flat panel displays require careful handling due to mercury backlights in older models, fragile glass substrates, and hazardous substance regulations.',
    securityPoints: [
      {
        title: 'Hazardous Waste Duty of Care Compliance',
        description:
          'Certain older display units (especially CCFL backlit screens) contain trace mercury and are classified as hazardous waste under UK regulations. We manage all consignment note documentation in full compliance with the Environment Agency.',
      },
      {
        title: 'Zero Pressure Screen Packaging',
        description:
          'Improperly stacked monitors crack easily. We use custom vertical slotting to ensure zero face-to-face pressure, preserving screen integrity for functional remarketing.',
      },
      {
        title: 'Complete Component Accounting',
        description:
          'We inventory power bricks, cables, and detachable stands alongside displays, ensuring no electronic peripherals are abandoned or improperly disposed of.',
      },
    ],
    circularHeading: 'Refurbishment Opportunities & Circular Material Recycling',
    circularIntro:
      'By protecting display panels from damage during collection, we achieve industry-leading reuse and recycling rates.',
    circularOptions: [
      {
        title: 'Panel Testing & Secondary Workspace Deployment',
        tag: 'Circular Economy Focus',
        description:
          'Working monitors with clean panels and strong backlights are cleaned, safety tested (PAT), and repackaged for secondary business use or charitable distribution.',
      },
      {
        title: 'Salvage of Power Boards & Stands',
        tag: 'Component Recovery',
        description:
          'Units with cracked panels are disassembled to salvage internal power supply boards, logic boards, and ergonomic metal stands to repair other fleet monitors.',
      },
      {
        title: 'Separation of Optical Films, Glass & Metals',
        tag: 'WEEE Treatment Standards',
        description:
          'Unsalvageable displays are mechanically dismantled. Liquid crystal panels, diffusion sheets, LED light bars, and steel chassis are cleanly separated for specialist UK smelting.',
      },
    ],
    faqs: [
      {
        question: 'Do we need to box the monitors before your team collects them?',
        answer:
          'No. TechSteps provides padded flight cases, foam slotted dividers, and protective roll cages. Our staff handle all packing and loading directly from your office floor or storage area.',
      },
      {
        question: 'Do we need to keep the original stands attached to the monitors?',
        answer:
          'You can leave stands attached, or detach them if your screens were mounted on monitor arms. We collect both attached units and loose stands, arms, and cabling.',
      },
      {
        question: 'Can you collect broken or cracked monitors alongside working units?',
        answer:
          'Yes. We collect all conditions of monitors. Broken or cracked units are isolated and routed directly for clean WEEE material recycling rather than testing.',
      },
      {
        question: 'Do you collect older CRT monitors or only modern flat panels?',
        answer:
          'We primarily handle modern LCD, LED, and OLED commercial displays, but we can also safely collect legacy CRT displays under hazardous waste consignment protocols upon prior notice.',
      },
    ],
    relatedServicesHeading: 'Related Hardware Collection Services',
    relatedServicesIntro:
      'Combine monitor collections with our comprehensive desktop, laptop, and server recycling programmes.',
    relatedSlugs: [
      'computer-collection',
      'laptop-collection',
      'av-media-equipment-collection',
    ],
  },

  'printer-copier-collection': {
    slug: 'printer-copier-collection',
    route: '/printer-copier-collection',
    navTitle: 'Printer & Copier Collection',
    title: 'Printer & Copier Collection',
    h1: 'Commercial Printer & Photocopier Collection Services',
    valueProposition:
      'Specialist nationwide collection for floor-standing multifunction copiers (MFPs), departmental laser printers, and plotter printers with hard drive sanitisation and heavy logistics handling.',
    metaTitle: 'Printer & Copier Collection UK | Office Photocopier Disposal | TechSteps',
    metaDescription:
      'Expert UK collection for commercial printers, copiers, and MFPs. Internal hard drive data erasure, toner removal, heavy logistics, and compliant WEEE recycling.',
    heroImage: '/images/collection/printer-copier-collection-hero.jpg',
    heroImageAlt: 'TechSteps commercial office copiers and multifunction printers strapped onto pallets for secure business collection',
    heroBadge: 'Office Printers & Photocopiers',
    equipmentTypesHeading: 'Printing & Copying Equipment We Collect',
    equipmentTypesIntro:
      'We manage the heavy logistics and specialized handling required for enterprise printing fleets, lease-return copiers, and commercial production printers.',
    typesCollected: [
      {
        category: 'Multifunction Photocopiers (MFPs)',
        description: 'Heavy floor-standing departmental copy and scan centres.',
        items: [
          'A3/A4 commercial color multifunction copiers',
          'Heavy-duty floor-standing office copy centres (Canon, Xerox, Ricoh, Konica Minolta)',
          'High-volume corporate departmental print stations',
          'Finishing units, booklet makers & high-capacity paper feeders',
        ],
      },
      {
        category: 'Desktop & Workgroup Laser Printers',
        description: 'Compact business and network printing hardware.',
        items: [
          'High-speed network mono laser printers (HP LaserJet, Brother, Kyocera)',
          'Colour workgroup desktop laser printers',
          'Thermal barcode and warehouse label printers',
          'Secure badge-release office desktop printers',
        ],
      },
      {
        category: 'Wide-Format & Production Plotters',
        description: 'Large-scale engineering and design printing machines.',
        items: [
          'Architectural CAD plotters & wide-format roll printers (HP DesignJet)',
          'Commercial graphics & photographic production printers',
          'Floor-standing blueprint scanners & folding machines',
          'Digital proofing and print-shop production equipment',
        ],
      },
      {
        category: 'Printing Consumables & Ancillaries',
        description: 'Associated toners, cartridges, and spare parts.',
        items: [
          'Unopened and used toner cartridges and waste toner boxes',
          'Drum units, fuser assemblies & transfer belts',
          'Print servers, network interfaces & coin-op payment pods',
          'Spare paper trays, sorting bins & pedestal cabinets',
        ],
      },
    ],
    processIntro:
      'Handling bulky, heavy printing machinery requires specialized stair-climbing gear, pallet strapping, and tail-lift logistics.',
    processSteps: [
      {
        step: '01',
        title: 'Machine Specifications & Access Review',
        description:
          'Provide details of your printer models, floor locations, and whether lift access or stairs are involved. We assign the appropriate heavy-handling crew and equipment.',
      },
      {
        step: '02',
        title: 'Safe Rigging & On-Site Preparation',
        description:
          'Our trained staff disconnect devices, secure print heads and scanner glass, remove loose paper trays, and strap floor-standing units onto heavy-duty wheeled dollies.',
      },
      {
        step: '03',
        title: 'Hydraulic Tail-Lift Transport',
        description:
          'Printers are moved via ramps or stair-climbers to our tail-lift commercial vehicles and strapped securely to avoid transit tipping, traveling under formal Duty of Care transfer notes.',
      },
      {
        step: '04',
        title: 'Internal Hard Drive Extraction & Wipe',
        description:
          'Modern MFPs store print, scan, and email jobs on internal hard disks. Our technicians systematically remove every drive for certified data sanitisation.',
      },
      {
        step: '05',
        title: 'Environmental Manifest & Audit Handover',
        description:
          'You receive documented proof confirming serial numbers, internal drive destruction certificates, and compliant WEEE recycling or refurbishment outcomes.',
      },
    ],
    securityHeading: 'Internal MFP Hard Drive Sanitisation & Toner Safety',
    securityIntro:
      'Enterprise copiers and MFPs represent overlooked cybersecurity vulnerabilities due to internal storage of confidential scanned documents.',
    securityPoints: [
      {
        title: 'Mandatory Hard Drive Removal & Erasure',
        description:
          'Enterprise copiers store cached copies of every scanned contract, invoice, and executive document on internal SATA drives. We extract every internal hard drive and execute certified multipass erasure or physical shredding.',
      },
      {
        title: 'Toner Spillage Prevention & Containment',
        description:
          'Residual chemical toner powder is a respiratory irritant and environmental pollutant. We seal all toner hoppers and waste toner containers prior to transit to prevent office contamination.',
      },
      {
        title: 'Lease Handover & End-of-Life Documentation',
        description:
          'If your printers are returning to a leasing company, we can de-install, sanitize internal drives, and prepare audit-ready documentation showing compliance with lease return specifications.',
      },
    ],
    circularHeading: 'Refurbishment Potential & WEEE Material Stewardship',
    circularIntro:
      'We focus on extending copier lifespan where viable, while ensuring environmentally sound disposal of end-of-life plastic and metal structures.',
    circularOptions: [
      {
        title: 'Refurbishment for Secondary Lease',
        tag: 'High-Value Resource Recovery',
        description:
          'Commercial copiers with low page counts undergo technical servicing, roller replacement, optical cleaning, and firmware updates for secondary enterprise deployment.',
      },
      {
        title: 'Component & Sub-Assembly Harvesting',
        tag: 'Modular Salvage',
        description:
          'Working fusers, laser units, power supplies, motors, and paper feed assemblies are reclaimed to maintain operating printer fleets.',
      },
      {
        title: 'Clean Material Fraction Separation',
        tag: 'WEEE Treatment',
        description:
          'Obsolete chassis are stripped of toner residue. Steel frames, copper electric motors, circuit boards, and ABS plastics are segregated for certified domestic UK recycling.',
      },
    ],
    faqs: [
      {
        question: 'Do modern office photocopiers really have hard drives that store data?',
        answer:
          'Yes. Almost all commercial floor-standing copiers manufactured in the last 15 years contain internal hard disk drives that store unencrypted image files of scanned, printed, and emailed documents. We systematically remove and sanitize these drives.',
      },
      {
        question: 'How do you handle heavy floor-standing copiers on upper office floors without lifts?',
        answer:
          'We operate powered stair-climbing machine movers and specialized ramping systems operated by trained heavy-handling technicians. Please alert us to stairs when booking your collection.',
      },
      {
        question: 'What happens to the leftover toner cartridges inside the printers?',
        answer:
          'We securely seal cartridges during collection to prevent powder leaks. Intact, unopened cartridges are routed for cartridge recycling schemes, while waste toner is handled in accordance with chemical waste guidelines.',
      },
      {
        question: 'Can you assist with lease-return collections for finance companies?',
        answer:
          'Yes. We regularly de-install, photograph, condition-report, and securely transport copiers on behalf of corporate clients returning hardware to leasing institutions.',
      },
    ],
    relatedServicesHeading: 'Related Hardware Collection Services',
    relatedServicesIntro:
      'Combine your printing fleet clearance with our dedicated computer, monitor, and server disposal solutions.',
    relatedSlugs: [
      'computer-collection',
      'monitor-screen-collection',
      'server-collection',
    ],
  },

  'server-collection': {
    slug: 'server-collection',
    route: '/server-collection',
    navTitle: 'Server Collection',
    title: 'Server Collection',
    h1: 'Enterprise Server & Data Centre Hardware Collection Services',
    valueProposition:
      'High-security UK collection for redundant rackmount servers, blade enclosures, SAN storage arrays, and network infrastructure with serialized chain of custody and data sanitisation.',
    metaTitle: 'Server Collection UK | Enterprise Data Centre Hardware Disposal | TechSteps',
    metaDescription:
      'High-security collection for enterprise rack servers, blade systems, SAN arrays, and networking hardware. Serialised tracking, military-grade data erasure, and WEEE compliance.',
    heroImage: '/images/collection/server-collection-hero.jpg',
    heroImageAlt: 'TechSteps server collection technicians logging serialized enterprise rack servers into padded flight cases',
    heroBadge: 'Data Centre & Rack Infrastructure',
    equipmentTypesHeading: 'Enterprise Server & Network Equipment We Collect',
    equipmentTypesIntro:
      'We specialise in de-racking, packaging, and transporting mission-critical server hardware from enterprise data centres, colocation suites, and server rooms.',
    typesCollected: [
      {
        category: 'Rackmount & Blade Servers',
        description: 'Standard enterprise compute nodes and dense architectures.',
        items: [
          '1U, 2U, 4U rackmount servers (Dell PowerEdge, HPE ProLiant, Cisco UCS, Lenovo ThinkSystem)',
          'High-density blade server enclosures and blade modules',
          'GPU-accelerated AI and machine-learning compute clusters',
          'Tower enterprise servers and small business backup hosts',
        ],
      },
      {
        category: 'Storage Arrays & Backup Infrastructure',
        description: 'Enterprise SAN, NAS, and archive storage systems.',
        items: [
          'Storage Area Network (SAN) controllers & expansion disk shelves (NetApp, Dell EMC, Pure Storage)',
          'Network Attached Storage (NAS) multi-bay appliances',
          'Automated tape libraries, LTO autoloaders & tape drives',
          'Direct-attached storage arrays & JBOD disk enclosures',
        ],
      },
      {
        category: 'Enterprise Networking & Security Hardware',
        description: 'Core routing, switching, and edge security technology.',
        items: [
          'Core and distribution network switches (Cisco Catalyst/Nexus, Arista, Juniper)',
          'Next-generation firewalls & security appliances (Fortinet, Palo Alto, Check Point)',
          'Load balancers, application delivery controllers & VPN gateways',
          'Patch panels, fiber patch leads & copper interconnect looms',
        ],
      },
      {
        category: 'Data Centre Power & Environmental Ancillaries',
        description: 'Power distribution, rack enclosures, and conditioning gear.',
        items: [
          'Uninterruptible Power Supplies (UPS rackmount units & battery packs)',
          'Smart Rack Power Distribution Units (PDUs) & transfer switches',
          'Server rack enclosures (42U/48U), blanking panels & cable arms',
          'Console drawers, rack KVM switches & terminal management pods',
        ],
      },
    ],
    processIntro:
      'Our data centre decommission protocol delivers audited clearance with zero disruption to live adjacent infrastructure.',
    processSteps: [
      {
        step: '01',
        title: 'Scope Audit & Colocation Access Protocol',
        description:
          'We review your asset inventory, rack elevations, and facility security requirements, coordinating security clearance and loading dock permits with your colocation provider.',
      },
      {
        step: '02',
        title: 'Precision De-Racking by Vetted Personnel',
        description:
          'Security-cleared technicians carefully isolate, disconnect, and de-rack servers, labelling every cable loom and chassis with unique barcode tracking tags.',
      },
      {
        step: '03',
        title: 'Padded Flight Case Transit & Tamper Seals',
        description:
          'Equipment is placed into heavy-duty foam-lined server flight cases and secured with numbered tamper-evident seals before leaving the server hall.',
      },
      {
        step: '04',
        title: 'High-Grade Sanitisation & Drive Shredding',
        description:
          'At our secure facility, all SAS, SATA, and NVMe drives undergo certified multipass overwriting or physical shredding, with individual certificate logging.',
      },
      {
        step: '05',
        title: 'Full Serialised Manifest & ESG Reporting',
        description:
          'Your compliance team receives a comprehensive asset register documenting serial numbers, CPU/RAM configurations, drive disposition status, and WEEE recycling manifests.',
      },
    ],
    securityHeading: 'High-Security Chain of Custody & Data Sanitisation',
    securityIntro:
      'Server environments hold the most sensitive databases, customer identities, and intellectual property in your organization.',
    securityPoints: [
      {
        title: 'Multi-Drive Serialized Eradication',
        description:
          'Enterprise arrays hold hundreds of high-capacity SAS and NVMe drives. We log every drive by unique serial number and perform cryptographically validated sanitisation or 6mm cross-cut physical shredding.',
      },
      {
        title: 'Security-Cleared Logistics Operators',
        description:
          'All collection personnel are DBS checked and security vetted, trained in data centre access protocols, anti-static precautions, and confidential asset handling.',
      },
      {
        title: 'GPS-Tracked Dedicated Transport',
        description:
          'We do not co-mingle data centre server loads with uncontrolled freight. Consignments travel directly in satellite-tracked vehicles with deadlocked cargo bays.',
      },
    ],
    circularHeading: 'Enterprise Remarketing & Environmental Recovery Pathways',
    circularIntro:
      'Enterprise server components retain substantial secondary life value when processed through certified testing channels.',
    circularOptions: [
      {
        title: 'Enterprise Server Remarketing & Refurbishment',
        tag: 'Maximum Financial & ESG Return',
        description:
          'Modern rack servers and storage controllers undergo component stress testing, firmware clearing, and re-configuration for secondary enterprise colocation and cloud hosting.',
      },
      {
        title: 'Component Harvesting: CPUs, RAM & Optics',
        tag: 'Component Recovery',
        description:
          'Enterprise ECC RAM modules, Intel Xeon/AMD EPYC processors, optical transceivers, and redundant power supplies are harvested to maintain ongoing data centre estates.',
      },
      {
        title: 'Certified WEEE Materials Refinement',
        tag: 'Circular Recycling',
        description:
          'Obsolete or damaged server chassis and server backplanes are separated into high-grade gold, silver, copper, and structural steel fractions for domestic UK recycling.',
      },
    ],
    faqs: [
      {
        question: 'Can your team de-rack servers from active enterprise data centres?',
        answer:
          'Yes. Our technicians are experienced in working in live Tier 3 and Tier 4 data centres. We follow strict anti-static and anti-snag protocols to ensure zero disturbance to adjacent active racks.',
      },
      {
        question: 'Do you offer on-site hard drive destruction before equipment leaves our server room?',
        answer:
          'Yes. We operate mobile hydraulic punchers and degaussing equipment that can physically crush or demagnetize hard drives on site in your presence before hardware leaves your facility.',
      },
      {
        question: 'How do you handle heavy enterprise UPS systems and battery strings?',
        answer:
          'We collect rackmount and standalone UPS hardware. Sealed lead-acid (SLA) and lithium UPS battery strings are handled as hazardous electrical waste with full consignment note documentation.',
      },
      {
        question: 'What documentation do you provide for auditing and compliance bodies?',
        answer:
          'You receive a complete serialized asset register including make, model, serial number, processor specification, RAM, drive counts, and individual certificates of data erasure or physical destruction.',
      },
    ],
    relatedServicesHeading: 'Related Hardware Collection Services',
    relatedServicesIntro:
      'Complement your data centre clearance with our corporate workstation, desktop, and storage media services.',
    relatedSlugs: [
      'computer-collection',
      'laptop-collection',
      'monitor-screen-collection',
    ],
  },
};

export const allCollectionServicesList = [
  collectionServices['av-media-equipment-collection'],
  collectionServices['computer-collection'],
  collectionServices['laptop-collection'],
  collectionServices['mobile-device-collection'],
  collectionServices['monitor-screen-collection'],
  collectionServices['printer-copier-collection'],
  collectionServices['server-collection'],
];
