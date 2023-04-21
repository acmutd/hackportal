import Link from 'next/link';
import NavLink from '../NavLink';
import { useAuthContext } from '../../lib/user/AuthContext';
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
    <section className="">
      <header className="hidden md:flex flex-row justify-center p-2 items-center">
        <div className=" md:text-base lg:text-xl font-header md:text-left text-complementary font-bold border-b-2 py-2">
          <NavLink
            href="/admin"
            exact={true}
            activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
            className="mr-4 py-2"
          >
            Event Dashboard
          </NavLink>
          <NavLink
            href="/admin/scan"
            exact={true}
            activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
            className="mx-4 py-2"
          >
            Scanner
          </NavLink>
          <NavLink
            href="/admin/users"
            exact={true}
            activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
            className="mx-4 py-2"
          >
            Users Dashboard
          </NavLink>
          {isAuthorized(user) && (
            <NavLink
              href="/admin/stats"
              exact={true}
              activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
              className="ml-4 py-2"
            >
              Stats at a Glance
            </NavLink>
          )}
        </div>
      </header>
      <div className="my-4 md:hidden ">
        <button className="accordion text-left p-2 text-sm bg-[#C1C8FF]">Admin Menu</button>
        <div className="panel w-full bg-[#F2F3FF] text-sm">
          <ul className="">
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/admin">Event Dashboard</Link>
            </li>
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/admin/scan">Scanner</Link>
            </li>
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/admin/users">Users Dashboard</Link>
            </li>
            {isAuthorized(user) && (
              <li className="p-2 hover:bg-[#DCDEFF]">
                <Link href="/admin/stats">Stats at a Glance</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
