importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

function setup() {
  // TODO: Abstract this into environment variable
  firebase.initializeApp({
    apiKey: "AIzaSyCEhWNvn1d6-OfqvmGiDW9X1BlwNo8qBsM",
    authDomain: "acmutd-hackportal-dev.firebaseapp.com",
    projectId: "acmutd-hackportal-dev",
    storageBucket: "acmutd-hackportal-dev.appspot.com",
    messagingSenderId: "774212472252",
    appId: "1:774212472252:web:273c09e0cb085059b6afb9",
    measurementId: "G-HHBS9T3R9E"
  });
    
  const messaging = firebase.messaging();

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    clients.openWindow(event.notification.data.url);
  })

  messaging.onBackgroundMessage(function (payload) {
    const { announcement, baseUrl: url } = payload.data;
    var options = {
      body: announcement,
      icon: 'https://raw.githubusercontent.com/acmutd/hackportal/develop/public/icons/icon-128x128.png',
      data: { url }
    };
    self.registration.showNotification("HackPortal Announcement", options);
  });
}

setup();


//background notifications will be received here

