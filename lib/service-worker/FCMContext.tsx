import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { RequestHelper } from '../request-helper';

interface FCMContextState {
  fcmSw: ServiceWorkerRegistration;
  messageToken: string;
  resetToken: () => Promise<void>;
  messagingObj: firebase.messaging.Messaging;
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
  const [messagingObj, setMessagingObj] = useState<firebase.messaging.Messaging>();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        this.navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
          async (registration) => {
            setSwRegistration(registration);
            if (firebase.apps.length <= 0)
              firebase.initializeApp({
                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
              });

            const messaging = firebase.messaging();
            setMessagingObj(messaging);

            if (Notification.permission !== 'granted') await Notification.requestPermission();
            const token = await messaging.getToken({
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
            });
            await RequestHelper.post<{ token: string }, void>(
              '/api/tokens',
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
              {
                token,
              },
            );

            setMessageToken(token);
            messaging.onMessage((payload) => {
              const { announcement } = JSON.parse(payload.data.notification);
              const options = {
                body: announcement,
              };
              registration.showNotification('HackPortal Announcement', options);
            });
            console.log('Service Worker registration successfully');
          },
          function (err) {
            console.log('Service Worker registration failed');
          },
        );
      });
    }
  }, []);

  const resetToken = async () => {
    await messagingObj.deleteToken();
    const newToken = await messagingObj.getToken({ vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
    setMessageToken(newToken);
  };

  const swContextValue: FCMContextState = {
    fcmSw: swRegistration,
    messageToken,
    resetToken,
    messagingObj,
  };

  return <FCMContext.Provider value={swContextValue}>{children}</FCMContext.Provider>;
}

export { FCMContext, FCMProvider, useFCMContext };
