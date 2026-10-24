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
      register(fallbackMatch.slug, service);
      register(fallbackMatch.slug.replace(/-uk$/, ''), service);
      register(`${fallbackMatch.slug}-uk`, service);
      register(`${fallbackMatch.slug}-services`, service);
    }
  }

  // Ensure any fallback service not present in Sanity is also reachable
  for (const fallback of fallbackServices) {
    if (isValidService(fallback)) {
      register(fallback.slug, fallback);
      register(fallback.slug.replace(/-uk$/, ''), fallback);
      register(`${fallback.slug}-uk`, fallback);
    }
  }

  return paths;
}
