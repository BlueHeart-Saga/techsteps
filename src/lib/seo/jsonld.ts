import type { Service, Sector, Article, SiteSettings } from '../sanity/types';

export function generateOrganizationSchema(settings: SiteSettings, origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: settings.companyName,
    legalName: settings.legalName,
    url: origin,
    logo: `${origin}/images/brand/logo.png`,
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
      settings.socialLinks.twitter,
    ].filter(Boolean),
  };
}

export function generateServiceSchema(service: Service, settings: SiteSettings, origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.divisionTitle,
    description: service.summary,
    provider: {
      '@type': 'Corporation',
      name: settings.companyName,
      url: origin,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    url: `${origin}/services/${service.slug}`,
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

export function generateArticleSchema(article: Article, settings: SiteSettings, origin: string = 'https://techsteps.co.uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/images/brand/logo.png`,
      },
    },
    datePublished: article.publishedDate,
    url: `${origin}/insights/${article.slug}`,
  };
}
