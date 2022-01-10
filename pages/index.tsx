import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { buttonDatas, stats } from '../lib/data';
import KeynoteSpeaker from '../components/KeynoteSpeaker';
import { RequestHelper } from '../lib/request-helper';

/**
 * The home page.
 *
 * Landing: /
 */
export default function Home({ keynoteSpeakers }: { keynoteSpeakers: KeynoteSpeaker[] }) {
  const router = useRouter();

  const [speakers, setSpeakers] = useState<KeynoteSpeaker[]>([]);

  useEffect(() => {
    setSpeakers(keynoteSpeakers);
  }, [keynoteSpeakers]);

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
            className="min-w-[280px] w-8/12 h-[240px] flex flex-col justify-center relative mb-28 md:min-w-full before:block before:absolute before:bottom-0 before:left-0 before:w-16 before:h-16 before:bg-transparent before:border-b-4 before:border-l-4 before:border-black
          after:block after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:bg-transparent after:border-t-4 after:border-r-4 after:border-black"
          >
            <h1 className="text-3xl font-bold text-center md:text-6xl md:font-black">
              Event title here
            </h1>
            <p className="text-xl text-center my-4 md:font-bold md:text-3xl">Subtitle</p>
          </div>
          <div className="w-screen flex flex-col items-center px-4 gap-y-8 md:gap-y-0 md:flex-row md:justify-around">
            {buttonDatas.map((button) => (
              <button
                key={button.text}
                onClick={() => router.push(button.path)}
                className="max-w-[280px] md:max-w-full bg-indigo-300 px-16 py-4"
              >
                {button.text}
              </button>
            ))}
          </div>
          {/* TODO: Programmatically show these based on configured times/organizer preference */}
        </div>
      </section>
      {/* Video Space */}
      <section className="mt-16 bg-white relative w-screen md:mt-0 md:h-[560px] py-[3rem]">
        <div className="w-full h-full flex flex-col justify-center items-center md:flex-row">
          <div className="w-11/12 h-3/6 flex flex-col justify-center items-center md:flex-row">
            {/* Video */}
            <iframe
              className="w-full h-[320px] md:w-[720px] md:h-[400px]"
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
                  className={`${
                    index % 2 === 0 ? 'lg:ml-40' : 'lg:mr-8'
                  } text-center my-6 md:ml-16`}
                >
                  <p className="font-bold text-4xl text-indigo-600 lg:text-5xl">{stat.data}</p>
                  <p className="font-medium text-lg lg:text-3xl">{stat.object}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featuring Keynotes speakers */}

      <section className="flex bg-gray-200 min-h-[24rem] overflow-x-scroll">
        <div className="flex items-center justify-center md:p-12 p-6 max-w-[18rem] text-2xl font-bold">
          Featuring Keynote Speakers
        </div>
        <div className="py-6 md:px-6 flex flex-col justify-center">
          {/* Row 1 */}
          <div className="flex">
            {speakers.map(
              ({ name, description }, idx) =>
                idx < speakers.length / 2 && (
                  <KeynoteSpeaker key={idx} name={name} description={description} />
                ),
            )}
          </div>
          {/* row 2 */}
          <div className="md:ml-[7rem] ml-[5rem] flex">
            {speakers.map(
              ({ name, description }, idx) =>
                idx >= speakers.length / 2 && (
                  <KeynoteSpeaker key={idx} name={name} description={description} />
                ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<KeynoteSpeaker[]>(
    `${protocol}://${context.req.headers.host}/api/keynotespeakers`,
    {},
  );
  return {
    props: {
      keynoteSpeakers: data,
    },
  };
};
