import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectorsPage',
  title: 'Industry Sectors Main Page',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'SECTOR EXPERTISE' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Sectors' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Request Sector Consultation' }),
        defineField({ name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string', initialValue: '/request-a-quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Explore Sectors' }),
        defineField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string', initialValue: '#sector-intro' }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Approach & Framework Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge Label', type: 'string', initialValue: 'Our Approach & Framework' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Solutions Built Around Your Organisation' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Speak with Sector Lead' }),
        defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/contact' }),
      ],
    }),
    defineField({
      name: 'sectorsSection',
      title: 'Sectors Header Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Industries' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Sectors We Serve' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Security-First Philosophy Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Philosophy' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Security Is Part of Every Lifecycle' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'principles',
          title: 'Principles',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Principle Label (e.g. Protect)', type: 'string' }),
                defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
              ],
              preview: {
                select: {
                  title: 'label',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Work With Techsteps' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: "Let's Build the Right Solution for Your Sector." }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Get In Touch →' }),
        defineField({ name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Explore Our Services' }),
        defineField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string', initialValue: '/services' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Industry Sectors Main Page',
        subtitle: 'Overview of all 8 industry sectors',
      };
    },
  },
});
