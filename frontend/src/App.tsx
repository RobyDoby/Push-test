import './App.css'
import { useScheduler } from './hooks/useScheduler'
import { useUserInput } from './hooks/useUserInput'

function App() {
  const { setText, setTime, text, time } = useUserInput()
  const { enablePush, schedule, subscribed } = useScheduler(text, time)

  return (
    <div className='wrapper'>
      <h1>Push Demo</h1>

      <button onClick={enablePush}>Разрешить уведомления</button>
      {subscribed && <p>Подписка успешно сохранена</p>}

      <input
        placeholder='Текст уведомления'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input type='datetime-local' onChange={(e) => setTime(e.target.value)} />

      <button onClick={schedule}>Запланировать</button>
    </div>
  )
}

export default App
