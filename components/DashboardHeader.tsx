import Link from 'next/link';
import React from 'react';
import NavLink from './NavLink';

interface DashboardHeaderProps {
  active: string;
}
/**
 * A dashboard header.
 */
export default function DashboardHeader() {
  return (
    <>
      <header className="flex justify-center py-2 md:p-4 items-center">
        <div className="mx-auto flex flex-wrap justify-center lg:text-xl sm:text-md text-xs font-header text-center text-black">
          <NavLink href="/dashboard" exact={true} className="mx-4">
            HackCenter
          </NavLink>
          <NavLink href="/dashboard/scan-in" exact={true} className="mx-4">
            Scan-In
          </NavLink>
          <NavLink href="/dashboard/hackerpack" exact={true} className="mx-4">
            HackerPack
          </NavLink>
          {/*<NavLink href="/dashboard/submit" exact={true} className="mx-4">
            Submit
          </NavLink>*/}
          <NavLink href="/dashboard/questions" exact={true} className="mx-4">
            Ask a Question
          </NavLink>
        </div>
      </header>
    </>
  );
}
