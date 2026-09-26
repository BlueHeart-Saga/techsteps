import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'legalName', title: 'Legal Registered Name', type: 'string' }),
    defineField({ name: 'registrationNumber', title: 'Company Registration Number', type: 'string' }),
    defineField({ name: 'vatNumber', title: 'VAT Number', type: 'string' }),
    defineField({
      name: 'address',
      title: 'UK Head Office Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street Address', type: 'string' }),
        defineField({ name: 'city', title: 'City / Town', type: 'string' }),
        defineField({ name: 'county', title: 'County', type: 'string' }),
        defineField({ name: 'postcode', title: 'Postcode', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string', initialValue: 'United Kingdom' }),
      ],
    }),
    defineField({ name: 'phone', title: 'Primary Phone Number', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'email', title: 'Primary Contact Email', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'operatingHours', title: 'Operating Hours', type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'X (Twitter) URL', type: 'url' }),
      ],
    }),
    defineField({ name: 'defaultMetaTitle', title: 'Default Meta Title', type: 'string' }),
    defineField({ name: 'defaultMetaDescription', title: 'Default Meta Description', type: 'text', rows: 3 }),

    // =========================================================
    // MAIN NAVIGATION (CMS-Driven Navbar)
    // =========================================================
    defineField({
      name: 'mainNav',
      title: 'Main Navigation Bar Links',
      type: 'array',
      of: [{ type: 'customLink' }],
      description: 'Controls the links in the desktop and mobile navigation bars',
    }),

    // =========================================================
    // FOOTER CONFIGURATION (CMS-Driven Footer)
    // =========================================================
    defineField({
      name: 'footerServices',
      title: 'Footer Services Column Links',
      type: 'array',
      of: [{ type: 'customLink' }],
    }),
    defineField({
      name: 'footerSectors',
      title: 'Footer Industries Column Links',
      type: 'array',
      of: [{ type: 'customLink' }],
    }),
    defineField({
      name: 'footerCompany',
      title: 'Footer Company Column Links',
      type: 'array',
      of: [{ type: 'customLink' }],
    }),
    defineField({
      name: 'footerLegal',
      title: 'Footer Legal Bottom Links',
      type: 'array',
      of: [{ type: 'customLink' }],
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Notice',
      type: 'string',
      description: 'e.g. All rights reserved.',
    }),
    defineField({
      name: 'accreditationBadges',
      title: 'Global Trust & Accreditation Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Badge / Standard Name', type: 'string' }),
            defineField({ name: 'label', title: 'Full Title / Description', type: 'string' }),
            defineField({ name: 'tag', title: 'Tag / Code', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Techsteps UK',
        subtitle: subtitle || 'Site Settings',
      };
    },
  },
});
