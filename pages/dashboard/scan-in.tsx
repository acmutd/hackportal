import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function scan() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Scan-In" />
      </Head>
      <section id="subheader" className="p-4">
        <DashboardHeader />
      </section>
      <div className="top-6">
        <h4>Scan-In</h4>
        <h5>Scan-in info here</h5>
      </div>
    </div>
  );
}
