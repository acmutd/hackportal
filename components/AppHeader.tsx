import Link from 'next/link';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileDialog from './ProfileDialog';

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
      <header className="top-0 sticky justify-between flex flex-row p-2 md:p-4 bg-white shadow-md items-center h-16 z-10">
        <div className="flex align-middle items-center">
          <Link href="/">
            <a
              className="flex font-display self-center inline-block items-center"
              onClick={dismissDialog}
            >
              <span className="md:text-2xl text-l font-semibold md:mr-10 mr-5">HackPortal</span>
            </a>
          </Link>
          <div className="md:text-xl text-xs md:text-left">
            <Link href="/dashboard">
              <a onClick={dismissDialog}>
                <span className="inline md:invisible"></span>
                <a className="">Dashboard</a>
              </a>
            </Link>
            <Link href="/sponsors">
              <a onClick={dismissDialog}>
                <span className="inline md:invisible"></span>
                <a className="">Sponsors</a>
              </a>
            </Link>
            <Link href="/schedule">
              <a onClick={dismissDialog}>
                <span className="inline md:invisible"></span>
                <a className=" ">Schedule</a>
              </a>
            </Link>
            <Link href="/about">
              <a onClick={dismissDialog}>
                <span className="inline md:invisible"></span>
                <a className="">About</a>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row-reverse md:text-xl text-s">
          <div className="mx-4">
            <button className="SigninButton font-header" onClick={toggleDialog}>
              Sign In
            </button>
          </div>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
