// lib/db/gemStore.ts
// Gem-related IndexedDB operations

import { getDB } from './indexedDB';
import type { Gem } from './types';

/**
 * Save a single gem to IndexedDB
 */
export async function saveGem(gem: Gem): Promise<void> {
  const db = await getDB();
  await db.put('gems', {
    ...gem,
    _synced: 1, // 1 = synced
    _lastSynced: new Date().toISOString(),
  });
}

/**
 * Save multiple gems (bulk operation)
 */
export async function saveGems(gems: Gem[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('gems', 'readwrite');

  await Promise.all([
    ...gems.map((gem) =>
      tx.store.put({
        ...gem,
        _synced: 1, // 1 = synced
        _lastSynced: new Date().toISOString(),
      })
    ),
    tx.done,
  ]);
}

/**
 * Get a gem by ID
 */
export async function getGem(gemId: string): Promise<Gem | undefined> {
  const db = await getDB();
  return await db.get('gems', gemId);
}

/**
 * Get all gems
 */
export async function getAllGems(): Promise<Gem[]> {
  const db = await getDB();
  return await db.getAll('gems');
}

/**
 * Get gems by creator
 */
export async function getGemsByCreator(creatorId: string): Promise<Gem[]> {
  const db = await getDB();
  return await db.getAllFromIndex('gems', 'by-creator', creatorId);
}

/**
 * Get gems by approval status
 */
export async function getGemsByStatus(
  status: 'pending' | 'approved' | 'rejected'
): Promise<Gem[]> {
  const db = await getDB();
  return await db.getAllFromIndex('gems', 'by-status', status);
}

/**
 * Get unsynced gems
 */
export async function getUnsyncedGems(): Promise<Gem[]> {
  const db = await getDB();
  return await db.getAllFromIndex('gems', 'by-synced', IDBKeyRange.only(0));
}

/**
 * Search gems by name (case-insensitive)
 */
export async function searchGems(query: string): Promise<Gem[]> {
  const allGems = await getAllGems();
  const lowerQuery = query.toLowerCase();
  return allGems.filter(
    (gem) =>
      gem.name.toLowerCase().includes(lowerQuery) ||
      gem.description?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get gems near a location (simple distance calculation)
 */
export async function getGemsNearLocation(
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<Gem[]> {
  const allGems = await getAllGems();

  return allGems.filter((gem) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      gem.location.latitude,
      gem.location.longitude
    );
    return distance <= radiusKm;
  });
}

/**
 * Update a gem
 */
export async function updateGem(
  gemId: string,
  updates: Partial<Gem>
): Promise<void> {
  const db = await getDB();
  const existing = await db.get('gems', gemId);

  if (!existing) {
    throw new Error(`Gem with ID ${gemId} not found`);
  }

  await db.put('gems', {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
    _synced: 0, // 0 = not synced (mark as unsynced after local update)
  });
}

/**
 * Delete a gem
 */
export async function deleteGem(gemId: string): Promise<void> {
  const db = await getDB();
  await db.delete('gems', gemId);
}

/**
 * Count total gems
 */
export async function countGems(): Promise<number> {
  const db = await getDB();
  return await db.count('gems');
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

