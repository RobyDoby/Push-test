import { useState } from 'react'

export const useUserInput = () => {
  const [text, setText] = useState('Напоминание!')
  const [time, setTime] = useState<string>('')

  return {
    text,
    setText,
    time,
    setTime
  }
}
