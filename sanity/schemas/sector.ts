export default {
  name: 'sector',
  title: 'Sector',
  type: 'document',

  fields: [
    // =========================================================
    // BASIC / HERO
    // =========================================================

    {
      name: 'title',
      title: 'Sector Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'heroAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
    },

    // =========================================================
    // INDUSTRY CONTEXT / CHALLENGES
    // =========================================================

    {
      name: 'challengesSection',
      title: 'Industry Challenges Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        },

        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },

        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        },
      ],
    },

    {
      name: 'challenges',
      title: 'Industry Challenges',
      type: 'array',

      of: [
        {
          type: 'object',
          title: 'Challenge',

          fields: [
            {
              name: 'title',
              title: 'Challenge Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },

            {
              name: 'description',
              title: 'Challenge Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],

          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },

    // =========================================================
    // SOLUTIONS / SECURITY
    // =========================================================

    {
      name: 'solutionsSection',
      title: 'Solutions Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        },

        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
      ],
    },

    {
      name: 'solutions',
      title: 'Tailored Solutions',
      type: 'array',

      of: [
        {
          type: 'object',
          title: 'Solution',

          fields: [
            {
              name: 'title',
              title: 'Solution Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },

            {
              name: 'description',
              title: 'Solution Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],

          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },

    {
      name: 'securitySection',
      title: 'Security Protocols Section',
      type: 'object',

      fields: [
        {
          name: 'heading',
          title: 'Security Heading',
          type: 'string',
        },

        {
          name: 'standardsLabel',
          title: 'Standards Label',
          type: 'string',
        },
      ],
    },

    {
      name: 'securityConsiderations',
      title: 'Key Security Considerations',
      type: 'array',

      of: [
        {
          type: 'string',
        },
      ],
    },

    {
      name: 'complianceStandards',
      title: 'Compliance Standards & Certifications',
      type: 'array',

      of: [
        {
          type: 'string',
        },
      ],
    },

    {
      name: 'howTechstepsHelps',
      title: 'How Techsteps Helps',
      type: 'text',
      rows: 4,
    },

    // =========================================================
    // BENEFITS
    // =========================================================

    {
      name: 'benefitsSection',
      title: 'Benefits Section',
      type: 'object',

      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
      ],
    },

    {
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',

      of: [
        {
          type: 'string',
        },
      ],
    },

    // =========================================================
    // CASE STUDY
    // =========================================================

    {
      name: 'caseStudySection',
      title: 'Case Study Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        },

        {
          name: 'linkText',
          title: 'Case Study Link Text',
          type: 'string',
        },
      ],
    },

    // =========================================================
    // RELATED SERVICES
    // =========================================================

    {
      name: 'relevantServices',
      title: 'Relevant Services',
      type: 'array',

      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'service',
            },
          ],
        },
      ],
    },

    // =========================================================
    // FAQ
    // =========================================================

    {
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',

      fields: [
        {
          name: 'heading',
          title: 'FAQ Heading',
          type: 'string',
        },

        {
          name: 'description',
          title: 'FAQ Description',
          type: 'text',
          rows: 3,
        },
      ],
    },

    {
      name: 'faqs',
      title: 'Sector Specific FAQs',
      type: 'array',

      of: [
        {
          type: 'object',
          title: 'FAQ',

          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },

            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],

          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    },

    // =========================================================
    // FINAL CTA
    // =========================================================

    {
      name: 'cta',
      title: 'Final CTA',
      type: 'object',

      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string',
        },

        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 4,
        },

        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
        },

        {
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
        },

        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
        },

        {
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string',
        },
      ],
    },

    // =========================================================
    // SEO
    // =========================================================

    {
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      validation: (Rule: any) => Rule.max(70),
    },

    {
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160),
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
};