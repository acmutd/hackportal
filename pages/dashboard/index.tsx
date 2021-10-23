import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import DashboardHeader from '../../components/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AnnouncementCard from './Components/AnnouncementCards';
import MentorCard1 from './Components/MentorCard1';
import MentorCard3 from './Components/MentorCard3';
import Sidebar from './Components/Sidebar';

/**
 * The dashboard / hack center.
 *
 * Landing: /dashboard
 */
export default function Dashboard() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
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

  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackPortal - Dashboard</title>
        <meta name="description" content="HackPortal's Dashboard" />
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7">
        <section id="subheader" className="w-full pb-6 sticky top-16">
          <DashboardHeader />
        </section>

        <div className="lg:text-xl text-md bg-indigo-100 p-4 rounded-md mb-6">{checkin}</div>

        <div className="flex flex-wrap my-16">
          <div className="md:w-3/5 w-screen h-96">
            <h1 className="md:text-3xl text-xl font-black">Spotlight</h1>
            <h3 className="md:text-xl text-md font-bold my-3">2 events are happening right now!</h3>
            <div className="h-72 bg-gray-100 w-5/6 grid grid-cols-7">
              <div className="col-span-1 h-full flex justify-end items-center">
                <ArrowBackIosIcon style={{ fontSize: 'medium' }} />
              </div>
              <div className="col-span-5 h-5/6 rounded-lg bg-blue-200 my-auto"></div>
              <div className="col-span-1 h-full flex justify-left items-center">
                <ArrowForwardIosIcon style={{ fontSize: 'medium' }} />
              </div>
            </div>
          </div>
          {/* Announcements */}
          <div className="md:w-2/5 w-screen h-96">
            <h1 className="md:text-3xl text-xl font-black">Announcements</h1>
            <div id="announcement-items" className="overflow-y-scroll h-9/10">
              <AnnouncementCard
                text="AWAKE Chocolate Bars available in ECSW Lobby for limited time only! Come and grab some now!"
                time="1:12 PM"
              />
              <AnnouncementCard
                text="Keynote Speaker Antonio Bendaras' speech has been moved from room 1.1501 to 1.514"
                time="1:02 PM"
              />
              <AnnouncementCard
                text="Hacking has officially started! Get hacking hackers :)"
                time="11:00 AM"
              />
              <AnnouncementCard
                text="Check-in has opened! Come to the entrance at ECSW to get checked-in."
                time="8:00 AM"
              />
              <AnnouncementCard text="Gooooood Mooooorning!" time="6:00 AM" />
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
