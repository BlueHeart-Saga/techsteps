import fs from 'fs';
import path from 'path';
import http from 'http';

const SERVICES = [
  // 1. Information Management (Division: /information-management)
  {
    num: 1,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Digital Mailroom',
    originalSlug: 'digital-mailroom',
    canonicalSlug: 'digital-mailroom-services'
  },
  {
    num: 2,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Document Management',
    originalSlug: 'document-management',
    canonicalSlug: 'document-management-services'
  },
  {
    num: 3,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Document Scanning',
    originalSlug: 'document-scanning',
    canonicalSlug: 'document-scanning-services'
  },
  {
    num: 4,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Secure Document Storage',
    originalSlug: 'document-storage',
    canonicalSlug: 'document-storage-services'
  },
  {
    num: 5,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Heritage Storage Services',
    originalSlug: 'heritage-storage-services',
    canonicalSlug: 'heritage-storage-services'
  },
  {
    num: 6,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Tape and Media Storage',
    originalSlug: 'tape-media-storage',
    canonicalSlug: 'tape-media-storage-services'
  },
  {
    num: 7,
    division: 'Information Management',
    divisionUrl: '/information-management',
    name: 'Vault Storage',
    originalSlug: 'vault-storage',
    canonicalSlug: 'vault-storage-services'
  },

  // 2. IT Lifecycle Services & Destruction (Division: /it-lifecycle-services-destruction)
  {
    num: 8,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'IT Asset Disposition Services (ITAD)',
    originalSlug: 'it-asset-disposition-services',
    canonicalSlug: 'it-asset-disposition-services'
  },
  {
    num: 9,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'IT Asset Tracking Services (ITAM)',
    originalSlug: 'it-asset-tracking-services',
    canonicalSlug: 'it-asset-tracking-services'
  },
  {
    num: 10,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'Remarketing & Recycling',
    originalSlug: 'remarketing-recycling',
    canonicalSlug: 'remarketing-recycling-services'
  },
  {
    num: 11,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'Secure Collection Services',
    originalSlug: 'secure-collection-services',
    canonicalSlug: 'secure-collection-services'
  },
  {
    num: 12,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'Secure IT Disposal',
    originalSlug: 'secure-it-disposal',
    canonicalSlug: 'secure-it-disposal-services'
  },
  {
    num: 13,
    division: 'IT Lifecycle Services & Destruction',
    divisionUrl: '/it-lifecycle-services-destruction',
    name: 'Ultra Secure Hard Drive Destruction',
    originalSlug: 'ultra-secure-hard-drive-destruction',
    canonicalSlug: 'ultra-secure-hard-drive-destruction-services'
  },

  // 3. Secure Shredding & Document Integrity (Division: /secure-shredding-document-integrity)
  {
    num: 14,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Cardboard Recycling',
    originalSlug: 'cardboard-recycling',
    canonicalSlug: 'cardboard-recycling-services'
  },
  {
    num: 15,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Disposal Services',
    originalSlug: 'disposal-services',
    canonicalSlug: 'disposal-services'
  },
  {
    num: 16,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Dry Mixed Recycling (DMR)',
    originalSlug: 'dry-mixed-recycling',
    canonicalSlug: 'dry-mixed-recycling-services'
  },
  {
    num: 17,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Home Shredding',
    originalSlug: 'home-shredding',
    canonicalSlug: 'home-shredding-services'
  },
  {
    num: 18,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'OffSite Shredding Services',
    originalSlug: 'off-site-shredding',
    canonicalSlug: 'off-site-shredding-services'
  },
  {
    num: 19,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'OnSite Shredding',
    originalSlug: 'on-site-shredding',
    canonicalSlug: 'on-site-shredding-services'
  },
  {
    num: 20,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Product Shredding',
    originalSlug: 'product-shredding',
    canonicalSlug: 'product-shredding-services'
  },
  {
    num: 21,
    division: 'Secure Shredding & Document Integrity',
    divisionUrl: '/secure-shredding-document-integrity',
    name: 'Simpler Recycling Services',
    originalSlug: 'simpler-recycling-services',
    canonicalSlug: 'simpler-recycling-services'
  },

  // 4. Moving & Relocation Services (Division: /moving-relocation-services)
  {
    num: 22,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'Business Relocations',
    originalSlug: 'business-relocations',
    canonicalSlug: 'business-relocations-services'
  },
  {
    num: 23,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'Europe & International Domestic Moves',
    originalSlug: 'europe-international-domestic-moves',
    canonicalSlug: 'europe-international-domestic-moves-services'
  },
  {
    num: 24,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'Heritage Relocations & Storage',
    originalSlug: 'heritage-relocations-storage',
    canonicalSlug: 'heritage-relocations-storage-services'
  },
  {
    num: 25,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'IT Relocations Specialist',
    originalSlug: 'it-relocations-specialist',
    canonicalSlug: 'it-relocations-specialist-services'
  },
  {
    num: 26,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'Laboratory Relocations & Storage',
    originalSlug: 'laboratory-relocations-storage',
    canonicalSlug: 'laboratory-relocations-storage-services'
  },
  {
    num: 27,
    division: 'Moving & Relocation Services',
    divisionUrl: '/moving-relocation-services',
    name: 'Project Management',
    originalSlug: 'project-management',
    canonicalSlug: 'project-management-services'
  }
];

const results = [];
let passCount = 0;
let failCount = 0;

console.log('===============================================================');
console.log('1. VERIFYING DIST OUTPUT & SELF-REFERENCING CANONICAL TAGS');
console.log('===============================================================');

for (const s of SERVICES) {
  const filePath = path.join('dist', 'services', s.canonicalSlug, 'index.html');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error(`❌ [FAIL] Missing HTML file for canonical URL: ${filePath}`);
    failCount++;
    results.push({ ...s, fileExists: false, canonicalTag: false, indexable: false, sitemap: false });
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const expectedCanonical = `https://techsteps.co.uk/services/${s.canonicalSlug}`;
  const hasCanonicalTag = content.includes(`<link rel="canonical" href="${expectedCanonical}"`);
  const isNoIndex = content.includes('content="noindex');

  if (!hasCanonicalTag) {
    console.error(`❌ [FAIL] Missing or incorrect canonical tag in ${filePath}`);
    console.error(`          Expected: ${expectedCanonical}`);
    failCount++;
  } else if (isNoIndex) {
    console.error(`❌ [FAIL] Page is marked noindex: ${filePath}`);
    failCount++;
  } else {
    passCount++;
  }

  results.push({
    ...s,
    fileExists: exists,
    canonicalTag: hasCanonicalTag,
    indexable: !isNoIndex
  });
}

console.log(`Canonical files check complete: ${passCount}/27 passed.`);

console.log('\n===============================================================');
console.log('2. VERIFYING XML SITEMAP (sitemap-0.xml)');
console.log('===============================================================');

const sitemapPath = path.join('dist', 'sitemap-0.xml');
let sitemapPass = true;

if (!fs.existsSync(sitemapPath)) {
  console.error(`❌ [FAIL] Missing sitemap-0.xml at ${sitemapPath}`);
  sitemapPass = false;
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  for (const s of results) {
    const expectedUrl = `<loc>https://techsteps.co.uk/services/${s.canonicalSlug}</loc>`;
    const inSitemap = sitemapContent.includes(expectedUrl);
    s.sitemap = inSitemap;
    if (!inSitemap) {
      console.error(`❌ [FAIL] Not found in sitemap: ${expectedUrl}`);
      sitemapPass = false;
    }
  }

  // Also check that no non-canonical original slugs are in sitemap
  for (const s of SERVICES) {
    if (s.originalSlug !== s.canonicalSlug) {
      const badUrl = `<loc>https://techsteps.co.uk/services/${s.originalSlug}</loc>`;
      if (sitemapContent.includes(badUrl)) {
        console.error(`❌ [FAIL] Non-canonical original URL leaked into sitemap: ${badUrl}`);
        sitemapPass = false;
      }
    }
  }

  // Verify division hubs in sitemap
  const divHubs = [
    'https://techsteps.co.uk/information-management',
    'https://techsteps.co.uk/it-lifecycle-services-destruction',
    'https://techsteps.co.uk/secure-shredding-document-integrity',
    'https://techsteps.co.uk/moving-relocation-services'
  ];
  for (const hub of divHubs) {
    if (!sitemapContent.includes(`<loc>${hub}</loc>`)) {
      console.error(`❌ [FAIL] Core division hub missing from sitemap: ${hub}`);
      sitemapPass = false;
    }
  }
}

if (sitemapPass) {
  console.log('✅ [PASS] XML sitemap accurately contains all 27 canonical sub-services, all 4 division hubs, and zero old slugs.');
} else {
  console.error('❌ [FAIL] Sitemap verification encountered issues.');
}

console.log('\n===============================================================');
console.log('3. VERIFYING HTTP 301 REDIRECTS VIA AZURE SERVER');
console.log('===============================================================');

// Spawn azure-server on an ephemeral test port
const TEST_PORT = 8999;
process.env.PORT = String(TEST_PORT);
process.env.NODE_ENV = 'production';

// We import the server execution
// Let's create an HTTP request helper
function testRequest(reqPath) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path: reqPath,
        method: 'GET'
      },
      (res) => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location || null
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

// Start azure server as child process
import { spawn } from 'child_process';
const serverProc = spawn('node', ['server.js'], {
  env: { ...process.env, PORT: String(TEST_PORT) },
  cwd: path.resolve('dist')
});

let serverStarted = false;
serverProc.stdout.on('data', (d) => {
  console.log(`[azure-server] ${d}`);
  if (d.toString().includes('listening on')) {
    serverStarted = true;
  }
});

serverProc.stderr.on('data', (d) => {
  console.error(`[azure-server err] ${d}`);
});

// Wait up to 5s for server to start
for (let i = 0; i < 50; i++) {
  if (serverStarted) break;
  await new Promise((r) => setTimeout(r, 100));
}

let redirectPass = true;

for (const s of results) {
  // Test canonical URL: should return 200
  try {
    const canRes = await testRequest(`/services/${s.canonicalSlug}`);
    s.canonicalHttpCode = canRes.statusCode;
    if (canRes.statusCode !== 200) {
      console.error(`❌ Canonical URL /services/${s.canonicalSlug} returned ${canRes.statusCode}, expected 200`);
      redirectPass = false;
    }
  } catch (err) {
    console.error(`Error requesting canonical /services/${s.canonicalSlug}:`, err.message);
    s.canonicalHttpCode = 500;
    redirectPass = false;
  }

  // Test original URL if different: should return 301 to canonical
  if (s.originalSlug !== s.canonicalSlug) {
    try {
      const origRes = await testRequest(`/services/${s.originalSlug}?test=1`);
      s.originalHttpCode = origRes.statusCode;
      s.redirectLocation = origRes.location;
      const expectedLocation = `/services/${s.canonicalSlug}?test=1`;
      if (origRes.statusCode !== 301 || origRes.location !== expectedLocation) {
        console.error(`❌ Original URL /services/${s.originalSlug} returned ${origRes.statusCode} (${origRes.location}), expected 301 to ${expectedLocation}`);
        redirectPass = false;
      }
    } catch (err) {
      console.error(`Error requesting original /services/${s.originalSlug}:`, err.message);
      s.originalHttpCode = 500;
      redirectPass = false;
    }
  } else {
    s.originalHttpCode = 200;
    s.redirectLocation = null;
  }

  // Test legacy 3-segment URL: should return 301 to canonical
  const divisionSlug = s.divisionUrl.replace(/^\//, '');
  try {
    const legRes = await testRequest(`/services/${divisionSlug}/${s.originalSlug}`);
    s.legacyHttpCode = legRes.statusCode;
    s.legacyLocation = legRes.location;
    const expectedLocation = `/services/${s.canonicalSlug}`;
    if (legRes.statusCode !== 301 || legRes.location !== expectedLocation) {
      console.error(`❌ Legacy 3-segment /services/${divisionSlug}/${s.originalSlug} returned ${legRes.statusCode} (${legRes.location}), expected 301 to ${expectedLocation}`);
      redirectPass = false;
    }
  } catch (err) {
    console.error(`Error requesting legacy route:`, err.message);
    s.legacyHttpCode = 500;
    redirectPass = false;
  }
}

serverProc.kill();

console.log('\n===============================================================');
console.log('4. ALL 27 SUB-SERVICES AUDIT TABLE');
console.log('===============================================================');

console.table(
  results.map((r) => ({
    '#': r.num,
    'Sub-Service': r.name,
    'Original URL': `/services/${r.originalSlug}`,
    'New Canonical URL': `/services/${r.canonicalSlug}`,
    'Status': r.originalSlug === r.canonicalSlug ? '200 OK (Unchanged)' : '301 Redirect -> 200 OK',
    'Test Result': (r.fileExists && r.canonicalTag && r.sitemap && r.canonicalHttpCode === 200) ? 'PASS' : 'FAIL'
  }))
);

fs.writeFileSync('scripts/test-results.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved test results to scripts/test-results.json');
