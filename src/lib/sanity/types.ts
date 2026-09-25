export interface CustomLink {
  label: string;
  url?: string;
  linkType?: 'internal' | 'external';
  externalUrl?: string;
  openInNewTab?: boolean;
}

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
  mainNav?: CustomLink[];
  footerServices?: CustomLink[];
  footerSectors?: CustomLink[];
  footerCompany?: CustomLink[];
  footerLegal?: CustomLink[];
  footerCopyright?: string;
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
  heroTitle?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  aboutBadge?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  lifecycleStages?: { id: string; number: string; label: string; desc: string }[];
  faqs?: FAQItem[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface ServiceProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  tag?: string;
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

  // Rich Service Detail Fields
  heroTag?: string;
  heroTitle?: string;
  heroDescription?: string;
  aboutBadge?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  aboutBullets?: string[];
  aboutImage?: string;
  aboutImageAlt?: string;
  whyTitle?: string;
  whySubtitle?: string;
  whyPoints?: { number: string; title: string; description: string }[];
  processBadge?: string;
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: { stepNumber: string; title: string; description: string }[];
  businessNeedsTitle?: string;
  businessNeedsSubtitle?: string;
  businessNeedsCards?: { title: string; description: string; icon: string }[];
  faqBadge?: string;
  faqTitle?: string;
  faqSubtitle?: string;
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

export interface AboutHighlight {
  title: string;
  description?: string;
  icon?: string;
}

export interface AboutHero {
  eyebrow?: string;
  headline?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
}

export interface AboutWhoWeAre {
  eyebrow?: string;
  headline?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  highlights?: AboutHighlight[];
}

export interface AboutWhatWeDoItem {
  number?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface AboutWhatWeDo {
  eyebrow?: string;
  items?: AboutWhatWeDoItem[];
}

export interface AboutApproachStep {
  number?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface AboutApproach {
  eyebrow?: string;
  headline?: string;
  description?: string;
  steps?: AboutApproachStep[];
}

export interface AboutCapability {
  title: string;
  description?: string;
  icon?: string;
}

export interface AboutCapabilities {
  eyebrow?: string;
  items?: AboutCapability[];
}

export interface AboutStatistic {
  number: string;
  suffix?: string;
  label?: string;
}

export interface AboutCTA {
  eyebrow?: string;
  headline?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export interface AboutPageData {
  metaTitle?: string;
  metaDescription?: string;

  hero?: AboutHero;

  whoWeAre?: AboutWhoWeAre;

  whatWeDo?: AboutWhatWeDo;

  approach?: AboutApproach;

  capabilities?: AboutCapabilities;

  statistics?: AboutStatistic[];

  cta?: AboutCTA;
}

export interface HomePageHero {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image?: any;
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface HomePageIntro {
  heading?: string;
  description?: string;
  highlightOne?: string;
  highlightTwo?: string;
  highlightThree?: string;
}

export interface HomePageStatistic {
  number?: string;
  suffix?: string;
  label?: string;
}

export interface HomePageServiceCard {
  divisionNumber?: string;
  title?: string;
  description?: string;
  image?: any;
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  link?: string;
}

export interface HomePageServices {
  eyebrow?: string;
  heading?: string;
  cards?: HomePageServiceCard[];
  viewAllText?: string;
  viewAllLink?: string;
}

export interface HomePageLifecycleStep {
  number?: string;
  title?: string;
  description?: string;
  badge?: string;
}

export interface HomePageLifecycle {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image?: any;
  imageUrl?: string;
  imageAlt?: string;
  steps?: HomePageLifecycleStep[];
}

export interface HomePageCTA {
  heading?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface HomePageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: HomePageHero;
  intro?: HomePageIntro;
  statistics?: HomePageStatistic[];
  services?: HomePageServices;
  lifecycle?: HomePageLifecycle;
  cta?: HomePageCTA;
}

export interface FaqCategoryItem {
  id: string;
  name: string;
  icon?: string;
}

export interface FaqItemWithCategory {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface FaqPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
  };
  categories?: FaqCategoryItem[];
  items?: FaqItemWithCategory[];
  contactCard?: {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export interface SustainabilityPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  metrics?: {
    number: string;
    suffix?: string;
    label: string;
    note?: string;
  }[];
  approach?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: string;
    steps?: {
      step: string;
      title: string;
      badge?: string;
      desc: string;
    }[];
  };
  lifecycleSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
  };
  esgPillars?: {
    title: string;
    badge?: string;
    items?: {
      title: string;
      desc: string;
    }[];
  }[];
  bottomCta?: {
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export interface InvestorsPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
  };
  stats?: {
    prefix?: string;
    value: string;
    suffix?: string;
    title: string;
    desc: string;
  }[];
  strategicPillars?: {
    number: string;
    title: string;
    headline: string;
    desc: string;
    detail: string;
    iconSvg?: string;
  }[];
  investmentCase?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    bulletPoints?: string[];
  };
  irContact?: {
    heading?: string;
    description?: string;
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
  };
  businesses?: {
    division: string;
    name: string;
    tagline: string;
    description: string;
    link: string;
    image: string;
    accreditations: string;
  }[];
  esgPillars?: {
    title: string;
    badge: string;
    desc: string;
  }[];
}

export interface LegalPageSection {
  heading: string;
  body?: string;
  callout?: {
    title?: string;
    items?: { label: string; value: string }[];
  };
  cards?: { title: string; description: string }[];
  listItems?: { label: string; text: string }[];
}

export interface LegalPageData {
  title: string;
  slug: string;
  eyebrow?: string;
  subheading?: string;
  metaTitle?: string;
  metaDescription?: string;
  complianceBadge?: string;
  lastUpdated?: string;
  sections?: LegalPageSection[];
}

export interface ContactPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
  };
  formSection?: {
    heading?: string;
    image?: string;
  };
  directLines?: {
    title: string;
    description: string;
    phone: string;
    email: string;
  }[];
}

export interface RequestCollectionPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    title?: string;
    description?: string;
  };
  slaGuarantees?: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry?: string;
  rating?: number;
  avatar: string;
  order?: number;
}