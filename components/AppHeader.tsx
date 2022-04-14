import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import { navItems } from '../lib/data';
import firebase from 'firebase/app';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const { isSignedIn } = useAuthContext();
  const [mobileIcon, setMobileIcon] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const user = useUser();

  useEffect(() => {
    if (firebase.auth().currentUser !== null && !firebase.auth().currentUser.emailVerified) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //signed out succesfully
        })
        .catch((error) => {
          console.warn('Could not sign out');
        });
    }
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setMobileIcon(!mobileIcon);
  };

  const dismissDialog = () => {
    setShowProfileDialog(false);
  };
  const toggleDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  document.addEventListener('mousedown', (event) => {
    const targetComponent = document.querySelector('.profileDialog');
    if (
      targetComponent !== null &&
      !document.querySelector('.profileDialog').contains(event.target as Node)
    ) {
      dismissDialog();
    }
  });

  return (
    <>
      <div className="min-h-[4rem]"></div>
      <header className="top-0 fixed justify-between flex flex-row w-full bg-white items-center h-16 z-10 p-4">
        <div className="flex w-6/12 max-w-[156px] justify-between items-center md:max-w-full md:justify-start md:w-9/12">
          <Link href="/">
            <a className="flex order-2 relative ml-[-6px] font-display self-center items-center w-[112px] md:order-1 md:ml-0 md:w-[176px] after:absolute after:block after:right-0 after:w-4 after:h-4 md:after:w-6 md:after:h-6 after:rounded-full after:bg-gray-400">
              <span className="text-[16px] font-black md:z-0 md:text-2xl text-black">Hack</span>
              <span className="text-[16px] font-black md:z-0 md:text-2xl text-violet-750">AI</span>
            </a>
          </Link>
          {/* Smartphone nav */}
          <div onClick={toggleMenu} className={'relative md:hidden'}>
            {mobileIcon ? <MenuIcon /> : <CloseIcon />}
            <ul
              className={`${
                showMenu ? 'translate-x-0' : '-translate-x-full'
              } transform transition-all ease-out duration-300 flex w-6/12 h-screen border-2 border-black flex-col bg-white fixed top-0 left-0 z-[-1] pt-16`}
            >
              {navItems.map((item) => (
                <Link key={item.text} href={item.path}>
                  <a className="border-b-2 first:border-t-2 border-black p-4 py-6 hover:bg-violet-750 hover:text-black hover:rounded-md">
                    <p className="text-sm font-bold">{item.text}</p>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
          {/* PC nav */}
          <div className="hidden text-xs order-2 md:flex items-center md:text-left lg:ml-12 ">
            {navItems.map((item) => (
              <Link key={item.text} href={item.path}>
                <a>
                  <p className="md:mx-4 text-sm font-bold text-black hover:bg-violet-750 p-1 hover:text-white hover:rounded-md">
                    {item.text}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:mr-8">
          {/*mt-6 rounded-full py-2 px-8 text-lg bg-capri text-black hover:bg-blue-400 hover:text-white text-ocean font-medium */}
          <button
            className="font-header font-bold bg-violet-750 rounded-full border-black hover:bg-violet-850 hover:text-white text-black text-sm px-8 py-2"
            onClick={toggleDialog}
          >
            {!user || !isSignedIn ? 'Sign in' : 'Profile'}
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
