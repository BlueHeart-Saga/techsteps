import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Main Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'OUR SERVICES' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Solutions Across the Technology Lifecycle' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'divisionsShowcase',
      title: 'Divisions Showcase Section Header',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Service Divisions' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'One Partner. Multiple Solutions.' }),
      ],
    }),
    defineField({
      name: 'lifecycle',
      title: 'Lifecycle Journey Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Process' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'From First Collection to Final Outcome.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'steps',
          title: 'Process Steps (6 Steps)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'step', title: 'Step Name (e.g. Collect)', type: 'string' }),
                defineField({ name: 'number', title: 'Step Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'desc', title: 'Description', type: 'string' }),
                defineField({ name: 'image', title: 'Step Image', type: 'image', options: { hotspot: true } }),
              ],
              preview: {
                select: {
                  title: 'step',
                  subtitle: 'desc',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Why Choose Techsteps (Pillars)',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Philosophy' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why Organisations Choose Techsteps' }),
        defineField({
          name: 'items',
          title: 'Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
                defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'icon', title: 'Icon (lock, star, leaf, check)', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'desc',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Get Started' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: "Let's Find the Right Solution for Your Organisation." }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Get In Touch →' }),
        defineField({ name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Request a Collection' }),
        defineField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string', initialValue: '/request-a-quote' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Services Main Page',
        subtitle: 'Overview of all 4 divisions and 27 certified services',
      };
    },
  },
});
