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
import Pluwuto from '../public/assets/Pluwuto.png';

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
    if (
      isSignedIn &&
      profile &&
      (profile.user.permissions[0] === 'admin' || profile.user.permissions[0] === 'super_admin')
    ) {
      setDynamicNavItems((dynamicNavItems) => [
        ...dynamicNavItems,
        { text: 'Admin', path: '/admin' },
      ]);
    } else {
      setDynamicNavItems(navItems);
    }
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
      <header className="appHeader fixed top-0 justify-between flex w-full items-center h-16 z-50 py-4 lg:px-6 px-4">
        <div className="flex items-center md:w-46 lg:w-52 text-white ml-0 lg:ml-6">
          <Link href="/">
            <a className="flex gap-2 order-2 relative font-display md:order-1 items-center">
              {/* !change src */}
              <div className="relative md:w-[50px] md:h-[50px] w-[40px] h-[40px]">
                <Image src={'/assets/HackUTD-IX-Logo.png'} alt="Logo" layout="fill" />
              </div>
              <span className="nasalization  md:z-0 text-xl lg:text-2xl">HACKUTD IX</span>
            </a>
          </Link>
          {/* Smartphone nav */}
          <div onClick={toggleMenu} className={'relative md:hidden mr-2'}>
            {mobileIcon ? <MenuIcon /> : <CloseIcon />}
            <ul
              className={`${
                showMenu ? 'translate-x-0' : '-translate-x-full'
              } transform transition-all ease-out duration-300 flex w-full h-screen border-2 navbarBackground border-black flex-col fixed top-0 left-0 z-[-1] pt-16`}
            >
              {dynamicNavItems.map((item) => (
                <NavLink
                  key={item.text}
                  href={item.path}
                  exact={item.text === 'Dashboard' ? false : true}
                  addClass="font-semibold"
                >
                  <a className="">
                    <p className="text-lg text-white p-4 py-6 raise">{item.text}</p>
                  </a>
                </NavLink>
              ))}
              <div className="p-6 -rotate-12 absolute bottom-0">
                <Image src={Pluwuto} alt="" width={90} height={90}></Image>
              </div>
            </ul>
          </div>
        </div>
        {/* PC nav */}
        {isSignedIn &&
        profile &&
        (profile.user.permissions[0] === 'admin' ||
          profile.user.permissions[0] === 'super_admin') ? (
          <div className="hidden order-2 md:flex justify-center text-white">
            <div className="flex">
              {dynamicNavItems.map((item, idx) => (
                <NavLink key={item.text} href={item.path} exact={true} addClass="font-bold">
                  <a>
                    <p className="mx-2 xl:mx-6 2xl:mx-10 text-sm lg:text-lg xl:text-2xl ">
                      {item.text}
                    </p>
                  </a>
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden order-2 md:flex justify-center text-white">
            <div className="flex justify-end xl:w-[23rem] lg:w-[16rem] md:w-11">
              {dynamicNavItems.map(
                (item, idx) =>
                  idx < 2 && (
                    <NavLink
                      key={item.text}
                      href={item.path}
                      exact={item.text === 'Dashboard' ? false : true}
                      addClass="font-bold"
                    >
                      <a>
                        <p className="mx-2 lg:mx-4 xl:mx-10 2xl:mx-14 text-base lg:text-lg xl:text-2xl">
                          {item.text}
                        </p>
                      </a>
                    </NavLink>
                  ),
              )}
            </div>
            <div className="flex xl:w-[23rem] lg:w-[16rem] md:w-11">
              {dynamicNavItems.map(
                (item, idx) =>
                  idx > 1 && (
                    <NavLink key={item.text} href={item.path} exact={true} addClass="font-bold">
                      <a>
                        <p className="mx-1 lg:mx-4 xl:mx-10 2xl:mx-14 text-base lg:text-lg  xl:text-2xl">
                          {item.text}
                        </p>
                      </a>
                    </NavLink>
                  ),
              )}
            </div>
          </div>
        )}
        <div className="order-3 md:w-44 lg:w-52 flex justify-end text-white md:mr-6">
          <button
            className="font-header font-medium bg-gradient-to-b from-[#F33C2C] to-[#661912] rounded-full text-base md:text-lg lg:text-xl md:px-8 px-5 py-1"
            onClick={toggleDialog}
          >
            {!user || !isSignedIn ? 'Sign in' : hasProfile ? 'Profile' : 'Register'}
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
      <a
        id="mlh-trust-badge"
        className="absolute right-2 md:right-4 lg:right-6 top-0 mt-[4rem] z-10 w-[5rem] h-[6rem] md:w-[6rem] md:h-[7rem] lg:w-[8rem] lg:h-[9rem] 2xl:w-[10rem] 2xl:h-[11rem]"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=white"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2023/mlh-trust-badge-2023-white.svg"
          alt="Major League Hacking 2023 Hackathon Season"
          layout="fill"
        ></Image>
      </a>
    </>
  );
}
