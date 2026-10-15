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

const specificMappings = {
  'document-management-services-uk': '/images/services/document management.webp',
  'document-storage': '/images/services/Secure Document Storage.webp',
  'it-asset-tracking-services-uk': '/images/services/it-asset-tracking-services.webp',
  'secure-collection-services-uk': '/images/services/secure-collection-services.webp',
  'tape-media-storage': '/images/services/Tape and Media Storage.webp',
};

async function patchRemaining() {
  const services = await client.fetch('*[_type == "service" && !(_id in path("drafts.**"))]{ _id, slug }');
  for (const s of services) {
    const slug = s.slug?.current || s.slug;
    if (specificMappings[slug]) {
      await client.patch(s._id).set({ aboutImage: specificMappings[slug] }).commit();
      console.log(`Patched ${slug} -> ${specificMappings[slug]}`);
    }
  }
}

patchRemaining().catch(console.error);
