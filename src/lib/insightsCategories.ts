// Category metadata, image mappings, and helper utilities for TechSteps Insights Hub
// Maps backend categories to dedicated visual hero artwork from /images/about/inshits/

export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage: string;
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

  // 03 Client Impact / Impact Metrics (UPDATED)
  'impact-metrics': '/images/about/inshits/Impact metrics.png', // <-- Puthu image
  'impact': '/images/about/inshits/Impact metrics.png', // <-- Puthu image
  'client-impact': '/images/about/inshits/03_Client_Impact.png',
  'client-transformations': '/images/about/inshits/03_Client_Impact.png',

  // 04 Testimonials & Reviews (UPDATED if needed)
  'testimonials': '/images/about/inshits/04_Testimonials.png',
  'testimonial': '/images/about/inshits/04_Testimonials.png',
  'reviews': '/images/about/inshits/04_Testimonials.png',

  // 05 Achievements & Awards (UPDATED)
  'achievements': '/images/about/inshits/05_Achievements_Awards.png',
  'awards-milestones': '/images/about/inshits/Awards and mile stones.png', // <-- Puthu image
  'awards': '/images/about/inshits/Awards and mile stones.png', // <-- Puthu image
  'milestones': '/images/about/inshits/Awards and mile stones.png', // <-- Puthu image

  // 06 Newsletters
  'newsletters': '/images/about/inshits/06_Newsletters.png',
  'newsletter': '/images/about/inshits/06_Newsletters.png',

  // 07 Industry Insights & Events (UPDATED)
  'industry-events': '/images/about/inshits/07_Industry_Insigths.png',
  'industry-insights': '/images/about/inshits/07_Industry_Insigths.png',
  'podcasts': '/images/about/inshits/Podcasts.png', // <-- Puthu image

  // 08 Celebrations & Events / Life at TechSteps (UPDATED)
  'celebrations': '/images/about/inshits/08_Celebration_Events.png', // <-- Puthu image
  'events': '/images/about/inshits/08_Celebration_Events.png', // <-- Puthu image
  'celebrations-events': '/images/about/inshits/08_Celebration_Events.png', // <-- Puthu image
  'team-culture': '/images/about/inshits/Team culture.png', // <-- Puthu image
  'community': '/images/about/inshits/community.png', // <-- Puthu image

  // 09 Media Announcements & Press
  'company-announcements': '/images/about/inshits/09_Media_Announcements.png',
  'media-announcements': '/images/about/inshits/09_Media_Announcements.png',
  'announcements': '/images/about/inshits/09_Media_Announcements.png',
  'press': '/images/about/inshits/09_Media_Announcements.png',

  // 10 Research & Resources (UPDATED)
  'research-resources': '/images/about/inshits/10_Research_Resources.png',
  'resources': '/images/about/inshits/10_Research_Resources.png',
  'posters': '/images/about/inshits/10_Research_Resources.png',
  'whitepapers': '/images/about/inshits/10_Research_Resources.png',
  'general': '/images/about/inshits/general.png', // <-- Puthu image
  'uncategorized': '/images/about/inshits/general.png', // <-- Puthu image
};
// 2. MAPPING FOR ARCHIVE PAGE HERO IMAGE (Global for all categories)
export const CATEGORY_ARCHIVE_HERO_IMAGES: Record<string, string> = {
  // Blogs & Articles
  'blogs': '/images/about/inshits/blog hero.png',
  'blog': '/images/about/inshits/blog hero.png',
  'articles': '/images/about/inshits/blog hero.png',
  'blogs-articles': '/images/about/inshits/blog hero.png',

  // Case Studies
  'case-studies': '/images/about/inshits/blog hero.png',
  'case-study': '/images/about/inshits/blog hero.png',
  'studies': '/images/about/inshits/blog hero.png',

  // Impact Metrics
  'impact-metrics': '/images/about/inshits/blog hero.png',
  'impact': '/images/about/inshits/blog hero.png',
  'client-impact': '/images/about/inshits/blog hero.png',
  'client-transformations': '/images/about/inshits/blog hero.png',

  // Testimonials
  'testimonials': '/images/about/inshits/blog hero.png',
  'testimonial': '/images/about/inshits/blog hero.png',
  'reviews': '/images/about/inshits/blog hero.png',

  // Achievements & Awards
  'achievements': '/images/about/inshits/blog hero.png',
  'awards-milestones': '/images/about/inshits/blog hero.png',
  'awards': '/images/about/inshits/blog hero.png',
  'milestones': '/images/about/inshits/blog hero.png',

  // Newsletters
  'newsletters': '/images/about/inshits/blog hero.png',
  'newsletter': '/images/about/inshits/blog hero.png',

  // Industry Events / Podcasts
  'industry-events': '/images/about/inshits/blog hero.png',
  'industry-insights': '/images/about/inshits/blog hero.png',
  'podcasts': '/images/about/inshits/blog hero.png',

  // Celebrations & Life at TechSteps
  'celebrations': '/images/about/inshits/blog hero.png',
  'events': '/images/about/inshits/blog hero.png',
  'celebrations-events': '/images/about/inshits/blog hero.png',
  'team-culture': '/images/about/inshits/blog hero.png',
  'community': '/images/about/inshits/blog hero.png',

  // Company Announcements
  'company-announcements': '/images/about/inshits/blog hero.png',
  'media-announcements': '/images/about/inshits/blog hero.png',
  'announcements': '/images/about/inshits/blog hero.png',
  'press': '/images/about/inshits/blog hero.png',

  // Research & Resources / General
  'research-resources': '/images/about/inshits/blog hero.png',
  'resources': '/images/about/inshits/blog hero.png',
  'posters': '/images/about/inshits/blog hero.png',
  'whitepapers': '/images/about/inshits/blog hero.png',
  'general': '/images/about/inshits/blog hero.png',
  'uncategorized': '/images/about/inshits/blog hero.png',
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
// Add this new function to get the hero image
export function getCategoryArchiveHeroImage(slug: string): string {
  if (!slug) return MAIN_INSIGHTS_HERO_IMAGE;
  const key = slug.toLowerCase().trim();
  return CATEGORY_ARCHIVE_HERO_IMAGES[key] || getCategoryHeroImage(slug);
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