import type { Service, Sector, Article, SiteSettings } from '../sanity/types';

export function generateOrganizationSchema(
  settings: SiteSettings,
  origin: string = 'https://techsteps.co.uk'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: settings.companyName,
    legalName: settings.legalName,
    url: `${origin}/`,
    logo: `${origin}/images/brand/logo.png`,
    description:
      'Techsteps provides secure IT asset disposal, IT asset disposition, recycling, data destruction and information management services for businesses across the UK.',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      addressLocality: settings.address.city,
      addressRegion: settings.address.county,
      postalCode: settings.address.postcode,
      addressCountry: 'GB',
    },
    sameAs: [
      settings.socialLinks.linkedin,
      settings.socialLinks.instagram,
      settings.socialLinks.twitter,
    ].filter(Boolean),
  };
}

export function generateWebSiteSchema(origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: 'Techsteps',
    url: `${origin}/`,
    publisher: {
      '@id': `${origin}/#organization`,
    },
  };
}

export function generateWebPageSchema(
  origin: string = 'https://techsteps.co.uk'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${origin}/#webpage`,
    url: `${origin}/`,
    name: 'Techsteps | IT Asset Recycling & Information Management',
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    about: {
      '@id': `${origin}/#organization`,
    },
  };
}

export function generateServiceSchema(
  service: Service,
  settings: SiteSettings,
  origin: string = 'https://techsteps.co.uk'
) {
  const serviceUrl = `${origin}/services/${service.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.title,
    description: service.summary,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: settings.companyName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    serviceType: service.divisionTitle,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[], origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`,
    })),
  };
}

export function generateSectorSchema(
  sector: Sector,
  settings: SiteSettings,
  origin: string = 'https://techsteps.co.uk'
) {
  const sectorUrl = `${origin}/sectors/${sector.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${sectorUrl}#webpage`,
    name: sector.title,
    description: sector.summary,
    url: sectorUrl,
    publisher: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: settings.companyName,
    },
    about: {
      '@type': 'Thing',
      name: sector.title,
      description: sector.summary,
    },
    isPartOf: {
      '@id': `${origin}/#website`,
    },
  };
}

export function generateCaseStudySchema(
  caseStudy: { title: string; slug: string; challenge?: string; solution?: string; clientIndustry?: string },
  settings: SiteSettings,
  origin: string = 'https://techsteps.co.uk'
) {
  const caseStudyUrl = `${origin}/case-studies/${caseStudy.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${caseStudyUrl}#casestudy`,
    name: caseStudy.title,
    description: caseStudy.challenge || caseStudy.title,
    url: caseStudyUrl,
    headline: caseStudy.title,
    publisher: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: settings.companyName,
    },
    about: caseStudy.clientIndustry ? {
      '@type': 'Industry',
      name: caseStudy.clientIndustry,
    } : undefined,
  };
}

export function generatePostSchema(
  post: { title: string; seoSlug?: string; id?: string; excerpt?: string; subtitle?: string; author?: string; date?: string; image?: string | null; category?: { name?: string; slug?: string } },
  settings: SiteSettings,
  origin: string = 'https://techsteps.co.uk'
) {
  const categorySlug = post.category?.slug || 'blogs';
  const postSlug = post.seoSlug || post.id || '';
  const postUrl = `${origin}/insights/${categorySlug}/${postSlug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt || post.subtitle || post.title,
    author: {
      '@type': 'Person',
      name: post.author || 'Techsteps Expert Team',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: settings.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/images/brand/logo.png`,
      },
    },
    datePublished: post.date,
    image: post.image ? (post.image.startsWith('http') ? post.image : `${origin}${post.image}`) : `${origin}/images/brand/og-image.jpg`,
    url: postUrl,
    mainEntityOfPage: postUrl,
  };
}

export function generateArticleSchema(article: Article, settings: SiteSettings, origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${origin}/insights/${article.slug}#article`,
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: settings.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/images/brand/logo.png`,
      },
    },
    datePublished: article.publishedDate,
    url: `${origin}/insights/${article.slug}`,
    mainEntityOfPage: `${origin}/insights/${article.slug}`,
  };
}
