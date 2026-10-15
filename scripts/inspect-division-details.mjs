import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function main() {
  const divs = await client.fetch('*[_type == "division"]');
  for (const d of divs) {
    console.log(`\n================ ${d._id} (${d.slug?.current}) ================`);
    console.log('title:', d.title);
    console.log('heroTitle:', d.heroTitle);
    console.log('heroDescription:', d.heroDescription);
    console.log('aboutTitle:', d.aboutTitle);
    console.log('aboutParagraphs:', d.aboutParagraphs);
    console.log('lifecycleStages count:', d.lifecycleStages?.length);
    console.log('faqs count:', d.faqs?.length);
  }
}

main().catch(console.error);
