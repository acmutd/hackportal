import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import DashboardHeader from '../../components/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import AnnouncementCard from './Components/AnnouncementCards';
import MentorCard1 from './Components/MentorCard1';
import MentorCard3 from './Components/MentorCard3';
import Sidebar from './Components/Sidebar';
import SpotlightCard from './Components/SpotlightCard';
import SpotlightCardScroll from './Components/SpotlightCardScroll';
import Script from 'next/script';

/**
 * The dashboard / hack center.
 *
 * Landing: /dashboard
 */
var eventCount = 0;
export const getItemCount = () => {
  if (typeof window !== 'undefined') {
    const items = document.querySelectorAll('.scrollItem');
    if (items !== undefined && items !== null && items.length !== 0) {
      eventCount = items.length;
    }
  }
};

export default function Dashboard() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';

  var eventCountString;
  if (eventCount === 1) {
    eventCountString = '1 event is happening right now!';
  } else {
    eventCountString = `${eventCount} events are happening right now!`;
  }

  {
    /*
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
  */
  }
  // var eventCount = 0;

  // export const getItemCount = () => {
  //   if (typeof window !== 'undefined'){
  //   const items = document.querySelectorAll('.scrollItem');
  //   if (items !== undefined && items !== null && items.length !== 0) {
  //     eventCount = items.length;
  //   }
  // }
  // };
  // var eventCountString;
  // if (eventCount === 1) {
  //   eventCountString = '1 event is happening right now!';
  // } else {
  //   eventCountString = `${eventCount} events are happening right now!`;
  // }

  return (
    <>
      <Script
        onLoad={() => {
          getItemCount();
        }}
      />
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
              <h3 className="md:text-xl text-md font-bold my-3">{eventCountString}</h3>
              {/* Carousel Section */}
              {/*
            <div className="carousel">
              <SpotlightCard
                title="Tensorflow w/ Google"
                speakers={['Abdullah Hasani', 'Nam Truong']}
                date="Saturday, Nov 13th"
                location="ECSW 1.154"
                time="12:30 - 1:30 PM"
                page="HackerPack"
              />
            */}
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
