import Head from 'next/head';
import React from 'react';
import { render } from 'react-dom';
import Calendar from './calendar';

/**
 * The schedule.
 * Landing: /schedule
 */
export default function schedule() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Schedule</title>
        <meta name="description" content="HackPortal's Schedule" />
      </Head>
      <Calendar />
    </div>
  );
}
