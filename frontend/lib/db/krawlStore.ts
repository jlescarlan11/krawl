// lib/db/krawlStore.ts
// Krawl-related IndexedDB operations

import { getDB } from './indexedDB';
import type { Krawl } from './types';

/**
 * Save a krawl
 */
export async function saveKrawl(krawl: Krawl): Promise<void> {
  const db = await getDB();
  await db.put('krawls', {
    ...krawl,
    _synced: 1, // 1 = synced
    _lastDownloaded: new Date().toISOString(),
  });
}

/**
 * Save multiple krawls
 */
export async function saveKrawls(krawls: Krawl[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('krawls', 'readwrite');

  await Promise.all([
    ...krawls.map((krawl) =>
      tx.store.put({
        ...krawl,
        _synced: 1, // 1 = synced
      })
    ),
    tx.done,
  ]);
}

/**
 * Get a krawl by ID
 */
export async function getKrawl(krawlId: string): Promise<Krawl | undefined> {
  const db = await getDB();
  return await db.get('krawls', krawlId);
}

/**
 * Get all krawls
 */
export async function getAllKrawls(): Promise<Krawl[]> {
  const db = await getDB();
  return await db.getAll('krawls');
}

/**
 * Get downloaded krawls (for offline use)
 */
export async function getDownloadedKrawls(): Promise<Krawl[]> {
  const db = await getDB();
  return await db.getAllFromIndex('krawls', 'by-downloaded', 1);
}

/**
 * Get krawls by creator
 */
export async function getKrawlsByCreator(creatorId: string): Promise<Krawl[]> {
  const db = await getDB();
  return await db.getAllFromIndex('krawls', 'by-creator', creatorId);
}

/**
 * Mark krawl as downloaded
 */
export async function markKrawlAsDownloaded(krawlId: string): Promise<void> {
  await updateKrawl(krawlId, {
    _downloaded: 1,
    _lastDownloaded: new Date().toISOString(),
  });
}

/**
 * Update a krawl
 */
export async function updateKrawl(
  krawlId: string,
  updates: Partial<Krawl>
): Promise<void> {
  const db = await getDB();
  const existing = await db.get('krawls', krawlId);

  if (!existing) {
    throw new Error(`Krawl with ID ${krawlId} not found`);
  }

  await db.put('krawls', {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  });
}

/**
 * Delete a krawl
 */
export async function deleteKrawl(krawlId: string): Promise<void> {
  const db = await getDB();
  await db.delete('krawls', krawlId);
}

/**
 * Search krawls by title
 */
export async function searchKrawls(query: string): Promise<Krawl[]> {
  const allKrawls = await getAllKrawls();
  const lowerQuery = query.toLowerCase();
  return allKrawls.filter(
    (krawl) =>
      krawl.title.toLowerCase().includes(lowerQuery) ||
      krawl.description?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Count total krawls
 */
export async function countKrawls(): Promise<number> {
  const db = await getDB();
  return await db.count('krawls');
}

/**
 * Get public krawls
 */
export async function getPublicKrawls(): Promise<Krawl[]> {
  const db = await getDB();
  return await db.getAllFromIndex('krawls', 'by-visibility', 'public');
}

