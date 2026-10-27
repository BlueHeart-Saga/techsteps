import {
  getHomePage,
  getAboutPage,
  getLeadershipPage,
  getGlobalPresencePage,
  getPeopleCulturePage,
  getSustainabilityPage,
  getInvestorsPage,
  getFaqPage,
  getContactPage,
  getRequestCollectionPage,
  getServicesPage,
  getSectorsPage,
  getLegalPage,
  getDivisions,
  getServices,
  getSectors,
  getSiteSettings,
  getCaseStudies,
  getTestimonials,
  getStatistics,
} from '../src/lib/sanity/client.ts';

async function testAll() {
  console.log('--- STARTING SANITY INTEGRATION AUDIT ---');

  const tests = [
    { name: 'siteSettings', fn: () => getSiteSettings() },
    { name: 'homePage', fn: () => getHomePage() },
    { name: 'aboutPage', fn: () => getAboutPage() },
    { name: 'leadershipPage', fn: () => getLeadershipPage() },
    { name: 'globalPresencePage', fn: () => getGlobalPresencePage() },
    { name: 'peopleCulturePage', fn: () => getPeopleCulturePage() },
    { name: 'sustainabilityPage', fn: () => getSustainabilityPage() },
    { name: 'investorsPage', fn: () => getInvestorsPage() },
    { name: 'faqPage', fn: () => getFaqPage() },
    { name: 'contactPage', fn: () => getContactPage() },
    { name: 'requestCollectionPage', fn: () => getRequestCollectionPage() },
    { name: 'servicesPage', fn: () => getServicesPage() },
    { name: 'sectorsPage', fn: () => getSectorsPage() },
    { name: 'divisions', fn: () => getDivisions() },
    { name: 'services', fn: () => getServices() },
    { name: 'sectors', fn: () => getSectors() },
    { name: 'caseStudies', fn: () => getCaseStudies() },
    { name: 'testimonials', fn: () => getTestimonials() },
    { name: 'statistics', fn: () => getStatistics() },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const res = await t.fn();
      if (res) {
        console.log(`[PASS] ${t.name}: resolved successfully`);
        passed++;
      } else {
        console.warn(`[WARN] ${t.name}: returned null/undefined`);
        failed++;
      }
    } catch (e) {
      console.error(`[FAIL] ${t.name}: ${e.message}`);
      failed++;
    }
  }

  // Legal pages
  const legalSlugs = [
    'privacy-policy',
    'cookie-policy',
    'terms-and-conditions',
    'accessibility',
    'modern-slavery-statement',
    'environmental-policy',
    'information-security-policy',
  ];

  for (const slug of legalSlugs) {
    try {
      const res = await getLegalPage(slug);
      if (res && res.title) {
        console.log(`[PASS] legalPage (${slug}): ${res.title}`);
        passed++;
      } else {
        console.warn(`[WARN] legalPage (${slug}): returned fallback or empty`);
      }
    } catch (e) {
      console.error(`[FAIL] legalPage (${slug}): ${e.message}`);
      failed++;
    }
  }

  // Competitor name check
  const about = await getAboutPage();
  const serialized = JSON.stringify(about);
  if (/Restore\s*Datashred/i.test(serialized)) {
    console.error('[FAIL] Competitor name "Restore Datashred" still present in aboutPage!');
    failed++;
  } else {
    console.log('[PASS] Competitor name check: Clean of "Restore Datashred"');
    passed++;
  }

  console.log(`\nAudit Complete: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

testAll().catch(e => {
  console.error(e);
  process.exit(1);
});
