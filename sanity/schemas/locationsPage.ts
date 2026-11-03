import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'locationsPage',
  title: 'Locations Overview Page',
  type: 'document',

  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      initialValue: 'UK IT Equipment Recycling & Collection Locations | TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Free, secure, and carbon-negative IT equipment recycling collections across all 26 UK metro hubs and regions. ADISA-certified data destruction, WEEE compliance, and zero-landfill guarantee.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'NATIONWIDE UK COVERAGE',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'UK IT Recycling & Collection Locations',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Rapid, GPS-tracked IT collections from your doorstep across England, Scotland, Wales and Northern Ireland. Free collection for 10 or more qualifying items.',
    }),
    defineField({
      name: 'faqs',
      title: 'Master Locations FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'metaTitle',
    },
  },
});
