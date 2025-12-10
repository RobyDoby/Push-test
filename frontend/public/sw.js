self.addEventListener('push', (event) => {
  const data = event.data ? JSON.parse(event.data.text()) : null
  
  if (!data) return

  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Уведомление', {
      body: data.body ?? '',
      icon: '/icon-192.png',
      vibrate: data.vibrate ?? [200, 100, 200],
      data: {
        url: '/'
      }
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
