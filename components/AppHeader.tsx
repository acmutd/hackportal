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
      <header className="static p-4 flex  bg-white shadow-md">
        <div className="flex-0 text-xl font-bold" onClick={dismissDialog}>
          <Link href="/">
            <a>HackPortal</a>
          </Link>
        </div>
        <div className="flex flex-grow flex-row-reverse text-xl">
          <div className="mx-4">
            <button className="h-8" onClick={toggleDialog}>
              <AccountCircleIcon />
            </button>
          </div>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
