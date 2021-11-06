import Link from 'next/link';
import React from 'react';

/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-white shadow-md items-center">
        <div className="flex justify-center flex-wrap md:text-xl text:xs font-header md:text-left">
          <Link href="/dashboard/" passHref>
            <div>
              <span className="inline md:invisible"></span>
              <a className="md:mr-4 mr-2">Hack Center</a>
            </div>
          </Link>
          <Link href="/dashboard/scan-in" passHref>
            <div>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2">Scan-In</a>
            </div>
          </Link>
          <Link href="/dashboard/hackerpack" passHref>
            <div>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2">HackerPack</a>
            </div>
          </Link>
          <Link href="/dashboard/submit" passHref>
            <div>
              <span className="inline md:invisible"></span>
              <a className="md:mx-4 mr-2">Submit a Project</a>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}
