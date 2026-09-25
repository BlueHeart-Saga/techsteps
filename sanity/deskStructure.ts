import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Techsteps CMS')
    .items([
      // 1. Singleton: Site Settings & Navigation
      S.listItem()
        .title('Site Settings & Navigation')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Company, Nav & Footer Settings')
        ),

      S.divider(),

      // 2. Core Pages (Singletons)
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content & Hero')
        ),

      S.listItem()
        .title('About Us Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page Content & Values')
        ),

      S.listItem()
        .title('FAQ Page')
        .id('faqPage')
        .child(
          S.document()
            .schemaType('faqPage')
            .documentId('faqPage')
            .title('FAQ Categories & Answers')
        ),

      S.listItem()
        .title('Sustainability & ESG Page')
        .id('sustainabilityPage')
        .child(
          S.document()
            .schemaType('sustainabilityPage')
            .documentId('sustainabilityPage')
            .title('Sustainability & Circular Framework')
        ),

      S.listItem()
        .title('Investors Page')
        .id('investorsPage')
        .child(
          S.document()
            .schemaType('investorsPage')
            .documentId('investorsPage')
            .title('Investors Case & Market Moats')
        ),

      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact Page & Form Copy')
        ),

      S.listItem()
        .title('Request Collection / Quote Page')
        .id('requestCollectionPage')
        .child(
          S.document()
            .schemaType('requestCollectionPage')
            .documentId('requestCollectionPage')
            .title('Booking & Quotation Copy')
        ),

      S.divider(),

      // 3. Operational Divisions & Services
      S.documentTypeListItem('division').title('Operational Divisions (4)'),
      S.documentTypeListItem('service').title('Certified Services (27)'),

      // 4. Industry Sectors
      S.documentTypeListItem('sector').title('Industry Sectors (4)'),

      S.divider(),

      // 5. Insights, Case Studies & Proof
      S.documentTypeListItem('article').title('Articles & Insights'),
      S.documentTypeListItem('caseStudy').title('Enterprise Case Studies'),
      S.documentTypeListItem('testimonial').title('Client Testimonials'),
      S.documentTypeListItem('stat').title('Accreditation Badges & Stats'),
    ]);