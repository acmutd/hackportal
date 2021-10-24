import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { buttonDatas, stats } from '../lib/data';

/**
 * The home page.
 *
 * Landing: /
 */
export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>HackPortal</title>
        <meta name="description" content="A default HackPortal instance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero section */}
      <section className="bg-indigo-100 min-h-[640px] h-full w-screen p-4">
        <div
          style={{ minHeight: 480 }}
          className="max-w-4xl h-full py-8 mx-auto flex flex-col justify-center items-center"
        >
          <div
            className="w-8/12 h-[240px] flex flex-col justify-center relative mb-28 before:block before:absolute before:bottom-0 before:left-0 before:w-16 before:h-16 before:bg-transparent before:border-b-4 before:border-l-4 before:border-black
          after:block after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:bg-transparent after:border-t-4 after:border-r-4 after:border-black"
          >
            <h1 className="text-6xl font-black text-center">Event title here</h1>
            <p className="text-3xl my-4 font-bold text-center">Subtitle</p>
          </div>
          <div className="w-screen flex justify-around">
            {buttonDatas.map((button) => (
              <button
                key={button.text}
                onClick={() => router.push(button.path)}
                className="bg-indigo-300 px-16 py-4"
              >
                {button.text}
              </button>
            ))}
          </div>
          {/* TODO: Programmatically show these based on configured times/organizer preference */}
        </div>
      </section>
      {/* Video Space */}
      <section className="bg-white relative h-[560px] w-screen">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-11/12 h-3/6 flex justify-center items-center">
            {/* Video */}
            <iframe
              width="720"
              height="400"
              src="https://www.youtube.com/embed/TF3nn7RnA0c"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Stats */}
            <div className="w-4/12 h-3/6 flex flex-col justify-center">
              {stats.map((stat, index) => (
                <div
                  key={stat.data}
                  className={`${index % 2 === 0 ? 'ml-40' : 'mr-8'} text-center my-6`}
                >
                  <p className="font-bold text-4xl text-indigo-600">{stat.data}</p>
                  <p className="font-medium text-lg">{stat.object}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
