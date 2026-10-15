import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sustainabilityPage',
  title: 'Sustainability & ESG Page',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'SUSTAINABILITY & ESG' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'A Smarter Lifecycle for Every Asset.' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Key ESG Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Metric Value / Number', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix (e.g. %)', type: 'string' }),
            defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
            defineField({ name: 'note', title: 'Context / Note', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'number' },
          },
        },
      ],
    }),
    defineField({
      name: 'approach',
      title: 'Approach Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'steps',
          title: 'Approach Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'step', title: 'Step Number', type: 'string' }),
                defineField({ name: 'title', title: 'Step Title', type: 'string' }),
                defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
                defineField({ name: 'desc', title: 'Short Description', type: 'text', rows: 3 }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'lifecycleSection',
      title: 'Lifecycle Overview Header',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'lifecycleSteps',
      title: 'Circular Lifecycle Process Steps (7 Steps)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
            defineField({ name: 'desc', title: 'Short Description', type: 'text', rows: 2 }),
            defineField({ name: 'features', title: 'Feature Bullet Points', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'image', title: 'Step Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
            defineField({
              name: 'details',
              title: 'Extended Step Details',
              type: 'object',
              fields: [
                defineField({ name: 'headline', title: 'Headline', type: 'string' }),
                defineField({ name: 'bulletPoints', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'metric', title: 'Key Metric', type: 'string' }),
                defineField({ name: 'metricLabel', title: 'Metric Label', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'badge' },
          },
        },
      ],
    }),
    defineField({
      name: 'esgPillars',
      title: 'ESG Governance Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
            defineField({ name: 'description', title: 'Pillar Description', type: 'text', rows: 3 }),
            defineField({ name: 'tag', title: 'Badge / Tag', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' }),
        defineField({ name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' }),
        defineField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Sustainability Page',
        subtitle: 'Circular Economy & ESG Framework',
      };
    },
  },
});
