import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const types = ['faqPage', 'sustainabilityPage', 'investorsPage', 'contactPage', 'requestCollectionPage', 'testimonial'];
  for (const t of types) {
    const res = await client.fetch(`*[_type == "${t}"]`);
    console.log(`Type ${t} count in Sanity:`, res.length);
  }
}

run();
