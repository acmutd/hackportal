import Link from 'next/link';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import { navItems } from '../lib/data';

/**
 * A global site header throughout the entire app.
 */
export default function AppHeader() {
  const [showMenu, setShowMenu] = React.useState(false);
  const { isSignedIn } = useAuthContext();
  const user = useUser();

  const [showProfileDialog, setShowProfileDialog] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const dismissDialog = () => {
    setShowProfileDialog(false);
  };
  const toggleDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  return (
    <>
      <header className="top-0 fixed justify-around flex flex-row p-2 min-w-[320px] w-screen bg-indigo-100 items-center h-16 z-10 md:justify-between md:p-4">
        <div className="flex w-6/12 max-w-[156px] justify-between items-center md:max-w-full md:justify-start md:w-9/12">
          <Link href="/">
            <a
              className="flex order-2 relative ml-[-6px] font-display self-center items-center w-[112px] md:order-1 md:ml-0 md:w-[176px] after:absolute after:block after:right-0 after:w-4 after:h-4 md:after:w-6 md:after:h-6 after:rounded-full after:bg-gray-400"
              onClick={dismissDialog}
            >
              <span className="text-[16px] font-black md:z-0 md:text-2xl md:mr-10">
                HackUTD VIII
              </span>
            </a>
          </Link>
          {/* Smartphone nav */}
          <div onClick={toggleMenu} className={'relative md:hidden'}>
            <MenuIcon />
            <ul
              className={`${
                showMenu ? 'translate-x-0' : '-translate-x-full'
              } transform transition-all ease-out duration-300 flex w-6/12 h-screen border-2 border-black flex-col bg-white fixed top-0 left-0 z-[-1] pt-16`}
            >
              {navItems.map((item) => (
                <Link key={item.text} href={item.path}>
                  <a
                    className="border-b-2 first:border-t-2 border-black p-4 py-6"
                    // onClick={dismissDialog, getItemCount}
                    onClick={dismissDialog}
                  >
                    <p className="text-sm font-bold">{item.text}</p>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
          {/* PC nav */}
          <div className="hidden text-xs order-2 md:flex items-center md:text-left lg:ml-12">
            {navItems.map((item) => (
              <Link key={item.text} href={item.path}>
                <a onClick={dismissDialog}>
                  <p className="md:mx-4 text-sm font-bold">{item.text}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:mr-8">
          <button
            className="font-header font-bold bg-white rounded-full border-2 border-black text-sm px-8 py-1"
            onClick={toggleDialog}
          >
            {!user || !isSignedIn ? 'Sign in' : 'Profile'}
          </button>
        </div>
        {showProfileDialog && <ProfileDialog onDismiss={dismissDialog} />}
      </header>
    </>
  );
}
