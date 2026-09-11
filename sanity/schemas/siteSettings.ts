export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'companyName', title: 'Company Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'legalName', title: 'Legal Registered Name', type: 'string' },
    { name: 'registrationNumber', title: 'Company Registration Number', type: 'string' },
    { name: 'vatNumber', title: 'VAT Number', type: 'string' },
    {
      name: 'address',
      title: 'UK Head Office Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street Address', type: 'string' },
        { name: 'city', title: 'City / Town', type: 'string' },
        { name: 'county', title: 'County', type: 'string' },
        { name: 'postcode', title: 'Postcode', type: 'string' },
        { name: 'country', title: 'Country', type: 'string', initialValue: 'United Kingdom' },
      ],
    },
    { name: 'phone', title: 'Primary Phone Number', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'email', title: 'Primary Contact Email', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'operatingHours', title: 'Operating Hours', type: 'string' },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'X (Twitter) URL', type: 'url' },
      ],
    },
    { name: 'defaultMetaTitle', title: 'Default Meta Title', type: 'string' },
    { name: 'defaultMetaDescription', title: 'Default Meta Description', type: 'text', rows: 3 },
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'email',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title || 'Techsteps UK',
        subtitle: subtitle || 'Site Settings',
      };
    },
  },
};
