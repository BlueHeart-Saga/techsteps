import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'location',
  title: 'UK Regional Location',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'City / Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Greater London', value: 'Greater London' },
          { title: 'South East', value: 'South East' },
          { title: 'East of England', value: 'East of England' },
          { title: 'Midlands', value: 'Midlands' },
          { title: 'North West', value: 'North West' },
          { title: 'Yorkshire', value: 'Yorkshire' },
          { title: 'North East', value: 'North East' },
          { title: 'Scotland', value: 'Scotland' },
          { title: 'Wales', value: 'Wales' },
          { title: 'Northern Ireland', value: 'Northern Ireland' },
        ],
      },
    }),
    defineField({
      name: 'countyOrArea',
      title: 'County / Catchment Area',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Page Title',
      type: 'string',
      description: 'Custom SEO title (e.g. Free IT Recycling Near Me in Brighton | Techsteps)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: 'Search engine snippet description',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (SEO Near Me)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rating',
      title: 'Customer Rating (e.g. 4.9)',
      type: 'string',
      initialValue: '4.9',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 35,
    }),
    defineField({
      name: 'localHubAddress',
      title: 'Local Hub / Logistics Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
      initialValue: '+44 1784 640216',
    }),
    defineField({
      name: 'leadTime',
      title: 'Average Collection Lead Time',
      type: 'string',
      initialValue: '24-48 Hours',
    }),
    defineField({
      name: 'boroughsOrDistricts',
      title: 'Covered Boroughs / Postcodes / Districts',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuredTestimonial',
      title: 'Featured Local Client Testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'author', title: 'Author Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'company', title: 'Company', type: 'string' }),
        defineField({ name: 'timeAgo', title: 'Time Ago (e.g. 2 weeks ago)', type: 'string' }),
        defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 3 }),
        defineField({ name: 'stars', title: 'Star Rating (1-5)', type: 'number', initialValue: 5 }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Location Specific FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
    },
  },
});
