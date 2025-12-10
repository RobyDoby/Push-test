import type { ScheduledItem } from './types'

interface ScheduleListProps {
  items: ScheduledItem[]
  onDelete: (id: string) => Promise<void>
}

export default function ScheduleList({ items, onDelete}: ScheduleListProps) {
  if (!items.length) return null

  const onlyActive = items.filter(item => item.status === 'scheduled')
  
  return (
    <div>
      <h2>Запланированные пуши</h2>
      <ul>
        {onlyActive.map((i) => (
          <li key={i.id}>
            <strong>{new Date(i.timestamp).toLocaleString()}</strong> — {i.text} [{i.status}]
            <button onClick={() => onDelete(i.id)} disabled={i.status !== 'scheduled'}>
              Отменить
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
