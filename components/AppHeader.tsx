import Link from 'next/link';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileDialog from './ProfileDialog';
import HackUTDLogo from './HackUTDLogo';
import MenuIcon from '@material-ui/icons/Menu';
import { getItemCount } from '../pages/dashboard/index';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';

import { navItems } from '../lib/data';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();

  const [showProfileDialog, setShowProfileDialog] = React.useState(false);

  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);

  const dismissDialog = () => {
    setShowProfileDialog(false);
  };

  const toggleDialog = () => {
    console.log('Dialog toggled');
    setShowProfileDialog(!showProfileDialog);
  };

  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-black shadow-md items-center z-50 min-h-[6rem]">
        <Link href="/">
          <a
            className="flex font-display self-center inline-block items-center"
            onClick={dismissDialog}
          >
            <HackUTDLogo />
            <span className="homeLogo md:text-2xl text-lg">HackUTD</span>
          </a>
        </Link>
        {/* Menu items */}
        <div className="lg:inline hidden md:flex justify-left md:text-xl text-md font-header md:text-left cursor:pointer">
          <Link href="/dashboard">
            <a
              onClick={() => {
                dismissDialog();
                getItemCount();
              }}
            >
              <span className="inline scheduledot md:invisible"></span>
              <div className="link lg:inline hidden">Dashboard</div>
            </a>
          </Link>
          <Link href="/schedule">
            <a onClick={dismissDialog}>
              <span className="inline scheduledot md:invisible"></span>
              <div className="link lg:inline hidden">Schedule</div>
            </a>
          </Link>
          <Link href="/speakers">
            <a onClick={dismissDialog}>
              <span className="inline speakerdot md:invisible"></span>
              <div className="link lg:inline hidden">Speakers</div>
            </a>
          </Link>
          <Link href="/sponsors">
            <a onClick={dismissDialog}>
              <span className="inline sponsordot md:invisible"></span>
              <div className="link lg:inline hidden">Sponsors</div>
            </a>
          </Link>
          <Link href="/about">
            <a onClick={dismissDialog}>
              <span className="inline faqdot md:invisible"></span>
              <div className="link lg:inline hidden">About</div>
            </a>
          </Link>
        </div>
        {/* Menu dropdown for mobile */}
        <div className="lg:hidden">
          <div className="dropdown inline-block relative bg-black text-sm rounded-full hover:rounded-b-none hover:rounded-t-2xl">
            <button className="dropdownButton text-gray-700 font-semibold py-1 px-4 rounded inline-flex items-center">
              <div className="mr-2">Menu</div>
              <MenuIcon />
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 -left-0.5">
              <li className="">
                <Link href="/dashboard">
                  <a
                    className="bg-black hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
                    onClick={() => {
                      dismissDialog();
                      getItemCount();
                    }}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href="/schedule">
                  <a className="bg-black hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap">
                    Schedule
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href="/speakers">
                  <a className="bg-black hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap">
                    Speakers
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href="/sponsors">
                  <a className="bg-black hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap">
                    Sponsors
                  </a>
                </Link>
              </li>
              <li className="">
                <Link href="/about">
                  <a className="bg-black hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap">
                    About
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row-reverse md:text-xl text-s">
          <div className="mx-4">
            <button
              className="SigninButton font-headerSigninButton font-header font-bold px-8 py-1 rounded-full border-2 border-black text-sm"
              onClick={toggleDialog}
            >
              {!user || !isSignedIn ? 'Sign in' : 'Profile'}
              {/* To Do: must fix profile pic button */}
              {/* {!user || !isSignedIn ? 'Sign in' : <Image src={user.photoUrl} alt="Profile">} */}
              {/* {clsx({'Sign in' : (!user || !isSignedIn)})} */}
            </button>
          </div>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
