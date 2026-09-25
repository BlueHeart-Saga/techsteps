import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'CONTACT US' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Contact us' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Form Heading', type: 'string', initialValue: 'Send us a message' }),
        defineField({ name: 'subheading', title: 'Form Subheading', type: 'string' }),
        defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string', initialValue: 'Submit message' }),
        defineField({ name: 'image', title: 'Side Consultation Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'directLines',
      title: 'Direct Department Contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'department', title: 'Department Name', type: 'string' }),
            defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
            defineField({ name: 'email', title: 'Email Address', type: 'string' }),
            defineField({ name: 'hours', title: 'Hours / Availability', type: 'string' }),
          ],
        },
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
