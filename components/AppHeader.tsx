import Link from 'next/link';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileDialog from './ProfileDialog';

import { navItems } from '../lib/data';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
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
