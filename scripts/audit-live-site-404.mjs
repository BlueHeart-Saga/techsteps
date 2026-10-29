import fs from 'node:fs';

async function auditSite() {
  console.log('Fetching live sitemap from https://techsteps.co.uk/sitemap-0.xml ...');
  const res = await fetch('https://techsteps.co.uk/sitemap-0.xml');
  if (!res.ok) {
    console.error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
    return;
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  console.log(`Discovered ${urls.length} URLs from live sitemap.`);

  const results = [];
  const notFound404 = [];
  const otherErrors = [];
  const okPages = [];

  // Concurrency limit of 5 to avoid rate-limiting
  const concurrency = 5;
  for (let i = 0; i < urls.length; i += concurrency) {
    const chunk = urls.slice(i, i + concurrency);
    await Promise.all(chunk.map(async (url) => {
      try {
        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
          },
          redirect: 'manual' // to check if it redirects
        });

        const status = resp.status;
        const location = resp.headers.get('location');

        if (status === 404) {
          console.log(`[404 NOT FOUND] ${url}`);
          notFound404.push({ url, status });
        } else if (status >= 300 && status < 400) {
          console.log(`[${status} REDIRECT] ${url} -> ${location}`);
          // also verify target
          const targetResp = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          if (targetResp.status === 404) {
            console.log(`[404 ON REDIRECT TARGET] ${url} -> ${targetResp.status}`);
            notFound404.push({ url, status: targetResp.status, redirectTarget: location });
          } else {
            okPages.push({ url, status: targetResp.status, redirectedFrom: status, location });
          }
        } else if (status >= 200 && status < 300) {
          // Check if body contains 404 text
          const body = await resp.text();
          if (body.includes('<title>404') || body.includes('Page Not Found') || body.includes('<h1>404</h1>')) {
            console.log(`[SOFT 404 DETECTED] ${url}`);
            notFound404.push({ url, status: 200, soft404: true });
          } else {
            okPages.push({ url, status });
          }
        } else {
          console.log(`[${status} ERROR] ${url}`);
          otherErrors.push({ url, status });
        }
      } catch (err) {
        console.error(`[FETCH FAIL] ${url}: ${err.message}`);
        otherErrors.push({ url, error: err.message });
      }
    }));
  }

  console.log('\n================ AUDIT SUMMARY ================');
  console.log(`Total URLs Checked: ${urls.length}`);
  console.log(`200 OK Pages: ${okPages.length}`);
  console.log(`404 Not Found Pages: ${notFound404.length}`);
  console.log(`Other Statuses/Errors: ${otherErrors.length}`);

  if (notFound404.length > 0) {
    console.log('\nList of 404 Pages:');
    notFound404.forEach(item => console.log(`- ${item.url} (Status: ${item.status}${item.soft404 ? ' - Soft 404' : ''})`));
  } else {
    console.log('\nNo 404 pages found among sitemap URLs!');
  }

  if (otherErrors.length > 0) {
    console.log('\nList of Other Errors:');
    otherErrors.forEach(item => console.log(`- ${item.url} (${JSON.stringify(item)})`));
  }

  fs.writeFileSync('scripts/live-audit-results.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    totalChecked: urls.length,
    okPages,
    notFound404,
    otherErrors
  }, null, 2), 'utf8');
}

auditSite();
