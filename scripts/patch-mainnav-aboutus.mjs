import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(`${home}/.config/sanity/config.json`, 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function run() {
  // Fetch current siteSettings
  const settings = await client.fetch('*[_type == "siteSettings"][0]{ _id, mainNav }');
  if (!settings) {
    console.error('siteSettings document not found.');
    process.exit(1);
  }

  console.log('Current mainNav order:');
  (settings.mainNav || []).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.label} → ${item.externalUrl || (item.internalRef ? '[ref]' : '')}`);
  });

  // Reorder: move "About Us" to be just before "Contact"
  const nav = [...(settings.mainNav || [])];
  const aboutIdx = nav.findIndex(n => n.label?.toLowerCase().includes('about'));
  const contactIdx = nav.findIndex(n => n.label?.toLowerCase().includes('contact'));

  if (aboutIdx === -1) {
    console.log('No "About Us" item found in mainNav.');
    process.exit(0);
  }

  if (contactIdx === -1) {
    console.log('No "Contact" item found in mainNav.');
    process.exit(0);
  }

  // Remove About Us from its current position and insert just before Contact
  const [aboutItem] = nav.splice(aboutIdx, 1);
  // After removal, find new index of Contact
  const newContactIdx = nav.findIndex(n => n.label?.toLowerCase().includes('contact'));
  nav.splice(newContactIdx, 0, aboutItem);

  console.log('\nNew mainNav order:');
  nav.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.label}`);
  });

  // Patch the Sanity document
  await client.patch(settings._id).set({ mainNav: nav }).commit();
  console.log('\n✓ Successfully updated mainNav in Sanity siteSettings.');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
