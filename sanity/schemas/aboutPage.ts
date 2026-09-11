export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // SEO & Metadata
    { name: 'metaTitle', title: 'Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },

    // Hero Section
    { name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'ABOUT TECHSTEPS' },
    { name: 'heroHeadline', title: 'Hero Headline (H1)', type: 'string', initialValue: 'We Make Every Step Matter.', validation: (Rule: any) => Rule.required() },
    { name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 },
    { name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },

    // Who We Are Section
    { name: 'whoWeAreEyebrow', title: 'Who We Are Eyebrow', type: 'string', initialValue: 'WHO WE ARE' },
    { name: 'whoWeAreHeadline', title: 'Who We Are Headline', type: 'string', initialValue: 'Technology.\nInformation.\nResponsibility.' },
    { name: 'whoWeAreBody', title: 'Who We Are Body', type: 'text', rows: 5 },
    { name: 'whoWeAreImage', title: 'Who We Are Image', type: 'image', options: { hotspot: true } },

    // Our Purpose Section
    { name: 'purposeEyebrow', title: 'Our Purpose Eyebrow', type: 'string', initialValue: 'OUR PURPOSE' },
    { name: 'purposeHeadline', title: 'Our Purpose Headline', type: 'string', initialValue: 'We Create Meaningful Impact.' },
    { name: 'purposeSubheading', title: 'Our Purpose Subheading', type: 'string', initialValue: 'Every Solution Builds a Better Future.' },
    { name: 'purposeBody', title: 'Our Purpose Body', type: 'text', rows: 3 },
    {
      name: 'purposePrinciples',
      title: 'Purpose Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon Key', type: 'string' },
          ],
        },
      ],
    },

    // What We Stand For (Values) Section
    {
      name: 'values',
      title: 'Values (What We Stand For)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Value Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon Key', type: 'string' },
          ],
        },
      ],
    },

    // Our Approach Section
    { name: 'approachEyebrow', title: 'Our Approach Eyebrow', type: 'string', initialValue: 'OUR APPROACH' },
    { name: 'approachHeadline', title: 'Our Approach Headline', type: 'string', initialValue: 'One Partner. Every Step.' },
    { name: 'approachBody', title: 'Our Approach Body', type: 'text', rows: 3 },
    {
      name: 'approachSteps',
      title: 'Approach Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Step Number', type: 'string', placeholder: '01' },
            { name: 'title', title: 'Step Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    // Certifications & Compliance Section
    { name: 'complianceEyebrow', title: 'Compliance Eyebrow', type: 'string', initialValue: 'STANDARDS & GOVERNANCE' },
    { name: 'complianceHeadline', title: 'Compliance Headline', type: 'string', initialValue: 'Built on Trust. Backed by Standards.' },
    { name: 'complianceBody', title: 'Compliance Body', type: 'text', rows: 3 },
    {
      name: 'certifications',
      title: 'Verified Certifications & Accreditations',
      type: 'array',
      description: 'Add only verified certifications and accreditations.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Certification Name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'logo', title: 'Certification Logo / Badge Image', type: 'image' },
            { name: 'shortDescription', title: 'Short Description', type: 'string' },
            { name: 'link', title: 'Official Verification Link', type: 'url' },
          ],
        },
      ],
    },

    // Final CTA Section
    { name: 'ctaEyebrow', title: 'CTA Eyebrow', type: 'string', initialValue: "LET'S WORK TOGETHER" },
    { name: 'ctaHeadline', title: 'CTA Headline', type: 'string', initialValue: 'Ready to Take the Next Step?' },
    { name: 'ctaBody', title: 'CTA Body', type: 'text', rows: 3 },
    { name: 'ctaButtonLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Get In Touch →' },
    { name: 'ctaButtonUrl', title: 'Primary Button URL', type: 'string', initialValue: '/contact' },
    { name: 'ctaSecondaryButtonLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Request a Quote →' },
    { name: 'ctaSecondaryButtonUrl', title: 'Secondary Button URL', type: 'string', initialValue: '/request-a-quote' },
  ],
};
