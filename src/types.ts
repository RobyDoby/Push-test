export interface ScheduledItem {
  id: string;
  text: string;
  timestamp: number;
  createdAt: number;
  status: 'scheduled' | 'sent' | 'cancelled';
}
