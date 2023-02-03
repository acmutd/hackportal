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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

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
    // Set amount of time notification prompt gets displayed before fading out
    setNotif(checkNotif());
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
      // document.getElementById(`org${challengeIdx}`).style.textDecoration = 'underline';
      document.getElementById(`org${challengeIdx}`).style.backgroundColor =
        'rgba(123, 129, 255, 0.5)';
      // (
      //   document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement
      // ).style.display = 'block';
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
    // document.getElementById(`org${challengeIdx}`).style.textDecoration = 'none';
    document.getElementById(`org${challengeIdx}`).style.backgroundColor = '#F2F3FF';
    // (document.getElementById(`org${challengeIdx}`).firstElementChild as HTMLElement).style.display =
    //   'none';
    // document.getElementById(`org${newIdx}`).style.textDecoration = 'underline';
    document.getElementById(`org${newIdx}`).style.backgroundColor = 'rgba(123, 129, 255, 0.5)';

    // (document.getElementById(`org${newIdx}`).firstElementChild as HTMLElement).style.display =
    //   'block';

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
        <title>HackPortal</title> {/* !change */}
        <meta name="description" content="A default HackPortal instance" /> {/* !change */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Notification info pop up */}
      {notif && (
        <div
          id="popup"
          className="fixed z-50 md:translate-x-0 translate-x-1/2 w-[22rem] rounded-md px-4 py-2 top-16 md:right-6 right-1/2 bg-red-200 md:text-base text-sm"
        >
          Turn on push notifications to recieve announcements!
        </div>
      )}
      {/* Hero section */}
      <section className="min-h-screen p-4 bg-contain bg-white">
        <div
          style={{ minHeight: 480 }}
          className="max-w-4xl mx-auto flex flex-col justify-center items-center"
        >
          <h1 className="text-center md:text-8xl text-6xl font-bold bg-clip-text text-transparent text-primaryDark">
            HackPortal
          </h1>{' '}
          {/* !change */}
          <p className="text-center my-4 font-semibold md:text-xl text-md text-primaryDark opacity-80">
            {' '}
            {/* !change */}Powered by HackUTD and ACM Dev
          </p>
        </div>
        {/* TODO: Programmatically show these based on configured times/organizer preference */}

        <div className="flex flex-col items-center md:flex-row md:justify-around px-44 md:space-y-0 space-y-3 > *">
          {buttonDatas.map((button) => (
            <button
              key={button.text}
              onClick={() => router.push(button.path)}
              className="max-w-[14rem] w-[14rem] md:max-w-full bg-white py-4 rounded-xl h-10 flex items-center justify-center font-semibold text-xl text-primaryDark border-2 border-gray-300"
            >
              {button.text}
            </button>
          ))}
        </div>
      </section>
      {/* Video Space */}
      <section className="z-0 relative md:h-[560px] py-[3rem] bg-white">
        <div className="flex flex-col justify-center items-center md:flex-row">
          {/* Video */}
          {/* !change */}
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
          {/* Stats */}
          <div className="">
            {stats.map((stat, index) => (
              <div
                key={stat.data}
                className={`${
                  index % 2 === 0 ? 'lg:ml-40 md:ml-20 ml-14' : 'md:mr-8 mr-24'
                } text-center md:my-6 my-4`}
              >
                <p className="font-bold text-2xl text-primaryDark lg:text-5xl">{stat.data}</p>
                <p className="font-medium text-lg lg:text-3xl">{stat.object}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About section */}
      <section className="md:p-12 p-6 text-complementary">
        <h1 className="md:text-4xl text-2xl font-bold my-4">About HackPortal</h1> {/* !change */}
        <div className="md:text-base text-sm">
          HackPortal is a platform for user-friendly hackathon event management. <br />
          <br />A few of its features include: A fully customizable front end, sign in with email/
          Google, hacker registration, images, challenges, sponsors, FAQ and more fetched from
          backend, push notifications, a spotlight carousel highlighting ongoing events, QR code
          check in and swag claims, report submission/ Ask a question, a built-in and easy to set up
          schedule, Hacker, Admin, and Super Admin roles, an Admin console to send announcements,
          update user roles, show number of check-ins, swag claims, and more!. <br />
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
      {/* Featuring Keynotes speakers */}

      {speakers.length != 0 && (
        <section className=" overflow-x-auto min-h-[24rem]">
          <div className="flex items-start justify-start font-bold md:p-12 p-6 md:text-4xl text-2xl my-4 text-complementary">
            Key Note Speakers
          </div>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            // spaceBetween={-100}
            // centeredSlides={true}
            slidesPerView={1}
            spaceBetween={10}
            // Responsive breakpoints
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              620: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              840: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {speakers.map(({ name, description, fileName }, idx) => (
              <SwiperSlide key={idx}>
                <KeynoteSpeaker
                  // key={idx}
                  name={name}
                  description={description}
                  cardColor={colorSchemes[idx % 3]}
                  imageLink={fileName}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* row 2
            <div className="flex md:ml-[7rem] ml-[5rem]">
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
            </div> */}
        </section>
      )}
      {/* Challenges */}
      {/* This section is hidden if there are no challenges */}
      {challenges.length != 0 && (
        <section className="md:p-12  p-6">
          <div className="font-bold  md:text-4xl text-2xl my-4 text-complementary">Challenges</div>
          <div className="flex flex-col justify-center items-center w-full">
            {/* Challenge Orgs Selectors*/}

            <div className="w-full">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                // spaceBetween={-100}
                // centeredSlides={true}
                slidesPerView={1}
                spaceBetween={10}
                // Responsive breakpoints
                breakpoints={{
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  620: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  // when window width is >= 640px
                  840: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },

                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {challenges.map((challenge, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      id={`org${idx}`}
                      className={`${idx} font-bold text-primaryDark p-5 flex align-bottom flex-col items-start justify-end z-10 relative cursor-pointer text-center text-xl w-64 h-48  bg-secondary rounded-lg`}
                      key={idx}
                      onClick={() => changeOrg(challenge, idx)}
                    >
                      {/* change arrow color in global css to match parent selector */}
                      {/* <div className="arrow-right absolute top-1/2 right-0 -translate-y-1/2 translate-x-full hidden"></div> */}
                      {challenge.organization}
                      <button className=" text-primaryDark rounded-lg mt-1 text-xs">
                        Learn more
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Challenges Description Cards */}
            <div className="my-4 w-full lg:w-11/12 xl:w-full xl:pl-11 xl:pr-11">
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
      {/* FAQ */}
      {props.answeredQuestion.length != 0 && (
        <section className="md:p-12  p-6">
          <FAQ fetchedFaqs={props.answeredQuestion}></FAQ>
        </section>
      )}
      {members.length != 0 && (
        <section className="md:p-12  p-6">
          {/* Team Members */}
          <div className="flex flex-col flex-grow bg-white">
            <div className="my-2">
              <h4 className="font-bold p-6 md:text-4xl text-2xl my-4 text-complementary">
                Meet the Team
              </h4>{' '}
              {/* !change */}
              <div className="flex flex-wrap justify-center p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {/* Member Cards */}
                  {members.map(
                    ({ name, description, linkedin, github, personalSite, fileName }, idx) => (
                      <MemberCards
                        key={idx}
                        name={name}
                        description={description}
                        fileName={fileName}
                        linkedin={linkedin}
                        github={github}
                        personalSite={personalSite}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Sponsors */}
      {sponsor.length != 0 && (
        <section className="md:p-12 p-6">
          <div className="flex flex-col flex-grow bg-white">
            <h4 className="text-complementary font-bold md:text-4xl text-2xl my-4">Sponsors</h4>
            {/* Sponsor Card */}
            <section className="flex flex-wrap justify-center p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {sponsor.map(({ link, reference }, idx) => (
                  <SponsorCard key={idx} link={link} reference={reference} />
                ))}
              </div>
            </section>
            <h2 className="my-2 text-center">
              {' '}
              {/* !change */}
              If you would like to sponsor HackPortal, please reach out to us at&nbsp;
              <a
                href="mailto:email@organization.com"
                rel="noopener noreferrer"
                target="_blank"
                className="underline"
              >
                email@organization.com
              </a>
            </h2>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className=" mt-16 px-6 py-8 md:text-base text-xs">
        <hr className="my-4 bg-complementary" />
        <div className="flex flex-col items-center justify-center gap-2 text-complementary">
          <div className="text-base md:text-lg">
            {' '}
            {/* !change */}
            Checkout HackUTD&apos;s{' '}
            <a
              href="https://acmutd.co/"
              rel="noopener noreferrer"
              target="_blank"
              className="font-black hover:underline"
            >
              Organizer website
            </a>
          </div>
          <div className="text-[0.7rem] md:text-sm">
            Designed by <p className="font-black inline">HackUTD | </p>
            {/* PLEASE DO NOT CHANGE <3 */}
            HackPortal developed with &lt;3 by <p className="font-black inline">HackUTD</p> and{' '}
            <p className="font-black inline">ACM Development</p>
            {/* PLEASE DO NOT CHANGE <3 */}
          </div>
          <div className="flex flex-row justify-center items-center space-x-6">
            {/* !change */}
            <a
              href="mailto:email@organization.com"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline md:mr-8"
            >
              Contact Us
            </a>
            {/* !change */}
            <a
              href="https://github.com/acmutd/hackportal"
              target="_blank"
              rel="noreferrer"
              className="hover:underline  whitespace-nowrap"
            >
              Source Code
            </a>
          </div>
          {/* Social icons */} {/* !change */}
          <div className="space-x-8 > * + *">
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
