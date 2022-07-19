import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { RequestHelper } from '../request-helper';
import { firebaseConfig } from '../firebase-client';
import 'firebase/messaging';

interface FCMContextState {
  fcmSw: ServiceWorkerRegistration;
  messageToken: string;
}

const FCMContext = createContext<FCMContextState | undefined>(undefined);

function useFCMContext(): FCMContextState {
  const context = useContext(FCMContext);
  if (!context) throw new Error('useSWContext must be used in a provider');
  return context;
}

function FCMProvider({ children }: React.PropsWithChildren<Record<string, any>>): JSX.Element {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration>();
  const [messageToken, setMessageToken] = useState<string>();

  useEffect(() => {
    if ('serviceWorker' in window.navigator) {
      const swParamString = new URLSearchParams({
        iconUrl: process.env.NEXT_PUBLIC_ICON_URL,
        ...firebaseConfig,
      }).toString();

      window.navigator.serviceWorker
        .register(`/firebase-messaging-sw.js?${swParamString}`)
        .then(listenForNotifications, (error) => {
          console.log('Service worker registration failed:', error);
        });
    }
  }, []);

  /**
   * Initializes the firebase messaging API
   * to listen for and recieve announcements
   */
  const listenForNotifications = async (registration: ServiceWorkerRegistration) => {
    // Set service worker registration object to state variable
    setSwRegistration(registration);
    console.log('Service Worker registered successfully');

    // Initialize firebase app and get messaging
    if (firebase.apps.length <= 0) firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // Ask user to enable notifications
    // If not granted, exit
    if (Notification.permission === 'default') await Notification.requestPermission();
    if (Notification.permission !== 'granted') return;

    // Get token and save in database
    let token = await messaging.getToken({
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });
    await RequestHelper.post<{ token: string }, void>(
      '/api/tokens',
      { headers: { 'Content-Type': 'application/json' } },
      { token },
    );
    setMessageToken(token);

    // Listen for messages
    messaging.onMessage((payload) => {
      const { announcement, baseUrl: url } = payload.data;
      const options = {
        body: announcement,
        icon: 'icons/icon-128x128.png',
        tag: new Date().toUTCString(),
        data: { url },
      };
      registration.showNotification('HackPortal Announcement', options);
    });
  };

  const swContextValue: FCMContextState = {
    fcmSw: swRegistration,
    messageToken,
  };

  return <FCMContext.Provider value={swContextValue}>{children}</FCMContext.Provider>;
}

export { FCMContext, FCMProvider, useFCMContext };
