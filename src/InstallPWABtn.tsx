import { useInstallPWA } from './hooks/useInstallPWA'

export const InstallPWABtn = () => {
  const { handleIOSInstall, handleInstallClick, isIOS, showInstallPrompt } =
    useInstallPWA()

  if (!showInstallPrompt) return null

  return (
    <button className='install-btn' onClick={isIOS ? handleIOSInstall : handleInstallClick}>
      {isIOS ? 'Добавить на главный экран' : 'Установить приложение'}
    </button>
  )
}
