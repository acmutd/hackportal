importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

// Get icon url and firebaseconfig from URL params
self.addEventListener('fetch', () => {
  const urlParams = new URLSearchParams(location.search);
  const { iconUrl, ...firebaseConfig } = Object.fromEntries(urlParams);
  self.iconUrl = iconUrl;
  self.firebaseConfig = firebaseConfig;
  setup();
});

// set up service worker
function setup(){
  if (firebase.apps.length <= 0) firebase.initializeApp(self.firebaseConfig);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(function (payload) {
    const { announcement, baseUrl: url } = payload.data;
    var options = {
      body: announcement,
      icon: self.iconUrl,
      data: { url }
    };
    self.registration.showNotification("HackPortal Announcement", options);
  });
}

// add notification click handler
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  clients.openWindow(event.notification.data.url);
});