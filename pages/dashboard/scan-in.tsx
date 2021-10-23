import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Sidebar from './Components/Sidebar';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Scan() {
  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Scan-In" />
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7">
        <section id="subheader" className="w-full pb-6 sticky top-16">
          <DashboardHeader />
        </section>
        <div className="font-bold text-2xl md:text-4xl lg-text-6xl">Big Heading</div>
      </section>
    </div>
  );
}
