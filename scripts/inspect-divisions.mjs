import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

function loadEnv() {
  const raw = fs.readFileSync('.env', 'utf-8');
  const env = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const env = loadEnv();
const client = createClient({
  projectId: env.SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: env.SANITY_DATASET || 'techsteps',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: env.SANITY_API_TOKEN || env.SANITY_TOKEN,
});

async function run() {
  const divs = await client.fetch('*[_type == "division"]');
  console.log('=== DIVISIONS IN SANITY ===');
  for (const d of divs) {
    console.log(`\nID: ${d._id}, Title: ${d.title}, Slug: ${d.slug?.current}`);
    console.log('Fields:', Object.keys(d));
    console.log('Intro:', d.intro);
    console.log('Summary:', d.summary);
  }
}

run().catch(console.error);
