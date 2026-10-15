import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'CONTACT US' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Contact us' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Form Heading', type: 'string', initialValue: 'Send us a message' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Page',
        subtitle: 'UK Head Office & Consultation',
      };
    },
  },
});
