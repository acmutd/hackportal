import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';

/**
 * The about / questions.
 *
 * Landing: /questions
 */
export default function questions() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Quesiton and Answer Page " />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader />
      </section>
      <div className="top-6">
        <h4>Questions</h4>
        <h5>Ask a Question to organizers here</h5>
      </div>
    </div>
  );
}
