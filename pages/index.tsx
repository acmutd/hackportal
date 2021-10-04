import Head from 'next/head';
import React from 'react';

/**
 * The home page.
 *
 * Landing: /
 */
export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal</title>
        <meta name="description" content="A default HackPortal instance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="jumbotron" className="p-4">
        <div className="max-w-4xl py-8 mx-auto">
          <div className="text-4xl font-bold text-center">Hackathon Name</div>
          <div className="text-2xl my-4 font-medium text-center">
            A description for the event that isn&apos;t too long.
          </div>
          <div className="my-2 flex max-w-xl mx-auto justify-center">
            {/* TODO: Programmatically show these based on configured times/organizer preference */}
            <a
              href="register"
              className="inline-block flex-1 mx-2 px-4 py-2 text-xl text-center hover:text-blue-400 rounded-md border-4 border-blue-200"
            >
              Register for event
            </a>
            <a
              href="#"
              className="inline-block flex-1 mx-2 px-4 py-2 text-xl text-center hover:text-blue-400 rounded-md border-4 border-blue-200"
            >
              Become a mentor/volunteer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
