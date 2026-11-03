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
        .title('Leadership Page')
        .id('leadershipPage')
        .child(
          S.document()
            .schemaType('leadershipPage')
            .documentId('leadershipPage')
            .title('Leadership Team & Commitment')
        ),

      S.listItem()
        .title('Global Presence Page')
        .id('globalPresencePage')
        .child(
          S.document()
            .schemaType('globalPresencePage')
            .documentId('globalPresencePage')
            .title('Global Presence & Cross-Border Logistics')
        ),

      S.listItem()
        .title('Our People & Culture Page')
        .id('peopleCulturePage')
        .child(
          S.document()
            .schemaType('peopleCulturePage')
            .documentId('peopleCulturePage')
            .title('Our People, Culture & Growth')
        ),

      S.listItem()
        .title('Partners & Associations Page')
        .id('partnersPage')
        .child(
          S.document()
            .schemaType('partnersPage')
            .documentId('partnersPage')
            .title('Partners, Strategic Alliances & Trust Networks')
        ),

      S.listItem()
        .title('Certifications & Accreditations Page')
        .id('certificationsPage')
        .child(
          S.document()
            .schemaType('certificationsPage')
            .documentId('certificationsPage')
            .title('Certifications, Standards Register & Compliance')
        ),

      S.listItem()
        .title('Our Commitment Page')
        .id('ourCommitmentPage')
        .child(
          S.document()
            .schemaType('ourCommitmentPage')
            .documentId('ourCommitmentPage')
            .title('Our Commitment to Security, Quality & Sustainability')
        ),

      S.listItem()
        .title('Services Main Page')
        .id('servicesPage')
        .child(
          S.document()
            .schemaType('servicesPage')
            .documentId('servicesPage')
            .title('Services Main Page & Hero')
        ),

      S.listItem()
        .title('Industry Sectors Main Page')
        .id('sectorsPage')
        .child(
          S.document()
            .schemaType('sectorsPage')
            .documentId('sectorsPage')
            .title('Industry Sectors Main Page & Hero')
        ),

      S.listItem()
        .title('Case Studies Overview Page')
        .id('caseStudiesPage')
        .child(
          S.document()
            .schemaType('caseStudiesPage')
            .documentId('caseStudiesPage')
            .title('Verified Case Studies Overview')
        ),

      S.listItem()
        .title('Locations Overview Page')
        .id('locationsPage')
        .child(
          S.document()
            .schemaType('locationsPage')
            .documentId('locationsPage')
            .title('UK IT Recycling & Collection Locations Directory')
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
        .title('Request Collection Page')
        .id('requestCollectionPage')
        .child(
          S.document()
            .schemaType('requestCollectionPage')
            .documentId('requestCollectionPage')
            .title('Booking & Quotation Copy')
        ),

      S.divider(),

      // 3. Operational Divisions & Services
      S.listItem()
        .title('Services Overview (Main Page)')
        .id('servicesPageQuick')
        .child(
          S.document()
            .schemaType('servicesPage')
            .documentId('servicesPage')
            .title('Services Main Page')
        ),
      S.documentTypeListItem('division').title('Operational Divisions (4)'),
      S.documentTypeListItem('service').title('Certified Services & Collection (38)'),
      S.listItem()
        .title('IT Hardware Collection Pages (10)')
        .id('collectionServicesQuick')
        .child(
          S.documentList()
            .title('IT Collection Services & Equipment Pages')
            .filter('_type == "service" && slug.current in ["computer-collection", "laptop-collection", "server-collection", "mobile-device-collection", "monitor-screen-collection", "printer-copier-collection", "av-media-equipment-collection", "all-equipement", "book-pickup", "collection-overview"]')
        ),

      S.divider(),

      // 4. Industry Sectors
      S.listItem()
        .title('Sectors Overview (Main Page)')
        .id('sectorsPageQuick')
        .child(
          S.document()
            .schemaType('sectorsPage')
            .documentId('sectorsPage')
            .title('Industry Sectors Main Page')
        ),
      S.documentTypeListItem('sector').title('Industry Sectors (8)'),

      S.divider(),

      // 5. UK Regional Locations Hubs
      S.listItem()
        .title('Locations Directory (Overview Page)')
        .id('locationsPageQuick')
        .child(
          S.document()
            .schemaType('locationsPage')
            .documentId('locationsPage')
            .title('UK Locations Directory')
        ),
      S.documentTypeListItem('location').title('UK Regional Locations (26)'),

      S.divider(),

      // 6. Insights, Case Studies & Proof
      S.listItem()
        .title('Case Studies Overview Page')
        .id('caseStudiesPageQuick')
        .child(
          S.document()
            .schemaType('caseStudiesPage')
            .documentId('caseStudiesPage')
            .title('Case Studies Overview')
        ),
      S.documentTypeListItem('caseStudy').title('Enterprise Case Studies'),
      S.documentTypeListItem('article').title('Articles & Insights'),
      S.documentTypeListItem('testimonial').title('Client Testimonials'),
      S.documentTypeListItem('stat').title('Accreditation Badges & Stats'),

      S.divider(),

      // 7. Legal & Governance Pages
      S.documentTypeListItem('legalPage').title('Legal & Governance Policies (7)'),
    ]);