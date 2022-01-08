import Link from 'next/link';
import React from 'react';

/**
 *
 * Props used by About Header component
 *
 * @param active - contains information used to determine current page user is at in About Section
 *
 */
interface AboutHeaderProps {
  active: '/about' | '/about/questions';
}

/**
 * An about header.
 */
export default function AboutHeader({ active }: AboutHeaderProps) {
  return (
    <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 items-center">
      <div className="mx-auto md:flex justify-center text-xl font-header md:text-left gap-x-8">
        <Link href="/about">
          <a>
            <span className="inline md:invisible"></span>
            <div
              className={`link font-bold ${active === '/about' && 'border-b-2 border-black p-2'}`}
            >
              FAQ
            </div>
          </a>
        </Link>
        <Link href="/about/questions">
          <a>
            <span className="inline md:invisible"></span>
            <div
              className={`link font-bold ${
                active === '/about/questions' && 'border-b-2 border-black p-2'
              }`}
            >
              Ask a Question
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
