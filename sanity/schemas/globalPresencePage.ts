import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'globalPresencePage',
  title: 'Global Presence Page',
  type: 'document',
  fields: [
    // 1. SEO
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      initialValue: 'Global Presence & Cross-Border Logistics — TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Discover TechSteps’ nationwide UK network and international logistics capabilities, managing secure IT lifecycle services across 150+ countries.',
    }),

    // 2. HERO
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'GLOBAL REACH & LOCAL EXPERTISE' }),
        defineField({ name: 'title', title: 'Title (Part 1)', type: 'string', initialValue: 'Worldwide standards.' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Title (Part 2)', type: 'string', initialValue: 'Nationwide precision.' }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Connecting secure UK facilities with international logistics, bonded customs storage, and certified cross-border asset transfers across 150+ countries.',
        }),
        defineField({ name: 'imageUrl', title: 'Hero Image URL', type: 'string', initialValue: '/images/hero/Europe & International Domestic Moves.webp' }),
        defineField({ name: 'image', title: 'Hero Image (Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'TechSteps global logistics and cross-border operations' }),
      ],
    }),

    // 3. GLOBAL INTRO
    defineField({
      name: 'intro',
      title: 'Global Introduction Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'OPERATIONAL FOOTPRINT' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Enterprise logistics with' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'unbroken custody.' }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        }),
      ],
    }),

    // 4. WORLDWIDE PRESENCE / REGIONS
    defineField({
      name: 'regions',
      title: 'Worldwide Presence & Regional Hubs',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'WHERE WE OPERATE' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Strategic hubs supporting' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'every location.' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'locations',
          title: 'Location Hubs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Hub Name', type: 'string' }),
                defineField({ name: 'type', title: 'Hub Type / Badge', type: 'string' }),
                defineField({ name: 'location', title: 'City / Region', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'coverage', title: 'Coverage Area', type: 'string' }),
                defineField({
                  name: 'features',
                  title: 'Key Operational Features',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // 5. GLOBAL CAPABILITIES
    defineField({
      name: 'capabilities',
      title: 'Global Capabilities Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'CROSS-BORDER SOLUTIONS' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Complete lifecycle solutions' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'wherever you operate.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Capability Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
                defineField({ name: 'linkUrl', title: 'Service Link URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // 6. STANDARDS & OPERATIONS
    defineField({
      name: 'standards',
      title: 'Global Standards & Compliance Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'COMPLIANCE & GOVERNANCE' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Certified standards for' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'total peace of mind.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Standards & Certifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Standard Code (e.g. ADISA, ISO 27001)', type: 'string' }),
                defineField({ name: 'name', title: 'Standard Full Name', type: 'string' }),
                defineField({ name: 'description', title: 'Scope & Description', type: 'text', rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    // 7. CTA
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Connect With Our Global Logistics Specialists' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Whether you require secure UK ITAD collection or cross-border asset transfers across Europe and beyond, our team is ready to assist.',
        }),
        defineField({ name: 'primaryText', title: 'Primary Button Text', type: 'string', initialValue: 'Speak to a Specialist' }),
        defineField({ name: 'primaryHref', title: 'Primary Button URL', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryText', title: 'Secondary Button Text', type: 'string', initialValue: 'Request a Collection' }),
        defineField({ name: 'secondaryHref', title: 'Secondary Button URL', type: 'string', initialValue: '/request-a-collection' }),
      ],
    }),
  ],
});
