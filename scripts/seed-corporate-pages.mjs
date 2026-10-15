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

async function seedCorporatePages() {
  console.log('Seeding / updating corporate pages in Sanity...\n');

  // 1. Update leadershipPage document with background and linkedin
  const leadershipDoc = {
    _id: 'leadershipPage',
    _type: 'leadershipPage',
    metaTitle: 'Leadership — TechSteps',
    metaDescription: 'Meet the leadership team behind TechSteps and our commitment to secure, responsible and sustainable IT asset management.',
    hero: {
      eyebrow: 'OUR LEADERSHIP',
      title: 'Leadership with',
      highlightedTitle: 'purpose.',
      subtitle: 'Guiding TechSteps with integrity, innovation and a commitment to creating a more responsible technology lifecycle.',
      imageUrl: '/images/leadership/leadership-hero.png',
      imageAlt: 'TechSteps leadership team',
    },
    intro: {
      label: 'OUR APPROACH',
      title: 'Leadership that puts',
      highlightedTitle: 'responsibility into action.',
      paragraphs: [
        'At TechSteps, leadership is about more than setting direction. It is about creating trust, making responsible decisions and building a business that delivers lasting value for our people, our customers and the planet.',
        'Our leadership team brings together experience across technology, operations and responsible asset management, with a shared focus on creating a more secure and sustainable technology lifecycle.',
      ],
    },
    team: {
      label: 'THE PEOPLE BEHIND TECHSTEPS',
      title: 'Experience that',
      highlightedTitle: 'moves us forward.',
      subtitle: 'Our leadership team brings together experience, expertise and a shared commitment to responsible technology management.',
      members: [
        {
          _key: 'member-1',
          role: 'CHIEF EXECUTIVE OFFICER',
          name: 'Leadership Name',
          bio: 'Driving the vision and long-term direction of TechSteps, with a focus on responsible growth and customer trust.',
          background: 'Technology lifecycle management & corporate governance',
          linkedin: 'https://www.linkedin.com/company/techsteps-uk',
          imageUrl: '/images/leadership/leader-1.webp',
          imageAlt: 'TechSteps Chief Executive Officer',
        },
        {
          _key: 'member-2',
          role: 'OPERATIONS DIRECTOR',
          name: 'Leadership Name',
          bio: 'Leading operational excellence and ensuring every stage of the technology lifecycle is managed responsibly.',
          background: 'High-security logistics & chain-of-custody operations',
          linkedin: 'https://www.linkedin.com/company/techsteps-uk',
          imageUrl: '/images/leadership/leader-2.webp',
          imageAlt: 'TechSteps Operations Director',
        },
        {
          _key: 'member-3',
          role: 'COMMERCIAL DIRECTOR',
          name: 'Leadership Name',
          bio: 'Building strong partnerships and creating solutions that deliver measurable value for our customers.',
          background: 'Enterprise IT solutions & ESG partnership strategy',
          linkedin: 'https://www.linkedin.com/company/techsteps-uk',
          imageUrl: '/images/leadership/leader-3.webp',
          imageAlt: 'TechSteps Commercial Director',
        },
        {
          _key: 'member-4',
          role: 'HEAD OF SUSTAINABILITY & COMPLIANCE',
          name: 'Leadership Name',
          bio: 'Overseeing regulatory compliance, security accreditations, and zero-landfill circular pathways across all operations.',
          background: 'Environmental governance & circular economy standards',
          linkedin: 'https://www.linkedin.com/company/techsteps-uk',
          imageUrl: '/images/leadership/leader-4.webp',
          imageAlt: 'TechSteps Head of Sustainability & Compliance',
        },
      ],
    },
    principles: {
      eyebrow: 'WHAT GUIDES US',
      title: 'Principles that',
      highlightedTitle: 'shape our leadership.',
      description: 'The way we lead is grounded in clear principles that influence how we work, make decisions and create value for our customers, people and planet.',
      items: [
        { _key: 'p1', number: '01', title: 'Integrity', description: 'We act with honesty and transparency, building relationships based on trust and accountability.' },
        { _key: 'p2', number: '02', title: 'Responsibility', description: 'We take responsibility for the technology we manage and the environmental impact of every decision we make.' },
        { _key: 'p3', number: '03', title: 'Innovation', description: 'We continuously improve our processes and technology to create smarter, safer and more sustainable solutions.' },
        { _key: 'p4', number: '04', title: 'Long-term thinking', description: 'We focus on creating lasting value rather than short-term solutions, for our customers, people and the planet.' },
      ],
    },
    action: {
      eyebrow: 'LEADERSHIP IN ACTION',
      title: 'Turning responsible',
      highlightedTitle: 'ideas into action.',
      badgeNumber: '01',
      badgeText: 'ONE TEAM ONE PURPOSE',
      imageUrl: '/images/leadership/leadership-action.webp',
      imageAlt: 'TechSteps team working together',
      paragraphs: [
        'Leadership at TechSteps is not distant. Our leaders work closely with our operational teams, ensuring that our commitment to security, sustainability and customer service is delivered on the ground every day.',
        'From secure collection and data sanitisation to responsible recycling and customer reporting, our leadership ensures that every stage of the lifecycle is managed with care and precision.',
      ],
      linkText: 'Talk to our team',
      linkUrl: '/contact',
    },
    commitment: {
      label: 'OUR COMMITMENT',
      title: 'Leading with a focus on',
      highlightedTitle: 'what matters most.',
      description: 'Our leadership is defined by a commitment to the three pillars that matter most to our business, our customers and our future.',
      cards: [
        { _key: 'c1', number: '01', icon: '◈', title: 'People', description: 'Empowering our teams, creating a culture of safety and responsibility, and building trusted relationships with our customers.', isFeatured: false },
        { _key: 'c2', number: '02', icon: '∿', title: 'Planet', description: 'Making responsible choices that reduce waste, extend asset lifecycles and support a circular technology economy.', isFeatured: true },
        { _key: 'c3', number: '03', icon: '⌁', title: 'Technology', description: 'Using expertise and innovation to make technology management more secure, efficient and sustainable.', isFeatured: false },
      ],
    },
    cta: {
      title: "Let's Build a More Responsible Technology Future",
      description: 'Talk to our team about secure, sustainable and responsible IT asset management.',
      primaryText: 'Talk to Our Team',
      primaryHref: '/contact',
      secondaryText: 'Request a Collection',
      secondaryHref: '/request-a-collection',
    },
  };
  await client.createOrReplace(leadershipDoc);
  console.log('✓ leadershipPage created/replaced in Sanity');

  // 2. Global Presence Page
  const globalPresenceDoc = {
    _id: 'globalPresencePage',
    _type: 'globalPresencePage',
    metaTitle: 'Global Presence & Cross-Border Logistics — TechSteps UK',
    metaDescription: 'Discover TechSteps’ nationwide UK network and international logistics capabilities, managing secure IT lifecycle services across 150+ countries.',
    hero: {
      eyebrow: 'GLOBAL REACH & LOCAL EXPERTISE',
      title: 'Worldwide standards.',
      highlightedTitle: 'Nationwide precision.',
      subtitle: 'Connecting secure UK facilities with international logistics, bonded customs storage, and certified cross-border asset transfers across 150+ countries.',
      imageUrl: '/images/hero/Europe & International Domestic Moves.webp',
      imageAlt: 'TechSteps global logistics and cross-border operations',
    },
    intro: {
      label: 'OPERATIONAL FOOTPRINT',
      title: 'Enterprise logistics with',
      highlightedTitle: 'unbroken custody.',
      paragraphs: [
        'From our central UK processing facilities to multi-modal European transport networks, TechSteps provides seamless, audited physical custody for retired technology and confidential information.',
        'We combine nationwide direct collection coverage across England, Scotland, and Wales with Authorized Economic Operator (AEO) customs standards, enabling multinational enterprises to coordinate cross-border decommissioning with zero operational friction.',
      ],
    },
    regions: {
      eyebrow: 'WHERE WE OPERATE',
      title: 'Strategic hubs supporting',
      highlightedTitle: 'every location.',
      subtitle: 'Operating through dedicated UK regional centres and audited partner networks across 150+ countries.',
      locations: [
        {
          _key: 'loc-1',
          name: 'Headquarters & Processing Facility',
          type: 'Primary Operations Centre',
          location: 'Dartford, Kent (Logistics Park)',
          description: 'Central UK operational hub featuring high-security ADISA-certified processing labs, industrial shredding bays, and bonded storage.',
          coverage: 'National Core & Strategic Gateway',
          features: [
            'High-security biometric access control',
            '24/7 CCTV surveillance with 90-day archive',
            'ADISA certified asset sanitisation suites',
            'Environment Agency licensed facility',
          ],
        },
        {
          _key: 'loc-2',
          name: 'London & South East Hub',
          type: 'Regional Operations',
          location: 'Greater London & M25 Corridor',
          description: 'Rapid-response secure collection network tailored for high-density financial, legal, and government data centres.',
          coverage: 'London, Surrey, Essex, Berkshire',
          features: [
            'Dedicated low-emission secure vehicle fleet',
            'Same-day and out-of-hours collection capability',
            'BS7858 security-vetted collection personnel',
            'Direct GPS tracking on every transit',
          ],
        },
        {
          _key: 'loc-3',
          name: 'Midlands & Northern Hub',
          type: 'Regional Operations',
          location: 'Birmingham & Manchester Corridors',
          description: 'Serving industrial manufacturing, NHS trusts, regional councils, and educational institutions across central and northern Britain.',
          coverage: 'Midlands, Yorkshire, North West & North East',
          features: [
            'Heavy-volume corporate collection capacity',
            'Specialist on-site hard drive destruction units',
            'Scheduled regular consolidation routes',
            'Full chain-of-custody documentation',
          ],
        },
        {
          _key: 'loc-4',
          name: 'Scotland & Wales Network',
          type: 'Regional Coverage',
          location: 'Edinburgh, Glasgow & Cardiff Routes',
          description: 'Ensuring comprehensive geographic coverage across Scottish commercial centres and Welsh public sector clients.',
          coverage: 'Central Scotland, Highlands Gateway & South Wales',
          features: [
            'Direct secure route planning',
            'Tamper-evident security containerization',
            'Zero subcontractor handoffs',
            'Unified national reporting portal',
          ],
        },
        {
          _key: 'loc-5',
          name: 'European Customs & Bonded Hubs',
          type: 'Cross-Border Operations',
          location: 'United Kingdom & European Gateways',
          description: 'Post-Brexit cross-border compliance management, handling T1 documents, ATA Carnets, and bonded customs storage.',
          coverage: 'UK-EU Transit Corridors & Western Europe',
          features: [
            'In-house customs brokerage via HMRC CDS',
            'Bonded customs warehousing facilities',
            'ISPM 15 certified export packing',
            'Door-to-door pan-European delivery',
          ],
        },
        {
          _key: 'loc-6',
          name: 'Global Partner Network',
          type: 'International Reach',
          location: '150+ Countries Worldwide',
          description: 'Audited international partner network enabling multinational corporations to execute unified asset transfers and executive relocations.',
          coverage: 'North America, EMEA & Asia-Pacific',
          features: [
            'Single point of contact in the UK',
            'Standardized global compliance protocols',
            'Consolidated international ESG reporting',
            'Multi-modal air and ocean freight coordination',
          ],
        },
      ],
    },
    capabilities: {
      label: 'CROSS-BORDER SOLUTIONS',
      title: 'Complete lifecycle solutions',
      highlightedTitle: 'wherever you operate.',
      description: 'Consistent compliance, unified reporting, and secure chain of custody across international borders.',
      items: [
        {
          _key: 'cap-1',
          number: '01',
          title: 'IT Asset Disposition (ITAD)',
          description: 'Certified data sanitisation, testing, refurbishment, and remarketing for enterprise technology fleets across multiple sites.',
          badge: 'ADISA Certified',
          linkUrl: '/services/it-asset-disposition',
        },
        {
          _key: 'cap-2',
          number: '02',
          title: 'Secure Collection & Chain of Custody',
          description: 'Satellite-tracked, dedicated company vehicles with dual-driver crews and tamper-evident containerization from desk to facility.',
          badge: 'GPS Tracked',
          linkUrl: '/services/secure-collection',
        },
        {
          _key: 'cap-3',
          number: '03',
          title: 'Cross-Border Corporate Relocations',
          description: 'Specialist server, laboratory, and corporate asset relocation with comprehensive customs clearance and export crating.',
          badge: 'HMRC CDS Integrated',
          linkUrl: '/services/europe-international-domestic-moves',
        },
        {
          _key: 'cap-4',
          number: '04',
          title: 'Ultra-Secure Destruction',
          description: 'On-site mobile shredding or off-site high-security disintegration to DIN 66399 standards with serialized audit certificates.',
          badge: 'DIN 66399 Standards',
          linkUrl: '/services/ultra-secure-hard-drive-destruction',
        },
        {
          _key: 'cap-5',
          number: '05',
          title: 'Bonded Customs Warehousing',
          description: 'Secure bonded storage in the UK and European hubs, deferring duties and taxes while assets await final clearance or deployment.',
          badge: 'Bonded Storage',
          linkUrl: '/services/vault-storage',
        },
        {
          _key: 'cap-6',
          number: '06',
          title: 'Information & Document Management',
          description: 'Secure records storage, digital scanning, and scheduled compliance archiving across national enterprise branch networks.',
          badge: 'BS EN 15713',
          linkUrl: '/services/document-management',
        },
      ],
    },
    standards: {
      label: 'COMPLIANCE & GOVERNANCE',
      title: 'Certified standards for',
      highlightedTitle: 'total peace of mind.',
      description: 'Every facility, vehicle, and partner adheres to the most stringent international compliance benchmarks.',
      items: [
        { _key: 'std-1', code: 'ADISA Industry Standard', name: 'Asset Disposal & Information Security Alliance', description: 'Highest standard of data sanitisation audit and verification for retired solid-state drives and enterprise storage.' },
        { _key: 'std-2', code: 'ISO 27001', name: 'Information Security Management System', description: 'Certified management systems ensuring robust data protection policies across physical and digital asset custody.' },
        { _key: 'std-3', code: 'ISO 14001', name: 'Environmental Management System', description: 'Audited environmental workflows guaranteeing zero-landfill diversion for all recoverable electronic equipment.' },
        { _key: 'std-4', code: 'ISO 9001', name: 'Quality Management System', description: 'Process consistency and customer satisfaction audited across all corporate lifecycle operations.' },
        { _key: 'std-5', code: 'BS7858 Standard', name: 'Security Screening of Personnel', description: '100% of operational staff undergo comprehensive 5-year background checks, criminal record verification, and identity audits.' },
        { _key: 'std-6', code: 'Environment Agency', name: 'Upper Tier Waste Carrier & Broker', description: 'Fully licensed by the UK Environment Agency (CBDU484210) for compliant hazardous WEEE transport and transfer notes.' },
      ],
    },
    cta: {
      title: 'Connect With Our Global Logistics Specialists',
      description: 'Whether you require secure UK ITAD collection or cross-border asset transfers across Europe and beyond, our team is ready to assist.',
      primaryText: 'Speak to a Specialist',
      primaryHref: '/contact',
      secondaryText: 'Request a Collection',
      secondaryHref: '/request-a-collection',
    },
  };
  await client.createOrReplace(globalPresenceDoc);
  console.log('✓ globalPresencePage created/replaced in Sanity');

  // 3. Our People & Culture Page
  const peopleCultureDoc = {
    _id: 'peopleCulturePage',
    _type: 'peopleCulturePage',
    metaTitle: 'Our People & Culture — TechSteps UK',
    metaDescription: 'Discover the culture, people, and values powering TechSteps UK. Security-vetted professionals dedicated to responsible technology lifecycle management.',
    hero: {
      eyebrow: 'OUR PEOPLE & CULTURE',
      title: 'Powered by people.',
      highlightedTitle: 'Defined by purpose.',
      subtitle: 'Behind every securely retired device and every sustainable outcome is a dedicated team of security-vetted specialists, engineers and logistics professionals.',
      imageUrl: '/images/about/who-we-are-technician.png',
      imageAlt: 'TechSteps technician handling technology equipment',
    },
    people: {
      label: 'THE TEAM BEHIND THE STANDARDS',
      title: 'Expertise that safeguards',
      highlightedTitle: 'every step.',
      paragraphs: [
        'At TechSteps, our greatest strength is our workforce. From vetted logistics personnel navigating high-security corporate sites to specialist technicians wiping data to ADISA specifications, our team approaches every task with discipline, care, and precision.',
        'We believe that true data security and circular economy outcomes begin with human responsibility. That is why every member of the TechSteps family is invested in our mission: managing what matters for businesses, communities, and the environment.',
      ],
      stats: [
        { _key: 's1', number: '100%', label: 'BS7858 Vetted', subtext: 'Every operational team member undergoes rigorous background screening' },
        { _key: 's2', number: '100K+', label: 'Assets Processed', subtext: 'Managed annually with zero reported chain-of-custody breaches' },
        { _key: 's3', number: '0%', label: 'To Landfill', subtext: 'Shared team commitment to zero recoverable material waste' },
      ],
      imageUrl: '/images/brand/milestone-team.jpg',
      imageAlt: 'TechSteps operational team',
    },
    culture: {
      label: 'OUR VALUES IN PRACTICE',
      title: 'A culture built on trust,',
      highlightedTitle: 'precision and care.',
      subtitle: 'Our daily decisions and workplace environment are guided by four core cultural commitments.',
      pillars: [
        { _key: 'cp1', number: '01', title: 'Security & Compliance First', description: 'Data protection is in our DNA. We cultivate an environment where adherence to protocol is non-negotiable and client confidentiality is sacrosanct.', icon: '🔒' },
        { _key: 'cp2', number: '02', title: 'One Team, One Purpose', description: 'We celebrate mutual respect, transparent communication, and shared accountability across logistics, laboratory, and management teams.', icon: '🤝' },
        { _key: 'cp3', number: '03', title: 'Sustainable Innovation', description: 'Our people actively champion circular economy thinking, looking for every opportunity to extend asset life, recover components, and minimize carbon.', icon: '🌱' },
        { _key: 'cp4', number: '04', title: 'Continuous Mastery', description: 'We invest in ongoing professional certifications, safety education, and career development so that every team member can master their craft.', icon: '📈' },
      ],
    },
    howWeWork: {
      label: 'OUR COLLABORATIVE APPROACH',
      title: 'How our teams deliver',
      highlightedTitle: 'consistent excellence.',
      description: 'A disciplined, transparent workflow ensuring client satisfaction and unbroken compliance at every touchpoint.',
      steps: [
        { _key: 'step1', stepNumber: '01', title: 'Consultation & Scoping', description: 'Our client success team works closely with your stakeholders to define security protocols, equipment inventories, and regulatory deadlines.', badge: 'Discovery & Planning' },
        { _key: 'step2', stepNumber: '02', title: 'Secure Chain-of-Custody Collection', description: 'BS7858-vetted drivers arrive on-site in dedicated, satellite-tracked vehicles, cataloging serial numbers into secure custody barcoding.', badge: 'Secure Logistics' },
        { _key: 'step3', stepNumber: '03', title: 'Laboratory Processing & Sanitisation', description: 'Certified technicians perform NIST-standard data erasure, component harvesting, or physical destruction within high-security facilities.', badge: 'ADISA Lab Testing' },
        { _key: 'step4', stepNumber: '04', title: 'Verification, Audit & ESG Reporting', description: 'Complete compliance reporting is delivered, including destruction certificates, WEEE transfer notes, and Scope 3 carbon reduction metrics.', badge: 'Certified Compliance' },
      ],
    },
    learningDevelopment: {
      label: 'CONTINUOUS IMPROVEMENT',
      title: 'Investing in our people,',
      highlightedTitle: 'mastering standards.',
      description: 'We foster a culture of professional growth, equipping our staff with industry-recognized certifications and ongoing compliance training.',
      items: [
        { _key: 'prog1', title: 'ADISA & Data Sanitisation Training', description: 'Rigorous technical qualification in NIST 800-88, Blancco erasure systems, and secure media physical destruction protocols.', badge: 'Security Certification' },
        { _key: 'prog2', title: 'Health, Safety & Manual Handling', description: 'IOSH-aligned safety education, heavy logistics training, and dangerous goods transport standards for battery management.', badge: 'Operational Safety' },
        { _key: 'prog3', title: 'Leadership & Mentorship Programs', description: 'Internal pathways developing senior technicians, logistics supervisors, and account executives from within our team.', badge: 'Career Growth' },
        { _key: 'prog4', title: 'Environmental & Circular Economy Auditing', description: 'Specialist education in waste hierarchy compliance, e-waste material recovery, and carbon avoidance accounting.', badge: 'ESG Excellence' },
      ],
    },
    peoplePlanetProgress: {
      label: 'SUSTAINABILITY & PURPOSE',
      title: 'People. Planet.',
      highlightedTitle: 'Progress.',
      paragraphs: [
        'Our team is personally connected to the positive environmental impact we generate every day. When we extend the useful life of enterprise hardware or prevent hazardous e-waste from entering disposal streams, our people see the tangible results of their efforts.',
        'We empower our staff to identify sustainable process enhancements, participate in community e-waste initiatives, and hold ourselves accountable to the highest ecological standards in the UK.',
      ],
      metrics: [
        { _key: 'm1', number: '100K+', label: 'Devices Processed Responsibly' },
        { _key: 'm2', number: '500+', label: 'Enterprise Businesses Supported' },
        { _key: 'm3', number: '0%', label: 'Recoverable Landfill Waste' },
      ],
      imageUrl: '/images/about/People. Planet. Progress. (1).webp',
      imageAlt: 'People, Planet, Progress impact visualization',
    },
    cta: {
      title: 'Join Us in Shaping a Responsible Technology Lifecycle',
      description: 'Talk to our team about secure, sustainable IT asset management or explore career opportunities with TechSteps.',
      primaryText: 'Contact Our Team',
      primaryHref: '/contact',
      secondaryText: 'Explore Sustainability',
      secondaryHref: '/sustainability',
    },
  };
  await client.createOrReplace(peopleCultureDoc);
  console.log('✓ peopleCulturePage created/replaced in Sanity');

  console.log('\nAll corporate pages successfully created in Sanity!');
}

seedCorporatePages().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
