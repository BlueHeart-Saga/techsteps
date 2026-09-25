import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const home = await client.fetch('*[_type == "homePage"][0]');
  console.log('=== SANITY HOME PAGE DOCUMENT KEYS & VALUES ===');
  for (const [key, val] of Object.entries(home)) {
    if (key.startsWith('_')) continue;
    console.log(`- ${key}:`, typeof val === 'object' ? JSON.stringify(val).slice(0, 100) + '...' : val);
  }

  const about = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('\n=== SANITY ABOUT PAGE DOCUMENT KEYS & VALUES ===');
  for (const [key, val] of Object.entries(about)) {
    if (key.startsWith('_')) continue;
    console.log(`- ${key}:`, typeof val === 'object' ? JSON.stringify(val).slice(0, 100) + '...' : val);
  }
}

main().catch(console.error);
