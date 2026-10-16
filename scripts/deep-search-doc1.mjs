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
  const allDocs = await client.fetch('*'); // fetches EVERYTHING including drafts and system docs
  console.log(`Fetched total ${allDocs.length} documents.`);

  const targetDoc1Fields = ['email', 'eyebrow', 'headline', 'hours', 'imageAlt', 'phone', 'primaryButtonLink', 'primaryButtonText'];

  for (const doc of allDocs) {
    // Check top level
    const matched = targetDoc1Fields.filter(f => doc[f] !== undefined);
    if (matched.length > 0) {
      console.log(`Top-level match in ${doc._id} (_type: ${doc._type}): ${matched.join(', ')}`);
    }

    // Check nested objects
    for (const [key, val] of Object.entries(doc)) {
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        const nestedMatched = targetDoc1Fields.filter(f => val[f] !== undefined);
        if (nestedMatched.length >= 2) {
          console.log(`Nested object match in ${doc._id} -> [${key}] (${nestedMatched.length}): ${nestedMatched.join(', ')}`);
          for (const f of nestedMatched) {
            console.log(`   ${f}:`, JSON.stringify(val[f]));
          }
        }
      }
    }
  }
}

main().catch(console.error);
