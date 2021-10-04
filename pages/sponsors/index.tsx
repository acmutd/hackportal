import Head from 'next/head';
import React from 'react';

/**
 * The sponsors page.
 *
 * Landing: /sponsors
 */
export default function Sponsors() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Sponsors</title>
        <meta name="description" content="HackPortal's Sponsors Page" />
      </Head>
      <section id="subheader" className="p-4"></section>
    </div>
  );
}
