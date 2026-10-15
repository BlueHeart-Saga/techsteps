import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',

  fields: [
    // =========================================================
    // SEO
    // =========================================================
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),

    // =========================================================
    // 1. BUILDING HERO SECTION
    // =========================================================
    defineField({
      name: 'buildingHero',
      title: '1. Building Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'imageUrl',
          title: 'Hero Image URL',
          type: 'string',
          initialValue: '/images/about/building (1).webp',
        }),
        defineField({
          name: 'image',
          title: 'Hero Image (Sanity Upload)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          initialValue: 'TechSteps secure IT disposal and recycling facility',
        }),
      ],
    }),

    // =========================================================
    // 2. CLEANER, SMARTER TOMORROW / SHREDDING PROVIDER
    // =========================================================
    defineField({
      name: 'cleanerSmarter',
      title: '2. Leading Provider / Cleaner Smarter Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Main Heading',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'paragraphs',
          title: 'Description Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
        }),
        defineField({
          name: 'values',
          title: 'Value Indicators',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'icon', title: 'Icon URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // =========================================================
    // 3. TECHNOLOGY WITH A PURPOSE
    // =========================================================
    defineField({
      name: 'technologyPurpose',
      title: '3. Technology With a Purpose Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Technology With a Purpose',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'imageUrl',
          title: 'Technician Image URL',
          type: 'string',
          initialValue: '/images/about/about hero.webp',
        }),
        defineField({
          name: 'image',
          title: 'Technician Image (Sanity Upload)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          initialValue: 'TechSteps technician wearing branded uniform',
        }),
      ],
    }),

    // =========================================================
    // 4. NATIONWIDE NETWORK, LOCAL EXPERTISE / BRIGHTER FUTURE
    // =========================================================
    defineField({
      name: 'nationwideNetwork',
      title: '4. Nationwide Network & Coverage Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Nationwide network, local expertise',
        }),
        defineField({
          name: 'description',
          title: 'Description Paragraph',
          type: 'text',
          rows: 5,
        }),
        defineField({
          name: 'imageUrl',
          title: 'Section Image URL',
          type: 'string',
          initialValue: '/images/about/More Than Recycling. A Brighter Future. (1).webp',
        }),
        defineField({
          name: 'image',
          title: 'Section Image (Sanity Upload)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          initialValue: 'Hand holding recovered IT components and hardware',
        }),
      ],
    }),

    // =========================================================
    // 5. BUILT ON TRUST. DRIVEN BY IMPACT.
    // =========================================================
    defineField({
      name: 'trustAndImpact',
      title: '5. Built on Trust & Values Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Built on Trust. Driven by Impact.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'cards',
          title: 'Value Dashboard Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Card Title', type: 'string' }),
                defineField({ name: 'imageUrl', title: 'Card Image URL', type: 'string' }),
                defineField({ name: 'imageAlt', title: 'Card Image Alt Text', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // =========================================================
    // 6. COMMITTED TO SUSTAINABILITY / PEOPLE PLANET PROGRESS
    // =========================================================
    defineField({
      name: 'sustainabilityCommitment',
      title: '6. Sustainability Commitment & Metrics Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Committed to sustainability: 0% landfill shredding',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
        }),
        defineField({
          name: 'imageUrl',
          title: 'Section Image URL',
          type: 'string',
          initialValue: '/images/about/People. Planet. Progress. (1).webp',
        }),
        defineField({
          name: 'image',
          title: 'Section Image (Sanity Upload)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          initialValue: 'Hand holding plant seedling in soil',
        }),
        defineField({
          name: 'metrics',
          title: 'Three Key Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Metric Value (e.g. 100K+)', type: 'string' }),
                defineField({ name: 'label', title: 'Metric Label (e.g. Devices Processed)', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // =========================================================
    // 7. JOURNEY & MILESTONES (FROM A SIMPLE IDEA TO BIGGER IMPACT)
    // =========================================================
    defineField({
      name: 'journey',
      title: '7. Journey & Milestones Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'From a Simple Idea to a Bigger Impact.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'milestones',
          title: 'Timeline Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'step', title: 'Step Index (0, 1, 2, 3)', type: 'number' }),
                defineField({ name: 'title', title: 'Milestone Title', type: 'string' }),
                defineField({ name: 'description', title: 'Milestone Description', type: 'string' }),
                defineField({ name: 'imageUrl', title: 'Node Image URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // =========================================================
    // 8. CTA SECTION
    // =========================================================
    defineField({
      name: 'cta',
      title: '8. Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: "Let's Build a More Responsible Technology Future" }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'buttonText', title: 'Primary Button Text', type: 'string', initialValue: 'Talk to Our Team' }),
        defineField({ name: 'buttonLink', title: 'Primary Button Link', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Request a Collection' }),
        defineField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string', initialValue: '/request-a-collection' }),
      ],
    }),

  ],

  preview: {
    select: {
      title: 'cleanerSmarter.heading',
      subtitle: 'technologyPurpose.heading',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title || 'About Techsteps',
        subtitle: subtitle || 'About Us Page',
      };
    },
  },
});