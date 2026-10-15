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
  console.log('=== AUDITING SANITY DOCUMENTS ===');
  
  // 1. Home
  const home = await client.fetch('*[_id == "homePage"][0]');
  console.log('\n--- HOME PAGE ---');
  console.log('hero:', JSON.stringify(home?.hero, null, 2));
  console.log('intro:', JSON.stringify(home?.intro, null, 2));
  console.log('services heading:', home?.services?.heading);
  console.log('whyChoose:', JSON.stringify(home?.whyChoose, null, 2));

  // 2. About
  const about = await client.fetch('*[_id == "aboutPage"][0]');
  console.log('\n--- ABOUT PAGE ---');
  console.log('hero:', JSON.stringify(about?.hero, null, 2));
  console.log('cleanerSmarter:', JSON.stringify(about?.cleanerSmarter, null, 2));
  console.log('technologyPurpose:', JSON.stringify(about?.technologyPurpose, null, 2));
  console.log('nationwideNetwork:', JSON.stringify(about?.nationwideNetwork, null, 2));
  console.log('sustainabilityCommitment:', JSON.stringify(about?.sustainabilityCommitment, null, 2));
  console.log('trustAndImpact:', JSON.stringify(about?.trustAndImpact, null, 2));
  console.log('journey:', JSON.stringify(about?.journey, null, 2));

  // 3. Divisions
  const divisions = await client.fetch('*[_type == "division"]{_id, title, slug, heroTitle, heroDescription, heroImage, aboutTitle, aboutDescription}');
  console.log('\n--- DIVISIONS ---');
  for (const d of divisions) {
    console.log(`[${d.slug?.current}] heroTitle: "${d.heroTitle}", heroImage: "${d.heroImage}"`);
  }

  // 4. Services
  const services = await client.fetch('*[_type == "service"]{_id, title, slug, aboutTitle, aboutImage}');
  console.log('\n--- SERVICES ---');
  for (const s of services) {
    console.log(`[${s.slug?.current}] title: "${s.title}", aboutImage: "${s.aboutImage}"`);
  }
}

main().catch(console.error);
