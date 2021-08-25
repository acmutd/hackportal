import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';

/**
 * The dashboard / hackerpack.
 *
 * Landing: /hackerpack
 */
export default function hackerpack() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's HackerPacks" />
      </Head>
      <section id="subheader" className="p-4">
        <DashboardHeader />
      </section>
      <div className="top-6">
        <h4>HackerPacks</h4>
        <h5>HackerPack info here</h5>
      </div>
    </div>
  );
}
