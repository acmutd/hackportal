importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

// set up service worker
self.addEventListener('push', async function (event) {
  const { announcement, iconUrl } = event.data.json().data;
  var options = {
    body: announcement,
    icon: iconUrl,
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
      if (client.url == '/dashboard' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow) return clients.openWindow('/dashboard');
  }))
}
);