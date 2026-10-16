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
  let out = '';

  const targetDoc1Fields = ['email', 'eyebrow', 'headline', 'hours', 'imageAlt', 'phone', 'primaryButtonLink', 'primaryButtonText'];

  for (const doc of allDocs) {
    const matched = targetDoc1Fields.filter(f => doc[f] !== undefined);
    if (matched.length > 0) {
      out += `Document ID: ${doc._id} (_type: ${doc._type})\n`;
      out += `Matched fields (${matched.length}): ${matched.join(', ')}\n`;
      for (const f of matched) {
        out += `  ${f}: ${JSON.stringify(doc[f])}\n`;
      }
      out += '\n';
    }
  }

  // Also check if any nested objects have these fields, or if any other document has them
  fs.writeFileSync('scripts/doc1-matches.txt', out, 'utf8');
  console.log('Results written to scripts/doc1-matches.txt');
}

main().catch(console.error);
