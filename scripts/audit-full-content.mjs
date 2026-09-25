import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

function loadEnv() {
  try {
    const raw = fs.readFileSync('.env', 'utf-8');
    const env = {};
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        env[k] = v;
      }
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const token = env.SANITY_API_TOKEN || env.SANITY_TOKEN;

const client = createClient({
  projectId: env.SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: env.SANITY_DATASET || 'techsteps',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: token,
});

async function run() {
  const allDocs = await client.fetch('*[!(_id in path("drafts.**"))]');
  console.log(`=== TOTAL PUBLISHED SANITY DOCUMENTS: ${allDocs.length} ===`);

  const docMap = {};
  for (const doc of allDocs) {
    if (!docMap[doc._type]) docMap[doc._type] = [];
    docMap[doc._type].push(doc);
  }

  for (const [type, list] of Object.entries(docMap)) {
    console.log(`\nType: ${type} (${list.length} docs)`);
    for (const d of list) {
      const title = d.title || d.name || d.hero?.heading || d.hero?.title || '(no title)';
      const topKeys = Object.keys(d).filter(k => !k.startsWith('_'));
      console.log(`  - [${d._id}] "${title}" -> fields: [${topKeys.join(', ')}]`);
    }
  }
}

run().catch(console.error);
