import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Techsteps CMS')
    .items([
      // 1. Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Company & Contact Settings')
        ),

      // 2. Singleton: About Page
      S.listItem()
        .title('About Us Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page Content & Values')
        ),

      S.divider(),

      // 3. Operational Divisions
      S.documentTypeListItem('division').title('Operational Divisions (4)'),

      // 4. Certified Services
      S.documentTypeListItem('service').title('Certified Services (27)'),

      // 5. Industry Sectors
      S.documentTypeListItem('sector').title('Industry Sectors (4)'),

      // 6. Metrics & Statistics
      S.documentTypeListItem('stat').title('Accreditation Badges & Stats'),

      S.divider(),

      // 7. Articles & News
      S.documentTypeListItem('article').title('Articles & Insights'),

      // 8. Case Studies
      S.documentTypeListItem('caseStudy').title('Enterprise Case Studies'),
    ]);
