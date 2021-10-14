import Link from 'next/link';
import React from 'react';

/**
 * An about header.
 */
export default function AboutHeader() {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-white shadow-md items-center">
        <div className="md:flex justify-center text-xl font-header md:text-left">
          <Link href="/about">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">About</a>
            </a>
          </Link>
          <Link href="/about/faq">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">FAQ</a>
            </a>
          </Link>
          <Link href="/about/questions">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Ask a Question</a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
