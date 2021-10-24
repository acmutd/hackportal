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
      <header
        className="top-0 sticky justify-between flex flex-row p-2 md:p-4 shadow-md items-center h-16 z-10"
        style={{ backgroundColor: '#F2F3FF' }}
      >
        <div className="flex align-middle items-center">
          <Link href="/" passHref>
            <div
              className="flex font-display self-center inline-block items-center"
              onClick={dismissDialog}
            >
              <span className="md:text-2xl text-l font-semibold md:mr-10 mr-5">HackPortal</span>
            </div>
          </Link>
          <div className="md:text-xl text-xs md:text-left gap-x-6 flex flex-row">
            <Link href="/dashboard" passHref>
              <div onClick={dismissDialog} className="cursor-pointer">
                <span className="inline md:invisible"></span>
                <div className="md:mx-4 mr-2 font-medium">Dashboard</div>
              </div>
            </Link>
            <Link href="/sponsors" passHref>
              <div onClick={dismissDialog} className="cursor-pointer">
                <span className="inline md:invisible"></span>
                <a className="md:mx-4 mr-2 font-medium">Sponsors</a>
              </div>
            </Link>
            <Link href="/schedule" passHref>
              <div onClick={dismissDialog} className="cursor-pointer">
                <span className="inline md:invisible"></span>
                <a className="md:mx-4 mr-2 font-medium">Schedule</a>
              </div>
            </Link>
            <Link href="/about" passHref>
              <div onClick={dismissDialog} className="cursor-pointer">
                <span className="inline md:invisible"></span>
                <a className="md:mx-4 mr-2 font-medium">About</a>
              </div>
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
