import { getPendingSyncItems, markSyncItemCompleted, incrementSyncRetry } from './syncQueue';
import type { SyncQueueItem } from './types';
import { apiFetch } from '../api';
import { toast } from 'sonner';

/**
 * Process sync queue when network is available
 */
export async function processSyncQueue() {
  const queue = await getPendingSyncItems();
  
  if (queue.length === 0) {
    console.log('✅ Sync queue is empty');
    return;
  }

  console.log(`🔄 Processing ${queue.length} queued items...`);
  let successCount = 0;
  let failCount = 0;

  for (const item of queue) {
    try {
      await syncItem(item);
      if (item.id) {
        await markSyncItemCompleted(item.id);
      }
      successCount++;
      console.log(`✅ Synced ${item.entity} ${item.entityId}`);
    } catch (error) {
      failCount++;
      if (item.id) {
        await incrementSyncRetry(item.id);
      }
      console.error(`❌ Failed to sync ${item.entity} ${item.entityId}:`, error);
      // Keep in queue for retry
    }
  }

  if (successCount > 0) {
    toast.success(`Synced ${successCount} item(s)`, {
      description: failCount > 0 ? `${failCount} item(s) failed to sync` : undefined,
    });
  } else if (failCount > 0) {
    toast.error('Failed to sync items', {
      description: 'Will retry when connection improves',
    });
  }
}

async function syncItem(item: SyncQueueItem) {
  const endpoint = `/${item.entity}s`;
  
  switch (item.action) {
    case 'CREATE':
      await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(item.data),
      });
      break;
    case 'UPDATE':
      await apiFetch(`${endpoint}/${item.entityId}`, {
        method: 'PUT',
        body: JSON.stringify(item.data),
      });
      break;
    case 'DELETE':
      await apiFetch(`${endpoint}/${item.entityId}`, {
        method: 'DELETE',
      });
      break;
  }
}

