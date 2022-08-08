import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Sidebar from './Components/Sidebar';

/**
 * NOTE: THIS IS NOT BEING USED.
 * FEEL FREE TO DELETE THIS PAGE OR LINK IT TO THE HACKATHON DEVPOST.
 *
 *
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Submit() {
  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>Project Submissions</title>
        <meta name="description" content="HackPortal's Project Submissions" /> {/* !change */}
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7 w-full">
        <DashboardHeader />
        <div className="font-bold text-2xl md:text-4xl lg-text-6xl">Big Heading</div>
      </section>
    </div>
  );
}
