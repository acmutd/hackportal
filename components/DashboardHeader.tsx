import Link from 'next/link';
import React from 'react';
import { getItemCount } from '../pages/dashboard/index';

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
        <div className="mx-auto md:flex justify-center lg:text-xl sm:text-md text-xs font-header md:text-left text-center grid sm:grid-cols-4 grid-cols-2 gap-y-4">
          <Link href="/dashboard/">
            <a>
              <span className="inline md:invisible"></span>
              <div
                className={`link font-bold ${
                  active === '/dashboard' && 'border-b-2 border-black p-2'
                }`}
                onClick={getItemCount}
              >
                HackCenter
              </div>
            </a>
          </Link>
          <Link href="/dashboard/scan-in">
            <a>
              <span className="inline md:invisible"></span>
              <div
                className={`link font-bold ${
                  active === '/dashboard/scan-in' && 'border-b-2 border-black p-2'
                }`}
              >
                Scan-In
              </div>
            </a>
          </Link>
          <Link href="/dashboard/hackerpack">
            <a>
              <span className="inline md:invisible"></span>
              <div
                className={`link font-bold ${
                  active === '/dashboard/hackerpack' && 'border-b-2 border-black p-2'
                }`}
              >
                HackerPack
              </div>
            </a>
          </Link>
          {/* <Link href="/dashboard/submit">
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
          </Link> */}
        </div>
      </header>
    </>
  );
}
