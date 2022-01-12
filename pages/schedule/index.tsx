import Head from 'next/head';
import React from 'react';

/**
 * The schedule.
 *
 * Landing: /schedule
 */
export default function Schedule() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Schedule</title>
        <meta name="description" content="HackPortal's Schedule" />
      </Head>
    </div>
  );
}
