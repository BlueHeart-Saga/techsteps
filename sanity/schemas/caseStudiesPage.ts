import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Overview Page',
  type: 'document',

  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      initialValue: 'Case Studies & Client Outcomes | Real-World ITAD & Digitization | Techsteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Review verified outcomes from Techsteps client engagements across banking, healthcare, and enterprise data centre relocations.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'CLIENT RESULTS',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'Verified Case Studies',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore how Techsteps resolves high-stakes compliance, data sanitisation, and migration challenges for enterprise and public sector organisations.',
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'metaTitle',
    },
  },
});
