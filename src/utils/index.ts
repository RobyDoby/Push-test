export async function subscribeUser(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  
  if (permission !== "granted") return null;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY
  });
console.log("Current subscription:", subscription);
  return subscription;
}
