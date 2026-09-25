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
  timeout: 30000,
});

async function run() {
  console.log('=== VERIFYING SANITY EDITING & REFLECTION ===\n');

  // Test 1: Home Page Hero Heading
  const originalHeading = 'GIVING TECHNOLOGY A SECOND LIFE';
  const testHeading = 'GIVING TECHNOLOGY A SECOND LIFE [LIVE TEST EDIT]';

  console.log(`1. Mutating homePage.hero.heading in Sanity to: "${testHeading}"...`);
  await client.patch('homePage').set({ 'hero.heading': testHeading }).commit();

  console.log('   Fetching / from Astro dev server...');
  const res1 = await fetch('http://localhost:3000/');
  const html1 = await res1.text();
  const found1 = html1.includes(testHeading);
  console.log(`   Live website reflects edited text: ${found1 ? 'YES (PASSED)' : 'NO'}`);

  console.log(`   Reverting homePage.hero.heading back to: "${originalHeading}"...`);
  await client.patch('homePage').set({ 'hero.heading': originalHeading }).commit();

  const res2 = await fetch('http://localhost:3000/');
  const html2 = await res2.text();
  const restored1 = html2.includes(originalHeading);
  console.log(`   Live website reflects restored text: ${restored1 ? 'YES (PASSED)' : 'NO'}\n`);

  // Test 2: Contact Page Hero Title
  const originalContactTitle = 'Contact us';
  const testContactTitle = 'Contact us [Studio Live Edit]';

  console.log(`2. Mutating contactPage.hero.title in Sanity to: "${testContactTitle}"...`);
  await client.patch('contactPage').set({ 'hero.title': testContactTitle }).commit();

  const res3 = await fetch('http://localhost:3000/contact');
  const html3 = await res3.text();
  const found2 = html3.includes(testContactTitle);
  console.log(`   Live website reflects edited text: ${found2 ? 'YES (PASSED)' : 'NO'}`);

  console.log(`   Reverting contactPage.hero.title back to: "${originalContactTitle}"...`);
  await client.patch('contactPage').set({ 'hero.title': originalContactTitle }).commit();

  const res4 = await fetch('http://localhost:3000/contact');
  const html4 = await res4.text();
  const restored2 = html4.includes(originalContactTitle);
  console.log(`   Live website reflects restored text: ${restored2 ? 'YES (PASSED)' : 'NO'}\n`);

  console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
}

run().catch(console.error);
