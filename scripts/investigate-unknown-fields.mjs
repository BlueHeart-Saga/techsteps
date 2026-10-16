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
  console.log('=== FINDING DOCUMENTS WITH THE SPECIFIED FIELDS ===');
  
  const allDocs = await client.fetch('*[!(_id in path("_.**"))]');
  console.log(`Total documents fetched: ${allDocs.length}`);

  const targetDoc1Fields = ['email', 'eyebrow', 'headline', 'hours', 'imageAlt', 'phone', 'primaryButtonLink', 'primaryButtonText'];
  const targetDoc2Fields = ['approach', 'capabilities', 'hero', 'statistics', 'whatWeDo', 'whoWeAre'];

  console.log('\n--- SCANNING FOR DOCUMENT 1 FIELDS ---');
  for (const doc of allDocs) {
    const matched = targetDoc1Fields.filter(f => doc[f] !== undefined);
    if (matched.length > 0) {
      console.log(`\nDocument ID: ${doc._id} (_type: ${doc._type}) matches ${matched.length}/${targetDoc1Fields.length} fields: ${matched.join(', ')}`);
      for (const f of matched) {
        console.log(`  [${f}]:`, JSON.stringify(doc[f], null, 2));
      }
    }
  }

  console.log('\n--- SCANNING FOR DOCUMENT 2 FIELDS ---');
  for (const doc of allDocs) {
    const matched = targetDoc2Fields.filter(f => doc[f] !== undefined);
    if (matched.length > 0) {
      console.log(`\nDocument ID: ${doc._id} (_type: ${doc._type}) matches ${matched.length}/${targetDoc2Fields.length} fields: ${matched.join(', ')}`);
      for (const f of matched) {
        const val = doc[f];
        if (Array.isArray(val)) {
          console.log(`  [${f}]: Array of ${val.length} items`);
          console.log('   Sample:', JSON.stringify(val.slice(0, 2), null, 2));
        } else if (typeof val === 'object' && val !== null) {
          console.log(`  [${f}]: Object with keys: ${Object.keys(val).join(', ')}`);
          console.log('   Content:', JSON.stringify(val, null, 2));
        } else {
          console.log(`  [${f}]:`, JSON.stringify(val));
        }
      }
    }
  }

  console.log('\n--- SCANNING ALL DOCUMENTS FOR UNKNOWN FIELDS COMPARED TO SCHEMAS ---');
  // Also check if any other documents have unknown fields in general
}

main().catch(console.error);
