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
 * Date of event is in format {(3 letter english month name) dd, yyyy}, e.g. Jan 07, 2022
 */

export default function Dashboard(props: {
  announcements: Announcement[];
  spotlightevents: SpotlightEvent[];
  challenges: Challenge[];
}) {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dateTime, setdateTime] = useState(new Date());
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    setAnnouncements(props.announcements);
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
      props.spotlightevents.reduce(
        (total, event, idx) =>
          validTimeDate(event.date, event.startTime, event.endTime) ? total + 1 : total,
        0,
      ),
    );
  }, []);

  const validTimeDate = (date, startTime, endTime) => {
    if (!checkDate(date)) {
      return false;
    }

    return checkTime(startTime, endTime);
  };

  const checkDate = (date) => {
    //check if date is the same
    var currDate = dateTime.toString().substring(4, 15);
    var eventDate = date.replace(',', '');
    if (currDate !== eventDate) {
      return false;
    }
    return true;
  };

  const checkTime = (startTime, endTime) => {
    var hour,
      startTimeMilitary = startTime,
      endTimeMilitary = endTime;

    if (startTime.substring(startTime.length - 2) == 'pm') {
      hour = parseInt(startTime.split(':')[0]);
      hour = hour === 12 ? 12 : hour + 12;
      startTimeMilitary = hour.toString() + ':' + startTime.split(':')[1];
    }
    if (startTime.substring(startTime.length - 2) == 'am' && startTime.substring(0, 2) == '12') {
      startTimeMilitary = '00:' + startTime.split(':')[1];
    }
    if (endTime.substring(endTime.length - 2) == 'pm') {
      hour = parseInt(endTime.split(':')[0]);
      hour = hour === 12 ? 12 : hour + 12;
      endTimeMilitary = hour.toString() + ':' + endTime.split(':')[1];
    }
    if (endTime.substring(endTime.length - 2) == 'am' && endTime.substring(0, 2) == '12') {
      endTimeMilitary = '00:' + endTime.split(':')[1];
    }

    var currentHour = parseInt(dateTime.getHours().toString());
    var currentMinute = parseInt(dateTime.getMinutes().toString());
    var startHour = parseInt(startTimeMilitary.split(':')[0]);
    var startMinute = parseInt(startTimeMilitary.split(':')[1].substring(0, 2));
    var endHour = parseInt(endTimeMilitary.split(':')[0]);
    var endMinute = parseInt(endTimeMilitary.split(':')[1].substring(0, 2));

    console.log('Time');
    console.log(currentHour + ':' + currentMinute);
    console.log(startHour + ':' + startMinute);
    console.log(endHour + ':' + endMinute);

    if (currentHour >= startHour && currentHour <= endHour) {
      if (currentHour == startHour) {
        if (startHour != endHour) {
          return currentMinute >= startMinute;
        } else if (startHour == endHour) {
          return currentMinute >= startMinute && currentMinute <= endMinute;
        }
      } else if (currentHour == endHour) {
        return currentMinute <= endMinute;
      }
      return true;
    }

    return false;
  };

  var eventCountString;
  if (eventCount === 1) {
    eventCountString = 'There is 1 event is happening right now!';
  } else {
    eventCountString = `There are ${eventCount} events are happening right now!`;
  }

  return (
    <>
      <div className="flex flex-wrap flex-grow">
        <Head>
          <title>HackPortal - Dashboard</title>
          <meta name="description" content="HackPortal's Dashboard" />
        </Head>

        <Sidebar />

        <section id="mainContent" className="px-6 py-3 lg:w-7/8 md:w-6/7 w-full bg-white">
          <section id="subheader" className="p-4 flex justify-center">
            <DashboardHeader active="/dashboard/" />
          </section>

          <div className="flex flex-wrap my-16">
            {/* Spotlight Events */}
            {eventCount > 0 && (
              <div className="md:w-3/5 w-full h-96">
                <h1 className="md:text-3xl text-xl font-black">Spotlight</h1>
                <div>{eventCountString}</div>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {props.spotlightevents.map(
                    ({ title, speakers, date, location, startTime, endTime, page }, idx) =>
                      validTimeDate(date, startTime, endTime) && (
                        <SwiperSlide key={idx}>
                          <div className="h-[19rem] w-full">
                            <SpotlightCard
                              title={title}
                              speakers={speakers}
                              date={date}
                              location={location}
                              startTime={startTime}
                              endTime={endTime}
                              page={page}
                              dateTime={dateTime}
                            />
                          </div>
                        </SwiperSlide>
                      ),
                  )}
                </Swiper>
                <div />
              </div>
            )}
            {/* Announcements */}
            <div className="md:w-2/5 w-screen h-96">
              <h1 className="md:text-3xl text-xl font-black">Announcements</h1>
              <div id="announcement-items" className="overflow-y-scroll h-9/10">
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

          {/* Events and Team */}
          {/* <div className="flex flex-wrap h-96 my-16">
            <div className="md:w-3/5 w-screen ">
              <h1 className="md:text-3xl text-xl font-black">Your Saved Events</h1>
            </div>
            <div className="md:w-2/5 w-screen ">
              <h1 className="md:text-3xl text-xl font-black">Your Team</h1>
              <div className="h-4/5 p-5 md:text-xl text-lg bg-purple-200 rounded-lg">
                Hackergang
              </div>
            </div>
          </div> */}

          {/* Challenges */}
          <div className="my-8 flex flex-col items-center">
            <h1 className="md:text-3xl text-xl font-black">Challenges</h1>
            {/* Card section */}
            <div className="flex flex-wrap justify-center my-8">
              {props.challenges.map(({ title, description }, idx) => (
                <ChallengeCard key={idx} title={title} description={description} />
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
  const { data: spotlightData } = await RequestHelper.get<SpotlightEvent[]>(
    `${protocol}://${context.req.headers.host}/api/spotlightevents/`,
    {},
  );
  const { data: challengeData } = await RequestHelper.get<Challenge[]>(
    `${protocol}://${context.req.headers.host}/api/challenges/`,
    {},
  );

  return {
    props: {
      announcements: announcementData,
      spotlightevents: spotlightData,
      challenges: challengeData,
    },
  };
};
