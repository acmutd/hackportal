import Link from 'next/link';
import NavLink from '../NavLink';
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
      <header className="md:flex hidden justify-center my-6 items-center">
        <div className="lg:text-3xl text-xl text-center text-complementary font-bold border-b-2 py-2">
          <NavLink
            href="/dashboard"
            exact={true}
            activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
            className="xl:mr-6 mr-4 py-2"
          >
            HackCenter
          </NavLink>
          <NavLink
            href="/dashboard/questions"
            exact={true}
            activeOptions={'border-b-4 border-primaryDark text-complementaryDark'}
            className="xl:ml-6 ml-4 py-2"
          >
            Ask a Question
          </NavLink>
        </div>
      </header>
      <div className="my-4 md:hidden ">
        <button className="accordion text-left p-2 text-sm bg-primary text-secondary">
          Dashboard Menu
        </button>
        <div className="panel w-full bg-secondaryDark text-primaryDark text-sm">
          <ul className="">
            <li className="p-2 hover:bg-secondary cursor-pointer">
              <Link href="/dashboard">HackCenter</Link>
            </li>
            <li className="p-2 hover:bg-secondary cursor-pointer">
              <Link href="/dashboard/questions">Ask a Question</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
