import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';

/**
 * The dashboard / hack center.
 *
 * Landing: /dashboard
 */
export default function Dashboard() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Dashboard</title>
        <meta name="description" content="HackPortal's Dashboard" />
      </Head>
      <section id="subheader" className="p-4">
        <DashboardHeader />
      </section>
      <div className="top-6">
        <h4>Hack Center</h4>
        <h5>Hack center info here</h5>
      </div>
    </div>
  );
}
