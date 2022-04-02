import DashboardHeader from '../../components/DashboardHeader';
import Header from '../../components/AppHeader';
import Head from 'next/head';
import React from 'react';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import DocLink from './Components/DocLinks';

/**
 * NOTE: The current HackerPack contains dummy data (obviously) and needs to be updated.
 * A Notion page embed works just as well as typing everything in manually.
 * Use your best judgement in figuring out which option is better for your hackathon.
 */

/**
 * The hackerpack page.
 *
 * HackerPack: /
 */
export default function HackerPack() {
  const { isSignedIn, hasProfile } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';

  return (
    <div className="flex flex-grow flex-wrap">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackerPack Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ghost section to fill in for fixed sidebar */}
      <section
        id="ghost"
        className="flex justify-center h-screen sticky top-0 w-1/4 md:w-1/6 2xl:w-1/8 text-xs md:text-xs lg:text-sm overflow-auto"
      ></section>

      {/* Sidebar */}
      <section
        id="Sidebar"
        className="flex justify-center h-screen fixed top-16 border-r-2 border-gray-600 w-1/4 md:w-1/6 2xl:w-1/8 text-xs md:text-xs lg:text-sm overflow-auto"
      >
        <section id="options" className="relative px-6 py-4">
          <div className="font-bold mb-3">HackerPack</div>
          {/* Sidebar selection options */}
          {/* Change hrefs(id) to jump to specific sections in main content */}
          <ul className="pl-4 pb-32">
            <li>
              General
              <ul className="pl-4">
                <li>
                  <a href="#Subsection1">Food</a>
                </li>
                <li>
                  <a href="#Subsection2">Mentors</a>
                </li>
              </ul>
            </li>
            <li>
              Tech Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="#Subsection3">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection4">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection5">Name of Workshop</a>
                </li>
                <li>
                  <a href="#Subsection6">Name of Workshop</a>
                </li>
              </ul>
            </li>
            <li>
              Comm Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
              </ul>
            </li>
            <li>
              Sponsor Workshop Packs
              <ul className="pl-4">
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
                <li>
                  <a href="">Name of Workshop</a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        {/* User greeting for bottom of sidebar */}
        <div className="fixed bottom-0 border-t-2 border-r-2 border-gray-600 w-1/4 md:w-1/6 2xl:w-1/8 text-center py-3 bg-white">
          <div>
            Welcome,{' '}
            {!user || !isSignedIn ? 'hacker' : user.firstName !== '' ? user.firstName : 'hacker'}
          </div>
          <div className="text-indigo-500">{role}</div>
        </div>
      </section>

      {/* Main content section */}
      <section id="mainContent" className="px-6 py-3 w-3/4 md:wd-5/6 2xl:w-7/8">
        <div className="font-bold text-2xl md:text-4xl lg-text-6xl">Big Heading</div>

        {/* Document links */}
        <section id="docLinks" className="bg-gray-200 rounded-lg my-6 p-5 w-5/6">
          Linked Documents:
          <div className="flex flex-wrap grid grid-cols-2 lg:grid-cols-3 ">
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1adXBUwGyVwdzgt43W8JTWb67JMPAaiERei6QWopodVw/edit"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="pdf"
              link="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2020/08/RECIPE_WDW_Epcot_FW_MacandCheeseMarketplace_GourmetMacandCheese.pdf"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1adXBUwGyVwdzgt43W8JTWb67JMPAaiERei6QWopodVw/edit"
              title="Easy Mac and Cheese Recipe"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
            <DocLink
              type="doc"
              link="https://docs.google.com/document/d/1PCCYh-EUiYYK-CCYcZZ2PXQTVTpzY7HpAqHS3DT9p6U/edit"
              title="An Essay for Comm"
            />
          </div>
        </section>

        {/* Section 1 */}
        <div id="Subsection1" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 1</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id volutpat lacus
            laoreet non curabitur. Eget aliquet nibh praesent tristique. In est ante in nibh mauris.
            Imperdiet dui accumsan sit amet nulla facilisi morbi. Sed pulvinar proin gravida
            hendrerit lectus a.
          </p>
          <p>
            <br></br>Cursus mattis molestie a iaculis at. Fusce ut placerat orci nulla pellentesque
            dignissim enim sit amet. Placerat orci nulla pellentesque dignissim enim sit amet
            venenatis. Dolor magna eget est lorem ipsum dolor sit.
          </p>
        </div>
        {/* Section 2 */}
        <div id="Subsection2" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 2</div>
          <div className="flex grid grid-cols-2 gap-x-4 ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis metus
              quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales
              proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum
              odio elementum.
            </p>
            <p>
              Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales proin vitae quam
              aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum odio elementum.
              <ul className="list-disc list-inside">
                <li>Luctus elit cursus</li>
                <li>A habitasse velit </li>
                <li>Egestas nisi</li>
                <li>Vel Sodales proin vitae</li>
              </ul>
            </p>
          </div>
        </div>
        {/* Section 3 */}
        <div id="Subsection3" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 3</div>
          <p>
            Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue nisi
            vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
            Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum. Enim sit amet
            venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur adipiscing elit
            pellentesque. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum
            arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
          </p>
        </div>
        {/* Section 4 */}
        <div id="Subsection4" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 4</div>
          <p>
            Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue nisi
            vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
            Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum. Enim sit amet
            venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur adipiscing elit
            pellentesque. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum
            arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
          </p>
        </div>
        {/* Section 5 */}
        <div id="Subsection5" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 5</div>
          <div>
            <p>
              Turpis egestas pretium aenean pharetra magna. Turpis in eu mi bibendum neque egestas
              congue quisque egestas. Egestas fringilla phasellus faucibus scelerisque. Tincidunt
              ornare massa eget egestas purus viverra accumsan in. Elit ut aliquam purus sit.
              Interdum varius sit amet mattis vulputate enim nulla. Lacinia quis vel eros donec ac
              odio.
              <ul className="list-disc list-inside">
                <li>Cu erat prompta his</li>
                <li>A habitasse velit </li>
                <li>Duis at tellus at urna</li>
                <li>Egestas nisi</li>
              </ul>
            </p>
          </div>
        </div>
        {/* Section 6 */}
        <div id="Subsection6" className="my-7">
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">SubHeading 6</div>
          <div className="flex grid grid-cols-2 gap-x-4 ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis metus
              quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales
              proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum
              odio elementum.
            </p>
            <p>
              Lacinia quis vel eros donec ac odio tempor orci. Mauris cursus mattis molestie a
              iaculis at. Ipsum dolor sit amet consectetur adipiscing elit duis. Integer vitae justo
              eget magna fermentum. Leo in vitae turpis massa sed elementum tempus.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
