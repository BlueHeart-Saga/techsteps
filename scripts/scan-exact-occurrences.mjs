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
  const targetDoc1 = ['email', 'eyebrow', 'headline', 'hours', 'imageAlt', 'phone', 'primaryButtonLink', 'primaryButtonText'];
  const targetDoc2 = ['approach', 'capabilities', 'hero', 'statistics', 'whatWeDo', 'whoWeAre'];

  // Check every published doc and every draft doc
  const docs = await client.fetch('*');
  console.log(`Checking ${docs.length} total documents for exact matches...`);

  for (const doc of docs) {
    const d1Matched = targetDoc1.filter(k => doc[k] !== undefined);
    const d2Matched = targetDoc2.filter(k => doc[k] !== undefined);

    if (d1Matched.length >= 3) {
      console.log(`[DOC1 MATCH ROOT]: ${doc._id} (_type: ${doc._type}) has:`, d1Matched);
    }
    if (d2Matched.length >= 3) {
      console.log(`[DOC2 MATCH ROOT]: ${doc._id} (_type: ${doc._type}) has:`, d2Matched);
    }

    // Check children
    for (const [k, v] of Object.entries(doc)) {
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        const subD1 = targetDoc1.filter(f => v[f] !== undefined);
        const subD2 = targetDoc2.filter(f => v[f] !== undefined);
        if (subD1.length >= 3) {
          console.log(`[DOC1 MATCH in ${doc._id}.${k}]:`, subD1);
        }
        if (subD2.length >= 3) {
          console.log(`[DOC2 MATCH in ${doc._id}.${k}]:`, subD2);
        }
      }
    }
  }
}

main().catch(console.error);
