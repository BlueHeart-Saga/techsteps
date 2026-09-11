import { createClient } from '@sanity/client';
import {
  siteSettings,
  divisions,
  services,
  sectors,
  statistics,
  caseStudies,
  articles,
  defaultAboutPage,
} from './data';
import type {
  SiteSettings,
  Division,
  Service,
  Sector,
  StatItem,
  CaseStudy,
  Article,
  AboutPageData,
} from './types';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const useCdn = import.meta.env.PROD;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

// Unified data access functions with graceful fallback to local data repository
export async function getSiteSettings(): Promise<SiteSettings> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
      if (data) return data;
    } catch {
      // Fallback
    }
  }
  return siteSettings;
}

export async function getDivisions(): Promise<Division[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "division"] | order(order asc)`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return divisions;
}

export async function getDivisionBySlug(slug: string): Promise<Division | undefined> {
  const all = await getDivisions();
  return all.find((d) => d.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "service"]`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

export async function getServicesByDivision(divisionSlug: string): Promise<Service[]> {
  const all = await getServices();
  return all.filter((s) => s.divisionSlug === divisionSlug);
}

export async function getSectors(): Promise<Sector[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "sector"]`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return sectors;
}

export async function getSectorBySlug(slug: string): Promise<Sector | undefined> {
  const all = await getSectors();
  return all.find((s) => s.slug === slug);
}

export async function getStatistics(): Promise<StatItem[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "stat" && isVisible == true] | order(displayOrder asc)`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return statistics.filter((s) => s.isVisible);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "caseStudy"] | order(publishedAt desc)`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return caseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const all = await getCaseStudies();
  return all.find((c) => c.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "article"] | order(publishedDate desc)`);
      if (data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug);
}

export async function getAboutPage(): Promise<AboutPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "aboutPage"][0]`);
      if (data) {
        return {
          ...defaultAboutPage,
          ...data,
          purposePrinciples: (data.purposePrinciples && data.purposePrinciples.length > 0) ? data.purposePrinciples : defaultAboutPage.purposePrinciples,
          values: (data.values && data.values.length > 0) ? data.values : defaultAboutPage.values,
          approachSteps: (data.approachSteps && data.approachSteps.length > 0) ? data.approachSteps : defaultAboutPage.approachSteps,
          certifications: (data.certifications && data.certifications.length > 0) ? data.certifications : defaultAboutPage.certifications,
        };
      }
    } catch {
      // Fallback to default
    }
  }
  return defaultAboutPage;
}
