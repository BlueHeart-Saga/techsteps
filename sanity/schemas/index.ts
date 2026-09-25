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
import homePage from './homePage';
import faqPage from './faqPage';
import sustainabilityPage from './sustainabilityPage';
import investorsPage from './investorsPage';
import contactPage from './contactPage';
import requestCollectionPage from './requestCollectionPage';
import testimonial from './testimonial';

export const schemaTypes = [
  // Objects
  customLink,
  seo,

  // Documents - Global Settings
  siteSettings,

  // Documents - Pages
  homePage,
  aboutPage,
  faqPage,
  sustainabilityPage,
  investorsPage,
  contactPage,
  requestCollectionPage,

  // Documents - Entities & Collections
  division,
  service,
  sector,
  stat,
  caseStudy,
  article,
  testimonial,
];
