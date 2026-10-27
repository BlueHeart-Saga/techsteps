import type { Sector, Service } from './sanity/types';
import { services as fallbackServices } from './sanity/data';

export function isValidSector(value: unknown): value is Sector {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.slug === 'string' &&
    record.slug.trim().length > 0 &&
    typeof record.title === 'string' &&
    record.title.trim().length > 0 &&
    typeof record.summary === 'string' &&
    record.summary.trim().length > 0
  );
}

export function normalizeRouteSlug(slug: unknown): string {
  return typeof slug === 'string' ? slug.trim().toLowerCase() : '';
}

export function buildSectorPaths(records: unknown) {
  const sectors = Array.isArray(records) ? records.filter(isValidSector) : [];
  const seenSlugs = new Set<string>();

  return sectors.flatMap((sector) => {
    const slug = normalizeRouteSlug(sector.slug);
    if (!slug || seenSlugs.has(slug)) return [];
    seenSlugs.add(slug);
    return [{ params: { slug }, props: { sector } }];
  });
}

export function isValidService(value: unknown): value is Service {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.slug === 'string' &&
    record.slug.trim().length > 0 &&
    typeof record.title === 'string' &&
    record.title.trim().length > 0 &&
    typeof record.divisionSlug === 'string' &&
    record.divisionSlug.trim().length > 0 &&
    typeof record.divisionTitle === 'string' &&
    record.divisionTitle.trim().length > 0
  );
}

/**
 * Canonical service slug mapping.
 * Every sub-service canonical URL ends with -services.
 * Prevents duplicate suffixes such as services-services.
 */
export const CANONICAL_SERVICE_SLUGS: Record<string, string> = {
  // 1. Information Management
  'digital-mailroom': 'digital-mailroom-services',
  'digital-mailroom-services': 'digital-mailroom-services',
  'digital-mailroom-services-uk': 'digital-mailroom-services',
  'digital-mailroom-uk': 'digital-mailroom-services',

  'document-management': 'document-management-services',
  'document-management-services': 'document-management-services',
  'document-management-services-uk': 'document-management-services',
  'document-management-uk': 'document-management-services',

  'document-scanning': 'document-scanning-services',
  'document-scanning-services': 'document-scanning-services',
  'document-scanning-services-uk': 'document-scanning-services',
  'document-scanning-uk': 'document-scanning-services',

  'document-storage': 'document-storage-services',
  'document-storage-services': 'document-storage-services',
  'document-storage-services-uk': 'document-storage-services',
  'document-storage-uk': 'document-storage-services',

  'heritage-storage': 'heritage-storage-services',
  'heritage-storage-services': 'heritage-storage-services',
  'heritage-storage-services-uk': 'heritage-storage-services',
  'heritage-storage-uk': 'heritage-storage-services',

  'tape-media-storage': 'tape-media-storage-services',
  'tape-storage': 'tape-media-storage-services',
  'tape-media-storage-services': 'tape-media-storage-services',
  'tape-media-storage-services-uk': 'tape-media-storage-services',
  'tape-media-storage-uk': 'tape-media-storage-services',

  'vault-storage': 'vault-storage-services',
  'vault-storage-services': 'vault-storage-services',
  'vault-storage-services-uk': 'vault-storage-services',
  'vault-storage-uk': 'vault-storage-services',

  // 2. IT Lifecycle Services & Destruction
  'it-asset-disposition-services': 'it-asset-disposition-services',
  'it-asset-disposition': 'it-asset-disposition-services',
  'it-asset-disposition-services-uk': 'it-asset-disposition-services',
  'itad': 'it-asset-disposition-services',

  'it-asset-tracking-services': 'it-asset-tracking-services',
  'it-asset-tracking': 'it-asset-tracking-services',
  'it-asset-tracking-services-uk': 'it-asset-tracking-services',
  'it-asset-management-services': 'it-asset-tracking-services',
  'it-asset-management': 'it-asset-tracking-services',
  'itam': 'it-asset-tracking-services',
  'itat': 'it-asset-tracking-services',

  'remarketing-recycling': 'remarketing-recycling-services',
  'remarketing-recycling-services': 'remarketing-recycling-services',
  'remarketing-recycling-services-uk': 'remarketing-recycling-services',
  'remarketing': 'remarketing-recycling-services',

  'secure-collection-services': 'secure-collection-services',
  'secure-collection': 'secure-collection-services',
  'secure-collection-services-uk': 'secure-collection-services',

  'secure-it-disposal': 'secure-it-disposal-services',
  'secure-it-disposal-services': 'secure-it-disposal-services',
  'secure-it-disposal-services-uk': 'secure-it-disposal-services',
  'it-disposal': 'secure-it-disposal-services',

  'ultra-secure-hard-drive-destruction': 'ultra-secure-hard-drive-destruction-services',
  'ultra-secure-hard-drive-destruction-services': 'ultra-secure-hard-drive-destruction-services',
  'hard-drive-destruction': 'ultra-secure-hard-drive-destruction-services',
  'hard-drive-destruction-services': 'ultra-secure-hard-drive-destruction-services',

  // 3. Secure Shredding & Document Integrity
  'cardboard-recycling': 'cardboard-recycling-services',
  'cardboard-recycling-services': 'cardboard-recycling-services',
  'cardboard-recycling-services-uk': 'cardboard-recycling-services',

  'disposal-services': 'disposal-services',
  'disposal': 'disposal-services',
  'disposal-services-uk': 'disposal-services',

  'dry-mixed-recycling': 'dry-mixed-recycling-services',
  'dry-mixed-recycling-services': 'dry-mixed-recycling-services',
  'dry-mixed-recycling-services-uk': 'dry-mixed-recycling-services',
  'dmr': 'dry-mixed-recycling-services',

  'home-shredding': 'home-shredding-services',
  'home-shredding-services': 'home-shredding-services',
  'home-shredding-services-uk': 'home-shredding-services',

  'off-site-shredding': 'off-site-shredding-services',
  'off-site-shredding-services': 'off-site-shredding-services',
  'off-site-shredding-services-uk': 'off-site-shredding-services',
  'offsite-shredding': 'off-site-shredding-services',
  'offsite-shredding-services': 'off-site-shredding-services',

  'on-site-shredding': 'on-site-shredding-services',
  'on-site-shredding-services': 'on-site-shredding-services',
  'on-site-shredding-services-uk': 'on-site-shredding-services',
  'onsite-shredding': 'on-site-shredding-services',
  'onsite-shredding-services': 'on-site-shredding-services',

  'product-shredding': 'product-shredding-services',
  'product-shredding-services': 'product-shredding-services',
  'product-shredding-services-uk': 'product-shredding-services',

  'simpler-recycling-services': 'simpler-recycling-services',
  'simpler-recycling': 'simpler-recycling-services',
  'simpler-recycling-services-uk': 'simpler-recycling-services',

  // 4. Moving & Relocation Services
  'business-relocations': 'business-relocations-services',
  'business-relocations-services': 'business-relocations-services',
  'business-relocations-services-uk': 'business-relocations-services',

  'europe-international-domestic-moves': 'europe-international-domestic-moves-services',
  'europe-international-domestic-moves-services': 'europe-international-domestic-moves-services',
  'international-moves': 'europe-international-domestic-moves-services',
  'domestic-moves': 'europe-international-domestic-moves-services',

  'heritage-relocations-storage': 'heritage-relocations-storage-services',
  'heritage-relocations': 'heritage-relocations-storage-services',
  'heritage-relocations-storage-services': 'heritage-relocations-storage-services',

  'it-relocations-specialist': 'it-relocations-specialist-services',
  'it-relocations': 'it-relocations-specialist-services',
  'it-relocations-specialist-services': 'it-relocations-specialist-services',

  'laboratory-relocations-storage': 'laboratory-relocations-storage-services',
  'laboratory-relocations': 'laboratory-relocations-storage-services',
  'laboratory-relocations-storage-services': 'laboratory-relocations-storage-services',

  'project-management': 'project-management-services',
  'project-management-services': 'project-management-services',
  'project-management-services-uk': 'project-management-services',
};

export function getServiceCanonicalSlug(slug: unknown): string {
  let clean = normalizeRouteSlug(slug);
  // Strip trailing -services-uk, -uk
  clean = clean.replace(/-services-uk$/, '-services').replace(/-uk$/, '');
  // Prevent duplicate suffixes like services-services
  while (clean.endsWith('-services-services')) {
    clean = clean.replace(/-services-services$/, '-services');
  }

  if (CANONICAL_SERVICE_SLUGS[clean]) {
    return CANONICAL_SERVICE_SLUGS[clean];
  }
  const withoutServices = clean.replace(/-services$/, '');
  if (CANONICAL_SERVICE_SLUGS[withoutServices]) {
    return CANONICAL_SERVICE_SLUGS[withoutServices];
  }
  if (clean.endsWith('-services')) {
    return clean;
  }
  return clean ? `${clean}-services` : '';
}

export function getServiceSeoSlug(slug: unknown): string {
  return getServiceCanonicalSlug(slug);
}

export function buildServicePaths(records: unknown) {
  const paths: { params: { slug: string }; props: { service: Service } }[] = [];
  const registeredSlugs = new Set<string>();

  const register = (slug: unknown, service: Service) => {
    const cleanSlug = normalizeRouteSlug(slug);
    if (!cleanSlug || registeredSlugs.has(cleanSlug)) return;
    registeredSlugs.add(cleanSlug);
    paths.push({
      params: { slug: cleanSlug },
      props: { service },
    });
  };

  const allServices = Array.isArray(records) ? records.filter(isValidService) : [];

  for (const service of allServices) {
    const canonicalSlug = getServiceCanonicalSlug(service.slug);
    register(canonicalSlug, service);
    register(service.slug, service);

    const withoutUk = service.slug.endsWith('-uk') ? service.slug.replace(/-uk$/, '') : service.slug;
    const withoutServices = withoutUk.replace(/-services$/, '');

    register(withoutUk, service);
    register(`${withoutUk}-uk`, service);
    register(withoutServices, service);
    register(`${withoutServices}-services`, service);
    register(`${withoutServices}-services-uk`, service);
    register(`${withoutServices}-uk`, service);

    const fallbackMatch = fallbackServices.find((f) => {
      if (!isValidService(f)) return false;
      return (
        f.id === service.id ||
        ('_id' in service && typeof service._id === 'string' && f.id === service._id) ||
        f.title.toLowerCase() === service.title.toLowerCase()
      );
    });
    if (fallbackMatch?.slug) {
      register(getServiceCanonicalSlug(fallbackMatch.slug), service);
      register(fallbackMatch.slug, service);
      const fbWithoutUk = fallbackMatch.slug.replace(/-uk$/, '');
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      register(fbWithoutUk, service);
      register(`${fbWithoutUk}-uk`, service);
      register(fbWithoutServices, service);
      register(`${fbWithoutServices}-services`, service);
    }
  }

  for (const fallback of fallbackServices) {
    if (isValidService(fallback)) {
      register(getServiceCanonicalSlug(fallback.slug), fallback);
      register(fallback.slug, fallback);
      const fbWithoutUk = fallback.slug.replace(/-uk$/, '');
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      register(fbWithoutUk, fallback);
      register(`${fbWithoutUk}-uk`, fallback);
      register(fbWithoutServices, fallback);
      register(`${fbWithoutServices}-services`, fallback);
    }
  }

  return paths;
}

export const DIVISION_ALIASES: Record<string, string[]> = {
  'information-management': ['information-management'],
  'it-lifecycle-services-destruction': ['it-lifecycle-services-destruction', 'it-lifecycle'],
  'secure-shredding-document-integrity': ['secure-shredding-document-integrity', 'secure-destruction', 'secure-shredding'],
  'moving-relocation-services': ['moving-relocation-services', 'relocation', 'moving-relocation'],
};

export const REVERSE_DIVISION_MAP: Record<string, string> = {
  'information-management': 'information-management',
  'it-lifecycle-services-destruction': 'it-lifecycle-services-destruction',
  'it-lifecycle': 'it-lifecycle-services-destruction',
  'secure-shredding-document-integrity': 'secure-shredding-document-integrity',
  'secure-destruction': 'secure-shredding-document-integrity',
  'secure-shredding': 'secure-shredding-document-integrity',
  'moving-relocation-services': 'moving-relocation-services',
  'relocation': 'moving-relocation-services',
  'moving-relocation': 'moving-relocation-services',
};

export function buildHierarchicalServicePaths(records: unknown) {
  const paths: { params: { division: string; slug: string }; props: { service: Service } }[] = [];
  const registered = new Set<string>();

  const register = (division: unknown, slug: unknown, service: Service) => {
    const cleanDiv = normalizeRouteSlug(division);
    const cleanSlug = normalizeRouteSlug(slug);
    if (!cleanDiv || !cleanSlug) return;
    const key = `${cleanDiv}/${cleanSlug}`;
    if (registered.has(key)) return;
    registered.add(key);
    paths.push({
      params: { division: cleanDiv, slug: cleanSlug },
      props: { service },
    });
  };

  const allServices = Array.isArray(records) ? records.filter(isValidService) : [];
  const servicesToUse = allServices.length > 0 ? allServices : fallbackServices.filter(isValidService);

  for (const service of servicesToUse) {
    const canonicalDiv = normalizeRouteSlug(service.divisionSlug);
    const divVariants = DIVISION_ALIASES[canonicalDiv] || [canonicalDiv];

    const canonicalSlug = getServiceCanonicalSlug(service.slug);
    const rawSlug = normalizeRouteSlug(service.slug);
    const withoutUk = rawSlug.endsWith('-uk') ? rawSlug.replace(/-uk$/, '') : rawSlug;
    const withoutServices = withoutUk.replace(/-services$/, '');
    const withServices = `${withoutServices}-services`;

    const slugVariants = [
      canonicalSlug,
      rawSlug,
      withServices,
      withoutServices,
      `${withoutServices}-uk`,
      `${withServices}-uk`,
    ];

    for (const div of divVariants) {
      for (const sl of slugVariants) {
        register(div, sl, service);
      }
    }

    const fallbackMatch = fallbackServices.find((f) => {
      if (!isValidService(f)) return false;
      return (
        f.id === service.id ||
        ('_id' in service && typeof service._id === 'string' && f.id === service._id) ||
        f.title.toLowerCase() === service.title.toLowerCase()
      );
    });
    if (fallbackMatch?.slug) {
      const fbRaw = normalizeRouteSlug(fallbackMatch.slug);
      const fbCanonical = getServiceCanonicalSlug(fallbackMatch.slug);
      const fbWithoutUk = fbRaw.endsWith('-uk') ? fbRaw.replace(/-uk$/, '') : fbRaw;
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      const fbWithServices = `${fbWithoutServices}-services`;
      const fbDivVariants = DIVISION_ALIASES[normalizeRouteSlug(fallbackMatch.divisionSlug)] || divVariants;

      for (const div of fbDivVariants) {
        register(div, fbCanonical, service);
        register(div, fbRaw, service);
        register(div, fbWithServices, service);
        register(div, fbWithoutServices, service);
      }
    }
  }

  for (const fallback of fallbackServices) {
    if (isValidService(fallback)) {
      const fbDivVariants = DIVISION_ALIASES[normalizeRouteSlug(fallback.divisionSlug)] || [normalizeRouteSlug(fallback.divisionSlug)];
      const fbCanonical = getServiceCanonicalSlug(fallback.slug);
      const fbRaw = normalizeRouteSlug(fallback.slug);
      const fbWithoutUk = fbRaw.endsWith('-uk') ? fbRaw.replace(/-uk$/, '') : fbRaw;
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      const fbWithServices = `${fbWithoutServices}-services`;

      for (const div of fbDivVariants) {
        register(div, fbCanonical, fallback);
        register(div, fbRaw, fallback);
        register(div, fbWithServices, fallback);
        register(div, fbWithoutServices, fallback);
      }
    }
  }

  return paths;
}
