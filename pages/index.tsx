import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { buttonDatas } from '../lib/data';

/**
 * The home page.
 *
 * Landing: /
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>HackPortal</title>
        <meta name="description" content="A default HackPortal instance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-indigo-100 h-full w-screen p-4">
        <div
          style={{ minHeight: 480 }}
          className="max-w-4xl h-full py-8 mx-auto flex flex-col justify-center items-center"
        >
          <div
            className="w-8/12 h-3/6 flex flex-col justify-center relative mb-28 before:block before:absolute before:bottom-0 before:left-0 before:w-16 before:h-16 before:bg-transparent before:border-b-4 before:border-l-4 before:border-black
          after:block after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:bg-transparent after:border-t-4 after:border-r-4 after:border-black"
          >
            <div className="text-6xl font-black text-center">Event title here</div>
            <div className="text-3xl my-4 font-bold text-center">Subtitle</div>
          </div>
          <div className="w-screen flex justify-around">
            {buttonDatas.map((button) => (
              <Link key={button.text} href={button.path}>
                <a>
                  <button className="bg-indigo-300 px-16 py-4">{button.text}</button>
                </a>
              </Link>
            ))}
          </div>
          {/* TODO: Programmatically show these based on configured times/organizer preference */}
        </div>
      </section>
    </>
  );
}
