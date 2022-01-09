import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '../../components/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import AnnouncementCard from './Components/AnnouncementCards';
import MentorCard1 from './Components/MentorCard1';
import MentorCard3 from './Components/MentorCard3';
import Sidebar from './Components/Sidebar';
import SpotlightCard from './Components/SpotlightCard';
import firebase from 'firebase';
import 'firebase/messaging';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import { useFCMContext } from '../../lib/service-worker/FCMContext';
import SpotlightCardScroll from './Components/SpotlightCardScroll';
/**
 * The dashboard / hack center.
 *
 * Landing: /dashboard
 */
export default function Dashboard(props: { announcements: Announcement[] }) {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    setAnnouncements(props.announcements);
    firebase.messaging().onMessage((payload) => {
      setAnnouncements((prev) => [JSON.parse(payload.data.notification) as Announcement, ...prev]);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap flex-grow">
        <Head>
          <title>HackPortal - Dashboard</title>
          <meta name="description" content="HackPortal's Dashboard" />
        </Head>

        <Sidebar />

        <section id="mainContent" className="px-6 py-3 w-5/6 lg:w-7/8 md:w-6/7 w-screen">
          <section id="subheader" className="p-4">
            <DashboardHeader active="/dashboard/" />
          </section>

          <div className="flex flex-wrap my-16">
            {/* Spotlight Events */}
            <div className="md:w-3/5 w-screen h-96">
              <h1 className="md:text-3xl text-xl font-black">Spotlight</h1>
              {/* <h3 className="md:text-xl text-md font-bold my-3">{eventCountString}</h3> */}
              {/* Carousel Section */}
              <div className="carouselScroll w-11/12 bg-lightBackground overflow-x-scroll flex h-3/4">
                <SpotlightCardScroll
                  title="Tensorflow w/ Google"
                  speakers={['Abdullah Hasani', 'Nam Truong']}
                  date="Saturday, Nov 13th"
                  location="ECSW 1.154"
                  time="12:30 - 1:30 PM"
                  page="HackerPack"
                />
                <SpotlightCardScroll
                  title="StateFarm Workshop"
                  speakers={['Abdullah Hasani', 'Nam Truong']}
                  date="Saturday, Nov 13th"
                  location="ECSW 1.154"
                  time="12:30 - 1:30 PM"
                  page="HackerPack"
                />
                <SpotlightCardScroll
                  title="Google Workshop"
                  speakers={['Abdullah Hasani', 'Nam Truong']}
                  date="Saturday, Nov 13th"
                  location="ECSW 1.154"
                  time="12:30 - 1:30 PM"
                  page="HackerPack"
                />
                <SpotlightCardScroll
                  title="American Airlines Workshop"
                  speakers={['Abdullah Hasani', 'Nam Truong']}
                  date="Saturday, Nov 13th"
                  location="ECSW 1.154"
                  time="12:30 - 1:30 PM"
                  page="HackerPack"
                />
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="md:w-2/5 w-screen h-96">
            <h1 className="md:text-3xl text-xl font-black">Announcements</h1>
            <div id="announcement-items" className="overflow-y-scroll h-9/10">
              {announcements.map((announcement, idx) => {
                const dateObj = new Date(announcement.timestamp!);
                const hour = dateObj.getHours(),
                  minutes = dateObj.getMinutes();

                const time = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;

                return <AnnouncementCard key={idx} text={announcement.announcement} time={time} />;
              })}
            </div>
          </div>
          {/* Events and Team */}
          <div className="flex flex-wrap h-96 my-16">
            <div className="md:w-3/5 w-screen ">
              <h1 className="md:text-3xl text-xl font-black">Your Saved Events</h1>
            </div>
            <div className="md:w-2/5 w-screen ">
              <h1 className="md:text-3xl text-xl font-black">Your Team</h1>
              <div className="h-4/5 p-5 md:text-xl text-lg bg-purple-200 rounded-lg">
                Hackergang
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<Announcement[]>(
    `${protocol}://${context.req.headers.host}/api/announcements/`,
    {},
  );
  return {
    props: {
      announcements: data,
    },
  };
};
