import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const configPath = process.env.USERPROFILE + '/.config/sanity/config.json';
let token = process.env.SANITY_API_TOKEN;
if (fs.existsSync(configPath)) {
  const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = conf.authToken || token;
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token,
  useCdn: false
});

async function main() {
  const homeDocs = await client.fetch('*[_type == "homePage"]');
  console.log('=== HOME PAGE DOCS ===', homeDocs.length);
  for (const h of homeDocs) {
    console.log('ID:', h._id);
    console.log('Keys:', Object.keys(h));
    console.log('Hero:', JSON.stringify(h.hero, null, 2));
    console.log('Intro:', JSON.stringify(h.intro, null, 2));
    console.log('Services:', JSON.stringify(h.services, null, 2));
    console.log('Stats:', JSON.stringify(h.stats, null, 2));
    console.log('WhyChoose:', JSON.stringify(h.whyChoose, null, 2));
    console.log('Lifecycle:', JSON.stringify(h.lifecycle, null, 2));
    console.log('Statistics:', JSON.stringify(h.statistics, null, 2));
    console.log('CTA:', JSON.stringify(h.cta, null, 2));
  }

  const aboutDocs = await client.fetch('*[_type == "aboutPage"]');
  console.log('\n=== ABOUT PAGE DOCS ===', aboutDocs.length);
  for (const a of aboutDocs) {
    console.log('ID:', a._id);
    console.log('Keys:', Object.keys(a));
    console.log('Hero:', JSON.stringify(a.hero, null, 2));
    console.log('WhoWeAre:', JSON.stringify(a.whoWeAre, null, 2));
    console.log('Approach:', JSON.stringify(a.approach, null, 2));
    console.log('Capabilities:', JSON.stringify(a.capabilities, null, 2));
    console.log('WhatWeDo:', JSON.stringify(a.whatWeDo, null, 2));
    console.log('Statistics:', JSON.stringify(a.statistics, null, 2));
    console.log('CTA:', JSON.stringify(a.cta, null, 2));
  }
}

main().catch(console.error);
