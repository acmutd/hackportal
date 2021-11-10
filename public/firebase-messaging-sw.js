importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

// TODO: Abstract this into environment variable
firebase.initializeApp({
    apiKey: "AIzaSyCEhWNvn1d6-OfqvmGiDW9X1BlwNo8qBsM",
    authDomain: "acmutd-hackportal-dev.firebaseapp.com",
    projectId: "acmutd-hackportal-dev",
    storageBucket: "acmutd-hackportal-dev.appspot.com",
    messagingSenderId: "774212472252",
    appId: "1:774212472252:web:273c09e0cb085059b6afb9",
});

firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler(function (payload) {
  const { announcement } = JSON.parse(payload.data.notification);
  var options = {
    body: announcement,
    icon: '/icons/launcher-icon-4x.png',
  };
  self.registration.showNotification("HackPortal Announcement", options);
});
