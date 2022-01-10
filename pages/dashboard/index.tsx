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

  // Change this to check-in condition instead of signed in
  const checkin =
    !user || !isSignedIn ? (
      <p>
        It looks like you&apos;re not checked in! Please click{' '}
        <Link href="/dashboard/scan-in" passHref>
          <u>here</u>
        </Link>{' '}
        to check in to the event.
      </p>
    ) : (
      'You are successfully checked in!'
    );

  var eventCount = 0;
  if (typeof window !== 'undefined') {
    document.querySelectorAll('.carousel').forEach((carousel) => {
      const items = carousel.querySelectorAll('.carousel__item');

      //run if there are carousel items
      if (items !== undefined && items !== null && items.length !== 0) {
        const buttonsHtml = Array.from(items, () => {
          return `<span class="carousel__button"></span>`;
        });

        carousel.insertAdjacentHTML(
          'beforeend',
          `
	        	<div class="carousel__nav">
	        		${buttonsHtml.join('')}
	        	</div>
	        `,
        );

        const buttons = carousel.querySelectorAll('.carousel__button');
        eventCount = items.length;
        buttons.forEach((button, i) => {
          button.addEventListener('click', () => {
            // un-select all the items
            items.forEach((item) => item.classList.remove('carousel__item--selected'));
            buttons.forEach((button) => button.classList.remove('carousel__button--selected'));

            console.log(i - buttons.length / 2);
            const itemNumber = i - buttons.length / 2;

            items[itemNumber].classList.add('carousel__item--selected');
            button.classList.add('carousel__button--selected');
          });
        });

        //Set default to first item
        items[0].classList.add('carousel__item--selected');
        buttons[0].classList.add('carousel__button--selected');
      }
    });
  }

  var eventCountString;
  if (eventCount === 1) {
    eventCountString = '1 event is happening right now!';
  } else {
    eventCountString = `${eventCount} events are happening right now!`;
  }

  useEffect(() => {
    setAnnouncements(props.announcements);
    firebase.messaging().onMessage((payload) => {
      setAnnouncements((prev) => [JSON.parse(payload.data.notification) as Announcement, ...prev]);
    });
  }, []);

  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackPortal - Dashboard</title>
        <meta name="description" content="HackPortal's Dashboard" />
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:w-7/8 md:w-6/7">
        <section id="subheader" className="p-4">
          <DashboardHeader active="/dashboard/" />
        </section>

        <div className="lg:text-xl text-md bg-indigo-100 p-4 rounded-md mb-6">{checkin}</div>

        <div className="flex flex-wrap my-16">
          {/* Spotlight Events */}
          <div className="md:w-3/5 w-screen h-96">
            <h1 className="md:text-3xl text-xl font-black">Spotlight</h1>
            <h3 className="md:text-xl text-md font-bold my-3">{eventCountString}</h3>
            {/* Carousel Section */}
            <div className="carousel">
              <SpotlightCard
                title="Tensorflow w/ Google"
                speakers={['Abdullah Hasani', 'Nam Truong']}
                date="Saturday, Nov 13th"
                location="ECSW 1.154"
                time="12:30 - 1:30 PM"
                page="HackerPack"
              />
              <SpotlightCard
                title="Statefarm Workshop"
                speakers={['Jake from Statefarm']}
                date="Saturday, Nov 13th"
                location="ECSW 1.421"
                time="12:00 - 1:00 PM"
                page="HackerPack"
              />
              <SpotlightCard
                title="American Airlines Challenge"
                speakers={['Mario', 'Luigi', 'Wario']}
                date="Saturday, Nov 13th"
                location="ECSW 1.341"
                time="12:00 - 12:45 PM"
                page="HackerPack"
              />
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
        </div>
        {/* Mentor Center */}
        <div className="my-16">
          <h1 className="md:text-3xl text-xl font-black">Mentor Center</h1>
          <p className="my-3">
            Mentors are available 24/7 in ECSW 2.414! You may also see some walking around the
            building in
            <b> purple </b>
            shirts. We also have the following virtual judging rooms available right now:
          </p>
          <div className=" flex overflow-x-scroll w-full">
            <MentorCard3
              room="Frontend Mentoring Room 1"
              topic1="Flutter"
              topic2="React"
              topic3="Vue.js"
              status="Open"
            />
            <MentorCard3
              room="Frontend Mentoring Room 2"
              topic1="Python"
              topic2="AWS"
              topic3="Models"
              status="Open"
            />
            <MentorCard1
              room="Statefarm Mentoring Room"
              topic="Statefarm Challenge"
              status="Open"
            />
            <MentorCard1 room="Capital One Room" topic="Capital One Challenge" status="Open" />
            <MentorCard3
              room="Frontend Mentoring Room 3"
              topic1="Flutter"
              topic2="React"
              topic3="Vue.js"
              status="Open"
            />
          </div>
        </div>
        {/* Events and Team */}
        <div className="flex flex-wrap h-96 my-16">
          <div className="md:w-3/5 w-screen ">
            <h1 className="md:text-3xl text-xl font-black">Your Saved Events</h1>
          </div>
          <div className="md:w-2/5 w-screen ">
            <h1 className="md:text-3xl text-xl font-black">Your Team</h1>
            <div className="h-4/5 p-5 md:text-xl text-lg bg-purple-200 rounded-lg">Hackergang</div>
          </div>
        </div>
      </section>
    </div>
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
