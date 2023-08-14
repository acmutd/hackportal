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
      <div className="md:h-[8rem] h-[5rem]"></div>
      <header className="top-0 fixed w-full z-10">
        <header className=" justify-between flex flex-row w-full bg-[url('/assets/appheader_bg.png')] bg-no-repeat bg-cover items-center max-h-[5rem] h-20 lg:px-4 px-2 drop-shadow">
          <div className="flex flex-row order-1 md:order-none items-center sm:w-[11rem] w-[7rem]">
            {/* Smartphone nav */}
            <div onClick={toggleMenu} className="md:hidden cursor-pointer text-[#BD8A31]">
              {mobileIcon ? <MenuIcon /> : <CloseIcon />}
              <ul
                className={`${
                  showMenu ? 'translate-x-0' : '-translate-x-full'
                } transform transition-all ease-out duration-300 flex w-6/12 h-screen flex-col bg-[url('/assets/about-bg.jpeg')] fixed top-0 left-0 z-[-1] mt-[5rem] shadow-md shadow-[#111A31]`}
              >
                {dynamicNavItems.map((item) => (
                  <Link key={item.text} href={item.path}>
                    <a className="px-4 py-6 hover:bg-[#111A31] hover:text-white text-[#111A31]">
                      <p className="text-xl font-medium">{item.text}</p>
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
            <Link href="/">
              <a className="flex gap-2 ml-[6px] font-display self-center items-center md:ml-0">
                {/* !change src */}
                <Image src={'/assets/Logo-Dark.png'} width={60} height={60} className="w-10 h-10" />
              </a>
            </Link>
          </div>
          <div className="order-2 animate-text bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent hidden md:block font-bold text-center md:text-xl text-sm uppercase">
            <div>HackUTD X:</div>
            <div>Golden Hour</div>
          </div>
          <div className="flex flex-row justify-center items-center order-2 md:order-3 sm:w-[11rem] w-[7rem]">
            <button
              className="font-header font-bold border-2 rounded-full border-[#BD8A31] text-[#F6CC82] md:text-sm text-xs uppercase xl:px-10 md:px-6 sm:px-10 px-5 py-2 hover:border-[#F6CC82] hover:text-[#F6CC82] transition duration-300 ease-in-out"
              onClick={toggleDialog}
            >
              {!user || !isSignedIn ? 'Sign in' : hasProfile ? 'Profile' : 'Register'}
            </button>
          </div>
          {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
        </header>
        {/* PC nav */}
        <div className="bg-[url('/assets/appheader-dash.png')] bg-no-repeat bg-[length:100%_105%] hidden order-2 md:flex justify-center items-center md:text-center space-x-6 lg:space-x-12 text-white w-full p-2 min-h-[3rem] max-h-[3rem]">
          {dynamicNavItems.map((item) => (
            <NavLink
              key={item.text}
              href={item.path}
              exact={item.text == 'Home' ? true : false}
              activeOptions={'border-b-2 border-[#F6D498]'}
              className="h-full"
            >
              <div className="2xl:mx-4 lg:mx-2 md:mx-0 2xl:text-lg lg:text-sm text-sm flex items-center">
                <p className="">{item.text}</p>
              </div>
            </NavLink>
          ))}
        </div>
        <a
          id="mlh-trust-badge"
          className="absolute right-2 md:right-4 lg:right-6 top-0 mt-[5rem] md:mt-[8rem] -z-10 w-[5rem] h-[6rem] md:w-[6rem] md:h-[7rem] lg:w-[8rem] lg:h-[9rem] 2xl:w-[10rem] 2xl:h-[11rem]"
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=white"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-yellow.svg"
            alt="Major League Hacking 2023 Hackathon Season"
            layout="fill"
          ></Image>
        </a>
      </header>
    </>
  );
}
