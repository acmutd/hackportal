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
    let acc = document.getElementsByClassName('accordion');
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
    <section>
      <header className="md:block hidden justify-center py-2 md:p-4 items-center">
        <div className="mx-auto flex flex-wrap justify-center text-center">
          <NavLink
            href="/dashboard"
            exact={true}
            addClass="border-b-2 border-white"
            className="mx-4 sourceSansPro textGradient xl:text-5xl md:text-3xl font-semibold"
          >
            HackCenter
          </NavLink>
          <NavLink
            href="/dashboard/scan-in"
            exact={true}
            addClass="border-b-2 border-white"
            className="xl:mx-16 md:mx-8 sourceSansPro textGradient xl:text-5xl md:text-3xl font-semibold"
          >
            Scan-In
          </NavLink>
          <NavLink
            href="/dashboard/questions"
            exact={true}
            addClass="border-b-2 border-white"
            className="mx-4 sourceSansPro textGradient xl:text-5xl md:text-3xl font-semibold"
          >
            Ask a Question
          </NavLink>
        </div>
      </header>
      <div className="my-4 md:hidden ">
        <button className="accordion text-left p-2 text-base accountSection font-bold">
          Dashboard Menu
        </button>
        <div className="panel w-full adminHeaderList text-sm">
          <ul className="">
            <Link href="/dashboard" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">HackCenter</li>
            </Link>
            <Link href="/dashboard/scan-in" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">Scan-In</li>
            </Link>
            <Link href="/dashboard/questions" passHref={true}>
              <li className="p-2 adminHeaderItem cursor-pointer">Ask a Question</li>
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}
