import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { buttonDatas, stats } from '../lib/data';
import KeynoteSpeaker from '../components/KeynoteSpeaker';
import { RequestHelper } from '../lib/request-helper';
import firebase from 'firebase';
import 'firebase/messaging';
import HomeChallengeCard from '../components/HomeChallengeCard';

/**
 * The home page.
 *
 * Landing: /
 *
 */
export default function Home(props: {
  keynoteSpeakers: KeynoteSpeaker[];
  challenges: Challenge[];
}) {
  const router = useRouter();

  const [speakers, setSpeakers] = useState<KeynoteSpeaker[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challengeIdx, setChallengeIdx] = useState(0);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#C1C8FF',
    },
    {
      light: '#D8F8FF',
      dark: '#B0F1FF',
    },
    {
      dark: '#FCD7FF',
      light: '#FDECFF',
    },
  ];

  useEffect(() => {
    setTimeout(fadeOutEffect, 3000);
    setSpeakers(props.keynoteSpeakers);
    setChallenges(props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    if (document.getElementById(`org${challengeIdx}`) !== null) {
      document.getElementById(`org${challengeIdx}`).style.textDecoration = 'underline';
      document.getElementById(`card${challengeIdx}`).style.display = 'block';
    }
  });

  const fadeOutEffect = () => {
    var fadeTarget = document.getElementById('popup');

    if (fadeTarget !== undefined && fadeTarget !== null) {
      var fadeEffect = setInterval(() => {
        if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = '1';
        }
        if (parseFloat(fadeTarget.style.opacity) > 0) {
          fadeTarget.style.opacity = (parseFloat(fadeTarget.style.opacity) - 0.1).toString();
        } else {
          clearInterval(fadeEffect);
        }
      }, 100);
    }
  };

  const checkNotif = () => {
    //pop up visible if user did not enable push notif and browser supports push notif
    if (Notification.permission !== 'granted' && firebase.messaging.isSupported()) {
      Notification.requestPermission();
      return true;
    }
    return false;
  };

  const changeOrg = (newIdx) => {
    document.getElementById(`org${challengeIdx}`).style.textDecoration = 'none';
    document.getElementById(`card${challengeIdx}`).style.display = 'none';
    document.getElementById(`org${newIdx}`).style.textDecoration = 'underline';
    document.getElementById(`card${newIdx}`).style.display = 'block';
    setChallengeIdx(newIdx);
  };

  return (
    <>
      <Head>
        <title>HackPortal</title>
        <meta name="description" content="A default HackPortal instance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Notification info pop up */}
      {checkNotif() && (
        <div
          id="popup"
          className="fixed z-50 md:translate-x-0 translate-x-1/2 w-[22rem] rounded-md px-4 py-2 top-16 md:right-6 right-1/2 bg-red-200 md:text-base text-sm"
        >
          Turn on push notifications to stay up to date with events and announcements!
        </div>
      )}
      {/* Hero section */}
      <section className="min-h-[640px] h-full w-screen p-4 bg-indigo-100">
        <div
          style={{ minHeight: 480 }}
          className="max-w-4xl h-full mx-auto flex flex-col justify-center items-center py-8"
        >
          <div
            className="min-w-[280px] w-8/12 h-[240px] flex flex-col justify-center relative mb-28 md:min-w-full before:block before:absolute before:bottom-0 before:left-0 before:w-16 before:h-16 before:bg-transparent before:border-b-4 before:border-l-4 before:border-black
          after:block after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:bg-transparent after:border-t-4 after:border-r-4 after:border-black"
          >
            <h1 className="text-center md:text-6xl text-3xl md:font-black font-bold">
              Event title here
            </h1>
            <p className="text-center my-4 md:font-bold md:text-3xl text-xl">Subtitle</p>
          </div>
          <div className="w-screen flex flex-col items-center gap-y-8 md:gap-y-0 md:flex-row md:justify-around px-4">
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
      <section className="z-0 relative w-screen md:mt-0 mt-16 md:h-[560px] py-[3rem] bg-white">
        <div className="flex flex-col justify-center items-center md:flex-row w-full h-full">
          <div className="flex flex-col justify-center items-center md:flex-row w-11/12 h-3/6">
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
            <div className="flex flex-col justify-center w-4/12 h-3/6">
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
      <section className="flex overflow-x-scroll bg-gray-200 min-h-[24rem]">
        <div className="flex items-center justify-center md:p-12 p-6 max-w-[18rem] text-2xl font-bold">
          Featuring Keynote Speakers
        </div>
        <div className="flex flex-col justify-center py-6 md:px-6">
          {/* Row 1 */}
          <div className="flex">
            {speakers.map(
              ({ name, description }, idx) =>
                idx < speakers.length / 2 && (
                  <KeynoteSpeaker
                    key={idx}
                    name={name}
                    description={description}
                    cardColor={colorSchemes[idx % 3]}
                  />
                ),
            )}
          </div>
          {/* row 2 */}
          <div className="flex md:ml-[7rem] ml-[5rem]">
            {speakers.map(
              ({ name, description }, idx) =>
                idx >= speakers.length / 2 && (
                  <KeynoteSpeaker
                    key={idx}
                    name={name}
                    description={description}
                    cardColor={colorSchemes[idx % 3]}
                  />
                ),
            )}
          </div>
        </div>
      </section>
      {/* Challenges */}
      <section className="p-6">
        <div className="font-bold text-2xl">Challenges</div>
        <div className="flex">
          {/* Challenge Orgs */}
          <div className="md:w-1/4 w-1/5">
            {challenges.map(({ organization }, idx) => (
              <div
                id={`org${idx}`}
                className={`${idx} flex justify-center cursor-pointer text-center md:text-lg text-sm py-6 my-4 bg-red-200 rounded-md`}
                key={idx}
                onClick={() => changeOrg(idx)}
              >
                {organization}
              </div>
            ))}
          </div>
          {/* Challenges Description */}
          <div className="md:w-3/4 w-4/5 my-4 px-6 min-h-full">
            {/* Card */}
            {challenges.map(({ title, organization, description, prizes }, idx) => (
              <HomeChallengeCard
                key={idx}
                title={title}
                organization={organization}
                description={description}
                prizes={prizes}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: keynoteData } = await RequestHelper.get<KeynoteSpeaker[]>(
    `${protocol}://${context.req.headers.host}/api/keynotespeakers`,
    {},
  );
  const { data: challengeData } = await RequestHelper.get<Challenge[]>(
    `${protocol}://${context.req.headers.host}/api/challenges/`,
    {},
  );
  return {
    props: {
      keynoteSpeakers: keynoteData,
      challenges: challengeData,
    },
  };
};
