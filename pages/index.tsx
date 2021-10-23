import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { buttonDatas } from '../lib/data';
import styles from '../styles/landing.module.css';

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
          <div className={styles.landing__title_container}>
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
          {/* <div className="my-2 flex w-screen mx-auto justify-center"> */}
          {/* TODO: Programmatically show these based on configured times/organizer preference */}
          {/* <a
              href="register"
              className="inline-block flex-1 mx-2 px-4 py-2 text-xl text-center hover:text-blue-400 rounded-md border-4 border-blue-200"
            >
              Hacker App
            </a>
            <a
              href="#"
              className="inline-block flex-1 mx-2 px-4 py-2 text-xl text-center hover:text-blue-400 rounded-md border-4 border-blue-200"
            >
              Mentor App
            </a>
            <a
              href="#"
              className="inline-block flex-1 mx-2 px-4 py-2 text-xl text-center hover:text-blue-400 rounded-md border-4 border-blue-200"
            >
              Sponsor App
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
}
