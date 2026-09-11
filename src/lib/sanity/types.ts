export interface SiteSettings {
  companyName: string;
  legalName: string;
  registrationNumber: string;
  vatNumber: string;
  address: {
    street: string;
    city: string;
    county: string;
    postcode: string;
    country: string;
  };
  phone: string;
  email: string;
  operatingHours: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  defaultMetaTitle: string;
  defaultMetaDescription: string;
}

export interface Division {
  id: string;
  title: string;
  slug: string;
  headline: string;
  summary: string;
  icon: string;
  order: number;
  featuredServices?: string[]; // service slugs
}

export interface ServiceProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  divisionSlug: string;
  divisionTitle: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  customerProblem: string;
  solution: string;
  keyBenefits: string[];
  process: ServiceProcessStep[];
  capabilities: string[];
  faqs: FAQItem[];
  relatedServices?: string[]; // service slugs
  relatedSectors?: string[];  // sector slugs
  metaTitle: string;
  metaDescription: string;
  noIndex?: boolean;
}

export interface SectorChallenge {
  title: string;
  description: string;
}

export interface SectorSolution {
  title: string;
  description: string;
}

export interface Sector {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  complianceStandards: string[];
  challenges: SectorChallenge[];
  solutions: SectorSolution[];
  securityConsiderations: string[];
  howTechstepsHelps: string;
  keyBenefits: string[];
  relevantServices: string[]; // service slugs
  faqs: FAQItem[];
  metaTitle: string;
  metaDescription: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  displayOrder: number;
  isVisible: boolean;
  contextNote?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientIndustry: string;
  challenge: string;
  solution: string;
  results: string[];
  servicesUsed: string[];
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  category: string;
  readTime: string;
  content: string[]; // paragraphs
  metaTitle: string;
  metaDescription: string;
}

export interface PurposePrinciple {
  title: string;
  description: string;
  icon?: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface VerifiedCertification {
  name: string;
  logo?: string;
  shortDescription?: string;
  link?: string;
}

export interface AboutPageData {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow?: string;
  heroHeadline: string;
  heroSubheading?: string;
  heroImage?: string;
  whoWeAreEyebrow?: string;
  whoWeAreHeadline?: string;
  whoWeAreBody?: string;
  whoWeAreImage?: string;
  purposeEyebrow?: string;
  purposeHeadline?: string;
  purposeSubheading?: string;
  purposeBody?: string;
  purposePrinciples: PurposePrinciple[];
  values: ValueItem[];
  approachEyebrow?: string;
  approachHeadline?: string;
  approachBody?: string;
  approachSteps: ApproachStep[];
  complianceEyebrow?: string;
  complianceHeadline?: string;
  complianceBody?: string;
  certifications: VerifiedCertification[];
  ctaEyebrow?: string;
  ctaHeadline?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaButtonUrl?: string;
  ctaSecondaryButtonLabel?: string;
  ctaSecondaryButtonUrl?: string;
}
