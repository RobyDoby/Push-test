import { useState } from "react"
import { subscribeUser } from "../utils"

export const useScheduler = (text: string, time: string) => {
  const [subscribed, setSubscribed] = useState(false)

  async function enablePush() {
    const subscription = await subscribeUser()
    if (!subscription) return

    await fetch(`/${process.env.BACKEND_PUBLIC_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    })

    setSubscribed(true)
  }

  async function schedule() {
    const req = {
      text,
      timestamp: new Date(time).getTime()
    }

    await fetch(`/${process.env.BACKEND_PUBLIC_URL}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
  }

  return {
    schedule,
    enablePush,
    subscribed
  }
}
