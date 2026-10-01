export default {
  name: 'sector',
  title: 'Sector',
  type: 'document',

  fields: [
    // =========================================================
    // 1. BASIC / HERO
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
      title: 'Hero Eyebrow / Tagline',
      type: 'string',
      description: 'Small text displayed above the main hero heading.',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'summary',
      title: 'Hero Summary',
      type: 'text',
      rows: 3,
      description: 'Short description displayed below the hero heading.',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'heroAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
    },

    // Hero buttons
    {
      name: 'heroActions',
      title: 'Hero Buttons',
      type: 'object',

      fields: [
        {
          name: 'primaryText',
          title: 'Primary Button Text',
          type: 'string',
        },

        {
          name: 'primaryLink',
          title: 'Primary Button Link',
          type: 'string',
        },

        {
          name: 'secondaryText',
          title: 'Secondary Button Text',
          type: 'string',
        },

        {
          name: 'secondaryLink',
          title: 'Secondary Button Link',
          type: 'string',
        },
      ],
    },

    // =========================================================
    // 2. INDUSTRY CONTEXT / CHALLENGES
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
          validation: (Rule: any) => Rule.required(),
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

      validation: (Rule: any) => Rule.min(1),

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
              rows: 3,
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
    // 3. SOLUTIONS / HOW TECHSTEPS HELPS
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
          validation: (Rule: any) => Rule.required(),
        },

        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          description: 'Main paragraph explaining how TechSteps helps this sector.',
        },
      ],
    },

    {
      name: 'howTechstepsHelps',
      title: 'How TechSteps Helps',
      type: 'text',
      rows: 5,
      description: 'Main supporting paragraph for the solutions section.',
    },

    {
      name: 'solutions',
      title: 'Tailored Solutions',
      type: 'array',

      validation: (Rule: any) => Rule.min(1),

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
              rows: 3,
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
    // 4. SECURITY PROTOCOLS
    // =========================================================

    {
      name: 'securitySection',
      title: 'Security Protocols Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Security Eyebrow',
          type: 'string',
        },

        {
          name: 'heading',
          title: 'Security Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },

        {
          name: 'description',
          title: 'Security Description',
          type: 'text',
          rows: 3,
        },

        {
          name: 'standardsLabel',
          title: 'Standards Label',
          type: 'string',
          description: 'Example: Governing Standards',
        },
      ],
    },

    {
      name: 'securityConsiderations',
      title: 'Security Considerations',
      type: 'array',

      validation: (Rule: any) => Rule.min(1),

      of: [
        {
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },

    {
      name: 'complianceStandards',
      title: 'Compliance Standards',
      type: 'array',

      of: [
        {
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },

    // =========================================================
    // 5. BENEFITS
    // =========================================================

    {
      name: 'benefitsSection',
      title: 'Benefits Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        },

        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },

        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },

        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
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
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },

    // =========================================================
    // 6. CASE STUDY
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
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },

        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },

        {
          name: 'linkText',
          title: 'Case Study Link Text',
          type: 'string',
        },
      ],
    },

    {
      name: 'caseStudy',
      title: 'Sector Case Study',
      type: 'reference',
      to: [
        {
          type: 'caseStudy',
        },
      ],
      description: 'Select the case study that should appear on this sector page.',
    },

    // =========================================================
    // 7. RELATED SERVICES
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

      description: 'Services relevant to this particular sector.',
    },

    // =========================================================
    // 8. FAQ
    // =========================================================

    {
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        },

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
              rows: 4,
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
    // 9. FINAL CTA
    // =========================================================

    {
      name: 'cta',
      title: 'Final CTA',
      type: 'object',

      fields: [
        {
          name: 'eyebrow',
          title: 'CTA Eyebrow',
          type: 'string',
        },

        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
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
    // 10. SEO
    // =========================================================

    {
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',

      validation: (Rule: any) =>
        Rule.max(70).warning('Keep the SEO title under 70 characters.'),
    },

    {
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,

      validation: (Rule: any) =>
        Rule.max(160).warning('Keep the SEO description under 160 characters.'),
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