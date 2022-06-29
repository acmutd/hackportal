import { useAuthContext } from '../lib/user/AuthContext';
import { useEffect } from 'react';
import NavLink from './NavLink';
import Link from 'next/link';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

/**
 * An about header.
 */
export default function AdminHeader() {
  const { user } = useAuthContext();

  useEffect(() => {
    accordion();
  }, []);
  const accordion = () => {
    var acc = document.getElementsByClassName('adminAccordion');
    var i;
    for (i = 0; i < acc.length; i++) {
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
    <>
      <section className="md:inline hidden p-4">
        <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 items-center">
          <div className="mx-auto md:flex justify-center text-xl font-header md:text-left">
            <NavLink href="/admin" exact={true} className="mx-4">
              Event Dashboard
            </NavLink>
            <NavLink href="/admin/scan" exact={true} className="mx-4">
              Scanner
            </NavLink>
            <NavLink href="/admin/users" exact={true} className="mx-4">
              Users Dashboard
            </NavLink>
            {isAuthorized(user) && (
              <NavLink href="/admin/stats" exact={true} className="mx-4">
                Stats at a Glance
              </NavLink>
            )}
          </div>
        </header>
      </section>
      <section className="my-4 md:hidden px-6">
        <button className="adminAccordion text-left p-2 text-sm bg-[#C1C8FF] w-full">
          Admin Menu
        </button>
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
      </section>
    </>
  );
}
