import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Load local data using Node experimental strip-types
const dataModule = await import('../src/lib/sanity/data.ts');
const {
  siteSettings,
  divisions,
  services,
  sectors,
  statistics,
  caseStudies,
  articles,
  defaultAboutPage,
} = dataModule;

const docs = [];

// 1. Site Settings
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: siteSettings.companyName,
  legalName: siteSettings.legalName,
  registrationNumber: siteSettings.registrationNumber,
  vatNumber: siteSettings.vatNumber,
  address: {
    street: siteSettings.address.street,
    city: siteSettings.address.city,
    county: siteSettings.address.county,
    postcode: siteSettings.address.postcode,
    country: siteSettings.address.country,
  },
  phone: siteSettings.phone,
  email: siteSettings.email,
  operatingHours: siteSettings.operatingHours,
  socialLinks: {
    linkedin: siteSettings.socialLinks.linkedin,
    twitter: siteSettings.socialLinks.twitter,
  },
  defaultMetaTitle: siteSettings.defaultMetaTitle,
  defaultMetaDescription: siteSettings.defaultMetaDescription,
});

// Map helper to find division by slug
const divisionSlugToId = {};
for (const div of divisions) {
  divisionSlugToId[div.slug] = div.id;
  docs.push({
    _id: div.id,
    _type: 'division',
    title: div.title,
    slug: { _type: 'slug', current: div.slug },
    headline: div.headline,
    summary: div.summary,
    icon: div.icon,
    order: div.order,
  });
}

// Service slug to ID set for reference validation
const serviceSlugToId = {};
for (const s of services) {
  serviceSlugToId[s.slug] = s.id;
}

// Sector slug to ID set for reference validation
const sectorSlugToId = {};
for (const sec of sectors) {
  sectorSlugToId[sec.slug] = sec.id;
}

// 2. Services
for (const s of services) {
  const divId = divisionSlugToId[s.divisionSlug] || 'div-im';
  const doc = {
    _id: s.id,
    _type: 'service',
    title: s.title,
    slug: { _type: 'slug', current: s.slug },
    division: { _type: 'reference', _ref: divId },
    heroAlt: s.heroAlt || s.title,
    summary: s.summary,
    customerProblem: s.customerProblem,
    solution: s.solution,
    keyBenefits: s.keyBenefits || [],
    process: (s.process || []).map((p, idx) => ({
      _key: `step_${idx + 1}`,
      stepNumber: p.stepNumber,
      title: p.title,
      description: p.description,
    })),
    capabilities: s.capabilities || [],
    faqs: (s.faqs || []).map((f, idx) => ({
      _key: `faq_${idx + 1}`,
      question: f.question,
      answer: f.answer,
    })),
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    noIndex: Boolean(s.noIndex),
  };

  if (s.relatedServices && s.relatedServices.length > 0) {
    const validRefs = s.relatedServices
      .filter((slug) => serviceSlugToId[slug])
      .map((slug, idx) => ({
        _key: `rel_${idx + 1}`,
        _type: 'reference',
        _ref: serviceSlugToId[slug],
      }));
    if (validRefs.length > 0) {
      doc.relatedServices = validRefs;
    }
  }

  if (s.relatedSectors && s.relatedSectors.length > 0) {
    const validRefs = s.relatedSectors
      .filter((slug) => sectorSlugToId[slug])
      .map((slug, idx) => ({
        _key: `sec_${idx + 1}`,
        _type: 'reference',
        _ref: sectorSlugToId[slug],
      }));
    if (validRefs.length > 0) {
      doc.relatedSectors = validRefs;
    }
  }

  docs.push(doc);
}

// 3. Sectors
for (const sec of sectors) {
  const doc = {
    _id: sec.id,
    _type: 'sector',
    title: sec.title,
    slug: { _type: 'slug', current: sec.slug },
    tagline: sec.tagline,
    summary: sec.summary,
    heroAlt: sec.heroAlt || sec.title,
    complianceStandards: sec.complianceStandards || [],
    challenges: (sec.challenges || []).map((c, idx) => ({
      _key: `chal_${idx + 1}`,
      title: c.title,
      description: c.description,
    })),
    solutions: (sec.solutions || []).map((sol, idx) => ({
      _key: `sol_${idx + 1}`,
      title: sol.title,
      description: sol.description,
    })),
    securityConsiderations: sec.securityConsiderations || [],
    howTechstepsHelps: sec.howTechstepsHelps,
    keyBenefits: sec.keyBenefits || [],
    faqs: (sec.faqs || []).map((f, idx) => ({
      _key: `faq_${idx + 1}`,
      question: f.question,
      answer: f.answer,
    })),
    metaTitle: sec.metaTitle,
    metaDescription: sec.metaDescription,
  };

  if (sec.relevantServices && sec.relevantServices.length > 0) {
    const validRefs = sec.relevantServices
      .filter((slug) => serviceSlugToId[slug])
      .map((slug, idx) => ({
        _key: `rel_srv_${idx + 1}`,
        _type: 'reference',
        _ref: serviceSlugToId[slug],
      }));
    if (validRefs.length > 0) {
      doc.relevantServices = validRefs;
    }
  }

  docs.push(doc);
}

// 4. Statistics
for (const stat of statistics) {
  docs.push({
    _id: stat.id,
    _type: 'stat',
    label: stat.label,
    value: stat.value,
    prefix: stat.prefix || '',
    suffix: stat.suffix || '',
    displayOrder: stat.displayOrder,
    isVisible: stat.isVisible !== false,
    contextNote: stat.contextNote || '',
  });
}

// 5. Case Studies
for (const cs of caseStudies) {
  const doc = {
    _id: cs.id,
    _type: 'caseStudy',
    title: cs.title,
    slug: { _type: 'slug', current: cs.slug },
    clientIndustry: cs.clientIndustry,
    challenge: cs.challenge,
    solution: cs.solution,
    results: cs.results || [],
    publishedAt: cs.publishedAt,
    metaTitle: cs.metaTitle,
    metaDescription: cs.metaDescription,
  };

  if (cs.servicesUsed && cs.servicesUsed.length > 0) {
    const validRefs = cs.servicesUsed
      .filter((slug) => serviceSlugToId[slug])
      .map((slug, idx) => ({
        _key: `su_${idx + 1}`,
        _type: 'reference',
        _ref: serviceSlugToId[slug],
      }));
    if (validRefs.length > 0) {
      doc.servicesUsed = validRefs;
    }
  }

  docs.push(doc);
}

// 6. Articles
for (const art of articles) {
  const blocks = (art.content || []).map((paragraph, idx) => ({
    _key: `block_${idx + 1}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `span_${idx + 1}`,
        _type: 'span',
        text: paragraph,
        marks: [],
      },
    ],
  }));

  docs.push({
    _id: art.id,
    _type: 'article',
    title: art.title,
    slug: { _type: 'slug', current: art.slug },
    summary: art.summary,
    author: art.author,
    authorRole: art.authorRole,
    publishedDate: art.publishedDate,
    category: art.category,
    readTime: art.readTime || '5 min read',
    body: blocks,
    metaTitle: art.metaTitle,
    metaDescription: art.metaDescription,
  });
}

// 7. About Page
docs.push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  metaTitle: defaultAboutPage.metaTitle,
  metaDescription: defaultAboutPage.metaDescription,
  heroEyebrow: defaultAboutPage.heroEyebrow,
  heroHeadline: defaultAboutPage.heroHeadline,
  heroSubheading: defaultAboutPage.heroSubheading,
  whoWeAreEyebrow: defaultAboutPage.whoWeAreEyebrow,
  whoWeAreHeadline: defaultAboutPage.whoWeAreHeadline,
  whoWeAreBody: defaultAboutPage.whoWeAreBody,
  purposeEyebrow: defaultAboutPage.purposeEyebrow,
  purposeHeadline: defaultAboutPage.purposeHeadline,
  purposeSubheading: defaultAboutPage.purposeSubheading,
  purposeBody: defaultAboutPage.purposeBody,
  purposePrinciples: (defaultAboutPage.purposePrinciples || []).map((p, idx) => ({
    _key: `pp_${idx + 1}`,
    title: p.title,
    description: p.description,
    icon: p.icon || '',
  })),
  values: (defaultAboutPage.values || []).map((v, idx) => ({
    _key: `val_${idx + 1}`,
    title: v.title,
    description: v.description,
    icon: v.icon || '',
  })),
  approachEyebrow: defaultAboutPage.approachEyebrow,
  approachHeadline: defaultAboutPage.approachHeadline,
  approachBody: defaultAboutPage.approachBody,
  approachSteps: (defaultAboutPage.approachSteps || []).map((s, idx) => ({
    _key: `step_${idx + 1}`,
    number: s.number,
    title: s.title,
    description: s.description,
  })),
  complianceEyebrow: defaultAboutPage.complianceEyebrow,
  complianceHeadline: defaultAboutPage.complianceHeadline,
  complianceBody: defaultAboutPage.complianceBody,
  certifications: (defaultAboutPage.certifications || []).map((c, idx) => ({
    _key: `cert_${idx + 1}`,
    name: c.name,
    shortDescription: c.shortDescription || '',
    link: c.link || '',
  })),
  ctaEyebrow: defaultAboutPage.ctaEyebrow,
  ctaHeadline: defaultAboutPage.ctaHeadline,
  ctaBody: defaultAboutPage.ctaBody,
  ctaButtonLabel: defaultAboutPage.ctaButtonLabel,
  ctaButtonUrl: defaultAboutPage.ctaButtonUrl,
  ctaSecondaryButtonLabel: defaultAboutPage.ctaSecondaryButtonLabel,
  ctaSecondaryButtonUrl: defaultAboutPage.ctaSecondaryButtonUrl,
});

const outputPath = resolve('sanity-seed.ndjson');
const ndjsonContent = docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
writeFileSync(outputPath, ndjsonContent, 'utf-8');

console.log(`Successfully generated ${docs.length} documents into ${outputPath}`);
