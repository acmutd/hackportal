importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

// set up service worker
self.addEventListener('push', async function (event) {
  console.log('[Service Worker] Push Received.', event);
  const { announcement, baseUrl, iconUrl } = event.data.json().data;
  var options = {
    body: announcement,
    icon: iconUrl,
    data: { url: baseUrl },
  };
  event.waitUntil(
    self.registration.showNotification('HackPortal Announcement', options)
  );
});

// add notification click handler
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function (clientList) {
    for (const client of clientList) {
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow) return clients.openWindow('/');
  }))
}
);