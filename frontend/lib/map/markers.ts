import maplibregl from 'maplibre-gl';
import { MAP_CONFIG } from './config';

export interface MarkerLocation {
  lat: number;
  lng: number;
  title: string;
  description?: string;
}

/**
 * Adds sample markers to the map
 * TODO: Replace with actual gem data from API
 */
export function addSampleMarkers(map: maplibregl.Map): maplibregl.Marker[] {
  const markers: maplibregl.Marker[] = [];

  MAP_CONFIG.SAMPLE_LOCATIONS.forEach((location) => {
    // Create popup
    const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
      `<strong>${location.title}</strong>`
    );

    // Create marker
    const marker = new maplibregl.Marker({
      color: MAP_CONFIG.VERDE_MARKER_COLOR,
    })
      .setLngLat([location.lng, location.lat])
      .setPopup(popup)
      .addTo(map);

    markers.push(marker);
  });

  console.log(`✅ Added ${markers.length} sample markers`);
  return markers;
}

/**
 * Adds a single marker to the map
 */
export function addMarker(
  map: maplibregl.Map,
  location: MarkerLocation,
  options?: maplibregl.MarkerOptions
): maplibregl.Marker {
  const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
    `<div>
      <strong>${location.title}</strong>
      ${location.description ? `<p class="text-sm">${location.description}</p>` : ''}
    </div>`
  );

  const marker = new maplibregl.Marker({
    color: MAP_CONFIG.VERDE_MARKER_COLOR,
    ...options,
  })
    .setLngLat([location.lng, location.lat])
    .setPopup(popup)
    .addTo(map);

  return marker;
}

/**
 * Removes all markers from the map
 */
export function removeMarkers(markers: maplibregl.Marker[]): void {
  markers.forEach(marker => marker.remove());
  console.log(`🗑️ Removed ${markers.length} markers`);
}

