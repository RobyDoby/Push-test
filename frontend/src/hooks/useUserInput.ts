import { useState } from 'react'

export const useUserInput = () => {
  const [text, setText] = useState('Напоминание!')
  const [time, setTime] = useState('')

  return {
    text,
    setText,
    time,
    setTime
  }
}
