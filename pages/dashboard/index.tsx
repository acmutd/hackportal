import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import AnnouncementCard from './Components/AnnouncementCards';
import Sidebar from './Components/Sidebar';
import firebase from 'firebase';
import 'firebase/messaging';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import { useFCMContext } from '../../lib/service-worker/FCMContext';
import SpotlightCard from './Components/SpotlightCard';
import ChallengeCard from './Components/ChallengeCard';

import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/**
 * The dashboard / hack center.
 *
 *
 * Landing: /dashboard
 *
 */

export default function Dashboard(props: {
  announcements: Announcement[];
  scheduleEvents: ScheduleEvent[];
  challenges: Challenge[];
}) {
  const { isSignedIn, hasProfile } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dateTime, setdateTime] = useState(new Date());
  const [eventCount, setEventCount] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    setAnnouncements(props.announcements);
    // ordering challenges as speficied in firebase
    setChallenges(props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    if (firebase.messaging.isSupported()) {
      firebase.messaging().onMessage((payload) => {
        setAnnouncements((prev) => [
          JSON.parse(payload.data.notification) as Announcement,
          ...prev,
        ]);
      });
    }

    setdateTime(new Date());
    setEventCount(
      props.scheduleEvents.reduce(
        (total, event, idx) =>
          validTimeDate(event.startTimestamp, event.endTimestamp) ? total + 1 : total,
        0,
      ),
    );
  }, []);

  // Check if spotlight time/date interval encompasses current time/date
  const validTimeDate = (startDate, endDate) => {
    const currDate = firebase.firestore.Timestamp.now();
    if (currDate.seconds > startDate._seconds && currDate.seconds < endDate._seconds) {
      return true;
    } else {
      return false;
    }
  };

  var eventCountString;
  if (eventCount === 1) {
    eventCountString = '1 Event';
  } else {
    eventCountString = `${eventCount} Events`;
  }
  // remove when it's time to reveal page
  // return (
  //   <div className="background h-screen">
  //     <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
  //       Stay tuned for more info!
  //     </div>
  //   </div>
  // );

  if (!isSignedIn)
    return (
      <>
        <div className="background h-screen">
          <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
            Please sign-in to view your dashboard
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-col flex-grow background text-white">
        <Head>
          <title>HackUTD IX - Dashboard</title> {/* !change */}
          <meta name="description" content="HackPortal's Dashboard" />
        </Head>
        <section id="mainContent" className="xl:px-36 md:px-12 px-6 py-3 mt-[5rem]">
          <DashboardHeader />
          {/* Spotlight & Announcements */}
          <div className="flex flex-wrap my-16 w-full">
            {/* Spotlight Events */}
            {/* Hides spotlight if no events are going on */}
            {eventCount > 0 && (
              <div className="lg:w-[48%] w-full 2xl:max-h-[32rem] max-h-[28rem] mx-2">
                <h1 className="md:text-3xl text-xl my-4">Happening Now ({eventCountString})</h1>
                <div className="overflow-y-scroll h-4/5">
                  {props.scheduleEvents.map(
                    ({ title, speakers, startTimestamp, endTimestamp, location, page }, idx) =>
                      validTimeDate(startTimestamp, endTimestamp) && (
                        <div className="">
                          {/* Customize Spotlight card design for carousel in  SpotlightCard component file*/}
                          <SpotlightCard
                            title={title}
                            speakers={speakers}
                            startDate={startTimestamp}
                            location={location}
                            endDate={endTimestamp}
                            page={page}
                          />
                        </div>
                      ),
                  )}
                </div>
                <div />
              </div>
            )}
            {/* Announcements */}
            <div
              className={`${
                eventCount > 0 ? 'lg:w-[48%]' : 'lg:w-full'
              } w-full 2xl:h-[32rem] h-[28rem] mx-2`}
            >
              <h1 className="md:text-3xl text-xl my-4">Announcements</h1>
              <div id="announcement-items" className="overflow-y-scroll h-4/5">
                {announcements.map((announcement, idx) => {
                  const dateObj = new Date(announcement.timestamp!);
                  const hour = dateObj.getHours(),
                    minutes = dateObj.getMinutes();

                  const time = `${hour < 10 ? '0' : ''}${hour}:${
                    minutes < 10 ? '0' : ''
                  }${minutes}`;

                  return (
                    <AnnouncementCard key={idx} text={announcement.announcement} time={time} />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Challenges */}
          <div className="flex flex-col my-8">
            <div className="md:text-3xl text-xl my-4">Challenges</div>
            {/* Cards */}
            <div className="challengeGrid">
              {challenges.map(({ title, description, prizes }, idx) => (
                <ChallengeCard key={idx} title={title} description={description} prizes={prizes} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: announcementData } = await RequestHelper.get<Announcement[]>(
    `${protocol}://${context.req.headers.host}/api/announcements/`,
    {},
  );
  const { data: eventData } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule/`,
    {},
  );
  const { data: challengeData } = await RequestHelper.get<Challenge[]>(
    `${protocol}://${context.req.headers.host}/api/challenges/`,
    {},
  );

  return {
    props: {
      announcements: announcementData,
      scheduleEvents: eventData,
      challenges: challengeData,
    },
  };
};
