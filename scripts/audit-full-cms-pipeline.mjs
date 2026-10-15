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

async function runAudit() {
  console.log('==============================================');
  console.log('🔍 FULL END-TO-END SANITY PIPELINE AUDIT');
  console.log('==============================================\n');

  // 1. Singletons Check
  const singletons = [
    'siteSettings',
    'homePage',
    'aboutPage',
    'leadershipPage',
    'servicesPage',
    'sectorsPage',
    'faqPage',
    'sustainabilityPage',
    'investorsPage',
    'contactPage',
    'requestCollectionPage',
  ];

  console.log('--- 1. Checking Singleton Documents in Sanity ---');
  for (const id of singletons) {
    const doc = await client.fetch(`*[_id == $id || _type == $id][0]`, { id });
    if (doc) {
      console.log(`  ✓ Singleton "${id}" EXISTS (ID: ${doc._id}, Type: ${doc._type})`);
    } else {
      console.error(`  ❌ Singleton "${id}" MISSING from dataset!`);
    }
  }

  // 2. Collections Check
  console.log('\n--- 2. Checking Collection Counts in Sanity ---');
  const collections = ['division', 'service', 'sector', 'stat', 'caseStudy', 'article', 'testimonial', 'legalPage'];
  for (const col of collections) {
    const count = await client.fetch(`count(*[_type == $col && !(_id in path("drafts.**"))])`, { col });
    console.log(`  ✓ Collection "${col}": ${count} document(s)`);
  }

  // 3. Inspect Specific Documents
  console.log('\n--- 3. Verifying Critical Page Documents Detail ---');
  const homeDoc = await client.fetch(`*[_id == "homePage"][0]`);
  console.log('  Home Page hero.heading:', homeDoc?.hero?.heading);
  console.log('  Home Page whyChoose.heading:', homeDoc?.whyChoose?.heading);
  console.log('  Home Page whyChoose.features count:', homeDoc?.whyChoose?.features?.length);
  console.log('  Home Page sectorsSection.heading:', homeDoc?.sectorsSection?.heading);

  const aboutDoc = await client.fetch(`*[_id == "aboutPage"][0]`);
  console.log('  About Page buildingHero.imageUrl:', aboutDoc?.buildingHero?.imageUrl);
  console.log('  About Page cleanerSmarter.heading:', aboutDoc?.cleanerSmarter?.heading?.substring(0, 40) + '...');
  console.log('  About Page technologyPurpose.heading:', aboutDoc?.technologyPurpose?.heading);
  console.log('  About Page nationwideNetwork.heading:', aboutDoc?.nationwideNetwork?.heading);
  console.log('  About Page trustAndImpact.cards count:', aboutDoc?.trustAndImpact?.cards?.length);
  console.log('  About Page sustainabilityCommitment.metrics count:', aboutDoc?.sustainabilityCommitment?.metrics?.length);
  console.log('  About Page journey.milestones count:', aboutDoc?.journey?.milestones?.length);
  console.log('  About Page cta.title:', aboutDoc?.cta?.title);

  const leadDoc = await client.fetch(`*[_id == "leadershipPage"][0]`);
  console.log('  Leadership Page hero.title:', leadDoc?.hero?.title);
  console.log('  Leadership Page team.members count:', leadDoc?.team?.members?.length);
  console.log('  Leadership Page principles.items count:', leadDoc?.principles?.items?.length);
  console.log('  Leadership Page action.title:', leadDoc?.action?.title);
  console.log('  Leadership Page commitment.cards count:', leadDoc?.commitment?.cards?.length);

  const services = await client.fetch(`*[_type == "service" && !(_id in path("drafts.**"))]{ slug, aboutImage }`);
  console.log(`  Services: ${services.length} services found.`);
  const withAboutImage = services.filter((s) => s.aboutImage);
  console.log(`  Services with aboutImage: ${withAboutImage.length}/${services.length}`);
}

runAudit().catch(console.error);
