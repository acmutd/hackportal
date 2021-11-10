import Link from 'next/link';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileDialog from './ProfileDialog';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';
import { getItemCount } from '../pages/dashboard/index';
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
              className="flex order-2 z-[-2] relative ml-[-6px] font-display self-center items-center w-[112px] md:order-1 md:ml-0 md:w-[176px] after:absolute after:block after:right-0 after:w-4 after:h-4 md:after:w-6 md:after:h-6 after:rounded-full after:bg-gray-400"
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
                    onClick={() => {
                      dismissDialog();
                      getItemCount();
                    }}
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
                <a
                  onClick={() => {
                    dismissDialog();
                    getItemCount();
                  }}
                >
                  <p className="md:mx-4 text-sm font-bold">{item.text}</p>
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
        </div>
        <div className="flex lg:mr-8">
          <button
            className="font-header font-bold bg-white rounded-full border-2 border-black text-sm px-8 py-1"
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
