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
    // <>
    //   <header className="top-0 sticky flex flex-row justify-between py-2 pr-2 md:py-4 md:pr-4 items-center bg-white shadow-md rounded-sm">
    //     <div className="flex justify-center flex-wrap md:text-xl text:xs font-header md:text-left">
    //       <Link href="/dashboard/" passHref>
    //         <div>
    //           <span className="inline md:invisible"></span>
    //           <a className="md:mr-4 mr-2">Hack Center</a>
    //         </div>
    //       </Link>
    //       <Link href="/dashboard/scan-in" passHref>
    //         <div>
    //           <span className="inline md:invisible"></span>
    //           <a className="md:mx-4 mr-2">Scan-In</a>
    //         </div>
    //       </Link>
    //       <Link href="/dashboard/hackerpack" passHref>
    //         <div>
    //           <span className="inline md:invisible"></span>
    //           <a className="md:mx-4 mr-2">HackerPack</a>
    //         </div>
    //       </Link>
    //       <Link href="/dashboard/submit" passHref>
    //         <div>
    //           <span className="inline md:invisible"></span>
    //           <a className="md:mx-4 mr-2">Submit a Project</a>
    //         </div>
    //       </Link>
    //     </div>
    //   </header>
    // </>
    // lg:grid-cols-4 grid-cols-2
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
