import type { ScheduledItem } from './types';

const BASE = import.meta.env.VITE_BACKEND_PUBLIC_URL;

export async function fetchScheduled(): Promise<ScheduledItem[]> {
  const res = await fetch(`${BASE}/scheduled`);
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
}

export async function createSchedule(text: string, timestamp: number) {
  const res = await fetch(`${BASE}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, timestamp })
  });
  return res.json();
}

export async function deleteSchedule(id: string) {
  const res = await fetch(`${BASE}/scheduled/${id}`, { method: 'DELETE' });
  return res.json();
}
