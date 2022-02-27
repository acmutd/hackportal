importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

// TODO: Abstract this into environment variable

self.addEventListener('fetch', () => {
  const urlParams = new URLSearchParams(location.search);
  const { iconUrl, ...firebaseConfig } = Object.fromEntries(urlParams);
  self.iconUrl = iconUrl;
  self.firebaseConfig = firebaseConfig;
})

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};


function setup() {
  firebase.initializeApp(self.firebaseConfig || defaultConfig);
    
  const messaging = firebase.messaging();

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    clients.openWindow(event.notification.data.url);
  })

  messaging.onBackgroundMessage(function (payload) {
    const { announcement, baseUrl: url } = JSON.parse(payload.data.notification);
    var options = {
      body: announcement,
      icon: self.iconUrl,
      data: { url }
    };
    self.registration.showNotification("HackPortal Announcement", options);
  });
}

setup();


//background notifications will be received here

