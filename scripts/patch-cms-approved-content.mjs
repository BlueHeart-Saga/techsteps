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

const serviceAboutImages = {
  'secure-document-storage': '/images/services/Secure Document Storage.webp',
  'tape-and-media-storage': '/images/services/Tape and Media Storage.webp',
  'heritage-storage-services': '/images/services/Heritage Storage Services.webp',
  'vault-storage': '/images/services/Vault Storage.webp',
  'secure-it-disposal': '/images/services/secure-it-disposal.webp',
  'secure-collection-services': '/images/services/secure-collection-services.webp',
  'it-asset-disposition-services': '/images/services/it-asset-disposition-services.webp',
  'it-asset-tracking-services': '/images/services/it-asset-tracking-services.webp',
  'remarketing-recycling': '/images/services/remarketing-recycling.webp',
  'ultra-secure-hard-drive-destruction': '/images/services/ultra-secure-hard-drive-destruction.webp',
  'home-shredding': '/images/services/home-shredding.webp',
  'on-site-shredding': '/images/services/on-site-shredding.webp',
  'off-site-shredding': '/images/services/off-site-shredding.webp',
  'product-shredding': '/images/services/product-shredding.webp',
  'simpler-recycling': '/images/services/simpler-recycling.webp',
  'simpler-recycling-services': '/images/services/simpler-recycling.webp',
  'disposal-services': '/images/services/disposal-services.webp',
  'cardboard-recycling': '/images/services/cardboard-recycling.webp',
  'dry-mixed-recycling': '/images/services/dry-mixed-recycling.webp',
  'business-relocations': '/images/services/business-relocations.webp',
  'laboratory-relocations-storage': '/images/services/laboratory-relocations-storage.webp',
  'heritage-relocations-storage': '/images/services/heritage-relocations-storage.webp',
  'europe-international-domestic-moves': '/images/services/europe-international-domestic-moves.webp',
  'it-relocations-specialist': '/images/services/it-relocations-specialist.webp',
  'project-management': '/images/services/project-management.webp',
  'document-scanning': '/images/services/Document Scanning.webp',
  'digital-mailroom': '/images/services/Digital Mailroom.webp',
  'cloud-document-management': '/images/services/Cloud Document Management.webp',
};

async function patchCms() {
  console.log('--- 1. Patching aboutPage ---');
  const aboutApproved = {
    metaTitle: 'About Us — Techsteps',
    metaDescription: 'TechSteps is an IT asset recovery and responsible recycling company. We partner with businesses to securely manage their retired technology.',
    buildingHero: {
      _type: 'object',
      imageUrl: '/images/about/building (1).webp',
      imageAlt: 'TechSteps secure IT disposal and recycling facility',
    },
    cleanerSmarter: {
      _type: 'object',
      heading:
        'We are one of the UK’s leading providers of secure and confidential shredding services. With years of experience in the industry, we have built an extensive customer base spanning all industries, public sectors, and sizes of businesses across the country.',
      paragraphs: [
        'We offer recycling and shredding for paper, plastics, textiles and digital media in highly secure environments so that you meet your data protection compliance requirements and can rest easy knowing that you are preventing fraud, identity and intellectual property theft with trusted experts.',
        'We have a breadth of knowledge and experience in the secure destruction of confidential waste. Our team is friendly, knowledgeable, and always looking for ways to help you.',
      ],
      values: [
        { _key: 'v1', title: 'Secure Handling', icon: '/images/about/Secure Handling.svg' },
        { _key: 'v2', title: 'Recover Value', icon: '/images/about/Recover Value.svg' },
        { _key: 'v3', title: 'Sustainable Impact', icon: '/images/about/Sustainable Impact.svg' },
      ],
    },
    technologyPurpose: {
      _type: 'object',
      heading: 'Technology With a Purpose',
      description: 'We give businesses a smarter way to manage their IT assets securely, responsibly, and sustainably.',
      imageUrl: '/images/about/about hero.webp',
      imageAlt: 'TechSteps technician wearing branded uniform',
    },
    nationwideNetwork: {
      _type: 'object',
      heading: 'Nationwide network, local expertise',
      description:
        'Restore Datashred boasts a robust network spanning the entire UK. With strategically located facilities, we ensure efficient and timely service, no matter where your business is located. With our local reach, we can tailor a service plan to perfectly suit your volume and frequency of document shredding, while our national presence guarantees the security and compliance expertise you expect for any data disposal needs, from paper shredding to hard drive destruction.',
      imageUrl: '/images/about/More Than Recycling. A Brighter Future. (1).webp',
      imageAlt: 'Hand holding recovered IT components and hardware',
    },
    trustAndImpact: {
      _type: 'object',
      heading: 'Built on Trust. Driven by Impact.',
      description:
        'Our values guide everything we do — from how we handle your data and technology to the environmental impact of our operations.',
      cards: [
        {
          _key: 'c1',
          title: 'Security First',
          imageUrl: '/images/about/Card 1_ Security First (Deep Forest Slate Theme).webp',
          imageAlt: 'Security First: secure asset handling and compliance dashboard',
        },
        {
          _key: 'c2',
          title: 'Environmental Responsibility',
          imageUrl: '/images/about/Card 2_ Environmental Responsibility (Emerald Green Theme).webp',
          imageAlt: 'Environmental Responsibility: recycling and responsible material recovery dashboard',
        },
        {
          _key: 'c3',
          title: 'Customer Focus',
          imageUrl: '/images/about/card 3.webp',
          imageAlt: 'Customer Focus: transparency, service quality, and reliability dashboard',
        },
        {
          _key: 'c4',
          title: 'Continuous Improvement',
          imageUrl: '/images/about/card-4 Deep Forest Theme.webp',
          imageAlt: 'Continuous Improvement: circular economy and performance metrics dashboard',
        },
      ],
    },
    sustainabilityCommitment: {
      _type: 'object',
      heading: 'Committed to sustainability: 0% landfill shredding',
      description:
        'Restore Datashred isn’t just about secure data destruction; we’re also passionate about protecting the environment. As a leading recycling business, we’re proud to work towards being Net Zero from our shredding activities by 2035 – a commitment our customers truly value. Furthermore, we are fully authorised by the Environment Agency to handle, transport, and recycle your company’s confidential materials. Choose Restore Datashred for peace of mind on both data security and environmental responsibility.',
      imageUrl: '/images/about/People. Planet. Progress. (1).webp',
      imageAlt: 'Hand holding plant seedling in soil',
      metrics: [
        { _key: 'm1', value: '100K+', label: 'Devices Processed' },
        { _key: 'm2', value: '500+', label: 'Businesses Served' },
        { _key: 'm3', value: '0%', label: 'To Landfill (Recoverable)' },
      ],
    },
    journey: {
      _type: 'object',
      heading: 'From a Simple Idea to a Bigger Impact.',
      description:
        'What started as a vision to make IT disposal more responsible and secure has grown into a trusted service for businesses across the UK. Today, we continue to expand our impact, helping organisations turn retired technology into new opportunities.',
      milestones: [
        {
          _key: 'j0',
          step: 0,
          title: 'Founded',
          description: 'With a vision for responsible IT disposal.',
          imageUrl: '/images/about/Founded.webp',
        },
        {
          _key: 'j1',
          step: 1,
          title: 'Expanded',
          description: 'Our recycling capabilities.',
          imageUrl: '/images/about/Expanded.webp',
        },
        {
          _key: 'j2',
          step: 2,
          title: 'Partnered',
          description: 'With businesses across the UK.',
          imageUrl: '/images/about/Partnered.webp',
        },
        {
          _key: 'j3',
          step: 3,
          title: 'Driving',
          description: 'Long-term environmental and economic impact.',
          imageUrl: '/images/about/Driving.webp',
        },
      ],
    },
    cta: {
      _type: 'object',
      title: "Let's Build a More Responsible Technology Future",
      description: 'Talk to our team about secure, sustainable and responsible IT asset management.',
      buttonText: 'Talk to Our Team',
      buttonLink: '/contact',
      secondaryButtonText: 'Request a Collection',
      secondaryButtonLink: '/request-a-collection',
    },
  };

  await client.patch('aboutPage').set(aboutApproved).commit();
  console.log('✅ aboutPage successfully patched with approved Astro content.');

  console.log('\n--- 2. Patching homePage ---');
  const homeApproved = {
    'hero.heading': 'Creating Value From Each Device',
    'hero.description': 'Techsteps securely reuse and recycle retired IT assets, reducing waste while recovering maximum value responsibly.',
    whyChoose: {
      _type: 'object',
      eyebrow: 'PROVEN EXCELLENCE',
      heading: 'Why Choose TechSteps?',
      description:
        'TechSteps combines secure handling, reliable service, complete lifecycle solutions, and sustainability to deliver dependable IT asset management for organisations across the UK.',
      features: [
        {
          _key: 'wc1',
          number: '01',
          title: 'Security & Compliance',
          description:
            'Secure handling of IT assets and sensitive information, supported by responsible processes and appropriate documentation.',
        },
        {
          _key: 'wc2',
          number: '02',
          title: 'Complete Lifecycle Solutions',
          description:
            'Integrated IT asset management, collection, and end-of-life services through a coordinated approach.',
        },
        {
          _key: 'wc3',
          number: '03',
          title: 'Sustainable Outcomes',
          description:
            'Promote responsible reuse, recycling, and resource management to support more sustainable business operations.',
        },
        {
          _key: 'wc4',
          number: '04',
          title: 'Reliable Service',
          description:
            'Dependable collection coordination, clear communication, and traceable processes with completion records where applicable.',
        },
      ],
      imageUrl: '/images/services/why choose us.webp',
      imageAlt: 'TechSteps team collaborating on certified IT lifecycle and compliance solutions',
    },
    sectorsSection: {
      _type: 'object',
      heading: 'Supporting Businesses Across Every Sector',
      description:
        'TechSteps provides secure, sustainable, and reliable IT asset lifecycle, certified data destruction, and compliance-driven solutions across different industries.',
    },
  };

  await client.patch('homePage').set(homeApproved).commit();
  console.log('✅ homePage successfully patched with approved Astro content.');

  console.log('\n--- 3. Patching leadershipPage ---');
  const leadershipApproved = {
    _id: 'leadershipPage',
    _type: 'leadershipPage',
    metaTitle: 'Leadership — TechSteps',
    metaDescription:
      'Meet the leadership team behind TechSteps and our commitment to secure, responsible and sustainable IT asset management.',
    hero: {
      _type: 'object',
      eyebrow: 'OUR LEADERSHIP',
      title: 'Leadership with',
      highlightedTitle: 'purpose.',
      subtitle:
        'Guiding TechSteps with integrity, innovation and a commitment to creating a more responsible technology lifecycle.',
      imageUrl: '/images/leadership/leadership-hero.png',
      imageAlt: 'TechSteps leadership team',
    },
    intro: {
      _type: 'object',
      label: 'OUR APPROACH',
      title: 'Leadership that puts',
      highlightedTitle: 'responsibility into action.',
      paragraphs: [
        'At TechSteps, leadership is about more than setting direction. It is about creating trust, making responsible decisions and building a business that delivers lasting value for our people, our customers and the planet.',
        'Our leadership team brings together experience across technology, operations and responsible asset management, with a shared focus on creating a more secure and sustainable technology lifecycle.',
      ],
    },
    team: {
      _type: 'object',
      label: 'THE PEOPLE BEHIND TECHSTEPS',
      title: 'Experience that',
      highlightedTitle: 'moves us forward.',
      subtitle:
        'Our leadership team brings together experience, expertise and a shared commitment to responsible technology management.',
      members: [
        {
          _key: 'm1',
          role: 'CHIEF EXECUTIVE OFFICER',
          name: 'Leadership Name',
          bio: 'Driving the vision and long-term direction of TechSteps, with a focus on responsible growth and customer trust.',
          imageUrl: '/images/leadership/leader-1.webp',
          imageAlt: 'TechSteps Chief Executive Officer',
        },
        {
          _key: 'm2',
          role: 'OPERATIONS DIRECTOR',
          name: 'Leadership Name',
          bio: 'Leading operational excellence and ensuring every stage of the technology lifecycle is managed responsibly.',
          imageUrl: '/images/leadership/leader-2.webp',
          imageAlt: 'TechSteps Operations Director',
        },
        {
          _key: 'm3',
          role: 'COMMERCIAL DIRECTOR',
          name: 'Leadership Name',
          bio: 'Building strong partnerships and creating solutions that deliver measurable value for our customers.',
          imageUrl: '/images/leadership/leader-3.webp',
          imageAlt: 'TechSteps Commercial Director',
        },
      ],
    },
    principles: {
      _type: 'object',
      eyebrow: 'WHAT GUIDES US',
      title: 'Principles that',
      highlightedTitle: 'shape our leadership.',
      description:
        'The way we lead is grounded in clear principles that influence how we work, make decisions and create value for our customers, people and planet.',
      items: [
        {
          _key: 'p1',
          number: '01',
          title: 'Integrity',
          description:
            'We act with honesty and transparency, building relationships based on trust and accountability.',
        },
        {
          _key: 'p2',
          number: '02',
          title: 'Responsibility',
          description:
            'We take responsibility for the technology we manage and the environmental impact of every decision we make.',
        },
        {
          _key: 'p3',
          number: '03',
          title: 'Innovation',
          description:
            'We continuously improve our processes and technology to create smarter, safer and more sustainable solutions.',
        },
        {
          _key: 'p4',
          number: '04',
          title: 'Long-term thinking',
          description:
            'We focus on creating lasting value rather than short-term solutions, for our customers, people and the planet.',
        },
      ],
    },
    action: {
      _type: 'object',
      eyebrow: 'LEADERSHIP IN ACTION',
      title: 'Turning responsible',
      highlightedTitle: 'ideas into action.',
      badgeNumber: '01',
      badgeText: 'ONE TEAM\nONE PURPOSE',
      imageUrl: '/images/leadership/leadership-action.webp',
      imageAlt: 'TechSteps team working together',
      paragraphs: [
        'Great leadership is measured by what it enables people and organisations to achieve. At TechSteps, our leaders work closely with teams and customers to turn responsible technology management into measurable outcomes.',
        'From secure data handling and IT asset recovery to reuse, refurbishment and responsible recycling, we focus on creating value at every stage of the technology lifecycle.',
      ],
      linkText: 'Talk to our team',
      linkUrl: '/contact',
    },
    commitment: {
      _type: 'object',
      label: 'OUR COMMITMENT',
      title: 'Leading with a focus on',
      highlightedTitle: 'what matters most.',
      description:
        'Responsible leadership means considering the wider impact of every decision. We bring people, technology and sustainability together to create a better future for the technology lifecycle.',
      cards: [
        {
          _key: 'c1',
          number: '01',
          icon: '♧',
          title: 'People',
          description:
            'Creating a culture where people can contribute, grow and make a meaningful difference.',
          isFeatured: false,
        },
        {
          _key: 'c2',
          number: '02',
          icon: '◌',
          title: 'Planet',
          description:
            'Making responsible choices that reduce waste, extend asset lifecycles and support a circular technology economy.',
          isFeatured: true,
        },
        {
          _key: 'c3',
          number: '03',
          icon: '⌁',
          title: 'Technology',
          description:
            'Using expertise and innovation to make technology management more secure, efficient and sustainable.',
          isFeatured: false,
        },
      ],
    },
    cta: {
      _type: 'object',
      title: "Let's Build a More Responsible Technology Future",
      description:
        'Talk to our team about secure, sustainable and responsible IT asset management.',
      primaryText: 'Talk to Our Team',
      primaryHref: '/contact',
      secondaryText: 'Request a Collection',
      secondaryHref: '/request-a-collection',
    },
  };

  await client.createOrReplace(leadershipApproved);
  console.log('✅ leadershipPage successfully created/patched in Sanity.');

  console.log('\n--- 4. Updating Service aboutImages in Sanity ---');
  const services = await client.fetch('*[_type == "service" && !(_id in path("drafts.**"))]{ _id, slug, title }');
  console.log(`Found ${services.length} services in Sanity.`);

  for (const s of services) {
    const rawSlug = s.slug?.current || s.slug || '';
    const cleanSlug = rawSlug.toLowerCase().replace(/-(uk|services|services-uk)$/, '');
    const matchedImg =
      serviceAboutImages[rawSlug] ||
      serviceAboutImages[cleanSlug] ||
      serviceAboutImages[rawSlug.toLowerCase()];

    if (matchedImg) {
      await client.patch(s._id).set({ aboutImage: matchedImg }).commit();
      console.log(`Updated service ${rawSlug} -> ${matchedImg}`);
    } else {
      console.log(`No explicit .webp mapping for service ${rawSlug}, skipping.`);
    }
  }

  console.log('\n🎉 ALL CMS DOCUMENTS PATCHED WITH APPROVED CONTENT.');
}

patchCms().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
