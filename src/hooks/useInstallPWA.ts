/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"

export const useInstallPWA = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)

  // Проверяем iOS
  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)
  }, [])

  // Проверяем, установлено ли уже PWA
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      console.log('PWA уже установлено')
      setShowInstallPrompt(false)
    }
  }, [])

  // Слушаем событие beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
      console.log('PWA можно установить')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // Функция установки
  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('Пользователь установил PWA')
      setShowInstallPrompt(false)
    }
  }

  // Для iOS показываем инструкцию
  const handleIOSInstall = () => {
    alert(
      'Для установки на iOS:\n1. Нажмите "Поделиться"\n2. Выберите "На экран «Домой»"\n3. Нажмите "Добавить"'
    )
  }

  return {
    handleIOSInstall,
    handleInstallClick,
    isIOS,
    showInstallPrompt,
  }
}
