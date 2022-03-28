import Link from 'next/link';
import NavLink from './NavLink';
import { useEffect } from 'react';

/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  useEffect(() => {
    accordion();
  }, []);
  const accordion = () => {
    var acc = document.getElementsByClassName('accordion');
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
      <header className="md:inline hidden flex justify-center py-2 md:p-4 items-center">
        <div className="mx-auto flex flex-wrap justify-center lg:text-xl text-lg font-header text-center">
          <NavLink href="/dashboard" exact={true} className="mx-4">
            HackCenter
          </NavLink>
          <NavLink href="/dashboard/scan-in" exact={true} className="mx-4">
            Scan-In
          </NavLink>
          <NavLink href="/dashboard/questions" exact={true} className="mx-4">
            Ask a Question
          </NavLink>
        </div>
      </header>
      <div className="my-4 md:hidden ">
        <button className="accordion text-left p-2 text-sm bg-[#C1C8FF]">Dashboard Menu</button>
        <div className="panel w-full bg-[#F2F3FF] text-sm">
          <ul className="">
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/dashboard">HackCenter</Link>
            </li>
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/dashboard/scan-in">Scan-In</Link>
            </li>
            <li className="p-2 hover:bg-[#DCDEFF]">
              <Link href="/dashboard/questions">Ask a Question</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
