// World GeoJSON data featuring global landmass polygons & TechSteps sovereign hub markers
export const WORLD_GEOJSON: any = {
  type: "FeatureCollection",
  features: [
    // Address 1: Unit B, Roebuck Road, Hainault Business Park, IG6 3UF
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0.1218, 51.6064]
      },
      properties: {
        name: "Address 1: Hainault Facility",
        type: "facility",
        address: "Unit B, Roebuck road, Hainault business park",
        city: "Ilford, London IG6 3UF",
        country: "United Kingdom",
        status: "Sovereign Operations & Recycling Hub"
      }
    },

    // Address 2: Rickerscote Hall Ln, Stafford ST17 4HF
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-2.1044, 52.7809]
      },
      properties: {
        name: "Address 2: Stafford Facility",
        type: "facility",
        address: "Rickerscote Hall Ln",
        city: "Stafford ST17 4HF",
        country: "United Kingdom",
        status: "Regional Operations & Logistics Centre"
      }
    },

    // Europe Hubs
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [4.90, 52.37] // Amsterdam
      },
      properties: {
        name: "TechSteps EU Logistics Gateway",
        city: "Amsterdam",
        country: "Netherlands"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [8.68, 50.11] // Frankfurt
      },
      properties: {
        name: "TechSteps Central Europe Data Hub",
        city: "Frankfurt",
        country: "Germany"
      }
    },

    // North America Hubs
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.00, 40.71] // New York
      },
      properties: {
        name: "TechSteps US East Coast Partner Facility",
        city: "New York",
        country: "USA"
      }
    },

    // Asia-Pacific Hubs
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [103.81, 1.35] // Singapore
      },
      properties: {
        name: "TechSteps APAC Regional Node",
        city: "Singapore",
        country: "Singapore"
      }
    },

    // World Landmass Outer Boundaries (Simplified Low-poly GeoJSON for vector display)
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-10.0, 50.0], [2.0, 50.0], [2.0, 59.0], [-10.0, 59.0], [-10.0, 50.0]
          ]
        ]
      },
      properties: { name: "United Kingdom & Ireland" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-10.0, 36.0], [30.0, 36.0], [30.0, 71.0], [-10.0, 71.0], [-10.0, 36.0]
          ]
        ]
      },
      properties: { name: "Continental Europe" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-168.0, 15.0], [-50.0, 15.0], [-50.0, 72.0], [-168.0, 72.0], [-168.0, 15.0]
          ]
        ]
      },
      properties: { name: "North America" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [60.0, 5.0], [145.0, 5.0], [145.0, 55.0], [60.0, 55.0], [60.0, 5.0]
          ]
        ]
      },
      properties: { name: "Asia" }
    }
  ]
};
