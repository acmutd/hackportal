import Link from 'next/link';
import React from 'react';

interface Props {
  active: string;
}

/**
 * An about header.
 */
export default function AboutHeader({ active }: Props) {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 items-center">
        <div className="mx-auto md:flex justify-center text-xl font-header md:text-left gap-x-8">
          <Link href="/about">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${active === '/about' && 'border-b-2 border-black p-2'}`}
              >
                About
              </a>
            </a>
          </Link>
          <Link href="/about/faq">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/about/faq' && 'border-b-2 border-black p-2'
                }`}
              >
                FAQ
              </a>
            </a>
          </Link>
          <Link href="/about/questions">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/about/questions' && 'border-b-2 border-black p-2'
                }`}
              >
                Ask a Question
              </a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
