import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';

export default function HomeNotif() {
  const [notif, setNotif] = useState(true);
  const popup = useRef(null);

  useEffect(() => {
    setNotif(checkNotif());
    triggerPopup();
  }, []);

  const checkNotif = () => {
    //pop up visible if user did not enable push notif and browser supports push notif
    const isSupported =
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      firebase.messaging.isSupported();
    if (isSupported && Notification.permission !== 'granted') {
      Notification.requestPermission();
      return true;
    }
    return false;
  };

  const triggerPopup = () => {
    popup.current.classList.add('show');
    setTimeout(() => setNotif(false), 4000);
  };

  return (
    notif && (
      <div
        id="popup"
        ref={popup}
        className="fixed z-50 md:translate-x-0 translate-x-1/2 flex md:w-[22rem] w-[20rem] rounded-b-md px-4 py-2 top-20 md:right-6 right-1/2 md:text-base text-sm border-t-8 border-primaryDark bg-secondary"
      >
        <svg
          className="fill-current md:h-6 h-5 md:w-6 w-5 text-primaryDark mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
        Turn on push notifications to receive announcements!
      </div>
    )
  );
}
