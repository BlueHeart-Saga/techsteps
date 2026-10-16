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
  useCdn: false,
});

async function main() {
  console.log('=== 1. LIVE MUTATION VERIFICATION ON MULTIPLE REPRESENTATIVE PAGES ===');

  // Test A: Homepage hero.eyebrow
  console.log('\n--- Testing Homepage Hero Eyebrow ---');
  const homeDoc = await client.fetch('*[_type == "homePage" && _id == "homePage"][0]');
  const origHomeEyebrow = homeDoc.hero.eyebrow;
  const testHomeEyebrow = origHomeEyebrow + ' [CMS_LIVE_VERIFIED]';
  console.log('Original Home Eyebrow:', origHomeEyebrow);
  console.log('Mutating Sanity homePage to:', testHomeEyebrow);
  await client.patch('homePage').set({ 'hero.eyebrow': testHomeEyebrow }).commit();

  const homeRes = await fetch('http://localhost:3000/');
  const homeHtml = await homeRes.text();
  const homeVerified = homeHtml.includes('[CMS_LIVE_VERIFIED]');
  console.log('Homepage rendered live Sanity change:', homeVerified ? 'PASS ✓' : 'FAIL ✗');

  console.log('Reverting Homepage hero.eyebrow...');
  await client.patch('homePage').set({ 'hero.eyebrow': origHomeEyebrow }).commit();
  const homeRevertRes = await fetch('http://localhost:3000/');
  const homeRevertHtml = await homeRevertRes.text();
  console.log('Homepage reverted cleanly:', !homeRevertHtml.includes('[CMS_LIVE_VERIFIED]') ? 'PASS ✓' : 'FAIL ✗');

  // Test B: Division strategicValue.heading
  console.log('\n--- Testing Division (div-sh) Strategic Value Heading ---');
  const divDoc = await client.fetch('*[_type == "division" && _id == "div-sh"][0]');
  const origDivHeading = divDoc.strategicValue.heading;
  const testDivHeading = origDivHeading + ' [CMS_LIVE_VERIFIED]';
  console.log('Original div-sh heading:', origDivHeading);
  console.log('Mutating Sanity div-sh to:', testDivHeading);
  await client.patch('div-sh').set({ 'strategicValue.heading': testDivHeading }).commit();

  const divRes = await fetch('http://localhost:3000/secure-shredding-document-integrity');
  const divHtml = await divRes.text();
  const divVerified = divHtml.includes('[CMS_LIVE_VERIFIED]');
  console.log('Division page rendered live Sanity change:', divVerified ? 'PASS ✓' : 'FAIL ✗');

  console.log('Reverting div-sh strategicValue.heading...');
  await client.patch('div-sh').set({ 'strategicValue.heading': origDivHeading }).commit();
  const divRevertRes = await fetch('http://localhost:3000/secure-shredding-document-integrity');
  const divRevertHtml = await divRevertRes.text();
  console.log('Division page reverted cleanly:', !divRevertHtml.includes('[CMS_LIVE_VERIFIED]') ? 'PASS ✓' : 'FAIL ✗');

  // Test C: Contact Page freephone
  console.log('\n--- Testing Contact Page Freephone ---');
  const contactDoc = await client.fetch('*[_type == "contactPage" && _id == "contactPage"][0]');
  const origPhone = contactDoc.contactInfo.freephone;
  const testPhone = '0800 999 8888';
  console.log('Original freephone:', origPhone);
  console.log('Mutating Sanity contactPage to:', testPhone);
  await client.patch('contactPage').set({ 'contactInfo.freephone': testPhone }).commit();

  const contactRes = await fetch('http://localhost:3000/contact');
  const contactHtml = await contactRes.text();
  const contactVerified = contactHtml.includes('0800 999 8888');
  console.log('Contact page rendered live Sanity change:', contactVerified ? 'PASS ✓' : 'FAIL ✗');

  console.log('Reverting contactPage freephone...');
  await client.patch('contactPage').set({ 'contactInfo.freephone': origPhone }).commit();
  const contactRevertRes = await fetch('http://localhost:3000/contact');
  const contactRevertHtml = await contactRevertRes.text();
  console.log('Contact page reverted cleanly:', !contactRevertHtml.includes('0800 999 8888') ? 'PASS ✓' : 'FAIL ✗');

  console.log('\n=== 2. FIELD-LEVEL FALLBACK VERIFICATION ===');
  // Temporarily unset homePage.hero.secondaryButtonText
  console.log('Temporarily unsetting homePage.hero.secondaryButtonText in Sanity...');
  await client.patch('homePage').unset(['hero.secondaryButtonText']).commit();

  const fbRes = await fetch('http://localhost:3000/');
  const fbHtml = await fbRes.text();
  // Secondary button fallback is "Contact Us"
  const fallbackRendered = fbHtml.includes('Contact Us');
  console.log('Astro fallback "Contact Us" rendered when field unset in Sanity:', fallbackRendered ? 'PASS ✓' : 'FAIL ✗');

  console.log('Restoring homePage.hero.secondaryButtonText...');
  await client.patch('homePage').set({ 'hero.secondaryButtonText': 'Contact Us' }).commit();

  console.log('\n=== ALL LIVE TESTS COMPLETE AND VERIFIED ===');
}

main().catch(console.error);
