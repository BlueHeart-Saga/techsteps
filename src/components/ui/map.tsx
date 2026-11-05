"use client";

import React, { createContext, useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { WORLD_GEOJSON } from '@/lib/use-world-data';

export type MapRef = maplibregl.Map;

interface MapContextType {
  map: maplibregl.Map | null;
  isLoaded: boolean;
  styleVersion: number;
}

const MapContext = createContext<MapContextType>({ map: null, isLoaded: false, styleVersion: 0 });

export interface MapProps {
  blank?: boolean;
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  styles?: { light?: string; dark?: string } | string;
  className?: string;
  children?: React.ReactNode;
}

export const Map = forwardRef<MapRef, MapProps>(({
  blank = false,
  center = [-0.1276, 51.5074],
  zoom = 14,
  pitch = 0,
  styles,
  className = '',
  children
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [styleVersion, setStyleVersion] = useState(0);

  const getStyleUrl = () => {
    if (blank) {
      return {
        version: 8 as const,
        name: 'Blank TechSteps Theme',
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background' as const,
            paint: {
              'background-color': '#0E1719'
            }
          }
        ]
      };
    }
    if (typeof styles === 'string') return styles;
    if (styles && typeof styles === 'object') {
      return styles.light || styles.dark || 'https://tiles.openfreemap.org/styles/positron';
    }
    return 'https://tiles.openfreemap.org/styles/positron';
  };

  const isFirstRender = useRef(true);
  const currentStyleUrlRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initialStyle = getStyleUrl();
    currentStyleUrlRef.current = initialStyle;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: initialStyle,
      center: center,
      zoom: zoom,
      pitch: pitch,
      attributionControl: false
    });

    map.on('error', (e) => {
      console.error('TechSteps MapLibre error:', e);
    });

    map.on('load', () => {
      setIsLoaded(true);
      map.resize();
    });

    map.on('style.load', () => {
      setStyleVersion((v) => v + 1);
    });

    mapRef.current = map;
    setMapInstance(map);

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        try {
          mapRef.current.resize();
        } catch (e) {
          // Ignore resize during unmount
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!mapRef.current) return;
    const newStyle = getStyleUrl();
    if (newStyle === currentStyleUrlRef.current) return;
    currentStyleUrlRef.current = newStyle;

    try {
      mapRef.current.setStyle(newStyle);
    } catch (e) {
      console.error('TechSteps Map setStyle error:', e);
    }
  }, [styles, blank]);

  useImperativeHandle(ref, () => mapInstance!, [mapInstance]);

  return (
    <MapContext.Provider value={{ map: mapInstance, isLoaded, styleVersion }}>
      <div className={`relative w-full h-full overflow-hidden rounded-[20px] ${className}`}>
        <div ref={containerRef} className="w-full h-full min-h-[400px]" />
        {children}
      </div>
    </MapContext.Provider>
  );
});

Map.displayName = 'Map';

interface MapGeoJSONProps {
  data: any;
  fillColor?: string;
  strokeColor?: string;
  showPolygons?: boolean;
}

export function MapGeoJSON({
  data,
  fillColor = '#146B5C',
  strokeColor = '#2DD4BF',
  showPolygons = false
}: MapGeoJSONProps) {
  const { map, isLoaded, styleVersion } = useContext(MapContext);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map || !data) return;

    // Clean up existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const setupLayers = () => {
      if (!map || !map.isStyleLoaded()) return;

      const sourceId = 'world-data-source';
      const fillLayerId = 'world-data-fill';
      const strokeLayerId = 'world-data-stroke';

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'geojson',
          data: data
        });
      }

      if (showPolygons) {
        if (!map.getLayer(fillLayerId)) {
          map.addLayer({
            id: fillLayerId,
            type: 'fill',
            source: sourceId,
            filter: ['==', '$type', 'Polygon'],
            paint: {
              'fill-color': fillColor,
              'fill-opacity': 0.15
            }
          });
        }

        if (!map.getLayer(strokeLayerId)) {
          map.addLayer({
            id: strokeLayerId,
            type: 'line',
            source: sourceId,
            filter: ['==', '$type', 'Polygon'],
            paint: {
              'line-color': strokeColor,
              'line-width': 1.5,
              'line-opacity': 0.3
            }
          });
        }
      }

      if (data.features) {
        data.features.forEach((feature: any) => {
          if (feature.geometry && feature.geometry.type === 'Point') {
            const coords = feature.geometry.coordinates;
            const props = feature.properties || {};

            const el = document.createElement('div');
            el.className = 'techsteps-map-pin group cursor-pointer relative';
            el.innerHTML = `
              <div class="relative flex items-center justify-center">
                <span class="absolute w-6 h-6 rounded-full bg-[#146B5C]/40 animate-ping"></span>
                <span class="relative w-4 h-4 rounded-full bg-[#146B5C] border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-200"></span>
              </div>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-[8px] whitespace-nowrap border border-slate-700 shadow-xl z-20">
                <p class="font-bold text-emerald-400">${props.name || 'Location'}</p>
                ${props.address ? `<p class="text-[10px] text-slate-200 font-semibold">${props.address}</p>` : ''}
                ${props.city ? `<p class="text-[10px] text-slate-300">${props.city}, ${props.country}</p>` : ''}
                ${props.status ? `<p class="text-[9px] font-mono text-emerald-300">${props.status}</p>` : ''}
              </div>
            `;

            const marker = new maplibregl.Marker({ element: el })
              .setLngLat([coords[0], coords[1]])
              .addTo(map);

            markersRef.current.push(marker);
          }
        });
      }
    };

    if (map.isStyleLoaded()) {
      setupLayers();
    } else {
      map.once('style.load', setupLayers);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [map, isLoaded, styleVersion, data, fillColor, strokeColor]);

  return null;
}

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

export function CustomStyleExample({ className = '' }: { className?: string } = {}) {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("openstreetmap3d");
  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  // Listen to address hover / click from the left column (Hainault & Stafford Hubs)
  useEffect(() => {
    const handleLocationSwitch = (e: any) => {
      const loc = e.detail?.location;
      if (!mapRef.current) return;
      if (loc === 'address1' || loc === 'hainault') {
        mapRef.current.flyTo({
          center: [0.1218, 51.6064],
          zoom: 15,
          pitch: is3D ? 60 : 0,
          duration: 1200,
        });
      } else if (loc === 'address2' || loc === 'stafford') {
        mapRef.current.flyTo({
          center: [-2.1044, 52.7809],
          zoom: 15,
          pitch: is3D ? 60 : 0,
          duration: 1200,
        });
      } else if (loc === 'all') {
        mapRef.current.flyTo({
          center: [-0.1276, 51.5074],
          zoom: 11,
          pitch: is3D ? 60 : 0,
          duration: 1200,
        });
      }
    };

    window.addEventListener('techsteps:switch-location', handleLocationSwitch);
    return () => {
      window.removeEventListener('techsteps:switch-location', handleLocationSwitch);
    };
  }, [is3D]);

  return (
    <div className={`relative h-[420px] w-full ${className}`}>
      <Map
        ref={mapRef}
        center={[-0.1276, 51.5074]}
        zoom={15}
        pitch={is3D ? 60 : 0}
        styles={
          selectedStyle
            ? { light: selectedStyle, dark: selectedStyle }
            : undefined
        }
      >
        <MapGeoJSON data={WORLD_GEOJSON} />
      </Map>
      <div className="absolute top-2 right-2 z-10">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-white/95 text-slate-800 rounded-md border border-slate-300 px-2 py-1 text-sm shadow backdrop-blur-xs outline-none cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <option value="default">Default (Carto)</option>
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="openstreetmap3d">OpenStreetMap 3D</option>
        </select>
      </div>
    </div>
  );
}

export function BasicMapExample() {
  return (
    <div className="h-[420px] w-full">
      <Map center={[-74.006, 40.7128]} zoom={12} />
    </div>
  );
}

export function BlankMapExample() {
  return (
    <div className="h-[420px] w-full">
      <Map blank center={[10, 25]}>
        <MapGeoJSON data={WORLD_GEOJSON} />
      </Map>
    </div>
  );
}
