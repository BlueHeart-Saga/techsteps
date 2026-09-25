import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'FAQ' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Frequently Asked Questions' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Category ID', type: 'string' }),
            defineField({ name: 'name', title: 'Category Name', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Unique ID', type: 'string' }),
            defineField({ name: 'category', title: 'Category ID', type: 'string' }),
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactCard',
      title: 'Help / Support CTA Card',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Card Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Card Description', type: 'text', rows: 2 }),
        defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string' }),
        defineField({ name: 'buttonUrl', title: 'Button URL', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'FAQ Page',
        subtitle: 'Enterprise Question & Answer Knowledge Base',
      };
    },
  },
});
