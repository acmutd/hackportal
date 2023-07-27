import Link from 'next/link';
import NavLink from '../NavLink';
import { useRef, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  const accordian = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const triggerAccordion = () => {
    let acc = accordian.current;
    setIsOpen(!isOpen);
    acc.classList.toggle('menuactive');
    var panel = acc.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  };

  return (
    <section>
      <header className="md:flex hidden justify-center item-center mt-8">
        <div className="lg:text-3xl text-2xl text-center text-complementary font-semibold border-b-2 py-2">
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
      <div className="md:hidden mt-6">
        <button
          ref={accordian}
          onClick={() => triggerAccordion()}
          className="accordion text-left p-2 text-sm bg-primaryDark text-secondary flex justify-between relative"
        >
          <p>Dashboard Menu</p>
          <ChevronRightIcon className={`${isOpen ? 'transform rotate-90' : ''} w-5 h-5`} />
        </button>
        <div className="panel w-full bg-secondaryDark text-primaryDark text-sm">
          <ul className="">
            <li className="p-2 hover:bg-secondary cursor-pointer">
              <Link href="/dashboard" passHref>
                <div>HackCenter</div>
              </Link>
            </li>
            <li className="p-2 hover:bg-secondary cursor-pointer">
              <Link href="/dashboard/questions" passHref>
                <div>Ask a Question</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
