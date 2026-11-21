import type { OfflineQueuedAction, PushAlert, Shipment } from '../types';
import { SEED_ALERTS, SEED_SHIPMENTS } from '../data/seedData';

const SHIPMENTS_KEY = 'golden_courier_cached_shipments_v1';
const ALERTS_KEY = 'golden_courier_cached_alerts_v1';
const QUEUE_KEY = 'golden_courier_offline_queue_v1';
const LAST_SYNC_KEY = 'golden_courier_last_sync_v1';

export function loadCachedShipments(): Shipment[] {
  try {
    const raw = localStorage.getItem(SHIPMENTS_KEY);
    if (!raw) {
      localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(SEED_SHIPMENTS));
      return SEED_SHIPMENTS;
    }
    const parsed = JSON.parse(raw) as Shipment[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_SHIPMENTS;
  } catch {
    return SEED_SHIPMENTS;
  }
}

export function saveCachedShipments(shipments: Shipment[]): void {
  try {
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  } catch {
    // Storage quota exceeded - ignore gracefully
  }
}

export function loadCachedAlerts(): PushAlert[] {
  try {
    const raw = localStorage.getItem(ALERTS_KEY);
    if (!raw) {
      localStorage.setItem(ALERTS_KEY, JSON.stringify(SEED_ALERTS));
      return SEED_ALERTS;
    }
    const parsed = JSON.parse(raw) as PushAlert[];
    return Array.isArray(parsed) ? parsed : SEED_ALERTS;
  } catch {
    return SEED_ALERTS;
  }
}

export function saveCachedAlerts(alerts: PushAlert[]): void {
  try {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 50)));
  } catch {
    // Ignore storage errors
  }
}

export function getOfflineQueue(): OfflineQueuedAction[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OfflineQueuedAction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function enqueueOfflineAction(
  kind: OfflineQueuedAction['kind'],
  payload: Record<string, unknown>
): OfflineQueuedAction[] {
  const queue = getOfflineQueue();
  const item: OfflineQueuedAction = {
    id: `oq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind,
    payload,
    createdAt: new Date().toISOString(),
  };
  const next = [...queue, item];
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(next));
  } catch {
    // Ignore
  }
  return next;
}

export function saveOfflineQueue(queue: OfflineQueuedAction[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Ignore
  }
}

export function getLastSyncTime(): string | null {
  try {
    return localStorage.getItem(LAST_SYNC_KEY);
  } catch {
    return null;
  }
}
