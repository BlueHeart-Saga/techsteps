import { createClient } from '@sanity/client';
import fs from 'node:fs';

const conf = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8'));
const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: conf.authToken,
  useCdn: false
});

const collectionServicesDocs = [
  // 1. Computer Collection
  {
    _id: 'srv-computer-collection',
    _type: 'service',
    title: 'Computer Collection Services UK',
    slug: { _type: 'slug', current: 'computer-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Business desktop computers and workstations prepared for secure collection',
    summary: 'We arrange a suitable collection time, gather laptops and desktop computers from your premises, and make sure each item is handled and accounted for.',
    customerProblem: 'Outdated or redundant office computers take up valuable space and pose severe data breach hazards if storage drives are not sanitised to verifiable standards.',
    solution: 'Techsteps provides certified, GPS-tracked collection of desktop PCs, Small Form Factor systems, workstations, and associated peripherals, backed by firmware-level data sanitisation and serialized certificates.',
    heroTag: 'ACCEPTED COMPUTER EQUIPMENT',
    heroTitle: 'Computer Collection Services UK',
    heroDescription: 'We arrange a suitable collection time, gather laptops and desktop computers from your premises, and make sure each item is handled and accounted for.',
    aboutBadge: 'ACCEPTED COMPUTER EQUIPMENT',
    aboutTitle: 'Types of Computers We Collect',
    aboutParagraphs: [
      'Our computer collection covers a variety of equipment found in business environments, including everyday office computers, employee laptops, specialist workstations and associated hardware.',
      'We handle large-scale corporate office refreshes, multi-floor decommissioning, and single-department upgrades with minimal disruption to your daily operations.'
    ],
    aboutBullets: [
      'Standard desktop PCs, towers, Small Form Factor (SFF) and Mini PCs',
      'Standard business laptops, ultrabooks and mobile workstations',
      'CAD, engineering, graphic design and high-performance computing workstations',
      'Keyboards, mice, docking stations, laptop chargers, RAM and internal components'
    ],
    whyTitle: 'DATA SECURITY & DRIVE SANITISATION',
    whySubtitle: 'Protecting Business Data During Computer Collection',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Secure Data Erasure & Destruction',
        description: 'Hard drives and SSDs are identified for secure data erasure or physical destruction, depending on the agreed service.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Asset Identification & Label Removal',
        description: 'Equipment details are recorded, with company labels, asset tags and identification stickers removed where required.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Collection Records & Documentation',
        description: 'Relevant asset records and supporting documentation help businesses maintain clear records of their collected computer equipment.'
      }
    ],
    processBadge: 'OUR COLLECTION PROCESS',
    processTitle: 'How Our Computer Collection Process Works',
    processSubtitle: 'We keep computer collections straightforward, from initial arrangements to the handling of equipment after collection.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Collection Planning',
        description: 'We discuss the type and quantity of computers, collection location and preferred date to arrange a suitable collection.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'On-Site Collection',
        description: 'Our team collects laptops, desktop PCs, workstations and associated equipment directly from your business premises.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Safe Handling & Transportation',
        description: 'Each item is carefully handled, loaded and prepared for transportation to avoid unnecessary damage during transit.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Equipment Assessment',
        description: 'Collected computers are checked and recorded, with data-bearing devices identified for the appropriate data sanitisation or destruction process.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Records & Documentation',
        description: 'Relevant collection records and supporting documentation are provided to help your business keep track of its retired computer equipment.'
      }
    ],
    keyBenefits: [
      'Free nationwide collection for 10+ qualifying items',
      'Firmware-level data sanitisation to NIST 800-88 & ADISA standards',
      'Duty of Care Waste Transfer Notes and serialized Certificates of Destruction',
      '100% zero-landfill commitment with circular parts recovery'
    ],
    capabilities: [
      'Environment Agency Registered Upper Tier Waste Carrier',
      'BS 7858 security-vetted personnel & GPS-tracked vehicles',
      'ADISA & BS EN 15713 certified data destruction processes',
      'ISO 9001, ISO 14001 & ISO 27001 accredited facility management'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What types of computers do you collect from businesses?',
        answer: 'We collect a range of business computers, including desktop PCs, laptops, workstations, all-in-one systems, mini PCs and associated computer equipment.',
        tag: 'Equipment'
      },
      {
        _key: 'faq_2',
        question: 'Do you offer computer collection services across the UK?',
        answer: 'Yes, we arrange computer collections for businesses across the UK, depending on the collection location, equipment quantity and service requirements.',
        tag: 'Coverage'
      },
      {
        _key: 'faq_3',
        question: 'How do I arrange a computer collection for my business?',
        answer: 'You can contact our team with your collection location, equipment details and approximate quantity. We can then discuss your requirements and arrange a suitable collection.',
        tag: 'Booking'
      },
      {
        _key: 'faq_4',
        question: 'What happens to computers after they are collected?',
        answer: 'Collected computers are assessed to determine whether they are suitable for reuse, refurbishment, component recovery or responsible recycling.',
        tag: 'Process'
      },
      {
        _key: 'faq_5',
        question: 'Is my business data protected during computer collection?',
        answer: 'Data-bearing devices are identified for appropriate data sanitisation or destruction. The process depends on the storage device condition and the agreed data security requirements.',
        tag: 'Security'
      },
      {
        _key: 'faq_6',
        question: 'Can you collect large quantities of office computers at once?',
        answer: 'Yes, we can discuss collections involving multiple computers, office equipment clearances and larger IT asset replacements based on the volume and location.',
        tag: 'Volume'
      },
      {
        _key: 'faq_7',
        question: 'Do you provide documentation after collecting business computers?',
        answer: 'Relevant collection records and supporting documentation can be provided to help businesses maintain equipment records and track their retired IT assets.',
        tag: 'Compliance'
      }
    ],
    metaTitle: 'Computer Collection Services UK | Techsteps',
    metaDescription: 'Techsteps provides computer collection services UK businesses can rely on for collecting redundant desktop PCs, workstations and other IT equipment.',
    noIndex: false
  },

  // 2. Laptop Collection
  {
    _id: 'srv-laptop-collection',
    _type: 'service',
    title: 'Laptop Collection Services UK',
    slug: { _type: 'slug', current: 'laptop-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Corporate enterprise laptops and notebooks ready for collection',
    summary: 'We collect your old business laptops from anywhere in the UK, wipe them securely and send you the certificate to prove it. No fuss, no stress.',
    customerProblem: 'Remote workforces and mobile laptops present unique logistical and data security risks, with sensitive corporate information stored across diverse mobile hardware.',
    solution: 'Our nationwide laptop collection service securely gathers, tracks, and wipes employee laptops and workstations with firmware-level sanitisation, battery safety protocols, and certified audit trails.',
    heroTag: 'ACCEPTED HARDWARE SPECIFICATIONS',
    heroTitle: 'Laptop Collection Services UK',
    heroDescription: 'We collect your old business laptops from anywhere in the UK, wipe them securely and send you the certificate to prove it. No fuss, no stress.',
    aboutBadge: 'ACCEPTED HARDWARE SPECIFICATIONS',
    aboutTitle: 'Laptops & Workstations We Collect with Our Laptop Collection Services UK',
    aboutParagraphs: [
      'Whether you’re running a company-wide refresh, getting devices back from remote staff or clearing out a mixed stockpile, our laptop collection services UK cover businesses, schools, healthcare providers of every size.'
    ],
    aboutBullets: [
      'Dell Latitude and XPS laptops, Lenovo ThinkPad and ThinkBook laptops, HP EliteBook and ProBook notebooks',
      'Apple MacBooks (M1, M2, M3 and Intel models, T2-chip & Apple silicon Macs still locked to MDM)',
      'CAD workstations such as Dell Precision, HP ZBook, and rugged field laptops like Panasonic Toughbook',
      'Thunderbolt and USB-C docking stations, original power adapters, privacy screens, and padded laptop bags'
    ],
    whyTitle: 'CONFIDENTIALITY & GOVERNANCE',
    whySubtitle: 'Laptop Data Security & Battery Safety You Can Trust',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Secure Data Erasure',
        description: 'Modern laptops often have storage soldered straight onto the motherboard. We wipe every drive at firmware level to NIST 800-88 standards, so no company data is left behind.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Safe Battery Handling',
        description: 'Our team checks every laptop on collection and places any faulty battery in a fire-retardant container, following ADR transport guidance.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'MDM & BIOS Lock Checks',
        description: 'We check for Apple MDM profiles, Intune registrations and BIOS passwords, so every laptop is fully released from your company systems and ready to be reused or recycled.'
      }
    ],
    processBadge: 'HOW THE LAPTOP COLLECTION PROCESS WORKS',
    processTitle: 'Our Laptop Collection Process',
    processSubtitle: 'Our laptop collection services in the UK keep every device accounted for, from your office door to the final certificate.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Tell Us What You Have & Pick a Date',
        description: 'Share your rough laptop numbers, systems, and building access details. We’ll confirm a slot and send the right vehicle.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Careful Packing at Your Site',
        description: 'We pack each laptop on the spot in foam-lined cases and cushioned boxes, protecting screens, casings and batteries.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Sealed and Tracked in Transit',
        description: 'Sealed boxes travel in tracked vehicles with a signed Duty of Care note, straight to our secure wiping facility.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Scanned In & Securely Wiped',
        description: 'We barcode-scan each laptop on arrival, then wipe it with multiple overwrite passes and check to confirm nothing is left behind.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Full Paperwork for Your Records',
        description: 'You get an audit pack with serial numbers, asset tags, condition reports and a data destruction certificate for every laptop.'
      }
    ],
    keyBenefits: [
      'Nationwide collection for single sites or multi-branch offices',
      'NIST 800-88 certified wiping for soldered SSDs & NVMe storage',
      'ADR-compliant lithium-ion battery safety and handling',
      'Full MDM release assistance for Intune, Jamf, and Apple Business Manager'
    ],
    capabilities: [
      'Certified erasure verification with serialized certificates',
      'BS 7858 vetted logistics drivers & tamper-evident containers',
      'Component-level harvesting and circular economy remarketing',
      'WEEE transfer documentation and Scope 3 carbon reduction metrics'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What are laptop collection services UK?',
        answer: 'A specialist company collects your unwanted business laptops, wipes the data and reuses or recycles them. You get paperwork to prove it.',
        tag: 'Overview'
      },
      {
        _key: 'faq_2',
        question: 'How do I dispose of old business laptops safely?',
        answer: 'Use a certified collection provider. They wipe the data properly and give you an erasure certificate for your records.',
        tag: 'Security'
      },
      {
        _key: 'faq_3',
        question: 'Do I need to wipe my laptops before collection?',
        answer: 'No, we do it for you. Every laptop is securely wiped and you get a certificate for each one.',
        tag: 'Preparation'
      },
      {
        _key: 'faq_4',
        question: 'Is it legal to throw away old laptops in the UK?',
        answer: 'No. Laptops are electrical waste (WEEE) and hold data covered by UK GDPR, so they must be disposed of through an authorised route.',
        tag: 'Legal'
      },
      {
        _key: 'faq_5',
        question: 'Can you collect laptops from more than one location?',
        answer: 'Yes. We can collect from several sites in one booking and send you one combined report.',
        tag: 'Logistics'
      },
      {
        _key: 'faq_6',
        question: 'What happens to the laptops after collection?',
        answer: 'They’re scanned in and wiped. Laptops with life left are reused, the rest are recycled, and unwipeable drives are destroyed.',
        tag: 'Lifecycle'
      },
      {
        _key: 'faq_7',
        question: 'Do you collect broken or damaged laptops?',
        answer: 'Yes. Working, faulty, cracked or swollen-battery laptops are all accepted, and damaged batteries are handled safely.',
        tag: 'Condition'
      }
    ],
    metaTitle: 'Laptop Collection Services UK | Techsteps',
    metaDescription: 'Looking for laptop collection services UK? Techsteps collects redundant business laptops and notebooks, with careful handling and responsible reuse or recycling.',
    noIndex: false
  },

  // 3. Server Collection
  {
    _id: 'srv-server-collection',
    _type: 'service',
    title: 'Server Collection UK: Secure Collection for Enterprise Servers',
    slug: { _type: 'slug', current: 'server-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Data centre rackmount servers and blade chassis prepared for decommissioning',
    summary: 'Secure UK collection for old rackmount servers, blade enclosures, storage arrays and network equipment, with full tracking and certified data wiping.',
    customerProblem: 'Decommissioning data centres and enterprise server rooms requires delicate de-racking, heavy lifting, and cryptographic destruction of massive enterprise storage arrays.',
    solution: 'Our security-cleared engineers handle complete de-racking, barcoding, flight-case transit, and verified multi-pass drive wiping or physical drive shredding for mission-critical infrastructure.',
    heroTag: 'ENTERPRISE SERVER HARDWARE',
    heroTitle: 'Server Collection UK: Secure Collection for Enterprise Servers',
    heroDescription: 'Secure UK collection for old rackmount servers, blade enclosures, storage arrays and network equipment, with full tracking and certified data wiping.',
    aboutBadge: 'DATA CENTRE & SERVER ROOM HARDWARE',
    aboutTitle: 'Server Hardware We Collect with Our Server Collection UK Service',
    aboutParagraphs: [
      'We take servers out of data centres, colocation suites and server rooms, from de-racking and packing to safe transport, so your team doesn’t have to lift a thing.'
    ],
    aboutBullets: [
      '1U, 2U and 4U rackmount servers (Dell PowerEdge, HPE ProLiant, Cisco UCS and Lenovo ThinkSystem)',
      'Blade server enclosures, individual blade modules, and high-density GPU AI servers',
      'SAN controllers, disk shelves (NetApp, Dell EMC, Pure Storage), multi-bay NAS & tape libraries',
      'Core & distribution switches (Cisco, Arista, Juniper), firewalls (Fortinet, Palo Alto) & cabling',
      'Rackmount UPS systems, PDUs, transfer switches, 42U/48U racks, blanking panels and KVM switches'
    ],
    whyTitle: 'HIGH-SECURITY CHAIN OF CUSTODY & DATA SANITISATION',
    whySubtitle: 'Enterprise Security Built for Mission-Critical Data',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Every Drive Logged and Wiped',
        description: 'Large storage arrays can hold hundreds of drives. We record each one by serial number, then either wipe it with verified sanitisation or shred it to 6mm particles.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Vetted, Trained Collection Staff',
        description: 'Everyone on our team is DBS checked and security vetted. They’re trained in data centre access rules, anti-static handling, and looking after confidential equipment.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Dedicated, Tracked Vehicles',
        description: 'Your servers never share a vehicle with general freight. They travel in GPS-tracked vehicles with locked cargo areas, straight to our secure facility.'
      }
    ],
    processBadge: 'HOW THE SERVER COLLECTION PROCESS WORKS',
    processTitle: 'Our Server Collection Process',
    processSubtitle: 'Our server collection UK process clears your racks without disturbing any live equipment next to them, and gives you proof at every stage.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Review Your Kit & Arrange Site Access',
        description: 'We go through your asset list, rack layouts and site security rules. We then sort out building clearance and loading dock access with your colocation provider.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Careful De-Racking by Cleared Engineers',
        description: 'Our security-cleared engineers safely power down, disconnect and remove each server. Every cable bundle and chassis gets its own barcode label.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Padded Cases & Tamper-Proof Seals',
        description: 'Servers go into foam-lined flight cases and are locked with numbered tamper-evident seals before they leave the server room.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Secure Wiping & Drive Shredding',
        description: 'At our secure facility, every SAS, SATA and NVMe drive is wiped with multiple passes or physically shredded, with a certificate logged for each one.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Complete Asset Report for Your Records',
        description: 'Your compliance team gets a full asset register covering serial numbers, CPU and RAM specs, drive status and WEEE recycling paperwork.'
      }
    ],
    keyBenefits: [
      'Turnkey de-racking and cable decoupling by security-screened engineers',
      'On-site drive destruction or certified cryptographic erasure',
      'Maximum financial rebate on server CPUs, ECC memory, and disk shelves',
      'Zero downtime to neighboring live colocation rack infrastructure'
    ],
    capabilities: [
      'Foam-lined shock-absorbent flight cases & anti-static transit',
      'ADISA, ISO 27001 & BS EN 15713 accredited sanitisation facility',
      'Full itemised asset registers with serial numbers and component specifications',
      'Colocation provider coordination (Equinix, Telehouse, Virtus, Digital Realty)'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What is server collection UK?',
        answer: 'A specialist company removes your old servers from your site, wipes or shreds the drives and recycles or reuses the hardware. You get certificates to prove it.',
        tag: 'Overview'
      },
      {
        _key: 'faq_2',
        question: 'How do I dispose of old servers safely?',
        answer: 'Use a certified provider. They log every drive, destroy the data properly and give you paperwork for your audit records.',
        tag: 'Security'
      },
      {
        _key: 'faq_3',
        question: 'Is it safe to resell old servers?',
        answer: 'Yes, as long as every drive is wiped or removed first. We clear the data to a certified standard and give you a certificate before anything is resold.',
        tag: 'Remarketing'
      },
      {
        _key: 'faq_4',
        question: 'Can you collect servers from a data centre or colocation site?',
        answer: 'Yes. We handle the de-racking, packing and transport, and sort out site access with your colocation provider.',
        tag: 'Data Centre'
      },
      {
        _key: 'faq_5',
        question: 'Do you destroy hard drives as well as wipe them?',
        answer: 'Yes. Drives that can be wiped are wiped with verification. The rest are shredded, and each one is logged by serial number.',
        tag: 'Destruction'
      },
      {
        _key: 'faq_6',
        question: 'Is it legal to throw away old servers in the UK?',
        answer: 'No. Servers are electrical waste (WEEE) and hold data covered by UK GDPR, so they must go through an authorised disposal route.',
        tag: 'Legal'
      },
      {
        _key: 'faq_7',
        question: 'Do you pay for old servers?',
        answer: 'Often, yes. Servers and parts that still have resale value can earn you money back, which can offset the cost of collection.',
        tag: 'Rebate'
      }
    ],
    metaTitle: 'Server Collection Services UK | Techsteps',
    metaDescription: 'Techsteps offers server collection services UK businesses can use to manage redundant servers, networking equipment and retired IT hardware responsibly.',
    noIndex: false
  },

  // 4. Mobile Device Collection
  {
    _id: 'srv-mobile-device-collection',
    _type: 'service',
    title: 'Business Mobile and Tablet Collection Services UK',
    slug: { _type: 'slug', current: 'mobile-device-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Smartphones, enterprise tablets, and handheld scanners sorted for collection',
    summary: 'We collect your unused company phones, tablets and handheld scanners from anywhere in the UK, wipe them securely and give you the paperwork to prove it.',
    customerProblem: 'Smartphones and tablets store critical corporate credentials, emails, and biometric access codes, and factory resets often leave recoverable artifacts.',
    solution: 'We collect corporate smartphone fleets, iPads, Android tablets, and rugged warehouse terminals, applying certified mobile erasure software and checking MDM, iCloud, and Knox locks.',
    heroTag: 'ENTERPRISE MOBILE TECHNOLOGY WE COLLECT',
    heroTitle: 'Business Mobile and Tablet Collection Services UK',
    heroDescription: 'We collect your unused company phones, tablets and handheld scanners from anywhere in the UK, wipe them securely and give you the paperwork to prove it.',
    aboutBadge: 'ENTERPRISE MOBILE TECHNOLOGY',
    aboutTitle: 'Mobile Devices We Collect with Our Mobile Collection Services UK',
    aboutParagraphs: [
      'We collect mixed phone fleets, warehouse handhelds and spare executive handsets from businesses, logistics depots and healthcare providers, however many you have.'
    ],
    aboutBullets: [
      'iPhones from any year, Samsung Galaxy Enterprise Edition phones, Google Pixel business handsets, rugged site phones',
      'iPad, iPad Air, iPad Mini and iPad Pro models, Samsung Galaxy Tab standard & Active tablets, Microsoft Surface Go',
      'Barcode scanners from Zebra, Honeywell, Datalogic, rugged stock terminals, RFID readers and portable printers',
      'Multi-bay charging cradles, docking stations, original chargers, USB-C/Lightning cables, tough cases, and spare batteries'
    ],
    whyTitle: 'DATA PROTECTION, IMEI AUDITING & MDM PROTOCOLS',
    whySubtitle: 'Mobile Security Ensuring Zero Corporate Data Leakage',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Certified Data Wipe',
        description: 'We use specialist mobile erasure software to factory reset every device and overwrite its internal storage, so nothing can be recovered afterwards.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'MDM, iCloud & Knox Lock Checks',
        description: 'We check each device for Apple iCloud Activation Lock, Samsung Knox restrictions and Google FRP, so it is fully released from your company systems.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'SIM & SD Card Removal',
        description: 'We find and remove every SIM card and memory card on arrival, then shred them, and we clear any eSIM profiles, so no data or network access is left behind.'
      }
    ],
    processBadge: 'HOW THE MOBILE COLLECTION PROCESS WORKS',
    processTitle: 'Our Mobile Collection Process',
    processSubtitle: 'Our mobile collection services UK keep every device tracked and checked from your office to the final report.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Tell Us What You Have & Arrange a Date',
        description: 'Share your rough device numbers, brands and MDM status. We’ll plan a quick, secure collection that fits around your sites.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Safe Packing at Your Site',
        description: 'We pack phones and tablets into foam-lined cases with individual slots, keeping screens scratch-free while they’re moved.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Sealed and Tracked in Transit',
        description: 'Cases are sealed with numbered security ties and travel in GPS-tracked vehicles, with signed paperwork, to our secure facility.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Checked In & Securely Wiped',
        description: 'We scan every IMEI and serial number, test each device and wipe it with certified mobile erasure software.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Full Report for Your Records',
        description: 'You get an itemised list showing make, model, IMEI, serial number, condition grade and wipe confirmation for every device.'
      }
    ],
    keyBenefits: [
      'Full IMEI and serial number tracking across all mobile assets',
      'Certified erasure exceeding standard factory resets',
      'Shredding of physical SIM cards and microSD media',
      'Competitive residual rebates on corporate smartphones and tablets'
    ],
    capabilities: [
      'Foam-lined multi-slot transport cases for screen protection',
      'Comprehensive release verification (iCloud, Knox, Android FRP, MDM)',
      'Parts harvesting for broken or cracked-screen handsets',
      'Environment Agency compliant circular precious metal recovery'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What are mobile collection services UK?',
        answer: 'A specialist company collects your unused business phones and tablets, wipes the data and reuses or recycles them. You get paperwork to prove it.',
        tag: 'Overview'
      },
      {
        _key: 'faq_2',
        question: 'How do I dispose of old company phones safely?',
        answer: 'Use a certified provider. They wipe every device, check it’s released from your MDM and give you a certificate for your records.',
        tag: 'Security'
      },
      {
        _key: 'faq_3',
        question: 'How do I wipe a work phone before recycling it?',
        answer: 'A factory reset isn’t always enough. We use certified erasure software to overwrite the storage, so nothing can be recovered.',
        tag: 'Erasure'
      },
      {
        _key: 'faq_4',
        question: 'Can you collect phones that are still locked to our MDM?',
        answer: 'Yes. We check for MDM, iCloud Activation Lock, Samsung Knox and Google FRP, and help you release each device before it’s reused or recycled.',
        tag: 'MDM'
      },
      {
        _key: 'faq_5',
        question: 'What happens to the SIM and SD cards?',
        answer: 'We remove every SIM and memory card on arrival and shred them. Any eSIM profiles are cleared too.',
        tag: 'Storage'
      },
      {
        _key: 'faq_6',
        question: 'Is it legal to throw away old phones and tablets in the UK?',
        answer: 'No. They’re electrical waste (WEEE) and hold data covered by UK GDPR, so they must go through an authorised disposal route.',
        tag: 'Legal'
      },
      {
        _key: 'faq_7',
        question: 'Do you pay for old business phones and tablets?',
        answer: 'Often, yes. Devices that still work can have resale value, which can offset the cost of collection.',
        tag: 'Rebate'
      }
    ],
    metaTitle: 'Mobile Phone Collection Services UK | Techsteps',
    metaDescription: 'Arrange mobile phone collection services UK businesses can rely on. Techsteps collects redundant business phones for data handling, reuse and recycling.',
    noIndex: false
  },

  // 5. Monitor & Screen Collection
  {
    _id: 'srv-monitor-screen-collection',
    _type: 'service',
    title: 'Monitor Collection Services UK: Safe Collection for Business Monitors',
    slug: { _type: 'slug', current: 'monitor-screen-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Office desktop computer monitors and curved screens ready for collection',
    summary: 'Safe UK collection for old computer monitors, dual-screen setups, ultrawide displays, with careful handling and full compliance paperwork.',
    customerProblem: 'Office screens are fragile, bulky, and older CCFL units contain hazardous materials like mercury that require specialist WEEE treatment.',
    solution: 'Techsteps provides safe, padded roll-cage collection for corporate displays, ultrawide monitors, and commercial screens with rigorous pixel testing and zero-landfill glass recovery.',
    heroTag: 'DISPLAY TECHNOLOGY & SCREENS WE COLLECT',
    heroTitle: 'Monitor Collection Services UK: Safe Collection for Business Monitors',
    heroDescription: 'Safe UK collection for old computer monitors, dual-screen setups, ultrawide displays, with careful handling and full compliance paperwork.',
    aboutBadge: 'DISPLAY TECHNOLOGY & SCREENS',
    aboutTitle: 'Monitors and Screens We Collect with Our Monitor Collection Services UK',
    aboutParagraphs: [
      'We collect office monitors, curved screens, touchscreens and digital signage from businesses of every size, whether it’s a few spare screens or a whole floor’s worth.'
    ],
    aboutBullets: [
      '21-inch to 27-inch LED and LCD monitors, height-adjustable Dell, HP and Lenovo screens',
      '34-inch to 49-inch curved ultrawide monitors, colour-accurate 4K & 5K design screens, medical imaging displays',
      'Interactive touchscreens, self-service kiosk displays, digital signage and customer-facing retail screens',
      'Single, dual and quad monitor arms, original baseplates, DisplayPort, HDMI, USB-C, DVI and IEC power cables'
    ],
    whyTitle: 'SAFE HANDLING & RESPONSIBLE DISPLAY RECYCLING',
    whySubtitle: 'Fragile Screen Protection and Hazardous Waste Compliance',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Safe Handling & Waste Management',
        description: 'Some older monitors, particularly CCFL-backlit models, contain small amounts of mercury. These displays need appropriate handling and disposal in line with relevant waste regulations.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Careful Screen Packaging',
        description: 'Monitors can easily crack or become damaged during transportation. We handle and pack displays carefully, keeping them separated to reduce pressure and avoid unnecessary damage.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Complete Equipment Recording',
        description: 'We also account for associated items such as power adapters, connection cables and detachable stands, keeping the collected equipment together and properly recorded.'
      }
    ],
    processBadge: 'HOW THE MONITOR COLLECTION PROCESS WORKS',
    processTitle: 'Our Monitor Collection Process',
    processSubtitle: 'Our monitor collection services in the UK take the risk out of moving fragile glass screens, so nothing cracks on the way out of your building.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Tell Us What You Have & Book a Slot',
        description: 'Share how many monitors you have, their rough sizes and whether the stands are attached. We’ll book a collection time that fits your loading bay.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Careful Screen Packing On-Site',
        description: 'We pack every screen using foam dividers, screen protectors and padded roll cages, so the glass stays safe while it’s cleared from your office.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Strapped In & Fully Documented',
        description: 'Monitors are loaded onto tail-lift vehicles and strapped down securely. A Duty of Care waste transfer note is signed on site before we leave.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Tested, Graded & Sorted',
        description: 'At our facility, we unpack each monitor, check the panel for dead pixels and sort it for reuse or certified recycling.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Reports for Your Records',
        description: 'You get a full list of makes, models, screen sizes and recycling weights, ready for your company’s ESG reporting.'
      }
    ],
    keyBenefits: [
      'Tail-lift vehicles with foam screen dividers to eliminate cracks in transit',
      'Compliant handling of mercury-bearing CCFL displays and LED backlights',
      'Clean separation of plastics, circuit boards, and leaded panel glass',
      'Detailed weight and carbon diversion reports for ESG compliance'
    ],
    capabilities: [
      'Padded roll-cages and dedicated anti-scratch blankets',
      'Component harvesting for display panels, power boards, and monitor stands',
      'Environment Agency Waste Transfer Notes issued on collection day',
      'Refurbishment and resale of grade-A enterprise screens'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What types of monitors do you collect?',
        answer: 'We collect LCD, LED, LCD flat-panel monitors, desktop displays and business-use screens.',
        tag: 'Types'
      },
      {
        _key: 'faq_2',
        question: 'Do you collect monitors from business premises?',
        answer: 'Yes, we arrange monitor collections directly from offices, workplaces and other business locations.',
        tag: 'Locations'
      },
      {
        _key: 'faq_3',
        question: 'Can you collect large quantities of monitors?',
        answer: 'Yes, we can discuss bulk collections involving multiple monitors and office display equipment.',
        tag: 'Volume'
      },
      {
        _key: 'faq_4',
        question: 'What happens to monitors after collection?',
        answer: 'Collected monitors are assessed for reuse, refurbishment, component recovery or responsible recycling.',
        tag: 'Processing'
      },
      {
        _key: 'faq_5',
        question: 'Do you collect damaged or broken monitors?',
        answer: 'Yes, we can collect damaged, faulty and non-working monitors for appropriate processing and recycling.',
        tag: 'Condition'
      },
      {
        _key: 'faq_6',
        question: 'How should monitors be prepared for collection?',
        answer: 'Monitors should be disconnected from power and other devices. Associated cables and accessories can be kept together.',
        tag: 'Preparation'
      },
      {
        _key: 'faq_7',
        question: 'Can you collect monitor cables and accessories too?',
        answer: 'Yes, we can also collect compatible power adapters, display cables, stands and other monitor accessories.',
        tag: 'Accessories'
      }
    ],
    metaTitle: 'Monitor Collection Services UK | Techsteps',
    metaDescription: 'Choose Techsteps for monitor collection services UK businesses need. We collect redundant office displays for assessment, reuse and responsible recycling.',
    noIndex: false
  },

  // 6. Printer & Copier Collection
  {
    _id: 'srv-printer-copier-collection',
    _type: 'service',
    title: 'Printer Collection Services UK',
    slug: { _type: 'slug', current: 'printer-copier-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Commercial office multifunction photocopiers and laser printers ready for collection',
    summary: 'Reliable UK-wide collection for redundant office printers, multifunction photocopiers and large-format plotters with careful handling, secure transportation, and data protection.',
    customerProblem: 'Heavy floor-standing multifunction copiers pose physical relocation challenges, spill risks from toner reservoirs, and data exposures via internal hard drives.',
    solution: 'Techsteps provides heavy-duty logistics, internal hard drive sanitisation, toner spill containment, and complete lease return manifests for office print fleets.',
    heroTag: 'PRINTERS & PRINTING EQUIPMENT WE COLLECT',
    heroTitle: 'Printer Collection Services UK',
    heroDescription: 'Reliable UK-wide collection for redundant office printers, multifunction photocopiers and large-format plotters with careful handling, secure transportation, and data protection.',
    aboutBadge: 'PRINTERS & PRINTING EQUIPMENT',
    aboutTitle: 'Types of Printing Equipment We Collect',
    aboutParagraphs: [
      'Our printer collection services UK cover a range of business printing equipment, from everyday office printers and photocopiers to large printing systems used in design.'
    ],
    aboutBullets: [
      'Commercial floor-standing multifunction copiers (MFPs) and wide-format plotters',
      'Desktop office laser printers, workgroup printers and network scanners',
      'Production print equipment, continuous paper feeders, and high-speed envelope printers',
      'Detachable paper trays, toner cartridges, print servers, and interface cables'
    ],
    whyTitle: 'PRINTER DATA SECURITY & SAFE HANDLING',
    whySubtitle: 'Protecting Stored Data and Preventing Environmental Spills',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Internal Hard Drive Data Erasure',
        description: 'Multifunction printers may contain internal hard drives that store copies of scanned and printed documents. These storage devices are identified for the appropriate data erasure or destruction process.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Toner Handling & Safe Transportation',
        description: 'We take care to secure toner cartridges and detachable containers to reduce spills during collection and transportation.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Lease Returns & Collection Records',
        description: 'We can discuss removal arrangements, internal data handling and relevant collection records to support the equipment return process.'
      }
    ],
    processBadge: 'OUR PRINTER COLLECTION PROCESS',
    processTitle: 'How Our Printer Collection Process Works',
    processSubtitle: 'Office printers and photocopiers can be difficult to move due to their size, weight and delicate internal parts. We organise each collection with suitable handling and transportation arrangements.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Equipment Details & Collection Planning',
        description: 'We discuss your printer models, equipment quantity, collection location and site access. This helps us plan the right collection arrangements for your business.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'On-Site Preparation & Handling',
        description: 'Our collection team prepares the equipment for removal, disconnects printers where required and secures loose trays, cables and other detachable parts before moving them.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Safe Loading & Transportation',
        description: 'Printers and photocopiers are carefully moved from their original locations and loaded onto suitable collection vehicles to reduce the risk of damage during transportation.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Internal Data Storage & Security',
        description: 'Some multifunction printers store scanned documents and other information on internal hard drives. These storage devices are identified for the appropriate data erasure or destruction process.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Collection Records & Documentation',
        description: 'Equipment details are recorded during collection, with relevant documentation provided to help businesses track their retired printers and understand their reuse or recycling route.'
      }
    ],
    keyBenefits: [
      'Tail-lift vehicles with heavy-duty stair-climbers and pallet handling gear',
      'Physical extraction or multi-pass wiping of copier hard drives',
      'Toner drum containment preventing hazardous toner powder release',
      'Full lease return sign-off and serial number validation'
    ],
    capabilities: [
      'Trained heavy-equipment logistics personnel',
      'Component harvesting for fuser units, laser assemblies, and motors',
      'Zero-landfill WEEE recycling of plastics, metals, and wiring',
      'Environment Agency compliant waste transfer documentation'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What types of printers do you collect from businesses?',
        answer: 'We collect office printers, laser printers, multifunction printers, photocopiers, wide-format plotters and commercial printing equipment.',
        tag: 'Types'
      },
      {
        _key: 'faq_2',
        question: 'Do you offer printer collection services across the UK?',
        answer: 'Yes, we arrange printer collections for businesses across the UK, depending on the collection location and equipment requirements.',
        tag: 'Coverage'
      },
      {
        _key: 'faq_3',
        question: 'Can you collect large commercial printers and photocopiers?',
        answer: 'Yes, we can discuss collections involving large photocopiers, floor-standing multifunction printers and other heavy printing equipment.',
        tag: 'Commercial'
      },
      {
        _key: 'faq_4',
        question: 'What happens to printers after collection?',
        answer: 'Collected printers are assessed for refurbishment, reuse, component recovery or responsible recycling, depending on their condition.',
        tag: 'Processing'
      },
      {
        _key: 'faq_5',
        question: 'Is data stored inside multifunction printers?',
        answer: 'Some multifunction printers contain internal hard drives that may store scanned documents and other business information.',
        tag: 'Data'
      },
      {
        _key: 'faq_6',
        question: 'Can you collect damaged or non-working printers?',
        answer: 'Yes, we can discuss collecting faulty, damaged and non-working printers for suitable recycling and material recovery.',
        tag: 'Condition'
      },
      {
        _key: 'faq_7',
        question: 'Do you provide documentation after printer collection?',
        answer: 'Relevant collection records and supporting documentation can be provided to help businesses keep track of their collected printing equipment.',
        tag: 'Documentation'
      }
    ],
    metaTitle: 'Printer Collection Services UK | Techsteps',
    metaDescription: 'Techsteps provides printer collection services UK businesses need for collecting redundant office printers, photocopiers and commercial printing equipment.',
    noIndex: false
  },

  // 7. AV & Media Equipment Collection
  {
    _id: 'srv-av-media-equipment-collection',
    _type: 'service',
    title: 'AV & Media Equipment Collection',
    slug: { _type: 'slug', current: 'av-media-equipment-collection' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Commercial audio visual hardware, video conferencing gear, and studio equipment',
    summary: 'Specialist UK collection for corporate audio visual equipment, video conferencing units, digital displays, and commercial studio hardware with certified data cleansing and responsible recycling.',
    customerProblem: 'Corporate boardrooms and multimedia spaces hold high-value conferencing units, projection arrays, and broadcast gear that contain sensitive configuration data and network credentials.',
    solution: 'Techsteps handles de-installation, firmware resets, screen protection, and circular remarketing or WEEE dismantling for corporate AV and broadcast hardware.',
    heroTag: 'COMMERCIAL AV & MULTIMEDIA SYSTEMS',
    heroTitle: 'Commercial AV & Media Equipment Collection Services',
    heroDescription: 'Compliant collection, data cleansing and responsible recycling for commercial AV systems, projectors, interactive screens, video conferencing hardware, and media production gear.',
    aboutBadge: 'AUDIO VISUAL & BROADCAST SYSTEMS',
    aboutTitle: 'Commercial AV Equipment We Collect',
    aboutParagraphs: [
      'TechSteps provides secure collection and sustainable disposal for corporate boardrooms, auditorium audio systems, video conference suites, and broadcasting hardware.',
      'We ensure video codecs, room controllers, and digital displays are sanitized of internal configurations, meeting histories, and network credentials.'
    ],
    aboutBullets: [
      'Interactive touch displays, digital whiteboards, video walls, and meeting room displays',
      'Video conferencing units (Cisco Webex, Poly, Microsoft Teams Rooms, Zoom Rooms, Logitech)',
      'High-lumen laser projectors, ultra-short-throw systems, motorized screens, and mounts',
      'Commercial audio processors, DSPs, amplifiers, mixers, ceiling microphone arrays, and studio hardware'
    ],
    whyTitle: 'DATA CLEARING & HIGH-VALUE RECOVERY',
    whySubtitle: 'Protecting Meeting Room Credentials and Unlocking Hardware Value',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Meeting Configuration Erasure',
        description: 'Complete purging of SIP profiles, room logs, calendar credentials, and cloud tokens from video conferencing codecs.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'High-Value Remarketing Rebates',
        description: 'Specialist testing and resale channels for premium broadcast, studio, and commercial boardroom technology.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'WEEE Certified Materials Recovery',
        description: 'Environmentally sound reclamation of optical lenses, power modules, high-grade metals, and copper wiring.'
      }
    ],
    processBadge: 'HOW OUR AV COLLECTION WORKS',
    processTitle: 'Turnkey AV Decommissioning & Collection',
    processSubtitle: 'From site audit to certified resale or recycling, our technicians handle every aspect of corporate multimedia removal.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Technical Inventory Review',
        description: 'We review makes, models, mounting specifications, and access considerations for your boardroom or studio setup.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Careful De-installation',
        description: 'Trained technicians disconnect, dismount, and pack delicate optics, screens, and racks into cushioned flight cases.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Secure GPS Transit',
        description: 'Direct transport in company-owned, tracked vehicles straight to our accredited processing facility.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Testing & Cryptographic Sanitisation',
        description: 'Hardware is stress-tested, reset to factory defaults, and internal storage devices are erased to NIST 800-88 standards.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Audit Pack & Rebate Documentation',
        description: 'You receive itemised asset registers, Certificates of Sanitisation, and remarketing return statements.'
      }
    ],
    keyBenefits: [
      'Comprehensive erasure of video meeting history and network secrets',
      'Safe removal of ceiling-mounted projectors and heavy video walls',
      'Specialist resale channels delivering maximum return on capital',
      'Environment Agency compliant WEEE duty-of-care documentation'
    ],
    capabilities: [
      'Engineers trained in professional broadcast and AV de-rigging',
      'Anti-static flight cases and custom screen protection crating',
      'ADISA & BS EN 15713 certified data sanitisation processes',
      'Full ESG carbon savings calculation for Scope 3 emissions reporting'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What types of AV equipment do you collect?',
        answer: 'We collect video conferencing codecs, commercial displays, projectors, audio mixers, microphone arrays, studio gear, and digital signage.',
        tag: 'Equipment'
      },
      {
        _key: 'faq_2',
        question: 'Do video conference units store confidential data?',
        answer: 'Yes. Meeting codecs often cache network credentials, SIP account details, phonebooks, and historical call logs which we completely wipe.',
        tag: 'Security'
      },
      {
        _key: 'faq_3',
        question: 'Can you dismount wall displays and ceiling projectors?',
        answer: 'Yes, our teams can provide complete de-installation services for boardroom displays, video walls, and ceiling-hung projectors.',
        tag: 'De-rigging'
      },
      {
        _key: 'faq_4',
        question: 'Do you offer rebates on high-end commercial AV equipment?',
        answer: 'Yes. Premium gear from Cisco, Poly, Shure, Crestron, and Panasonic retains high secondary market demand, and we offer competitive financial returns.',
        tag: 'Rebates'
      },
      {
        _key: 'faq_5',
        question: 'What happens to obsolete or non-functional AV gear?',
        answer: 'Non-working units are dismantled under UK WEEE processes, recovering valuable metals, optical glass, and high-grade plastics.',
        tag: 'Recycling'
      },
      {
        _key: 'faq_6',
        question: 'Do you provide waste transfer notes for AV equipment?',
        answer: 'Yes, an Environment Agency compliant Waste Transfer Note and itemised collection receipt are provided on pickup.',
        tag: 'Compliance'
      },
      {
        _key: 'faq_7',
        question: 'Is there a minimum collection quantity for AV equipment?',
        answer: 'Collections of 10 or more qualifying IT and AV items are typically free of charge across mainland UK.',
        tag: 'Booking'
      }
    ],
    metaTitle: 'AV & Media Equipment Collection UK | Techsteps',
    metaDescription: 'Specialist AV and media equipment collection services across the UK. Secure removal of corporate displays, conference tech, and multimedia assets.',
    noIndex: false
  },

  // 8. Explore All Equipment
  {
    _id: 'srv-all-equipement',
    _type: 'service',
    title: 'Explore All Equipment',
    slug: { _type: 'slug', current: 'all-equipement' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'Comprehensive directory of all business IT hardware collected by TechSteps',
    summary: 'Comprehensive nationwide directory of all business IT equipment collected and recycled by TechSteps. Laptops, desktops, enterprise servers, mobile fleets, monitors, printers, AV hardware, and backup media.',
    customerProblem: 'Organisations undergoing office clearances, data centre migrations, or fleet refreshes often have mixed hardware inventories and need a single provider who can collect everything in one go.',
    solution: 'TechSteps provides a unified, single-source collection service across all 8 major enterprise hardware streams, with guaranteed chain of custody, data wiping, and zero landfill disposal.',
    heroTag: 'FULL HARDWARE DIRECTORY',
    heroTitle: 'Explore All IT Equipment & Hardware We Collect',
    heroDescription: 'Comprehensive directory of all business IT equipment collected by TechSteps. Free nationwide collection for qualifying UK organisations with 10 or more eligible devices.',
    aboutBadge: 'ACCEPTANCE DIRECTORY',
    aboutTitle: 'All Business Hardware Categories Accepted',
    aboutParagraphs: [
      'TechSteps collects and responsibly manages the entire spectrum of corporate IT hardware from offices, schools, NHS healthcare facilities, and mission-critical data centres across the UK.',
      'From single executive workstations to thousands of remote laptops and multi-rack enterprise server arrays, our logistics infrastructure handles collections of every scale.'
    ],
    aboutBullets: [
      'Laptops, Notebooks, MacBooks & Mobile Workstations',
      'Desktop PCs, Towers, Mini PCs & All-in-Ones',
      'Enterprise Rack Servers, Blade Enclosures & Storage SANs',
      'Mobile Phones, Tablets & Logistics Handheld Scanners',
      'Business Monitors, Ultrawide Screens & Interactive Panels',
      'Multifunction Office Printers & Large-Format Plotters',
      'Commercial Audio-Visual Gear & Conference Hardware',
      'Network Switches, Routers, Firewalls & Server Racks'
    ],
    whyTitle: 'WHY BUSINESSES CHOOSE TECHSTEPS',
    whySubtitle: 'Security, Sustainability, and Financial Value in One Partnership',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Free Nationwide Pickup',
        description: 'Zero collection fees for 10 or more qualifying devices across England, Scotland, Wales and Northern Ireland.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'Complete Chain of Custody',
        description: 'Vetted drivers, GPS-monitored vehicles, and serialized asset inventories tracking every single serial number.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Zero-Landfill Commitment',
        description: 'Strict refurbishment-first circular framework, maximizing equipment lifespan and raw material recovery.'
      }
    ],
    processBadge: 'HOW TO GET STARTED',
    processTitle: 'Simple 5-Step Collection Process',
    processSubtitle: 'We streamline IT asset disposition so your internal IT teams can focus on core business operations.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Check Your Inventory',
        description: 'Assemble a rough estimate of laptops, PCs, servers, screens, or peripherals for collection.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Book a Collection Online',
        description: 'Select your preferred collection date, access instructions, and specific data sanitisation requirements.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Security-Cleared Pickup',
        description: 'Our BS 7858 vetted personnel arrive, pack equipment safely, and issue signed transfer documentation.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Accredited Sanitisation',
        description: 'Drives are erased to NIST 800-88 standards or physically shredded in our secure facility.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Compliance & Audit Pack',
        description: 'Receive full serialized asset reports, Certificates of Destruction, and carbon diversion metrics.'
      }
    ],
    keyBenefits: [
      'All 8 commercial hardware streams collected in a single coordinated pickup',
      'Free collection for 10+ devices across all 26 UK regional hubs',
      'ADISA, ISO 27001 & Environment Agency certified compliance',
      'Comprehensive ESG reporting on Scope 3 carbon savings'
    ],
    capabilities: [
      'GPS-tracked vehicles with hydraulic tail lifts and roll cages',
      'Certified multi-pass disk wiping & high-torque mobile shredding',
      'Component-level harvesting for circular electronics repair',
      'Full asset auditing with manufacturer serial number logs'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'Do you offer free IT collection across the entire UK?',
        answer: 'Yes, TechSteps provides free collection for businesses and public sector organisations nationwide when you have 10 or more qualifying devices.',
        tag: 'Free Pickup'
      },
      {
        _key: 'faq_2',
        question: 'What hardware qualifies for free collection?',
        answer: 'Laptops, desktop computers, servers, storage arrays, switches, mobile phones, and tablets all qualify towards the 10-device threshold.',
        tag: 'Eligibility'
      },
      {
        _key: 'faq_3',
        question: 'Can you collect monitors and printers along with PCs?',
        answer: 'Yes. Once the qualifying threshold of core computing equipment is met, we collect all associated screens, printers, cables, and accessories.',
        tag: 'Peripherals'
      },
      {
        _key: 'faq_4',
        question: 'How do you guarantee data security for collected equipment?',
        answer: 'All data-bearing drives undergo certified firmware erasure to NIST 800-88 or physical mechanical shredding, with serialized certificates issued.',
        tag: 'Security'
      },
      {
        _key: 'faq_5',
        question: 'Can you collect from multiple regional offices?',
        answer: 'Yes. We coordinate simultaneous multi-site collections across the UK with unified reporting and a single account manager.',
        tag: 'Multi-site'
      },
      {
        _key: 'faq_6',
        question: 'What compliance paperwork is provided?',
        answer: 'You receive an Environment Agency Waste Transfer Note, an itemised asset register, and a certified Certificate of Data Destruction.',
        tag: 'Audit'
      },
      {
        _key: 'faq_7',
        question: 'How do I book a collection?',
        answer: 'You can book directly via our online pickup form, call our operations desk, or request a custom quotation for enterprise projects.',
        tag: 'Booking'
      }
    ],
    metaTitle: 'Explore All IT Equipment & Devices We Collect | TechSteps UK',
    metaDescription: 'Comprehensive directory of all business IT equipment collected by TechSteps. Laptops, desktops, servers, mobile fleets, monitors, printers, AV hardware and storage media.',
    noIndex: false
  },

  // 9. Book a Free Pickup
  {
    _id: 'srv-book-pickup',
    _type: 'service',
    title: 'Book a Free Pickup',
    slug: { _type: 'slug', current: 'book-pickup' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'TechSteps security-screened driver and GPS-tracked logistics vehicle',
    summary: 'Book certified, carbon-neutral IT asset collection for your organisation across the UK. Choose from Free Nationwide Collection (10+ devices), Witnessed On-Site Destruction, or Tracked Courier Boxes.',
    customerProblem: 'Booking corporate IT disposal is often slow, fragmented across multiple providers, and lacks transparent scheduling or immediate booking confirmation.',
    solution: 'TechSteps provides an intuitive, 3-mode booking platform backed by rapid 24-48 hour driver allocation, vetted personnel, and automated booking reference generation.',
    heroTag: 'INSTANT ONLINE BOOKING',
    heroTitle: 'Book a Free Corporate IT Collection',
    heroDescription: 'Book certified, carbon-neutral IT asset collection for your organisation across the UK. Fast booking, security-vetted drivers, and guaranteed zero-landfill disposal.',
    aboutBadge: 'THREE LOGISTICS MODES',
    aboutTitle: 'Flexible Collection Modes Tailored to Your Business',
    aboutParagraphs: [
      'Whether you need a full office clearance of desktop PCs and monitors, witnessed on-site hard drive shredding, or secure courier boxes for remote workers, TechSteps delivers.',
      'All bookings receive an instant digital reference number and dedicated logistics coordinator to confirm arrival windows and access protocols.'
    ],
    aboutBullets: [
      'Free Collection: Zero charge for 10+ qualifying laptops, computers, or servers nationwide',
      'Witnessed On-Site Destruction: High-security shredding truck clears storage drives right outside your door',
      'Tracked Courier Boxes: Heavy-duty foam boxes sent to hybrid staff for secure remote returns',
      'Rapid scheduling within 24 to 48 hours across all major UK metro hubs'
    ],
    whyTitle: 'UNCOMPROMISING GOVERNANCE',
    whySubtitle: 'Certified Trust from Collection to Final Audit Pack',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'BS 7858 Vetted Staff',
        description: 'Every collection operative is DBS checked and security screened to British Standard 7858.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'GPS-Tracked Solid Fleet',
        description: 'Our vehicles feature solid-bulkhead cargo holds, slam locks, and continuous telematics monitoring.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: 'Audit-Proof Certification',
        description: 'Serialized certificates of destruction and Environment Agency transfer notes satisfy UK GDPR and ISO audits.'
      }
    ],
    processBadge: 'BOOKING WORKFLOW',
    processTitle: 'Four Simple Steps to Confirmed Pickup',
    processSubtitle: 'Booking your corporate IT asset collection takes less than two minutes.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Select Collection Mode',
        description: 'Choose Free Collection (10+ devices), On-Site Witnessed Destruction, or Remote Courier Box.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'Specify Quantities & Dates',
        description: 'Enter your approximate hardware count, collection address, and preferred pickup date.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Driver Arrival & Manifesting',
        description: 'Our vetted driver arrives, loads the equipment into secure roll cages, and signs the transfer manifest.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Receive Audit Pack',
        description: 'Your compliance team receives serialized certificates of destruction and ESG carbon savings reports.'
      }
    ],
    keyBenefits: [
      'Instant online booking with automated reference generation',
      'Free collection for 10 or more qualifying IT assets',
      'Witnessed on-premise mobile shredding options available',
      'Nationwide coverage with timed arrival windows'
    ],
    capabilities: [
      'Dedicated corporate logistics desk managing complex multi-site bookings',
      'ADISA-certified data sanitisation with serial number reconciliation',
      'Pre-labelled tamper-evident boxes for distributed workforce returns',
      'Consolidated ESG and Scope 3 carbon savings certificates'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'How do I qualify for a free IT collection?',
        answer: 'You qualify for completely free collection when you have 10 or more core devices such as laptops, desktop PCs, or servers.',
        tag: 'Free Service'
      },
      {
        _key: 'faq_2',
        question: 'How fast can TechSteps collect from our premises?',
        answer: 'Within core UK regions, collections can typically be scheduled within 24 to 48 hours. Urgent same-day slots can also be arranged.',
        tag: 'Speed'
      },
      {
        _key: 'faq_3',
        question: 'What information do I need to book a collection?',
        answer: 'You simply need your site address, contact details, preferred collection date, and an approximate count of devices.',
        tag: 'Requirements'
      },
      {
        _key: 'faq_4',
        question: 'Can you collect from high-security buildings or data centres?',
        answer: 'Yes. Our operatives are BS 7858 vetted and we regularly coordinate security passes, loading dock bookings, and RAMS documentation.',
        tag: 'Security'
      },
      {
        _key: 'faq_5',
        question: 'What happens if we have fewer than 10 devices?',
        answer: 'For smaller quantities, we provide low-emission consolidated pickups or our Tracked Courier Box service for remote employees.',
        tag: 'Small Batches'
      },
      {
        _key: 'faq_6',
        question: 'Are collection vehicles secure and tracked?',
        answer: 'Yes, every vehicle in our fleet is company-owned, solid-sided, fitted with slam locks, and tracked via real-time GPS telemetry.',
        tag: 'Logistics'
      },
      {
        _key: 'faq_7',
        question: 'When will I receive the Certificate of Destruction?',
        answer: 'Certificates of Data Destruction and serialized inventory registers are issued within 5 to 7 working days following processing.',
        tag: 'Certification'
      }
    ],
    metaTitle: 'Book an IT Equipment Pickup | Free, On-Site & Box Services | TechSteps',
    metaDescription: 'Book an IT equipment collection. Choose from Free Nationwide Collection for 10+ devices, Witnessed On-Site Destruction, or Tracked Courier Boxes for remote teams.',
    noIndex: false
  },

  // 10. Collection Overview
  {
    _id: 'srv-collection-overview',
    _type: 'service',
    title: 'Collection Overview',
    slug: { _type: 'slug', current: 'collection-overview' },
    division: { _type: 'reference', _ref: 'div-it' },
    heroAlt: 'TechSteps corporate IT collection hub and secure logistics fleet',
    summary: 'Certified nationwide collection for corporate computers, laptops, servers, mobile devices, monitors, printers, and AV equipment with chain of custody and WEEE compliance.',
    customerProblem: 'UK businesses face strict UK GDPR liabilities, rising commercial waste regulations, and ESG compliance mandates when retiring surplus IT hardware.',
    solution: 'TechSteps provides an end-to-end IT lifecycle collection service combining rapid logistics, certified data destruction, maximum component remarketing, and guaranteed zero-landfill recycling.',
    heroTag: 'NATIONWIDE IT HARDWARE COLLECTION',
    heroTitle: 'IT Equipment Collection Services UK',
    heroDescription: 'Certified nationwide collection for corporate computers, laptops, servers, mobile devices, monitors, printers, and AV equipment with unbroken chain of custody and WEEE compliance.',
    aboutBadge: 'LIFECYCLE MANAGEMENT',
    aboutTitle: 'Nationwide End-to-End IT Equipment Collection',
    aboutParagraphs: [
      'TechSteps helps organisations across the UK safely retire, wipe, and recycle redundant technology with zero compromise on data security or statutory compliance.',
      'From corporate headquarters in London to manufacturing hubs across the Midlands and Scotland, our logistics fleet operates daily to keep redundant assets secure.'
    ],
    aboutBullets: [
      'Laptops, Workstations & Mobile Computing Fleets',
      'Data Centre Servers, SAN Arrays & Enterprise Network Switches',
      'Corporate Smartphones, Tablets & Warehouse Barcode Handhelds',
      'Desktop Monitors, Commercial Displays & Boardroom AV Equipment',
      'Multifunction Photocopiers, Office Printers & Plotters',
      'Backup Tapes, Loose Hard Drives & Removable Media for Destruction'
    ],
    whyTitle: 'THE TECHSTEPS ADVANTAGE',
    whySubtitle: 'Certified Information Governance and Circular Sustainability',
    whyPoints: [
      {
        _key: 'wp_1',
        number: '01',
        title: 'Unbroken Chain of Custody',
        description: 'Barcoded tamper-evident security roll cages and GPS-tracked logistics guarantee end-to-end traceability.'
      },
      {
        _key: 'wp_2',
        number: '02',
        title: 'ADISA & NIST 800-88 Standards',
        description: 'Multi-pass cryptographic overwriting and high-torque mechanical shredding eliminate data breach exposure.'
      },
      {
        _key: 'wp_3',
        number: '03',
        title: '100% Zero-Landfill WEEE',
        description: 'Refurbishment-first policy with certified circular recycling of all base plastics, circuitry, and metals.'
      }
    ],
    processBadge: 'COLLECTION ARCHITECTURE',
    processTitle: 'Rigorous End-to-End Governance Model',
    processSubtitle: 'Every step is audited, documented, and certified for compliance.',
    processSteps: [
      {
        _key: 'ps_1',
        stepNumber: '01',
        title: 'Scoping & Scheduling',
        description: 'Our team evaluates your hardware quantities, data sensitivity, and building access constraints to dispatch the ideal vehicle.'
      },
      {
        _key: 'ps_2',
        stepNumber: '02',
        title: 'On-Site Custody Transfer',
        description: 'Security-cleared operatives pack equipment into sealed roll cages and sign an Environment Agency Waste Transfer Note.'
      },
      {
        _key: 'ps_3',
        stepNumber: '03',
        title: 'Dedicated Transport',
        description: 'Direct transit in alarmed, GPS-tracked vehicles directly to our accredited facility.'
      },
      {
        _key: 'ps_4',
        stepNumber: '04',
        title: 'Sanitisation & Testing',
        description: 'Asset tags are removed, drives are wiped to NIST 800-88 standards or shredded, and hardware is graded.'
      },
      {
        _key: 'ps_5',
        stepNumber: '05',
        title: 'Audit Pack Issuance',
        description: 'Serialized asset manifests, Certificates of Destruction, and carbon savings documentation are sent to your compliance team.'
      }
    ],
    keyBenefits: [
      'Single nationwide partner for all corporate IT, document, and media destruction',
      'Free collection for 10+ qualifying devices throughout the UK',
      'Environment Agency registered upper tier waste carrier (CBDU491295)',
      'Granular Scope 3 carbon savings reports for corporate ESG audits'
    ],
    capabilities: [
      'National fleet of low-emission GPS-tracked vehicles with hydraulic tail lifts',
      'Security-cleared crews vetted to BS 7858 and DBS checked',
      'Accredited facilities certified to ISO 9001, ISO 14001, and ISO 27001',
      'Dedicated client portal providing 24/7 access to certificates and audit archives'
    ],
    faqs: [
      {
        _key: 'faq_1',
        question: 'What types of IT equipment do you collect?',
        answer: 'We collect all business IT hardware: laptops, desktop computers, rack servers, storage arrays, networking gear, monitors, phones, tablets, printers, and peripherals.',
        tag: 'Scope'
      },
      {
        _key: 'faq_2',
        question: 'How do you ensure data security during transit?',
        answer: 'All equipment is transported in dedicated, GPS-tracked, solid-sided vehicles by BS 7858 security-vetted drivers in sealed, tamper-evident roll cages.',
        tag: 'Transit'
      },
      {
        _key: 'faq_3',
        question: 'Are collection services free of charge?',
        answer: 'Yes, collections are completely free for businesses and public sector organisations across the UK when you have 10 or more qualifying devices.',
        tag: 'Pricing'
      },
      {
        _key: 'faq_4',
        question: 'What documentation do we receive after collection?',
        answer: 'You receive an Environment Agency Waste Transfer Note, an itemised asset inventory with serial numbers, a Certificate of Destruction, and an ESG Carbon Offset Certificate.',
        tag: 'Certificates'
      },
      {
        _key: 'faq_5',
        question: 'Can you handle multiple site collections simultaneously?',
        answer: 'Yes, our corporate logistics desk regularly coordinates multi-office refreshes across dozens of regional branches simultaneously with unified reporting.',
        tag: 'Multi-site'
      },
      {
        _key: 'faq_6',
        question: 'What happens to equipment that cannot be reused?',
        answer: 'Items unsuitable for reuse are dismantled into constituent materials (plastics, circuit boards, precious metals, and steel) under UK WEEE regulations with 0% landfill diversion.',
        tag: 'Recycling'
      },
      {
        _key: 'faq_7',
        question: 'How do I arrange a collection for my business?',
        answer: 'You can book online via our collection portal, call our operations desk on +44 1784 640216, or email collection@techsteps.co.uk.',
        tag: 'Booking'
      }
    ],
    metaTitle: 'IT Equipment Collection Services UK | Techsteps',
    metaDescription: 'Secure, certified nationwide collection for corporate computers, laptops, servers, and office IT equipment with full chain of custody and ESG reporting.',
    noIndex: false
  }
];

async function seed() {
  console.log('🚀 Starting Sanity Collection Services Seeding...\n');

  for (const doc of collectionServicesDocs) {
    console.log(`Writing service doc: ${doc._id} (${doc.title})...`);
    const res = await client.createOrReplace(doc);
    console.log(`  ✓ Synced successfully: ${res._id} - ${res.title}`);
  }

  const finalCount = await client.fetch('count(*[_type == "service"])');
  console.log(`\n🎉 Done! Total services in Sanity: ${finalCount}`);
}

seed().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
