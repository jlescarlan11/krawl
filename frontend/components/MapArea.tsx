'use client';

import { useEffect, useRef } from 'react';
import { LuSearch, LuUtensils, LuMapPin, LuLandmark, LuCamera, LuPlus, LuCrosshair } from 'react-icons/lu';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import Link from 'next/link';

const categories = [
  { id: 'food', label: 'Food & Drink', icon: LuUtensils },
  { id: 'landmarks', label: 'Landmarks', icon: LuLandmark },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: LuMapPin },
  { id: 'photo-spots', label: 'Photo Spots', icon: LuCamera },
];

export default function MapArea() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Fix for default markers in Leaflet - must be done client-side
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Initialize map centered on Manila, Philippines
    const map = L.map(mapContainerRef.current, {
      center: [14.5995, 120.9842], // Manila coordinates
      zoom: 13,
      zoomControl: false, // Disable default zoom control
    });

    // Add zoom control to bottom-left
    L.control.zoom({
      position: 'bottomleft'
    }).addTo(map);

    // Create custom center map control
    const CenterControl = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'leaflet-control-center', container);
        button.innerHTML = '⊕'; // Crosshair symbol
        button.href = '#';
        button.title = 'Center Map';
        button.style.width = '30px';
        button.style.height = '30px';
        button.style.lineHeight = '30px';
        button.style.fontSize = '18px';
        button.style.textAlign = 'center';
        button.style.textDecoration = 'none';
        button.style.color = '#000';
        button.style.display = 'block';

        L.DomEvent.on(button, 'click', function (e) {
          L.DomEvent.stopPropagation(e);
          L.DomEvent.preventDefault(e);
          map.setView([14.5995, 120.9842], 13);
        });

        return container;
      }
    });

    // Add center control to map
    new CenterControl().addTo(map);

    // Add tile layer - Choose one of the options below:
    
    // Option 1: OpenStreetMap (Default - Free, naturally shows green parks/vegetation)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 2: CartoDB Positron with Green Overlay (Light, clean style - Free)
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '© OpenStreetMap contributors © CARTO',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 3: CartoDB Voyager (Colorful with nice greens - Free) ⭐ RECOMMENDED
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    //   attribution: '© OpenStreetMap contributors © CARTO',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 4: Stamen Terrain (Naturally green topographic - Free) ⭐ VERY GREEN
    // L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    //   attribution: '© Stamen Design © OpenStreetMap contributors',
    //   maxZoom: 18,
    // }).addTo(map);

    // Option 5: OpenTopoMap (Topographic with natural greens - Free) ⭐ VERY GREEN
    // L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors © OpenTopoMap',
    //   maxZoom: 17,
    // }).addTo(map);

    // Option 6: Thunderforest Outdoors (Beautiful natural terrain - Free for dev, requires API key)
    // Get free key at: https://www.thunderforest.com/
    // L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
    //   attribution: '© Thunderforest © OpenStreetMap contributors',
    //   maxZoom: 22,
    // }).addTo(map);

    // Option 7: Thunderforest Landscape (Natural terrain colors - Free for dev, requires API key)
    // L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
    //   attribution: '© Thunderforest © OpenStreetMap contributors',
    //   maxZoom: 22,
    // }).addTo(map);

    // Option 8: Esri NatGeo World Map (Natural Geographic style - Free) ⭐ NATURAL LOOK
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: '© Esri © National Geographic',
    //   maxZoom: 16,
    // }).addTo(map);

    // Option 9: Esri WorldStreetMap (Clean, detailed - Free)
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: 'Tiles © Esri',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 10: Esri WorldImagery (Satellite view - Free) ⭐ REAL NATURAL
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: 'Tiles © Esri',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 11: Esri WorldTopoMap (Natural topo with shaded relief - Free) ⭐ NATURAL
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: '© Esri © OpenStreetMap contributors',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 12: Stadia Alidade Smooth (Natural terrain with hillshade - Free) ⭐ NATURAL
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      attribution: '© Stadia Maps © OpenStreetMap contributors',
      maxZoom: 50,
    }).addTo(map);

    // Option 13: CyclOSM (Outdoor/natural with green emphasis - Free) ⭐ GREEN & NATURAL
    // L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    //   attribution: '© CyclOSM © OpenStreetMap contributors',
    //   maxZoom: 20,
    // }).addTo(map);

    // ===== CLEAN & SMOOTH STYLES (Similar to Options 2 & 12) =====
    
    // Option 13a: Stadia Alidade Smooth Dark (Elegant dark smooth - Free) ⭐ SMOOTH
    // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //   attribution: '© Stadia Maps © OpenStreetMap contributors',
    //   maxZoom: 20,
    // }).addTo(map);

    // Option 13b: Stadia OSM Bright (Clean and minimal - Free) ⭐ CLEAN
    // L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    //   attribution: '© Stadia Maps © OpenStreetMap contributors',
    //   maxZoom: 20,
    // }).addTo(map);

    // Option 13c: CartoDB Dark Matter (Minimal dark - Free) ⭐ MINIMAL
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '© OpenStreetMap contributors © CARTO',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 13d: CartoDB Voyager No Labels (Clean colorful without text - Free) ⭐ CLEAN
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    //   attribution: '© OpenStreetMap contributors © CARTO',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 13e: Stamen Toner Lite (Minimal black & white - Free) ⭐ MINIMAL
    // L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', {
    //   attribution: '© Stamen Design © OpenStreetMap contributors',
    //   maxZoom: 20,
    // }).addTo(map);

    // Option 13f: Stamen Watercolor (Artistic natural - Free) ⭐ ARTISTIC & NATURAL
    // L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
    //   attribution: '© Stamen Design © OpenStreetMap contributors',
    //   maxZoom: 16,
    // }).addTo(map);

    // Option 13g: Esri WorldGrayCanvas (Clean gray - Free) ⭐ CLEAN & MINIMAL
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: '© Esri',
    //   maxZoom: 16,
    // }).addTo(map);

    // Option 13h: OpenMapTiles (Clean Swiss style - Free) ⭐ CLEAN
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors',
    //   maxZoom: 19,
    // }).addTo(map);

    // Option 13i: Wikimedia Maps (Clean minimal - Free) ⭐ CLEAN
    // L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors, Wikimedia maps',
    //   maxZoom: 18,
    // }).addTo(map);

    // Option 14: Jawg Streets (Modern style - Requires API key but has free tier)
    // L.tileLayer('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=YOUR_JAWG_ACCESS_TOKEN', {
    //   attribution: '© Jawg © OpenStreetMap contributors',
    //   maxZoom: 22,
    // }).addTo(map);

    // Option 15: Mapbox (Requires API key - paid service but has free tier)
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   attribution: '© Mapbox © OpenStreetMap contributors',
    //   maxZoom: 19,
    //   id: 'mapbox/streets-v11', // or 'mapbox/satellite-v9', 'mapbox/light-v10', 'mapbox/dark-v10'
    //   accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
    // }).addTo(map);

    // Create marker cluster group
    const markers = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    // Add some sample markers (replace with actual data later)
    const sampleLocations = [
      { lat: 14.5995, lng: 120.9842, title: 'Sample Location 1' },
      { lat: 14.6042, lng: 120.9822, title: 'Sample Location 2' },
      { lat: 14.5925, lng: 120.9960, title: 'Sample Location 3' },
    ];

    sampleLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng]);
      marker.bindPopup(`<strong>${location.title}</strong>`);
      markers.addLayer(marker);
    });

    map.addLayer(markers);
    mapRef.current = map;

    // Force map to recalculate its size after initialization
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Add another check after a longer delay to catch late renders
    setTimeout(() => {
      map.invalidateSize();
    }, 500);

    // Watch for container size changes and update map accordingly
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // Handle window resize events
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Floating Header - positioned absolutely within map */}
      <header className="absolute top-0 left-0 right-0 z-[1000] h-[60px]">
        <div className="flex items-center gap-3 px-4 h-full">
          
          {/* Search Bar - Glass morphism effect */}
          <div className="flex-1 max-w-2xl relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 z-10" size={20} />
            <input
              type="text"
              placeholder="Search gems, krawls, locations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/90 transition-all"
            />
          </div>
          
          {/* Category Filters - Glass morphism effect */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/40 hover:bg-verde-100/80 hover:border-verde-400/60 hover:text-verde-700 transition-all text-sm font-medium text-neutral-700 shadow-lg"
                >
                  <Icon size={16} />
                  <span className="hidden xl:inline">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

            {/* Floating Action Button - Add Gem */}
      <Link
        href="/add"
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-verde-600 hover:bg-verde-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 z-[1000]"
        aria-label="Add new gem"
      >
        <LuPlus size={24} />
      </Link>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full relative z-0"
        style={{ background: '#f5f5dc' }}
      />
      
      {/* Optional: Green overlay for extra tint (reduce or remove if using naturally green tiles) */}
      {/* <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'rgba(45, 122, 62, 0.05)',
          mixBlendMode: 'multiply'
        }}
      /> */}
    </div>
  );
}