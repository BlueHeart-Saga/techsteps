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
  equipmentTypesEyebrow?: string;
  equipmentTypesHeading: string;
  equipmentTypesIntro: string;
  typesCollected: EquipmentTypeItem[];
  processEyebrow?: string;
  processHeading?: string;
  processIntro: string;
  processSteps: CollectionProcessStep[];
  securityEyebrow?: string;
  securityHeading: string;
  securityIntro: string;
  securityPoints: SecurityPoint[];
  circularEyebrow?: string;
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
    route: '/av-media-equipment-collection-services',
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
      "slug": "computer-collection",
      "route": "/computer-collection-services",
      "navTitle": "Computer Collection",
      "title": "Computer Collection",
      "h1": "Computer Collection Services UK",
      "valueProposition": "We arrange a suitable collection time, gather laptops and desktop computers from your premises, and make sure each item is handled and accounted for.",
      "metaTitle": "Computer Collection Services UK | Techsteps",
      "metaDescription": "Techsteps provides computer collection services UK businesses can rely on for collecting redundant desktop PCs, workstations and other IT equipment.",
      "heroImage": "/images/collection/computer-collection-hero.jpg",
      "heroImageAlt": "TechSteps desktop computer towers and workstations organised on secure logistics carts for collection",
      "heroBadge": "Desktop PCs & Workstations",
      "equipmentTypesEyebrow": "ACCEPTED COMPUTER EQUIPMENT",
      "equipmentTypesHeading": "Types of Computers We Collect",
      "equipmentTypesIntro": "Our computer collection covers a variety of equipment found in business environments, including everyday office computers, employee laptops, specialist workstations and associated hardware.",
      "typesCollected": [
        {
          "category": "Desktop PCs & Office Computers",
          "description": "Standard desktop PCs and tower computers used across different departments.",
          "items": [
            "Standard desktop PCs and tower computers",
            "Small Form Factor (SFF) desktop systems",
            "Mini PCs and micro desktop computers",
            "Office computers used across different departments"
          ]
        },
        {
          "category": "Business Laptops & Notebooks",
          "description": "Standard business laptops, mobile workstations and staff notebooks.",
          "items": [
            "Standard business laptops and notebooks",
            "Lightweight and compact laptops",
            "Mobile workstation laptops",
            "Older laptops and unused notebook computers"
          ]
        },
        {
          "category": "Specialist Computers & Workstations",
          "description": "High-performance computing workstations and precision design rigs.",
          "items": [
            "CAD and engineering workstation computers",
            "Graphic design and video editing systems",
            "High-performance computing workstations",
            "Multi-screen trading and data analysis computers"
          ]
        },
        {
          "category": "Computer Accessories & Components",
          "description": "Keyboards, power supplies, docks and internal computing components.",
          "items": [
            "Keyboards, mice and computer cables",
            "Laptop chargers and power adapters",
            "Docking stations and port replicators",
            "RAM, internal components and external enclosures"
          ]
        }
      ],
      "processEyebrow": "OUR COLLECTION PROCESS",
      "processHeading": "How Our Computer Collection Process Works",
      "processIntro": "We keep computer collections straightforward, from the initial arrangements to the handling of equipment after collection.",
      "processSteps": [
        {
          "step": "01",
          "title": "Collection Planning",
          "description": "We discuss the type and quantity of computers, collection location and preferred date to arrange a suitable collection."
        },
        {
          "step": "02",
          "title": "On-Site Collection",
          "description": "Our team collects laptops, desktop PCs, workstations and associated equipment directly from your business premises."
        },
        {
          "step": "03",
          "title": "Safe Handling & Transportation",
          "description": "Each item is carefully handled, loaded and prepared for transportation to avoid unnecessary damage during transit."
        },
        {
          "step": "04",
          "title": "Equipment Assessment",
          "description": "Collected computers are checked and recorded, with data-bearing devices identified for the appropriate data sanitisation or destruction process."
        },
        {
          "step": "05",
          "title": "Records & Documentation",
          "description": "Relevant collection records and supporting documentation are provided to help your business keep track of its retired computer equipment."
        }
      ],
      "securityEyebrow": "DATA SECURITY & DRIVE SANITISATION",
      "securityHeading": "Protecting Business Data During Computer Collection",
      "securityIntro": "Our computer collection services UK take data security into account, ensuring business computers containing sensitive company and customer information are identified.",
      "securityPoints": [
        {
          "title": "Secure Data Erasure & Destruction",
          "description": "Hard drives and SSDs are identified for secure data erasure or physical destruction, depending on the agreed service."
        },
        {
          "title": "Asset Identification & Label Removal",
          "description": "Equipment details are recorded, with company labels, asset tags and identification stickers removed where required."
        },
        {
          "title": "Collection Records & Documentation",
          "description": "Relevant asset records and supporting documentation help businesses maintain clear records of their collected computer equipment."
        }
      ],
      "circularEyebrow": "REUSE, RECOVERY & RESPONSIBLE RECYCLING",
      "circularHeading": "Giving Collected Computers a Second Life",
      "circularIntro": "Our approach focuses on keeping working equipment in use and recovering useful materials from devices that have reached the end of their life.",
      "circularOptions": [
        {
          "title": "Computer Testing & Refurbishment",
          "tag": "Testing & Refurbishment",
          "description": "Suitable computers are checked for their condition and performance before being considered for refurbishment, reuse or resale."
        },
        {
          "title": "Reusable Parts & Components",
          "tag": "Component Recovery",
          "description": "Working components such as RAM, processors, power supplies and other parts can be recovered from computers where suitable for further use."
        },
        {
          "title": "Responsible Computer Recycling",
          "tag": "Responsible Recycling",
          "description": "Computers that are no longer suitable for reuse are directed towards appropriate recycling processes, helping recover valuable materials and reduce electronic waste."
        }
      ],
      "faqs": [
        {
          "question": "What types of computers do you collect from businesses?",
          "answer": "We collect a range of business computers, including desktop PCs, laptops, workstations, all-in-one systems, mini PCs and associated computer equipment."
        },
        {
          "question": "Do you offer computer collection services across the UK?",
          "answer": "Yes, we arrange computer collections for businesses across the UK, depending on the collection location, equipment quantity and service requirements."
        },
        {
          "question": "How do I arrange a computer collection for my business?",
          "answer": "You can contact our team with your collection location, equipment details and approximate quantity. We can then discuss your requirements and arrange a suitable collection."
        },
        {
          "question": "What happens to computers after they are collected?",
          "answer": "Collected computers are assessed to determine whether they are suitable for reuse, refurbishment, component recovery or responsible recycling."
        },
        {
          "question": "Is my business data protected during computer collection?",
          "answer": "Data-bearing devices are identified for appropriate data sanitisation or destruction. The process depends on the storage device condition and the agreed data security requirements."
        },
        {
          "question": "Can you collect large quantities of office computers at once?",
          "answer": "Yes, we can discuss collections involving multiple computers, office equipment clearances and larger IT asset replacements based on the volume and location."
        },
        {
          "question": "Do you provide documentation after collecting business computers?",
          "answer": "Relevant collection records and supporting documentation can be provided to help businesses maintain equipment records and track their retired IT assets."
        }
      ],
      "relatedServicesHeading": "Explore Related Collection Disciplines",
      "relatedServicesIntro": "Combine computer hardware collections with our complementary IT asset retirement services.",
      "relatedSlugs": [
        "laptop-collection",
        "monitor-screen-collection",
        "server-collection"
      ]
    },

  'laptop-collection': {
      "slug": "laptop-collection",
      "route": "/laptop-collection-services",
      "navTitle": "Laptop Collection",
      "title": "Laptop Collection",
      "h1": "Laptop Collection Services UK",
      "valueProposition": "We collect your old business laptops from anywhere in the UK, wipe them securely and send you the certificate to prove it. No fuss, no stress.",
      "metaTitle": "Laptop Collection Services UK | Techsteps",
      "metaDescription": "Looking for laptop collection services UK? Techsteps collects redundant business laptops and notebooks, with careful handling and responsible reuse or recycling.",
      "heroImage": "/images/collection/laptop-collection-hero.jpg",
      "heroImageAlt": "TechSteps corporate laptops and notebooks prepared in foam-lined protective containers for secure collection",
      "heroBadge": "Business Laptops & MacBooks",
      "equipmentTypesEyebrow": "ACCEPTED HARDWARE SPECIFICATIONS",
      "equipmentTypesHeading": "Laptops Workstations We Collect with Our Laptop Collection Services UK",
      "equipmentTypesIntro": "Whether you’re running a company-wide refresh, getting devices back from remote staff or clearing out a mixed stockpile, our laptop collection services UK cover businesses, schools, healthcare providers of every size.",
      "typesCollected": [
        {
          "category": "Everyday Business Laptops",
          "description": "The machines most offices run on, from all the big names.",
          "items": [
            "Dell Latitude and XPS laptops",
            "Lenovo ThinkPad and ThinkBook laptops",
            "HP EliteBook and ProBook notebooks",
            "Microsoft Surface Pro, Surface Laptop and Surface Book devices"
          ]
        },
        {
          "category": "Apple MacBooks",
          "description": "Both Apple silicon and older Intel Macs.",
          "items": [
            "MacBook Air (M1, M2, M3 and Intel models)",
            "MacBook Pro in 13, 14 and 16-inch sizes",
            "T2-chip and Apple silicon Macs still locked to MDM",
            "Older unibody MacBooks and spare loan machines"
          ]
        },
        {
          "category": "Mobile Workstations & Rugged Laptops",
          "description": "Tough, powerful machines for engineers, field teams and clinical staff.",
          "items": [
            "CAD workstations such as Dell Precision and HP ZBook",
            "Rugged field laptops like Panasonic Toughbook and Getac",
            "Clinical and medical trolley computers",
            "High-spec laptops used by developers and analysts"
          ]
        },
        {
          "category": "Docks, Chargers & Laptop Accessories",
          "description": "The extras that usually get left in a drawer.",
          "items": [
            "Thunderbolt and USB-C docking stations",
            "Original power adapters and chargers",
            "Privacy screens, laptop stands and USB hubs",
            "Padded laptop bags, sleeves and security cables"
          ]
        }
      ],
      "processEyebrow": "HOW THE LAPTOP COLLECTION PROCESS WORKS",
      "processHeading": "How the Laptop Collection Process Works",
      "processIntro": "Our laptop collection services in the UK keep every device accounted for, from your office door to the final certificate.",
      "processSteps": [
        {
          "step": "01",
          "title": "Tell Us What You Have & Pick a Date",
          "description": "Share your rough laptop numbers, systems, and building access details. We’ll confirm a slot and send the right vehicle."
        },
        {
          "step": "02",
          "title": "Careful Packing at Your Site",
          "description": "We pack each laptop on the spot in foam-lined cases and cushioned boxes, protecting screens, casings and batteries."
        },
        {
          "step": "03",
          "title": "Sealed and Tracked in Transit",
          "description": "Sealed boxes travel in tracked vehicles with a signed Duty of Care note, straight to our secure wiping facility."
        },
        {
          "step": "04",
          "title": "Scanned In & Securely Wiped",
          "description": "We barcode-scan each laptop on arrival, then wipe it with multiple overwrite passes and check to confirm nothing is left behind."
        },
        {
          "step": "05",
          "title": "Full Paperwork for Your Records",
          "description": "You get an audit pack with serial numbers, asset tags, condition reports and a data destruction certificate for every laptop."
        }
      ],
      "securityEyebrow": "CONFIDENTIALITY & GOVERNANCE",
      "securityHeading": "Laptop Data Security & Battery Safety You Can Trust",
      "securityIntro": "Laptops carry confidential company data and lithium-ion batteries that need careful handling. Our laptop collection services UK deal with both, so nothing is left to chance.",
      "securityPoints": [
        {
          "title": "Secure Data Erasure",
          "description": "Modern laptops often have storage soldered straight onto the motherboard. We wipe every drive at firmware level to NIST 800-88 standards, so no company data is left behind."
        },
        {
          "title": "Safe Battery Handling",
          "description": "Our team checks every laptop on collection and places any faulty battery in a fire-retardant container, following ADR transport guidance."
        },
        {
          "title": "MDM & BIOS Lock Checks",
          "description": "We check for Apple MDM profiles, Intune registrations and BIOS passwords, so every laptop is fully released from your company systems and ready to be reused or recycled."
        }
      ],
      "circularEyebrow": "REUSE, RECOVERY & RESPONSIBLE RECYCLING",
      "circularHeading": "Giving Collected Laptops a Second Life",
      "circularIntro": "Our approach focuses on keeping working equipment in use and recovering useful materials from devices that have reached the end of their life.",
      "circularOptions": [
        {
          "title": "Laptop Testing & Refurbishment",
          "tag": "Testing & Refurbishment",
          "description": "Laptops with life left are thoroughly tested, cleaned and prepared for reuse or resale, extending device lifespans."
        },
        {
          "title": "Component & Screen Harvesting",
          "tag": "Component Recovery",
          "description": "Working screens, keyboards, RAM and internal parts are recovered from faulty machines to repair other devices."
        },
        {
          "title": "Responsible Laptop Recycling",
          "tag": "WEEE Recycling",
          "description": "Laptops that cannot be reused are responsibly recycled through certified UK WEEE processes with zero landfill waste."
        }
      ],
      "faqs": [
        {
          "question": "What are laptop collection services UK?",
          "answer": "A specialist company collects your unwanted business laptops, wipes the data and reuses or recycles them. You get paperwork to prove it."
        },
        {
          "question": "How do I dispose of old business laptops safely?",
          "answer": "Use a certified collection provider. They wipe the data properly and give you an erasure certificate for your records."
        },
        {
          "question": "Do I need to wipe my laptops before collection?",
          "answer": "No, we do it for you. Every laptop is securely wiped and you get a certificate for each one."
        },
        {
          "question": "Is it legal to throw away old laptops in the UK?",
          "answer": "No. Laptops are electrical waste (WEEE) and hold data covered by UK GDPR, so they must be disposed of through an authorised route."
        },
        {
          "question": "Can you collect laptops from more than one location?",
          "answer": "Yes. We can collect from several sites in one booking and send you one combined report."
        },
        {
          "question": "What happens to the laptops after collection?",
          "answer": "They’re scanned in and wiped. Laptops with life left are reused, the rest are recycled, and unwipeable drives are destroyed."
        },
        {
          "question": "Do you collect broken or damaged laptops?",
          "answer": "Yes. Working, faulty, cracked or swollen-battery laptops are all accepted, and damaged batteries are handled safely."
        }
      ],
      "relatedServicesHeading": "Explore Related Collection Disciplines",
      "relatedServicesIntro": "Combine laptop fleets with desktop computers, mobile devices, and office hardware collections.",
      "relatedSlugs": [
        "computer-collection",
        "mobile-device-collection",
        "monitor-screen-collection"
      ]
    },

  'mobile-device-collection': {
      "slug": "mobile-device-collection",
      "route": "/mobile-device-collection-services",
      "navTitle": "Mobile Device Collection",
      "title": "Mobile Device Collection",
      "h1": "Business Mobile and Tablet Collection Services UK",
      "valueProposition": "We collect your unused company phones, tablets and handheld scanners from anywhere in the UK, wipe them securely and give you the paperwork to prove it.",
      "metaTitle": "Mobile Phone Collection Services UK | Techsteps",
      "metaDescription": "Arrange mobile phone collection services UK businesses can rely on. Techsteps collects redundant business phones for data handling, reuse and recycling.",
      "heroImage": "/images/collection/mobile-device-collection-hero.jpg",
      "heroImageAlt": "TechSteps technicians inspecting corporate smartphones and tablets in anti-static cushioned sorting trays",
      "heroBadge": "Mobile Devices & Scanners",
      "equipmentTypesEyebrow": "ENTERPRISE MOBILE TECHNOLOGY WE COLLECT",
      "equipmentTypesHeading": "Mobile Devices We Collect with Our Mobile Collection Services UK",
      "equipmentTypesIntro": "We collect mixed phone fleets, warehouse handhelds and spare executive handsets from businesses, logistics depots and healthcare providers, however many you have.",
      "typesCollected": [
        {
          "category": "Business Smartphones",
          "description": "The everyday phones your staff use for work.",
          "items": [
            "iPhones from any year",
            "Samsung Galaxy Enterprise Edition phones",
            "Google Pixel business handsets",
            "Rugged phones used on sites and in the field"
          ]
        },
        {
          "category": "Tablets & iPads",
          "description": "Touchscreen devices for the office, the road and the shop floor.",
          "items": [
            "iPad, iPad Air, iPad Mini and iPad Pro models",
            "Samsung Galaxy Tab standard and rugged Active tablets",
            "Microsoft Surface Go and other work touchscreen tablets",
            "Tablets used for payments and customer displays"
          ]
        },
        {
          "category": "Warehouse & Handheld Scanners",
          "description": "The devices that keep stock and deliveries moving.",
          "items": [
            "Barcode scanners from Zebra, Honeywell and Datalogic",
            "Rugged handheld computers and stock-taking terminals",
            "RFID readers and portable label printers",
            "Vehicle-mounted terminals used in forklifts and vans"
          ]
        },
        {
          "category": "Mobile Accessories & Charging Stations",
          "description": "The extras that usually get left behind.",
          "items": [
            "Multi-bay charging cradles and docking stations",
            "Original chargers, USB-C and Lightning cables and adapters",
            "Tough cases, styluses and holster straps",
            "Spare batteries and power banks"
          ]
        }
      ],
      "processEyebrow": "HOW THE MOBILE COLLECTION PROCESS WORKS",
      "processHeading": "How the Mobile Collection Process Works",
      "processIntro": "Our mobile collection services UK keep every device tracked and checked from your office to the final report.",
      "processSteps": [
        {
          "step": "01",
          "title": "Tell Us What You Have & Arrange a Date",
          "description": "Share your rough device numbers, brands and MDM status. We’ll plan a quick, secure collection that fits around your sites."
        },
        {
          "step": "02",
          "title": "Safe Packing at Your Site",
          "description": "We pack phones and tablets into foam-lined cases with individual slots, keeping screens scratch-free while they’re moved."
        },
        {
          "step": "03",
          "title": "Sealed and Tracked in Transit",
          "description": "Cases are sealed with numbered security ties and travel in GPS-tracked vehicles, with signed paperwork, to our secure facility."
        },
        {
          "step": "04",
          "title": "Checked In & Securely Wiped",
          "description": "We scan every IMEI and serial number, test each device and wipe it with certified mobile erasure software."
        },
        {
          "step": "05",
          "title": "Full Report for Your Records",
          "description": "You get an itemised list showing make, model, IMEI, serial number, condition grade and wipe confirmation for every device."
        }
      ],
      "securityEyebrow": "DATA PROTECTION, IMEI AUDITING & MDM PROTOCOLS",
      "securityHeading": "Data Protection, IMEI Auditing & MDM Protocols",
      "securityIntro": "Work phones and tablets hold company emails, login codes, VPN access and private contacts. Our mobile collection services UK make sure none of it leaves with the device.",
      "securityPoints": [
        {
          "title": "Certified Data Wipe",
          "description": "We use specialist mobile erasure software to factory reset every device and overwrite its internal storage, so nothing can be recovered afterwards."
        },
        {
          "title": "MDM, iCloud & Knox Lock Checks",
          "description": "We check each device for Apple iCloud Activation Lock, Samsung Knox restrictions and Google FRP, so it is fully released from your company systems."
        },
        {
          "title": "SIM & SD Card Removal",
          "description": "We find and remove every SIM card and memory card on arrival, then shred them, and we clear any eSIM profiles, so no data or network access is left behind."
        }
      ],
      "circularEyebrow": "CIRCULAR LIFE EXTENSION & ETHICAL MATERIAL RECOVERY",
      "circularHeading": "Circular Life Extension & Ethical Material Recovery",
      "circularIntro": "Old phones and tablets are full of valuable materials. Our mobile collection services UK make sure they’re reused where possible and recycled properly when they’re not.",
      "circularOptions": [
        {
          "title": "Refurbish & Resell",
          "tag": "Refurbish & Resell",
          "description": "Phones and tablets that still work have their battery health checked, screens polished and software refreshed, so they can go on to a second life with a new owner."
        },
        {
          "title": "Parts Recovery",
          "tag": "Parts Recovery",
          "description": "Cracked or water-damaged devices still have usable cameras, logic boards, microphones and casings, which are pulled out and used to repair other working devices."
        },
        {
          "title": "Responsible Recycling",
          "tag": "Responsible Recycling",
          "description": "Devices that can’t be repaired go to certified UK recyclers, who recover gold, silver, palladium, cobalt and lithium, with nothing sent to landfill."
        }
      ],
      "faqs": [
        {
          "question": "What are mobile collection services UK?",
          "answer": "A specialist company collects your unused business phones and tablets, wipes the data and reuses or recycles them. You get paperwork to prove it."
        },
        {
          "question": "How do I dispose of old company phones safely?",
          "answer": "Use a certified provider. They wipe every device, check it’s released from your MDM and give you a certificate for your records."
        },
        {
          "question": "How do I wipe a work phone before recycling it?",
          "answer": "A factory reset isn’t always enough. We use certified erasure software to overwrite the storage, so nothing can be recovered."
        },
        {
          "question": "Can you collect phones that are still locked to our MDM?",
          "answer": "Yes. We check for MDM, iCloud Activation Lock, Samsung Knox and Google FRP, and help you release each device before it’s reused or recycled."
        },
        {
          "question": "What happens to the SIM and SD cards?",
          "answer": "We remove every SIM and memory card on arrival and shred them. Any eSIM profiles are cleared too."
        },
        {
          "question": "Is it legal to throw away old phones and tablets in the UK?",
          "answer": "No. They’re electrical waste (WEEE) and hold data covered by UK GDPR, so they must go through an authorised disposal route."
        },
        {
          "question": "Do you pay for old business phones and tablets?",
          "answer": "Often, yes. Devices that still work can have resale value, which can offset the cost of collection."
        }
      ],
      "relatedServicesHeading": "Related Hardware Collection Services",
      "relatedServicesIntro": "Integrate mobile device disposal with laptops, desktop computers, and office IT collections.",
      "relatedSlugs": [
        "laptop-collection",
        "computer-collection",
        "monitor-screen-collection"
      ]
    },

  'monitor-screen-collection': {
      "slug": "monitor-screen-collection",
      "route": "/monitor-screen-collection-services",
      "navTitle": "Monitor & Screen Collection",
      "title": "Monitor & Screen Collection",
      "h1": "Monitor Collection Services UK: Safe Collection for Business Monitors",
      "valueProposition": "Safe UK collection for old computer monitors, dual-screen setups, ultrawide displays, with careful handling and full compliance paperwork.",
      "metaTitle": "Monitor Collection Services UK | Techsteps",
      "metaDescription": "Choose Techsteps for monitor collection services UK businesses need. We collect redundant office displays for assessment, reuse and responsible recycling.",
      "heroImage": "/images/collection/monitor-screen-collection-hero.jpg",
      "heroImageAlt": "TechSteps commercial monitors and ultrawide displays packed safely in padded transport cages for collection",
      "heroBadge": "Office Monitors & Displays",
      "equipmentTypesEyebrow": "DISPLAY TECHNOLOGY & SCREENS WE COLLECT",
      "equipmentTypesHeading": "Monitors and Screens We Collect with Our Monitor Collection Services UK",
      "equipmentTypesIntro": "We collect office monitors, curved screens, touchscreens and digital signage from businesses of every size, whether it’s a few spare screens or a whole floor’s worth.",
      "typesCollected": [
        {
          "category": "Standard Office Monitors",
          "description": "The everyday screens on most desks, single or dual.",
          "items": [
            "21-inch to 27-inch LED and LCD monitors",
            "Height-adjustable monitors from Dell, HP and Lenovo",
            "Slim-bezel screens used in dual-monitor setups",
            "Standard 1080p and 1440p office monitors"
          ]
        },
        {
          "category": "Large & Specialist Screens",
          "description": "Bigger displays for design, engineering and healthcare teams.",
          "items": [
            "34-inch to 49-inch curved ultrawide monitors",
            "Colour-accurate 4K and 5K design monitors",
            "Fast refresh rate screens for CAD and engineering",
            "Medical imaging and clinical review monitors"
          ]
        },
        {
          "category": "Touchscreens & Digital Displays",
          "description": "Screens built for customers, meetings and public spaces.",
          "items": [
            "Interactive touchscreens and self-service kiosk displays",
            "Digital signage and advertising screens",
            "Rugged industrial touch monitors and panel PCs",
            "Checkout monitors and customer-facing displays"
          ]
        },
        {
          "category": "Monitor Arms, Stands & Cables",
          "description": "The extras that usually get left under the desk.",
          "items": [
            "Single, dual and quad monitor arms and gas-strut mounts",
            "Original monitor stands and baseplates",
            "DisplayPort, HDMI, USB-C and DVI cables",
            "Power adapters, IEC cables and spare connectors"
          ]
        }
      ],
      "processEyebrow": "HOW THE MONITOR COLLECTION PROCESS WORKS",
      "processHeading": "How the Monitor Collection Process Works",
      "processIntro": "Our monitor collection services in the UK take the risk out of moving fragile glass screens, so nothing cracks on the way out of your building.",
      "processSteps": [
        {
          "step": "01",
          "title": "Tell Us What You Have & Book a Slot",
          "description": "Share how many monitors you have, their rough sizes and whether the stands are attached. We’ll book a collection time that fits your loading bay."
        },
        {
          "step": "02",
          "title": "Careful Screen Packing On-Site",
          "description": "We pack every screen using foam dividers, screen protectors and padded roll cages, so the glass stays safe while it’s cleared from your office."
        },
        {
          "step": "03",
          "title": "Strapped In & Fully Documented",
          "description": "Monitors are loaded onto tail-lift vehicles and strapped down securely. A Duty of Care waste transfer note is signed on site before we leave."
        },
        {
          "step": "04",
          "title": "Tested, Graded & Sorted",
          "description": "At our facility, we unpack each monitor, check the panel for dead pixels and sort it for reuse or certified recycling."
        },
        {
          "step": "05",
          "title": "Reports for Your Records",
          "description": "You get a full list of makes, models, screen sizes and recycling weights, ready for your company’s ESG reporting."
        }
      ],
      "securityEyebrow": "SAFE HANDLING & RESPONSIBLE DISPLAY RECYCLING",
      "securityHeading": "Safe Handling & Responsible Display Recycling",
      "securityIntro": "Flat-screen monitors need careful handling during collection due to fragile screens, internal components and materials that may require special disposal.",
      "securityPoints": [
        {
          "title": "Safe Handling & Waste Management",
          "description": "Some older monitors, particularly CCFL-backlit models, contain small amounts of mercury. These displays need appropriate handling and disposal in line with relevant waste regulations."
        },
        {
          "title": "Careful Screen Packaging",
          "description": "Monitors can easily crack or become damaged during transportation. We handle and pack displays carefully, keeping them separated to reduce pressure and avoid unnecessary damage."
        },
        {
          "title": "Complete Equipment Recording",
          "description": "We also account for associated items such as power adapters, connection cables and detachable stands, keeping the collected equipment together and properly recorded."
        }
      ],
      "circularEyebrow": "REUSE, RECOVERY & RESPONSIBLE RECYCLING",
      "circularHeading": "Monitor Refurbishment & Material Recovery",
      "circularIntro": "By checking each collected display before recycling, we identify monitors that can be reused and recover valuable materials from equipment that is no longer suitable for further use.",
      "circularOptions": [
        {
          "title": "Display Testing & Preparation for Reuse",
          "tag": "Testing & Preparation",
          "description": "Monitors in good working condition are cleaned and checked for screen quality, brightness and general performance before being prepared for refurbishment, resale or further business use."
        },
        {
          "title": "Reusing Internal Parts & Accessories",
          "tag": "Component Recovery",
          "description": "Monitors with damaged screens may still have working components. Suitable circuit boards, power supplies, connecting parts and metal stands can be recovered for repairing other display units."
        },
        {
          "title": "Recovery of Glass, Plastics & Metals",
          "tag": "Responsible WEEE Recycling",
          "description": "Displays that cannot be reused are dismantled through suitable recycling processes. Materials such as screen glass, plastic housings, internal circuits and metal frames are separated for further recovery and recycling."
        }
      ],
      "faqs": [
        {
          "question": "What types of monitors do you collect?",
          "answer": "We collect LCD, LED, LCD flat-panel monitors, desktop displays and business-use screens."
        },
        {
          "question": "Do you collect monitors from business premises?",
          "answer": "Yes, we arrange monitor collections directly from offices, workplaces and other business locations."
        },
        {
          "question": "Can you collect large quantities of monitors?",
          "answer": "Yes, we can discuss bulk collections involving multiple monitors and office display equipment."
        },
        {
          "question": "What happens to monitors after collection?",
          "answer": "Collected monitors are assessed for reuse, refurbishment, component recovery or responsible recycling."
        },
        {
          "question": "Do you collect damaged or broken monitors?",
          "answer": "Yes, we can collect damaged, faulty and non-working monitors for appropriate processing and recycling."
        },
        {
          "question": "How should monitors be prepared for collection?",
          "answer": "Monitors should be disconnected from power and other devices. Associated cables and accessories can be kept together."
        },
        {
          "question": "Can you collect monitor cables and accessories too?",
          "answer": "Yes, we can also collect compatible power adapters, display cables, stands and other monitor accessories."
        }
      ],
      "relatedServicesHeading": "Explore Related Collection Disciplines",
      "relatedServicesIntro": "Combine monitor collections with office desktop computers, laptops, and peripheral hardware clearance.",
      "relatedSlugs": [
        "computer-collection",
        "laptop-collection",
        "printer-copier-collection"
      ]
    },

  'printer-copier-collection': {
      "slug": "printer-copier-collection",
      "route": "/printer-copier-collection-services",
      "navTitle": "Printer & Copier Collection",
      "title": "Printer & Copier Collection",
      "h1": "Printer Collection Services UK",
      "valueProposition": "Reliable UK-wide collection for redundant office printers, multifunction photocopiers and large-format plotters with careful handling, secure transportation, and data protection.",
      "metaTitle": "Printer Collection Services UK | Techsteps",
      "metaDescription": "Techsteps provides printer collection services UK businesses need for collecting redundant office printers, photocopiers and commercial printing equipment.",
      "heroImage": "/images/collection/printer-copier-collection-hero.jpg",
      "heroImageAlt": "TechSteps commercial photocopiers and multi-function office printers prepared for hydraulic tail-lift loading",
      "heroBadge": "Commercial Printers & Copiers",
      "equipmentTypesEyebrow": "PRINTERS & PRINTING EQUIPMENT WE COLLECT",
      "equipmentTypesHeading": "Types of Printing Equipment We Collect",
      "equipmentTypesIntro": "Our printer collection services UK cover a range of business printing equipment, from everyday office printers and photocopiers to large printing systems used in design.",
      "typesCollected": [
        {
          "category": "Commercial Photocopiers & MFPs",
          "description": "Floor-standing multifunction copiers and enterprise print devices.",
          "items": [
            "Floor-standing A3 and A4 departmental multifunction copiers",
            "High-volume enterprise laser multifunction printers (MFPs)",
            "Network-connected copiers with scan, fax and email functionality",
            "Card-authenticated and secure follow-me print units"
          ]
        },
        {
          "category": "Desktop & Office Laser Printers",
          "description": "Workgroup laser printers, network printers and compact copiers.",
          "items": [
            "Workgroup mono and colour laser printers",
            "Compact desktop network printers and label machines",
            "Thermal receipt and specialized barcode printers",
            "Departmental shared document printers and scanners"
          ]
        },
        {
          "category": "Wide-Format & Production Plotters",
          "description": "Engineering, CAD and large-format graphics plotters.",
          "items": [
            "Large-format architectural and engineering CAD plotters",
            "Commercial graphics and photographic production printers",
            "Floor-standing blueprint scanners and folding machines",
            "Digital proofing and print-shop production equipment"
          ]
        },
        {
          "category": "Printing Consumables & Ancillaries",
          "description": "Associated toners, cartridges, and spare parts.",
          "items": [
            "Unopened and used toner cartridges and waste toner boxes",
            "Drum units, fuser assemblies and transfer belts",
            "Print servers, network interfaces and coin-op payment pods",
            "Spare paper trays, sorting bins and pedestal cabinets"
          ]
        }
      ],
      "processEyebrow": "OUR PRINTER COLLECTION PROCESS",
      "processHeading": "How the Collection Process Works",
      "processIntro": "Office printers and photocopiers can be difficult to move due to their size, weight and delicate internal parts. We organise each collection with suitable handling and transportation arrangements.",
      "processSteps": [
        {
          "step": "01",
          "title": "Equipment Details & Collection Planning",
          "description": "We discuss your printer models, equipment quantity, collection location and site access. This helps us plan the right collection arrangements for your business."
        },
        {
          "step": "02",
          "title": "On-Site Preparation & Handling",
          "description": "Our collection team prepares the equipment for removal, disconnects printers where required and secures loose trays, cables and other detachable parts before moving them."
        },
        {
          "step": "03",
          "title": "Safe Loading & Transportation",
          "description": "Printers and photocopiers are carefully moved from their original locations and loaded onto suitable collection vehicles to reduce the risk of damage during transportation."
        },
        {
          "step": "04",
          "title": "Internal Data Storage & Security",
          "description": "Some multifunction printers store scanned documents and other information on internal hard drives. These storage devices are identified for the appropriate data erasure or destruction process."
        },
        {
          "step": "05",
          "title": "Collection Records & Documentation",
          "description": "Equipment details are recorded during collection, with relevant documentation provided to help businesses track their retired printers and understand their reuse or recycling route."
        }
      ],
      "securityEyebrow": "PRINTER DATA SECURITY & SAFE HANDLING",
      "securityHeading": "Protecting Stored Data During Printer Collection",
      "securityIntro": "We identify these devices during printer collection and consider the appropriate data security and handling requirements.",
      "securityPoints": [
        {
          "title": "Internal Hard Drive Data Erasure",
          "description": "Multifunction printers may contain internal hard drives that store copies of scanned and printed documents. These storage devices are securely wiped or physically destroyed."
        },
        {
          "title": "Toner Handling & Safe Transportation",
          "description": "We take care to secure toner cartridges and detachable containers to reduce spills during collection and transportation."
        },
        {
          "title": "Lease Returns & Collection Records",
          "description": "We can discuss removal arrangements, internal data handling and relevant collection records to support the equipment return process."
        }
      ],
      "circularEyebrow": "REUSE, RECOVERY & RESPONSIBLE RECYCLING",
      "circularHeading": "Printer Refurbishment & Material Recovery",
      "circularIntro": "We aim to extend the useful life of printers and photocopiers where possible, while ensuring equipment that cannot be reused is directed towards appropriate recycling processes.",
      "circularOptions": [
        {
          "title": "Preparing Copiers for Reuse",
          "tag": "Equipment Refurbishment",
          "description": "Commercial copiers in suitable condition are checked and serviced before being considered for refurbishment, resale or further business use. This may include cleaning, replacing worn parts and checking general performance."
        },
        {
          "title": "Recovering Reusable Printer Parts",
          "tag": "Component Recovery",
          "description": "Working components such as fuser units, laser assemblies, power supplies, motors and paper feed mechanisms can be recovered where suitable for repairs or use in other printer systems."
        },
        {
          "title": "Separating Materials for Recovery",
          "tag": "Responsible WEEE Recycling",
          "description": "Printers and photocopiers that are no longer suitable for reuse are dismantled through appropriate recycling processes. Materials such as steel, copper, circuit boards and plastic parts are separated for further recovery and recycling."
        }
      ],
      "faqs": [
        {
          "question": "What types of printers do you collect from businesses?",
          "answer": "We collect office printers, laser printers, multifunction printers, photocopiers, wide-format plotters and commercial printing equipment."
        },
        {
          "question": "Do you offer printer collection services across the UK?",
          "answer": "Yes, we arrange printer collections for businesses across the UK, depending on the collection location and equipment requirements."
        },
        {
          "question": "Can you collect large commercial printers and photocopiers?",
          "answer": "Yes, we can discuss collections involving large photocopiers, floor-standing multifunction printers and other heavy printing equipment."
        },
        {
          "question": "What happens to printers after collection?",
          "answer": "Collected printers are assessed for refurbishment, reuse, component recovery or responsible recycling, depending on their condition."
        },
        {
          "question": "Is data stored inside multifunction printers?",
          "answer": "Some multifunction printers contain internal hard drives that may store scanned documents and other business information."
        },
        {
          "question": "Can you collect damaged or non-working printers?",
          "answer": "Yes, we can discuss collecting faulty, damaged and non-working printers for suitable recycling and material recovery."
        },
        {
          "question": "Do you provide documentation after printer collection?",
          "answer": "Relevant collection records and supporting documentation can be provided to help businesses keep track of their collected printing equipment."
        }
      ],
      "relatedServicesHeading": "Related Hardware Collection Services",
      "relatedServicesIntro": "Combine printer and photocopier collections with desktop PC, monitor, and IT infrastructure clearance.",
      "relatedSlugs": [
        "computer-collection",
        "monitor-screen-collection",
        "server-collection"
      ]
    },

  'server-collection': {
    slug: 'server-collection',
    route: '/server-collection-services',
    navTitle: 'Server Collection',
    title: 'Server Collection',
    h1: 'Server Collection UK: Secure Collection for Enterprise Servers',
    valueProposition:
      'Secure UK collection for old rackmount servers, blade enclosures, storage arrays and network equipment, with full tracking and certified data wiping.',
    metaTitle: 'Server Collection Services UK | Techsteps',
    metaDescription:
      'Techsteps offers server collection services UK businesses can use to manage redundant servers, networking equipment and retired IT hardware responsibly.',
    heroImage: '/images/collection/server-collection-hero.jpg',
    heroImageAlt:
      'TechSteps server collection technicians logging serialized enterprise rack servers into padded flight cases',
    heroBadge: 'Data Centre & Rack Infrastructure',
    equipmentTypesEyebrow: 'ACCEPTED HARDWARE SPECIFICATIONS',
    equipmentTypesHeading: 'Server Hardware We Collect with Our Server Collection UK Service',
    equipmentTypesIntro:
      'We take servers out of data centres, colocation suites and server rooms, from de-racking and packing to safe transport, so your team doesn’t have to lift a thing.',
    typesCollected: [
      {
        category: 'Rackmount & Blade Servers',
        description: 'The core compute machines most data centres run on.',
        items: [
          '1U, 2U and 4U rackmount servers, including Dell PowerEdge, HPE ProLiant, Cisco UCS and Lenovo ThinkSystem',
          'Blade server enclosures and individual blade modules',
          'GPU servers used for AI and machine learning',
          'Tower servers and small office backup machines',
        ],
      },
      {
        category: 'Storage Arrays & Backup Equipment',
        description: 'Everything used to store and protect your data.',
        items: [
          'SAN controllers and disk shelves from NetApp, Dell EMC and Pure Storage',
          'Multi-bay NAS storage devices',
          'Tape libraries, LTO autoloaders and tape drives',
          'Direct-attached storage and JBOD disk enclosures',
        ],
      },
      {
        category: 'Networking & Security Equipment',
        description: 'The kit that keeps your network running and protected.',
        items: [
          'Core and distribution switches from Cisco, Arista and Juniper',
          'Firewalls and security appliances from Fortinet, Palo Alto and Check Point',
          'Load balancers, VPN gateways and application delivery controllers',
          'Patch panels, fibre leads and copper cabling',
        ],
      },
      {
        category: 'Power & Rack Equipment',
        description: 'The supporting gear that usually gets forgotten.',
        items: [
          'Rackmount UPS units and battery packs',
          'Rack PDUs and transfer switches',
          '42U and 48U server racks, blanking panels and cable arms',
          'Console drawers, rack KVM switches and terminal servers',
        ],
      },
    ],
    processEyebrow: 'HOW THE SERVER COLLECTION PROCESS WORKS',
    processHeading: 'How the Server Collection Process Works',
    processIntro:
      'Our server collection UK process clears your racks without disturbing any live equipment next to them, and gives you proof at every stage.',
    processSteps: [
      {
        step: '01',
        title: 'Review Your Kit & Arrange Site Access',
        description:
          'We go through your asset list, rack layouts and site security rules. We then sort out building clearance and loading dock access with your colocation provider.',
      },
      {
        step: '02',
        title: 'Careful De-Racking by Cleared Engineers',
        description:
          'Our security-cleared engineers safely power down, disconnect and remove each server. Every cable bundle and chassis gets its own barcode label.',
      },
      {
        step: '03',
        title: 'Padded Cases & Tamper-Proof Seals',
        description:
          'Servers go into foam-lined flight cases and are locked with numbered tamper-evident seals before they leave the server room.',
      },
      {
        step: '04',
        title: 'Secure Wiping & Drive Shredding',
        description:
          'At our secure facility, every SAS, SATA and NVMe drive is wiped with multiple passes or physically shredded, with a certificate logged for each one.',
      },
      {
        step: '05',
        title: 'Complete Asset Report for Your Records',
        description:
          'Your compliance team gets a full asset register covering serial numbers, CPU and RAM specs, drive status and WEEE recycling paperwork.',
      },
    ],
    securityEyebrow: 'HIGH-SECURITY CHAIN OF CUSTODY & DATA SANITISATION',
    securityHeading: 'High-Security Chain of Custody & Data Sanitisation',
    securityIntro:
      'Your servers hold your most sensitive data, from customer records to company secrets. Our server collection UK service protects it at every step',
    securityPoints: [
      {
        title: 'Every Drive Logged and Wiped',
        description:
          'Large storage arrays can hold hundreds of drives. We record each one by serial number, then either wipe it with verified sanitisation or shred it to 6mm particles.',
      },
      {
        title: 'Vetted, Trained Collection Staff',
        description:
          'Everyone on our team is DBS checked and security vetted. They’re trained in data centre access rules, anti-static handling, and looking after confidential equipment.',
      },
      {
        title: 'Dedicated, Tracked Vehicles',
        description:
          'Your servers never share a vehicle with general freight. They travel in GPS-tracked vehicles with locked cargo areas, straight to our secure facility.',
      },
    ],
    circularEyebrow: 'REUSE, RECOVERY & RESPONSIBLE RECYCLING',
    circularHeading: 'Get Value From Your Old Servers, Responsibly Recycled',
    circularIntro:
      'Old servers still have value. Our server collection UK service tests, reuses and recycles your equipment, so you get something back and nothing goes to waste.',
    circularOptions: [
      {
        title: 'Resale & Refurbishment',
        tag: 'Resale & Refurbishment',
        description:
          'Servers and storage controllers that still perform well are stress tested, cleared of old settings and reconfigured for resale to hosting and cloud providers.',
      },
      {
        title: 'Parts Recovery',
        tag: 'Parts Recovery',
        description:
          'ECC memory, Intel Xeon and AMD EPYC processors, optical transceivers and spare power supplies are pulled out and reused to keep other data centres running.',
      },
      {
        title: 'Responsible Recycling',
        tag: 'Responsible Recycling',
        description:
          'Damaged or outdated servers are broken down into gold, silver, copper and steel, then recycled in the UK under certified WEEE processes.',
      },
    ],
    faqs: [
      {
        question: 'What is server collection UK?',
        answer:
          'A specialist company removes your old servers from your site, wipes or shreds the drives and recycles or reuses the hardware. You get certificates to prove it.',
      },
      {
        question: 'How do I dispose of old servers safely?',
        answer:
          'Use a certified provider. They log every drive, destroy the data properly and give you paperwork for your audit records.',
      },
      {
        question: 'Is it safe to resell old servers?',
        answer:
          'Yes, as long as every drive is wiped or removed first. We clear the data to a certified standard and give you a certificate before anything is resold.',
      },
      {
        question: 'Can you collect servers from a data centre or colocation site?',
        answer:
          'Yes. We handle the de-racking, packing and transport, and sort out site access with your colocation provider.',
      },
      {
        question: 'Do you destroy hard drives as well as wipe them?',
        answer:
          'Yes. Drives that can be wiped are wiped with verification. The rest are shredded, and each one is logged by serial number.',
      },
      {
        question: 'Is it legal to throw away old servers in the UK?',
        answer:
          'No. Servers are electrical waste (WEEE) and hold data covered by UK GDPR, so they must go through an authorised disposal route.',
      },
      {
        question: 'Do you pay for old servers?',
        answer:
          'Often, yes. Servers and parts that still have resale value can earn you money back, which can offset the cost of collection.',
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
