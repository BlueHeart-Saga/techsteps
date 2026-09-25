async function main() {
  const urls = [
    'http://localhost:3000/information-management',
    'http://localhost:3000/secure-shredding-document-integrity',
    'http://localhost:3000/moving-relocation-services',
    'http://localhost:3000/terms-and-conditions',
  ];

  for (const url of urls) {
    const res = await fetch(url);
    const html = await res.text();
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2Match = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    console.log(`URL: ${url}`);
    console.log(`  H1: ${h1Match ? h1Match[1].trim().replace(/\s+/g, ' ') : 'None'}`);
    console.log(`  First H2: ${h2Match ? h2Match[1].trim().replace(/\s+/g, ' ') : 'None'}`);
  }
}

main().catch(console.error);
