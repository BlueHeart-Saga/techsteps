import { createClient } from '@sanity/client';

console.log('Testing public client...');
const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  try {
    const res = await Promise.race([
      client.fetch('*[_type == "siteSettings"][0]{ companyName }'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout 5s')), 5000))
    ]);
    console.log('Public fetch success:', res);
  } catch (e) {
    console.error('Public fetch failed:', e.message);
  }
}
run();
