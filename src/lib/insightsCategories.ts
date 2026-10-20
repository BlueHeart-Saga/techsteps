// Category metadata, image mappings, and helper utilities for TechSteps Insights Hub
// Maps backend categories to dedicated visual hero artwork from /images/about/inshits/

export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  image: string;
  sectionName: string;
  sectionSlug: string;
  count: number;
}

// 1. MAPPING FROM CATEGORY SLUG / ALIASES TO HERO IMAGES
export const CATEGORY_HERO_IMAGES: Record<string, string> = {
  // 01 Blogs & Articles
  'blogs': '/images/about/inshits/01_Blogs_Articles.png',
  'blog': '/images/about/inshits/01_Blogs_Articles.png',
  'articles': '/images/about/inshits/01_Blogs_Articles.png',
  'blogs-articles': '/images/about/inshits/01_Blogs_Articles.png',

  // 02 Case Studies
  'case-studies': '/images/about/inshits/02_Case_Studies.png',
  'case-study': '/images/about/inshits/02_Case_Studies.png',
  'studies': '/images/about/inshits/02_Case_Studies.png',

  // 03 Client Impact / Impact Metrics / Transformations
  'impact-metrics': '/images/about/inshits/03_Client_Impact.png',
  'impact': '/images/about/inshits/03_Client_Impact.png',
  'client-impact': '/images/about/inshits/03_Client_Impact.png',
  'client-transformations': '/images/about/inshits/03_Client_Impact.png',

  // 04 Testimonials & Reviews
  'testimonials': '/images/about/inshits/04_Testimonials.png',
  'testimonial': '/images/about/inshits/04_Testimonials.png',
  'reviews': '/images/about/inshits/04_Testimonials.png',

  // 05 Achievements & Awards
  'achievements': '/images/about/inshits/05_Achievements_Awards.png',
  'awards-milestones': '/images/about/inshits/05_Achievements_Awards.png',
  'awards': '/images/about/inshits/05_Achievements_Awards.png',
  'milestones': '/images/about/inshits/05_Achievements_Awards.png',

  // 06 Newsletters
  'newsletters': '/images/about/inshits/06_Newsletters.png',
  'newsletter': '/images/about/inshits/06_Newsletters.png',

  // 07 Industry Insights & Events
  'industry-events': '/images/about/inshits/07_Industry_Insights.png',
  'industry-insights': '/images/about/inshits/07_Industry_Insights.png',
  'podcasts': '/images/about/inshits/07_Industry_Insights.png',

  // 08 Celebrations & Events / Life at TechSteps
  'celebrations': '/images/about/inshits/08_Celebrations_Events.png',
  'events': '/images/about/inshits/08_Celebrations_Events.png',
  'celebrations-events': '/images/about/inshits/08_Celebrations_Events.png',
  'team-culture': '/images/about/inshits/08_Celebrations_Events.png',
  'community': '/images/about/inshits/08_Celebrations_Events.png',

  // 09 Media Announcements & Press
  'company-announcements': '/images/about/inshits/09_Media_Announcements.png',
  'media-announcements': '/images/about/inshits/09_Media_Announcements.png',
  'announcements': '/images/about/inshits/09_Media_Announcements.png',
  'press': '/images/about/inshits/09_Media_Announcements.png',

  // 10 Research & Resources
  'research-resources': '/images/about/inshits/10_Research_Resources.png',
  'resources': '/images/about/inshits/10_Research_Resources.png',
  'posters': '/images/about/inshits/10_Research_Resources.png',
  'whitepapers': '/images/about/inshits/10_Research_Resources.png',
  'general': '/images/about/inshits/10_Research_Resources.png',
  'uncategorized': '/images/about/inshits/10_Research_Resources.png',
};

export const MAIN_INSIGHTS_HERO_IMAGE = '/images/about/inshits/main-hero.png';

// Fallback professional editorial summaries if backend has no category description
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'blogs': 'Expert technical analysis, regulatory compliance briefings, and IT lifecycle best practice guides.',
  'case-studies': 'Real-world client outcomes, verified decommissioning milestones, and measurable asset recovery achievements.',
  'impact-metrics': 'Quantified carbon savings, electronic waste landfill diversion, and transparent ESG reporting metrics.',
  'client-transformations': 'Strategic transformations helping enterprises optimize hardware recovery, security, and sustainability.',
  'testimonials': 'Direct feedback, verified endorsements, and service appraisals from enterprise IT and NHS trust partners.',
  'achievements': 'Key regulatory credentials, enterprise certifications, and milestones achieved across the UK technology sector.',
  'awards-milestones': 'Industry accolades, benchmark accreditations, and historical company achievements.',
  'newsletters': 'Quarterly circular IT briefings, data protection advisories, and industry regulatory updates.',
  'industry-events': 'Panels, exhibitions, compliance summits, and technology recovery forums attended by TechSteps.',
  'podcasts': 'Conversations with data protection officers, ITAD engineers, and circular technology leaders.',
  'celebrations': 'Company milestones, community engagements, and team moments shaping life at TechSteps.',
  'team-culture': 'Our collective ethos, dedicated workforce values, and workplace practices driving excellence.',
  'community': 'Social value contributions, community recycling partnerships, and digital inclusion initiatives.',
  'company-announcements': 'Official statements, partnership declarations, service launches, and facility expansion updates.',
  'posters': 'Visual reference frameworks, security hygiene checklists, and IT disposal compliance posters.',
  'general': 'Foundational perspectives and operational guidance across the secure technology lifecycle.',
};

/**
 * Resolves the appropriate hero image for any category slug.
 */
export function getCategoryHeroImage(slug: string): string {
  if (!slug) return MAIN_INSIGHTS_HERO_IMAGE;
  const key = slug.toLowerCase().trim();
  return CATEGORY_HERO_IMAGES[key] || MAIN_INSIGHTS_HERO_IMAGE;
}

/**
 * Resolves a concise, professional description for any category slug.
 */
export function getCategoryDescription(slug: string, backendDesc?: string): string {
  if (backendDesc && backendDesc.trim().length > 10) {
    return backendDesc.trim();
  }
  const key = (slug || '').toLowerCase().trim();
  return CATEGORY_DESCRIPTIONS[key] || 'Curated analysis, verified industry briefings, and technical guidance from TechSteps.';
}

/**
 * Normalizes a category display title.
 */
export function formatCategoryTitle(name?: string, slug?: string): string {
  if (name && name.trim().length > 0) return name.trim();
  if (!slug) return 'Insights';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
