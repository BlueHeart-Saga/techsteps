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
        defineField({ name: 'title', title: 'Form Section Heading', type: 'string', initialValue: 'Book your collection' }),
        defineField({ name: 'description', title: 'Form Subheading / Description', type: 'text', rows: 3 }),
        defineField({ name: 'topHeading', title: 'Top Hero Heading', type: 'string', initialValue: 'Book Your IT Asset Collection' }),
        defineField({ name: 'topDescription', title: 'Top Hero Description', type: 'text', rows: 3, initialValue: 'Arrange a secure, reliable collection of your IT equipment with TechSteps. Tell us what you need collected and our team will coordinate the next steps.' }),
        defineField({ name: 'topButtonText', title: 'Primary Action Button Text', type: 'string', initialValue: 'Schedule Collection' }),
        defineField({ name: 'topButtonLink', title: 'Primary Action Button Link', type: 'string', initialValue: '#collection-booking-form' }),
        defineField({ name: 'topSecondaryButtonText', title: 'Secondary Action Button Text', type: 'string', initialValue: 'Contact Us' }),
        defineField({ name: 'topSecondaryButtonLink', title: 'Secondary Action Button Link', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'topImageUrl', title: 'Top Hero Desktop Image URL', type: 'string', initialValue: '/images/hero/Request a collection.webp' }),
        defineField({ name: 'topMobileImageUrl', title: 'Top Hero Mobile Image URL', type: 'string', initialValue: '/images/hero/Request a collection hero.webp' }),
        defineField({ name: 'topImageAlt', title: 'Top Hero Image Alt Text', type: 'string', initialValue: 'TechSteps IT asset collection' }),
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
