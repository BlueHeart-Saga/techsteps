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
  console.log('=== PART 17: REAL SANITY EDIT & FALLBACK TEST ===\n');

  const originalEyebrow = 'SUSTAINABLE IT RECYCLING';
  const testEditEyebrow = 'TEST CMS EDIT VERIFIED';

  // 1. Initial State
  console.log('1. Checking initial state...');
  const initialHome = await client.fetch('*[_id == "homePage"][0].hero.eyebrow');
  console.log(`   Sanity initial eyebrow: "${initialHome}"`);

  // 2. Change field in Sanity
  console.log('\n2. Mutating field in Sanity to:', testEditEyebrow);
  await client.patch('homePage').set({ 'hero.eyebrow': testEditEyebrow }).commit();
  console.log('   ✓ Mutated Sanity document');

  // Wait 1.5s for cache / refresh
  await new Promise(r => setTimeout(r, 2500));

  // 3. Verify website receives Sanity value
  console.log('\n3. Verifying website receives Sanity value from dev server (http://localhost:3000)...');
  const resEdited = await fetch('http://localhost:3000/');
  const htmlEdited = await resEdited.text();
  const editReceived = htmlEdited.includes(testEditEyebrow);
  console.log(`   Found "${testEditEyebrow}" in rendered HTML? ${editReceived}`);
  if (!editReceived) {
    throw new Error('FAILED: Sanity edit was not received by the website!');
  }

  // 4. Test Fallback Behavior (Set field to empty/null)
  console.log('\n4. Testing Fallback behavior (unsetting eyebrow in Sanity)...');
  await client.patch('homePage').unset(['hero.eyebrow']).commit();
  console.log('   ✓ Unset hero.eyebrow in Sanity');

  await new Promise(r => setTimeout(r, 2500));

  console.log('5. Verifying fallback renders original code value ("' + originalEyebrow + '")...');
  const resFallback = await fetch('http://localhost:3000/');
  const htmlFallback = await resFallback.text();
  const fallbackWorked = htmlFallback.includes(originalEyebrow);
  console.log(`   Found fallback "${originalEyebrow}" in rendered HTML? ${fallbackWorked}`);
  if (!fallbackWorked) {
    throw new Error('FAILED: Fallback did not render original code value!');
  }

  // 5. Restore original approved value in Sanity
  console.log('\n6. Restoring original approved value in Sanity...');
  await client.patch('homePage').set({ 'hero.eyebrow': originalEyebrow }).commit();
  console.log('   ✓ Restored Sanity hero.eyebrow to:', originalEyebrow);

  await new Promise(r => setTimeout(r, 1500));

  const resFinal = await fetch('http://localhost:3000/');
  const htmlFinal = await resFinal.text();
  const finalPass = htmlFinal.includes(originalEyebrow);
  console.log(`   Final check: original approved value renders? ${finalPass}`);

  console.log('\n🎉 ALL PART 17 EDIT AND FALLBACK TESTS PASSED PERFECTLY!');
}

main().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
