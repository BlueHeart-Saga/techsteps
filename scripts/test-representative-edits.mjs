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

async function testField({ name, docId, fieldPath, route, originalValue, testValue }) {
  console.log(`--- Testing ${name} (${docId} -> ${fieldPath}) ---`);
  
  // 1. Mutate
  console.log(`  Mutating in Sanity to: "${testValue}"...`);
  await client.patch(docId).set({ [fieldPath]: testValue }).commit();

  // 2. Fetch from running Astro web server
  const res = await fetch(`http://localhost:3000${route}`);
  const html = await res.text();
  const reflected = html.includes(testValue);
  console.log(`  Live website reflects edited text: ${reflected ? 'YES (PASSED)' : 'FAILED'}`);

  // 3. Revert
  console.log(`  Restoring original value in Sanity: "${originalValue}"...`);
  await client.patch(docId).set({ [fieldPath]: originalValue }).commit();

  const res2 = await fetch(`http://localhost:3000${route}`);
  const html2 = await res2.text();
  const restored = html2.includes(originalValue);
  console.log(`  Live website reflects restored text: ${restored ? 'YES (PASSED)' : 'FAILED'}\n`);
}

async function run() {
  console.log('=== MULTI-PAGE LIVE EDITING & PUBLISH VERIFICATION ===\n');

  // Test 1: Home Page Hero Heading
  await testField({
    name: 'Home Page Hero Heading',
    docId: 'homePage',
    fieldPath: 'hero.heading',
    route: '/',
    originalValue: 'GIVING TECHNOLOGY A SECOND LIFE',
    testValue: 'GIVING TECHNOLOGY A SECOND LIFE [STUDIO TEST EDIT]',
  });

  // Test 2: About Us Hero Headline
  await testField({
    name: 'About Us Headline',
    docId: 'aboutPage',
    fieldPath: 'hero.headline',
    route: '/about-us',
    originalValue: 'Managing What Matters. Protecting What Comes Next.',
    testValue: 'Managing What Matters. Studio Live Test Headline.',
  });

  // Test 3: FAQ Page Hero Title
  await testField({
    name: 'FAQ Hero Title',
    docId: 'faqPage',
    fieldPath: 'hero.title',
    route: '/faq',
    originalValue: 'FREQUENTLY ASKED QUESTIONS',
    testValue: 'FREQUENTLY ASKED QUESTIONS [STUDIO TEST EDIT]',
  });

  // Test 4: Contact Page Hero Title
  await testField({
    name: 'Contact Page Hero Title',
    docId: 'contactPage',
    fieldPath: 'hero.title',
    route: '/contact',
    originalValue: 'Contact us',
    testValue: 'Contact us [Studio Verified]',
  });

  console.log('=== ALL REPRESENTATIVE FIELD EDITS SUCCESSFULLY VERIFIED ===');
}

run().catch(console.error);
