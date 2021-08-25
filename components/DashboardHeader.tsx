import Link from 'next/link';
import React from 'react';

/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-white shadow-md items-center">
        <div className="md:flex justify-center text-xl font-header md:text-left">
          <Link href="/dashboard/">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Hack Center</a>
            </a>
          </Link>
          <Link href="/dashboard/scan-in">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Scan-In</a>
            </a>
          </Link>
          <Link href="/dashboard/hackerpack">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">HackerPack</a>
            </a>
          </Link>
          <Link href="/dashboard/submit">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Submit a Project</a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
