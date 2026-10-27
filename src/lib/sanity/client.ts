import dns from 'node:dns';
try {
  dns.setDefaultResultOrder?.('ipv4first');
} catch {}
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
  defaultLeadershipPageData,
  defaultGlobalPresencePageData,
  defaultPeopleCulturePageData,
  defaultFaqPage,
  defaultSustainabilityPage,
  defaultInvestorsPage,
  defaultContactPage,
  defaultRequestCollectionPage,
  defaultHomePageData,
  defaultServicesPageData,
  defaultSectorsPageData,
  testimonials,
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
  LeadershipPageData,
  GlobalPresencePageData,
  PeopleCulturePageData,
  HomePageData,
  FaqPageData,
  SustainabilityPageData,
  InvestorsPageData,
  ContactPageData,
  RequestCollectionPageData,
  ServicesPageData,
  SectorsPageData,
  TestimonialItem,
  LegalPageData,
} from './types';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {} as any);
const projectId =
  env.PUBLIC_SANITY_PROJECT_ID ||
  env.SANITY_PROJECT_ID ||
  'zjv69ibt';
const dataset =
  env.PUBLIC_SANITY_DATASET ||
  env.SANITY_DATASET ||
  'techsteps';
const apiVersion =
  env.PUBLIC_SANITY_API_VERSION ||
  env.SANITY_API_VERSION ||
  '2026-03-01';
// In static Astro generation, useCdn: false ensures the current published content is fetched
const useCdn = false;

// Ensure IPv4 first on Node environments to prevent dual-stack DNS lag
if (typeof process !== 'undefined' && typeof process.versions?.node !== 'undefined') {
  import('node:dns')
    .then((dns) => dns.setDefaultResultOrder?.('ipv4first'))
    .catch(() => {});
}

const token =
  env.SANITY_API_TOKEN ||
  env.SANITY_TOKEN ||
  (typeof process !== 'undefined' ? (process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN) : undefined);

const rawSanityClient = projectId
  ? createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: token || undefined,
  })
  : null;

// High-performance in-memory cache & request deduplication to make page navigation instant
const sanityCache = new Map<string, { data: any; expiry: number }>();
const inFlightRequests = new Map<string, Promise<any>>();
const isDev = Boolean(env.DEV || (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'));
const SANITY_CACHE_TTL = isDev ? 1000 : 60 * 1000;

export const sanityClient = rawSanityClient
  ? new Proxy(rawSanityClient, {
    get(target: any, prop: string | symbol, receiver: any) {
      if (prop === 'fetch') {
        return async function (query: string, params?: any, options?: any) {
          const key = typeof query === 'string' ? (query.trim() + (params ? JSON.stringify(params) : '')) : String(query);
          const now = Date.now();
          const cached = sanityCache.get(key);
          if (cached && cached.expiry > now) {
            return cached.data;
          }
          if (inFlightRequests.has(key)) {
            return inFlightRequests.get(key);
          }
          const promise = (target.fetch as Function).call(target, query, params, options)
            .then((result: any) => {
              sanityCache.set(key, { data: result, expiry: Date.now() + SANITY_CACHE_TTL });
              inFlightRequests.delete(key);
              return result;
            })
            .catch((err: any) => {
              inFlightRequests.delete(key);
              throw err;
            });
          inFlightRequests.set(key, promise);
          return promise;
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  })
  : null;

function normalizeSlug(slug: any): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  if (typeof slug === 'object' && slug.current) return slug.current;
  return String(slug);
}

export async function getHomePage(): Promise<HomePageData | null> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "homePage" && (_id == "homePage" || !(_id in path("drafts.**")))] | order((_id == "homePage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            heading,
            description,
            image{
              asset->{
                _id,
                url
              }
            },
            imageAlt,
            buttonText,
            buttonLink,
            secondaryButtonText,
            secondaryButtonLink,
            bgImageUrl,
            mobileWorkerImageUrl
          },

          intro{
            heading,
            description
          },

          statistics[]{
            number,
            suffix,
            label
          },

          services{
            eyebrow,
            heading,
            cards[]{
              divisionNumber,
              title,
              description,
              image{
                asset->{
                  _id,
                  url
                }
              },
              imageAlt,
              buttonText,
              link
            },
            viewAllText,
            viewAllLink
          },

          lifecycle{
            eyebrow,
            heading,
            description,
            image{
              asset->{
                _id,
                url
              }
            },
            imageAlt,
            steps[]{
              number,
              stepNumber,
              title,
              headline,
              shortDesc,
              description,
              badge,
              image{
                asset->{
                  _id,
                  url
                }
              },
              "imageUrl": image.asset->url,
              iconImage{
                asset->{
                  _id,
                  url
                }
              },
              "iconImageUrl": iconImage.asset->url,
              imageAlt
            }
          },

          whyChoose{
            eyebrow,
            heading,
            description,
            features[]{
              number,
              title,
              description
            },
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },

          sectorsSection{
            heading,
            description
          },

          cta{
            heading,
            description,
            primaryButtonText,
            primaryButtonLink,
            secondaryButtonText,
            secondaryButtonLink
          }
        }
      `);

      if (data) {
        return {
          ...defaultHomePageData,
          ...data,
          hero: {
            ...defaultHomePageData.hero,
            ...(data.hero || {}),
            imageUrl: data.hero?.image?.asset?.url || data.hero?.imageUrl || defaultHomePageData.hero?.imageUrl,
            buttonText: data.hero?.buttonText || defaultHomePageData.hero?.buttonText,
            buttonLink: data.hero?.buttonLink || defaultHomePageData.hero?.buttonLink,
            secondaryButtonText: data.hero?.secondaryButtonText || defaultHomePageData.hero?.secondaryButtonText,
            secondaryButtonLink: data.hero?.secondaryButtonLink || defaultHomePageData.hero?.secondaryButtonLink,
            bgImageUrl: data.hero?.bgImageUrl || defaultHomePageData.hero?.bgImageUrl,
            mobileWorkerImageUrl: data.hero?.mobileWorkerImageUrl || defaultHomePageData.hero?.mobileWorkerImageUrl,
          },
          intro: {
            ...defaultHomePageData.intro,
            ...(data.intro || {}),
          },
          services: {
            ...defaultHomePageData.services,
            ...(data.services || {}),
            cards: (Array.isArray(data.services?.cards) && data.services.cards.length > 0)
              ? data.services.cards
              : defaultHomePageData.services?.cards,
          },
          lifecycle: {
            ...defaultHomePageData.lifecycle,
            ...(data.lifecycle || {}),
            steps: (Array.isArray(data.lifecycle?.steps) && data.lifecycle.steps.length > 0)
              ? data.lifecycle.steps
              : defaultHomePageData.lifecycle?.steps,
          },
          whyChoose: {
            ...defaultHomePageData.whyChoose,
            ...(data.whyChoose || {}),
            imageUrl: data.whyChoose?.image || data.whyChoose?.imageUrl || defaultHomePageData.whyChoose?.imageUrl,
            features: (Array.isArray(data.whyChoose?.features) && data.whyChoose.features.length > 0)
              ? data.whyChoose.features
              : defaultHomePageData.whyChoose?.features,
          },
          sectorsSection: {
            ...defaultHomePageData.sectorsSection,
            ...(data.sectorsSection || {}),
          },
          cta: {
            ...defaultHomePageData.cta,
            ...(data.cta || {}),
          },
          statistics: (Array.isArray(data.statistics) && data.statistics.length > 0)
            ? data.statistics
            : defaultHomePageData.statistics,
        };
      }
    } catch (error) {
      console.error('Failed to fetch Home Page from Sanity:', error);
    }
  }

  return defaultHomePageData;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (sanityClient) {
    try {
      const linkProjection = `
        label,
        linkType,
        openInNewTab,
        externalUrl,
        "url": select(
          linkType == "internal" => select(
            internalRef->_type == "service" => "/services/" + internalRef->slug.current,
            internalRef->_type == "sector" => "/sectors/" + internalRef->slug.current,
            internalRef->_type == "division" => "/" + internalRef->slug.current,
            internalRef->_type == "article" => "/insights/" + internalRef->slug.current,
            internalRef->_type == "caseStudy" => "/case-studies/" + internalRef->slug.current,
            "/"
          ),
          externalUrl
        )
      `;

      const data = await sanityClient.fetch(`
        *[_type == "siteSettings" && (_id == "siteSettings" || !(_id in path("drafts.**")))] | order((_id == "siteSettings") desc, _updatedAt desc)[0]{
          ...,
          "mainNav": mainNav[]{ ${linkProjection} },
          "footerServices": footerServices[]{ ${linkProjection} },
          "footerSectors": footerSectors[]{ ${linkProjection} },
          "footerCompany": footerCompany[]{ ${linkProjection} },
          "footerLegal": footerLegal[]{ ${linkProjection} }
        }
      `);

      if (data) {
        return {
          ...siteSettings,
          ...data,
          socialLinks: {
            ...siteSettings.socialLinks,
            ...(data.socialLinks || {}),
          },
          headerContactButtonText: data.headerContactButtonText || siteSettings.headerContactButtonText,
          headerContactButtonLink: data.headerContactButtonLink || siteSettings.headerContactButtonLink,
          headerRequestButtonText: data.headerRequestButtonText || siteSettings.headerRequestButtonText,
          headerRequestButtonLink: data.headerRequestButtonLink || siteSettings.headerRequestButtonLink,
          accreditationBadges: (Array.isArray(data.accreditationBadges) && data.accreditationBadges.length > 0)
            ? data.accreditationBadges
            : siteSettings.accreditationBadges,
          mainNav: (Array.isArray(data.mainNav) && data.mainNav.length > 0) ? data.mainNav : siteSettings.mainNav,
          footerServices: (Array.isArray(data.footerServices) && data.footerServices.length > 0) ? data.footerServices : siteSettings.footerServices,
          footerSectors: (Array.isArray(data.footerSectors) && data.footerSectors.length > 0) ? data.footerSectors : siteSettings.footerSectors,
          footerCompany: (Array.isArray(data.footerCompany) && data.footerCompany.length > 0) ? data.footerCompany : siteSettings.footerCompany,
          footerLegal: (Array.isArray(data.footerLegal) && data.footerLegal.length > 0) ? data.footerLegal : siteSettings.footerLegal,
        };
      }
    } catch {
      // Fallback
    }
  }
  return siteSettings;
}

export async function getDivisions(): Promise<Division[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "division" && !(_id in path("drafts.**"))]{
        ...,
        "heroImage": coalesce(heroImage.asset->url, heroImage)
      } | order(order asc)`);
      if (data && data.length > 0) {
        return data.map((d: any) => {
          const normSlug = normalizeSlug(d.slug);
          const fallback = divisions.find((f) => f.slug === normSlug || f.id === d._id || f.id === d.id);
          return {
            ...fallback,
            ...d,
            slug: normSlug,
            strategicValue: {
              ...fallback?.strategicValue,
              ...(d.strategicValue || {}),
              pillars: (Array.isArray(d.strategicValue?.pillars) && d.strategicValue.pillars.length > 0)
                ? d.strategicValue.pillars
                : fallback?.strategicValue?.pillars,
            },
            customerJourney: {
              ...fallback?.customerJourney,
              ...(d.customerJourney || {}),
              steps: (Array.isArray(d.customerJourney?.steps) && d.customerJourney.steps.length > 0)
                ? d.customerJourney.steps
                : fallback?.customerJourney?.steps,
            },
          };
        });
      }
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
      const data = await sanityClient.fetch(`*[_type == "service" && !(_id in path("drafts.**"))]{
        ...,
        "divisionSlug": coalesce(division->slug.current, divisionSlug),
        "divisionTitle": coalesce(division->title, divisionTitle)
      }`);
      if (data && data.length > 0) {
        return data.map((s: any) => {
          const normSlug = normalizeSlug(s.slug);
          const fallback = services.find((f) => f.slug === normSlug || f.id === s._id || f.id === s.id);
          return {
            ...fallback,
            ...s,
            slug: normSlug,
            deliversSection: {
              ...fallback?.deliversSection,
              ...(s.deliversSection || {}),
              benefits: (Array.isArray(s.deliversSection?.benefits) && s.deliversSection.benefits.length > 0)
                ? s.deliversSection.benefits
                : fallback?.deliversSection?.benefits,
            },
            securitySection: {
              ...fallback?.securitySection,
              ...(s.securitySection || {}),
              pillars: (Array.isArray(s.securitySection?.pillars) && s.securitySection.pillars.length > 0)
                ? s.securitySection.pillars
                : fallback?.securitySection?.pillars,
            },
          };
        });
      }
    } catch {
      // Fallback
    }
  }
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  const cleanTarget = slug.trim().toLowerCase();
  const targetBase = cleanTarget.replace(/-services|-uk/g, '');

  return all.find((s) => {
    const cleanS = s.slug?.trim().toLowerCase();
    if (cleanS === cleanTarget) return true;
    const sBase = cleanS?.replace(/-services|-uk/g, '');
    return sBase === targetBase;
  });
}

export async function getServicesByDivision(divisionSlug: string): Promise<Service[]> {
  const all = await getServices();
  return all.filter((s) => s.divisionSlug === divisionSlug);
}

export async function getSectors(): Promise<Sector[]> {
  let sanitySectors: Sector[] = [];

  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "sector" && !(_id in path("drafts.**"))]{
        _id,
        "id": _id,

        title,
        "slug": slug.current,
        tagline,
        summary,

        "heroImage": coalesce(heroImage.asset->url, heroImage),
        heroAlt,

        challengesSection{
          eyebrow,
          heading,
          description
        },

        challenges[]{
          title,
          description
        },

        solutionsSection{
          eyebrow,
          heading
        },

        solutions[]{
          title,
          description
        },

        securitySection{
          heading,
          standardsLabel
        },

        securityConsiderations,

        complianceStandards,

        howTechstepsHelps,

        benefitsSection{
          title
        },

        keyBenefits,

        caseStudySection{
          eyebrow,
          linkText
        },

        "relevantServices": coalesce(
          relevantServices[]->slug.current,
          relevantServices
        ),

        faqSection{
          heading,
          description
        },

        faqs[]{
          question,
          answer
        },

        cta{
          heading,
          description,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink
        },

        metaTitle,
        metaDescription
      }`);

      if (data && data.length > 0) {
        sanitySectors = data.map((sec: any) => {
          const normSlug = normalizeSlug(sec.slug);
          const fallback = sectors.find((f) => f.slug === normSlug || f.id === sec._id || f.id === sec.id);
          return {
            ...fallback,
            ...sec,
            slug: normSlug,

          challengesSection: sec.challengesSection || {},

          challenges: Array.isArray(sec.challenges)
            ? sec.challenges
            : [],

          solutionsSection: sec.solutionsSection || {},

          solutions: Array.isArray(sec.solutions)
            ? sec.solutions
            : [],

          securitySection: sec.securitySection || {},

          securityConsiderations: Array.isArray(sec.securityConsiderations)
            ? sec.securityConsiderations
            : [],

          complianceStandards: Array.isArray(sec.complianceStandards)
            ? sec.complianceStandards
            : [],

          keyBenefits: Array.isArray(sec.keyBenefits)
            ? sec.keyBenefits
            : [],

          benefitsSection: sec.benefitsSection || {},

          caseStudySection: sec.caseStudySection || {},

          relevantServices: Array.isArray(sec.relevantServices)
            ? sec.relevantServices.filter(Boolean)
            : [],

          faqSection: sec.faqSection || {},

          faqs: Array.isArray(sec.faqs)
            ? sec.faqs
            : [],

          cta: sec.cta || {},
        };
      });
      }
    } catch (error) {
      console.error('Failed to fetch Sectors from Sanity:', error);
    }
  }

  const knownSlugs = new Set(
    sanitySectors.map((s) => s.slug)
  );

  const merged = [
    ...sanitySectors,
    ...sectors.filter((s) => !knownSlugs.has(s.slug)),
  ];

  return merged.length > 0 ? merged : sectors;
}

export async function getSectorBySlug(slug: string): Promise<Sector | undefined> {
  const all = await getSectors();
  return all.find((s) => s.slug === slug);
}

export async function getStatistics(): Promise<StatItem[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "stat" && isVisible == true && !(_id in path("drafts.**"))] | order(displayOrder asc)`);
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
      const data = await sanityClient.fetch(`*[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(publishedAt desc)`);
      if (data && data.length > 0) {
        return data.map((cs: any) => ({
          ...cs,
          slug: normalizeSlug(cs.slug),
        }));
      }
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
      const data = await sanityClient.fetch(`*[_type == "article" && !(_id in path("drafts.**"))] | order(publishedDate desc)`);
      if (data && data.length > 0) {
        return data.map((a: any) => ({
          ...a,
          slug: normalizeSlug(a.slug),
          content:
            Array.isArray(a.content) && a.content.length > 0
              ? a.content
              : Array.isArray(a.body)
                ? a.body
                  .map((b: any) => (b.children ? b.children.map((c: any) => c.text).join('') : ''))
                  .filter(Boolean)
                : [],
        }));
      }
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
  if (!sanityClient) {
    return defaultAboutPage || {};
  }

  try {
    const data = await sanityClient.fetch(`
      *[_type == "aboutPage" && (_id == "aboutPage" || !(_id in path("drafts.**")))] | order((_id == "aboutPage") desc, _updatedAt desc)[0]{
        metaTitle,
        metaDescription,

        buildingHero{
          imageUrl,
          imageAlt,
          "image": image.asset->url
        },

        cleanerSmarter{
          heading,
          paragraphs,
          values[]{
            title,
            icon
          }
        },

        technologyPurpose{
          heading,
          description,
          imageUrl,
          imageAlt,
          "image": image.asset->url
        },

        nationwideNetwork{
          heading,
          description,
          imageUrl,
          imageAlt,
          "image": image.asset->url
        },

        trustAndImpact{
          heading,
          description,
          cards[]{
            title,
            imageUrl,
            imageAlt
          }
        },

        sustainabilityCommitment{
          heading,
          description,
          imageUrl,
          imageAlt,
          "image": image.asset->url,
          metrics[]{
            value,
            label
          }
        },

        journey{
          heading,
          description,
          milestones[]{
            step,
            title,
            description,
            imageUrl
          }
        },

        cta{
          title,
          description,
          buttonText,
          buttonLink,
          secondaryButtonText,
          secondaryButtonLink,
          // Legacy cta fields
          primaryButtonText,
          primaryButtonLink
        },

        // Legacy fields for backwards compatibility
        hero{
          eyebrow,
          headline,
          description,
          "image": image.asset->url,
          imageAlt,
          badge
        },
        whoWeAre{
          eyebrow,
          headline,
          description,
          "image": image.asset->url,
          imageAlt,
          highlights[]{
            title,
            description,
            icon
          }
        },
        whatWeDo{
          eyebrow,
          items[]{
            number,
            title,
            description,
            "image": image.asset->url,
            imageAlt,
            badge,
            buttonText,
            buttonLink
          }
        },
        approach{
          eyebrow,
          headline,
          description,
          steps[]{
            number,
            title,
            description,
            icon
          }
        },
        capabilities{
          eyebrow,
          items[]{
            title,
            description,
            icon
          }
        },
        statistics[]{
          number,
          suffix,
          label
        }
      }
    `);

    if (!data) {
      return defaultAboutPage || {};
    }

    const buildingHero = {
      ...defaultAboutPage.buildingHero,
      ...(data.buildingHero || {}),
      imageUrl: data.buildingHero?.image || data.buildingHero?.imageUrl || defaultAboutPage.buildingHero?.imageUrl,
    };

    const cleanerSmarter = {
      ...defaultAboutPage.cleanerSmarter,
      ...(data.cleanerSmarter || {}),
      paragraphs: (Array.isArray(data.cleanerSmarter?.paragraphs) && data.cleanerSmarter.paragraphs.length > 0)
        ? data.cleanerSmarter.paragraphs
        : defaultAboutPage.cleanerSmarter?.paragraphs,
      values: (Array.isArray(data.cleanerSmarter?.values) && data.cleanerSmarter.values.length > 0)
        ? data.cleanerSmarter.values
        : defaultAboutPage.cleanerSmarter?.values,
    };

    const technologyPurpose = {
      ...defaultAboutPage.technologyPurpose,
      ...(data.technologyPurpose || {}),
      imageUrl: data.technologyPurpose?.image || data.technologyPurpose?.imageUrl || defaultAboutPage.technologyPurpose?.imageUrl,
    };

    const cleanCompetitorNames = (text?: string): string => {
      if (!text) return '';
      return text.replace(/Restore\s*Datashred/gi, 'TechSteps');
    };

    const nationwideNetwork = {
      ...defaultAboutPage.nationwideNetwork,
      ...(data.nationwideNetwork || {}),
      description: cleanCompetitorNames(data.nationwideNetwork?.description || defaultAboutPage.nationwideNetwork?.description),
      imageUrl: data.nationwideNetwork?.image || data.nationwideNetwork?.imageUrl || defaultAboutPage.nationwideNetwork?.imageUrl,
    };

    const trustAndImpact = {
      ...defaultAboutPage.trustAndImpact,
      ...(data.trustAndImpact || {}),
      cards: (Array.isArray(data.trustAndImpact?.cards) && data.trustAndImpact.cards.length > 0)
        ? data.trustAndImpact.cards
        : defaultAboutPage.trustAndImpact?.cards,
    };

    const sustainabilityCommitment = {
      ...defaultAboutPage.sustainabilityCommitment,
      ...(data.sustainabilityCommitment || {}),
      description: cleanCompetitorNames(data.sustainabilityCommitment?.description || defaultAboutPage.sustainabilityCommitment?.description),
      imageUrl: data.sustainabilityCommitment?.image || data.sustainabilityCommitment?.imageUrl || defaultAboutPage.sustainabilityCommitment?.imageUrl,
      metrics: (Array.isArray(data.sustainabilityCommitment?.metrics) && data.sustainabilityCommitment.metrics.length > 0)
        ? data.sustainabilityCommitment.metrics
        : defaultAboutPage.sustainabilityCommitment?.metrics,
    };

    const journey = {
      ...defaultAboutPage.journey,
      ...(data.journey || {}),
      milestones: (Array.isArray(data.journey?.milestones) && data.journey.milestones.length > 0)
        ? data.journey.milestones
        : defaultAboutPage.journey?.milestones,
    };

    const cta = {
      ...defaultAboutPage.cta,
      ...(data.cta || {}),
      buttonText: data.cta?.buttonText || data.cta?.primaryButtonText || defaultAboutPage.cta?.buttonText,
      buttonLink: data.cta?.buttonLink || data.cta?.primaryButtonLink || defaultAboutPage.cta?.buttonLink,
    };

    return {
      ...defaultAboutPage,
      ...data,
      buildingHero,
      cleanerSmarter,
      technologyPurpose,
      nationwideNetwork,
      brighterFuture: nationwideNetwork,
      trustAndImpact,
      trustImpact: trustAndImpact,
      sustainabilityCommitment,
      peoplePlanetProgress: sustainabilityCommitment,
      journey,
      journeyMilestones: journey,
      cta,

      // Legacy field fallbacks for backwards compatibility
      hero: data.hero
        ? {
          ...data.hero,
          title: data.hero.headline
            ? (data.hero.headline.includes('.') ? data.hero.headline.split('.')[0] + '.' : data.hero.headline)
            : 'Managing What Matters.',
          highlightedTitle: data.hero.headline && data.hero.headline.includes('.')
            ? ' ' + data.hero.headline.split('.').slice(1).join('.').trim()
            : 'Protecting What Comes Next.',
        }
        : null,

      whoWeAre: data.whoWeAre
        ? {
          ...data.whoWeAre,
          title: data.whoWeAre.headline
            ? (data.whoWeAre.headline.includes('With') ? data.whoWeAre.headline.split('With')[0].trim() : data.whoWeAre.headline)
            : 'Technology',
          highlightedTitle: data.whoWeAre.headline && data.whoWeAre.headline.includes('With')
            ? ' With ' + data.whoWeAre.headline.split('With').slice(1).join('With').trim()
            : ' With Purpose',
        }
        : null,

      approach: data.approach
        ? {
          ...data.approach,
          title: data.approach.headline,
        }
        : null,

      statistics: Array.isArray(data.statistics)
        ? data.statistics.map((stat: any) => ({
          value: stat.number,
          suffix: stat.suffix,
          label: stat.label,
        }))
        : [],

      whatWeDo: data.whatWeDo
        ? {
          ...data.whatWeDo,
          items: Array.isArray(data.whatWeDo.items)
            ? data.whatWeDo.items.map((item: any) => ({
              ...item,
              link: item.buttonLink,
            }))
            : [],
        }
        : null,

      capabilities: data.capabilities
        ? {
          ...data.capabilities,
          items: data.capabilities.items || [],
        }
        : null,
    };
  } catch (error) {
    console.error('Failed to fetch About Page from Sanity:', error);
    return defaultAboutPage || {};
  }
}

export async function getLeadershipPage(): Promise<LeadershipPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "leadershipPage" && (_id == "leadershipPage" || !(_id in path("drafts.**")))] | order((_id == "leadershipPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            highlightedTitle,
            subtitle,
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },
          intro{
            label,
            title,
            highlightedTitle,
            paragraphs
          },
          team{
            label,
            title,
            highlightedTitle,
            subtitle,
            members[]{
              role,
              name,
              bio,
              background,
              linkedin,
              imageUrl,
              "image": image.asset->url,
              imageAlt
            }
          },
          principles{
            eyebrow,
            title,
            highlightedTitle,
            description,
            items[]{
              number,
              title,
              description
            }
          },
          action{
            eyebrow,
            title,
            highlightedTitle,
            badgeNumber,
            badgeText,
            imageUrl,
            "image": image.asset->url,
            imageAlt,
            paragraphs,
            linkText,
            linkUrl
          },
          commitment{
            label,
            title,
            highlightedTitle,
            description,
            cards[]{
              number,
              icon,
              title,
              description,
              isFeatured
            }
          },
          cta{
            title,
            description,
            primaryText,
            primaryHref,
            secondaryText,
            secondaryHref
          }
        }
      `);

      if (data) {
        return {
          ...defaultLeadershipPageData,
          ...data,
          hero: {
            ...defaultLeadershipPageData.hero,
            ...(data.hero || {}),
            imageUrl: data.hero?.image || data.hero?.imageUrl || defaultLeadershipPageData.hero?.imageUrl,
          },
          intro: {
            ...defaultLeadershipPageData.intro,
            ...(data.intro || {}),
            paragraphs: (Array.isArray(data.intro?.paragraphs) && data.intro.paragraphs.length > 0)
              ? data.intro.paragraphs
              : defaultLeadershipPageData.intro?.paragraphs,
          },
          team: {
            ...defaultLeadershipPageData.team,
            ...(data.team || {}),
            members: (Array.isArray(data.team?.members) && data.team.members.length > 0)
              ? data.team.members.map((m: any, idx: number) => ({
                ...defaultLeadershipPageData.team?.members?.[idx],
                ...m,
                imageUrl: m.image || m.imageUrl || defaultLeadershipPageData.team?.members?.[idx]?.imageUrl,
              }))
              : defaultLeadershipPageData.team?.members,
          },
          principles: {
            ...defaultLeadershipPageData.principles,
            ...(data.principles || {}),
            items: (Array.isArray(data.principles?.items) && data.principles.items.length > 0)
              ? data.principles.items
              : defaultLeadershipPageData.principles?.items,
          },
          action: {
            ...defaultLeadershipPageData.action,
            ...(data.action || {}),
            imageUrl: data.action?.image || data.action?.imageUrl || defaultLeadershipPageData.action?.imageUrl,
            paragraphs: (Array.isArray(data.action?.paragraphs) && data.action.paragraphs.length > 0)
              ? data.action.paragraphs
              : defaultLeadershipPageData.action?.paragraphs,
          },
          commitment: {
            ...defaultLeadershipPageData.commitment,
            ...(data.commitment || {}),
            cards: (Array.isArray(data.commitment?.cards) && data.commitment.cards.length > 0)
              ? data.commitment.cards
              : defaultLeadershipPageData.commitment?.cards,
          },
          cta: {
            ...defaultLeadershipPageData.cta,
            ...(data.cta || {}),
          },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Leadership Page from Sanity:', err);
    }
  }
  return defaultLeadershipPageData;
}

export async function getGlobalPresencePage(): Promise<GlobalPresencePageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "globalPresencePage" && (_id == "globalPresencePage" || !(_id in path("drafts.**")))] | order((_id == "globalPresencePage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            highlightedTitle,
            subtitle,
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },
          intro{
            label,
            title,
            highlightedTitle,
            paragraphs
          },
          regions{
            eyebrow,
            title,
            highlightedTitle,
            subtitle,
            locations[]{
              name,
              type,
              location,
              description,
              coverage,
              features
            }
          },
          capabilities{
            label,
            title,
            highlightedTitle,
            description,
            items[]{
              number,
              title,
              description,
              badge,
              linkUrl
            }
          },
          standards{
            label,
            title,
            highlightedTitle,
            description,
            items[]{
              code,
              name,
              description
            }
          },
          cta{
            title,
            description,
            primaryText,
            primaryHref,
            secondaryText,
            secondaryHref
          }
        }
      `);

      if (data) {
        return {
          ...defaultGlobalPresencePageData,
          ...data,
          hero: {
            ...defaultGlobalPresencePageData.hero,
            ...(data.hero || {}),
            imageUrl: data.hero?.image || data.hero?.imageUrl || defaultGlobalPresencePageData.hero?.imageUrl,
          },
          intro: {
            ...defaultGlobalPresencePageData.intro,
            ...(data.intro || {}),
            paragraphs: (Array.isArray(data.intro?.paragraphs) && data.intro.paragraphs.length > 0)
              ? data.intro.paragraphs
              : defaultGlobalPresencePageData.intro?.paragraphs,
          },
          regions: {
            ...defaultGlobalPresencePageData.regions,
            ...(data.regions || {}),
            locations: (Array.isArray(data.regions?.locations) && data.regions.locations.length > 0)
              ? data.regions.locations
              : defaultGlobalPresencePageData.regions?.locations,
          },
          capabilities: {
            ...defaultGlobalPresencePageData.capabilities,
            ...(data.capabilities || {}),
            items: (Array.isArray(data.capabilities?.items) && data.capabilities.items.length > 0)
              ? data.capabilities.items
              : defaultGlobalPresencePageData.capabilities?.items,
          },
          standards: {
            ...defaultGlobalPresencePageData.standards,
            ...(data.standards || {}),
            items: (Array.isArray(data.standards?.items) && data.standards.items.length > 0)
              ? data.standards.items
              : defaultGlobalPresencePageData.standards?.items,
          },
          cta: {
            ...defaultGlobalPresencePageData.cta,
            ...(data.cta || {}),
          },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Global Presence Page from Sanity:', err);
    }
  }
  return defaultGlobalPresencePageData;
}

export async function getPeopleCulturePage(): Promise<PeopleCulturePageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "peopleCulturePage" && (_id == "peopleCulturePage" || !(_id in path("drafts.**")))] | order((_id == "peopleCulturePage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            highlightedTitle,
            subtitle,
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },
          people{
            label,
            title,
            highlightedTitle,
            paragraphs,
            stats[]{
              number,
              label,
              subtext
            },
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },
          culture{
            label,
            title,
            highlightedTitle,
            subtitle,
            pillars[]{
              number,
              title,
              description,
              icon
            }
          },
          howWeWork{
            label,
            title,
            highlightedTitle,
            description,
            steps[]{
              stepNumber,
              title,
              description,
              badge
            }
          },
          learningDevelopment{
            label,
            title,
            highlightedTitle,
            description,
            items[]{
              title,
              description,
              badge
            }
          },
          peoplePlanetProgress{
            label,
            title,
            highlightedTitle,
            paragraphs,
            metrics[]{
              number,
              label
            },
            imageUrl,
            "image": image.asset->url,
            imageAlt
          },
          cta{
            title,
            description,
            primaryText,
            primaryHref,
            secondaryText,
            secondaryHref
          }
        }
      `);

      if (data) {
        return {
          ...defaultPeopleCulturePageData,
          ...data,
          hero: {
            ...defaultPeopleCulturePageData.hero,
            ...(data.hero || {}),
            imageUrl: data.hero?.image || data.hero?.imageUrl || defaultPeopleCulturePageData.hero?.imageUrl,
          },
          people: {
            ...defaultPeopleCulturePageData.people,
            ...(data.people || {}),
            imageUrl: data.people?.image || data.people?.imageUrl || defaultPeopleCulturePageData.people?.imageUrl,
            paragraphs: (Array.isArray(data.people?.paragraphs) && data.people.paragraphs.length > 0)
              ? data.people.paragraphs
              : defaultPeopleCulturePageData.people?.paragraphs,
            stats: (Array.isArray(data.people?.stats) && data.people.stats.length > 0)
              ? data.people.stats
              : defaultPeopleCulturePageData.people?.stats,
          },
          culture: {
            ...defaultPeopleCulturePageData.culture,
            ...(data.culture || {}),
            pillars: (Array.isArray(data.culture?.pillars) && data.culture.pillars.length > 0)
              ? data.culture.pillars
              : defaultPeopleCulturePageData.culture?.pillars,
          },
          howWeWork: {
            ...defaultPeopleCulturePageData.howWeWork,
            ...(data.howWeWork || {}),
            steps: (Array.isArray(data.howWeWork?.steps) && data.howWeWork.steps.length > 0)
              ? data.howWeWork.steps
              : defaultPeopleCulturePageData.howWeWork?.steps,
          },
          learningDevelopment: {
            ...defaultPeopleCulturePageData.learningDevelopment,
            ...(data.learningDevelopment || {}),
            items: (Array.isArray(data.learningDevelopment?.items) && data.learningDevelopment.items.length > 0)
              ? data.learningDevelopment.items
              : defaultPeopleCulturePageData.learningDevelopment?.items,
          },
          peoplePlanetProgress: {
            ...defaultPeopleCulturePageData.peoplePlanetProgress,
            ...(data.peoplePlanetProgress || {}),
            imageUrl: data.peoplePlanetProgress?.image || data.peoplePlanetProgress?.imageUrl || defaultPeopleCulturePageData.peoplePlanetProgress?.imageUrl,
            paragraphs: (Array.isArray(data.peoplePlanetProgress?.paragraphs) && data.peoplePlanetProgress.paragraphs.length > 0)
              ? data.peoplePlanetProgress.paragraphs
              : defaultPeopleCulturePageData.peoplePlanetProgress?.paragraphs,
            metrics: (Array.isArray(data.peoplePlanetProgress?.metrics) && data.peoplePlanetProgress.metrics.length > 0)
              ? data.peoplePlanetProgress.metrics
              : defaultPeopleCulturePageData.peoplePlanetProgress?.metrics,
          },
          cta: {
            ...defaultPeopleCulturePageData.cta,
            ...(data.cta || {}),
          },
        };
      }
    } catch (err) {
      console.error('Failed to fetch People & Culture Page from Sanity:', err);
    }
  }
  return defaultPeopleCulturePageData;
}

export async function getFaqPage(): Promise<FaqPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "faqPage" && (_id == "faqPage" || !(_id in path("drafts.**")))] | order((_id == "faqPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          categories[]{
            id,
            name,
            icon
          },
          items[]{
            id,
            category,
            question,
            answer
          },
          contactCard{
            heading,
            description,
            buttonText,
            buttonLink
          }
        }
      `);
      if (data) {
        return {
          ...defaultFaqPage,
          ...data,
          hero: { ...defaultFaqPage.hero, ...data.hero },
          categories: (Array.isArray(data.categories) && data.categories.length > 0) ? data.categories : defaultFaqPage.categories,
          items: (Array.isArray(data.items) && data.items.length > 0) ? data.items : defaultFaqPage.items,
          contactCard: { ...defaultFaqPage.contactCard, ...data.contactCard },
        };
      }
    } catch (err) {
      console.error('Failed to fetch FAQ page from Sanity:', err);
    }
  }
  return defaultFaqPage;
}

export async function getSustainabilityPage(): Promise<SustainabilityPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "sustainabilityPage" && (_id == "sustainabilityPage" || !(_id in path("drafts.**")))] | order((_id == "sustainabilityPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/services/remarketing.jpg"),
            buttonText,
            buttonLink,
            secondaryButtonText,
            secondaryButtonLink,
            "imageUrl": coalesce(imageUrl, "/images/sustainability/Sustainability hero.webp")
          },
          metrics[]{
            number,
            suffix,
            label,
            note
          },
          approach{
            eyebrow,
            heading,
            description,
            "image": coalesce(image.asset->url, "/images/sustainability/sustainability-approach.jpg?v=2"),
            steps[]{
              step,
              title,
              badge,
              desc
            }
          },
          lifecycleSection{
            eyebrow,
            heading,
            description
          },
          prioritisingLongevity{
            eyebrow,
            heading,
            description,
            imageUrl,
            imageAlt,
            steps[]{
              step,
              title,
              desc
            }
          },
          esgPillars[]{
            title,
            badge,
            items[]{
              title,
              desc
            }
          },
          bottomCta{
            heading,
            description,
            primaryButtonText,
            primaryButtonLink,
            secondaryButtonText,
            secondaryButtonLink
          }
        }
      `);
      if (data) {
        return {
          ...defaultSustainabilityPage,
          ...data,
          hero: { ...defaultSustainabilityPage.hero, ...data.hero },
          metrics: (Array.isArray(data.metrics) && data.metrics.length > 0) ? data.metrics : defaultSustainabilityPage.metrics,
          approach: {
            ...defaultSustainabilityPage.approach,
            ...data.approach,
            steps: (data.approach?.steps && data.approach.steps.length > 0) ? data.approach.steps : defaultSustainabilityPage.approach?.steps,
          },
          lifecycleSection: { ...defaultSustainabilityPage.lifecycleSection, ...data.lifecycleSection },
          prioritisingLongevity: { ...defaultSustainabilityPage.prioritisingLongevity, ...data.prioritisingLongevity },
          esgPillars: (Array.isArray(data.esgPillars) && data.esgPillars.length > 0) ? data.esgPillars : defaultSustainabilityPage.esgPillars,
          bottomCta: { ...defaultSustainabilityPage.bottomCta, ...data.bottomCta },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Sustainability page from Sanity:', err);
    }
  }
  return defaultSustainabilityPage;
}

export async function getInvestorsPage(): Promise<InvestorsPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "investorsPage" && (_id == "investorsPage" || !(_id in path("drafts.**")))] | order((_id == "investorsPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/brand/about-hero-bg.jpg")
          },
          stats[]{
            prefix,
            value,
            suffix,
            title,
            desc
          },
          strategicPillars[]{
            number,
            title,
            headline,
            desc,
            detail,
            iconSvg
          },
          investmentCase{
            eyebrow,
            heading,
            description,
            bulletPoints
          },
          irContact{
            heading,
            description,
            name,
            role,
            email,
            phone
          },
          businesses[]{
            division,
            name,
            tagline,
            description,
            link,
            image,
            accreditations
          },
          esgPillars[]{
            title,
            badge,
            desc
          }
        }
      `);
      if (data) {
        return {
          ...defaultInvestorsPage,
          ...data,
          hero: { ...defaultInvestorsPage.hero, ...data.hero },
          stats: (Array.isArray(data.stats) && data.stats.length > 0) ? data.stats : defaultInvestorsPage.stats,
          strategicPillars: (Array.isArray(data.strategicPillars) && data.strategicPillars.length > 0) ? data.strategicPillars : defaultInvestorsPage.strategicPillars,
          businesses: Array.isArray(data.businesses) && data.businesses.length > 0 ? data.businesses : defaultInvestorsPage.businesses,
          esgPillars: Array.isArray(data.esgPillars) && data.esgPillars.length > 0 ? data.esgPillars : defaultInvestorsPage.esgPillars,
          investmentCase: { ...defaultInvestorsPage.investmentCase, ...data.investmentCase },
          irContact: { ...defaultInvestorsPage.irContact, ...data.irContact },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Investors page from Sanity:', err);
    }
  }
  return defaultInvestorsPage;
}

export async function getContactPage(): Promise<ContactPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "contactPage" && (_id == "contactPage" || !(_id in path("drafts.**")))] | order((_id == "contactPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/brand/contact-hero-bg.jpg"),
            "heroImage": coalesce(heroImage, "/images/contact/Contact hero.webp")
          },
          contactInfo{
            address1{ title, address },
            address2{ title, address },
            email,
            phone,
            freephone,
            socialHeading
          },
          formSection{
            heading,
            "image": coalesce(image.asset->url, "/images/contact/contact-consultation.jpg")
          }
        }
      `);
      if (data) {
        return {
          ...defaultContactPage,
          ...data,
          hero: { ...defaultContactPage.hero, ...data.hero },
          contactInfo: { ...defaultContactPage.contactInfo, ...(data.contactInfo || {}) },
          formSection: { ...defaultContactPage.formSection, ...data.formSection },
          directLines: (Array.isArray(data.directLines) && data.directLines.length > 0) ? data.directLines : defaultContactPage.directLines,
        };
      }
    } catch (err) {
      console.error('Failed to fetch Contact page from Sanity:', err);
    }
  }
  return defaultContactPage;
}

export async function getRequestCollectionPage(): Promise<RequestCollectionPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "requestCollectionPage" && (_id == "requestCollectionPage" || !(_id in path("drafts.**")))] | order((_id == "requestCollectionPage") desc, _updatedAt desc)[0]{
          metaTitle,
          metaDescription,
          hero{
            title,
            description,
            topHeading,
            topDescription,
            topButtonText,
            topButtonLink,
            topSecondaryButtonText,
            topSecondaryButtonLink,
            topImageUrl,
            topMobileImageUrl,
            topImageAlt
          }
        }
      `);
      if (data) {
        return {
          ...defaultRequestCollectionPage,
          ...data,
          hero: { ...defaultRequestCollectionPage.hero, ...(data.hero || {}) },
          slaGuarantees: (Array.isArray(data.slaGuarantees) && data.slaGuarantees.length > 0) ? data.slaGuarantees : defaultRequestCollectionPage.slaGuarantees,
        };
      }
    } catch (err) {
      console.error('Failed to fetch Request Collection page from Sanity:', err);
    }
  }
  return defaultRequestCollectionPage;
}

const DEFAULT_TESTIMONIAL_AVATARS: Record<string, string> = {
  'David Miller': '/images/testimonials/avatar-1.jpg',
  'Sarah Jenkins': '/images/testimonials/avatar-2.jpg',
  'James Roberts': '/images/testimonials/avatar-3.jpg',
  'Eleanor Vance': '/images/testimonials/avatar-4.jpg',
  'Prof. Marcus Thorne': '/images/testimonials/avatar-5.jpg',
  'Rachel Adams': '/images/testimonials/avatar-6.jpg',
};

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "testimonial" && !(_id in path("drafts.**"))] | order(order asc){
          "id": coalesce(_id, id),
          quote,
          author,
          role,
          company,
          industry,
          rating,
          "avatar": coalesce(avatar.asset->url, avatar),
          order
        }
      `);
      if (data && data.length > 0) {
        const seenAvatars = new Set<string>();
        return data.map((item: any, index: number) => {
          const fallback = DEFAULT_TESTIMONIAL_AVATARS[item.author] || `/images/testimonials/avatar-${(index % 6) + 1}.jpg`;
          let avatar = item.avatar || fallback;
          // Guard against duplicated avatar values so all 6 testimonials have distinct images
          if (seenAvatars.has(avatar)) {
            avatar = fallback;
          }
          seenAvatars.add(avatar);
          return {
            ...item,
            avatar,
          };
        });
      }
    } catch (err) {
      console.error('Failed to fetch Testimonials from Sanity:', err);
    }
  }
  return testimonials;
}

export async function getServicesPage(): Promise<ServicesPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "servicesPage" && (_id == "servicesPage" || !(_id in path("drafts.**")))] | order((_id == "servicesPage") desc, _updatedAt desc)[0]{
          "metaTitle": coalesce(seo.metaTitle, metaTitle),
          "metaDescription": coalesce(seo.metaDescription, metaDescription),
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/services/data-centre-hardware.jpg")
          },
          divisionsShowcase{
            eyebrow,
            heading
          },
          lifecycle{
            eyebrow,
            heading,
            description,
            steps[]{
              step,
              number,
              desc,
              "image": coalesce(image.asset->url, "/images/services/process-step-1-collect.jpg")
            }
          },
          pillars{
            eyebrow,
            heading,
            items[]{
              title,
              desc,
              icon
            }
          },
          bottomCta{
            eyebrow,
            heading,
            description,
            primaryButtonText,
            primaryButtonLink,
            secondaryButtonText,
            secondaryButtonLink
          }
        }
      `);
      if (data) {
        return {
          ...defaultServicesPageData,
          ...data,
          hero: { ...defaultServicesPageData.hero, ...data.hero },
          divisionsShowcase: { ...defaultServicesPageData.divisionsShowcase, ...data.divisionsShowcase },
          lifecycle: {
            ...defaultServicesPageData.lifecycle,
            ...data.lifecycle,
            steps: (Array.isArray(data.lifecycle?.steps) && data.lifecycle.steps.length > 0)
              ? data.lifecycle.steps
              : defaultServicesPageData.lifecycle?.steps,
          },
          pillars: {
            ...defaultServicesPageData.pillars,
            ...data.pillars,
            items: (Array.isArray(data.pillars?.items) && data.pillars.items.length > 0)
              ? data.pillars.items
              : defaultServicesPageData.pillars?.items,
          },
          bottomCta: { ...defaultServicesPageData.bottomCta, ...data.bottomCta },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Services Page from Sanity:', err);
    }
  }
  return defaultServicesPageData;
}

export async function getSectorsPage(): Promise<SectorsPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "sectorsPage" && (_id == "sectorsPage" || !(_id in path("drafts.**")))] | order((_id == "sectorsPage") desc, _updatedAt desc)[0]{
          "metaTitle": coalesce(seo.metaTitle, metaTitle),
          "metaDescription": coalesce(seo.metaDescription, metaDescription),
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/brand/sectors-hero-bg.jpg"),
            primaryButtonText,
            primaryButtonLink,
            secondaryButtonText,
            secondaryButtonLink
          },
          intro{
            badge,
            heading,
            description,
            buttonText,
            buttonLink
          },
          sectorsSection{
            eyebrow,
            heading,
            description
          },
          philosophy{
            eyebrow,
            heading,
            description,
            principles[]{
              label,
              number,
              desc
            }
          },
          bottomCta{
            eyebrow,
            heading,
            description,
            primaryButtonText,
            primaryButtonLink,
            secondaryButtonText,
            secondaryButtonLink
          }
        }
      `);
      if (data) {
        return {
          ...defaultSectorsPageData,
          ...data,
          hero: { ...defaultSectorsPageData.hero, ...data.hero },
          intro: { ...defaultSectorsPageData.intro, ...data.intro },
          sectorsSection: { ...defaultSectorsPageData.sectorsSection, ...data.sectorsSection },
          philosophy: {
            ...defaultSectorsPageData.philosophy,
            ...data.philosophy,
            principles: (Array.isArray(data.philosophy?.principles) && data.philosophy.principles.length > 0)
              ? data.philosophy.principles
              : defaultSectorsPageData.philosophy?.principles,
          },
          bottomCta: { ...defaultSectorsPageData.bottomCta, ...data.bottomCta },
        };
      }
    } catch (err) {
      console.error('Failed to fetch Sectors Page from Sanity:', err);
    }
  }
  return defaultSectorsPageData;
}

export async function getLegalPages(): Promise<LegalPageData[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "legalPage" && !(_id in path("drafts.**"))]{
        title,
        "slug": slug.current,
        eyebrow,
        subheading,
        metaTitle,
        metaDescription,
        complianceBadge,
        lastUpdated,
        sections[]{
          heading,
          body,
          callout{
            title,
            items[]{ label, value }
          },
          cards[]{ title, description },
          listItems[]{ label, text }
        }
      }`);
      if (data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.error('Failed to fetch Legal pages from Sanity:', err);
    }
  }
  return [];
}

export async function getLegalPage(slug: string): Promise<LegalPageData | null> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(
        `*[_type == "legalPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
          title,
          "slug": slug.current,
          eyebrow,
          subheading,
          metaTitle,
          metaDescription,
          complianceBadge,
          lastUpdated,
          sections[]{
            heading,
            body,
            callout{
              title,
              items[]{ label, value }
            },
            cards[]{ title, description },
            listItems[]{ label, text }
          }
        }`,
        { slug }
      );
      if (data) return data;
    } catch (err) {
      console.error(`Failed to fetch Legal page for slug ${slug}:`, err);
    }
  }
  return null;
}
