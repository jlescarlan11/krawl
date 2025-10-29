// lib/db/syncQueue.ts
// Sync queue for offline operations

import { getDB } from './indexedDB';
import type { SyncQueueItem } from './types';

/**
 * Add an action to the sync queue
 */
export async function addToSyncQueue(
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  entity: 'gem' | 'krawl' | 'rating' | 'vouch',
  entityId: string,
  data: any
): Promise<void> {
  const db = await getDB();

  const item: SyncQueueItem = {
    action,
    entity,
    entityId,
    data,
    timestamp: new Date().toISOString(),
    retries: 0,
    synced: 0, // 0 = not synced
  };

  await db.add('syncQueue', item);
  console.log(`📤 Added to sync queue: ${action} ${entity} ${entityId}`);
}

/**
 * Get all pending sync items
 */
export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  const db = await getDB();
  return await db.getAllFromIndex('syncQueue', 'by-synced', IDBKeyRange.only(0));
}

/**
 * Mark a sync item as completed
 */
export async function markSyncItemCompleted(id: number): Promise<void> {
  const db = await getDB();
  const item = await db.get('syncQueue', id);

  if (item) {
    await db.put('syncQueue', {
      ...item,
      synced: 1, // 1 = synced
    });
    console.log(`✅ Sync item ${id} marked as completed`);
  }
}

/**
 * Increment retry count for a sync item
 */
export async function incrementSyncRetry(id: number): Promise<void> {
  const db = await getDB();
  const item = await db.get('syncQueue', id);

  if (item) {
    await db.put('syncQueue', {
      ...item,
      retries: item.retries + 1,
    });
    console.log(`🔄 Sync item ${id} retry count: ${item.retries + 1}`);
  }
}

/**
 * Clear completed sync items
 */
export async function clearCompletedSyncItems(): Promise<void> {
  const db = await getDB();
  const allItems = await db.getAll('syncQueue');
  const completedIds = allItems.filter((item) => item.synced === 1).map((item) => item.id!);

  const tx = db.transaction('syncQueue', 'readwrite');
  await Promise.all([
    ...completedIds.map((id) => tx.store.delete(id)),
    tx.done,
  ]);

  console.log(`🗑️ Cleared ${completedIds.length} completed sync items`);
}

/**
 * Get sync queue count
 */
export async function getSyncQueueCount(): Promise<number> {
  const db = await getDB();
  const items = await db.getAllFromIndex('syncQueue', 'by-synced', IDBKeyRange.only(0));
  return items.length;
}

/**
 * Delete a sync item
 */
export async function deleteSyncItem(id: number): Promise<void> {
  const db = await getDB();
  await db.delete('syncQueue', id);
  console.log(`🗑️ Deleted sync item ${id}`);
}

/**
 * Clear all sync items (use with caution)
 */
export async function clearAllSyncItems(): Promise<void> {
  const db = await getDB();
  await db.clear('syncQueue');
  console.log('🗑️ Cleared all sync items');
}

