import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { buttonDatas, stats } from '../lib/data';
import { RequestHelper } from '../lib/request-helper';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/storage';
import KeynoteSpeaker from '../components/KeynoteSpeaker';
import HomeChallengeCard from '../components/HomeChallengeCard';
import Image from 'next/image';

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
    // Set amount of time notification prompt gets displayed before fading out
    setTimeout(fadeOutEffect, 3000);
    setSpeakers(props.keynoteSpeakers);

    //Organize challenges in order by rank given in firebase
    setChallenges(props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
  }, []);

  useEffect(() => {
    // Initialize styles to first organization in list
    if (document.getElementById(`org${challengeIdx}`) !== null) {
      document.getElementById(`org${challengeIdx}`).style.textDecoration = 'underline';
      (
        document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement
      ).style.display = 'block';
      document.getElementById(`card${challengeIdx}`).style.display = 'block';
    }
  });

  // Fade out notification prompt
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
    const isSupported =
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      firebase.messaging.isSupported();
    if (isSupported && Notification.permission !== 'granted') {
      Notification.requestPermission();
      return true;
    }
    return false;
  };

  const changeOrg = (newIdx) => {
    //make old org selected hidden
    document.getElementById(`org${challengeIdx}`).style.textDecoration = 'none';
    (document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement).style.display =
      'none';
    document.getElementById(`card${challengeIdx}`).style.display = 'none';
    //make new org selected show
    document.getElementById(`org${newIdx}`).style.textDecoration = 'underline';
    (document.getElementById(`org${newIdx}`).firstElementChild as HTMLElement).style.display =
      'block';
    document.getElementById(`card${newIdx}`).style.display = 'block';

    setChallengeIdx(newIdx);
  };

  return (
    <>
      <Head>
        <title>HackAI</title>
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
      <section
        className="p-4"
        style={{
          // backgroundImage: "url('assets/background.png')",
          minHeight: 500,
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{ minHeight: 400 }}
          className="max-w-4xl mx-auto my-20 flex flex-col justify-center items-center"
        >
          <div
            className="h-0 max-w-4xl mx-auto flex flex-col justify-center items-center min-w-[280px] w-8/12 h-[240px] flex flex-col justify-center relative md:mb-28 md:min-w-full before:block before:absolute before:bottom-0 before:left-0 before:w-16 before:h-10 
          after:block after:absolute after:top-0 after:right-0 after:w-16 after:h-10 "
          >
            {/* <img className="center" src="assets/hackaibrain2.png" height={100} width={100}></img> */}
            {/* HackAI brain image not displaying */}
            <Image src="/assets/hackaibrain2.png" alt="hackaibrain" height="100" width="100" />
            {/* <h1 className="text-center md:text-6xl text-3xl md:font-black font-bold">HackAI</h1> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold">
              <span className="text-black bg-clip-text">Hack</span>
              <span className="text-violet-750 bg-clip-text">AI</span>
            </h1>
            <h3 className="text-violet-450 py-1 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-medium">
              April 9-10, 2022
            </h3>
            <p className="text-violet-750 text-center my-4 md:font-bold md:text-3xl text-xl">
              The Largest AI Hackathon at UT Dallas is Back!
            </p>
            <p className="py-1 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-medium text-violet-350">
              {' '}
              Applications close on April 1, 2022 at 11:59 PM CDT.{' '}
            </p>
            <div className="p-5 flex flex-col items-center md:flex-row md:justify-around px-4 md:space-y-0 space-y-3 > * + *">
              {buttonDatas.map((button) => (
                <button
                  key={button.text}
                  onClick={() => window.open(button.path)}
                  className="font-header font-bold bg-violet-750 rounded-full border-black text-sm text-black px-8 py-3 hover:bg-violet-850 hover:text-white"
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
          {/* TODO: Programmatically show these based on configured times/organizer preference */}
        </div>
      </section>
      {/* Video Space */}
      <section
        className="z-0 relative md:h-[560px] py-[3rem] bg-slate-350"
        // style={{ backgroundImage: "url('assets/background.png')" }}
      >
        <div className="flex flex-col justify-center items-center md:flex-row">
          {/* Video */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Da4xucNa1zs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* Stats */}
          <div className="">
            {stats.map((stat, index) => (
              <div
                key={stat.data}
                className={`${
                  index % 2 === 0 ? 'lg:ml-40 md:ml-20 ml-14' : 'md:mr-8 mr-24'
                } text-center md:my-6 my-4`}
              >
                <p className="font-bold text-2xl text-violet-750 lg:text-5xl">{stat.data}</p>
                <p className="font-medium text-lg text-black lg:text-3xl">{stat.object}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featuring Keynotes speakers */}
      {/* <section className="flex overflow-x-scroll min-h-[24rem]">
        <div className="flex items-center justify-center md:p-12 p-6 max-w-[18rem] text-2xl font-bold">
          Featuring Keynote Speakers
        </div>
        <div className="flex flex-col justify-center py-6 md:px-6"> */}
      {/* Row 1 */}
      {/* <div className="flex">
            {speakers.map(
              ({ name, description, fileName }, idx) =>
                idx < speakers.length / 2 && (
                  <KeynoteSpeaker
                    key={idx}
                    name={name}
                    description={description}
                    cardColor={colorSchemes[idx % 3]}
                    imageLink={fileName}
                  />
                ),
            )}
          </div> */}
      {/* row 2 */}
      {/* <div className="flex md:ml-[7rem] ml-[5rem]">
            {speakers.map(
              ({ name, description, fileName }, idx) =>
                idx >= speakers.length / 2 && (
                  <KeynoteSpeaker
                    key={idx}
                    name={name}
                    description={description}
                    cardColor={colorSchemes[idx % 3]}
                    imageLink={fileName}
                  />
                ),
            )}
          </div>
        </div>
      </section> */}
      {/* About*/}
      <section className="z-0 relative md:h-[560px] py-[3rem] bg-slate-350">
        <h2 className="text-left pl-20 font-medium text-5xl bold mb-4 text-violet-750">
          What is HackAI?
        </h2>
        <p className="text-lg text-black text-justify px-20">
          HackAI is a student-run annual hackathon organized by the Artificial Intelligence Society
          at The University of Texas of Dallas, aiming to connect today&apos;s students with the
          knowledge and resources needed to build Artificial Intelligence (AI) related projects in
          the span of 24 hours. Topics such as Natural Language Processing, Machine Learning, Data
          Analytics, and more will be represented amongst these projects, and we are confident that
          both the creativity and quality of the submissions will be incredibly high. The hackathon
          encompasses various levels of competition tasks, designed to challenge students while
          providing value to sponsors.
        </p>
      </section>
      {/* Challenges */}
      <section className="p-6 ">
        <div className="font-bold text-2xl text-violet-750">Challenges</div>
        <div className="flex">
          {/* Challenge Orgs Selectors*/}
          <div className="md:w-1/4 w-1/5">
            {challenges.map(({ organization }, idx) => (
              <div
                id={`org${idx}`}
                className={`${idx} relative cursor-pointer text-center text-black md:text-lg sm:text-sm text-xs md:py-6 py-4 my-4 bg-purple-200 rounded-sm`}
                key={idx}
                onClick={() => changeOrg(idx)}
              >
                {/* change arrow color in global css to match parent selector */}
                <div className="arrow-right absolute top-1/2 right-0 -translate-y-1/2 translate-x-full hidden"></div>
                {organization}
              </div>
            ))}
          </div>
          {/* Challenges Description Cards */}
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
