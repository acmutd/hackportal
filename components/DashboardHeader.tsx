import Link from 'next/link';
import React from 'react';

/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between py-2 pr-2 md:py-4 md:pr-4 items-center bg-white shadow-md rounded-sm">
        <div className="flex justify-center flex-wrap md:text-xl text:xs font-header md:text-left">
          <Link href="/dashboard/">
            <a>
              <span className="inline md:invisible"></span>
              <a className="md:mr-4 mr-2 border-2 transition duration-500 ease-in-out border-transparent transform hover:border-b-black">
                Hack Center
              </a>
            </a>
          </Link>
          <Link href="/dashboard/scan-in">
            <a>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2 border-2 transition duration-500 ease-in-out border-transparent transform hover:border-b-black">
                Scan-In
              </a>
            </a>
          </Link>
          <Link href="/dashboard/hackerpack">
            <a>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2 border-2 transition duration-500 ease-in-out border-transparent transform hover:border-b-black">
                HackerPack
              </a>
            </a>
          </Link>
          <Link href="/dashboard/submit">
            <a>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2 border-2 transition duration-500 ease-in-out border-transparent transform hover:border-b-black">
                Submit a Project
              </a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
