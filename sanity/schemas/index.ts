import customLink from './objects/customLink';
import seo from './objects/seo';
import siteSettings from './siteSettings';
import division from './division';
import service from './service';
import sector from './sector';
import stat from './stat';
import caseStudy from './caseStudy';
import article from './article';
import aboutPage from './aboutPage';
import leadershipPage from './leadershipPage';
import globalPresencePage from './globalPresencePage';
import peopleCulturePage from './peopleCulturePage';
import homePage from './homePage';
import faqPage from './faqPage';
import sustainabilityPage from './sustainabilityPage';
import investorsPage from './investorsPage';
import contactPage from './contactPage';
import requestCollectionPage from './requestCollectionPage';
import servicesPage from './servicesPage';
import sectorsPage from './sectorsPage';
import testimonial from './testimonial';
import legalPage from './legalPage';
import partnersPage from './partnersPage';
import certificationsPage from './certificationsPage';
import ourCommitmentPage from './ourCommitmentPage';
import caseStudiesPage from './caseStudiesPage';
import locationsPage from './locationsPage';
import location from './location';

export const schemaTypes = [
  // Objects
  customLink,
  seo,

  // Documents - Global Settings
  siteSettings,

  // Documents - Pages (Singletons)
  homePage,
  aboutPage,
  leadershipPage,
  globalPresencePage,
  peopleCulturePage,
  partnersPage,
  certificationsPage,
  ourCommitmentPage,
  servicesPage,
  sectorsPage,
  caseStudiesPage,
  locationsPage,
  faqPage,
  sustainabilityPage,
  investorsPage,
  contactPage,
  requestCollectionPage,

  // Documents - Entities & Collections
  division,
  service,
  sector,
  location,
  stat,
  caseStudy,
  article,
  testimonial,
  legalPage,
];

