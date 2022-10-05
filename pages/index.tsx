import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { buttonDatas, stats } from '../lib/data';
import { RequestHelper } from '../lib/request-helper';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/storage';
import KeynoteSpeaker from '../components/KeynoteSpeaker';
import HomeChallengeCard from '../components/HomeChallengeCard';
import SponsorCard from '../components/SponsorCard';
import FAQ from '../components/faq';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ChevronUpIcon } from '@heroicons/react/solid';

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
  const [questions, setQuestions] = useState<AnsweredQuestion[]>([]);
  const [challengeData, setChallengeData] = useState({
    title: '',
    organization: '',
    description: '',
    prizes: [],
  });
  const [showChallengeCard, setShowChallengeCard] = useState(false);
  const [notif, setNotif] = useState(false);

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
    setNotif(checkNotif());
    // Set amount of time notification prompt gets displayed before fading out
    setTimeout(fadeOutEffect, 2500);
    setSpeakers(props.keynoteSpeakers);

    //Organize challenges in order by rank given in firebase
    const sortedChallenges = props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1));
    const sortedQuestions = props.answeredQuestion.sort((a, b) => (a.rank > b.rank ? 1 : -1));

    if (sortedChallenges.length != 0) {
      setChallenges(sortedChallenges);
    }
    if (sortedQuestions.length != 0) {
      setQuestions(sortedQuestions);
    }
    setSponsor(props.sponsorCard);

    //Organize members in order by rank given in firebase
    setMembers(props.fetchedMembers.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    setLoading(false);
    countdownTimer();
  }, []);

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
    setShowChallengeCard(true);
    document.getElementById(`org${challengeIdx}`).style.backgroundColor = 'rgba(78, 149, 255, 0.2)';
    document.getElementById(`org${newIdx}`).style.backgroundColor = 'rgba(78, 149, 255, 0.5)';

    setChallengeIdx(newIdx);
    setChallengeData({
      title: challenge.title,
      organization: challenge.organization,
      description: challenge.description,
      prizes: challenge.prizes,
    });
  };

  const [expiryTime, setExpiryTime] = useState('12 nov 2022 0:00:00');
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: '',
    countdownHours: '',
    countdownMinutes: '',
    countdownSeconds: '',
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays < 10 ? '0' + totalDays.toString() : totalDays.toString(),
        countdownHours: totalHours < 10 ? '0' + totalHours.toString() : totalHours.toString(),
        countdownMinutes:
          totalMinutes < 10 ? '0' + totalMinutes.toString() : totalMinutes.toString(),
        countdownSeconds:
          totalSeconds < 10 ? '0' + totalSeconds.toString() : totalSeconds.toString(),
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime('0');
      }
    }, 1000);
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
      {notif && (
        <div
          id="popup"
          className="fixed z-50 md:translate-x-0 translate-x-1/2 w-[22rem] rounded-md px-4 py-2 top-16 md:right-6 right-1/2 notif text-white md:text-base text-sm"
        >
          Turn on push notifications to recieve announcements!
        </div>
      )}
      <div className="home text-white overflow-x-hidden overflow-y-hidden">
        {/* Hero section */}
        <section className="min-h-screen p-4 flex flex-col items-center justify-center relative">
          <div className="absolute top-0 right-0 z-0 satelliteX">
            <div className="relative 2xl:w-[5.5rem] 2xl:h-[5.5rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] satelliteY">
              <Image src={'/assets/Satellite.png'} alt="Satellite" layout="fill" />
            </div>
          </div>
          <div className="absolute bottom-[20%] -left-24 z-0 satelliteX2">
            <div className="relative 2xl:w-[5.5rem] 2xl:h-[5.5rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] satelliteY2">
              <Image src={'/assets/Satellite.png'} alt="Satellite" layout="fill" />
            </div>
          </div>
          <div className="2xl:w-[60rem] 2xl:h-[27rem] md:w-[40rem] md:h-[18rem] sm:w-[29rem] sm:h-[17rem] w-[21rem] h-[12rem] relative z-10 mb-6">
            <Image src={'/assets/HackUTD-IX-TitleDate.png'} alt="Hero" layout="fill"></Image>
          </div>
          {/* <div className="dateGradient font-bold lg:text-5xl md:text-4xl text-3xl md:mt-8 mt-16 relative z-10">
            11.12 - 11.13
          </div> */}
          <Link href="/register" passHref={true}>
            <div className="registerGlow relative z-10 cursor-pointer xl:px-12 xl:py-4 sm:px-8 sm:py-4 px-6 py-2 bg-gradient-to-b from-[#00D1FF] to-[#124866] rounded-full md:mt-8 mt-12 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-medium">
              Register Now
            </div>
          </Link>
          <p className="md:mt-16 mt-12 text-bold xl:text-6xl sm:text-4xl text-3xl flex relative z-10">
            T -
            <div className="lg:mx-5 md:mx-4 mx-2">
              <div>{countdownTime.countdownDays}</div>
              <div className="2xl:text-3xl sm:text-2xl text-xl textGradient">Days</div>
            </div>
            :
            <div className="lg:mx-5 md:mx-4 mx-2">
              <div>{countdownTime.countdownHours}</div>
              <div className="2xl:text-3xl sm:text-2xl text-xl textGradient">Hours</div>
            </div>
            :
            <div className="lg:mx-5 md:mx-4 mx-2">
              <div>{countdownTime.countdownMinutes}</div>
              <div className="2xl:text-3xl sm:text-2xl text-xl textGradient">Mins</div>
            </div>
            :
            <div className="lg:mx-5 md:mx-4 mx-2">
              <div>{countdownTime.countdownSeconds}</div>
              <div className="2xl:text-3xl sm:text-2xl text-xl textGradient">Secs</div>
            </div>
          </p>
        </section>

        {/* About section */}
        <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto flex justify-between md:flex-row flex-col relative">
          <div className="absolute 2xl:-bottom-6  lg:-bottom-16  -bottom-4 right-0 z-0 translate-y-1/2 translate-x-1/2">
            <div className="relative 2xl:w-[35rem] 2xl:h-[19rem] lg:w-[23rem] lg:h-[14rem] w-[18rem] h-[10rem] asteroid">
              <Image src={'/assets/Comet.png'} alt="comet" layout="fill" />
            </div>
          </div>
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient self-start">
            About
          </h1>
          <div className="md:w-4/5 w-full z-10">
            <div className="xl:text-2xl md:text-lg text-base font-semibold md:mt-0 mt-6">
              🖥️ What is HackUTD?
            </div>
            <div className="lg:text-lg md:text-base text-sm">
              HackUTD, the largest university hackathon in Texas, is a weekend-long event where
              students build apps, hardware, and more. HackUTD provides a venue for self-expression
              and creativity through technology. People with varying technical backgrounds from
              universities all over the US come together, form teams around a problem or idea, and
              collaboratively build a unique solution from scratch. Whether you&#39;re a frequent
              hackathon attendee or just getting started, we&#39;d love to see what you can make!
            </div>
            <div className="xl:text-2xl md:text-lg text-base font-semibold mt-6">
              💫 What&#39;s the Purpose?
            </div>
            <div className="lg:text-lg md:text-base text-sm">
              Develop CS &#38; non-CS student relations and skills through hacking challenges.
              Showcase new technologies through workshops and connect passionate hackers with
              industry leaders who choose to participate in our hackathon!
            </div>
            <div className="xl:text-2xl md:text-lg text-base font-semibold mt-6">
              🎉 Why attend HackUTD?
            </div>
            <div className="lg:text-lg md:text-base text-sm">
              HackUTD is a student-organized hackathon aimed at offering fellow students an outlet
              for self expression and welcoming everyone with or without experience! HackUTD hosts
              events that introduce key concepts and relevant topics that new hackers will find
              useful.
            </div>
          </div>
        </section>
        {/* Overview */}
        <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto z-20 relative">
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient mb-8">
            Overview
          </h1>
          <div className="md:flex">
            <section className="lg:w-[14rem] md:w-[12rem] sm:w-[10rem] w-[8rem] relative my-6 hidden md:block">
              <Image
                src={'/assets/Rocket.png'}
                alt="rocket"
                layout="fill"
                objectFit="fill"
                // width={200}
              ></Image>
            </section>
            <section className="md:flex-1">
              {/* Stats */}
              {stats.map((stat, index) => (
                <div
                  className={`flex justify-center ${index === 0 ? 'my-14' : ' 2xl:my-28 my-16'}`}
                  key={index}
                >
                  <div className="flex w-4/5 relative">
                    <div className="slant xl:w-[4rem] xl:h-[4rem] md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] flex-none"></div>
                    <div className="nasalization flex border-t-2 border-white flex-1 lg:text-3xl md:text-2xl text-lg">
                      0{index + 1}
                    </div>
                    <div className="absolute right-1/2 translate-x-1/2 xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl text-lg font-medium md:p-2 text-center">
                      {stat.data}
                    </div>
                  </div>
                </div>
              ))}
              {/* 05 */}
              <div className="flex justify-center relative">
                <div className="flex w-4/5">
                  <div className="slant xl:w-[4rem] xl:h-[4rem] md:w-[3rem] md:h-[3rem] w-[2rem] h-[2rem] flex-none"></div>
                  <div className="nasalization border-t-2 border-white flex-1 lg:text-3xl md:text-2xl text-lg">
                    05
                  </div>
                </div>
                <div className="absolute lg:-translate-y-3/4 -translate-y-full lg:top-0 -top-4 lg:-right-10 right-0 z-0">
                  <div className="relative 2xl:w-[8rem] 2xl:h-[8rem] lg:w-[6rem] lg:h-[6rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] spin">
                    <Image src={'/assets/Tobor.png'} alt="comet" layout="fill" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <iframe
                  className="video"
                  width="700"
                  height="400"
                  src="https://www.youtube.com/embed/krh4vjU2Ovs"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          </div>
        </section>
        {/* FAQ */}
        {props.answeredQuestion.length != 0 && (
          <section>
            <FAQ fetchedFaqs={questions}></FAQ>
          </section>
        )}
        {/* Keynote Speakers */}
        {speakers.length != 0 && (
          <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
            <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient relative inline">
              <p className="inline md:mr-20 mr-12">Speakers</p>
              <div className="absolute top-0 right-0 z-0 translate-x-full">
                <div className="relative 2xl:w-[5.5rem] 2xl:h-[5.5rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] spin">
                  <Image src={'/assets/Spaceman.png'} alt="spaceman" layout="fill" />
                </div>
              </div>
            </h1>
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
        )}
        {/* Challenges */}
        {/* This section is hidden if there are no challenges */}
        {challenges.length != 0 && (
          <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
            <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">
              Challenges
            </h1>
            <div className="relative mt-4 sm:w-[95%] w-[85%] mx-auto">
              <Swiper
                modules={[Navigation, A11y, Pagination]}
                spaceBetween={10}
                allowTouchMove={false}
                // navigation
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'bullets',
                }}
                breakpoints={{
                  // when window width is >= 0px
                  0: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                  // when window width is >= 1536px
                  1536: {
                    slidesPerView: 4,
                  },
                }}
                className="swiper"
              >
                {challenges.map((challenge, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      id={`org${idx}`}
                      className={`${idx} relative cursor-pointer md:text-lg sm:text-sm text-xs md:p-6 p-4 rounded-md homeChallengeCard h-[16rem]`}
                      key={idx}
                      onClick={() => changeOrg(challenge, idx)}
                    >
                      <Image
                        src={`/assets/planets/planet${(idx % 9) + 1}.png`}
                        alt="planet"
                        width={120}
                        height={120}
                      />
                      <div className="font-semibold xl:text-2xl sm:text-xl text-base">
                        {challenge.organization}
                      </div>
                      <div className="flex items-center sm:text-sm text-xs">
                        Learn more <ChevronUpIcon className="w-5 h-5 rotate-180" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="-translate-x-12 -translate-y-32">
                <div className="swiper-button-prev"></div>
              </div>
              <div className="translate-y-10">
                <div className="swiper-pagination"></div>
              </div>
              <div className="translate-x-12 -translate-y-32">
                <div className="swiper-button-next"></div>
              </div>
            </div>

            {/* Challenges Description Cards */}
            {showChallengeCard && (
              <div className="my-4 p-6">
                {/* Card */}
                <HomeChallengeCard
                  title={challengeData.title}
                  organization={challengeData.organization}
                  description={challengeData.description}
                  prizes={challengeData.prizes}
                />
              </div>
            )}
          </section>
        )}
        {/* Sponsors */}
        {sponsor.length != 0 && (
          <section className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto mt-4">
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
                  hello@hackutd.co
                </a>
              </h2>
            </div>
          </section>
        )}

        {/* Footer sm and larger screen*/}
        <section className="mt-16 px-6 pt-8 pb-6 md:text-base text-xs hidden sm:block">
          {/* Upper Content */}
          <div className="my-2 relative">
            {/* Social icons */} {/* !change */}
            <div className="space-x-4 > * + *">
              <a
                href="https://www.instagram.com/hackutd/?hl=en"
                rel="noopener noreferrer"
                target="_blank"
                className="raiseIcon"
              >
                <InstagramIcon className="footerIcon" />
              </a>
              <a
                href="https://www.linkedin.com/company/hackutd/"
                rel="noopener noreferrer"
                target="_blank"
                className="raiseIcon"
              >
                <LinkedInIcon className="footerIcon" />
              </a>
              <a
                href="https://twitter.com/hackutd"
                rel="noopener noreferrer"
                target="_blank"
                className="raiseIcon"
              >
                <TwitterIcon className="footerIcon" />
              </a>
              <a
                href="https://www.facebook.com/hackutd/"
                rel="noopener noreferrer"
                target="_blank"
                className="raiseIcon"
              >
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
              Designed by HackUTD <br /> {/* !change */}
              {/* PLEASE DO NOT CHANGE <3 */}
              HackPortal developed with &lt;3 by HackUTD and ACM Development
              {/* PLEASE DO NOT CHANGE <3 */}
            </p>

            <div className="flex md:flex-row flex-col md:ml-0 ml-6">
              {/* !change */}
              <a
                href="mailto:hello@hackutd.co"
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline md:mr-8 font-bold"
              >
                Contact Us
              </a>
              {/* !change */}
              <a
                href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-bold whitespace-nowrap"
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </section>
        {/* Footer for mobile */}
        <section className="block sm:hidden mt-16 px-8 pb-4 text-xs">
          <div className="flex justify-between py-4 border-b-2 border-white">
            <a
              href="https://www.instagram.com/hackutd/?hl=en"
              rel="noopener noreferrer"
              target="_blank"
              className=""
            >
              <InstagramIcon className="mobileFooterIcon" fontSize="large" />
            </a>
            <a
              href="https://www.linkedin.com/company/hackutd/"
              rel="noopener noreferrer"
              target="_blank"
              className=""
            >
              <LinkedInIcon className="mobileFooterIcon" fontSize="large" />
            </a>
            <a
              href="https://twitter.com/hackutd"
              rel="noopener noreferrer"
              target="_blank"
              className=""
            >
              <TwitterIcon className="mobileFooterIcon" fontSize="large" />
            </a>
            <a
              href="https://www.facebook.com/hackutd/"
              rel="noopener noreferrer"
              target="_blank"
              className=""
            >
              <FacebookIcon className="mobileFooterIcon" fontSize="large" />
            </a>
          </div>
          <div className="text-center text-sm py-3">
            Designed by{' '}
            <a
              href="https://hackutd.co/"
              rel="noopener noreferrer"
              target="_blank"
              className="font-bold"
            >
              HackUTD
            </a>
          </div>
          <div className="flex justify-around text-sm">
            <a
              href="mailto:hello@hackutd.co"
              rel="noopener noreferrer"
              target="_blank"
              className="font-bold"
            >
              Contact Us
            </a>
            <a
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-bold"
            >
              Code of Conduct
            </a>
          </div>
          <div className="text-sm text-center pt-3">
            HackPortal developed with &lt;3 by HackUTD and ACM Development
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
