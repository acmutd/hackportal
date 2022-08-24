import Link from 'next/link';
import NavLink from './NavLink';
import { useAuthContext } from '../lib/user/AuthContext';
import { useEffect } from 'react';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

/**
 * A dashboard header.
 */
export default function AdminHeader() {
  const { user } = useAuthContext();

  useEffect(() => {
    accordion();
  }, []);

  const accordion = () => {
    var acc = document.getElementsByClassName('accordion');
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('menuactive');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  };

  return (
    <section className="p-4 mt-[6rem]">
      <header className="top-0 sticky hidden md:flex flex-row justify-between p-2 md:p-4 items-center">
        <div className="mx-auto md:flex justify-center text-xl font-header md:text-left">
          <NavLink
            href="/admin"
            exact={true}
            addClass="border-b-2 border-white"
            className="mx-4 sourceSansPro textGradient 2xl:text-4xl lg:text-3xl md:text-xl font-semibold"
          >
            Event Dashboard
          </NavLink>
          <NavLink
            href="/admin/scan"
            exact={true}
            addClass="border-b-2 border-white"
            className="mx-4 sourceSansPro textGradient 2xl:text-4xl lg:text-3xl md:text-xl font-semibold"
          >
            Scanner
          </NavLink>
          <NavLink
            href="/admin/users"
            exact={true}
            addClass="border-b-2 border-white"
            className="mx-4 sourceSansPro textGradient 2xl:text-4xl lg:text-3xl md:text-xl font-semibold"
          >
            Users Dashboard
          </NavLink>
          {isAuthorized(user) && (
            <NavLink
              href="/admin/stats"
              exact={true}
              addClass="border-b-2 border-white"
              className="mx-4 sourceSansPro textGradient 2xl:text-4xl lg:text-3xl md:text-xl font-semibold"
            >
              Stats at a Glance
            </NavLink>
          )}
        </div>
      </header>
      <div className="my-4 md:hidden ">
        <button className="accordion text-left p-2 text-base accountSection font-bold">
          Admin Menu
        </button>
        <div className="panel adminHeaderList w-full text-sm">
          <ul className="">
            <Link href="/admin" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">Event Dashboard</li>
            </Link>
            <Link href="/admin/scan" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">Scanner</li>
            </Link>
            <Link href="/admin/users" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">Users Dashboard</li>
            </Link>
            {isAuthorized(user) && (
              <Link href="/admin/stats" passHref={true}>
                <li className="p-2 adminHeaderItem cursor-pointer">Stats at a Glance</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
