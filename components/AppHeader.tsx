import Link from 'next/link';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import clsx from 'clsx';

import { navItems } from '../lib/data';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();

  const [showProfileDialog, setShowProfileDialog] = React.useState(false);

  const dismissDialog = () => {
    setShowProfileDialog(false);
  };

  const toggleDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  return (
    <>
      <header className="top-0 sticky justify-between flex flex-row p-2 md:p-4 bg-indigo-100 items-center h-16 z-10">
        <div className="flex w-6/12 align-middle items-center">
          <Link href="/">
            <a
              className="flex relative font-display self-center items-center after:absolute after:block after:right-0 after:w-6 after:h-6 after:rounded-full after:bg-gray-400"
              onClick={dismissDialog}
            >

              <span className="md:text-2xl text-l font-black md:mr-10 mr-5">HackUTD VIII</span>
            </a>
          </Link>
          <div className="text-xs flex items-center ml-12 md:text-left">
            {navItems.map((item) => (
              <Link key={item.text} href={item.path}>
                <a onClick={dismissDialog}>
                  <span className="md:invisible"></span>
                  <a className="md:mx-4 text-sm font-bold">{item.text}</a>
                </a>
              </Link>
            ))}
          </div>

          <div className="mx-4 sm:hidden">
            <div className="dropdown inline-block relative">
              <button className="bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded inline-flex items-center">
                <span className="mr-1">Menu</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className="">
                  <Link href="/dashboard">
                    <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/sponsors">
                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Sponsors
                    </a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/schedule">
                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Schedule
                    </a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/about">
                    <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      About
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* End of main menu items */}
        </div>

        <div className="flex mr-8">
          <button
            className="SigninButton font-header font-bold bg-white px-8 py-1 rounded-full border-2 border-black text-sm"
            onClick={toggleDialog}
          >
            Sign In
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
