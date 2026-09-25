import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

const routes = [
  '/',
  '/about-us',
  '/services',
  '/services/it-asset-disposition-services',
  '/services/document-storage',
  '/information-management',
  '/it-lifecycle-services-destruction',
  '/moving-relocation-services',
  '/secure-shredding-document-integrity',
  '/sectors',
  '/sectors/defence',
  '/sectors/finance',
  '/insights',
  '/case-studies',
  '/investors',
  '/sustainability',
  '/faq',
  '/contact',
  '/request-a-quote',
  '/request-a-collection',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/environmental-policy',
  '/information-security-policy',
  '/modern-slavery-statement',
  '/accessibility',
];

async function verify() {
  console.log('=== VERIFYING ALL ASTRO ROUTES (READING FROM SANITY) ===\n');
  let allOk = true;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const status = res.status;
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'NO_TITLE';

      if (status === 200) {
        console.log(`✓ [200] ${route.padEnd(42)} | Title: ${title.slice(0, 45)}...`);
      } else {
        console.log(`✗ [${status}] ${route}`);
        allOk = false;
      }
    } catch (e) {
      console.error(`✗ [ERROR] ${route} ->`, e.message);
      allOk = false;
    }
  }

  console.log(`\nOverall verification: ${allOk ? 'ALL ROUTES RETURNED 200 OK' : 'SOME ROUTES FAILED'}`);
}

verify();
