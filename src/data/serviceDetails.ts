export interface ServiceDetailContent {
  heroTag?: string;
  heroTitle: string;
  heroDescription: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutBullets: string[];
  aboutImage: string;
  aboutImageAlt: string;
  whyTitle: string;
  whySubtitle: string;
  whyPoints: {
    number: string;
    title: string;
    description: string;
  }[];
  processBadge: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  businessNeedsTitle: string;
  businessNeedsSubtitle: string;
  businessNeedsCards: {
    title: string;
    description: string;
    icon: 'legal' | 'health' | 'finance' | 'corporate' | 'public' | 'business' | 'tech' | 'security' | 'logistics' | 'pharma';
  }[];
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: {
    question: string;
    answer: string;
    tag?: string;
  }[];
}

// Dedicated custom content dictionary for individual services
const customServiceDetails: Record<string, Partial<ServiceDetailContent>> = {
  'document-storage': {
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
    businessNeedsTitle: 'Document Storage for Different Business Needs',
    businessNeedsSubtitle: 'Every sector keeps different records, and all of them need to be kept safe and easy to find. Here is who we store for.',
    businessNeedsCards: [
      {
        title: 'Legal & Professional Services',
        description: 'Client files, case papers, wills and contracts that must stay confidential and retention-compliant.',
        icon: 'legal',
      },
      {
        title: 'Healthcare & Care Providers',
        description: 'Patient and care records requiring stringent handling, HIPAA/NHS Caldicott compliance and rapid retrieval.',
        icon: 'health',
      },
      {
        title: 'Financial Businesses',
        description: 'Account records, audit files and taxation paperwork with mandatory multi-year statutory retention obligations.',
        icon: 'finance',
      },
      {
        title: 'Corporate Offices',
        description: 'HR files, lease contracts and commercial paperwork that crowd out high-cost workplace square footage.',
        icon: 'corporate',
      },
      {
        title: 'Government & Public Sector',
        description: 'Departmental and civic archives requiring complete audit trails, Freedom of Information readiness and public trust.',
        icon: 'public',
      },
      {
        title: 'Growing Businesses',
        description: 'Scalable archive capacity that expands as administrative paperwork builds up, eliminating costly office moves.',
        icon: 'business',
      },
    ],
    faqBadge: 'Frequently Asked Questions',
    faqTitle: 'Questions About Our Document Storage Service',
    faqSubtitle: 'Clear, transparent answers to help you manage and protect your company’s physical archives with total confidence.',
    faqs: [
      {
        tag: 'Retrieval & Turnaround',
        question: 'How quickly can I retrieve a physical file or box when urgently needed?',
        answer: 'We provide scheduled routine next-day deliveries across the UK, express same-day courier dispatch, or 2-hour emergency Scan-on-Demand digital deliveries sent straight to your secure portal.',
      },
      {
        tag: 'Security & Facilities',
        question: 'What physical security measures protect records inside your storage facility?',
        answer: 'Our storage facilities feature 24/7 continuous CCTV surveillance, dual-custody biometric entry controls, perimeter security fencing, VESDA aspirating smoke detection, and clean-agent fire suppression.',
      },
      {
        tag: 'Inventory & Auditing',
        question: 'How do we track and manage our archive inventory?',
        answer: 'Every box is tagged with a unique encrypted barcode upon collection. Through our intuitive online client portal, authorized staff can view complete box listings, search file descriptions, and track orders.',
      },
      {
        tag: 'Collection & Onboarding',
        question: 'Can Techsteps pack and collect existing loose records from our office?',
        answer: 'Yes. Our security-vetted personnel (vetted to BS 7858 standards) can supply heavy-duty archive boxes, catalogue files directly from your shelving or filing cabinets, and safely transfer them to our vaults.',
      },
      {
        tag: 'Retention & Destruction',
        question: 'What happens when documents reach the end of their legal retention period?',
        answer: 'Our system tracks retention expiry dates. When records reach maturity, we notify your designated compliance officer for authorization, then conduct certified confidential destruction under BS EN 15713.',
      },
      {
        tag: 'Billing & Flexibility',
        question: 'How is document storage priced and what contracts do you offer?',
        answer: 'We provide clear, per-box per-month rates with volume discounts and zero hidden administrative fees. We offer flexible terms ranging from short-term decant storage during office moves to multi-year contracts.',
      },
      {
        tag: 'Compliance & GDPR',
        question: 'How does Techsteps document storage support UK GDPR and ISO compliance?',
        answer: 'By taking uncontrolled physical paperwork off site and placing it into barcoded, climate-monitored facilities with defined retention policies, your organisation fulfils UK GDPR Article 32 security obligations and BS 4971 standards.',
      },
    ],
  },
};

// Generic generator for any service based on its structured properties
export function getServiceDetailContent(slug: string, service: any): ServiceDetailContent {
  const custom = customServiceDetails[slug];

  // Base title and context
  const title = service.title || 'Specialist Service';
  const divisionTitle = service.divisionTitle || 'Corporate Services';
  const summary = service.summary || `Specialist ${title.toLowerCase()} delivered with complete auditability, environmental excellence, and regulatory compliance.`;
  const problem = service.customerProblem || `${title} requirements often create administrative bottlenecks, compliance vulnerabilities, and unnecessary overhead costs when managed in-house.`;
  const solution = service.solution || `Techsteps delivers accredited, secure ${title.toLowerCase()} supported by chain-of-custody tracking, security-cleared personnel, and dedicated facilities.`;

  // Default about paragraphs
  const aboutParagraphs = custom?.aboutParagraphs || [
    problem,
    solution,
    `Every operation is conducted under strict quality and information security management systems (ISO 9001, ISO 27001, and ISO 14001), giving your organization complete transparency and end-to-end accountability.`,
  ];

  // Default about bullets
  const aboutBullets = custom?.aboutBullets || [
    service.keyBenefits?.[0] || 'Full chain-of-custody and item-level tracking',
    service.keyBenefits?.[1] || 'Accredited compliance with UK data protection and ISO standards',
    service.keyBenefits?.[2] || 'Rapid turnaround with dedicated specialist account managers',
  ];

  // Default why points (4 structured cards)
  const defaultWhyPoints = [
    {
      number: '01',
      title: 'Guaranteed Compliance & Security',
      description: service.keyBenefits?.[0] || 'Physical and digital protections meeting strict UK regulatory, ISO 27001, and GDPR compliance standards.',
    },
    {
      number: '02',
      title: 'Operational Cost Efficiency',
      description: service.keyBenefits?.[1] || 'Eliminate resource-draining internal administration with predictable, transparent service-level pricing.',
    },
    {
      number: '03',
      title: 'Rapid Turnaround & Agility',
      description: service.keyBenefits?.[2] || 'Scheduled collections, emergency callouts, and responsive dispatch tailored to your business calendar.',
    },
    {
      number: '04',
      title: 'End-to-End Audit Visibility',
      description: service.keyBenefits?.[3] || 'Complete chain-of-custody logging, formal compliance certificates, and itemized reporting on completion.',
    },
  ];

  const whyPoints = custom?.whyPoints || defaultWhyPoints;

  // Default process steps (4 ascending cards)
  const defaultProcessRaw = service.process && service.process.length >= 4 ? service.process.slice(0, 4) : [
    { stepNumber: 1, title: 'Scope & Consultation', description: `We assess your specific ${title.toLowerCase()} requirements, volumes, and regulatory timelines to establish a clear deployment schedule.` },
    { stepNumber: 2, title: 'Secure Collection', description: `Security-cleared personnel collect items using dedicated GPS-tracked vehicles with sealed, alarmed compartments.` },
    { stepNumber: 3, title: 'Certified Processing', description: `Items are managed inside our accredited facilities under strict ISO-certified environmental and security controls.` },
    { stepNumber: 4, title: 'Audit & Completion', description: `Receive complete compliance certification, itemized inventory registers, and ongoing lifecycle documentation.` },
  ];

  const processSteps = custom?.processSteps || defaultProcessRaw.map((step: any, idx: number) => ({
    stepNumber: String(idx + 1).padStart(2, '0'),
    title: step.title,
    description: step.description,
  }));

  // Default business needs cards (6 cards)
  const businessNeedsCards = custom?.businessNeedsCards || [
    {
      title: 'Legal & Professional Services',
      description: `Confidential ${title.toLowerCase()} compliant with Solicitors Regulation Authority (SRA) guidelines and strict client non-disclosure.`,
      icon: 'legal',
    },
    {
      title: 'Healthcare & Life Sciences',
      description: `Strict protection of sensitive patient records and clinical assets under NHS Information Governance and Caldicott principles.`,
      icon: 'health',
    },
    {
      title: 'Financial & Fintech Sector',
      description: `FCA-aligned procedures ensuring rigorous audit trails, anti-fraud controls, and statutory preservation requirements.`,
      icon: 'finance',
    },
    {
      title: 'Corporate Enterprises',
      description: `Streamlined multi-site management that frees workplace square footage, reduces operational friction, and cuts overheads.`,
      icon: 'corporate',
    },
    {
      title: 'Government & Public Sector',
      description: `Crown Commercial Service aligned standards delivering Crown-level security, FOI readiness, and public accountability.`,
      icon: 'public',
    },
    {
      title: 'Growing & Tech Businesses',
      description: `Agile, scalable support that adapts seamlessly as headcounts expand, facilities evolve, and asset volumes fluctuate.`,
      icon: 'business',
    },
  ];

  // Default FAQs (4 to 7 questions)
  const defaultFaqs: { question: string; answer: string; tag?: string }[] = [
    ...(service.faqs || []).map((faq: any, i: number) => ({
      tag: i === 0 ? 'Service Scope' : i === 1 ? 'Compliance & Standards' : 'Operations',
      question: faq.question,
      answer: faq.answer,
    })),
    {
      tag: 'Security & Accreditations',
      question: `What standards and certifications govern Techsteps' ${title.toLowerCase()} service?`,
      answer: `Our operations are certified under ISO 27001 (Information Security), ISO 9001 (Quality Management), and ISO 14001 (Environmental Management). All personnel are security-vetted to BS 7858 standards with enhanced DBS checks.`,
    },
    {
      tag: 'Logistics & Coverage',
      question: `Do you provide UK-wide coverage for ${title.toLowerCase()}?`,
      answer: `Yes, we operate an owned fleet of satellite-tracked, alarmed vehicles providing scheduled collections and responsive dispatch across England, Scotland, and Wales, including emergency rapid response options.`,
    },
    {
      tag: 'Audit Documentation',
      question: `What documentation and certificates do we receive upon service completion?`,
      answer: `Every service event generates an itemized chain-of-custody log, digital asset inventory register, and official regulatory compliance certificates for your internal and external audit records.`,
    },
    {
      tag: 'Deployment Timelines',
      question: `How quickly can Techsteps deploy this service for our organisation?`,
      answer: `Standard deployments can be scheduled within 48 to 72 hours of initial scope agreement, with same-day emergency response available for urgent operational or compliance deadlines.`,
    },
  ];

  const faqs = custom?.faqs || defaultFaqs.slice(0, 6);

  return {
    heroTag: custom?.heroTag || divisionTitle.toUpperCase(),
    heroTitle: custom?.heroTitle || `${title} Services UK`,
    heroDescription: custom?.heroDescription || summary,
    aboutBadge: custom?.aboutBadge || 'About The Service',
    aboutTitle: custom?.aboutTitle || `${title} for Your Organisation`,
    aboutParagraphs,
    aboutBullets,
    aboutImage: custom?.aboutImage || service.heroImage || '/images/services/document-storage-warehouse.jpg',
    aboutImageAlt: custom?.aboutImageAlt || `Techsteps ${title} Specialist Operations`,
    whyTitle: custom?.whyTitle || `Why Businesses Choose Our ${title}`,
    whySubtitle: custom?.whySubtitle || `Managing ${title.toLowerCase()} requires specialized infrastructure, rigorous compliance controls, and certified audit trails. Our solution delivers proven reliability and cost savings.`,
    whyPoints,
    processBadge: custom?.processBadge || 'Our Process',
    processTitle: custom?.processTitle || `Our ${title} Process`,
    processSubtitle: custom?.processSubtitle || `A disciplined, transparent four-step workflow delivering total compliance and peace of mind at every phase.`,
    processSteps,
    businessNeedsTitle: custom?.businessNeedsTitle || `${title} for Different Business Needs`,
    businessNeedsSubtitle: custom?.businessNeedsSubtitle || `Every sector has unique regulatory mandates and operational requirements. Here is how we tailor our services.`,
    businessNeedsCards,
    faqBadge: custom?.faqBadge || 'Frequently Asked Questions',
    faqTitle: custom?.faqTitle || `Questions About Our ${title} Service`,
    faqSubtitle: custom?.faqSubtitle || `Practical, transparent answers about how our ${title.toLowerCase()} service operates, our accreditations, and service level commitments.`,
    faqs,
  };
}
