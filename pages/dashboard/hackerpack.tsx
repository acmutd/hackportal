import DashboardHeader from '../../components/DashboardHeader';
import Header from '../../components/AppHeader';
import Head from 'next/head';
import React from 'react';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import DocLink from './Components/DocLinks';
import SponsorCard from './Components/SponsorChallenge';
import Image from 'next/image';
import ClubCard from './Components/ClubCard';
/**
 * The dashboard / hackerpack.
 *
 * Landing: /hackerpack
 */
export default function HackerPack() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';

  return (
    <div className="font flex flex-grow flex-wrap">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's HackerPacks" />
      </Head>

      {/* ghost section to fill in for fixed sidebar */}
      <section
        id="ghost"
        className="flex justify-center h-screen sticky bg-black top-0 w-1/4 md:w-1/6 2xl:w-1/8 text-xs md:text-xs lg:text-sm overflow-auto"
      ></section>

      <section
        id="Sidebar"
        className="flex justify-center min-h-[90vh] max-h-[90vh] fixed top-24 border-r-2 border-b-2 border-t-2 border-aqua w-1/4 md:w-1/6 2xl:w-1/8 text-xs md:text-xs lg:text-sm overflow-auto bg-black z-51 topz"
      >
        <section id="options" className="relative px-6 py-4">
          <div className="font-bold mb-3">HackerPack</div>
          <ul className="pl-4 pb-32">
            <li>
              General
              <ul className="pl-4 list-disc list-outside">
                <li>
                  <a href="#About">Overview</a>
                </li>
                <li>
                  <a href="#team">Team Formation</a>
                </li>
                <li>
                  <a href="#submission">Submission &amp; Judging</a>
                </li>
                <li>
                  <a href="#workshop">Workshop Info</a>
                </li>
                <li>
                  <a href="#food">Meals</a>
                </li>
                <li>
                  <a href="#hackspaces">Hacking Spaces</a>
                </li>
                <li>
                  <a href="#clubs">Clubs &amp; Orgs</a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <div className="dashboardTag fixed bottom-0 border-t-2 border-r-2 border-aqua w-1/4 md:w-1/6 2xl:w-1/8 text-center py-3 bg-black">
          <div>Welcome, {!user || !isSignedIn ? 'hacker' : user.firstName}</div>
          <div className="text-indigo-500">{role}</div>
        </div>
      </section>

      <section id="mainContent" className="px-6 py-3 w-3/4 md:wd-5/6 2xl:w-7/8 z-0 bottomz">
        <section id="subheader" className="p-4">
          <DashboardHeader active="/dashboard/hackerpack" />
        </section>
        <p className="hackerPackShadow inline font-bold text-2xl md:text-4xl lg-text-6xl text-white">
          HackerPack
        </p>

        <div id="About" className="my-7 scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-4">🖥️ What is HackUTD?</div>
          <p>
            HackUTD is a weekend-long event where students build apps, hardware, and more. HackUTD
            provides a venue for self-expression and creativity through technology. People with
            varying technical backgrounds come together, form teams around a problem or idea, and
            collaboratively build a unique solution from scratch. Whether you&#39;re a frequent
            hackathon attendee or just getting started, we&#39;d love to see what you can make.
          </p>
        </div>

        <div id="" className="my-7">
          <div className="font-bold text-xl lg:text-3xl mb-4">💫 What&#39;s the Purpose?</div>
          <p>
            Develop CS &amp; non-CS student relations and skills through hacking challenges.
            Showcase new technologies through workshops and facilitate meetings with industry
            leaders who choose to participate in our hackathon!
          </p>
        </div>

        <div id="" className="my-7">
          <div className="font-bold text-xl lg:text-3xl mb-4">🎉 Why attend HackUTD?</div>
          <p>
            HackUTD is a student organized hackathon aimed at offering fellow students an outlet for
            self expression and welcoming everyone with or without experience! HackUTD hosts events
            that introduce key concepts and relevant topics that new hackers will find useful.
          </p>
        </div>

        <div id="team" className="my-7 scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-4">👯 Team Formation</div>
          <p>
            Team formation will be happening virtually this year! Follow the instructions on the
            linked slide deck to meet people and make groups together. Of course, you might also
            consider going around ECSW and seeing who you might bump into :)
          </p>
          <a
            href="https://docs.google.com/presentation/d/1eQjd3C9n6snN8EMms_x4BUofCfQ77YeEGSSL3aPcOmA/edit#slide=id.gbcac21a7b8_0_160"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            🔗 Team formation slide deck
          </a>
        </div>

        <div id="submission" className="my-7 scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-4">
            💯 Submission &amp; Judging Instructions
          </div>
          <p>
            To submit your project, use devpost and create a submission in our Devpost before 12:00
            PM on Sunday, November 14th. Include as much information as possible, so judges can look
            at your project before your presentation! To be considered for judging and prizes, you{' '}
            <strong className="underline">must submit a project on devpost by 12:00 PM.</strong>
          </p>
          <p className="my-4">
            Judging will work differently depending on if your team is hybrid, in-person, or
            virtual. *Additionally, if you are submitting a project to the Capital One &lsquo;Best
            Financial Hack&rsquo; challenge, you must submit a 5-minute video to be considered.*
          </p>
          <ul className="list-disc list-outside">
            <li>
              If you are not comfortable participating in in-person judging, you may also submit a
              5-minute video.
            </li>
            <li>
              If your team is in-person, a spreadsheet with booth numbers will be posted on the
              hackathon portal. Booths will be spread out throughout the building, in numerical
              order. Once you find your booth, judges will start coming around to hear your
              presentation and judge your projects.
            </li>
            <li>
              If your team is virtual, we ask that you submit a video presentation, up to 5 minutes
              long. This presentation can cover whatever content you want, but ideally should
              encompass all aspects of your project. Judges will then be shown your video during the
              judging timeslot.
            </li>
          </ul>
          <p className="my-2">
            Lastly, if your team is hybrid, you get to choose how the presentation is done! It can
            either be done with the 5-minute video, or in-person, depending on your teams decision.
          </p>
          <a href="" target="_blank" rel="noreferrer" className="underline">
            🔗 Dev post link coming soon
          </a>
        </div>

        <div id="workshop" className="my-7 scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-4">📄 Workshop Info</div>
          <div className="my-2">
            Click on the following workshops to access certain workshop info! These will help you
            prepare and learn more about the workshop.
          </div>
          <ul className="list-disc list-outside">
            <li>
              <a
                href="https://ericmutton.notion.site/ericmutton/Arduino-Crash-Course-5bc6961801d34b2d968c9c06570b72e3"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                Makerspace - Arduino Crash Course
              </a>
            </li>
            <li>
              <a
                href="https://curse-squash-d4d.notion.site/180DC-7-Step-Problem-Solving-Methodology-Workshop-c1821a15ae364789bb26b260b8e9f095"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                180 Degrees Consulting - 7 Step Problem-Solving Methodology
              </a>
            </li>
            <li>
              <a
                href="https://fifth-ink-847.notion.site/IEEEUTD-Team-Building-Social-4af07c3653f54fcd9bc6585750371e24"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                IEEE UTD - Team-Building Social
              </a>
            </li>
            <li>
              <a
                href="https://carnelian-tiglon-e2f.notion.site/American-Airlines-Full-Stack-Development-with-Next-js-1c98a94d9fed4be9bcb11cfa6ec98d84"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                American Airlines - Full stack development with Next.js
              </a>
            </li>
            <li>
              <a
                href="https://believed-swift-e2c.notion.site/HackUTD-VIII-Pitch-Perfect-Workshop-Hacker-Guide-524a1055ef2e49afba940b19697b1a6a"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                Entrepreneur Club - Pitch Perfect
              </a>
            </li>
            <li>
              <a
                href="https://carnelian-tiglon-e2f.notion.site/EOG-Resources-Crash-Course-on-React-and-Functional-Components-5e8597fdc55b4672a4d25865b337fb48"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                EOG Resources - Crash Course on React and Functional Components
              </a>
            </li>
            <li>
              <a
                href="https://sponge-snipe-bbf.notion.site/Building-a-Blockchain-dApp-with-UTD-Blockchain-Club-90f1fd5e3ff542218a2cf986750cc4f2"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                UTD Block Chain - Building a Blockchain dApp
              </a>
            </li>
            <li>
              <a
                href="https://illustrious-broker-f40.notion.site/HackUTD-VIII-Workshop-Hacker-Guide-068ef2f76f654121be68d7a1c2016d6e"
                target="_blank"
                rel="noreferrer"
                className="m-1"
              >
                {' '}
                AIS Workshop
              </a>
            </li>
          </ul>
        </div>

        <div id="food" className="my-7 scrollSnap tableOutline">
          <div className="font-bold text-xl lg:text-3xl">🍕 Meals</div>
          <p className="md:text-lg text-sm my-2">
            Grab a bite while you&#39;re hacking! You can&#39;t get anywhere on an empty stomach.
          </p>
          <p className="md:text-xl text-md">Provided Meals - Free of Charge 🤩</p>
          <table className="border-collapse w-full text-xs md:text-md lg:text-lg">
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Day</th>
              <th>Catering</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
            <tr>
              <td>Saturday Lunch</td>
              <td>Wafflelicious Food Truck, Yummy Pizza Food Truck</td>
              <td>12:00 pm</td>
              <td>Pedestrian Promenade</td>
            </tr>
            <tr>
              <td>Saturday Dinner</td>
              <td>Jimmy John&#39;s</td>
              <td>7:30 pm</td>
              <td>Room ECS 1.100, Main Community Commons</td>
            </tr>
            <tr>
              <td>Saturday Snacks</td>
              <td>Mystery item 👀</td>
              <td>12:00 am</td>
              <td>Room ECS 1.100, Main Community Commons</td>
            </tr>
            <tr>
              <td>Sunday Breakfast</td>
              <td>Einstein&#39;s</td>
              <td>9:00 am</td>
              <td>Room ECS 1.100, Main Community Commons</td>
            </tr>
            <tr>
              <td>Sunday Lunch</td>
              <td>Freebird&#39;s</td>
              <td>12:00 pm</td>
              <td>Room ECS 1.100, Main Community Commons</td>
            </tr>
          </table>
          <br />
          <p className="md:text-xl text-md">🍽️ On-Campus Restaurants</p>
          <table className="border-collapse w-full text-xs md:text-md lg:text-lg">
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Student Union</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>Starbucks (cafe)</td>
              <td>9:00 am - 3:00 pm</td>
              <td>closed</td>
            </tr>
            <tr>
              <td>Chick-Fil-A (take-out)</td>
              <td>10:20 am - 3:00 pm</td>
              <td>closed</td>
            </tr>
            <tr>
              <td>Panda Express</td>
              <td>10:20 am - 3:00 pm</td>
              <td>closed</td>
            </tr>
            <tr className="row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Parking Structure 3</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>Taco Bell Cantina (dine-in)</td>
              <td>8:00 am - 3:00 pm</td>
              <td>11:00 am - 7:00 pm</td>
            </tr>
            <tr className="row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Dining Hall West</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>Papa Johns (take-out)</td>
              <td>11:00 am - 11:00 pm</td>
              <td>Closed</td>
            </tr>
            <tr>
              <td>The Market</td>
              <td>11:00 am - 11:00 pm</td>
              <td>Closed</td>
            </tr>
            <tr className="row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Northside</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>7-Eleven</td>
              <td>Open 24 Hours</td>
              <td>Open 24 Hours</td>
            </tr>
            <tr>
              <td>Northside Drafthouse &amp; Eatery </td>
              <td>11:00 am - 2:00 am</td>
              <td>11:00 am - 12:00 am</td>
            </tr>
            <tr>
              <td>Pinto Urban Thai Dinner</td>
              <td>12:00 pm - 9:00 pm</td>
              <td>Closed</td>
            </tr>
            <tr>
              <td>Starbucks</td>
              <td>6:00 am - 10:00 pm</td>
              <td>6:00 am - 10:00 pm</td>
            </tr>
          </table>
          <br />
          <p className="md:text-xl text-md">🚗 Off-Campus Restaurants</p>
          <table className="border-collapse w-full text-xs md:text-md lg:text-lg">
            <tr className="pinkShadow lg:text-xl md:text-lg text-md">
              <th>Name</th>
              <th>Distance From Campus</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>Salata</td>
              <td>1.5 miles</td>
              <td>11:00 am - 9:00 pm</td>
              <td>11:00 am - 3:00 pm</td>
            </tr>
            <tr>
              <td>QDOBA</td>
              <td>1.6 miles</td>
              <td>11:00 am - 9:00 pm</td>
              <td>11:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td>Raising Cane&#39;s</td>
              <td>1.7 miles</td>
              <td>10:00 am - 1:00 am</td>
              <td>10:00 am - 1:00 am</td>
            </tr>
            <tr>
              <td>Whataburger</td>
              <td>1.9 miles</td>
              <td>24 hours</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>Skyrocket Burger</td>
              <td>2 miles</td>
              <td>11:00 am - 9:00 pm</td>
              <td>closed</td>
            </tr>
            <tr>
              <td>Pizza Hut</td>
              <td>2.1 miles</td>
              <td>10:00 am - 12:00 am</td>
              <td>10:00 am - 11:00 pm</td>
            </tr>
            <tr>
              <td>Rosa&#39;s Caf&eacute;</td>
              <td>2.3 miles</td>
              <td>6:30 am - 11:00 pm</td>
              <td>6:30 am - 10:00 pm</td>
            </tr>
            <tr>
              <td>Smoothie King</td>
              <td>2.4 miles</td>
              <td>8:00 am - 9:00 pm</td>
              <td>10:00 am - 8:00 pm</td>
            </tr>
            <tr>
              <td>TocoToco Boba Tea</td>
              <td>2.9 miles</td>
              <td>10:00 am - 11:00 pm</td>
              <td>10:00 am - 11:00 pm</td>
            </tr>
            <tr>
              <td>Velvet Taco</td>
              <td>3.3 miles</td>
              <td>11:00 am - 2:00 am</td>
              <td>11:00 am - 11:00 pm</td>
            </tr>
            <tr>
              <td>Cafe Brazil</td>
              <td>3.8 miles</td>
              <td>24 hours</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>OMG Tacos</td>
              <td>4.2 miles</td>
              <td>11:00 am - 2:45 am</td>
              <td>11:00 am - 1:45 am</td>
            </tr>
          </table>
          <p className="mt-3">
            *Off Campus Restaurants with UTD Student Discounts:{' '}
            <a href="https://sg.utdallas.edu/discount/#dining" target="_blank" rel="noreferrer">
              https://sg.utdallas.edu/discount/#dining
            </a>
          </p>
        </div>

        {/* MOVE TO HACKCENTER */}
        {/* <div id="Subsection2" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Sponsor Challenges</div>
          <div className="w-full flex flex-wrap">
            <SponsorCard challenge="General Challenge" description="Challenge Description" />
            <SponsorCard
              challenge="American Airlines Challenge"
              description="Challenge Description"
            />
            <SponsorCard challenge="Goldman Sachs Challenge" description="Challenge Description" />
            <SponsorCard challenge="Capital One Challenge" description="Challenge Description" />
            <SponsorCard challenge="StateFarm Challenge" description="Challenge Description" />
          </div>
        </div> */}
        <div id="hackspaces" className="my-7 w-full scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-2">⌨️ Hacking Spaces</div>
          <div className="w-full">
            There&#39;s a lot of places around campus to hack. Here are some of our favorites that
            we want to share with you.
          </div>
          <p>
            3D Searchable Map of UTD :{' '}
            <a
              href="https://map.concept3d.com/?id=1772#!m/435231?ce/52264?ct/42147,52300"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              here
            </a>
          </p>
          <div className="w-full flex justify-between flex-wrap mt-2">
            {/* ECS West */}
            <div className="w-full">
              <p className="lg:text-2xl text-lg pinkShadow">ECS West</p>
              <div className="flex flex-wrap w-full grid md:grid-cols-2 grid-cols-1 gap-2">
                <div>
                  <p className="lg:text-xl text-md">1️⃣ Floor 1</p>
                  <ul className="list-disc list-outside">
                    <li>Collaboration Rooms: 1.330, 1.340</li>
                  </ul>
                </div>
                <div>
                  <p className="lg:text-xl text-md">2️⃣ Floor 2</p>
                  <ul className="list-disc list-outside">
                    <li>Collaboration Rooms: 2.305</li>
                    <li>Classrooms: 2.325</li>
                    <li>Study Area: 2.100, 2.115, 2.125, 2.160, 2.164, 2.330, 2.336, 2.369</li>
                    <li>Student Lounge: 2.475</li>
                  </ul>
                </div>
                <div>
                  <p className="lg:text-xl text-md">3️⃣ Floor 3</p>
                  <ul className="list-disc list-outside">
                    <li>Collaboration Rooms: 3.305, 3.321</li>
                    <li>Study Area: 3.330, 3.336, 3.160, 3,115, 3.125</li>
                    <li>Student Lounge: 3.475, 3.104</li>
                  </ul>
                </div>
                <div>
                  <p className="lg:text-xl text-md">4️⃣ Floor 4</p>
                  <ul className="list-disc list-outside">
                    <li>Collaboration Rooms: 4.305</li>
                    <li>Classrooms: 4.325</li>
                    <li>Study Area: 4.330, 4.336, 4.125, 4.115</li>
                    <li>Student Lounge: 4.475</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Other */}
            <div>
              <p className="lg:text-2xl text-lg pinkShadow">Other Hacking Spaces On Campus</p>
              <ul className="">
                <li>ECSS and ECSN Lobbies</li>
                <li>Plinth Staircase</li>
                <li>Sciences Building/Courtyard</li>
                <li>Student Union Lounge</li>
                <li>Student Services Building</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="clubs" className="my-7 w-full scrollSnap">
          <div className="font-bold text-xl lg:text-3xl mb-4">👥 Clubs and Organizations</div>
          <ClubCard
            path="/assets/clubImages/WINStem.png"
            club="WIN Stem"
            description="Win STEM at UT Dallas is a charitable, service-oriented organization aimed at supporting and recruiting ambitious women to pursue STEM careers through building confidence, community engagement, and opportunity guidance."
          />
          <ClubCard
            path="/assets/clubImages/blockchain.png"
            club="UTD BlockChain"
            description="UTD Blockchain is a club that focuses on creating awareness about blockchain technology and it's application in various industries like finance, supply chain, and e-commerce to name a few. We want to help people to get involved in blockchain and other financial technologies from the very start. Our club gives a lot of importance to preparing our students to succeed on a professional level by exposing them to both engineering and business regardless of their majors."
          />
          <ClubCard
            path="/assets/clubImages/IEEE.png"
            club="Institute of Electrical and Electronics Engineers"
            description="IEEE is a student run branch of IEEE whose purpose is to provide current undergraduate students with an opportunity to enrich their learning experience and connect with local industry professionals. We provide students with an environment that allows them to socialize through IEEE events and enables them to develop professional skills through tech talks and personal interactions. By sustaining a close community of passionate young engineers, we hope to encourage excellence among our members and enhance the character of the engineering profession at large. "
          />
          <ClubCard
            path="/assets/clubImages/EntrepreneurshipClub.png"
            club="Entrepreneurship Club"
            description="The mission of Entrepreneurship Club is to promote the entrepreneurship spirit on campus by empowering students to collaborate, create and most importantly become change makers. We do so by promoting local startup events, inviting guest speakers, hosting pitch competitions, and we’re constantly trying to expand the impact of our club both on campus and off campus."
          />
          <ClubCard
            path="/assets/clubImages/gdsc.png"
            club="Google Developer Student Clubs"
            description="Google Developer Student Clubs are university based community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome. By joining a GDSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community."
          />
          <ClubCard
            path="/assets/clubImages/AIS.png"
            club="Artificial Intelligence Society"
            description="The Artificial Intelligence Society is one of the largest computer science organizations at the University of Texas at Dallas. We are a team of passionate individuals, devoted to bridging the gap between people's awareness and the world of AI. Our mission is to promote artificial intelligence education at UT Dallas and in the surrounding communities."
          />
          <ClubCard
            path="/assets/clubImages/SGDA.png"
            club="Student Game Developer Association"
            description="The SGDA serves to promote game development, create a growing community of students and professionals involved in the games industry, and host events related to video game development and its many facets."
          />
          <ClubCard
            path="/assets/clubImages/Makerspace.png"
            club="UTDesign Makerspace"
            description="The mission of UTDesign Makerspace is to provide an environment of innovation, collaboration, and education where Makers can develop their skills and projects among their peers with access to current and next-generation technology."
          />
          <ClubCard
            path="/assets/clubImages/180DegreesConsulting.png"
            club="180 Degrees Consulting"
            description="180DC at UT Dallas provides UT Dallas students with opportunities to develop professional consulting skills by bringing together UTD's top talent to solve challenging, real-world problems. Our members make a real impact, gain practical experience, and exercise leadership in one of the most competitive careers in business."
          />
          <ClubCard
            path="/assets/clubImages/AlphaKappaPsi.png"
            club="Alpha Kappa Psi"
            description="Alpha Kappa Psi is a professional business fraternity. Our motto is &ldquo;Shaping People, Shaping Business,&rdquo; and we are committed to developing business leaders and professionals one student at a time."
          />
        </div>
      </section>
    </div>
  );
}
