import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

export interface UKLocationsMapProps {
  className?: string;
  defaultLocation?: 'all' | 'hainault' | 'stafford';
}

interface HubData {
  id: 'hainault' | 'stafford';
  title: string;
  badge: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  gmapsUrl: string;
}

const HUBS: Record<'hainault' | 'stafford', HubData> = {
  hainault: {
    id: 'hainault',
    title: 'Hainault Hub',
    badge: 'London & South East',
    address: 'Unit B, Roebuck Road, Hainault Business Park',
    postcode: 'IG6 3UF',
    lat: 51.6064,
    lng: 0.1218,
    gmapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Unit+B+Roebuck+Road+Hainault+Business+Park+IG6+3UF',
  },
  stafford: {
    id: 'stafford',
    title: 'Stafford Hub',
    badge: 'Midlands & Regional Logistics',
    address: 'Rickerscote Hall Lane, Stafford',
    postcode: 'ST17 4HF',
    lat: 52.7809,
    lng: -2.1044,
    gmapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rickerscote+Hall+Lane+Stafford+ST17+4HF',
  },
};

export default function UKLocationsMap({
  className = '',
  defaultLocation = 'all',
}: UKLocationsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [activeLoc, setActiveLoc] = useState<'all' | 'hainault' | 'stafford'>(defaultLocation);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet in browser environment
    import('leaflet').then((L) => {
      if (!isMounted || !containerRef.current) return;

      // Fix default Leaflet icon paths in bundler environments
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // UK center view
      const map = L.map(containerRef.current, {
        center: [52.25, -1.0],
        zoom: 7,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: false, // Customized controls
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add Carto Voyager tiles (Clean, modern, crisp 2x retina, high speed)
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      // Add custom zoom control in bottom-right
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(map);

      // Create Custom TechSteps Teal Pins
      const createCustomIcon = (hubTitle: string, isPrimary: boolean) => {
        return L.divIcon({
          className: 'techsteps-hub-marker',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer;">
              <!-- Subtle pulse ring -->
              <div style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background: rgba(20, 107, 92, 0.22); pointer-events: none;"></div>
              <!-- Outer Pin Body -->
              <div style="position: relative; width: 26px; height: 26px; border-radius: 9999px; background: ${
                isPrimary ? '#146B5C' : '#0F172A'
              }; border: 2.5px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <!-- Attached Label Badge -->
              <div style="position: absolute; left: 30px; white-space: nowrap; background: #0F172A; color: #FFFFFF; font-size: 11px; font-weight: 700; font-family: system-ui, -apple-system, sans-serif; padding: 2px 8px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); pointer-events: none; border: 1px solid rgba(255,255,255,0.15);">
                ${hubTitle}
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });
      };

      // Add Hainault Marker
      const hainaultMarker = L.marker([HUBS.hainault.lat, HUBS.hainault.lng], {
        icon: createCustomIcon('Hainault Hub', true),
        title: 'Hainault Hub — London',
      }).addTo(map);

      hainaultMarker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 190px;">
          <div style="font-size: 13px; font-weight: 700; color: #0F172A;">Hainault Hub</div>
          <div style="font-size: 10px; font-weight: 700; color: #146B5C; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1px;">London & South East</div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px; line-height: 1.35;">Unit B, Roebuck Road, Hainault Business Park, IG6 3UF</div>
          <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 10.5px; font-weight: 600; color: #64748B;">020 8501 5050</span>
            <a href="${HUBS.hainault.gmapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 10.5px; font-weight: 700; color: #146B5C; text-decoration: underline;">Directions ↗</a>
          </div>
        </div>
      `);

      // Add Stafford Marker
      const staffordMarker = L.marker([HUBS.stafford.lat, HUBS.stafford.lng], {
        icon: createCustomIcon('Stafford Hub', false),
        title: 'Stafford Hub — Midlands',
      }).addTo(map);

      staffordMarker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 190px;">
          <div style="font-size: 13px; font-weight: 700; color: #0F172A;">Stafford Hub</div>
          <div style="font-size: 10px; font-weight: 700; color: #146B5C; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1px;">Midlands & Regional</div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px; line-height: 1.35;">Rickerscote Hall Lane, Stafford, ST17 4HF</div>
          <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 10.5px; font-weight: 600; color: #64748B;">020 8501 5050</span>
            <a href="${HUBS.stafford.gmapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 10.5px; font-weight: 700; color: #146B5C; text-decoration: underline;">Directions ↗</a>
          </div>
        </div>
      `);

      // Connect both hubs with a dashed sovereign logistics corridor line
      const corridorLine = L.polyline(
        [
          [HUBS.stafford.lat, HUBS.stafford.lng],
          [HUBS.hainault.lat, HUBS.hainault.lng],
        ],
        {
          color: '#146B5C',
          weight: 2.5,
          opacity: 0.7,
          dashArray: '6, 6',
        }
      ).addTo(map);

      markersRef.current = {
        hainault: hainaultMarker,
        stafford: staffordMarker,
        corridor: corridorLine,
      };

      // Set initial fit to show both hubs nicely
      const group = L.featureGroup([hainaultMarker, staffordMarker]);
      map.fitBounds(group.getBounds().pad(0.28));

      setIsMapReady(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle switching view / flying to hub
  const focusHub = (loc: 'all' | 'hainault' | 'stafford') => {
    setActiveLoc(loc);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (loc === 'all') {
      const markers = Object.values(markersRef.current).filter(
        (m: any) => m && m.getLatLng
      );
      if (markers.length >= 2) {
        import('leaflet').then((L) => {
          const group = L.featureGroup(markers);
          map.flyToBounds(group.getBounds().pad(0.28), {
            duration: 1.2,
          });
        });
      }
    } else if (loc === 'hainault') {
      map.flyTo([HUBS.hainault.lat, HUBS.hainault.lng], 13.5, {
        duration: 1.2,
      });
      markersRef.current.hainault?.openPopup();
    } else if (loc === 'stafford') {
      map.flyTo([HUBS.stafford.lat, HUBS.stafford.lng], 13.5, {
        duration: 1.2,
      });
      markersRef.current.stafford?.openPopup();
    }
  };

  // Listen to address hover / click from the left column
  useEffect(() => {
    const handleSwitch = (e: any) => {
      const target = e.detail?.location;
      if (target === 'address1' || target === 'hainault') {
        focusHub('hainault');
      } else if (target === 'address2' || target === 'stafford') {
        focusHub('stafford');
      } else if (target === 'all') {
        focusHub('all');
      }
    };

    window.addEventListener('techsteps:switch-location', handleSwitch);
    return () => {
      window.removeEventListener('techsteps:switch-location', handleSwitch);
    };
  }, []);

  const activeHubInfo = activeLoc === 'all' ? null : HUBS[activeLoc];

  return (
    <div
      className={`relative w-full rounded-[22px] sm:rounded-[26px] overflow-hidden border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] bg-slate-100 ${className}`}
      style={{ height: '380px' }}
    >
      {/* Top Accessible Hub Selector Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Hub Selector Pills */}
        <div className="inline-flex items-center p-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs">
          <button
            type="button"
            onClick={() => focusHub('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeLoc === 'all'
                ? 'bg-[#146B5C] text-white shadow-xs'
                : 'text-slate-700 hover:text-[#146B5C]'
            }`}
            aria-pressed={activeLoc === 'all'}
          >
            All UK Hubs
          </button>
          <button
            type="button"
            onClick={() => focusHub('hainault')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeLoc === 'hainault'
                ? 'bg-[#146B5C] text-white shadow-xs'
                : 'text-slate-700 hover:text-[#146B5C]'
            }`}
            aria-pressed={activeLoc === 'hainault'}
          >
            Hainault
          </button>
          <button
            type="button"
            onClick={() => focusHub('stafford')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeLoc === 'stafford'
                ? 'bg-[#146B5C] text-white shadow-xs'
                : 'text-slate-700 hover:text-[#146B5C]'
            }`}
            aria-pressed={activeLoc === 'stafford'}
          >
            Stafford
          </button>
        </div>

        {/* Directions Link */}
        <div className="flex items-center gap-1.5">
          <a
            href={
              activeLoc === 'stafford'
                ? HUBS.stafford.gmapsUrl
                : activeLoc === 'hainault'
                ? HUBS.hainault.gmapsUrl
                : 'https://www.google.com/maps/search/TechSteps+UK+Hainault+Stafford'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-xs font-semibold text-[#146B5C] hover:bg-white shadow-xs transition-colors flex items-center gap-1"
            title="Open directions in Google Maps"
          >
            <span>Directions</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Real Interactive Leaflet Map Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-0"
        style={{ width: '100%', height: '100%', background: '#EAF4F2' }}
      />

      {/* Fallback / Initial Loading Indicator (Only visible before tiles load) */}
      {!isMapReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#EAF7F4] text-slate-600">
          <div className="w-8 h-8 rounded-full border-2 border-[#146B5C] border-t-transparent animate-spin mb-2" />
          <p className="text-xs font-semibold text-[#146B5C]">Loading UK Interactive Map...</p>
        </div>
      )}

      {/* Bottom Floating Info Pill */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#146B5C] animate-pulse"></span>
          <span className="text-xs font-bold text-slate-900">
            {activeHubInfo ? activeHubInfo.title : '2 Operational UK Hubs'}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            {activeHubInfo ? activeHubInfo.postcode : 'Hainault · Stafford'}
          </span>
        </div>
      </div>
    </div>
  );
}
