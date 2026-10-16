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
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
  };
  headerContactButtonText?: string;
  headerContactButtonLink?: string;
  headerRequestButtonText?: string;
  headerRequestButtonLink?: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  mainNav?: CustomLink[];
  footerServices?: CustomLink[];
  footerSectors?: CustomLink[];
  footerCompany?: CustomLink[];
  footerLegal?: CustomLink[];
  footerCopyright?: string;
  accreditationBadges?: { name?: string; label?: string; tag?: string }[];
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
  heroImage?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  aboutBadge?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  strategicValue?: {
    heading?: string;
    description?: string;
    pillars?: { icon?: string; title?: string; description?: string }[];
  };
  customerJourney?: {
    heading?: string;
    description?: string;
    steps?: { number?: string; title?: string; desc?: string }[];
  };
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
  deliversSection?: {
    title?: string;
    subtitle?: string;
    benefits?: { tag?: string; title?: string; description?: string; deliverable?: string }[];
  };
  securitySection?: {
    title?: string;
    subtitle?: string;
    pillars?: { number?: string; title?: string; description?: string }[];
  };
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

  whoWeSupport?: {
    name: string;
    description: string;
  }[];

  challengesSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
  };

  challenges: SectorChallenge[];

  solutionsSection?: {
    eyebrow?: string;
    heading?: string;
  };

  solutions: SectorSolution[];

  securitySection?: {
    heading?: string;
    standardsLabel?: string;
  };

  securityConsiderations: string[];
  complianceStandards: string[];
  howTechstepsHelps: string;

  benefitsSection?: {
    title?: string;
  };

  keyBenefits: string[];

  caseStudySection?: {
    eyebrow?: string;
    linkText?: string;
  };

  relevantServices: string[];

  faqSection?: {
    heading?: string;
    description?: string;
  };

  faqs: FAQItem[];

  cta?: {
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };

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
  title?: string;
  buttonText?: string;
  buttonLink?: string;
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

export interface AboutBuildingHero {
  imageUrl?: string;
  imageAlt?: string;
}

export interface AboutCleanerSmarterValue {
  title: string;
  icon: string;
}

export interface AboutCleanerSmarter {
  heading?: string;
  paragraphs?: string[];
  values?: AboutCleanerSmarterValue[];
}

export interface AboutTechnologyPurpose {
  heading?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface AboutBrighterFuture {
  heading?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface AboutTrustImpactCard {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface AboutTrustImpact {
  heading?: string;
  description?: string;
  cards?: AboutTrustImpactCard[];
}

export interface AboutPeoplePlanetProgressMetric {
  value: string;
  label: string;
}

export interface AboutPeoplePlanetProgress {
  heading?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  metrics?: AboutPeoplePlanetProgressMetric[];
}

export interface AboutJourneyMilestone {
  step: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface AboutJourneyMilestones {
  heading?: string;
  description?: string;
  milestones?: AboutJourneyMilestone[];
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

  buildingHero?: AboutBuildingHero;
  cleanerSmarter?: AboutCleanerSmarter;
  technologyPurpose?: AboutTechnologyPurpose;
  nationwideNetwork?: AboutBrighterFuture;
  brighterFuture?: AboutBrighterFuture;
  trustAndImpact?: AboutTrustImpact;
  trustImpact?: AboutTrustImpact;
  sustainabilityCommitment?: AboutPeoplePlanetProgress;
  peoplePlanetProgress?: AboutPeoplePlanetProgress;
  journey?: AboutJourneyMilestones;
  journeyMilestones?: AboutJourneyMilestones;
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
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  bgImageUrl?: string;
  mobileWorkerImageUrl?: string;
}

export interface HomePageIntro {
  heading?: string;
  description?: string;
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
  stepNumber?: string;
  title?: string;
  headline?: string;
  shortDesc?: string;
  description?: string;
  badge?: string;
  image?: any;
  imageUrl?: string;
  iconImage?: any;
  iconImageUrl?: string;
  imageAlt?: string;
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

export interface HomePageWhyChooseFeature {
  number?: string;
  title?: string;
  description?: string;
}

export interface HomePageWhyChoose {
  eyebrow?: string;
  heading?: string;
  description?: string;
  features?: HomePageWhyChooseFeature[];
  imageUrl?: string;
  imageAlt?: string;
}

export interface HomePageSectorsSection {
  heading?: string;
  description?: string;
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
  whyChoose?: HomePageWhyChoose;
  sectorsSection?: HomePageSectorsSection;
  cta?: HomePageCTA;
}

export interface LeadershipLeader {
  name: string;
  role: string;
  bio: string;
  background?: string;
  imageUrl?: string;
  imageAlt?: string;
  linkedin?: string;
}

export interface LeadershipPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface LeadershipCommitmentCard {
  number: string;
  icon: string;
  title: string;
  description: string;
  isFeatured?: boolean;
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
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    imageUrl?: string;
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
  prioritisingLongevity?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    steps?: {
      step: string;
      title: string;
      desc: string;
    }[];
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
    heroImage?: string;
  };
  contactInfo?: {
    address1?: { title?: string; address?: string };
    address2?: { title?: string; address?: string };
    email?: string;
    phone?: string;
    freephone?: string;
    socialHeading?: string;
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
    topHeading?: string;
    topDescription?: string;
    topButtonText?: string;
    topButtonLink?: string;
    topSecondaryButtonText?: string;
    topSecondaryButtonLink?: string;
    topImageUrl?: string;
    topMobileImageUrl?: string;
    topImageAlt?: string;
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

export interface ServicesPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
  };
  divisionsShowcase?: {
    eyebrow?: string;
    heading?: string;
  };
  lifecycle?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      step: string;
      number: string;
      desc: string;
      image?: string;
    }[];
  };
  pillars?: {
    eyebrow?: string;
    heading?: string;
    items?: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  bottomCta?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export interface SectorsPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subheading?: string;
    bgImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
  intro?: {
    badge?: string;
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  sectorsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
  };
  philosophy?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    principles?: {
      label: string;
      number: string;
      desc: string;
    }[];
  };
  bottomCta?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

// ============================================================================
// LEADERSHIP PAGE TYPES
// ============================================================================

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  background?: string;
  linkedin?: string;
  imageUrl?: string;
  image?: string;
  imageAlt?: string;
}

export interface LeadershipHero {
  eyebrow?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  imageUrl?: string;
  image?: string;
  imageAlt?: string;
}

export interface LeadershipIntro {
  label?: string;
  title?: string;
  highlightedTitle?: string;
  paragraphs?: string[];
}

export interface LeadershipTeam {
  label?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  members: LeadershipMember[];
}

export interface LeadershipPrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface LeadershipPrinciples {
  eyebrow?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  items: LeadershipPrincipleItem[];
}

export interface LeadershipAction {
  eyebrow?: string;
  title?: string;
  highlightedTitle?: string;
  badgeNumber?: string;
  badgeText?: string;
  imageUrl?: string;
  image?: string;
  imageAlt?: string;
  paragraphs?: string[];
  linkText?: string;
  linkUrl?: string;
}

export interface LeadershipCommitmentCard {
  number: string;
  icon: string;
  title: string;
  description: string;
  isFeatured?: boolean;
}

export interface LeadershipCommitment {
  label?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  cards: LeadershipCommitmentCard[];
}

export interface LeadershipCta {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export interface LeadershipPageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: LeadershipHero;
  intro?: LeadershipIntro;
  team?: LeadershipTeam;
  principles?: LeadershipPrinciples;
  action?: LeadershipAction;
  commitment?: LeadershipCommitment;
  cta?: LeadershipCta;
}

// ============================================================================
// GLOBAL PRESENCE PAGE TYPES
// ============================================================================

export interface GlobalPresenceLocation {
  name: string;
  type: string;
  location: string;
  description: string;
  coverage: string;
  features?: string[];
}

export interface GlobalPresenceCapability {
  number: string;
  title: string;
  description: string;
  badge?: string;
  linkUrl?: string;
}

export interface GlobalPresenceStandard {
  code: string;
  name: string;
  description: string;
}

export interface GlobalPresencePageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    highlightedTitle?: string;
    subtitle?: string;
    imageUrl?: string;
    image?: string;
    imageAlt?: string;
  };
  intro?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    paragraphs?: string[];
  };
  regions?: {
    eyebrow?: string;
    title?: string;
    highlightedTitle?: string;
    subtitle?: string;
    locations: GlobalPresenceLocation[];
  };
  capabilities?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    description?: string;
    items: GlobalPresenceCapability[];
  };
  standards?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    description?: string;
    items: GlobalPresenceStandard[];
  };
  cta?: {
    title?: string;
    description?: string;
    primaryText?: string;
    primaryHref?: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

// ============================================================================
// OUR PEOPLE & CULTURE PAGE TYPES
// ============================================================================

export interface PeopleCultureStat {
  number: string;
  label: string;
  subtext?: string;
}

export interface PeopleCulturePillar {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PeopleCultureStep {
  stepNumber: string;
  title: string;
  description: string;
  badge?: string;
}

export interface PeopleCultureProgram {
  title: string;
  description: string;
  badge?: string;
}

export interface PeopleCultureMetric {
  number: string;
  label: string;
}

export interface PeopleCulturePageData {
  metaTitle?: string;
  metaDescription?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    highlightedTitle?: string;
    subtitle?: string;
    imageUrl?: string;
    image?: string;
    imageAlt?: string;
  };
  people?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    paragraphs?: string[];
    stats?: PeopleCultureStat[];
    imageUrl?: string;
    image?: string;
    imageAlt?: string;
  };
  culture?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    subtitle?: string;
    pillars: PeopleCulturePillar[];
  };
  howWeWork?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    description?: string;
    steps: PeopleCultureStep[];
  };
  learningDevelopment?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    description?: string;
    items: PeopleCultureProgram[];
  };
  peoplePlanetProgress?: {
    label?: string;
    title?: string;
    highlightedTitle?: string;
    paragraphs?: string[];
    metrics?: PeopleCultureMetric[];
    imageUrl?: string;
    image?: string;
    imageAlt?: string;
  };
  cta?: {
    title?: string;
    description?: string;
    primaryText?: string;
    primaryHref?: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}
