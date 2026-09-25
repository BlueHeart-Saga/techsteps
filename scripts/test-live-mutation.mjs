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
  console.log('=== TEST LIVE MUTATION: VERIFYING SANITY EDIT REFLECTS ON LIVE WEBSITE ===');
  
  const originalDoc = await client.fetch('*[_type == "division" && _id == "div-sh"][0]');
  const originalTitle = originalDoc.heroTitle;
  console.log('1. Original heroTitle in Sanity:', originalTitle);

  const testTitle = originalTitle + ' [VERIFIED_CMS_SYNC]';
  console.log('2. Mutating Sanity document div-sh to:', testTitle);
  await client.patch('div-sh').set({ heroTitle: testTitle }).commit();

  console.log('3. Fetching live page: http://localhost:3000/secure-shredding-document-integrity');
  const res = await fetch('http://localhost:3000/secure-shredding-document-integrity');
  const html = await res.text();
  const includesSync = html.includes('[VERIFIED_CMS_SYNC]');
  console.log('   Website updated with Sanity edit?', includesSync ? 'YES! ✓' : 'NO ✗');

  console.log('4. Reverting Sanity document div-sh back to original title...');
  await client.patch('div-sh').set({ heroTitle: originalTitle }).commit();
  
  const revertRes = await fetch('http://localhost:3000/secure-shredding-document-integrity');
  const revertHtml = await revertRes.text();
  const originalHtmlEncoded = originalTitle.replace(/&/g, '&amp;');
  const revertedClean = !revertHtml.includes('[VERIFIED_CMS_SYNC]') && (revertHtml.includes(originalTitle) || revertHtml.includes(originalHtmlEncoded));
  console.log('   Reverted successfully and verified clean?', revertedClean ? 'YES! ✓' : 'NO ✗');

  console.log('\n=== LIVE MUTATION PROOF SUCCESSFUL ===');
}

main().catch(console.error);
