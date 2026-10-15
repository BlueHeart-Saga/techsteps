import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'requestCollectionPage',
  title: 'Request a Collection Page',
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
        defineField({ name: 'title', title: 'Page Heading', type: 'string', initialValue: 'Book your collection' }),
        defineField({ name: 'description', title: 'Subheading / Description', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Request Collection Page',
        subtitle: 'Booking & Quotation Copy',
      };
    },
  },
});
