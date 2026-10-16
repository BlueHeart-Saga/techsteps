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
        defineField({ name: 'heroImage', title: 'Hero Background Image URL', type: 'string', initialValue: '/images/contact/Contact hero.webp' }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Details & Office Locations',
      type: 'object',
      fields: [
        defineField({
          name: 'address1',
          title: 'Primary Operating Hub (Address 1)',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Label', type: 'string', initialValue: 'Address 1' }),
            defineField({ name: 'address', title: 'Street & Postcode', type: 'text', rows: 2, initialValue: 'Unit B, Roebuck road\nHainault business park, IG6 3UF' }),
          ],
        }),
        defineField({
          name: 'address2',
          title: 'Secondary Logistics Hub (Address 2)',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Label', type: 'string', initialValue: 'Address 2' }),
            defineField({ name: 'address', title: 'Street & Postcode', type: 'text', rows: 2, initialValue: 'Rickerscote Hall Ln, Stafford ST17 4HF' }),
          ],
        }),
        defineField({ name: 'email', title: 'Contact Email', type: 'string', initialValue: 'enquiries@techsteps.co.uk' }),
        defineField({ name: 'phone', title: 'Direct Line Phone', type: 'string', initialValue: '+44 (0) 20 7946 0888' }),
        defineField({ name: 'freephone', title: 'Freephone Number', type: 'string', initialValue: '0800 083 4700' }),
        defineField({ name: 'socialHeading', title: 'Social Media Section Heading', type: 'string', initialValue: 'Follow our social media' }),
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
