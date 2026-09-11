export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', title: 'Case Study Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'clientIndustry', title: 'Client Industry / Sector', type: 'string' },
    { name: 'challenge', title: 'The Challenge', type: 'text', rows: 4 },
    { name: 'solution', title: 'Our Solution', type: 'text', rows: 4 },
    { name: 'results', title: 'Key Results & Metrics', type: 'array', of: [{ type: 'string' }] },
    { name: 'servicesUsed', title: 'Services Used', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
    { name: 'publishedAt', title: 'Published Date', type: 'date' },
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 3 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientIndustry',
    },
  },
};
