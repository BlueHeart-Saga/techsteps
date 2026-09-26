import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
let token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;

if (!token) {
  const configPath = path.join(home, '.config', 'sanity', 'config.json');
  if (existsSync(configPath)) {
    const cfg = JSON.parse(readFileSync(configPath, 'utf8'));
    token = cfg.authToken;
  }
}

if (!token) {
  console.error('No Sanity auth token found!');
  process.exit(1);
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2026-03-01',
  token,
  useCdn: false,
});

async function run() {
  console.log('Seeding & patching full CMS data in Sanity...');

  // 1. Update homePage detailDrivenSteps timeline
  const homeDoc = await client.fetch(`*[_type == "homePage" && !(_id in path("drafts.**"))][0]`);
  if (homeDoc) {
    console.log('Patching homePage lifecycle.steps...');
    await client
      .patch(homeDoc._id)
      .set({
        'lifecycle.steps': [
          {
            _key: 'step1',
            stepNumber: '01',
            title: 'Discovery & Concept',
            headline: 'Full Audit of Hardware, Data Sensitivities & Compliance Mandates',
            lead: 'Our specialists audit asset inventories, data classification risks, and legal custody frameworks.',
            description: 'Before a single device leaves your premises, our security-cleared personnel catalogue every serial number, barcode, and data sensitivity mandate on-site to establish an immutable audit baseline.',
            badge: 'PHASE 01 // AUDIT',
            tag: 'ISO 27001 & NIST 800-88 Auditing',
            imageAlt: 'Specialist inspecting retired computing technology with precision and care',
          },
          {
            _key: 'step2',
            stepNumber: '02',
            title: 'Design & Planning',
            headline: 'Bespoke Chain of Custody & Dedicated GPS Transit Protocols',
            lead: 'Our team transforms lifecycle requirements into accredited, fail-safe logistics and security solutions.',
            description: 'We engineer point-to-point transit workflows utilizing BS 7858 security-vetted drivers, solid-sided GPS-tracked vehicles, and tamper-evident serialized lockboxes under dual signature sign-off.',
            badge: 'PHASE 02 // LOGISTICS',
            tag: 'BS 7858 Vetted Drivers • Live GPS Telematics',
            imageAlt: 'Vetted UK specialist logistics and engineering personnel',
          },
          {
            _key: 'step3',
            stepNumber: '03',
            title: 'Planning & Approval',
            headline: 'ADISA 8.0 Sanitisation & High-Security Data Destruction',
            lead: 'Every drive, tape, and storage array is processed through certified data sanitisation or shredding.',
            description: 'Using Blancco Enterprise sanitisation software and high-torque physical shredders, we eradicate 100% of residual data to DIN 66399 Level P-4 to P-7 standards.',
            badge: 'PHASE 03 // DESTRUCTION',
            tag: 'ADISA 8.0 Certified • DIN 66399 P-7 Physical Shredding',
            imageAlt: 'Industrial high-security data destruction and disk sanitisation',
          },
          {
            _key: 'step4',
            stepNumber: '04',
            title: 'Development & Build',
            headline: 'Component Testing, Refurbishment & Sustainable Value Recovery',
            lead: 'Component-level diagnostic testing ensures maximum residual value extraction for enterprise technology.',
            description: 'Our certified engineers test, repair, and re-certify functional IT hardware to extend product lifecycles, returning maximum financial rebate directly to your organization.',
            badge: 'PHASE 04 // REFURBISHMENT',
            tag: 'ISO 9001 Certified Quality Testing & Value Recovery',
            imageAlt: 'High-tech server rack component testing and lifecycle refurbishment',
          },
          {
            _key: 'step5',
            stepNumber: '05',
            title: 'Testing & QA',
            headline: 'Zero Landfill Raw Material Processing & E-Waste Segregation',
            lead: 'Non-reusable components enter specialized UK refining channels for 100% material recovery.',
            description: 'End-of-life hardware is segregated into precious metals, plastics, and high-grade copper under WEEE guidelines, ensuring absolute Zero Landfill compliance across all operations.',
            badge: 'PHASE 05 // RECYCLING',
            tag: 'Environment Agency Permitted • 100% Zero Landfill Guarantee',
            imageAlt: 'Clean eco-friendly material recycling and zero landfill processing',
          },
          {
            _key: 'step6',
            stepNumber: '06',
            title: 'Launch & Handoff',
            headline: 'Automated Compliance Reporting, WTNs & Destruction Certificates',
            lead: 'Complete audit documentation delivered directly to your ESG governance and legal teams.',
            description: 'Every completed engagement generates serialized Certificates of Data Destruction, Waste Transfer Notes (WTNs), and ESG carbon savings reports ready for corporate audit submission.',
            badge: 'PHASE 06 // COMPLIANCE',
            tag: 'GDPR Article 28 Compliant • Automated Portal Documentation',
            imageAlt: 'Digital compliance report and carbon audit dashboard interface',
          }
        ]
      })
      .commit();
    console.log('Successfully updated homePage lifecycle.steps in Sanity!');
  }

  // 2. Update sustainabilityPage lifecycleSteps
  const susDoc = await client.fetch(`*[_type == "sustainabilityPage" && !(_id in path("drafts.**"))][0]`);
  if (susDoc) {
    console.log('Patching sustainabilityPage lifecycleSteps...');
    await client
      .patch(susDoc._id)
      .set({
        lifecycleSteps: [
          {
            _key: 's1',
            step: '01',
            title: 'Audit & Consultation',
            badge: 'PHASE 01 // DISCOVERY',
            desc: 'Comprehensive inventory assessment and data security risk mapping on-site at your facilities.',
            features: ['Asset serial tracking', 'Risk classification', 'Custody agreement'],
            details: {
              headline: 'Baseline Inventory & Environmental Risk Classification',
              bulletPoints: [
                'Full asset tagging & barcode serialization prior to decommissioning',
                'Classification of data-bearing vs. non-data enterprise hardware',
                'Bespoke carbon offset & ESG impact estimation report'
              ],
              metric: '100%',
              metricLabel: 'Serialized Audit Tracking'
            }
          },
          {
            _key: 's2',
            step: '02',
            title: 'Chain-of-Custody Logistics',
            badge: 'PHASE 02 // LOGISTICS',
            desc: 'BS 7858 security-vetted drivers transport assets in solid-sided GPS-tracked vehicles.',
            features: ['GPS telematics', 'Tamper-evident seals', 'Dual sign-off'],
            details: {
              headline: 'Secure Point-to-Point UK Nationwide Logistics',
              bulletPoints: [
                'GPS tracked vehicle fleet with remote security monitoring',
                'Tamper-evident serialized lockable roll cages',
                'Dual-signature digital custody transfer at your loading bay'
              ],
              metric: '0',
              metricLabel: 'Custodial Breaches Since Inception'
            }
          },
          {
            _key: 's3',
            step: '03',
            title: 'Data Destruction',
            badge: 'PHASE 03 // SANITISATION',
            desc: 'ADISA 8.0 certified sanitisation and physical shredding to DIN 66399 Level P-4 to P-7.',
            features: ['Blancco wiping', 'Defragmentation', 'Certificate generation'],
            details: {
              headline: 'Accredited Data Eradication & Disk Destruction',
              bulletPoints: [
                'Blancco 5-pass software wiping with automated verification',
                'On-site or off-site high-torque hard drive shredding (6mm particle size)',
                'Serialized Certificate of Data Destruction for GDPR compliance'
              ],
              metric: 'P-7',
              metricLabel: 'Highest Security Shredding Level'
            }
          },
          {
            _key: 's4',
            step: '04',
            title: 'Testing & Refurbishment',
            badge: 'PHASE 04 // REUSE',
            desc: 'Component-level diagnostic testing ensures maximum residual value extraction for functional hardware.',
            features: ['Component testing', 'Part replacement', 'Re-certification'],
            details: {
              headline: 'Enterprise Hardware Testing & Life Extension',
              bulletPoints: [
                'Multi-point diagnostic hardware bench testing by qualified technicians',
                'Component refurbishment and firmware updates',
                'Remarketing to corporate buyers with financial yield return'
              ],
              metric: '84%',
              metricLabel: 'Average Refurbishment & Re-use Yield'
            }
          },
          {
            _key: 's5',
            step: '05',
            title: 'Resource Recovery',
            badge: 'PHASE 05 // RECOVERY',
            desc: 'End-of-life hardware is dismantled into constituent materials for zero-landfill processing.',
            features: ['Precious metal extraction', 'Plastic separation', 'Clean refining'],
            details: {
              headline: 'Closed-Loop Material Recovery & Smelting',
              bulletPoints: [
                'Manual disassembly into circuit boards, metals, cables, and polymers',
                'Certified UK specialist smelting for gold, silver, palladium, and copper',
                'Zero hazardous waste sent to municipal landfill'
              ],
              metric: '100%',
              metricLabel: 'Zero Landfill Commitment'
            }
          },
          {
            _key: 's6',
            step: '06',
            title: 'Circular Recycling',
            badge: 'PHASE 06 // CIRCULARITY',
            desc: 'Recovered raw materials re-enter UK manufacturing supply chains under WEEE directive rules.',
            features: ['WEEE compliance', 'Supply chain return', 'Zero waste to landfill'],
            details: {
              headline: 'Secondary Raw Material Supply Chain Integration',
              bulletPoints: [
                'Plastics granulating and secondary manufacturing re-use',
                'Full compliance with UK Environment Agency WEEE regulations',
                'Quarterly ESG carbon reduction analytics for corporate reporting'
              ],
              metric: '12,500T+',
              metricLabel: 'E-Waste Diverted From Landfill'
            }
          },
          {
            _key: 's7',
            step: '07',
            title: 'Compliance Reporting',
            badge: 'PHASE 07 // AUDIT & ESG',
            desc: 'Serialized Waste Transfer Notes and automated carbon reduction certificates delivered directly via portal.',
            features: ['WTN documentation', 'ESG analytics', 'Portal access'],
            details: {
              headline: 'Automated Governance & Corporate Sustainability Audit',
              bulletPoints: [
                'Instant digital delivery of Waste Transfer Notes (WTNs)',
                'Scope 3 emissions reduction metrics breakdown',
                'Audit-ready documentation portal available 24/7'
              ],
              metric: '24/7',
              metricLabel: 'Portal Audit Access'
            }
          }
        ]
      })
      .commit();
    console.log('Successfully updated sustainabilityPage lifecycleSteps in Sanity!');
  }

  // 3. Update siteSettings trustBadges / accreditations
  const siteDoc = await client.fetch(`*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]`);
  if (siteDoc) {
    console.log('Patching siteSettings accreditationBadges...');
    await client
      .patch(siteDoc._id)
      .set({
        accreditationBadges: [
          { name: 'ISO 27001', label: 'Information Security Management System Certified', tag: 'ISO 27001:2022' },
          { name: 'BS EN 15713', label: 'Secure Destruction of Confidential Material Standard', tag: 'BS EN 15713' },
          { name: 'ADISA 8.0', label: 'Asset Disposal & Information Security Alliance Pass', tag: 'ADISA 8.0' },
          { name: 'DIPCOG', label: 'Defence Information Security & Assurance Approval', tag: 'UK DEFENCE' },
          { name: 'ISO 9001', label: 'Quality Management System Standard', tag: 'ISO 9001:2015' },
          { name: 'Zero Landfill', label: '100% E-Waste Diversion & Circular Economy Guarantee', tag: 'ENVIRONMENT AGENCY' }
        ]
      })
      .commit();
    console.log('Successfully updated siteSettings accreditationBadges in Sanity!');
  }

  // 4. Seed all 7 legalPage documents
  const legalDocs = [
    {
      _id: 'legalPage-privacy-policy',
      _type: 'legalPage',
      title: 'Privacy Policy',
      slug: { _type: 'slug', current: 'privacy-policy' },
      eyebrow: 'DATA PROTECTION & PRIVACY',
      subheading: 'UK GDPR and Data Protection Act 2018 compliance framework governing how Techsteps UK Limited collects, protects, and handles personal and corporate client data.',
      metaTitle: 'Privacy Policy | UK GDPR Data Protection | Techsteps UK',
      metaDescription: 'Techsteps UK Privacy Policy. Comprehensive data protection information detailing personal data handling, legal processing bases, retention, and your statutory rights under UK GDPR.',
      complianceBadge: 'UK GDPR & Data Protection Act 2018',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Introduction & Data Controller',
          body: 'Techsteps UK Limited ("Techsteps", "we", "our", or "us") is dedicated to protecting and upholding the privacy, confidentiality, and security of all personal data entrusted to us. This Privacy Policy details our operational and technical procedures regarding the collection, use, transfer, and retention of personal data collected through our website, client portals, quote requests, and formal contractual engagements.',
          callout: {
            title: 'Statutory Data Controller Information',
            items: [
              { label: 'Data Controller', value: 'Techsteps UK Limited' },
              { label: 'Company Registration', value: '12345678 (England & Wales)' },
              { label: 'Registered Address', value: 'Techsteps House, London, United Kingdom' },
              { label: 'ICO Registration Tier', value: 'Data Controller Registered' }
            ]
          }
        },
        {
          _key: 'sec2',
          heading: '2. Categories of Information We Collect',
          body: 'Depending on how you interact with Techsteps, we collect and process several categories of information required for service delivery and regulatory compliance:',
          cards: [
            { title: 'A. Business Contact & Account Data', description: 'Full name, corporate email address, business telephone number, organizational title, company name, registered business number, and VAT registration identifiers.' },
            { title: 'B. Operational Logistics & Site Access Information', description: 'Collection and delivery site addresses, building security contact details, site access permits, and security clearance data required for our BS 7858 security-screened operatives.' },
            { title: 'C. Asset Tracking & Chain-of-Custody Documentation', description: 'Hardware serial numbers, asset tag IDs, barcode records, Waste Transfer Notes (WTNs), Hazardous Waste Consignment Notes, and joint sign-off digital signatures.' }
          ]
        }
      ]
    },
    {
      _id: 'legalPage-terms-and-conditions',
      _type: 'legalPage',
      title: 'Terms & Conditions',
      slug: { _type: 'slug', current: 'terms-and-conditions' },
      eyebrow: 'CONTRACTUAL GOVERNANCE',
      subheading: 'Standard Terms and Conditions governing commercial service provision, data sanitisation, custody transfer, and client commitments across all Techsteps divisions.',
      metaTitle: 'Terms & Conditions | Commercial Agreement | Techsteps UK',
      metaDescription: 'Commercial Terms and Conditions of Techsteps UK Limited. Governance framework covering IT asset disposition, secure shredding, storage, and relocation services.',
      complianceBadge: 'English Law & Jurisdiction Framework',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Service Engagement & Contract Formation',
          body: 'All formal quotations, collection orders, and service contracts entered into with Techsteps UK Limited are bound by these Commercial Terms and Conditions. Written confirmation, signed work order forms, or electronic acceptance constitutes an irrevocable binding agreement.'
        },
        {
          _key: 'sec2',
          heading: '2. Data Security & Chain of Custody',
          body: 'Techsteps assumes full chain-of-custody responsibility upon physical transfer of assets under dual digital signature sign-off. Data eradication is performed strictly in accordance with ADISA 8.0 and BS EN 15713 standards.'
        }
      ]
    },
    {
      _id: 'legalPage-cookie-policy',
      _type: 'legalPage',
      title: 'Cookie Policy',
      slug: { _type: 'slug', current: 'cookie-policy' },
      eyebrow: 'WEBSITE TRACKING & PREFERENCES',
      subheading: 'Detailed information regarding the use of cookies, tracking technologies, and user consent management on the Techsteps corporate website.',
      metaTitle: 'Cookie Policy | Website Tracking & Privacy | Techsteps UK',
      metaDescription: 'Techsteps UK Cookie Policy explaining essential, analytical, and performance cookies used on our website in compliance with PECR and UK GDPR.',
      complianceBadge: 'PECR & UK GDPR Cookie Guidelines',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. What Are Cookies',
          body: 'Cookies are small text files placed on your computer or mobile device when browsing website pages. Techsteps uses necessary session cookies to maintain core platform security and performance.'
        }
      ]
    },
    {
      _id: 'legalPage-environmental-policy',
      _type: 'legalPage',
      title: 'Environmental Policy',
      slug: { _type: 'slug', current: 'environmental-policy' },
      eyebrow: 'SUSTAINABILITY & ISO 14001',
      subheading: 'Corporate commitment to zero landfill, carbon reduction, circular e-waste recycling, and environmental regulatory compliance.',
      metaTitle: 'Environmental Policy | ISO 14001 & Zero Landfill | Techsteps UK',
      metaDescription: 'Techsteps UK Environmental Policy detailing our zero landfill commitment, WEEE compliance, and Scope 3 carbon reduction initiatives.',
      complianceBadge: 'ISO 14001:2015 & Zero Landfill Certified',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Environmental Commitment & Zero Landfill Target',
          body: 'Techsteps UK Limited is committed to achieving 100% Zero Landfill diversion across all IT asset disposition, document destruction, and commercial recycling activities.'
        }
      ]
    },
    {
      _id: 'legalPage-modern-slavery-statement',
      _type: 'legalPage',
      title: 'Modern Slavery Statement',
      slug: { _type: 'slug', current: 'modern-slavery-statement' },
      eyebrow: 'ETHICAL SUPPLY CHAIN',
      subheading: 'Statutory disclosure under Section 54 of the Modern Slavery Act 2015 detailing our zero-tolerance approach to human trafficking and forced labour.',
      metaTitle: 'Modern Slavery Statement | Ethical Supply Chain | Techsteps UK',
      metaDescription: 'Techsteps UK Modern Slavery Statement detailing supply chain due diligence, workforce vetting, and zero-tolerance anti-trafficking policies.',
      complianceBadge: 'Modern Slavery Act 2015 Section 54',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Organizational Structure & Supply Chain Due Diligence',
          body: 'Techsteps enforces strict anti-slavery and human trafficking standards across all operations, logistics partners, and material processing supply chains.'
        }
      ]
    },
    {
      _id: 'legalPage-accessibility',
      _type: 'legalPage',
      title: 'Accessibility Statement',
      slug: { _type: 'slug', current: 'accessibility' },
      eyebrow: 'DIGITAL INCLUSION & WCAG',
      subheading: 'Our commitment to ensuring the Techsteps website and client portals are accessible to people of all abilities, adhering to WCAG 2.1 Level AA standards.',
      metaTitle: 'Accessibility Statement | WCAG 2.1 Level AA | Techsteps UK',
      metaDescription: 'Techsteps UK Accessibility Statement outlining WCAG 2.1 Level AA digital inclusion compliance across our web platform.',
      complianceBadge: 'WCAG 2.1 Level AA Compliant',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Accessibility Conformance Status',
          body: 'Techsteps is committed to providing a digital platform that is accessible to the widest possible audience, regardless of technology or ability.'
        }
      ]
    },
    {
      _id: 'legalPage-information-security-policy',
      _type: 'legalPage',
      title: 'Information Security Policy',
      slug: { _type: 'slug', current: 'information-security-policy' },
      eyebrow: 'ISO 27001 & DATA PROTECTION',
      subheading: 'High-level Information Security Management System (ISMS) policy governing data destruction, perimeter security, and custodial integrity.',
      metaTitle: 'Information Security Policy | ISO 27001 Certified | Techsteps UK',
      metaDescription: 'Techsteps UK Information Security Policy outlining physical, technical, and operational safeguards protecting client hardware and data assets.',
      complianceBadge: 'ISO 27001:2022 ISMS Certified',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec1',
          heading: '1. Information Security Governance & Standards',
          body: 'Techsteps operates an ISO 27001 certified Information Security Management System (ISMS) ensuring end-to-end data security across asset collection, sanitisation, destruction, and storage.'
        }
      ]
    }
  ];

  for (const doc of legalDocs) {
    console.log(`Creating or updating legalPage: ${doc.slug.current}...`);
    await client.createOrReplace(doc);
  }

  console.log('Finished seeding all Sanity CMS data successfully!');
}

run().catch((err) => {
  console.error('Error running CMS seed script:', err);
  process.exit(1);
});
