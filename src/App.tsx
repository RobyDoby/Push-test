import './App.css'
import { useScheduler } from './hooks/useScheduler'
import { useUserInput } from './hooks/useUserInput'
import { InstallPWABtn } from './InstallPWABtn'
import ScheduleList from './SchedulesList'

function App() {
  const { setText, setTime, text, time } = useUserInput()
  const { enablePush, schedule, subscribed, items, onDelete, errorMsg } = useScheduler(text, time, setText, setTime)

  return (
    <div className='wrapper'>
      <h1>Push Demo</h1>
      {errorMsg && <p>{errorMsg}</p>}
      <button onClick={enablePush}>Разрешить уведомления</button>
      <InstallPWABtn />
      {subscribed && <p>Подписка успешно сохранена</p>}

      <input
        placeholder='Текст уведомления'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input type='datetime-local' onChange={(e) => setTime(e.target.value)} />

      <button onClick={schedule}>Запланировать</button>

      <ScheduleList items={items} onDelete={onDelete} />
    </div>
  )
}

export default App
