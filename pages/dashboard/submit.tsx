import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Sidebar from './Components/Sidebar';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Submit() {
  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Project Submissions" />
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7 w-screen">
        <section id="subheader" className="p-4">
          <DashboardHeader active="/dashboard/submit" />
        </section>
        <div className="font-bold text-2xl md:text-4xl lg-text-6xl">Big Heading</div>
      </section>
    </div>
  );
}
