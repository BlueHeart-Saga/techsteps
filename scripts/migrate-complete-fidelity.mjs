import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function main() {
  console.log('=== STEP 1: REMOVING DUPLICATE LEGALPAGE-* STUBS ===');
  const duplicateIds = [
    'legalPage-accessibility',
    'legalPage-cookie-policy',
    'legalPage-environmental-policy',
    'legalPage-information-security-policy',
    'legalPage-modern-slavery-statement',
    'legalPage-privacy-policy',
    'legalPage-terms-and-conditions',
  ];

  for (const id of duplicateIds) {
    try {
      await client.delete(id);
      console.log(`✓ Deleted duplicate ${id}`);
    } catch (e) {
      console.log(`Could not delete ${id}:`, e.message);
    }
  }

  console.log('\n=== STEP 2: PATCHING DIVISIONS WITH EXACT ASTRO SOURCE OF TRUTH ===');
  const divisionPatches = [
    {
      id: 'div-im',
      patch: {
        heroTitle: 'Information Management Services UK',
        heroDescription: 'Secure, organised and compliant information management solutions designed to help UK businesses store, manage, protect and access critical business information.',
        aboutTitle: 'Information Management Built Around Your Business',
        aboutParagraphs: [
          'Every organisation holds information it cannot afford to lose: contracts, client files, employee records, backup media and historic collections. Information management is the discipline of keeping all of it under control, whether it sits in a box, on a tape or in a digital system.',
          'We help UK businesses manage their records through three connected services: secure off-site document storage in purpose-built facilities, accredited document scanning to bring paperwork into digital workflows, and digital mailroom operations to process inbound post before it reaches an office.',
        ],
      },
    },
    {
      id: 'div-it',
      patch: {
        heroTitle: 'IT Lifecycle & Destruction Services UK',
        heroDescription: 'Certified IT asset disposition, ADISA-compliant data sanitisation, hardware remarketing, and zero-landfill e-waste recycling for UK organisations.',
        aboutTitle: 'Sustainable, Secure IT Asset Management for Modern Enterprise',
        aboutParagraphs: [
          'As enterprise technology rapidly evolves, organisations accumulate redundant workstations, servers, mobile devices, and data storage arrays. IT lifecycle management ensures every retired asset is handled with absolute security, audited transparency, and environmental accountability — protecting your sensitive data while driving sustainable circular economy outcomes.',
          'From BS 7858 vetted collection in GPS-tracked vehicles to ADISA-certified data sanitisation and certified WEEE recycling, Techsteps provides an unbroken chain of custody. We maximise residual asset value through expert refurbishment and remarketing, while guaranteeing zero electronic waste reaches landfill.',
        ],
      },
    },
    {
      id: 'div-mv',
      patch: {
        heroTitle: 'Specialist Moving & Commercial Relocation Services UK',
        heroDescription: 'Specialist IT relocation, laboratory moves, museum and archive transportation, and complex commercial workplace migrations delivered with minimal operational disruption.',
        aboutTitle: 'Precision Relocation Engineered for Critical Infrastructure',
        aboutParagraphs: [
          'Relocating complex enterprise technology, specialized scientific laboratories, or historic cultural collections requires far more than conventional removals. It demands meticulous engineering, specialized protective packaging, air-ride suspension logistics, and seasoned project managers who understand the absolute value of uninterrupted business continuity.',
          'Techsteps delivers complete end-to-end relocation solutions across the UK and internationally. From de-racking, cable-mapping, and re-commissioning high-density server racks to transporting temperature-sensitive laboratory reagents and priceless heritage archives, we execute every phase with pinpoint precision and full transit insurance.',
        ],
      },
    },
    {
      id: 'div-sh',
      patch: {
        heroTitle: 'Secure Shredding & Destruction Services UK',
        heroDescription: 'BS EN 15713 accredited on-site mobile shredding, off-site destruction facilities, and certified product disposal ensuring total compliance with UK GDPR and data protection standards.',
        aboutTitle: 'Certified Data Destruction Built for Total Peace of Mind',
        aboutParagraphs: [
          'Sensitive business intelligence, financial accounts, personnel records, and discarded hard drives represent severe security risks if disposed of through standard waste streams. Techsteps delivers certified, auditable destruction services that guarantee complete irreversible disposal of physical and digital records.',
          'Whether you require scheduled locked consoles in corporate offices, bulk archive clearances, or mobile cross-cut shredding vehicles operating at your facility under direct observation, our BS 7858 vetted personnel provide an unbroken chain of custody. Every destruction event concludes with a formal Certificate of Destruction.',
        ],
      },
    },
  ];

  for (const item of divisionPatches) {
    await client.patch(item.id).set(item.patch).commit();
    console.log(`✓ Patched division ${item.id} with approved Astro content`);
  }

  console.log('\n=== STEP 3: PATCHING SRV-DOCUMENT-STORAGE WITH DETAILED CUSTOM CONTENT ===');
  const docStoragePatch = {
    heroTag: 'INFORMATION MANAGEMENT',
    heroTitle: 'Secure Document Storage Services UK',
    heroDescription: 'Secure off-site document storage solutions for UK businesses, helping protect important records while keeping them organised, accessible and professionally managed.',
    aboutBadge: 'About The Service',
    aboutTitle: 'Secure Document Storage for Your Business',
    aboutImage: '/images/services/document-storage-warehouse.jpg',
    aboutImageAlt: 'Techsteps Secure Document Storage Warehouse Facility',
    aboutParagraphs: [
      'Paper records still matter. Contracts, personnel files, financial documents and client paperwork often have to be kept for years, but they do not need to take up space in your office.',
      'Our secure document storage service moves those records off-site into a controlled environment, where each box is barcoded, catalogued and tracked. You keep full visibility of what you hold and where it is, and you decide who is allowed to request it.',
      'When you need a file, we retrieve it and bring it back to you. When a retention period comes to an end, you can review what you hold and decide what happens next.',
    ],
    aboutBullets: [
      'Barcoded, catalogued boxes with item-level tracking',
      'Access strictly limited to individuals you authorise',
      'Rapid retrieval and scan-on-demand whenever you need a file back',
    ],
    whyTitle: 'Why Businesses Choose Secure Document Storage',
    whySubtitle: 'Keeping archives in-house ties up high-value square footage and exposes confidential files to loss or data breaches. Our secure storage facility provides a safer, more economical and audit-ready solution.',
    whyPoints: [
      {
        number: '01',
        title: 'Enhanced Security & Protection',
        description: 'Physical records are protected against fire, flood, dust and unauthorized access in our purpose-built, climate-monitored facility.',
      },
      {
        number: '02',
        title: 'More Office Space',
        description: 'Reclaim prime workplace footprint by transferring cumbersome filing cabinets into scalable, cost-efficient off-site shelving.',
      },
      {
        number: '03',
        title: 'Easy Document Retrieval',
        description: 'Emergency same-day delivery or 2-hour scan-on-demand options mean your critical files are always within immediate reach.',
      },
      {
        number: '04',
        title: 'Controlled Record Management',
        description: 'Automated retention scheduling alerts you when files reach statutory maturity, enabling compliant review or secure shredding.',
      },
    ],
    processBadge: 'Our Process',
    processTitle: 'Our Document Storage Process',
    processSubtitle: 'A clear, auditable four-step process for moving documents off site and retrieving them whenever required.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'Collect',
        description: 'We supply high-grade archive boxes or collect your existing boxed paperwork using secure GPS-tracked vehicles and security-cleared personnel.',
      },
      {
        stepNumber: '02',
        title: 'Catalogue',
        description: 'Every container is tagged with an encrypted barcode, indexed into your inventory portal, and assigned a dedicated shelf address.',
      },
      {
        stepNumber: '03',
        title: 'Secure Storage',
        description: 'Documents are safely housed inside climate-controlled vaults protected by 24/7 CCTV, VESDA smoke detection and dual-factor access control.',
      },
      {
        stepNumber: '04',
        title: 'Retrieve When Needed',
        description: 'Request physical deliveries direct to your desk or electronic Scan-on-Demand files via our self-service management platform.',
      },
    ],
  };

  const targetDoc = await client.fetch('*[_type == "service" && slug.current == "document-storage"][0]');
  if (targetDoc) {
    await client.patch(targetDoc._id).set(docStoragePatch).commit();
    console.log(`✓ Patched document-storage service (${targetDoc._id}) with detailed custom content`);
  }

  console.log('\n=== MIGRATION COMPLETE ===');
}

main().catch(console.error);
