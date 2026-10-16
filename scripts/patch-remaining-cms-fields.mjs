import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const configPath = process.env.USERPROFILE + '/.config/sanity/config.json';
let token = process.env.SANITY_API_TOKEN;
if (fs.existsSync(configPath)) {
  const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = conf.authToken || token;
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function main() {
  console.log('--- Patching Remaining Editorial CMS Fields in Sanity ---');

  // 1. siteSettings
  console.log('1. Patching siteSettings...');
  await client
    .patch('siteSettings')
    .set({
      headerContactButtonText: 'Contact Us',
      headerContactButtonLink: '/contact',
      headerRequestButtonText: 'Request a Collection',
      headerRequestButtonLink: '/request-a-quote',
      'socialLinks.facebook': 'http://facebook.com/profile.php?id=61584942775645',
      'socialLinks.linkedin': 'https://www.linkedin.com/company/techsteps-uk/posts/?feedView=all',
      'socialLinks.instagram': 'https://www.instagram.com/techsteps_official/',
    })
    .commit();
  console.log('   siteSettings patched.');

  // 2. homePage
  console.log('2. Patching homePage...');
  await client
    .patch('homePage')
    .set({
      'hero.buttonText': 'Explore Services',
      'hero.buttonLink': '/services',
      'hero.secondaryButtonText': 'Contact Us',
      'hero.secondaryButtonLink': '/contact',
      'hero.bgImageUrl': '/images/brand/hero section.webp',
      'hero.mobileWorkerImageUrl': '/images/brand/hero-worker-mobile.webp',
    })
    .commit();
  console.log('   homePage patched.');

  // 3. requestCollectionPage
  console.log('3. Patching requestCollectionPage...');
  await client
    .patch('requestCollectionPage')
    .set({
      'hero.topHeading': 'Book Your IT Asset Collection',
      'hero.topDescription':
        'Arrange a secure, reliable collection of your IT equipment with TechSteps. Tell us what you need collected and our team will coordinate the next steps.',
      'hero.topButtonText': 'Schedule Collection',
      'hero.topButtonLink': '#collection-booking-form',
      'hero.topSecondaryButtonText': 'Contact Us',
      'hero.topSecondaryButtonLink': '/contact',
      'hero.topImageUrl': '/images/hero/Request a collection.webp',
      'hero.topMobileImageUrl': '/images/hero/Request a collection hero.webp',
      'hero.topImageAlt': 'TechSteps IT asset collection',
    })
    .commit();
  console.log('   requestCollectionPage patched.');

  // 4. sustainabilityPage
  console.log('4. Patching sustainabilityPage...');
  await client
    .patch('sustainabilityPage')
    .set({
      'hero.secondaryButtonText': 'Contact Our Team',
      'hero.secondaryButtonLink': '/contact',
      'hero.imageUrl': '/images/sustainability/Sustainability hero.webp',
      prioritisingLongevity: {
        eyebrow: 'PRIORITISING LONGEVITY',
        heading: 'Reuse Before Recycle.',
        description:
          'Not every device needs to become waste. Where possible, we extend the life of technology, recover value and only recycle when it’s the right option.',
        imageUrl: '/images/sustainability/image.webp',
        imageAlt: 'Enterprise IT Hardware Refurbishment and Remarketing Stack',
        steps: [
          { step: '01', title: 'REUSE', desc: 'Extend the useful life of equipment.' },
          { step: '02', title: 'REMARKET', desc: 'Recover value from suitable technology.' },
          { step: '03', title: 'RECYCLE', desc: 'Responsible materials recovery when reuse is not viable.' },
        ],
      },
    })
    .commit();
  console.log('   sustainabilityPage patched.');

  // 5. contactPage
  console.log('5. Patching contactPage...');
  await client
    .patch('contactPage')
    .set({
      'hero.heroImage': '/images/contact/Contact hero.webp',
      contactInfo: {
        address1: {
          title: 'Address 1',
          address: 'Unit B, Roebuck road\nHainault business park, IG6 3UF',
        },
        address2: {
          title: 'Address 2',
          address: 'Rickerscote Hall Ln, Stafford ST17 4HF',
        },
        email: 'enquiries@techsteps.co.uk',
        phone: '+44 (0) 20 7946 0888',
        freephone: '0800 083 4700',
        socialHeading: 'Follow our social media',
      },
    })
    .commit();
  console.log('   contactPage patched.');

  // 6. Divisions
  console.log('6. Patching Divisions (strategicValue and customerJourney)...');
  
  // div-im
  await client
    .patch('div-im')
    .set({
      strategicValue: {
        heading: 'Why Effective Information Management Matters',
        description: 'The right controls keep information safer, quicker to find and cheaper to hold.',
        pillars: [
          { icon: 'shield', title: 'Protect Critical Information', description: 'Keep important business records secure and accessible.' },
          { icon: 'search', title: 'Improve Information Access', description: 'Find the information your teams need faster.' },
          { icon: 'check', title: 'Support Compliance', description: 'Maintain appropriate controls around sensitive and regulated information.' },
          { icon: 'box', title: 'Reduce Storage Pressure', description: 'Move physical records and media away from valuable office space.' },
        ],
      },
      customerJourney: {
        heading: 'Our Information Management Process',
        description: 'From discovery to ongoing management, a consistent and controlled approach.',
        steps: [
          { number: '01', title: 'Assess', desc: 'We understand your information volumes, retention requirements and access needs.' },
          { number: '02', title: 'Implement', desc: 'Records are catalogued, indexed and transferred into secure storage or digital management.' },
          { number: '03', title: 'Operate', desc: 'Ongoing retrieval, management and access services operate around your requirements.' },
          { number: '04', title: 'Report', desc: 'Retention schedules, destruction records and compliance documentation kept throughout.' },
        ],
      },
    })
    .commit();

  // div-it
  await client
    .patch('div-it')
    .set({
      strategicValue: {
        heading: 'Why Proactive IT Lifecycle Management Matters',
        description: 'A structured approach protects your organisation from data breaches, reduces e-waste, and unlocks residual financial value.',
        pillars: [
          { icon: 'shield-lock', title: 'Eliminate Data Breach Risks', description: 'Certified sanitisation and cryptographic destruction prevent costly data leakage.' },
          { icon: 'dollar', title: 'Recover Maximum Asset Value', description: 'Expert testing, component harvesting, and global remarketing deliver measurable ROI.' },
          { icon: 'leaf', title: 'Zero-Landfill Circular Economy', description: 'Extend hardware lifecycles and ensure 100% compliant materials recovery.' },
          { icon: 'file-check', title: 'Auditable ESG Compliance', description: 'Granular serialization, WEEE transfer documentation, and Scope 3 carbon reporting.' },
        ],
      },
      customerJourney: {
        heading: 'Four Steps to Complete Lifecycle Governance',
        description: 'A rigorous, repeatable chain-of-custody model from collection to certified outcome.',
        steps: [
          { number: '01', title: 'Audit & Plan', desc: 'Pre-collection asset registers, risk assessment, and logistics scheduling.' },
          { number: '02', title: 'Secure Transport', desc: 'BS 7858 vetted crews operating GPS-tracked, solid-bulkhead vehicles.' },
          { number: '03', title: 'Certified Sanitisation', desc: 'ADISA-accredited multi-pass overwriting or physical destruction.' },
          { number: '04', title: 'Rebate & Reporting', desc: 'Detailed asset manifests, destruction certificates, and remarketing return.' },
        ],
      },
    })
    .commit();

  // div-sh
  await client
    .patch('div-sh')
    .set({
      strategicValue: {
        heading: 'Why Certified Shredding & Destruction Matters',
        description: 'Irreversible data destruction shields your business from severe regulatory penalties and reputational harm.',
        pillars: [
          { icon: 'shield-check', title: 'Ensure UK GDPR Compliance', description: 'Meet statutory requirements for confidential document handling and disposal.' },
          { icon: 'crosshair', title: 'Irreversible Shredding', description: 'High-torque cross-cut particle destruction adhering to DIN 66399 standards.' },
          { icon: 'recycle', title: '100% Recycled Paper Stream', description: 'All shredded paper is pulped at UK mills, supporting the circular economy.' },
          { icon: 'certificate', title: 'Auditable Certificates', description: 'Serialized Certificates of Destruction issued after every shredding cycle.' },
        ],
      },
      customerJourney: {
        heading: 'Structured Chain of Custody Destruction',
        description: 'From secure container placement to final recycling, every record remains protected.',
        steps: [
          { number: '01', title: 'Secure Enclosures', desc: 'Tamper-proof locked consoles and bins deployed across your facilities.' },
          { number: '02', title: 'Vetted Collection', desc: 'Security-cleared operatives empty or exchange units on an agreed schedule.' },
          { number: '03', title: 'Cross-Cut Shredding', desc: 'Immediate mobile on-site shredding or secure off-site plant processing.' },
          { number: '04', title: 'Certification', desc: 'Instant waste transfer notes and serialized Certificates of Destruction.' },
        ],
      },
    })
    .commit();

  // div-mv
  await client
    .patch('div-mv')
    .set({
      strategicValue: {
        heading: 'Why Specialist Relocation Expertise Matters',
        description: 'Avoid costly equipment damage, data loss, and prolonged business disruption with proven project management.',
        pillars: [
          { icon: 'clock', title: 'Zero Unplanned Downtime', description: 'Phased, weekend, and overnight migrations ensure seamless operational continuity.' },
          { icon: 'truck', title: 'Specialist Transit Protection', description: 'Air-ride suspension vehicles, custom flight cases, and climate-controlled transport.' },
          { icon: 'clipboard-list', title: 'Turnkey Project Management', description: 'Dedicated move managers overseeing every detail from de-racking to re-commissioning.' },
          { icon: 'shield', title: 'Total Chain of Custody', description: 'Barcode-scanned asset manifests and security-vetted drivers throughout the journey.' },
        ],
      },
      customerJourney: {
        heading: 'Our Relocation Methodology',
        description: 'A disciplined 4-stage project delivery framework proven across enterprise and public sectors.',
        steps: [
          { number: '01', title: 'Site Survey & Audit', desc: 'Comprehensive technical scoping, mapping cabling, and inventory cataloguing.' },
          { number: '02', title: 'De-Rack & Pack', desc: 'Anti-static protective packaging and structured labeling of all components.' },
          { number: '03', title: 'Secure Transport', desc: 'Dedicated GPS-tracked, alarmed vehicles with constant real-time telemetry.' },
          { number: '04', title: 'Re-Rack & Test', desc: 'Precise positioning, structured patching, power-on testing, and sign-off.' },
        ],
      },
    })
    .commit();
  console.log('   All 4 divisions patched.');

  console.log('--- ALL REMAINING EDITORIAL FIELDS SUCCESSFULLY PATCHED IN SANITY ---');
}

main().catch(console.error);
