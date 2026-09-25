import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

// 1. Authenticate with Sanity
const configPath = process.env.USERPROFILE + '/.config/sanity/config.json';
let token = process.env.SANITY_API_TOKEN;
if (fs.existsSync(configPath)) {
  const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = conf.authToken || token;
}

if (!token) {
  console.error('No Sanity authentication token found!');
  process.exit(1);
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function main() {
  console.log('🚀 Starting Comprehensive Sanity Content Migration...\n');

  // =========================================================================
  // 1. MIGRATE THE 7 LEGAL PAGES
  // =========================================================================
  console.log('--- Migrating 7 Legal & Governance Pages ---');
  const legalPages = [
    {
      _id: 'legal-privacy-policy',
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
          _key: 'sec_1',
          heading: '1. Introduction & Data Controller',
          body: 'Techsteps UK Limited ("Techsteps", "we", "our", or "us") is dedicated to protecting and upholding the privacy, confidentiality, and security of all personal data entrusted to us. This Privacy Policy details our operational and technical procedures regarding the collection, use, transfer, and retention of personal data collected through our website, client portals, quote requests, and formal contractual engagements across our four divisions: Information Management, IT Lifecycle Services & Destruction, Secure Shredding & Document Integrity, and Moving & Relocation Services.',
          callout: {
            title: 'Statutory Data Controller Details',
            items: [
              { _key: 'c1', label: 'Data Controller', value: 'Techsteps UK Limited' },
              { _key: 'c2', label: 'Company Registration', value: '09876543 (England & Wales)' },
              { _key: 'c3', label: 'Registered Address', value: 'Techsteps House, Logistics Park, Crossways Boulevard, Dartford, Kent, DA2 6QJ, UK' },
              { _key: 'c4', label: "Information Commissioner's Office (ICO) Tier", value: 'Data Controller Registered' },
            ],
          },
        },
        {
          _key: 'sec_2',
          heading: '2. Categories of Information We Collect',
          body: 'Depending on how you interact with Techsteps, we collect and process several categories of information:',
          cards: [
            {
              _key: 'card_a',
              title: 'A. Business Contact & Account Data',
              description: 'Full name, corporate email address, business telephone number, organizational title, company name, registered business number, and VAT registration identifiers.',
            },
            {
              _key: 'card_b',
              title: 'B. Operational Logistics & Site Access Information',
              description: 'Collection and delivery site addresses, building security contact details, site access permits, vehicle height/loading constraints, and visitor clearance data required for our BS 7858 security-screened operatives.',
            },
            {
              _key: 'card_c',
              title: 'C. Asset Tracking & Chain-of-Custody Documentation',
              description: 'Hardware serial numbers, asset tag IDs, barcode records, Waste Transfer Notes (WTNs), Hazardous Waste Consignment Notes, and joint sign-off digital signatures.',
            },
            {
              _key: 'card_d',
              title: 'D. Technical & Diagnostic Browsing Data',
              description: 'IP addresses, browser type, operating system, page performance metrics, and consent logs collected via privacy-preserving telemetry without cross-site tracking.',
            },
          ],
        },
        {
          _key: 'sec_3',
          heading: '3. Lawful Bases for Processing Under UK GDPR',
          body: 'In compliance with Article 6 of the UK GDPR, we only process personal information where a valid lawful basis applies:',
          listItems: [
            { _key: 'l1', label: 'Contractual Performance (Article 6(1)(b))', text: 'Necessary to generate commercial quotations, verify logistics feasibility, dispatch vetted transport vehicles, execute data destruction agreements, and issue formal Certificates of Destruction.' },
            { _key: 'l2', label: 'Legal & Regulatory Compliance (Article 6(1)(c))', text: 'Mandatory retention of statutory duty-of-care documentation under the Environmental Protection Act 1990, Hazardous Waste Regulations 2005, and HMRC tax record keeping mandates.' },
            { _key: 'l3', label: 'Legitimate Interests (Article 6(1)(f))', text: 'Enhancing corporate network security, preventing fraud, maintaining facility surveillance via CCTV, and monitoring SLA performance benchmarks.' },
            { _key: 'l4', label: 'Explicit Consent (Article 6(1)(a))', text: 'Where you voluntarily opt into specialized technical whitepapers, corporate newsletters, or optional marketing communications.' },
          ],
        },
        {
          _key: 'sec_4',
          heading: '4. Chain of Custody & Information Security Safeguards',
          body: 'Information security is embedded across our four operating divisions under our ISO 27001:2022 certified Information Security Management System (ISMS). Every member of our mobile collection fleet and warehouse processing personnel is vetted to BS 7858 standards (five-year historical employment verification and criminal records check). Logistics transit utilizes GPS-tracked, solid-sided vehicles equipped with electronic deadlocks and remote vehicle immobilization.',
        },
        {
          _key: 'sec_5',
          heading: '5. Data Retention & Destruction Policies',
          body: 'We adhere to strict data minimisation and retention schedules. Client account records and transactional order histories are retained for seven (7) years following contract conclusion to satisfy statutory UK accounting requirements. Waste Transfer Notes and Hazardous Waste Consignment Notes are retained for two (2) and three (3) years respectively, pursuant to Environment Agency mandates. Data-bearing client media entrusted to us for sanitisation is processed within certified SLA windows and destroyed in accordance with NIST 800-88 Rev 1 or DIN 66399 standards.',
        },
        {
          _key: 'sec_6',
          heading: '6. Your Statutory Rights Under UK GDPR',
          body: 'Under Chapter III of the UK GDPR, you have comprehensive statutory rights regarding your personal data:',
          listItems: [
            { _key: 'r1', label: 'Right of Access (Article 15)', text: 'Request a formal copy of personal records held by Techsteps along with processing details.' },
            { _key: 'r2', label: 'Right to Rectification (Article 16)', text: 'Require prompt correction of incomplete or inaccurate personal records.' },
            { _key: 'r3', label: 'Right to Erasure (Article 17)', text: 'Request deletion of personal data where retention is no longer legally necessary.' },
            { _key: 'r4', label: 'Right to Restriction (Article 18)', text: 'Limit active processing while an accuracy dispute or legal claim is resolved.' },
            { _key: 'r5', label: 'Right to Data Portability (Article 20)', text: 'Receive automated personal data in a structured, machine-readable format.' },
            { _key: 'r6', label: 'Right to Object (Article 21)', text: 'Object at any time to direct marketing communications or legitimate interest processing.' },
          ],
        },
        {
          _key: 'sec_7',
          heading: '7. Data Protection Officer & Inquiries',
          body: 'For questions regarding this policy or to exercise any data subject rights, please contact our Data Protection Officer directly at enquiries@techsteps.co.uk or by post to Data Protection Officer, Techsteps UK Limited, Techsteps House, Logistics Park, Crossways Boulevard, Dartford, Kent, DA2 6QJ. You also hold the right to lodge a formal complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk or 0303 123 1113.',
        },
      ],
    },
    {
      _id: 'legal-terms-and-conditions',
      _type: 'legalPage',
      title: 'Terms & Conditions',
      slug: { _type: 'slug', current: 'terms-and-conditions' },
      eyebrow: 'COMMERCIAL TERMS OF BUSINESS',
      subheading: 'Master commercial framework governing service agreements, certified custody transfer, secure sanitisation warranties, and environmental compliance for Techsteps UK Limited.',
      metaTitle: 'Terms & Conditions | Commercial Framework | Techsteps UK',
      metaDescription: 'Techsteps UK Terms & Conditions. Governing commercial contracts, chain of custody, data sanitisation warranties, environmental liabilities, and service delivery.',
      complianceBadge: 'Governed by Laws of England & Wales',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. Scope & Application of Terms',
          body: 'These Standard Terms and Conditions of Business ("Terms") apply to all commercial proposals, service orders, contracts, and operational execution provided by Techsteps UK Limited ("Techsteps", "Contractor", "we", "us", or "our") to corporate clients, public authorities, and commercial organizations ("Client", "you"). Our services encompass four specialised operational divisions: Information Management, IT Lifecycle Services & Destruction, Secure Shredding & Document Integrity, and Moving & Relocation Services.',
        },
        {
          _key: 'sec_2',
          heading: '2. Quotations, Bookings & Contract Formation',
          body: 'All written quotations provided by Techsteps remain valid for thirty (30) calendar days from the date of issue unless explicitly stated otherwise. A legally binding contract comes into existence upon the earliest of: (a) Client issuing a written purchase order, (b) Client digitally accepting a service proposal, or (c) Techsteps dispatching logistics vehicles pursuant to Client instructions. Any modifications, special service level agreements (SLAs), or deviations from these Standard Terms must be agreed in writing and signed by an authorized Director of Techsteps.',
        },
        {
          _key: 'sec_3',
          heading: '3. Chain of Custody & Asset Handover',
          body: 'Legal and physical chain of custody transfers to Techsteps at the exact point when a joint Asset Handover Manifest or Waste Transfer Note is countersigned by our BS 7858 security-screened operative and the Client’s authorized site representative.',
          listItems: [
            { _key: 'tc_1', label: 'Security-Screened Personnel', text: 'Techsteps warrants that all operatives involved in collections, transit, and facility operations have completed comprehensive five-year employment history vetting and criminal record screening conforming to BS 7858.' },
            { _key: 'tc_2', label: 'Dedicated Secured Transport', text: 'Transit occurs in solid-sided, deadlocked vehicles fitted with active GPS telematics, remote engine immobilization, and dual-monitored panic systems.' },
            { _key: 'tc_3', label: 'Access & Loading Readiness', text: 'Client is responsible for ensuring clear, safe physical access to collection locations, including reserved loading bays, operational lifts, and authorized personnel present at agreed collection windows.' },
          ],
        },
        {
          _key: 'sec_4',
          heading: '4. Data Sanitisation Warranties & Liability',
          body: 'Where services require data destruction or sanitisation, Techsteps warrants that operations will be executed in strict accordance with ADISA Standard 8.0, NIST 800-88 Rev 1, or DIN 66399 (Security Levels P-4 through P-7 for micro-cut granulation). Certified sanitisation certificates referencing individual asset serial numbers will be issued upon operational completion. Techsteps maintains professional indemnity and cyber liability insurance coverage of £5,000,000.',
        },
        {
          _key: 'sec_5',
          heading: '5. Environmental Warranties & Duty of Care',
          body: 'Techsteps is a registered Upper Tier Waste Carrier, Broker, and Dealer with the Environment Agency. We guarantee that all redundant technology, electrical assets, and physical materials will be managed in compliance with the Environmental Protection Act 1990, the Hazardous Waste (England and Wales) Regulations 2005, and the WEEE Regulations 2013 under a certified 100% zero-to-landfill commitment.',
        },
        {
          _key: 'sec_6',
          heading: '6. Payment Terms & Commercial Rates',
          body: 'Unless alternative credit terms are agreed in writing, invoices are payable within thirty (30) calendar days from invoice date. Techsteps reserves the right to charge statutory interest on overdue commercial debts pursuant to the Late Payment of Commercial Debts (Interest) Act 1998.',
        },
        {
          _key: 'sec_7',
          heading: '7. Governing Law & Jurisdiction',
          body: 'These Terms and any contractual disputes arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales. The parties irrevocably agree that the courts of England and Wales shall have exclusive jurisdiction.',
        },
      ],
    },
    {
      _id: 'legal-cookie-policy',
      _type: 'legalPage',
      title: 'Cookie Policy',
      slug: { _type: 'slug', current: 'cookie-policy' },
      eyebrow: 'TRANSPARENCY & TRACKING CONTROLS',
      subheading: 'PECR and UK GDPR cookie disclosures explaining how Techsteps uses essential, functional, and performance cookies to maintain a secure digital environment.',
      metaTitle: 'Cookie Policy | Transparent Tracking Controls | Techsteps UK',
      metaDescription: 'Techsteps UK Cookie Policy. Understand how we use cookies, transparent tracking controls, and how to manage your privacy preferences under UK PECR and GDPR.',
      complianceBadge: 'PECR & UK GDPR Framework',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. What Are Cookies?',
          body: 'Cookies are small alphanumeric text files stored directly in your web browser or local device storage when you visit websites. They enable digital platforms to identify your browser, remember session states (such as active quote requests and navigation preferences), and generate aggregate performance analytics. Under the Privacy and Electronic Communications Regulations (PECR) and the UK GDPR, we are legally required to inform you regarding the cookies we deploy, their functional purpose, and obtain your explicit consent for any non-essential technologies.',
        },
        {
          _key: 'sec_2',
          heading: '2. Cookie Categories We Deploy',
          body: 'Our digital architecture strictly minimizes tracking. We categorize cookies into three clear operational classifications:',
          cards: [
            {
              _key: 'c_ess',
              title: 'A. Strictly Necessary / Essential Cookies (Always Active)',
              description: 'Essential cookies are technically required for core website functionality, security, network routing, and accessibility. They allow you to navigate pages securely, submit interactive quote request forms, verify anti-CSRF tokens, and save your legal consent choices.',
            },
            {
              _key: 'c_pref',
              title: 'B. Preference & Functionality Cookies (Optional)',
              description: 'These cookies enable our website to remember choices you make (such as your chosen division or preferred quote contact method) and provide enhanced, personalized navigational efficiency across visits.',
            },
            {
              _key: 'c_perf',
              title: 'C. Privacy-Conscious Performance & Analytics Cookies (Optional)',
              description: 'We use privacy-respecting aggregated analytics to assess website traffic patterns, popular service pages, and system load times. All telemetry is aggregated and anonymized; we do not build cross-site behavioural profiles or monetize data.',
            },
          ],
        },
        {
          _key: 'sec_3',
          heading: '3. Third-Party Technologies & Privacy Controls',
          body: 'We do not permit third-party advertising tracking pixels or retargeting beacons across our digital platforms. Any embedded analytics or performance metrics run under strict data processing agreements ensuring data localization within the UK/EEA and compliance with ISO 27001 protocols.',
        },
        {
          _key: 'sec_4',
          heading: '4. Managing Your Preferences',
          body: 'You can modify or withdraw your cookie consent at any time via the cookie preferences link in the website footer or by adjusting your individual browser settings to reject cookies.',
        },
      ],
    },
    {
      _id: 'legal-environmental-policy',
      _type: 'legalPage',
      title: 'Environmental Policy',
      slug: { _type: 'slug', current: 'environmental-policy' },
      eyebrow: 'SUSTAINABILITY & ISO 14001',
      subheading: 'Corporate environmental framework governing Techsteps UK Limited\'s commitments to zero direct landfill disposal, certified WEEE treatment, carbon reduction, and circular IT lifecycle management.',
      metaTitle: 'Environmental Policy | ISO 14001 & Circular IT | Techsteps UK',
      metaDescription: 'Techsteps UK Environmental Policy. Read our ISO 14001 environmental management commitments, WEEE compliance, Scope 1/2/3 carbon reduction, and zero landfill warranty.',
      complianceBadge: 'ISO 14001 Certified & Zero Landfill',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. Environmental Commitment & Vision',
          body: 'At Techsteps UK Limited, environmental stewardship is a core pillar of our operational identity. As an accredited specialist in IT lifecycle disposition, document archiving, secure destruction, and commercial relocations, our mission is to eliminate waste, advance the UK circular economy, and enable our corporate clients to achieve verifiable carbon reductions. We operate a formal Environmental Management System (EMS) certified to ISO 14001:2015, ensuring systematic compliance with environmental legislation and continuous operational improvement.',
        },
        {
          _key: 'sec_2',
          heading: '2. The Circular Waste Hierarchy Framework',
          body: 'Techsteps strictly enforces the UK Waste Hierarchy established under Regulation 12 of the Waste (England and Wales) Regulations 2011:',
          cards: [
            { _key: 'wh_1', title: 'Priority 1: Prevention & Asset Life Extension', description: 'Assisting enterprise clients with component maintenance, firmware upgrades, and warranty repairs to extend hardware lifespans before considering retirement.' },
            { _key: 'wh_2', title: 'Priority 2: Direct Hardware Reuse & Remarketing', description: 'Fully sanitised laptops, servers, and networking gear are refurbished and remarketed into secondary enterprise markets, preserving up to 80% of the hardware’s embodied carbon footprint.' },
            { _key: 'wh_3', title: 'Priority 3: Component Harvesting & Repair Loops', description: 'Non-functional assets are disassembled by trained engineers to harvest motherboards, memory, power supplies, and processor units to repair other enterprise machines.' },
            { _key: 'wh_4', title: 'Priority 4: Closed-Loop Raw Material Recycling', description: 'Residual e-waste is processed through Environment Agency authorized AATFs for clean separation of copper, gold, aluminium, ferrous metals, and engineering plastics.' },
          ],
        },
        {
          _key: 'sec_3',
          heading: '3. 100% Zero-Landfill Guarantee',
          body: 'Techsteps provides a legally binding guarantee that 0% of client electronic equipment or confidential shredded paper processed in our facilities is diverted to landfill. Combustible fractions that cannot undergo economic mechanical recycling are converted into Refuse Derived Fuel (RDF) to generate clean electricity in advanced UK waste-to-energy facilities.',
        },
        {
          _key: 'sec_4',
          heading: '4. Scope 1, 2, and 3 Carbon Emission Reductions',
          body: 'We are committed to achieving Net Zero greenhouse gas emissions across all corporate operations by 2035. Our fleet management strategy prioritizes low-emission Euro 6 compliant vehicles and transitions to fully electric commercial vans for urban collection routes. Furthermore, we provide clients with Scope 3 carbon offset certificates itemizing avoided CO2e emissions resulting from hardware refurbishment.',
        },
      ],
    },
    {
      _id: 'legal-information-security-policy',
      _type: 'legalPage',
      title: 'Information Security Policy',
      slug: { _type: 'slug', current: 'information-security-policy' },
      eyebrow: 'CYBER RESILIENCE & ISO 27001',
      subheading: 'High-level corporate information security framework outlining the organizational, physical, and technical safeguards employed by Techsteps UK Limited to secure client data assets.',
      metaTitle: 'Information Security Policy | ISO 27001 & Cyber Essentials | Techsteps UK',
      metaDescription: 'Techsteps UK Information Security Policy. Learn about our ISO 27001 accredited controls, ADISA 8.0 data sanitisation, Cyber Essentials Plus, and physical vault protections.',
      complianceBadge: 'ISO 27001 & ADISA 8.0 Certified',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. Policy Objectives & Executive Mandate',
          body: 'At Techsteps UK Limited, information security is central to our commercial promise. Our corporate clients—spanning Tier-1 investment banks, NHS Trusts, Ministry of Defence contractors, and central government bodies—rely on us to securely store, digitise, sanitise, and destroy their most sensitive digital and physical information assets. Our Information Security Management System (ISMS) is certified to ISO/IEC 27001:2022 and validated through annual third-party UKAS audits. The objective of this policy is to safeguard the Confidentiality, Integrity, and Availability (CIA) of all client and corporate data under our custody.',
        },
        {
          _key: 'sec_2',
          heading: '2. Security Accreditations & Standards Matrix',
          body: 'We validate our operational security through continuous independent accreditations:',
          cards: [
            { _key: 'sc_1', title: 'ISO/IEC 27001:2022 (Certified)', description: 'Enterprise Information Security Management System covering all sites, transport fleets, and software infrastructure.' },
            { _key: 'sc_2', title: 'ADISA Standard 8.0 (Pass with Distinction)', description: 'Asset Disposal & Information Security Alliance standard governing chain of custody, data sanitisation, and forensic unannounced audits.' },
            { _key: 'sc_3', title: 'Cyber Essentials Plus (Crown Commercial Validated)', description: 'Technical vulnerability verification, endpoint hardening, firewall controls, and multi-factor authentication enforcement.' },
            { _key: 'sc_4', title: 'BS EN 15713:2009 (Secure Destruction)', description: 'European standard governing the collection, handling, and destruction of confidential documentation and electronic media.' },
          ],
        },
        {
          _key: 'sec_3',
          heading: '3. Physical, Transit & Technical Safeguards',
          body: 'Our processing centres feature 24/7 CCTV surveillance with 90-day retention, multi-factor biometric turnstiles, and segregated air-gapped forensic sanitisation rooms. Mobile transit utilizes solid-sided, GPS-tracked vehicles with remote engine immobilisation. Logical sanitisation conforms strictly to NIST Special Publication 800-88 Revision 1 (Purge/Clear) with cryptographic verification.',
        },
      ],
    },
    {
      _id: 'legal-modern-slavery-statement',
      _type: 'legalPage',
      title: 'Modern Slavery Statement',
      slug: { _type: 'slug', current: 'modern-slavery-statement' },
      eyebrow: 'SUPPLY CHAIN DUE DILIGENCE & ETHICS',
      subheading: 'Modern Slavery Act 2015 Section 54 compliance statement detailing Techsteps UK Limited\'s zero-tolerance approach to modern slavery, forced labour, and human trafficking.',
      metaTitle: 'Modern Slavery Statement | Section 54 Compliance | Techsteps UK',
      metaDescription: 'Techsteps UK Modern Slavery Statement. Read our formal commitments under the UK Modern Slavery Act 2015, supplier audit procedures, employee vetting, and reporting.',
      complianceBadge: 'Modern Slavery Act 2015 Compliant',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. Organizational Stance & Policy Scope',
          body: 'This statement is published pursuant to Section 54(1) of the Modern Slavery Act 2015 and constitutes the modern slavery and human trafficking statement of Techsteps UK Limited for the financial year ending 2025/2026. Techsteps maintains a definitive zero-tolerance policy towards all forms of modern slavery, servitude, forced or compulsory labour, and human trafficking across our direct workforce, subcontracted logistics, and global material supply chains.',
        },
        {
          _key: 'sec_2',
          heading: '2. Business Structure & Supply Chain Overview',
          body: 'Techsteps operates nationwide across the United Kingdom, delivering mission-critical Information Management, IT Lifecycle Services & Disposition (ITAD), Secure Destruction, and Commercial Relocations. Our supply chain encompasses transport & fleet partners, licensed secondary raw material refiners, authorized WEEE treatment facilities (AATFs), physical security providers, and directly employed operational personnel.',
        },
        {
          _key: 'sec_3',
          heading: '3. Strict Recruitment & Employee Vetting Standards',
          body: 'Because our operatives handle confidential data-bearing hardware and government archives, we enforce the most rigorous employment screening in the UK industry: 100% of employees undergo comprehensive 5-year employment verification, financial probity checks, and enhanced criminal record checks conforming to BS 7858 prior to commencing work. We guarantee Real Living Wage pay rates across all operational depots.',
        },
        {
          _key: 'sec_4',
          heading: '4. Whistleblowing & Incident Reporting',
          body: 'Techsteps provides an independent, confidential whistleblowing channel allowing employees, contractors, and supply chain partners to anonymously report suspected unethical conduct or human rights concerns without fear of reprisal.',
        },
      ],
    },
    {
      _id: 'legal-accessibility',
      _type: 'legalPage',
      title: 'Accessibility Statement',
      slug: { _type: 'slug', current: 'accessibility' },
      eyebrow: 'DIGITAL INCLUSION & WCAG 2.1 AA',
      subheading: 'Techsteps UK Limited is committed to digital inclusion, ensuring our corporate website and digital tools are accessible to the widest possible audience, regardless of ability or assistive technology.',
      metaTitle: 'Accessibility Statement | WCAG 2.1 AA Compliance | Techsteps UK',
      metaDescription: 'Techsteps UK Accessibility Statement. Learn how we implement WCAG 2.1 Level AA digital standards, test with assistive technologies, and provide accessible communication channels.',
      complianceBadge: 'WCAG 2.1 Level AA Conformant',
      lastUpdated: 'February 2026',
      sections: [
        {
          _key: 'sec_1',
          heading: '1. Our Accessibility Commitment',
          body: 'At Techsteps UK Limited, we firmly believe that the internet should be available and accessible to everyone. We are actively committed to providing a website that is accessible to the widest possible audience, regardless of circumstance, device, or physical ability. To fulfill this commitment, we adhere as strictly as possible to the World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1) at the Level AA success criteria.',
        },
        {
          _key: 'sec_2',
          heading: '2. Technical Specifications & Features',
          body: 'Accessibility is built directly into our design system and frontend implementation through the following core techniques:',
          cards: [
            { _key: 'a1', title: 'A. Semantic Document Hierarchy', description: 'Every page features semantic HTML5 landmarks (<header>, <main>, <nav>, <section>, <footer>), ensuring screen readers can navigate directly between major landmarks without obstruction.' },
            { _key: 'a2', title: 'B. High Contrast Typography & Scalability', description: 'Color palettes meet or exceed the required minimum contrast ratio of 4.5:1 for normal body text and 3:1 for large headings against their background. Typography dynamically scales up to 200% via standard browser zoom.' },
            { _key: 'a3', title: 'C. Complete Keyboard Navigation & Focus Indicators', description: 'All interactive elements are fully operable via standard keyboard (Tab, Enter, Space, arrow keys). Focus states feature high-visibility emerald focus rings.' },
            { _key: 'a4', title: 'D. Screen Reader Optimization & ARIA Attributes', description: 'Interactive forms, accordions, and tabs are coded with programmatic WAI-ARIA states (aria-expanded, aria-controls, aria-current).' },
          ],
        },
        {
          _key: 'sec_3',
          heading: '3. Feedback & Contact Assistance',
          body: 'We welcome your feedback on the accessibility of the Techsteps website. If you encounter accessibility barriers or require documentation in an alternative format, please contact our Digital Accessibility Team at accessibility@techsteps.co.uk or call +44 (0) 20 7946 0888.',
        },
      ],
    },
  ];

  for (const page of legalPages) {
    const res = await client.createOrReplace(page);
    console.log(`  ✓ Legal page synced: ${res.title} (${res.slug.current})`);
  }

  // =========================================================================
  // 2. MIGRATE THE 4 DIVISION DOCUMENTS
  // =========================================================================
  console.log('\n--- Migrating 4 Division Documents ---');
  const divisionUpdates = [
    {
      _id: 'div-it',
      _type: 'division',
      title: 'IT Lifecycle Services & Destruction',
      slug: { _type: 'slug', current: 'it-lifecycle-services-destruction' },
      order: 2,
      headline: 'End-to-end ITAD, tracked GPS logistics, verified data sanitisation (ADISA compliant), and zero-landfill electronic recycling.',
      summary: 'ADISA-certified IT asset disposition, secure collection, data sanitisation, remarketing, and zero-landfill electronic recycling. UK-wide from Techsteps.',
      icon: 'cpu',
      heroTitle: 'IT Lifecycle & Destruction Services UK',
      heroDescription: 'Secure, accredited IT asset disposition (ITAD), verified data erasure, hardware remarketing, and circular zero-landfill electronic recycling for UK enterprise.',
      heroCtaText: 'Talk to an IT Lifecycle Specialist',
      heroCtaLink: '/contact?service=it-lifecycle',
      aboutBadge: 'About Our Service',
      aboutTitle: 'Sustainable, Secure IT Asset Management for Modern Enterprise',
      aboutParagraphs: [
        'As enterprise technology rapidly evolves, organisations accumulate redundant workstations, servers, mobile devices, and data storage arrays. IT lifecycle management ensures every retired asset is handled with absolute security, audited transparency, and environmental accountability — protecting your sensitive data while driving sustainable circular economy outcomes.',
        'From BS 7858 vetted collection in GPS-tracked vehicles to ADISA-certified data sanitisation and certified WEEE recycling, Techsteps provides an unbroken chain of custody. We maximise residual asset value through expert refurbishment and remarketing, while guaranteeing zero electronic waste reaches landfill.'
      ],
      faqs: [
        { question: 'What is IT asset lifecycle management?', answer: 'IT asset lifecycle management covers the full journey of a technology asset — from collection through data sanitisation, reuse or remarketing, recycling and final disposal — with the aim of maximising value recovery, protecting data and achieving responsible environmental outcomes.' },
        { question: 'What happens to our IT equipment after collection?', answer: 'Following secure collection, each asset is audited, data-sanitised and assessed. Equipment suitable for continued use is refurbished or remarketed. Assets at end of life are responsibly recycled through WEEE-compliant streams. You receive a full report for every asset.' },
        { question: 'Can data be securely removed before equipment is recycled?', answer: 'Yes. We use ADISA-certified data erasure, degaussing and physical hard drive destruction depending on the security requirement of the asset. Every data sanitisation event is certificated.' },
        { question: 'What happens to equipment that cannot be reused?', answer: 'Assets that cannot be reused are processed through WEEE-compliant zero-landfill recycling channels. No equipment is sent to landfill.' },
      ],
      metaTitle: 'IT Lifecycle Services & Destruction | Secure ITAD & Certified Recycling | Techsteps',
      metaDescription: 'ADISA-certified IT asset disposition, secure collection, data sanitisation, remarketing, and zero-landfill electronic recycling. UK-wide from Techsteps.',
    },
    {
      _id: 'div-im',
      _type: 'division',
      title: 'Information Management',
      slug: { _type: 'slug', current: 'information-management' },
      order: 1,
      headline: 'Secure, compliant storage, scanning and management of physical and digital records throughout their lifecycle.',
      summary: 'Climate-controlled physical document storage, accredited high-speed scanning, digital mailrooms, and secure media vaulting.',
      icon: 'folder-lock',
      heroTitle: 'Information Management Services UK',
      heroDescription: 'Secure physical document storage, accredited high-speed scanning, digital mailrooms, and confidential records management with full chain-of-custody tracking.',
      heroCtaText: 'Talk to an Information Management Specialist',
      heroCtaLink: '/contact?service=information-management',
      aboutBadge: 'About Our Service',
      aboutTitle: 'Protecting, Organising & Digitising Your Critical Information',
      aboutParagraphs: [
        'Organisations manage increasing volumes of sensitive records across physical and digital formats. Regulatory mandates — from UK GDPR to sector-specific retention standards — require defensible governance from creation through compliant disposition.',
        'Techsteps delivers sovereign, certified information management across secure off-site archive storage, BS 10008 legal admissibility document scanning, automated digital mailrooms, and media vaulting. We ensure your information assets remain secure, instantly retrievable, and strictly compliant.'
      ],
      lifecycleStages: [
        { _key: 'ls_1', id: 'capture', label: 'Capture', number: '01', desc: 'Information is captured from physical or digital sources — through scanning, mailroom processing or direct ingestion.' },
        { _key: 'ls_2', id: 'store', label: 'Store', number: '02', desc: 'Records are stored in secure, climate-controlled facilities or structured digital environments with full index and reference.' },
        { _key: 'ls_3', id: 'manage', label: 'Manage', number: '03', desc: 'Information is managed, controlled and accessible to authorised personnel throughout its active lifecycle.' },
        { _key: 'ls_4', id: 'access', label: 'Access', number: '04', desc: 'Records can be retrieved physically or digitally on demand, with appropriate authorisation and audit records.' },
        { _key: 'ls_5', id: 'retain', label: 'Retain', number: '05', desc: 'Retention schedules are tracked and enforced in line with regulatory, legal and organisational requirements.' },
        { _key: 'ls_6', id: 'dispose', label: 'Dispose', number: '06', desc: 'Information is securely and compliantly disposed of at end of retention — with certified destruction records.' },
      ],
      faqs: [
        { question: 'What is information lifecycle management?', answer: 'Information lifecycle management covers the full journey of a business record — from creation or capture through active use, storage, retrieval, retention and compliant disposal — with the goal of keeping information secure, accessible and compliantly managed throughout.' },
        { question: 'How secure is off-site document storage?', answer: 'Our storage facilities operate under ISO 27001 and BS 4971 standards with climate control, VESDA smoke detection, FM200 fire suppression, and item-level barcode tracking. Access is restricted to authorised personnel only.' },
        { question: 'Can you digitise our existing paper records?', answer: 'Yes. Our document scanning service processes high volumes to BS 10008 legal admissibility standards, with full OCR indexing and integration with your document management systems.' },
        { question: 'Can records be securely destroyed at end of retention?', answer: 'Yes. Secure document destruction at end of retention is part of our information management service, with certificates provided for every destruction event.' },
      ],
      metaTitle: 'Information Management Services UK | Secure Storage & Scanning | Techsteps',
      metaDescription: 'Secure physical document storage, accredited high-speed scanning, digital mailrooms, and confidential records management with full chain-of-custody tracking.',
    },
    {
      _id: 'div-sh',
      _type: 'division',
      title: 'Secure Shredding & Document Integrity',
      slug: { _type: 'slug', current: 'secure-shredding-document-integrity' },
      order: 3,
      headline: 'BS EN 15713 accredited mobile cross-cut shredding, secure console management, product destruction, and certified recycling.',
      summary: 'Secure destruction of confidential documents, media and products through certified on-site mobile and off-site plant operations.',
      icon: 'shredder',
      heroTitle: 'Secure Shredding & Document Destruction Services UK',
      heroDescription: 'BS EN 15713 accredited mobile on-site and high-security off-site destruction for confidential documents, hard drives, uniforms, and branded products.',
      heroCtaText: 'Talk to a Shredding Specialist',
      heroCtaLink: '/contact?service=secure-shredding',
      aboutBadge: 'About Our Service',
      aboutTitle: 'Certified Confidential Destruction for Complete Peace of Mind',
      aboutParagraphs: [
        'Protecting corporate confidentiality and preventing data breaches requires absolute certainty at end of record life. Techsteps provides certified confidential destruction services across the UK for paper documents, digital media, branded apparel, and prototype products.',
        'With BS EN 15713 accredited high-torque mobile shredding vehicles and off-site cross-cut granulation facilities operating to DIN 66399 Security Levels up to P-7, we guarantee complete particle irreversibility and issue formal Certificates of Destruction for every job.'
      ],
      faqs: [
        { question: 'What is the difference between on-site and off-site shredding?', answer: 'On-site shredding destroys materials directly outside your premises inside our self-contained, mobile high-torque shredding vehicles before anything leaves your site. Off-site shredding transfers sealed security consoles to our accredited facility in GPS-tracked vehicles for industrial-scale destruction.' },
        { question: 'What security standards do you follow for shredding?', answer: 'We operate strictly under BS EN 15713 (Secure Destruction of Confidential Material), ISO 27001, and DIN 66399 particle size requirements. All staff are vetted to BS 7858.' },
        { question: 'Do you destroy hard drives and electronic media?', answer: 'Yes. We shred physical hard drives, SSDs, magnetic tapes, optical media, and smartcards to security standards including DIN 66399 H-4 and H-5.' },
        { question: 'What happens to the shredded paper?', answer: '100% of shredded paper is baled and recycled back into UK paper manufacturing mills, supporting closed-loop sustainability with zero landfill waste.' },
      ],
      metaTitle: 'Secure Shredding & Document Destruction Services UK | Techsteps',
      metaDescription: 'BS EN 15713 accredited mobile on-site and high-security off-site destruction for confidential documents, hard drives, uniforms, and branded products.',
    },
    {
      _id: 'div-mv',
      _type: 'division',
      title: 'Moving & Relocation Services',
      slug: { _type: 'slug', current: 'moving-relocation-services' },
      order: 4,
      headline: 'Specialist IT relocation, laboratory migration, delicate museum archives, commercial office moves, and turnkey logistics.',
      summary: 'Specialist IT relocation, laboratory moves, museum and archive transportation, and complex commercial workplace migrations.',
      icon: 'truck',
      heroTitle: 'Specialist Moving & Commercial Relocation Services UK',
      heroDescription: 'Expert commercial relocation, mission-critical IT moves, data centre migrations, laboratory relocations, and sequential museum archives.',
      heroCtaText: 'Talk to a Relocation Specialist',
      heroCtaLink: '/contact?service=moving-relocation',
      aboutBadge: 'About Our Service',
      aboutTitle: 'Minimising Disruption, Protecting Critical Technology & Assets',
      aboutParagraphs: [
        'Moving enterprise workplaces, sensitive technology arrays, or valuable heritage collections presents significant operational risk. Downtime must be minimised, sensitive hardware protected, and critical chain of custody preserved.',
        'Techsteps delivers specialist commercial relocations with dedicated project directors, security-screened crews, flight-case protection, and custom anti-static packaging. Whether decommissioning enterprise data centres or moving rare museum archives, we ensure business continuity.'
      ],
      faqs: [
        { question: 'How do you handle sensitive IT hardware during a move?', answer: 'Server racks, SAN arrays, and desktop hardware are de-racked by experienced IT engineers, protected in custom padded anti-static flight cases, and transported in air-ride, GPS-monitored vehicles.' },
        { question: 'Can relocations be completed outside business hours?', answer: 'Yes. The vast majority of our IT and commercial workplace relocations take place during evenings and weekends to eliminate business disruption.' },
        { question: 'Do you handle specialized laboratory or heritage relocations?', answer: 'Yes. Our crews are trained in cold-chain scientific equipment moves, vibration-sensitive laboratory instruments, and sequentially catalogued archival library transfers.' },
        { question: 'Are our assets insured during the relocation?', answer: 'Yes. Comprehensive goods-in-transit and specialist professional indemnity insurance protects your physical assets and technology throughout the relocation.' },
      ],
      metaTitle: 'Specialist Moving & Commercial Relocation Services UK | Techsteps',
      metaDescription: 'Expert commercial relocation, mission-critical IT moves, data centre migrations, laboratory relocations, and sequential museum archives.',
    },
  ];

  for (const div of divisionUpdates) {
    const res = await client.createOrReplace(div);
    console.log(`  ✓ Division synced: ${res.title} (${res.slug.current})`);
  }

  // =========================================================================
  // 3. MIGRATE INVESTORS PAGE BUSINESSES & ESG PILLARS
  // =========================================================================
  console.log('\n--- Migrating Investors Page Data ---');
  const investorsBusinesses = [
    {
      _key: 'b_1',
      division: 'DIVISION 01',
      name: 'Information Management',
      tagline: 'Physical document storage, digital conversion, and secure tape vaulting.',
      description: 'Techsteps Information Management specialises in secure physical document storage, digital transformation, and confidential records management with full chain-of-custody tracking.',
      link: '/information-management',
      image: '/images/services/document-storage.jpg',
      accreditations: 'ISO 27001 • BS 4971 • UK GDPR',
    },
    {
      _key: 'b_2',
      division: 'DIVISION 02',
      name: 'Techsteps Relocations',
      tagline: 'Specialist commercial workplace relocations & data centre engineering.',
      description: 'As the market leader in commercial relocation, we specialise in creating effective workspaces, mission-critical server migration, laboratory transfers, and heritage transport.',
      link: '/moving-relocation-services',
      image: '/images/services/it-relocations.jpg',
      accreditations: 'BAR Accredited • SafeContractor • ISO 9001',
    },
    {
      _key: 'b_3',
      division: 'DIVISION 03',
      name: 'Datashred Operations',
      tagline: 'Accredited physical document destruction and mobile on-site shredding.',
      description: 'We are one of the leading providers of document destruction in the United Kingdom, delivering high-torque DIN 66399 shredding, secure console rotations, and itemised destruction certificates.',
      link: '/secure-shredding-document-integrity',
      image: '/images/services/hard-drive-destruction.jpg',
      accreditations: 'BS EN 15713 • DIN 66399 P-4/P-7',
    },
    {
      _key: 'b_4',
      division: 'DIVISION 04',
      name: 'Technology & ITAD',
      tagline: 'Complete lifecycle disposition, data sanitisation, and remarketing.',
      description: 'We offer the complete set of services for your information technology assets: certified ADISA 8.0 data wiping, NIST 800-88 sanitisation, hardware remarketing, and circular lifecycle recovery.',
      link: '/it-lifecycle-services-destruction',
      image: '/images/services/itad.jpg',
      accreditations: 'ADISA Standard 8.0 • DIPCOG • Zero Landfill',
    },
  ];

  const investorsEsgPillars = [
    {
      _key: 'esg_1',
      title: 'Environmental Stewardship',
      badge: 'NET ZERO ALIGNED',
      desc: 'Techsteps maintains a strict 100% zero-to-landfill commitment across all electronics and materials. We help institutional clients measure and drastically reduce their Scope 3 greenhouse gas emissions through audited hardware refurbishment and carbon offset reporting.',
    },
    {
      _key: 'esg_2',
      title: 'Social & Community Responsibility',
      badge: 'VETTED UK TEAMS',
      desc: 'Our nationwide operational teams are 100% security vetted under BS 7858 protocols. We invest in local STEM apprenticeships, uphold ethical fair living wages across all logistics hubs, and maintain an exemplary zero-harm occupational health record.',
    },
    {
      _key: 'esg_3',
      title: 'Defensible Board Governance',
      badge: 'ISO 27001 AUDITED',
      desc: 'The Board maintains independent surveillance audits, stringent anti-bribery governance, robust cybersecurity frameworks, and rigorous statutory reporting in full compliance with the UK Companies Act and UK GDPR standards.',
    },
  ];

  await client
    .patch('investorsPage')
    .set({
      businesses: investorsBusinesses,
      esgPillars: investorsEsgPillars,
    })
    .commit();
  console.log('  ✓ investorsPage patched with businesses and esgPillars');

  // =========================================================================
  // 4. MIGRATE ALL 27 SERVICE DOCUMENTS
  // =========================================================================
  console.log('\n--- Migrating 27 Service Documents with Rich Details ---');

  // Load existing raw services from data.ts
  const dataModule = await import('../src/lib/sanity/data.ts');
  const allServices = dataModule.services;
  const { getServiceDetailContent } = await import('../src/data/serviceDetails.ts');

  // Map division slugs to division Sanity IDs
  const divisionSlugToId = {
    'information-management': 'div-im',
    'it-lifecycle-services-destruction': 'div-it',
    'secure-shredding-document-integrity': 'div-sh',
    'moving-relocation-services': 'div-mv',
  };

  for (const srv of allServices) {
    const slug = srv.slug;
    const detail = getServiceDetailContent(slug, srv);
    const divId = divisionSlugToId[srv.divisionSlug] || 'div-it';

    const serviceDoc = {
      _id: `srv-${slug}`,
      _type: 'service',
      title: srv.title,
      slug: { _type: 'slug', current: slug },
      division: { _type: 'reference', _ref: divId },
      heroAlt: srv.heroAlt || `${srv.title} service`,
      summary: srv.summary,
      customerProblem: srv.customerProblem,
      solution: srv.solution,
      keyBenefits: srv.keyBenefits || [],
      capabilities: srv.capabilities || [],
      metaTitle: srv.metaTitle || `${srv.title} | Techsteps UK`,
      metaDescription: srv.metaDescription || srv.summary,
      noIndex: Boolean(srv.noIndex),

      // Rich Service Details from serviceDetails.ts
      heroTag: detail.heroTag || '',
      heroTitle: detail.heroTitle,
      heroDescription: detail.heroDescription,
      aboutBadge: detail.aboutBadge,
      aboutTitle: detail.aboutTitle,
      aboutParagraphs: detail.aboutParagraphs,
      aboutBullets: detail.aboutBullets,
      aboutImage: detail.aboutImage || '',
      aboutImageAlt: detail.aboutImageAlt || '',
      whyTitle: detail.whyTitle,
      whySubtitle: detail.whySubtitle,
      whyPoints: (detail.whyPoints || []).map((wp, i) => ({
        _key: `wp_${i + 1}`,
        number: wp.number,
        title: wp.title,
        description: wp.description,
      })),
      processBadge: detail.processBadge,
      processTitle: detail.processTitle,
      processSubtitle: detail.processSubtitle,
      processSteps: (detail.processSteps || []).map((ps, i) => ({
        _key: `ps_${i + 1}`,
        stepNumber: ps.stepNumber,
        title: ps.title,
        description: ps.description,
      })),
      businessNeedsTitle: detail.businessNeedsTitle,
      businessNeedsSubtitle: detail.businessNeedsSubtitle,
      businessNeedsCards: (detail.businessNeedsCards || []).map((bn, i) => ({
        _key: `bn_${i + 1}`,
        title: bn.title,
        description: bn.description,
        icon: bn.icon,
      })),
      faqBadge: detail.faqBadge,
      faqTitle: detail.faqTitle,
      faqSubtitle: detail.faqSubtitle,
      faqs: (detail.faqs || []).map((f, i) => ({
        _key: `faq_${i + 1}`,
        question: f.question,
        answer: f.answer,
        tag: f.tag || '',
      })),
    };

    const res = await client.createOrReplace(serviceDoc);
    console.log(`  ✓ Service synced: ${res.title} (${res.slug.current})`);
  }

  console.log('\n🎉 ALL CONTENT MIGRATED SUCCESSFULLY TO SANITY!');
}

main().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
