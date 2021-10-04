import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';

/**
 * The about / faq.
 *
 * Landing: /about/faq
 */
export default function faq() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Frequently Asked Questions" />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader />
      </section>
      <div className="top-6">
        <h4>FAQ</h4>
        <h5>FAQs here</h5>
      </div>
    </div>
  );
}
