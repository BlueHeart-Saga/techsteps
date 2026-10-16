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
  const allDocs = await client.fetch('*[!(_id in path("_.**"))]');
  let out = `Total documents fetched: ${allDocs.length}\n\n`;

  const targetDoc1Fields = ['email', 'eyebrow', 'headline', 'hours', 'imageAlt', 'phone', 'primaryButtonLink', 'primaryButtonText'];
  const targetDoc2Fields = ['approach', 'capabilities', 'hero', 'statistics', 'whatWeDo', 'whoWeAre'];

  out += '=== 1. DOCUMENTS MATCHING DOCUMENT 1 FIELDS ===\n';
  for (const doc of allDocs) {
    const matched = targetDoc1Fields.filter(f => doc[f] !== undefined);
    if (matched.length >= 4) { // documents that have most/all of these fields
      out += `\nDocument ID: ${doc._id} (_type: ${doc._type})\n`;
      out += `Matches: ${matched.join(', ')}\n`;
      for (const f of matched) {
        out += `  ${f}: ${JSON.stringify(doc[f])}\n`;
      }
    }
  }

  out += '\n\n=== 2. DOCUMENTS MATCHING DOCUMENT 2 FIELDS ===\n';
  for (const doc of allDocs) {
    const matched = targetDoc2Fields.filter(f => doc[f] !== undefined);
    if (matched.length >= 3) { // documents that have multiple of these fields
      out += `\nDocument ID: ${doc._id} (_type: ${doc._type})\n`;
      out += `Matches: ${matched.join(', ')}\n`;
      for (const f of matched) {
        out += `  ${f}: ${JSON.stringify(doc[f])}\n`;
      }
    }
  }

  fs.writeFileSync('scripts/unknown-fields-matches.txt', out, 'utf8');
  console.log('Results written to scripts/unknown-fields-matches.txt');
}

main().catch(console.error);
