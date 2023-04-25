import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import { navItems } from '../lib/data';
import firebase from 'firebase/app';
import Image from 'next/image';
import NavLink from './NavLink';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const { isSignedIn, hasProfile, profile } = useAuthContext();
  const [mobileIcon, setMobileIcon] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState(navItems);
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

    //creating dynamic nav items
    setDynamicNavItems((dynamicNavItems) => {
      if (
        isSignedIn &&
        profile &&
        (profile.user.permissions[0] === 'admin' ||
          profile.user.permissions[0] === 'super_admin') &&
        dynamicNavItems.filter(({ text }) => text === 'Admin').length === 0
      ) {
        return [...dynamicNavItems, { text: 'Admin', path: '/admin' }];
      }
      return dynamicNavItems;
    });
  }, []);

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
      <div className="min-h-[5rem]"></div>
      <header className="top-0 fixed justify-between flex flex-row w-full bg-white items-center h-20 z-10 lg:px-4 px-2 drop-shadow">
        <div className="flex flex-row order-1 md:order-none items-center">
          {/* Smartphone nav */}
          <div onClick={toggleMenu} className="md:hidden cursor-pointer text-complementary">
            {mobileIcon ? <MenuIcon /> : <CloseIcon />}
            <ul
              className={`${
                showMenu ? 'translate-x-0' : '-translate-x-full'
              } transform transition-all ease-out duration-300 flex w-6/12 h-screen flex-col bg-white fixed top-0 left-0 z-[-1] mt-[80px] border-t-2 border-complementary/10`}
            >
              {dynamicNavItems
                .filter(({ text }) => text !== 'Home')
                .map((item) => (
                  <Link key={item.text} href={item.path}>
                    <a className="p-9 py-6 hover:bg-primaryDark hover:text-white text-complementary">
                      <p className="text-xl font-medium">{item.text}</p>
                    </a>
                  </Link>
                ))}
            </ul>
          </div>
          <Link href="/">
            <a className="flex gap-2 ml-[6px] font-display self-center items-center md:ml-0">
              {/* !change src */}
              <Image src={'/assets/hp-logo.png'} width="45px" height="35px" />
              <span className="text-lg font-black md:z-0 md:text-3xl text-primaryDark">
                HackPortal
              </span>
            </a>
          </Link>
        </div>

        {/* PC nav */}
        <div className="hidden order-2 md:flex items-center md:text-center lg:ml-12 text-complementary space-x-6 lg:space-x-12 h-full">
          {dynamicNavItems.map((item) => (
            <NavLink
              key={item.text}
              href={item.path}
              exact={item.text == 'Home' ? true : false}
              activeOptions={'2xl:border-b-[6px] border-b-4 border-primaryDark'}
              className="h-full"
            >
              <div className="2xl:mx-4 lg:mx-2 md:mx-0 2xl:text-lg lg:text-base text-sm font-bold flex items-center h-full">
                <p className="my-auto">{item.text}</p>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-row justify-center items-center order-2 md:order-3">
          <button
            className="font-header font-bold bg-secondary rounded-full text-primaryDark text-sm xl:px-10 md:px-6 px-10 py-1 hover:bg-primaryDark hover:text-secondary transition duration-300 ease-in-out"
            onClick={toggleDialog}
          >
            {!user || !isSignedIn ? 'Sign in' : hasProfile ? 'Profile' : 'Register'}
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
