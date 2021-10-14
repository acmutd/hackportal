import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';

/**
 * The about page.
 *
 * Landing: /about
 */
export default function About() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader />
      </section>
      <div className="top-6">
        <h4>About</h4>
        <h5>Hackathon About info here</h5>
      </div>
    </div>
  );
}
