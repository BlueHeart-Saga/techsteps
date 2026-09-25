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
  defaultFaqPage,
  defaultSustainabilityPage,
  defaultInvestorsPage,
  defaultContactPage,
  defaultRequestCollectionPage,
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
  HomePageData,
  FaqPageData,
  SustainabilityPageData,
  InvestorsPageData,
  ContactPageData,
  RequestCollectionPageData,
  TestimonialItem,
  LegalPageData,
} from './types';

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  import.meta.env.SANITY_PROJECT_ID ||
  'zjv69ibt';
const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ||
  import.meta.env.SANITY_DATASET ||
  'techsteps';
const apiVersion =
  import.meta.env.PUBLIC_SANITY_API_VERSION ||
  import.meta.env.SANITY_API_VERSION ||
  '2026-03-01';
// In static Astro generation, useCdn: false ensures the current published content is fetched
const useCdn = false;

// Ensure IPv4 first on Node environments to prevent dual-stack DNS lag
if (typeof process !== 'undefined' && typeof process.versions?.node !== 'undefined') {
  try {
    const dns = await import('node:dns');
    dns.setDefaultResultOrder?.('ipv4first');
  } catch {
    // browser or edge environment
  }
}

const token =
  import.meta.env.SANITY_API_TOKEN ||
  import.meta.env.SANITY_TOKEN ||
  (typeof process !== 'undefined' ? (process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN) : undefined);

export const sanityClient = projectId
  ? createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: token || undefined,
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
        *[_type == "homePage" && !(_id in path("drafts.**"))][0]{
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
            buttonLink
          },

          intro{
            heading,
            description,
            highlightOne,
            highlightTwo,
            highlightThree
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
              title,
              description,
              badge
            }
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

      return data || null;
    } catch (error) {
      console.error('Failed to fetch Home Page from Sanity:', error);
    }
  }

  return null;
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
        *[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
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
      const data = await sanityClient.fetch(`*[_type == "division" && !(_id in path("drafts.**"))] | order(order asc)`);
      if (data && data.length > 0) {
        return data.map((d: any) => ({
          ...d,
          slug: normalizeSlug(d.slug),
        }));
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
        return data.map((s: any) => ({
          ...s,
          slug: normalizeSlug(s.slug),
        }));
      }
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
  let sanitySectors: Sector[] = [];
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`*[_type == "sector" && !(_id in path("drafts.**"))]`);
      if (data && data.length > 0) {
        sanitySectors = data.map((sec: any) => ({
          ...sec,
          slug: normalizeSlug(sec.slug),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const knownSlugs = new Set(sanitySectors.map((s) => s.slug));
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

export async function getAboutPage(): Promise<any> {
  if (!sanityClient) {
    return defaultAboutPage || {};
  }

  try {
    const data = await sanityClient.fetch(`
      *[_type == "aboutPage" && !(_id in path("drafts.**"))][0]{
        metaTitle,
        metaDescription,

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
        },

        cta{
          eyebrow,
          headline,
          description,
          "image": image.asset->url,
          imageAlt,

          primaryButtonText,
          primaryButtonLink,

          secondaryButtonText,
          secondaryButtonLink,

          phone,
          email,
          hours
        }
      }
    `);

    if (!data) {
      return defaultAboutPage || {};
    }

    /*
     * Map Sanity field names to the names used
     * by the About Us Astro page.
     */
    return {
      ...data,

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

      cta: data.cta
        ? {
          ...data.cta,
          title: "Let's Talk About",
          highlightedTitle: 'What Comes Next.',
          buttonText: data.cta.primaryButtonText,
          buttonLink: data.cta.primaryButtonLink,
          secondaryButtonText: data.cta.secondaryButtonText,
          secondaryButtonLink: data.cta.secondaryButtonLink,
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

export async function getFaqPage(): Promise<FaqPageData> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "faqPage" && !(_id in path("drafts.**"))][0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/brand/about-hero-bg.jpg")
          },
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
        *[_type == "sustainabilityPage" && !(_id in path("drafts.**"))][0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/services/remarketing.jpg"),
            buttonText,
            buttonLink
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
        *[_type == "investorsPage" && !(_id in path("drafts.**"))][0]{
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
        *[_type == "contactPage" && !(_id in path("drafts.**"))][0]{
          metaTitle,
          metaDescription,
          hero{
            eyebrow,
            title,
            subheading,
            "bgImage": coalesce(bgImage.asset->url, "/images/brand/contact-hero-bg.jpg")
          },
          formSection{
            heading,
            "image": coalesce(image.asset->url, "/images/contact/contact-consultation.jpg")
          },
          directLines[]{
            title,
            description,
            phone,
            email
          }
        }
      `);
      if (data) {
        return {
          ...defaultContactPage,
          ...data,
          hero: { ...defaultContactPage.hero, ...data.hero },
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
        *[_type == "requestCollectionPage" && !(_id in path("drafts.**"))][0]{
          metaTitle,
          metaDescription,
          hero{
            title,
            description
          },
          slaGuarantees[]{
            title,
            description,
            icon
          }
        }
      `);
      if (data) {
        return {
          ...defaultRequestCollectionPage,
          ...data,
          hero: { ...defaultRequestCollectionPage.hero, ...data.hero },
          slaGuarantees: (Array.isArray(data.slaGuarantees) && data.slaGuarantees.length > 0) ? data.slaGuarantees : defaultRequestCollectionPage.slaGuarantees,
        };
      }
    } catch (err) {
      console.error('Failed to fetch Request Collection page from Sanity:', err);
    }
  }
  return defaultRequestCollectionPage;
}

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
          "avatar": coalesce(avatar.asset->url, avatar, "/images/testimonials/avatar-1.jpg"),
          order
        }
      `);
      if (data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.error('Failed to fetch Testimonials from Sanity:', err);
    }
  }
  return testimonials;
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