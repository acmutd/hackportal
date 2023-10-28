import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DashboardHeader from '../../components/dashboardComponents/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import AnnouncementCard from '../../components/dashboardComponents/AnnouncementCards';
import Sidebar from '../../components/dashboardComponents/Sidebar';
import firebase from 'firebase';
import 'firebase/messaging';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import { useFCMContext } from '../../lib/service-worker/FCMContext';
import SpotlightCard from '../../components/dashboardComponents/SpotlightCard';
import HackerPackCard from '../../components/dashboardComponents/HackerPackCard';

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
}) {
  // return (
  //   <div className="flex flex-col flex-grow text-2xl text-primary text-center pt-4">
  //     More info coming soon!
  //   </div>
  // );

  const { isSignedIn, hasProfile } = useAuthContext();
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

  if (!isSignedIn)
    return (
      <div className="bg-[url('/assets/hero-bg.png')] flex flex-col flex-grow text-2xl text-primary text-center pt-4">
        Please sign-in to view your dashboard
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap flex-grow bg-[url('/assets/hero-bg.png')]">
        <Head>
          <title>HackUTD X - Dashboard</title> {/* !change */}
          <meta name="description" content="HackUTD X's Dashboard" />
        </Head>

        <section id="mainContent" className="2xl:px-32 md:px-16 px-6 w-full">
          <DashboardHeader />
          {/* Spotlight & Announcements */}
          <div className="flex flex-wrap justify-between  md:my-16 my-10 hoefler-text">
            {/* Spotlight Events */}
            {/* Hides spotlight if no events are going on */}
            {eventCount > 0 && (
              <div className="lg:w-7/12 w-full h-96">
                <h1 className="xl:text-5xl lg:text-4xl text-3xl text-[#FFFCF9] font-black mb-4">
                  Happening Now &#40;{eventCount} event{eventCount === 1 ? '' : 's'}&#41;
                </h1>
                <div className="overflow-y-scroll h-9/10 scrollbar-white">
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
            <div className={`${eventCount > 0 ? 'lg:w-2/5' : 'lg:w-full'} w-full h-96`}>
              <h1 className="xl:text-5xl lg:text-4xl text-3xl font-black text-[#FFFCF9] mb-4">
                Announcements
              </h1>
              <div id="announcement-items" className="overflow-y-scroll h-9/10 scrollbar-white">
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
          {/* HackerPack Section */}
          <div className="hoefler-text lg:mt-28 mt-20 mb-16">
            <h1 className="xl:text-5xl lg:text-4xl text-3xl font-black text-[#FFFCF9]">
              HackerPacks
            </h1>
            <div className="mb-4 mt-2 text-secondary md:text-lg sm:text-base text-xs">
              HackerPacks contain all the information you&rsquo;ll need regarding specific parts
              before or during the event. Click on any of the hackerpacks below for more
              information.
            </div>
            <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              <HackerPackCard
                name="Travel"
                link="https://hackutd.notion.site/Travel-Hackerpack-e4dd9f55947b46a89bd95fd6dd4e08a7?pvs=25"
                redirect="/hackerpacks/travel"
              />
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

  return {
    props: {
      announcements: announcementData,
      scheduleEvents: eventData,
    },
  };
};
