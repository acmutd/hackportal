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
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-white shadow-md items-center">
        <Link href="/">
          <a
            className="flex font-display self-center inline-block items-center"
            onClick={dismissDialog}
          >
            <span className="text-2xl font-semibold">HackPortal</span>
          </a>
        </Link>
        <div className="md:flex justify-center text-xl font-header md:text-left">
          <Link href="/dashboard">
            <a onClick={dismissDialog}>
              <span className="inline md:invisible"></span>
              <a className="link">Dashboard</a>
            </a>
          </Link>
          <Link href="/sponsors">
            <a onClick={dismissDialog}>
              <span className="inline md:invisible"></span>
              <a className="link">Sponsors</a>
            </a>
          </Link>
          <Link href="/schedule">
            <a onClick={dismissDialog}>
              <span className="inline md:invisible"></span>
              <a className="link">Schedule</a>
            </a>
          </Link>
          <Link href="/about">
            <a onClick={dismissDialog}>
              <span className="inline md:invisible"></span>
              <a className="link">About</a>
            </a>
          </Link>
        </div>
        <div className="flex flex-row-reverse text-xl">
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
