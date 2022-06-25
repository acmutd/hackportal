import Head from 'next/head';
import React from 'react';
import DocLink from './Components/DocLinks';
import HackerpackSidebar from './Components/HackerpackSidebar';
import MobileDropdownMenu from '../../components/MobileDropdownMenu';
import sidebarContent from './Components/sidebar-content.json';

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
  return (
    <div className="flex flex-col md:flex-row flex-grow flex-wrap">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackerPack Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HackerpackSidebar content={sidebarContent} />
      <MobileDropdownMenu name="HackerPack" content={sidebarContent} className="flex md:hidden" />
      <section id="mainContent" className="px-6 py-3 w-full md:w-5/6 2xl:w-7/8 relative">
        {/* Main content start here */}
        <div
          id="Section1"
          className="font-bold text-2xl md:text-4xl lg-text-6xl before:content-[''] before:block before:h-36 before:-mt-36"
        >
          General
        </div>

        {/* Document links */}
        <section id="docLinks" className="bg-gray-200 rounded-lg my-6 p-5 w-full md:w-5/6">
          Linked Documents:
          <div className="grid grid-cols-2 lg:grid-cols-3 ">
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
        <div
          id="Subsection1"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Food</div>
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
        <div
          id="Subsection2"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Mentors</div>
          <div className="grid grid-cols-2 gap-x-4 ">
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

        {/* Main Heading 2 */}
        <div
          id="Section2"
          className="font-bold text-2xl md:text-4xl lg-text-6xl before:content-[''] before:block before:h-36 before:-mt-36"
        >
          Tech Workshop Packs
        </div>

        {/* Section 3 */}
        <div
          id="Subsection3"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Name of Workshop 1</div>
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
        <div
          id="Subsection4"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Name of Workshop 2</div>
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
        <div
          id="Subsection5"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Name of Workshop 3</div>
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
        <div
          id="Subsection6"
          className="my-7 before:content-[''] before:block before:h-36 before:-mt-36"
        >
          <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Name of Workshop 4</div>
          <div className="grid grid-cols-2 gap-x-4 ">
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
