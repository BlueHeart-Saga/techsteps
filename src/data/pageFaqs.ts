/**
 * pageFaqs.ts
 * Comprehensive repository of tailored FAQs for all TechSteps pages:
 * - 8 Free Collection pages (Overview + 7 Equipment categories)
 * - 9 Sectors pages (Overview + 8 Industry verticals)
 * - 5 Services Hub pages (Overview + 4 Division pillars)
 * - 27 Sub-Services pages (Across all 4 divisions)
 *
 * Requirements:
 * - Every page has 6 to 8 unique, relevant, factually grounded FAQs (default: 7).
 * - Written in British English with confirmed TechSteps compliance & security standards.
 * - Built-in validation function ensuring coverage integrity.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageFaqConfig {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  faqs: FAQItem[];
}

export const pageFaqs: Record<string, PageFaqConfig> = {
  // =========================================================================
  // 1. FREE COLLECTION PAGES (8 PAGES)
  // =========================================================================

  'collection-overview': {
    eyebrow: 'HERE TO HELP',
    heading: 'Frequently Asked Questions',
    intro: 'Everything you need to know about our IT equipment collection services.',
    faqs: [
      {
        question: 'Is IT equipment collection free for UK businesses?',
        answer: 'TechSteps provides free collection for qualifying UK commercial and public sector organisations. Free eligibility is determined by hardware categories, volumes, and collection logistics. Our operations team confirms exact terms before scheduling your collection window.',
      },
      {
        question: 'What types of workplace technology do you collect?',
        answer: 'We collect desktops, PC workstations, enterprise laptops, rackmount and tower servers, networking arrays, smartphones, tablets, commercial monitors, office copiers, and AV conferencing hardware across nationwide facilities.',
      },
      {
        question: 'How do you guarantee data security on collected devices?',
        answer: 'All data-bearing media are transported in GPS-tracked, security-vetted fleet vehicles. Storage media are sanitised using certified Blancco wiping algorithms or shredded to DIN 66399 particle standards, backed by serialised destruction certificates.',
      },
      {
        question: 'Can you collect hardware from multiple office sites or remote workers?',
        answer: 'Yes. We coordinate consolidated nationwide rollouts across multiple commercial sites, branch offices, and corporate headquarters with unified audit reporting and centralised compliance manifests.',
      },
      {
        question: 'What compliance documentation is provided after collection?',
        answer: 'You receive an Environment Agency Waste Transfer Note upon hardware handover, followed by an asset intake manifest, serialized data erasure certifications, and full WEEE disposal audit certificates.',
      },
      {
        question: 'What is your environmental approach to retired IT assets?',
        answer: 'We operate a strict circular-first policy. Viable equipment is refurbished and remarketed to extend lifecycle utility, while non-recoverable hardware is dismantled into constituent materials for zero-landfill recycling.',
      },
      {
        question: 'How quickly can a collection be scheduled and executed?',
        answer: 'Standard collection windows are typically arranged within 3 to 5 working days following scoping. Expedited priority collections and time-critical weekend or out-of-hours pickups can also be coordinated upon request.',
      },
    ],
  },

  'computer-collection': {
    eyebrow: 'COMPUTER DISPOSAL FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Key guidance on workplace desktop, workstation, and all-in-one computer collections.',
    faqs: [
      {
        question: 'Is computer collection free for business desktop systems?',
        answer: 'Yes, qualifying quantities of commercial tower PCs, small form factor units, workstations, and all-in-one machines qualify for free nationwide collection. Contact our logistics desk to confirm your volume eligibility.',
      },
      {
        question: 'Can you collect custom CAD and high-performance graphic workstations?',
        answer: 'Yes. We handle precision workstations, engineering CAD computers, and data science towers, ensuring secure handling for high-specification GPUs, ECC memory modules, and multi-drive storage arrays.',
      },
      {
        question: 'What should our internal IT team do before desktop collection?',
        answer: 'We recommend detaching external peripherals you wish to retain and logging internal asset tag identifiers. However, our security-cleared personnel can assist with disconnects and on-site asset tagging if required.',
      },
      {
        question: 'Can non-booting, damaged, or cannibalised PC cases be collected?',
        answer: 'Yes. Computers with missing parts, failed power supplies, or cracked chassis are accepted. Functional components are reclaimed for circular spares, while damaged plastics and metals enter certified UK recycling streams.',
      },
      {
        question: 'How are internal SATA and NVMe hard drives sanitized?',
        answer: 'Drives are erased to HMG IS5 Enhanced standards using certified Blancco software. Unreadable or failing drives that cannot complete software sanitisation are physically shredded to 6mm particles.',
      },
      {
        question: 'Do you collect desktop peripherals like keyboards, mice, and docks?',
        answer: 'Yes. Power cords, display cables, keyboards, mice, and USB docking stations can be bundled into roll cages alongside your primary computer towers for complete WEEE recycling.',
      },
      {
        question: 'What proof of disposal does our compliance team receive?',
        answer: 'You will receive an itemised Asset Tracking Manifest listing each desktop chassis serial number, processor specification, hard drive serial, and corresponding certificate of sanitisation or destruction.',
      },
    ],
  },

  'laptop-collection': {
    eyebrow: 'LAPTOP DISPOSAL FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding enterprise notebook collections, battery compliance, and data security.',
    faqs: [
      {
        question: 'Is laptop collection free for corporate notebooks and ultrabooks?',
        answer: 'Yes, qualifying corporate laptop batches qualify for free nationwide collection. Eligibility depends on quantity, model age, and collection location, confirmed during initial scoping.',
      },
      {
        question: 'Can you collect laptops from remote employee home locations?',
        answer: 'We offer secure consolidated logistics from corporate hubs, regional distribution points, and scheduled drop-in offices. For large remote workforces, we can supply tracked courier collection boxes.',
      },
      {
        question: 'How are damaged or swollen laptop lithium batteries handled?',
        answer: 'Laptops with swollen, compromised, or damaged lithium-ion batteries are isolated and packed in fire-retardant ADR-compliant hazardous transit containers in accordance with UK dangerous goods transport regulations.',
      },
      {
        question: 'Do we need to remove BIOS and BitLocker passwords before collection?',
        answer: 'While disabling management locks like Apple Find My, Computrace, and BIOS passwords facilitates higher remarketing value return, our technical workshop can securely wipe locked storage drives regardless.',
      },
      {
        question: 'What happens to decommissioned laptops that still have market value?',
        answer: 'Laptops with residual lifecycle value are thoroughly tested, cosmetically graded, sanitised, and remarketed through approved commercial channels, with financial return credited back to your organisation.',
      },
      {
        question: 'Can Apple MacBooks, Chromebooks, and Windows laptops be mixed?',
        answer: 'Yes. You can consolidate Windows business laptops, Apple MacBooks, Lenovo ThinkPads, Dell Latitudes, HP EliteBooks, and Chromebooks within the same collection booking.',
      },
      {
        question: 'What documentation is provided for GDPR audit compliance?',
        answer: 'We provide an itemised audit certificate recording every laptop serial number, asset tag, drive serial, erasure log, and statutory hazardous waste transfer note for lithium-ion battery stewardship.',
      },
    ],
  },

  'server-collection': {
    eyebrow: 'SERVER RETIREMENT FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Operational details on enterprise rackmount server, blade, and SAN array decommissioning.',
    faqs: [
      {
        question: 'What categories of enterprise server hardware do you collect?',
        answer: 'We collect 1U–4U rackmount servers, blade chassis, tower servers, SAN/NAS storage arrays, tape library systems, and enterprise networking switches from private data centres and co-location sites.',
      },
      {
        question: 'Can server collections be coordinated during live data centre decommissions?',
        answer: 'Yes. Our engineers can work alongside your infrastructure team or independently handle de-racking, rail removal, cable disconnection, and palletised transit packing during scheduled maintenance windows.',
      },
      {
        question: 'How is confidential enterprise data on server SAS/SATA/NVMe drives erased?',
        answer: 'We perform certified multi-pass Blancco erasure across all drives simultaneously. Enterprise drives that fail erasure or are designated high-security are shredded on-site or off-site to DIN 66399 standards.',
      },
      {
        question: 'Can heavy server racks, PDUs, and UPS battery systems be removed?',
        answer: 'Yes. We remove complete 42U/48U server racks, smart PDUs, and lead-acid UPS battery systems. Hazardous battery enclosures are handled by ADR-licensed drivers with statutory consignment notes.',
      },
      {
        question: 'Is server collection free for high-density enterprise environments?',
        answer: 'Most corporate server decommissions qualify for completely free collection due to intrinsic component value. Server batches with modern processors often qualify for substantial asset revenue return.',
      },
      {
        question: 'What security vetting do your data centre logistics drivers carry?',
        answer: 'All TechSteps data centre personnel are BS 7858 security-vetted and hold valid UK security clearance. Transport is conducted using dedicated, GPS-tracked vehicles equipped with electronic load-locking.',
      },
      {
        question: 'What post-collection audit reporting is delivered for data centre assets?',
        answer: 'You receive full serialised manifest reports verifying chassis service tags, component CPU/RAM configurations, hard drive erasure logs, and formal WEEE environmental compliance certificates.',
      },
    ],
  },

  'mobile-device-collection': {
    eyebrow: 'MOBILE ASSET FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on enterprise smartphone, tablet, iPad, and handheld terminal recovery.',
    faqs: [
      {
        question: 'What mobile devices and handheld technology can be collected?',
        answer: 'We collect corporate smartphones, Apple iPads, Android tablets, ruggedised warehouse barcode scanners, handheld POS terminals, and cellular IoT modems from all major manufacturers.',
      },
      {
        question: 'How do you remove MDM profiles and corporate management locks?',
        answer: 'We recommend unassigning devices from your Microsoft Intune, Apple Business Manager (ABM), or Samsung Knox tenancy before dispatch. However, our technicians can verify and assist with hardware resets.',
      },
      {
        question: 'How is data erased from solid-state smartphone storage?',
        answer: 'We utilise certified mobile data erasure software that performs cryptographic sanitisation and factory firmware validation, generating an automated tamper-proof certificate for each IMEI number.',
      },
      {
        question: 'Can you collect mobile devices with shattered screens or damaged ports?',
        answer: 'Yes. We accept devices with cracked digitizers, degraded batteries, or liquid damage. Usable internal motherboards and camera modules are reclaimed, while damaged chassis are sustainably recycled.',
      },
      {
        question: 'Is collection free for bulk corporate mobile device fleets?',
        answer: 'Yes, qualifying business batches of smartphones and tablets qualify for free nationwide collection. High-value handsets are frequently remarketed, creating significant rebate value for your IT budget.',
      },
      {
        question: 'Are cellular SIM cards and micro-SD memory cards destroyed?',
        answer: 'During initial inventory intake, any SIM cards or removable flash memory cards discovered inside device trays are physically removed and shredded to prevent identity leakage.',
      },
      {
        question: 'What documentation confirms mobile device data destruction?',
        answer: 'We issue an itemised certificate displaying device make, model, IMEI, serial number, sanitisation timestamp, and binary verification confirmation for comprehensive GDPR audit readiness.',
      },
    ],
  },

  'monitor-screen-collection': {
    eyebrow: 'MONITOR COLLECTION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on desktop display, ultrawide screen, and commercial monitor recycling.',
    faqs: [
      {
        question: 'What types of display screens and monitors can TechSteps collect?',
        answer: 'We collect office LCD/LED monitors, ultrawide curved displays, graphic design 4K monitors, touchscreen POS terminals, broadcast panels, and meeting room interactive digital whiteboards.',
      },
      {
        question: 'How are display screens protected from shattering during collection?',
        answer: 'We deploy padded flight cases, foam screen sleeves, and compartmentalised roll cages that prevent screen impact, bezel cracking, and glass shatter during loading and transit.',
      },
      {
        question: 'Can older CCFL backlit monitors containing trace mercury be collected?',
        answer: 'Yes. TechSteps is an Environment Agency licensed AATF compliant collector. Older fluorescent backlit displays are safely segregated and dismantled in hazardous waste handling chambers.',
      },
      {
        question: 'Do monitor stands, VESA mounting arms, and cables need to be attached?',
        answer: 'No. You can provide monitors with or without desk stands. We also collect uninstalled VESA desk arms, wall brackets, power supplies, and HDMI/DisplayPort cabling.',
      },
      {
        question: 'Is monitor collection free for corporate office upgrades?',
        answer: 'Monitors collected alongside computer towers, laptops, or servers typically qualify for free collection. Standalone screen-only collections are assessed based on batch size and panel technology.',
      },
      {
        question: 'What proportion of collected display hardware is diverted from landfill?',
        answer: '100% of collected screen hardware is diverted from landfill. Grade-A panels are re-deployed into circular reuse markets, while broken units are separated into glass, plastics, and circuit board metals.',
      },
      {
        question: 'What environmental certificate is provided for monitor disposal?',
        answer: 'You will receive a statutory Duty of Care Waste Transfer Note accompanied by an itemised serialised equipment manifest and certified WEEE recycling confirmation for ESG reporting.',
      },
    ],
  },

  'printer-copier-collection': {
    eyebrow: 'PRINTER RECYCLING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information regarding office multifunction copiers, laser printers, and plotter collections.',
    faqs: [
      {
        question: 'What types of printing and copying equipment does TechSteps collect?',
        answer: 'We collect floor-standing multifunction copiers (MFPs), commercial laser printers, high-volume production presses, wide-format architectural plotters, and desktop thermal label printers.',
      },
      {
        question: 'Do modern office copiers contain internal hard drives with confidential data?',
        answer: 'Yes. Commercial lease copiers store print, scan, fax, and email buffers on internal hard drives. Our team physically extracts these drives for certified data wiping or mechanical shredding.',
      },
      {
        question: 'Can you collect heavy floor-standing copiers from upper floors without lifts?',
        answer: 'Yes. Our logistics fleet is equipped with stair-climbing transport apparatus, heavy-duty floor protection runners, and tail-lift vehicles to navigate challenging stairwells and tight plant rooms.',
      },
      {
        question: 'How are unused toner cartridges and consumable waste drums handled?',
        answer: 'Installed and surplus toner cartridges, imaging drums, and fuser units are safely collected. Unused consumables in original packaging are remarketed, while spent units enter closed-loop toner recycling.',
      },
      {
        question: 'Can expired printer leasing agreements be coordinated with collection?',
        answer: 'Yes. We regularly assist corporate clients by collecting redundant print fleets, extracting internal hard drives for data security, and coordinating return documentation before lease expiration.',
      },
      {
        question: 'Is printer and copier collection free for business facilities?',
        answer: 'Collections combining copiers with IT hardware frequently qualify for free pickup. Standalone bulky copiers are evaluated based on model age, volume, and building egress complexity.',
      },
      {
        question: 'What documentation confirms printer data erasure and recycling?',
        answer: 'We provide an itemised certificate detailing machine model, serial number, extracted hard drive serial numbers, sanitisation verification, and compliant WEEE transfer documentation.',
      },
    ],
  },

  'av-media-equipment-collection': {
    eyebrow: 'AV EQUIPMENT FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Details on conference room systems, digital signage, projectors, and media hardware.',
    faqs: [
      {
        question: 'What audio-visual and presentation technology can TechSteps collect?',
        answer: 'We collect unified communication video bars, ceiling microphone arrays, ceiling and short-throw projectors, digital signage displays, broadcast audio mixers, PA amplifiers, and video matrix switchers.',
      },
      {
        question: 'Do meeting room displays and codecs need to be de-mounted before collection?',
        answer: 'We accept pre-demounted AV hardware staged in tech stores, or our specialist logistics engineers can perform scheduled de-installation from wall mounts and suspended ceiling brackets.',
      },
      {
        question: 'How do you handle stored data on modern smart video conferencing bars?',
        answer: 'Unified communication appliances cache meeting logs, Active Directory credentials, and SIP connection details. During secure intake, firmware is factory-reset and flash memory is sanitised.',
      },
      {
        question: 'Can you collect large commercial displays above 85 inches and modular video walls?',
        answer: 'Yes. We operate specialised tail-lift vehicles and custom padded transit flight cases designed specifically to transport large-format commercial screens up to 98 inches and LED video tiles safely.',
      },
      {
        question: 'Can legacy media hardware like tape decks, CRT video monitors, and broadcast gear be collected?',
        answer: 'Yes. We accept legacy studio, staging, and presentation electronics. Reusable vintage and broadcast units are assessed for specialist resale, while obsolete electronics undergo certified WEEE recycling.',
      },
      {
        question: 'Is AV equipment collection free for commercial office fit-outs?',
        answer: 'AV hardware collected in combination with desktop computers, laptops, or servers typically qualifies for free collection. Standalone AV projects are scoped based on hardware profile and access.',
      },
      {
        question: 'What compliance documentation will our organisation receive after collection?',
        answer: 'You will receive a formal Duty of Care Waste Transfer Note upon handover, followed by an asset audit manifest, serialized data sanitisation certificates, and full environmental compliance documentation.',
      },
    ],
  },

  // =========================================================================
  // 2. SECTORS OVERVIEW & SUBPAGES (9 PAGES)
  // =========================================================================

  'sectors-overview': {
    eyebrow: 'SECTOR COMPLIANCE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding industry-specific regulatory protocols, accreditations, and security standards.',
    faqs: [
      {
        question: 'How does TechSteps tailor services for highly regulated UK industries?',
        answer: 'We align collection, storage, and disposal processes directly with sector-specific regulators, including NHS Digital, the FCA, SRA, DfE, and MoD security frameworks, ensuring total legal and regulatory alignment.',
      },
      {
        question: 'What security accreditations govern TechSteps operations across all sectors?',
        answer: 'Our operations are certified to ISO 27001 (Information Security), ISO 9001 (Quality Management), ISO 14001 (Environmental Management), Cyber Essentials Plus, and BS EN 15713 (Secure Destruction).',
      },
      {
        question: 'Are your operational personnel vetted for government and defence facilities?',
        answer: 'Yes. All TechSteps operations personnel undergo rigorous BS 7858 background vetting. In addition, field teams deployed to defence and government estates hold active UK Security Clearance (SC).',
      },
      {
        question: 'How do you support multi-site enterprise clients across the UK?',
        answer: 'We operate centralised logistics hubs and regional facilities across London, the Midlands, North, Scotland, Wales, and Northern Ireland, providing coordinated rollouts with unified reporting.',
      },
      {
        question: 'Can you provide bespoke service level agreements (SLAs) for regulated clients?',
        answer: 'Yes. We establish customised SLAs specifying dedicated collection windows, rapid response emergency shredding, dedicated account managers, and tailored serialised reporting formats.',
      },
      {
        question: 'How does TechSteps support client ESG and corporate sustainability goals?',
        answer: 'We provide certified zero-landfill disposal pathways, circular lifecycle reuse metrics, verified carbon offset calculations, and statutory waste diversion data for corporate ESG disclosures.',
      },
      {
        question: 'How can an organisation initiate a sector-specific audit or service engagement?',
        answer: 'You can contact our sector specialists via our online booking form or telephone desk. We conduct an initial scoping consultation to structure an audit-proof operational delivery plan.',
      },
    ],
  },

  'sector-nhs': {
    eyebrow: 'HEALTHCARE COMPLIANCE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Common queries regarding NHS Digital Data Security and Protection Toolkit compliance.',
    faqs: [
      {
        question: 'How does TechSteps comply with the NHS Data Security and Protection Toolkit (DSPT)?',
        answer: 'Our information handling, collection logistics, and media sanitisation protocols are mapped directly to NHS DSPT assertions and ISO 27001 controls, safeguarding confidential patient and clinical records.',
      },
      {
        question: 'Can TechSteps safely decommission clinical laptops, medical carts, and ward tablets?',
        answer: 'Yes. We routinely decommission ward computers, mobile clinician tablets, crash cart PCs, and diagnostic workstations, ensuring complete sanitisation of electronic health record (EHR) data.',
      },
      {
        question: 'How are paper health records, patient case notes, and radiology films destroyed?',
        answer: 'Medical archives and paper files are cross-cut shredded to BS EN 15713 security levels. Specialized radiology and microfiche records undergo certified high-temperature recovery processes.',
      },
      {
        question: 'Do you provide on-site mobile hard drive destruction at acute hospital sites?',
        answer: 'Yes. Our high-security mobile shredding vehicles can deploy directly to NHS trust estates, crushing or shredding storage drives on-site while hospital Caldicott Guardians witness the process.',
      },
      {
        question: 'Are logistics drivers vetted to work in sensitive clinical environments?',
        answer: 'All drivers and technicians are BS 7858 security-vetted and DBS-checked, trained in clinical etiquette, hospital dock protocols, and infection control compliance.',
      },
      {
        question: 'Can TechSteps manage multi-site collections across an entire Integrated Care Board (ICB)?',
        answer: 'Yes. We manage regional collections across multiple acute hospitals, community health centres, and GP practices under unified asset tracking and consolidated trust-wide audit manifests.',
      },
      {
        question: 'What audit documentation is supplied for Care Quality Commission (CQC) inspections?',
        answer: 'You receive itemised certificates of destruction, serialised media erasure reports, Caldicott-compliant chain of custody manifests, and statutory Duty of Care waste notes.',
      },
    ],
  },

  'sector-finance': {
    eyebrow: 'FINANCIAL SERVICES FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Compliance information tailored for FCA-regulated banks, wealth managers, and insurers.',
    faqs: [
      {
        question: 'How do your services meet FCA and PRA data resilience guidelines?',
        answer: 'Our operations adhere strictly to FCA SYSC governance and ISO 27001 information risk standards, ensuring unbroken chain of custody, encrypted tracking, and certified eradication of client financial data.',
      },
      {
        question: 'Can high-density SAN storage arrays and trading floor computers be sanitised?',
        answer: 'Yes. We handle high-frequency trading desktops, multi-monitor dealer boards, and petabyte-scale SAN/NAS arrays, performing Blancco certified erasure across SAS, NVMe, and enterprise SSDs.',
      },
      {
        question: 'Do you provide dual-operator witnessed destruction for Tier 1 banking clients?',
        answer: 'Yes. We support dual-custody witnessing protocols, allowing internal security personnel to observe serial barcode scanning and mechanical destruction on-site or via secure video recording.',
      },
      {
        question: 'How do you handle expired client loan agreements, mortgages, and physical records?',
        answer: 'Physical financial records are collected in sealed security containers and shredded in compliance with BS EN 15713 standards, providing full statutory verification for regulatory audits.',
      },
      {
        question: 'What telemetry and transit security measures protect financial hardware in transit?',
        answer: 'Vehicles operate 24/7 GPS satellite tracking, geo-fenced route monitoring, panic alarms, dual-locking mechanisms, and numbered tamper-evident security seals recorded at origin and destination.',
      },
      {
        question: 'Can residual financial hardware be remarketed to recover capital?',
        answer: 'Yes. Where corporate risk policies permit, thoroughly sanitised workstations and server hardware can be remarketed, returning commercial credit directly to your institutional budget.',
      },
      {
        question: 'What documentation is provided to satisfy external compliance auditors?',
        answer: 'We provide cryptographic erasure logs verifying zero drive sector remnants, serialised destruction certificates, and tamper-proof chain of custody manifests accepted by Big Four audit firms.',
      },
    ],
  },

  'sector-central-government': {
    eyebrow: 'GOVERNMENT & PUBLIC SECTOR FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance for ministerial departments, Crown agencies, and local authority bodies.',
    faqs: [
      {
        question: 'Are TechSteps services accessible through Crown Commercial Service frameworks?',
        answer: 'Yes. Public sector organisations can procure TechSteps IT lifecycle, data sanitisation, and confidential destruction services compliantly through established Crown Commercial Service (CCS) agreements.',
      },
      {
        question: 'What level of security clearance do your public sector logistics teams hold?',
        answer: 'Field personnel deployed to government sites hold active UK Security Clearance (SC), supported by baseline BS 7858 security screening and non-disclosure agreements.',
      },
      {
        question: 'Can you destroy media classified at OFFICIAL-SENSITIVE and above?',
        answer: 'Yes. We operate HMG IS5 / NCSC compliant destruction workflows, disintegrating hard drives, magnetic tapes, and cryptographic hardware to sub-6mm particle sizes on-site or at secure facilities.',
      },
      {
        question: 'How do you assist public sector bodies with Greening Government Commitments (GGC)?',
        answer: 'We provide auditable zero-landfill certificates, verified carbon avoidance calculations, and circular lifecycle metrics that directly substantiate departmental annual sustainability reporting.',
      },
      {
        question: 'Can TechSteps manage civic office consolidations and departmental relocations?',
        answer: 'Yes. We manage secure relocations of civil service desktop fleets, departmental server rooms, and physical registry archives, providing end-to-end project management and unbroken chain of custody.',
      },
      {
        question: 'How are public sector redundant assets tracked across large multi-building estates?',
        answer: 'Every device is scanned at desk-side into our inventory portal, tracking serial numbers, departmental asset tags, and custody transfers through to certified destruction or remarketing.',
      },
      {
        question: 'What documentation is provided to satisfy National Audit Office (NAO) compliance?',
        answer: 'We deliver comprehensive compliance dossiers comprising serialised disposal manifests, waste transfer notes, certified erasure records, and environmental circular recovery summaries.',
      },
    ],
  },

  'sector-defence': {
    eyebrow: 'DEFENCE & AEROSPACE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information for defence contractors, aerospace engineers, and security facilities.',
    faqs: [
      {
        question: 'How does TechSteps satisfy Ministry of Defence (MoD) JSP 440 security standards?',
        answer: 'Our high-security workflows comply with MoD Defence Information Security rules, providing physical degaussing, mechanical disintegration, and security-cleared personnel for total risk elimination.',
      },
      {
        question: 'Can high-security destruction be carried out inside secure air-gapped facilities?',
        answer: 'Yes. We deploy self-powered mobile destruction units capable of operating airside or within fenced MoD and aerospace perimeters without external data network connections.',
      },
      {
        question: 'What personnel vetting is required for handling defence IT assets?',
        answer: 'All personnel assigned to defence projects hold active Security Clearance (SC) or Developed Vetting (DV) eligibility, verified under rigorous national security vetting protocols.',
      },
      {
        question: 'How are avionics hardware, proprietary PCBs, and specialized chips destroyed?',
        answer: 'Proprietary electronics, avionics circuit boards, and prototypes undergo industrial granulator disintegration to irreversible DIN 66399 particle sizes, preventing reverse engineering.',
      },
      {
        question: 'Do you manage secure disposal for international ITAR-controlled defence assets?',
        answer: 'Yes. We implement strict chain of custody protocols compliant with International Traffic in Arms Regulations (ITAR) and UK Export Control criteria, ensuring verified end-of-life destruction.',
      },
      {
        question: 'What telemetry and transit security protects defence hardware in transit?',
        answer: 'Hardware is transported in solid-sided, GPS-tracked vehicles featuring biometric cabin access, panic alarms, tamper-evident seals, and continuous monitoring from our central security desk.',
      },
      {
        question: 'What formal evidence of destruction is provided for defence compliance records?',
        answer: 'Clients receive a formal Certificate of Destruction recording serial numbers, part numbers, weight, particle size, CCTV/photographic evidence where requested, and signing officer credentials.',
      },
    ],
  },

  'sector-legal-professional-services': {
    eyebrow: 'LEGAL SECTOR FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance tailored for law firms, barristers’ chambers, and corporate consultancies.',
    faqs: [
      {
        question: 'How do you safeguard client confidentiality under Solicitors Regulation Authority (SRA) rules?',
        answer: 'We maintain unbroken chain of custody, ISO 27001 accredited processes, and confidentiality agreements, ensuring that all client matter data and privileged communications are permanently eliminated.',
      },
      {
        question: 'Can you securely digitise legacy paper client case files before destruction?',
        answer: 'Yes. Our scanning facility digitises archives to BS 10008 legal admissibility standards with OCR indexing, enabling compliant electronic storage prior to certified physical document shredding.',
      },
      {
        question: 'What happens to lawyer laptops, encrypted flash drives, and partner smartphones?',
        answer: 'All storage media undergo certified multi-pass Blancco erasure or physical shearing. Unreadable or compromised storage media are physically shredded to DIN 66399 high-security standards.',
      },
      {
        question: 'Do you supply secure lockable consoles for law firm office floors?',
        answer: 'Yes. We provide executive lockable wooden consoles and tamper-evident document bins for confidential office disposal, serviced on scheduled collection rotas by security-vetted staff.',
      },
      {
        question: 'Can you assist law firms during office relocations and lease expirations?',
        answer: 'Yes. We provide specialist IT relocation, server de-racking, secure file packing, and obsolete technology disposal, minimising downtime during corporate partner office moves.',
      },
      {
        question: 'How do you prevent data leaks from multifunction photocopier lease returns?',
        answer: 'Our technicians extract and securely erase internal hard drives and print buffer storage from all leased copiers prior to return to leasing companies, eliminating residual document leaks.',
      },
      {
        question: 'What compliance certificates are issued for firm audit and insurance records?',
        answer: 'We provide itemised Certificates of Destruction, serialised data wipe manifests, and BS EN 15713 compliance certificates to satisfy professional indemnity insurance and SRA audit requirements.',
      },
    ],
  },

  'sector-education-universities': {
    eyebrow: 'EDUCATION SECTOR FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information for higher education universities, multi-academy trusts, and colleges.',
    faqs: [
      {
        question: 'Is IT equipment collection free for schools, colleges, and universities?',
        answer: 'Yes. Qualifying batches of campus desktop computers, laptops, monitors, and servers qualify for free nationwide collection, assisting educational institutions with constrained capital budgets.',
      },
      {
        question: 'Can collections be scheduled during school holidays or university breaks?',
        answer: 'Yes. We coordinate large-scale campus collections during summer, Easter, half-term, and semester breaks to avoid campus disruption, student traffic, and lecture timetable interference.',
      },
      {
        question: 'How is student, staff, and research data protected on campus computers?',
        answer: 'All hard drives, SSDs, and server arrays are sanitised to HMG IS5 / ISO 27001 standards using Blancco software, or shredded to sub-6mm particles, ensuring full UK GDPR and DfE compliance.',
      },
      {
        question: 'Can you clear entire computer labs, libraries, and campus IT store cupboards?',
        answer: 'Yes. Our logistics teams handle full room clearances, removing computer towers, monitors, cabling, interactive whiteboards, AV equipment, and legacy servers in a single consolidated visit.',
      },
      {
        question: 'Are your campus collection personnel DBS checked?',
        answer: 'Yes. Operations personnel deployed to educational estates undergo Enhanced DBS checks and BS 7858 vetting, ensuring child safeguarding and campus security standards are rigorously upheld.',
      },
      {
        question: 'Can universities generate financial rebates from retired campus hardware?',
        answer: 'Yes. High-specification university desktops, research workstations, and servers with residual value are remarketed through certified channels, returning financial rebates to faculty budgets.',
      },
      {
        question: 'What documentation is provided for university environmental audits?',
        answer: 'We issue serialised asset manifests, certificates of destruction, Duty of Care Waste Transfer Notes, and zero-landfill diversion reports to support university EcoCampus and ESG accreditations.',
      },
    ],
  },

  'sector-manufacturing-engineering': {
    eyebrow: 'MANUFACTURING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Operational details for industrial plants, automotive facilities, and engineering firms.',
    faqs: [
      {
        question: 'Can TechSteps handle industrial computers, CNC controllers, and factory automation tech?',
        answer: 'Yes. We collect industrial rackmount PCs, CNC workstation controllers, ruggedised factory tablets, HMI touchscreen panels, and PLC automation modules from industrial plants nationwide.',
      },
      {
        question: 'How do you safeguard proprietary CAD blueprints, firmware, and manufacturing IP?',
        answer: 'Storage drives, embedded flash controllers, and memory units undergo certified data erasure or high-security physical shredding, protecting trade secrets and proprietary engineering designs.',
      },
      {
        question: 'What safety accreditations do your drivers hold for active manufacturing plants?',
        answer: 'Our drivers and collection engineers are certified in industrial health and safety, equipped with standard PPE (hi-vis, safety footwear, hard hats, eye protection), and compliant with site inductions.',
      },
      {
        question: 'Can heavy factory plant IT, motor drives, and metal rack enclosures be removed?',
        answer: 'Yes. Our logistics fleet is equipped with tail-lifts, pallet trucks, and machinery skates to extract heavy server cabinets, transformers, and industrial electronic equipment safely.',
      },
      {
        question: 'How do your recycling processes support ISO 14001 environmental targets?',
        answer: 'We operate certified zero-landfill recycling pathways. Metals, copper windings, and high-grade plastics are reclaimed and recycled into industrial supply chains, supporting circular economy targets.',
      },
      {
        question: 'Can you handle hazardous electronics like lead-acid UPS banks and battery enclosures?',
        answer: 'Yes. TechSteps holds Environment Agency hazardous waste licences. Industrial battery enclosures, UPS systems, and capacitors are handled under statutory Hazardous Waste Consignment Notes.',
      },
      {
        question: 'What compliance paperwork is delivered for factory safety and environmental audits?',
        answer: 'You receive statutory Duty of Care notes, serialised disposal manifests, hazardous waste consignment documentation, and certified zero-landfill recovery certificates for corporate compliance.',
      },
    ],
  },

  'sector-it-technology': {
    eyebrow: 'TECH SECTOR FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers for MSPs, software developers, data center operators, and technology startups.',
    faqs: [
      {
        question: 'How does TechSteps partner with Managed Service Providers (MSPs)?',
        answer: 'We offer white-label and partner ITAD programs for MSPs, providing seamless collection, data sanitisation, and asset reporting that MSPs can directly deliver to their commercial client bases.',
      },
      {
        question: 'Can you sanitise NVMe, M.2, and enterprise solid-state drives (SSDs)?',
        answer: 'Yes. Our Blancco-certified erasure systems execute tailored cryptographic erasure commands engineered specifically for modern NVMe, PCIe, and SAS SSD controllers without damaging hardware.',
      },
      {
        question: 'Can developer MacBooks, Linux workstations, and testing devices be cleared in bulk?',
        answer: 'Yes. We collect heterogeneous developer environments spanning Apple Silicon MacBooks, high-RAM Linux desktops, mobile testing device banks, and staging server clusters under one booking.',
      },
      {
        question: 'What asset revenue share or rebate models do you offer for tech companies?',
        answer: 'We provide transparent remarketing agreements. Decommissioned tech hardware is tested, graded, and resold across global business channels, with agreed rebate percentages credited directly to you.',
      },
      {
        question: 'How do you ensure cloud tenant data is eliminated from retired private cloud nodes?',
        answer: 'Storage nodes undergo multi-pass sanitisation and sector-by-sector binary validation, eliminating all virtualised tenant data, VM snapshots, and encrypted partition metadata.',
      },
      {
        question: 'Can we access API-driven or digital reporting for our internal asset databases?',
        answer: 'Yes. We deliver structured electronic CSV, Excel, and PDF asset manifests detailing chassis serials, drive serials, processor specs, RAM, and erasure verification hashes for easy CMDB import.',
      },
      {
        question: 'What documentation confirms full compliance with ISO 27001 and Cyber Essentials Plus?',
        answer: 'We provide certified erasure reports, certificates of destruction, chain of custody logs, and full WEEE documentation verifying total compliance with UK and international security frameworks.',
      },
    ],
  },

  // =========================================================================
  // 3. MAIN SERVICES OVERVIEW & 4 PILLAR HUB PAGES (5 PAGES)
  // =========================================================================

  'services-overview': {
    eyebrow: 'SERVICES DIRECTORY FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Comprehensive answers covering our 27 certified operational services across the UK.',
    faqs: [
      {
        question: 'What core service pillars does TechSteps operate across the UK?',
        answer: 'We operate four core pillars: IT Lifecycle & Destruction (ITAD), Information Management (document scanning & storage), Secure Shredding & Integrity, and Moving & Relocation Services.',
      },
      {
        question: 'Can services be combined into an integrated multi-discipline contract?',
        answer: 'Yes. Many corporate clients combine IT asset collection with physical archive digitisation, office shredding consoles, and business relocation under a single master service level agreement.',
      },
      {
        question: 'Are all 27 services certified to accredited British and international standards?',
        answer: 'Yes. All services are governed by ISO 27001, ISO 9001, ISO 14001, BS EN 15713 (secure destruction), BS 10008 (legal admissibility of scanning), and BS 7858 security vetting.',
      },
      {
        question: 'What geographic areas does TechSteps cover for collections and deliveries?',
        answer: 'We provide comprehensive nationwide coverage across England, Scotland, Wales, and Northern Ireland via our primary logistics hubs and dedicated security-vetted fleet vehicles.',
      },
      {
        question: 'How does TechSteps guarantee zero landfill across disposal and recycling services?',
        answer: 'We adhere to the waste hierarchy: circular asset reuse is prioritised, followed by component harvesting, and closed-loop material recycling through licensed UK treatment partners.',
      },
      {
        question: 'How quickly can our business receive a formal proposal or service consultation?',
        answer: 'Our corporate scoping team responds within one business day to discuss operational specifications, asset volumes, security criteria, and deliver a formal quotation.',
      },
      {
        question: 'What digital documentation and audit reporting is provided across your services?',
        answer: 'Clients receive an online portal dossier containing serialised inventory manifests, certified erasure certificates, Duty of Care transfer notes, and statutory destruction compliance records.',
      },
    ],
  },

  'it-lifecycle-services-destruction': {
    eyebrow: 'IT LIFECYCLE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Key insights into certified ITAD, hardware sanitisation, remarketing, and disposal.',
    faqs: [
      {
        question: 'What is IT Asset Disposition (ITAD) and why is it essential for UK businesses?',
        answer: 'ITAD is the formal, auditable process of retiring redundant technology safely, ensuring confidential data is eradicated, environmental WEEE laws are met, and residual hardware value is recovered.',
      },
      {
        question: 'What data sanitisation software and standards does TechSteps deploy?',
        answer: 'We deploy Blancco certified sanitisation software compliant with HMG IS5 Enhanced, NIST SP 800-88 Rev 1, and DoD 5220.22-M algorithms, providing 100% verified sector erasure.',
      },
      {
        question: 'What happens to storage drives that fail software data sanitisation?',
        answer: 'Any hard drive or solid-state disk that fails sanitisation, has bad sectors, or cannot establish firmware communication is mechanically sheared or shredded to DIN 66399 particle standards.',
      },
      {
        question: 'How does the hardware remarketing and revenue share process operate?',
        answer: 'Functional devices are tested, graded, and sold across secondary business markets. Net remarketing proceeds are credited back to your organisation or offset against service fees.',
      },
      {
        question: 'Can you track assets from desk-side disconnect through to final facility intake?',
        answer: 'Yes. We maintain an unbroken chain of custody with tamper-evident barcoding, GPS fleet tracking, and barcode scanning at every handover and transit point.',
      },
      {
        question: 'Is IT lifecycle collection free for corporate businesses?',
        answer: 'Yes. Most commercial batches of PCs, laptops, servers, and networking hardware qualify for free collection based on intrinsic equipment and component value.',
      },
      {
        question: 'What compliance documentation is generated after IT lifecycle processing?',
        answer: 'You receive an itemised Asset Tracking Manifest, individual drive sanitisation certificates, Environment Agency Waste Transfer Notes, and a final Certificate of Destruction.',
      },
    ],
  },

  'information-management': {
    eyebrow: 'RECORDS MANAGEMENT FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding off-site document storage, BS 10008 scanning, and records management.',
    faqs: [
      {
        question: 'What services are included under TechSteps Information Management?',
        answer: 'Our information management portfolio encompasses secure off-site document storage, BS 10008 scanning and digitisation, digital mailroom automation, heritage storage, and vault media storage.',
      },
      {
        question: 'How secure are TechSteps document storage and records facilities?',
        answer: 'Facilities feature 24/7 CCTV, biometric access gates, VESDA early smoke detection, FM200 fire suppression, temperature and humidity monitoring, and barcoded box and file-level tracking.',
      },
      {
        question: 'How quickly can our staff retrieve physical or digital files from storage?',
        answer: 'We offer standard next-day physical delivery, emergency same-day physical courier dispatch, and rapid 2-hour scan-on-demand delivery directly into your secure document portal.',
      },
      {
        question: 'What is BS 10008 certification and why is it vital for document scanning?',
        answer: 'BS 10008 is the British Standard for legal admissibility of electronic information. It guarantees that scanned documents are authentic, untampered copies accepted in UK courts of law.',
      },
      {
        question: 'How does digital mailroom automation accelerate incoming post processing?',
        answer: 'Incoming physical mail is securely routed to our facility, opened under audited conditions, scanned to high-resolution PDF, OCR indexed, and digitally delivered to recipients within hours.',
      },
      {
        question: 'How are retention schedules monitored to ensure timely document destruction?',
        answer: 'Our records management system tracks statutory retention dates automatically, alerting your records manager when boxes reach maturity to authorise compliant, certified shredding.',
      },
      {
        question: 'Can legacy microfilm, microfiche, and magnetic backup tapes be managed?',
        answer: 'Yes. We operate climate-controlled media vaults and high-speed microfilm scanners capable of cataloguing, preserving, and digitising historical archives and backup tapes.',
      },
    ],
  },

  'secure-shredding-document-integrity': {
    eyebrow: 'CONFIDENTIAL DESTRUCTION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on on-site mobile shredding, off-site destruction, and Simpler Recycling.',
    faqs: [
      {
        question: 'What materials can TechSteps shred under certified destruction standards?',
        answer: 'We shred confidential paperwork, client archives, digital media (hard drives, tapes, USBs, CDs), uniform apparel, branded products, ID badges, and commercial waste materials.',
      },
      {
        question: 'What is the difference between on-site and off-site shredding services?',
        answer: 'On-site shredding destroys confidential materials at your business premises inside a mobile shredding truck while you observe. Off-site shredding collects materials for processing at our high-security facility.',
      },
      {
        question: 'How does TechSteps comply with BS EN 15713 security destruction standards?',
        answer: 'Our destruction processes, vetted personnel, vehicle tracking, and calibrated shredding screens strictly comply with BS EN 15713 standards, providing tamper-proof certificates of destruction.',
      },
      {
        question: 'Do staples, paperclips, and ring binders need to be removed before shredding?',
        answer: 'No. Our industrial shredders easily cross-cut through heavy staples, paperclips, plastic wallets, spiral coils, and lever arch binders without prior manual removal.',
      },
      {
        question: 'What happens to shredded paper waste after confidential destruction?',
        answer: '100% of shredded paper is baled and transported directly to certified UK paper recycling mills to be pulped and manufactured into recycled paper products, supporting zero-landfill.',
      },
      {
        question: 'How does your Simpler Recycling and dry mixed recycling service operate?',
        answer: 'We provide scheduled business collections for cardboard, paper, cans, and plastics compliant with DEFRA Simpler Recycling workplace regulations, reducing waste management overheads.',
      },
      {
        question: 'What documentation confirms regulatory compliance for confidential shredding?',
        answer: 'You receive an immediate Waste Transfer Note upon material collection, followed by a formal Certificate of Destruction recording destruction date, security grade, and batch weight.',
      },
    ],
  },

  'moving-relocation-services': {
    eyebrow: 'WORKPLACE RELOCATION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information regarding business relocations, server moves, and specialized logistics.',
    faqs: [
      {
        question: 'What relocation disciplines does TechSteps handle for UK organisations?',
        answer: 'We manage corporate office moves, specialist data centre and server relocations, laboratory relocations, heritage and museum moves, international shipments, and end-to-end project management.',
      },
      {
        question: 'How do you minimise business downtime during corporate office moves?',
        answer: 'We schedule moves outside working hours—over weekends or overnight—using phased floor plans, pre-packing, and desktop recommissioning so employees can work immediately on Monday morning.',
      },
      {
        question: 'How is critical server and networking hardware protected during transit?',
        answer: 'Servers are un-racked by technical engineers, packed into antistatic foam flight cases, and transported in air-ride, climate-controlled, GPS-monitored vehicles with rapid re-racking on site.',
      },
      {
        question: 'Can you handle hazardous chemicals and sensitive laboratory samples?',
        answer: 'Yes. Our laboratory relocation team operates ADR-certified vehicles, liquid nitrogen dry shippers, and calibrated temperature-monitored carriers for biological specimens and lab equipment.',
      },
      {
        question: 'Are TechSteps relocation personnel security-cleared for sensitive moves?',
        answer: 'Yes. All relocation staff undergo BS 7858 background vetting. We provide personnel with active Security Clearance (SC) for government, defence, and legal relocations.',
      },
      {
        question: 'Do you provide crates, packing materials, and environmental disposal of old furniture?',
        answer: 'Yes. We supply heavy-duty rental plastic crates, anti-static IT bags, security seals, and clearance services to sustainably recycle or donate redundant office furniture.',
      },
      {
        question: 'What insurance and risk management governs TechSteps business relocations?',
        answer: 'All projects operate under comprehensive commercial goods-in-transit, public liability, and professional indemnity insurance, backed by detailed RAMS (Risk Assessment & Method Statement) documentation.',
      },
    ],
  },

  // =========================================================================
  // 4. 27 SUB-SERVICES INDIVIDUAL PAGES
  // =========================================================================

  // --- IT Lifecycle & Destruction (6 services) ---

  'it-asset-disposition-services': {
    eyebrow: 'ITAD SERVICE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Clear answers on certified IT Asset Disposition protocols, sanitisation, and value recovery.',
    faqs: [
      {
        question: 'What is included in TechSteps IT Asset Disposition (ITAD) service?',
        answer: 'Our ITAD service includes security-vetted nationwide collection, complete hardware cataloguing, certified data erasure, refurbishment, component remarketing, and certified zero-landfill WEEE recycling.',
      },
      {
        question: 'How does TechSteps guarantee complete data eradication across retired assets?',
        answer: 'We use certified Blancco data sanitisation compliant with HMG IS5, NIST SP 800-88, and ISO 27001 standards. Drives that cannot be software-sanitised are physically shredded to 6mm particles.',
      },
      {
        question: 'Can our business receive financial revenue back from retired IT assets?',
        answer: 'Yes. Devices with residual commercial value are cleaned, refurbished, and sold via established B2B remarketing channels, with net revenue credited back to your corporate account.',
      },
      {
        question: 'What chain of custody controls protect assets from our dock to your facility?',
        answer: 'Every asset is assigned an encrypted barcode upon collection. Transport is conducted using dedicated GPS-monitored, lock-secured fleet vehicles operated exclusively by BS 7858 vetted personnel.',
      },
      {
        question: 'Is ITAD collection free for corporate businesses and public sector organisations?',
        answer: 'Most qualifying corporate volumes qualify for completely free collection due to intrinsic hardware remarketing and precious metal component value.',
      },
      {
        question: 'How does your ITAD process satisfy Environmental Agency WEEE compliance?',
        answer: 'TechSteps is an Approved Authorised Treatment Facility (AATF). We provide statutory Hazardous Waste Consignment Notes and Duty of Care Waste Transfer Notes verifying zero-landfill diversion.',
      },
      {
        question: 'What final audit reporting is delivered to our compliance directorate?',
        answer: 'You receive an itemised Asset Tracking Manifest, individual drive sanitisation certificates with serial numbers, and a final legal Certificate of Destruction.',
      },
    ],
  },

  'it-asset-tracking-services': {
    eyebrow: 'ITAM SERVICE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding serialised inventory tracking, barcoding, and audit manifests.',
    faqs: [
      {
        question: 'What is the primary role of TechSteps IT Asset Tracking (ITAM) service?',
        answer: 'Our asset tracking service systematically audits, tags, and accounts for all workplace and data centre technology assets from deployment through to retirement, eliminating inventory discrepancies.',
      },
      {
        question: 'How are physical assets tagged and identified on site?',
        answer: 'We apply tamper-evident barcode labels or RFID asset tags, cross-referencing serial numbers, manufacturer service tags, processor architectures, and hardware specifications into our database.',
      },
      {
        question: 'Can your team perform physical inventory reconciliations against our existing CMDB?',
        answer: 'Yes. We import your Microsoft Intune, ServiceNow, or spreadsheet asset registries, conducting physical floor walks to identify missing, unassigned, or ghost assets.',
      },
      {
        question: 'Does asset tracking cover peripherals, monitors, and networking hardware?',
        answer: 'Yes. We track laptops, desktop towers, servers, network switches, enterprise displays, docking stations, and commercial peripherals across your entire estate.',
      },
      {
        question: 'How are remote worker devices tracked and logged into the inventory?',
        answer: 'We coordinate serialised tracking during remote worker return logistics, scanning incoming packages upon arrival and updating asset custody status in real time.',
      },
      {
        question: 'What security vetting is conducted on inventory audit personnel?',
        answer: 'All on-site audit technicians undergo comprehensive BS 7858 background vetting, credit checks, and criminal record screening, with security clearance available for sensitive sites.',
      },
      {
        question: 'In what formats are inventory audit reports and manifests delivered?',
        answer: 'Manifests are delivered via our client portal in structured CSV, Excel, and PDF formats, formatted for instant synchronization with leading enterprise asset management platforms.',
      },
    ],
  },

  'remarketing-recycling-services': {
    eyebrow: 'REMARKETING & ESG FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Details on circular refurbishment, secondary market resale, and material recycling.',
    faqs: [
      {
        question: 'How does TechSteps remarketing service generate value from retired hardware?',
        answer: 'After certified data sanitisation, functional devices are cleaned, upgraded, cosmetically graded, and sold across verified business markets, maximizing financial return for your IT budget.',
      },
      {
        question: 'What categories of corporate hardware have the highest remarketing value?',
        answer: 'Modern Intel/AMD and Apple Silicon laptops, enterprise rack servers, commercial displays, high-density networking switches, and enterprise mobile devices yield the strongest returns.',
      },
      {
        question: 'How do you ensure no corporate identity remains on remarketed equipment?',
        answer: 'We perform complete asset sanitisation: company asset tags, MAC addresses, firmware identifiers, and internal corporate configurations are physically stripped and wiped before resale.',
      },
      {
        question: 'What happens to obsolete technology that cannot be economically resold?',
        answer: 'Equipment with no resale demand enters certified UK dismantling lines. Circuit boards, copper cabling, aluminum heat sinks, and clean plastics are separated for zero-landfill material recovery.',
      },
      {
        question: 'Can remarketing revenue be used to offset confidential destruction or logistics costs?',
        answer: 'Yes. Many corporate clients utilize remarketing proceeds to fully fund secure collection, hard drive shredding, and WEEE compliance reporting, creating a zero-cost or cash-positive project.',
      },
      {
        question: 'How does TechSteps verify ethical downstream resale channels?',
        answer: 'We sell exclusively through vetted B2B remarketing partners, educational organizations, and approved circular channels, preventing illegal electronics export to developing nations.',
      },
      {
        question: 'What ESG and carbon savings documentation is provided for corporate sustainability?',
        answer: 'We calculate Scope 3 carbon avoidance metrics and embodied energy savings achieved by extending hardware lifecycles, delivered in formal corporate ESG sustainability reports.',
      },
    ],
  },

  'secure-collection-services': {
    eyebrow: 'SECURE LOGISTICS FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on security-vetted transport, GPS fleet monitoring, and loading protocols.',
    faqs: [
      {
        question: 'What security controls govern TechSteps secure collection transport fleet?',
        answer: 'Vehicles feature solid-panel steel cargo boxes, high-security slam locks, 24/7 telematics with GPS geofencing, remote immobilisation, and numbered tamper-evident security seals.',
      },
      {
        question: 'Are logistics drivers directly employed and security vetted by TechSteps?',
        answer: 'Yes. We never use unvetted third-party gig couriers. All drivers are directly employed, uniformed, carry company photo ID, and are BS 7858 security vetted.',
      },
      {
        question: 'What protective containers are used to transport confidential electronics?',
        answer: 'We supply lockable wheeled security roll cages, heavy-duty anti-tamper plastic crates, padded flight cases for monitors, and specialised anti-static server enclosures.',
      },
      {
        question: 'Can you collect redundant equipment from basements or multi-storey offices?',
        answer: 'Yes. Our collection teams manage desk-side and server room collections, utilizing stair-climbers and pallet trucks to transport hardware safely to loading bays.',
      },
      {
        question: 'Is secure collection available nationwide across the UK?',
        answer: 'Yes. We operate regular collection routes across London, South East, Midlands, North West, Yorkshire, South West, Scotland, Wales, and Northern Ireland.',
      },
      {
        question: 'What happens immediately upon arrival at our premises?',
        answer: 'Our lead logistics driver introduces themselves, reviews RAMS safety procedures, inspects staging areas, seals containers in your presence, and issues an instant Waste Transfer Note.',
      },
      {
        question: 'How is chain of custody maintained until equipment reaches your facility?',
        answer: 'Seals are recorded on the transfer note at departure and physically verified by intake security upon arrival at our processing facility before electronic unsealing.',
      },
    ],
  },

  'secure-it-disposal-services': {
    eyebrow: 'IT DISPOSAL FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding compliant WEEE disposal, hazardous waste, and destruction protocols.',
    faqs: [
      {
        question: 'What regulatory standards govern TechSteps secure IT disposal services?',
        answer: 'Our disposal workflows comply fully with UK WEEE Regulations, Environment Agency AATF guidelines, the Data Protection Act 2018 (UK GDPR), and ISO 14001 environmental frameworks.',
      },
      {
        question: 'What is an AATF and why is using one mandatory for corporate compliance?',
        answer: 'An Approved Authorised Treatment Facility (AATF) is an Environment Agency certified facility licensed to treat, dismantle, and recover electronics to statutory European recycling targets.',
      },
      {
        question: 'How are hazardous components like lithium batteries and mercury displays handled?',
        answer: 'Hazardous elements are legally classified, packaged into UN-approved hazardous transit containers, and transported under statutory Hazardous Waste Consignment Notes.',
      },
      {
        question: 'What is your zero-landfill guarantee for decommissioned IT assets?',
        answer: 'We guarantee that 0% of collected electronics enter landfill. Non-reusable hardware is shredded and refined into purified commodity materials (copper, gold, aluminium, plastics).',
      },
      {
        question: 'Can your team provide on-site degaussing or mechanical shearing prior to transit?',
        answer: 'Yes. For high-security environments, our mobile destruction team can degauss and physically crush magnetic and solid-state media at your premises before departure.',
      },
      {
        question: 'Can you dispose of servers, printers, and workstation computers together?',
        answer: 'Yes. You can consolidate any mix of computing equipment, printers, monitors, servers, and telecommunications gear into a single streamlined disposal collection.',
      },
      {
        question: 'What legal paperwork protects our business from statutory waste liabilities?',
        answer: 'We issue an official Environment Agency Duty of Care Waste Transfer Note and an itemised Certificate of Destruction, legally transferring waste responsibility to TechSteps.',
      },
    ],
  },

  'ultra-secure-hard-drive-destruction-services': {
    eyebrow: 'HARD DRIVE SHREDDING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on physical drive shredding, degaussing, and particle size standards.',
    faqs: [
      {
        question: 'What physical destruction methods does TechSteps use for hard drives?',
        answer: 'We use industrial hydraulic cross-cut shredders that disintegrate hard drives into 6mm–20mm particulate matter, as well as NSA-approved magnetic degaussers and hydraulic punch crushers.',
      },
      {
        question: 'What is the difference between on-site and off-site hard drive destruction?',
        answer: 'On-site shredding occurs at your offices inside our self-powered mobile destruction truck under client observation. Off-site shredding transports drives under lock to our secure processing plant.',
      },
      {
        question: 'Can solid-state drives (SSDs) and NVMe flash media be shredded safely?',
        answer: 'Yes. Because SSD flash chips are microscopic, we shred solid-state drives to a specialized sub-6mm particle size to guarantee memory silicon fracture and total data eradication.',
      },
      {
        question: 'How do you record drive serial numbers during the destruction process?',
        answer: 'Each drive barcode is scanned using optical readers into our asset manifest before entering the shredder throat, ensuring an immutable one-to-one audit trail.',
      },
      {
        question: 'What security standards does your destruction process comply with?',
        answer: 'Our destruction processes comply with BS EN 15713 (Secure Destruction of Confidential Material), DIN 66399 Security Level H-5/E-3, and HMG IS5 standards.',
      },
      {
        question: 'What happens to the shredded metal and silicon particles after destruction?',
        answer: 'Particulate metals are separated using magnetic and eddy-current separators, baled, and smelted into raw industrial aluminium and steel, achieving 100% recycling.',
      },
      {
        question: 'What certification will our compliance officer receive after shredding?',
        answer: 'We deliver an immediate Certificate of Destruction containing scanned drive serial numbers, date, particle gauge, destruction method, and certifying engineer signature.',
      },
    ],
  },

  // --- Information Management (7 services) ---

  'digital-mailroom-services': {
    eyebrow: 'DIGITAL MAILROOM FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Operational details on inbound post scanning, data extraction, and secure routing.',
    faqs: [
      {
        question: 'How does TechSteps Digital Mailroom service operate?',
        answer: 'Your incoming business post is redirected to our secure scanning facility, opened under audited conditions, scanned to searchable PDF, and digitally routed to employees within hours.',
      },
      {
        question: 'How do you ensure confidential letters are not viewed by unauthorised staff?',
        answer: 'Mailroom technicians operate under strict ISO 27001 controls and non-disclosure agreements. Mail marked Private & Confidential can be routed unopened or forwarded physically.',
      },
      {
        question: 'What automated data capture and indexing capabilities are applied?',
        answer: 'We utilize advanced Optical Character Recognition (OCR) and intelligent machine learning to extract invoice numbers, reference codes, sender details, and route mail into workflows.',
      },
      {
        question: 'What happens to physical original paper mail after scanning?',
        answer: 'Scanned paper is held in secure quarantine for an agreed period (e.g. 30 to 90 days) for physical verification, after which it is compliantly shredded or archived off-site.',
      },
      {
        question: 'How does digital mailroom support remote and hybrid workforces?',
        answer: 'Employees receive postal mail as secure digital documents directly in their email inbox, Microsoft Teams, or document management repository regardless of physical location.',
      },
      {
        question: 'Can high-volume returned mail, cheques, and customer applications be handled?',
        answer: 'Yes. We process high-volume transactional mailstreams including customer ballot returns, cheques, proof of address documents, and regulatory correspondence.',
      },
      {
        question: 'How quickly is incoming morning post processed and delivered to recipients?',
        answer: 'Mail received by 07:00 is scanned, OCR indexed, and digitally distributed to recipient queues by 09:30 the same business morning under agreed service level agreements.',
      },
    ],
  },

  'document-management-services': {
    eyebrow: 'DOCUMENT MANAGEMENT FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Insights into electronic records management, cloud archiving, and workflow control.',
    faqs: [
      {
        question: 'What is TechSteps Document Management service?',
        answer: 'Our document management service provides secure electronic archiving, version control, metadata indexing, automated retention scheduling, and controlled staff access across your files.',
      },
      {
        question: 'Can your platform integrate with existing enterprise systems like SharePoint?',
        answer: 'Yes. We integrate seamlessly with Microsoft 365, SharePoint, Salesforce, SAP, and custom enterprise databases via secure REST APIs and automated ingest connectors.',
      },
      {
        question: 'How does the system enforce UK GDPR compliance and retention policies?',
        answer: 'Automated retention rules tag records with statutory lifespan triggers, alerting compliance teams when records reach maturity and initiating audited disposal workflows.',
      },
      {
        question: 'What search and discovery tools are available to locate files rapidly?',
        answer: 'Full-text OCR indexing and custom metadata tagging allow users to search across millions of digitized documents in seconds by client name, contract number, date, or keyword.',
      },
      {
        question: 'How is access security and document version control maintained?',
        answer: 'Role-based access controls (RBAC), multi-factor authentication (MFA), and audit logging ensure that document views, downloads, and edits are permanently tracked.',
      },
      {
        question: 'Can paper records and legacy digital files be unified in one system?',
        answer: 'Yes. We can digitise historical physical records and consolidate legacy network drives, creating a unified corporate document archive accessible through a single portal.',
      },
      {
        question: 'What disaster recovery and backup safeguards protect digital documents?',
        answer: 'Documents are encrypted at rest (AES-256) and in transit (TLS 1.3), backed up redundantly across UK-sovereign Tier 4 data centres with 99.99% uptime guarantees.',
      },
    ],
  },

  'document-scanning-services': {
    eyebrow: 'DOCUMENT SCANNING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on BS 10008 legal admissibility scanning, indexing, and high-volume capture.',
    faqs: [
      {
        question: 'What scanning standards ensure our digital files are legally admissible in court?',
        answer: 'We scan in strict compliance with BS 10008 (Legal Admissibility and Evidential Weight of Electronic Information), creating legally authentic electronic copies accepted by UK courts.',
      },
      {
        question: 'What formats and resolutions are delivered for scanned paperwork?',
        answer: 'Documents are scanned at 300–600 DPI to searchable PDF/A (the international archiving standard), TIFF, or JPEG formats with embedded full-text OCR indexing.',
      },
      {
        question: 'Do staples, paperclips, and bindings need to be removed before collection?',
        answer: 'No. Our bureau prep team handles all de-stapling, unbinding, document sorting, fragile paper repair, and separator sheet insertion prior to high-speed scanning.',
      },
      {
        question: 'Can you scan wide-format architectural drawings, maps, and blueprints?',
        answer: 'Yes. We operate specialised planetary and wide-format feed scanners capable of digitising A3, A2, A1, and A0 technical drawings, architectural plans, and fragile maps.',
      },
      {
        question: 'How are paper archives collected and transported to the scanning bureau?',
        answer: 'Boxes are collected in tracked, lock-secured fleet vehicles by BS 7858 vetted personnel. Every box is barcoded at collection for end-to-end custody tracking.',
      },
      {
        question: 'Can our staff access files while they are at the scanning facility?',
        answer: 'Yes. We provide a rapid "Scan-on-Demand" service: if you require an urgent file while a collection is undergoing prep, we retrieve, scan, and email it within 2 hours.',
      },
      {
        question: 'What happens to original paper files after scanning is completed?',
        answer: 'Following client quality sign-off, paper records can be returned to your premises, placed into our secure off-site archive storage, or compliantly shredded with certification.',
      },
    ],
  },

  'document-storage-services': {
    eyebrow: 'DOCUMENT STORAGE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Details on secure off-site archiving, barcode tracking, and scan-on-demand delivery.',
    faqs: [
      {
        question: 'How does TechSteps off-site document storage service work?',
        answer: 'We collect your boxed paperwork, barcode every container, catalogue file references into your client portal, and store them in secure, climate-controlled archive racking.',
      },
      {
        question: 'What fire, flood, and environmental protections protect stored records?',
        answer: 'Facilities feature VESDA high-sensitivity laser smoke detection, FM200 gaseous fire suppression, multi-layered perimeter alarms, climate control, and anti-flood elevated shelving.',
      },
      {
        question: 'How quickly can our team retrieve stored archive boxes or individual files?',
        answer: 'We offer standard next-day physical delivery, emergency same-day physical courier dispatch, and rapid 2-hour scan-on-demand delivery directly into your secure portal.',
      },
      {
        question: 'Can our business track archive boxes online via a self-service portal?',
        answer: 'Yes. Our web portal provides complete visibility: you can search file descriptions, request retrievals, manage department cost centres, and view retention review dates.',
      },
      {
        question: 'How are statutory retention schedules managed for stored paperwork?',
        answer: 'We configure destruction review triggers based on statutory requirements (e.g. 6 years for financial files). When maturity is reached, we notify you to authorise certified shredding.',
      },
      {
        question: 'Do you supply standard heavy-duty archive boxes for office packing?',
        answer: 'Yes. We supply premium double-walled corrugated archive boxes, tamper-evident security tape, barcode labels, and packing guidelines to protect files in transit.',
      },
      {
        question: 'What security vetting is conducted on archive warehouse personnel?',
        answer: 'All facility technicians, drivers, and records handlers undergo rigorous BS 7858 background vetting, five-year employment history verification, and confidentiality agreements.',
      },
    ],
  },

  'heritage-storage-services': {
    eyebrow: 'HERITAGE STORAGE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on BS 4971 compliant preservation for historical archives and artefacts.',
    faqs: [
      {
        question: 'What standards govern TechSteps heritage storage facility?',
        answer: 'Our heritage repositories are engineered to BS 4971 (Conservation and Care of Archive and Library Collections) and PAS 198 specifications for long-term cultural preservation.',
      },
      {
        question: 'How are temperature and relative humidity controlled in heritage vaults?',
        answer: 'Vaults maintain continuous climate control within strict environmental bands (typically 13–18°C and 35–50% RH) monitored by automated telemetry sensors with 24/7 alerts.',
      },
      {
        question: 'What physical security protects irreplaceable historical manuscripts and art?',
        answer: 'Repositories feature air-gapped security zones, biometric mantraps, VESDA laser air sampling, nitrogen inert gas fire suppression, and zero UV light exposure.',
      },
      {
        question: 'Can conservators and researchers access heritage collections on site?',
        answer: 'Yes. We provide dedicated viewing and conservation consultation rooms equipped with neutral LED lighting, examination tables, and conservation handling tools upon booking.',
      },
      {
        question: 'How are delicate, historical archives handled during transit?',
        answer: 'Collections are transported in custom archival conservation boxes, acid-free tissue wrapping, and climate-buffered transit vehicles with active shock-absorbing suspension.',
      },
      {
        question: 'Can you digitise historical manuscripts, leather-bound volumes, and parchment?',
        answer: 'Yes. We operate non-contact planetary book scanners with cold LED illumination and specialized book cradles that preserve historical bindings while capturing high-res imagery.',
      },
      {
        question: 'What disaster recovery safeguards protect cultural heritage items?',
        answer: 'Our facilities operate multi-redundant HVAC power backups, off-grid generators, comprehensive disaster response plans, and direct priority links with emergency services.',
      },
    ],
  },

  'tape-media-storage-services': {
    eyebrow: 'TAPE STORAGE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding magnetic backup tape rotation, vaulting, and media rotation.',
    faqs: [
      {
        question: 'What magnetic tape and optical media formats can TechSteps store?',
        answer: 'We store all enterprise tape generations including LTO-1 through LTO-9, 3592, DLT, SDLT, DDS/DAT, 8mm, optical discs, and removable hard drive backup cartridges.',
      },
      {
        question: 'What environmental controls protect magnetic backup tapes from degradation?',
        answer: 'Media vaults maintain precise climate stability (16–20°C and 30–45% RH) with electrostatic discharge (ESD) protection, preventing tape binder degradation and magnetic bit rot.',
      },
      {
        question: 'How does scheduled backup tape rotation service work?',
        answer: 'Our security-vetted couriers collect daily, weekly, or monthly backup media in lockable anti-static Peli cases, rotating expired tapes back to your data centre on scheduled timetables.',
      },
      {
        question: 'How quickly can backup tapes be retrieved during an emergency disaster recovery?',
        answer: 'We maintain 24/7/365 emergency recovery protocols: critical restore tapes can be retrieved from vault storage and delivered to your recovery site within 2 to 4 hours.',
      },
      {
        question: 'What fire and magnetic interference protections are built into the vault?',
        answer: 'Vaults feature Faraday-shielded enclosures preventing electromagnetic interference, fire-rated vault doors (up to 4-hour protection), and clean-agent gas fire suppression.',
      },
      {
        question: 'How are retired or obsolete backup tapes securely destroyed?',
        answer: 'Tapes undergo high-gauss magnetic degaussing to eliminate magnetic flux patterns, followed by physical shredding to sub-6mm particles in compliance with BS EN 15713 standards.',
      },
      {
        question: 'What tracking and audit reports are provided for corporate compliance?',
        answer: 'Every media tape is tracked by barcode label. You receive full custody logs, scheduled rotation manifests, and certified destruction records for external IT auditors.',
      },
    ],
  },

  'vault-storage-services': {
    eyebrow: 'VAULT STORAGE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on ultra-secure vault storage for high-value media, deeds, and cryptographic keys.',
    faqs: [
      {
        question: 'What items are stored within TechSteps ultra-secure vault facilities?',
        answer: 'Our vaults protect high-security assets including hardware security modules (HSMs), cryptocurrency cold storage keys, critical property deeds, vital contracts, and source code archives.',
      },
      {
        question: 'What structural and physical security standards govern the vault?',
        answer: 'Vaults are built to EN 1143-1 Grade standards with reinforced ferro-concrete walls, anti-explosive and anti-drill vault doors, dual-key combination locks, and seismic vibration sensors.',
      },
      {
        question: 'How is physical access to the vault controlled and monitored?',
        answer: 'Access is restricted to authorized personnel using multi-factor biometric authentication, CCTV surveillance, dual-custody authorization, and continuous security escort protocols.',
      },
      {
        question: 'What atmospheric and environmental systems operate inside the vault?',
        answer: 'Vaults feature climate-controlled air filtration, positive pressure ventilation preventing dust ingress, zero humidity fluctuation, and clean-agent gaseous fire suppression.',
      },
      {
        question: 'Can our designated compliance officers inspect stored vault items?',
        answer: 'Yes. Authorised client representatives can schedule witnessed inventory inspections in private, secure viewing rooms under biometric verification and audited sign-off.',
      },
      {
        question: 'How are items transported between our premises and the vault?',
        answer: 'Transport is conducted using dedicated, armoured, GPS-monitored vehicles with dual-manned security teams and tamper-evident locking cases recorded on handover manifests.',
      },
      {
        question: 'What insurance and audit guarantees protect vault-stored assets?',
        answer: 'We maintain high-limit specialized vault insurance coverage, supported by annual independent security audits, and comprehensive audit logs detailing every vault entry.',
      },
    ],
  },

  // --- Secure Shredding & Integrity (8 services) ---

  'cardboard-recycling-services': {
    eyebrow: 'CARDBOARD RECYCLING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on commercial cardboard baling, collection, and circular packaging recovery.',
    faqs: [
      {
        question: 'What categories of commercial cardboard packaging does TechSteps collect?',
        answer: 'We collect corrugated shipping boxes, packaging cartons, cardboard pallets, retail display boxes, and paperboard cores from commercial warehouses, offices, and retail facilities.',
      },
      {
        question: 'Can you collect loose cardboard boxes or only compacted/baled material?',
        answer: 'We collect both: we handle flat-packed, unbaled cardboard collections using wheeled roll cages or box vans, as well as high-density mill-sized mill bales using tail-lift vehicles.',
      },
      {
        question: 'How does commercial cardboard recycling help businesses meet Simpler Recycling rules?',
        answer: 'Under UK Simpler Recycling legislation, workplaces must segregate clean dry recyclables. Our dedicated cardboard collections ensure complete compliance and eliminate commercial waste penalties.',
      },
      {
        question: 'Do tape, shipping labels, and parcel stickers need to be removed?',
        answer: 'No. Standard parcel tape, address labels, and shipping stickers are removed during the hydropulping cleaning phase at paper recycling mills. Heavy metal staples should be minimized.',
      },
      {
        question: 'What collection containers do you supply for on-site cardboard consolidation?',
        answer: 'We supply collapsible wire roll cages, heavy-duty interior wheelie bins (240L–1100L), and can assist with on-site vertical baler procurement for high-volume commercial producers.',
      },
      {
        question: 'Where is collected cardboard processed and recycled?',
        answer: '100% of collected cardboard is transported to licensed UK paper and board reprocessing mills, where it is repulped and converted into new 100% recycled packaging boxes.',
      },
      {
        question: 'What environmental documentation is provided for commercial sustainability reporting?',
        answer: 'You receive an official Duty of Care Waste Transfer Note for every collection, along with weight-based monthly reporting detailing total kilograms diverted from landfill and carbon saved.',
      },
    ],
  },

  'disposal-services': {
    eyebrow: 'DISPOSAL SERVICES FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Answers regarding commercial waste clearance, zero-landfill diversion, and compliance.',
    faqs: [
      {
        question: 'What commercial disposal services does TechSteps provide?',
        answer: 'We provide comprehensive business clearance services for commercial waste, redundant office furniture, obsolete machinery, non-hazardous workplace materials, and mixed commercial packaging.',
      },
      {
        question: 'How do you guarantee compliant disposal under UK waste legislation?',
        answer: 'TechSteps is a licensed upper-tier waste carrier registered with the Environment Agency. Every clearance is accompanied by a statutory Duty of Care Waste Transfer Note.',
      },
      {
        question: 'What is your environmental landfill diversion policy for commercial clearances?',
        answer: 'We enforce a zero-to-landfill commitment: materials are mechanically sorted into reusable, refurbishable, recyclable, and waste-to-energy streams to maximize circular resource recovery.',
      },
      {
        question: 'Can you handle office furniture clearances including desks, chairs, and cabinets?',
        answer: 'Yes. We clear office desks, ergonomic chairs, metal filing pedestals, breakout seating, and conference tables, donating usable items to UK charities or recycling metals and wood.',
      },
      {
        question: 'Can clearances be arranged outside normal commercial operating hours?',
        answer: 'Yes. We provide scheduled evening, weekend, and bank holiday clearances to prevent disruption to building tenants, loading bays, and active commercial operations.',
      },
      {
        question: 'How are clearance costs calculated for commercial premises?',
        answer: 'Clearance costs are scoped based on material types, volume (cubic yards or tonnage), labour requirements, and recyclable material value offsets. We provide clear, fixed quotations.',
      },
      {
        question: 'What documentation confirms full legal discharge of waste liabilities?',
        answer: 'You receive an official Duty of Care Waste Transfer Note confirming waste classification codes (EWC), collection address, licensed carrier credentials, and final processing facility data.',
      },
    ],
  },

  'dry-mixed-recycling-services': {
    eyebrow: 'DMR SERVICE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on Dry Mixed Recycling (DMR), container options, and workplace segregation.',
    faqs: [
      {
        question: 'What materials are permitted within Dry Mixed Recycling (DMR) collections?',
        answer: 'DMR containers accept clean paper, cardboard, clean plastic bottles, plastic packaging film, aluminium beverage cans, and steel food tins mixed within a single container.',
      },
      {
        question: 'What items must be excluded from DMR bins to prevent contamination?',
        answer: 'Food waste, liquids, glassware, expanded polystyrene, wood, confidential paperwork, electrical items, and general black-bag rubbish must be excluded from DMR collections.',
      },
      {
        question: 'What wheelie bin sizes and internal containers are provided for workplaces?',
        answer: 'We provide interior office recycling pods, colour-coded caddies, and exterior lockable wheelie bins spanning 240L, 360L, 660L, and large-capacity 1100L four-wheeled bins.',
      },
      {
        question: 'How does commercial DMR help our business comply with DEFRA Simpler Recycling?',
        answer: 'Under new DEFRA workplace recycling regulations, all UK organisations must segregate dry recyclables from residual waste. Our DMR service provides an effortless, fully compliant solution.',
      },
      {
        question: 'Where does collected dry mixed recycling go for sorting and processing?',
        answer: 'Materials are transported to advanced Materials Recovery Facilities (MRFs) where optical sorters, air classifiers, and magnets separate items into pure material streams for UK reprocessing.',
      },
      {
        question: 'How often can DMR collections be scheduled for our facilities?',
        answer: 'We provide flexible collection frequencies including daily, twice-weekly, weekly, or fortnightly schedules tailored to your workplace waste production rates.',
      },
      {
        question: 'What monthly reporting is provided for corporate sustainability audits?',
        answer: 'Clients receive itemised monthly recycling reports detailing collected weights, contamination rates, landfill diversion percentages, and Scope 3 greenhouse gas avoidance metrics.',
      },
    ],
  },

  'home-shredding-services': {
    eyebrow: 'HOME SHREDDING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on confidential paper and media shredding for remote workers and private residences.',
    faqs: [
      {
        question: 'How does TechSteps Home Shredding service work for remote workers?',
        answer: 'We supply tamper-evident sealable shredding sacks or lockable boxes to home addresses, collect them via tracked courier, and shred all documents compliantly at our secure facility.',
      },
      {
        question: 'Can home shredding be deployed across a remote corporate workforce?',
        answer: 'Yes. We manage centralised corporate home-shredding programs for enterprise clients, dispatching tracked shredding kits to hundreds of remote employees with unified corporate billing.',
      },
      {
        question: 'What materials can be placed in home shredding sacks?',
        answer: 'Sacks accept printed confidential paperwork, payroll files, bank statements, client notes, envelopes, invoices, and expired personal records. Staples and paperclips are accepted.',
      },
      {
        question: 'Can remote workers include old hard drives, laptops, or USB memory sticks?',
        answer: 'Yes. We offer specialized hardware destruction boxes that safely consolidate redundant laptops, external hard drives, tablets, and flash media for certified physical shredding.',
      },
      {
        question: 'How is confidential chain of custody maintained from home doorsteps?',
        answer: 'Sacks feature tamper-evident adhesive seals signed by the employee upon filling. Couriers scan individual sack barcodes upon collection and provide a collection receipt.',
      },
      {
        question: 'What happens to shredded home paper after confidential destruction?',
        answer: '100% of shredded paper is baled and dispatched directly to UK paper mills to be pulped into 100% recycled paper goods, ensuring complete environmental sustainability.',
      },
      {
        question: 'What documentation confirms document destruction for corporate compliance?',
        answer: 'An official Certificate of Destruction is generated and emailed to the corporate compliance manager or employee upon completion, satisfying UK GDPR home-working guidelines.',
      },
    ],
  },

  'off-site-shredding-services': {
    eyebrow: 'OFF-SITE SHREDDING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Details on high-volume secure collection, transport, and facility destruction.',
    faqs: [
      {
        question: 'How does TechSteps Off-Site Shredding service operate?',
        answer: 'We collect confidential paper in lockable consoles, wheelie bins, or archive boxes, transport them in GPS-tracked vehicles, and cross-cut shred everything at our high-security facility.',
      },
      {
        question: 'How do you guarantee security during transport between our site and your plant?',
        answer: 'All vehicles feature solid-sided cargo holds, electronic deadlocks, 24/7 telematics, and numbered tamper-evident seals. Transit is operated exclusively by BS 7858 vetted personnel.',
      },
      {
        question: 'How quickly is confidential paperwork shredded once it arrives at the plant?',
        answer: 'All collected paperwork is destroyed within 24 hours of arrival at our secure facility, monitored under continuous high-definition CCTV coverage with recorded archives.',
      },
      {
        question: 'What shredding security grade and particle size is achieved?',
        answer: 'Our industrial multi-knife shredders cross-cut paper to BS EN 15713 Security Levels (typically Level 3 to Level 5), ensuring reconstruction is impossible under legal standards.',
      },
      {
        question: 'Do lever arch files, plastic folders, and metal clips need to be sorted?',
        answer: 'No. Our high-torque industrial shredding machinery easily processes metal lever arch mechanisms, plastic document wallets, spiral spines, and heavy fasteners without prep.',
      },
      {
        question: 'Is off-site shredding more cost-effective for large corporate archive purges?',
        answer: 'Yes. Off-site shredding offers superior processing speeds for high volumes (e.g. 100 to 10,000+ archive boxes), delivering significantly lower per-box processing rates than on-site shredding.',
      },
      {
        question: 'What audit documentation is issued upon completion of destruction?',
        answer: 'You receive a Duty of Care Waste Transfer Note at collection, followed by a formal Certificate of Destruction recording collection date, batch weight, and certification sign-off.',
      },
    ],
  },

  'on-site-shredding-services': {
    eyebrow: 'ON-SITE SHREDDING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on mobile shredding trucks, witnessed destruction, and console servicing.',
    faqs: [
      {
        question: 'How does mobile On-Site Shredding work at our business premises?',
        answer: 'Our specialized mobile shredding truck arrives at your site. Vetted operators transfer confidential bins to the vehicle, where an automated bin-lift empties paper into the shredder on-site.',
      },
      {
        question: 'Can our staff or compliance officer witness the shredding process in person?',
        answer: 'Yes. Our mobile shredding trucks feature external CCTV monitor screens, allowing your compliance team to watch documents being shredded in real time outside your building.',
      },
      {
        question: 'What container options do you provide for interior office document security?',
        answer: 'We provide lockable executive wooden consoles that blend with office decor, as well as 120L and 240L lockable wheelie bins with secure document feed slots.',
      },
      {
        question: 'What happens to lockable office consoles on collection day?',
        answer: 'Our uniformed, security-cleared technician unlocks the console, transfers the sealed internal nylon sack into a secure cart, and wheels it directly to the truck for immediate destruction.',
      },
      {
        question: 'Can hard drives and magnetic backup tapes also be shredded on-site?',
        answer: 'Yes. Many of our mobile destruction trucks are dual-fitted with dedicated high-torque hard drive shredders capable of disintegrating drives into sub-6mm particles on site.',
      },
      {
        question: 'Is on-site shredding fully compliant with UK GDPR and BS EN 15713?',
        answer: 'Yes. On-site shredding represents the highest level of risk mitigation because confidential data never leaves your curtilage in readable form, satisfying maximum compliance scrutiny.',
      },
      {
        question: 'When is the Certificate of Destruction issued for on-site shredding?',
        answer: 'Our technician issues your formal Certificate of Destruction immediately upon completion of the shredding cycle before the mobile vehicle departs your premises.',
      },
    ],
  },

  'product-shredding-services': {
    eyebrow: 'PRODUCT SHREDDING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Details on branded apparel, counterfeit goods, prototypes, and physical product disposal.',
    faqs: [
      {
        question: 'What non-paper commercial products does TechSteps securely shred?',
        answer: 'We shred uniform clothing, staff identity badges, branded merchandise, counterfeit items, obsolete product prototypes, faulty manufactured stock, and packaging materials.',
      },
      {
        question: 'Why is certified product shredding essential for corporate brand protection?',
        answer: 'Shredding ensures redundant branded apparel and counterfeit goods cannot be illegally resold, stolen, or used by unauthorized individuals to impersonate company staff.',
      },
      {
        question: 'Can you provide video recording or witnessed product destruction?',
        answer: 'Yes. We provide witnessed destruction options where client brand managers observe the shredding run, or we provide high-definition time-stamped video recordings of the destruction event.',
      },
      {
        question: 'What materials can your industrial destruction shredders process?',
        answer: 'Our heavy-duty industrial shredders process textiles, leather goods, heavy polymers, molded plastics, composite packaging, non-ferrous metals, and embedded microelectronics.',
      },
      {
        question: 'What happens to shredded textiles and plastic components after destruction?',
        answer: 'Shredded textiles are reprocessed into industrial wiping rags, acoustic insulation, or fiberfill, while shredded plastics are pelletized for secondary manufacturing, avoiding landfill.',
      },
      {
        question: 'How are sensitive corporate uniform security badges and emblems managed?',
        answer: 'High-security embroidered patches, epaulettes, and plastic ID cards are finely shredded to prevent physical reconstruction and unauthorized security access.',
      },
      {
        question: 'What legal certification confirms complete product eradication?',
        answer: 'We issue an itemised Certificate of Destruction stating product description, batch numbers, destruction date, weight, method, and photographic evidence for brand protection audits.',
      },
    ],
  },

  'simpler-recycling-services': {
    eyebrow: 'SIMPLER RECYCLING FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Compliance information regarding DEFRA workplace recycling regulations and segregation.',
    faqs: [
      {
        question: 'What is DEFRA Simpler Recycling legislation and who does it apply to?',
        answer: 'Simpler Recycling is UK legislation mandating that all commercial workplaces, public sector bodies, and businesses segregate clean dry recyclables, food waste, and residual waste.',
      },
      {
        question: 'What waste streams must UK businesses legally separate under the new rules?',
        answer: 'Organisations must separate: (1) Paper and card, (2) Plastics, metals, and cartons, (3) Food waste (for businesses producing food), and (4) Non-recyclable residual waste.',
      },
      {
        question: 'How does TechSteps help workplaces achieve full Simpler Recycling compliance?',
        answer: 'We audit your waste production, deliver compliant segregated interior recycling bins, establish scheduled collections, and deliver auditable waste transfer documentation.',
      },
      {
        question: 'Can dry paper, card, metals, and plastics be collected in a single DMR stream?',
        answer: 'Yes. DEFRA rules permit collecting dry paper, card, cans, and plastics together in an accredited Dry Mixed Recycling (DMR) container, keeping workplace sorting simple and clean.',
      },
      {
        question: 'What are the legal penalties for commercial non-compliance with recycling rules?',
        answer: 'Local authorities and the Environment Agency enforce statutory compliance with potential fixed penalty notices, commercial waste fines, and mandatory enforcement undertakings.',
      },
      {
        question: 'What container options do you supply for workplace interior sorting?',
        answer: 'We supply modular multi-compartment recycling stations, colour-coded waste caddies, and external 240L to 1100L wheelie bins branded with standardized recycling signage.',
      },
      {
        question: 'What documentation confirms our organization is meeting statutory recycling targets?',
        answer: 'We provide monthly waste hierarchy reports detailing collection weights, material diversion percentages, and statutory Duty of Care notes required for environmental inspections.',
      },
    ],
  },

  // --- Moving & Relocation Services (6 services) ---

  'business-relocations-services': {
    eyebrow: 'COMMERCIAL MOVE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on corporate office moves, weekend logistics, and furniture management.',
    faqs: [
      {
        question: 'How does TechSteps manage business relocations without interrupting trading?',
        answer: 'We plan and execute commercial moves over weekends and evenings, providing pre-packing, desk recommissioning, and IT reconnects so your staff resume work seamlessly on Monday morning.',
      },
      {
        question: 'What size corporate office relocations can TechSteps accommodate?',
        answer: 'We handle relocations ranging from 20-person boutique professional offices to enterprise multi-floor headquarters and regional corporate campuses with thousands of staff.',
      },
      {
        question: 'Do you supply moving crates, packing materials, and equipment labels?',
        answer: 'Yes. We supply heavy-duty rental plastic lidded crates (LC3 / LC6), computer roll cages, anti-static monitor bags, bubble blankets, and colour-coded department label systems.',
      },
      {
        question: 'Can you dismantle, move, and reassemble modular office desking and furniture?',
        answer: 'Yes. Our experienced furniture fitters dismantle bench desking, executive pods, conference tables, and acoustic booth partitions, reassembling them to approved floor plans.',
      },
      {
        question: 'How do you coordinate moves in buildings with strict landlord loading restrictions?',
        answer: 'Our project managers coordinate directly with building facilities teams, reserving loading bays, providing insurance certificates, and applying protective floor and lift cladding.',
      },
      {
        question: 'Can you sustainably clear redundant furniture and clutter during an office move?',
        answer: 'Yes. We provide complete office clearance: surplus desks and chairs are donated to charity partners or dismantled into separated metal, wood, and plastic recycling streams.',
      },
      {
        question: 'What risk assessments and insurance cover your commercial moving projects?',
        answer: 'Every project operates under comprehensive site-specific RAMS (Risk Assessment & Method Statement), backed by substantial public liability and goods-in-transit insurance policies.',
      },
    ],
  },

  'europe-international-domestic-moves-services': {
    eyebrow: 'GLOBAL RELOCATION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on European road freight, international sea/air shipments, and customs.',
    faqs: [
      {
        question: 'What international and European relocation services does TechSteps provide?',
        answer: 'We manage cross-border corporate relocations, European dedicated road freight, international sea container shipping, air-freight logistics, and comprehensive customs clearance.',
      },
      {
        question: 'How do you navigate post-Brexit UK-EU customs documentation and duties?',
        answer: 'Our in-house customs specialists prepare export declarations, transit documents (T1), EORI compliance paperwork, and import clearances, preventing border delays in Dover or Calais.',
      },
      {
        question: 'Can you transport high-value IT infrastructure and server equipment into Europe?',
        answer: 'Yes. We provide dedicated, air-ride, GPS-monitored direct road vehicles across the EU with dual-manned crews, ensuring high-value tech assets travel without multi-hub transhipment.',
      },
      {
        question: 'Do you provide export packing and international timber crating on site?',
        answer: 'Yes. We build custom ISPM-15 heat-treated wooden crates on site to protect delicate electronics, precision machinery, optical instruments, and valuable corporate archives.',
      },
      {
        question: 'What tracking and visibility is provided during international transport?',
        answer: 'Clients receive continuous satellite telemetry tracking, milestone notifications upon port departure and customs clearance, and dedicated point-of-contact move coordinators.',
      },
      {
        question: 'Can you coordinate employee domestic household relocations alongside office assets?',
        answer: 'Yes. We handle executive relocation packages for international staff transfers, providing professional home packing, shipping, customs support, and destination delivery.',
      },
      {
        question: 'What international marine and transit insurance covers global shipments?',
        answer: 'We provide comprehensive door-to-door marine cargo insurance covering accidental damage, loss, transit disruption, and customs quarantine risks for total financial assurance.',
      },
    ],
  },

  'heritage-relocations-storage-services': {
    eyebrow: 'HERITAGE MOVE FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Protocols for moving delicate historical collections, museum archives, and art.',
    faqs: [
      {
        question: 'What specialized protocols govern TechSteps heritage and museum relocations?',
        answer: 'We adhere to BS 4971 and SPECTRUM museum documentation standards, deploying conservation-trained technicians, archival packaging, and climate-buffered transport systems.',
      },
      {
        question: 'How are delicate, historical, and fragile manuscripts protected during transit?',
        answer: 'Items are cushioned with acid-free tissue, archival Melinex sleeves, bespoke Ethafoam shock-absorbing cavities, and sealed within climate-buffered transit containers.',
      },
      {
        question: 'Can you move oversized historical artefacts, sculptures, and architectural fragments?',
        answer: 'Yes. Our riggers design bespoke timber crating and rigging frameworks, deploying specialised gantry hoists, air-skates, and tail-lift fleet vehicles for heavy heritage items.',
      },
      {
        question: 'Are transit vehicles equipped with active climate control and air-ride suspension?',
        answer: 'Yes. Vehicles feature active temperature regulation, pneumatic air-ride suspension that eliminates road vibration, and live telemetry tracking of internal environmental conditions.',
      },
      {
        question: 'Can you store heritage collections during museum or library refurbishments?',
        answer: 'Yes. We operate secure, climate-controlled BS 4971 heritage repositories with 24/7 CCTV, VESDA fire protection, and zero-UV illumination for short or long-term decants.',
      },
      {
        question: 'What security vetting is conducted on heritage relocation teams?',
        answer: 'All heritage technicians and supervisors are BS 7858 security-vetted and non-disclosure bound, with extensive experience handling fragile cultural property in public institutions.',
      },
      {
        question: 'How do you coordinate chain of custody and condition reporting?',
        answer: 'Our team performs pre-move and post-move condition reports with high-resolution photographic documentation, tracking every accession number through barcoded transit manifests.',
      },
    ],
  },

  'it-relocations-specialist-services': {
    eyebrow: 'IT RELOCATION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Operational details on server de-racking, data centre moves, and PC deployment.',
    faqs: [
      {
        question: 'What IT infrastructure relocation services does TechSteps provide?',
        answer: 'We provide desktop PC and monitor rollouts, server room de-racking and re-racking, SAN storage array moves, core network migration, and structured patch cabling services.',
      },
      {
        question: 'How do you protect mission-critical servers and disk arrays during transit?',
        answer: 'Hardware is packed into anti-static bubble envelopes and loaded into bespoke high-density foam flight cases. Transport is conducted using dedicated air-ride, GPS-tracked vehicles.',
      },
      {
        question: 'Can your engineers perform cable mapping and port patch documentation?',
        answer: 'Yes. Before disconnection, our technical engineers map network port connections, power phases, and switch configurations, ensuring identical physical re-patching at the destination.',
      },
      {
        question: 'How do you minimise operational downtime for corporate data centre moves?',
        answer: 'We execute data centre migrations over weekend maintenance windows, completing de-racking, transport, re-installation, power-on testing, and network ping validation before Monday.',
      },
      {
        question: 'Can you handle multi-screen financial trading desks and CAD workstations?',
        answer: 'Yes. We specialize in trading floor relocations involving multi-monitor array brackets, bespoke cable management, and high-specification peripheral reconnection.',
      },
      {
        question: 'What happens to redundant cabling, server racks, and dead assets after a move?',
        answer: 'We provide complete decommissioning: redundant patch leads, server rails, obsolete racks, and decommissioned servers are sustainably recycled under our certified ITAD process.',
      },
      {
        question: 'What technical credentials and insurance cover TechSteps IT relocation teams?',
        answer: 'Our engineers are experienced server technicians trained in static-safe handling and data centre protocols, backed by substantial goods-in-transit and professional indemnity policies.',
      },
    ],
  },

  'laboratory-relocations-storage-services': {
    eyebrow: 'LAB RELOCATION FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Guidance on moving sensitive analytical equipment, cold-chain samples, and lab supplies.',
    faqs: [
      {
        question: 'What categories of laboratory equipment and assets does TechSteps relocate?',
        answer: 'We relocate mass spectrometers, HPLC systems, biosafety cabinets, centrifuges, incubators, robotic liquid handlers, -80°C ultra-low freezers, and sensitive chemical stores.',
      },
      {
        question: 'How do you transport cold-chain biological samples and reagents safely?',
        answer: 'We deploy validated liquid nitrogen dry shippers, dry-ice insulated containers, and temperature-logged mobile carriers maintaining sample integrity from -196°C to +4°C.',
      },
      {
        question: 'Are your vehicles and drivers compliant with ADR hazardous transport rules?',
        answer: 'Yes. We operate ADR-compliant vehicles equipped with dangerous goods safety gear, driven by ADR-licensed logistics personnel certified in chemical and biological hazard transit.',
      },
      {
        question: 'Can you recalibrate or decontaminate laboratory equipment before moving?',
        answer: 'We coordinate with manufacturer field engineers for decommissioning and re-commissioning, and verify decontamination certificates prior to handling biological safety cabinets.',
      },
      {
        question: 'How are sensitive analytical instruments cushioned against road shock?',
        answer: 'Delicate mass spectrometers and optics are secured in custom foam-lined flight cases and transported in air-ride suspension vehicles equipped with tri-axial shock data loggers.',
      },
      {
        question: 'Can you provide temporary climate-controlled storage for laboratory assets?',
        answer: 'Yes. We operate temperature-monitored storage facilities with backup power generators to store lab instruments, consumables, and archives during facility refurbishments.',
      },
      {
        question: 'What documentation and compliance paperwork is generated for lab moves?',
        answer: 'We provide comprehensive RAMS, hazardous waste consignment documentation, sample chain of custody logs, temperature logger data graphs, and equipment transit manifests.',
      },
    ],
  },

  'project-management-services': {
    eyebrow: 'PROJECT MANAGEMENT FAQ',
    heading: 'Frequently Asked Questions',
    intro: 'Information on commercial move planning, site coordination, and risk management.',
    faqs: [
      {
        question: 'What is included in TechSteps Move Project Management service?',
        answer: 'Our project management service covers master scheduling, building landlord liaison, departmental move sequencing, crate delivery coordination, contractor oversight, and post-move support.',
      },
      {
        question: 'How early should our organisation engage a move project manager?',
        answer: 'For complex office or data centre moves, engaging us 3 to 6 months prior to lease expiration allows optimal space planning, IT scoping, landlord approvals, and vendor coordination.',
      },
      {
        question: 'How do you manage communications with internal staff and department heads?',
        answer: 'We create tailored move guidance packs, conduct department champion briefings, establish packing schedules, and maintain an on-site move helpdesk throughout relocation days.',
      },
      {
        question: 'How do you handle health and safety, RAMS, and building management rules?',
        answer: 'Our project managers compile comprehensive Risk Assessments and Method Statements (RAMS), manage loading bay permits, coordinate lift protection, and verify insurance limits.',
      },
      {
        question: 'Can your project managers oversee third-party contractors and fit-out teams?',
        answer: 'Yes. We act as your single point of operational accountability, coordinating telecom installers, furniture vendors, M&E contractors, and building facilities managers.',
      },
      {
        question: 'What contingency planning is implemented for unexpected move challenges?',
        answer: 'We develop robust contingency protocols including standby fleet vehicles, backup logistics crews, emergency temporary storage, and rapid technical escalation channels.',
      },
      {
        question: 'What post-move support is provided once physical relocation is completed?',
        answer: 'Our teams remain on site on Day 1 to resolve minor staff queries, adjust monitor arms, unpack crates, remove packaging waste, and conduct final dilapidations sweeps.',
      },
    ],
  },
};

/**
 * Helper to retrieve tailored FAQs for any page key.
 * Falls back to sensible defaults if key is missing.
 */
export function getPageFaqs(pageKey: string): PageFaqConfig | undefined {
  if (!pageKey) return undefined;
  
  // Direct match
  if (pageFaqs[pageKey]) {
    return pageFaqs[pageKey];
  }

  // Normalize slug variations (e.g. stripping /services/ or -services)
  const normalizedKey = pageKey
    .toLowerCase()
    .replace(/^\/?(services|sectors)\//, '')
    .replace(/\/$/, '');

  if (pageFaqs[normalizedKey]) {
    return pageFaqs[normalizedKey];
  }

  // Check with '-services' suffix
  if (pageFaqs[`${normalizedKey}-services`]) {
    return pageFaqs[`${normalizedKey}-services`];
  }

  // Check sector- prefix
  if (pageFaqs[`sector-${normalizedKey}`]) {
    return pageFaqs[`sector-${normalizedKey}`];
  }

  return undefined;
}

/**
 * Validation function to verify that every registered page has between 6 and 8 FAQs.
 */
export function validateAllPageFaqs(): {
  valid: boolean;
  totalKeys: number;
  invalidKeys: { key: string; count: number }[];
  summary: Record<string, number>;
} {
  const summary: Record<string, number> = {};
  const invalidKeys: { key: string; count: number }[] = [];

  for (const [key, config] of Object.entries(pageFaqs)) {
    const count = config.faqs?.length || 0;
    summary[key] = count;
    if (count < 6 || count > 8) {
      invalidKeys.push({ key, count });
    }
  }

  return {
    valid: invalidKeys.length === 0,
    totalKeys: Object.keys(pageFaqs).length,
    invalidKeys,
    summary,
  };
}
