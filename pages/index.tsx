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
import MemberCards from '../components/MemberCards';
import SponsorCard from '../components/SponsorCard';
import FAQ from '../components/faq';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';
import Link from 'next/link';

/**
 * The home page.
 *
 * Landing: /
 *
 */
export default function Home(props: {
  keynoteSpeakers: KeynoteSpeaker[];
  challenges: Challenge[];
  answeredQuestion: AnsweredQuestion[];
  fetchedMembers: TeamMember[];
  sponsorCard: Sponsor[];
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [speakers, setSpeakers] = useState<KeynoteSpeaker[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);
  const [challengeData, setChallengeData] = useState({
    title: '',
    organization: '',
    description: '',
    prizes: [],
  });

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
    const sortedChallenges = props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1));

    if (sortedChallenges.length != 0) {
      setChallenges(sortedChallenges);
      setChallengeData({
        title: sortedChallenges[0].title,
        organization: sortedChallenges[0].organization,
        description: sortedChallenges[0].description,
        prizes: sortedChallenges[0].prizes,
      });
    }
    setSponsor(props.sponsorCard);

    //Organize members in order by rank given in firebase
    setMembers(props.fetchedMembers.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    setLoading(false);
  }, []);

  useEffect(() => {
    // Initialize styles to first organization in list
    if (document.getElementById(`org${challengeIdx}`) !== null) {
      document.getElementById(`org${challengeIdx}`).style.textDecoration = 'underline';
      (
        document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement
      ).style.display = 'block';
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

  const changeOrg = (challenge, newIdx) => {
    document.getElementById(`org${challengeIdx}`).style.textDecoration = 'none';
    (document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement).style.display =
      'none';
    document.getElementById(`org${newIdx}`).style.textDecoration = 'underline';
    (document.getElementById(`org${newIdx}`).firstElementChild as HTMLElement).style.display =
      'block';

    setChallengeIdx(newIdx);
    setChallengeData({
      title: challenge.title,
      organization: challenge.organization,
      description: challenge.description,
      prizes: challenge.prizes,
    });
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>HackUTD IX</title> {/* !change */}
        <meta
          name="description"
          content="Event site for HackUTD IX: Spaced Out. Powered by HackPortal."
        />{' '}
        {/* !change */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Notification info pop up */}
      {checkNotif() && (
        <div
          id="popup"
          className="fixed z-50 md:translate-x-0 translate-x-1/2 w-[22rem] rounded-md px-4 py-2 top-16 md:right-6 right-1/2 bg-red-200 md:text-base text-sm"
        >
          Turn on push notifications to recieve announcements!
        </div>
      )}
      <div className="mt-[-4rem] home text-white">
        {/* Hero section */}
        <section className="min-h-screen p-4 flex flex-col items-center justify-center">
          <div className="xl:w-[60rem] xl:h-[25rem] md:w-[45rem] md:h-[19rem] sm:w-[27rem] sm:h-[15rem] w-[20rem] h-[10rem] relative">
            <Image
              src={'/assets/HackUTD-IX-Title.png'}
              alt="Hero"
              layout="fill"
              width={200}
            ></Image>
          </div>
          <Link href="/register" passHref={true}>
            <div className="cursor-pointer xl:px-12 xl:py-4 sm:px-8 sm:py-4 px-6 py-2 bg-gradient-to-b from-[#00D1FF] to-[#124866] rounded-full mt-16 xl:text-4xl sm:text-2xl text-xl font-medium">
              Register Now
            </div>
          </Link>
          {/* <div className="flex flex-col items-center md:flex-row md:justify-around px-4 md:space-y-0 space-y-3 > * + *">
          {buttonDatas.map((button) => (
            <button
              key={button.text}
              onClick={() => router.push(button.path)}
              className="max-w-[12rem] w-[12rem] md:max-w-full bg-indigo-300 py-4"
            >
              {button.text}
            </button>
          ))}
        </div> */}
        </section>

        {/* About section */}
        <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto flex justify-between">
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient self-start">
            About
          </h1>
          <div className="xl:text-xl md:text-base text-xs lg:w-7/12 w-2/3">
            HackPortal is a platform for user-friendly hackathon event management. <br />
            <br />A few of its features include: A fully customizable front end, sign in with email/
            Google, hacker registration, images, challenges, sponsors, FAQ and more fetched from
            backend, push notifications, a spotlight carousel highlighting ongoing events, QR code
            check in and swag claims, report submission/ Ask a question, a built-in and easy to set
            up schedule, Hacker, Admin, and Super Admin roles, an Admin console to send
            announcements, update user roles, show number of check-ins, swag claims, and more!.{' '}
            <br />
            <br />
            To set up HackPortal for your hackathon, check out the{' '}
            <a
              href="https://github.com/acmutd/hackportal/blob/develop/docs/set-up.md"
              className="underline"
            >
              HackPortal Github
            </a>
            !
          </div>
        </section>
        {/* Overview */}
        <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">Overview</h1>
          {/* 01 */}
          <div className="flex justify-center mt-16">
            <div className="flex w-4/5">
              <div className="slant xl:w-[4rem] xl:h-[4rem] md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] flex-none"></div>
              <div className="nasalization border-t-2 border-white flex-1 lg:text-3xl md:text-2xl text-lg">
                01
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <iframe
              className="video"
              width="700"
              height="400"
              src="https://www.youtube.com/embed/niFBblrblqo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* Stats */}
          {stats.map((stat, index) => (
            <div
              className={`flex justify-center lg:my-32 md:my-24 ${index === 0 ? 'my-0' : 'my-16'}`}
              key={index}
            >
              <div className="flex w-4/5 relative">
                <div className="slant xl:w-[4rem] xl:h-[4rem] md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] flex-none"></div>
                <div className="nasalization flex border-t-2 border-white flex-1 lg:text-3xl md:text-2xl text-lg">
                  0{index + 2}
                </div>
                <div className="absolute left-1/2 xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl text-lg font-medium md:p-2">
                  {stat.data}
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* FAQ */}
        {props.answeredQuestion.length != 0 && (
          <section>
            <FAQ fetchedFaqs={props.answeredQuestion}></FAQ>
          </section>
        )}
        {/* Keynote Speakers */}
        <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">Speakers</h1>
          <div className="flex flex-wrap justify-around my-8">
            {speakers.map(({ name, description, fileName }, idx) => (
              <KeynoteSpeaker
                key={idx}
                name={name}
                description={description}
                cardColor={colorSchemes[idx % 3]}
                imageLink={fileName}
              />
            ))}
          </div>
        </section>
        {/* Challenges */}
        {/* This section is hidden if there are no challenges */}
        {challenges.length != 0 && (
          <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
            <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">
              Challenges
            </h1>
            <div className="flex my-6">
              {/* Challenge Orgs Selectors*/}
              <div className="md:w-1/4 w-1/5">
                {challenges.map((challenge, idx) => (
                  <div
                    id={`org${idx}`}
                    className={`${idx} relative cursor-pointer text-center md:text-lg sm:text-sm text-xs md:py-6 py-4 my-4 bg-purple-200 rounded-sm`}
                    key={idx}
                    onClick={() => changeOrg(challenge, idx)}
                  >
                    {/* change arrow color in global css to match parent selector */}
                    <div className="arrow-right absolute top-1/2 right-0 -translate-y-1/2 translate-x-full hidden"></div>
                    {challenge.organization}
                  </div>
                ))}
              </div>
              {/* Challenges Description Cards */}

              <div className="md:w-3/4 w-4/5 my-4 pl-6 min-h-full">
                {/* Card */}
                <HomeChallengeCard
                  title={challengeData.title}
                  organization={challengeData.organization}
                  description={challengeData.description}
                  prizes={challengeData.prizes}
                />
              </div>
            </div>
          </section>
        )}
        {/* Sponsors */}
        {sponsor.length != 0 && (
          <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
            <div className="flex flex-col flex-grow">
              <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">
                Sponsors
              </h1>
              {/* Sponsor Card */}
              <section className="flex flex-wrap justify-center p-4">
                {sponsor.map(({ link, reference }, idx) => (
                  <SponsorCard key={idx} link={link} reference={reference} />
                ))}
              </section>
              <h2 className="mt-6 text-center">
                {' '}
                {/* !change */}
                If you would like to sponsor HackUTD IX, please reach out to us at&nbsp;
                <a
                  href="mailto:email@organization.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline"
                >
                  industry@acmutd.co
                </a>
              </h2>
            </div>
          </section>
        )}

        {/* Footer */}
        <section className="mt-16 px-6 pt-8 pb-6 md:text-base text-xs">
          {/* Upper Content */}
          <div className="my-2 relative">
            {/* Social icons */} {/* !change */}
            <div className="space-x-4 > * + *">
              <a href="https://twitter.com/hackutd" rel="noopener noreferrer" target="_blank">
                <TwitterIcon className="footerIcon" />
              </a>
              <a
                href="https://www.instagram.com/hackutd/?hl=en"
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon className="footerIcon" />
              </a>
              <a href="https://www.facebook.com/hackutd/" rel="noopener noreferrer" target="_blank">
                <FacebookIcon className="footerIcon" />
              </a>
            </div>
            {/* Text */}
            <div className="absolute bottom-0 right-0">
              {' '}
              {/* !change */}
              Checkout HackUTD&apos;s{' '}
              <a
                href="https://hackutd.co/"
                rel="noopener noreferrer"
                target="_blank"
                className="font-bold hover:underline"
              >
                organizer site
              </a>
            </div>
          </div>
          {/* Lower Content */}
          <div className="flex justify-between border-t-[1px] py-2 border-white">
            <p>
              Designed by <p className="font-bold inline">HackUTD</p> <br /> {/* !change */}
              {/* PLEASE DO NOT CHANGE <3 */}
              HackPortal developed with &lt;3 by <p className="font-bold inline">
                HackUTD
              </p> and <p className="font-bold inline">ACM Development</p>
              {/* PLEASE DO NOT CHANGE <3 */}
            </p>

            <div className="flex md:flex-row flex-col md:ml-0 ml-6">
              {/* !change */}
              <a
                href="mailto:email@organization.com"
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline md:mr-8 font-thin"
              >
                Contact Us
              </a>
              {/* !change */}
              <a
                href="https://github.com/acmutd/hackportal"
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-thin whitespace-nowrap"
              >
                Source Code
              </a>
            </div>
          </div>
        </section>
      </div>
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
  const { data: answeredQuestion } = await RequestHelper.get<AnsweredQuestion[]>(
    `${protocol}://${context.req.headers.host}/api/questions/faq`,
    {},
  );
  const { data: memberData } = await RequestHelper.get<TeamMember[]>(
    `${protocol}://${context.req.headers.host}/api/members`,
    {},
  );
  const { data: sponsorData } = await RequestHelper.get<Sponsor[]>(
    `${protocol}://${context.req.headers.host}/api/sponsor`,
    {},
  );
  return {
    props: {
      keynoteSpeakers: keynoteData,
      challenges: challengeData,
      answeredQuestion: answeredQuestion,
      fetchedMembers: memberData,
      sponsorCard: sponsorData,
    },
  };
};
