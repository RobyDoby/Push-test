import { useCallback, useEffect, useState } from 'react'
import { subscribeUser } from '../utils'
import type { ScheduledItem } from '../types'
import { deleteSchedule, fetchScheduled } from '../api'

const BASE = import.meta.env.VITE_BACKEND_PUBLIC_URL

export const useScheduler = (
  text: string,
  time: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setTime: React.Dispatch<React.SetStateAction<string>>
) => {
  const [items, setItems] = useState<ScheduledItem[]>([])
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function enablePush() {
    const subscription = await subscribeUser()
    if (!subscription) {
      setErrorMsg('Ну дай ты разрешение!')
      return
    }
    console.log(subscription)
    await fetch(`${BASE}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    })

    console.log('Subscribed successfully!')
    setErrorMsg('')
    setSubscribed(true)
  }

  async function schedule() {
    if (!time || !text) return

    const req = {
      text,
      timestamp: new Date(time).getTime()
    }

    await fetch(`${BASE}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
    await load()
    setText('')
    setTime('')
  }

  const load = useCallback(async () => {
    const data = await fetchScheduled()
    setItems(data.sort((a, b) => a.timestamp - b.timestamp))
  }, [])

  async function onDelete(id: string) {
    await deleteSchedule(id)
    setItems((s) => s.filter((i) => i.id !== id))
  }

  useEffect(() => {
      load()
  }, [load])

  return {
    schedule,
    enablePush,
    subscribed,
    items,
    onDelete,
    errorMsg
  }
}
