import Link from 'next/link';
import React from 'react';

interface DashboardHeaderProps {
  active: string;
}
/**
 * A dashboard header.
 */
export default function DashboardHeader({ active }: DashboardHeaderProps) {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between py-2 md:p-4 items-center">
        <div className="mx-auto md:flex justify-center lg:text-xl sm:text-md text-sm font-header md:text-left text-center grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-y-4">
          <Link href="/dashboard/">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/dashboard/' && 'border-b-2 border-black p-2'
                }`}
              >
                Hack Center
              </a>
            </a>
          </Link>
          <Link href="/dashboard/scan-in">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/dashboard/scan-in' && 'border-b-2 border-black p-2'
                }`}
              >
                Scan-In
              </a>
            </a>
          </Link>
          <Link href="/dashboard/hackerpack">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/dashboard/hackerpack' && 'border-b-2 border-black p-2'
                }`}
              >
                HackerPack
              </a>
            </a>
          </Link>
          <Link href="/dashboard/submit">
            <a>
              <span className="inline md:invisible"></span>
              <a
                className={`link font-bold ${
                  active === '/dashboard/submit' && 'border-b-2 border-black p-2'
                }`}
              >
                Submit a Project
              </a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
