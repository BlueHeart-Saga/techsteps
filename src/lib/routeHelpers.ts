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
    // Primary route
    register(service.slug, service);

    // Variations: -uk, -services, -services-uk
    const withoutUk = service.slug.endsWith('-uk') ? service.slug.replace(/-uk$/, '') : service.slug;
    const withoutServices = withoutUk.replace(/-services$/, '');

    register(withoutUk, service);
    register(`${withoutUk}-uk`, service);
    register(withoutServices, service);
    register(`${withoutServices}-services`, service);
    register(`${withoutServices}-services-uk`, service);
    register(`${withoutServices}-uk`, service);

    // Match against fallback services to ensure menu slugs resolve
    const fallbackMatch = fallbackServices.find((f) => {
      if (!isValidService(f)) return false;
      return (
        f.id === service.id ||
        ('_id' in service && typeof service._id === 'string' && f.id === service._id) ||
        f.title.toLowerCase() === service.title.toLowerCase()
      );
    });
    if (fallbackMatch?.slug) {
      const fbWithoutUk = fallbackMatch.slug.replace(/-uk$/, '');
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      register(fallbackMatch.slug, service);
      register(fbWithoutUk, service);
      register(`${fbWithoutUk}-uk`, service);
      register(fbWithoutServices, service);
      register(`${fbWithoutServices}-services`, service);
    }
  }

  // Ensure any fallback service not present in Sanity is also reachable
  for (const fallback of fallbackServices) {
    if (isValidService(fallback)) {
      const fbWithoutUk = fallback.slug.replace(/-uk$/, '');
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      register(fallback.slug, fallback);
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

export function getServiceSeoSlug(slug: unknown): string {
  const clean = normalizeRouteSlug(slug);
  const withoutUk = clean.endsWith('-uk') ? clean.replace(/-uk$/, '') : clean;
  if (withoutUk.endsWith('-services')) {
    return withoutUk;
  }
  return `${withoutUk}-services`;
}

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

    const rawSlug = normalizeRouteSlug(service.slug);
    const withoutUk = rawSlug.endsWith('-uk') ? rawSlug.replace(/-uk$/, '') : rawSlug;
    const withoutServices = withoutUk.replace(/-services$/, '');
    const withServices = `${withoutServices}-services`;

    const slugVariants = [
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

    // Match fallback service if exists
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
      const fbWithoutUk = fbRaw.endsWith('-uk') ? fbRaw.replace(/-uk$/, '') : fbRaw;
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      const fbWithServices = `${fbWithoutServices}-services`;
      const fbDivVariants = DIVISION_ALIASES[normalizeRouteSlug(fallbackMatch.divisionSlug)] || divVariants;

      for (const div of fbDivVariants) {
        register(div, fbRaw, service);
        register(div, fbWithServices, service);
        register(div, fbWithoutServices, service);
      }
    }
  }

  // Ensure any fallback service not present in Sanity is also reachable
  for (const fallback of fallbackServices) {
    if (isValidService(fallback)) {
      const fbDivVariants = DIVISION_ALIASES[normalizeRouteSlug(fallback.divisionSlug)] || [normalizeRouteSlug(fallback.divisionSlug)];
      const fbRaw = normalizeRouteSlug(fallback.slug);
      const fbWithoutUk = fbRaw.endsWith('-uk') ? fbRaw.replace(/-uk$/, '') : fbRaw;
      const fbWithoutServices = fbWithoutUk.replace(/-services$/, '');
      const fbWithServices = `${fbWithoutServices}-services`;

      for (const div of fbDivVariants) {
        register(div, fbRaw, fallback);
        register(div, fbWithServices, fallback);
        register(div, fbWithoutServices, fallback);
      }
    }
  }

  return paths;
}

