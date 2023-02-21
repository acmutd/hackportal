import Head from 'next/head';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { NotionRenderer } from 'react-notion-x';
import GithubSlugger from 'github-slugger';
import * as notionTypes from 'notion-types';
import DocLink from './DocLinks';
import HackerpackSidebar from './HackerpackSidebar';
import MobileDropdownMenu from './MobileDropdownMenu';
import hackerpackSettings from './hackerpack-settings.json';
import sidebarContent from './sidebar-content.json';
import indexMarkdown from './markdown/index.md';

// TODO: Add support for Notion databases

// Tailwind rendering for markdown
const markdownRendering = {
  h1: ({ node, ...props }) => (
    <h1
      className="font-bold text-2xl md:text-4xl lg-text-6xl mt-10 before:content-[''] before:block before:h-16 before:-mt-16"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="font-bold text-lg md:text-xl lg:text-3xl mb-4 mt-7 before:content-[''] before:block before:h-16 before:-mt-16"
      {...props}
    />
  ),
  p: ({ node, ...props }) => <p className="my-3" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-3" {...props} />,
  a: ({ node, ...props }) => <a className="underline hover:text-indigo-500" {...props} />,
  table: ({ node, ...props }) => (
    <table className="border-collapse table-auto w-full text-xs md:text-md lg:text-lg" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th
      className="text-left text-sm md:text-lg lg:text-xl text-indigo-600 border-black border py-1 px-2"
      {...props}
    />
  ),
  td: ({ node, ...props }) => <td className="border-black border py-1 px-2" {...props} />,
};

// Stores a heading item; h2 will be false if it's an h1 tag
type HeadingItem = { text: string; h2: boolean };

/*
 * NOTE: The current HackerPack contains dummy data (obviously) and
 * needs to be updated to match your hackathon.
 *
 * Check hackerpack-settings.json for the configuration.
 * The main section of this page can either be a Notion page embed,
 * generated from a markdown file, or hardcoded as HTML (see below).
 */

/**
 * The main hackerpack content. Note that this is the main component
 * that will be used to display the content.
 *
 * However, this component will be nested in the index.tsx or [id].tsx pages as the way
 * the content is loaded and page will be rendered is slightly different.
 * But this component does eliminate a lot of repeated code.
 */
export default function HackerpackDisplay(props: {
  content: notionTypes.ExtendedRecordMap;
  notionRootId?: string;
}) {
  // Adjust width of the main content if sidebar is present
  const adjustedWidth = hackerpackSettings.sidebar ? 'md:w-5/6 2xl:w-7/8' : '';

  // Generate the sidebar from markdown
  let actualSidebarContent = sidebarContent;
  if (hackerpackSettings.sidebar && hackerpackSettings.mainContent === 'markdown') {
    // Use regex to parse through the markdown header tags
    const re = /^#(#|) (.*)\n$/gm;
    let m: RegExpExecArray;
    const headingList: HeadingItem[] = [];
    do {
      m = re.exec(indexMarkdown);
      if (m) headingList.push({ text: m[2], h2: m[1] === '#' });
    } while (m);

    // Nest the h2 elements under the h1 elements
    // and parse the tags using GithubSlugger
    const slugger = new GithubSlugger();
    if (headingList.length !== 0) {
      actualSidebarContent = [];
      let currH1 = {
        title: headingList[0].text,
        href: '#' + slugger.slug(headingList[0].text),
        sections: [],
      };
      for (let i = 1; i < headingList.length; i++) {
        if (headingList[i].h2) {
          currH1.sections.push({
            title: headingList[i].text,
            href: '#' + slugger.slug(headingList[i].text),
          });
        } else {
          actualSidebarContent.push(currH1);
          currH1 = {
            title: headingList[i].text,
            href: '#' + slugger.slug(headingList[i].text),
            sections: [],
          };
        }
      }
      actualSidebarContent.push(currH1);
    }
  } else if (hackerpackSettings.sidebar && hackerpackSettings.mainContent === 'notion') {
    // Get the ordered list of blocks
    const rootObj = props.content.block[props.notionRootId];
    const blockList = rootObj.value.content;

    // Parse through the blocks and extract text/ids from
    // the blocks that are either 'header' or 'sub_header' (h1 and h2)
    actualSidebarContent = [];
    const firstObj = props.content.block[blockList[0]];
    let currH1 = {
      title: firstObj.value.properties.title[0][0],
      href: '#' + firstObj.value.id.replaceAll(/-/g, ''),
      sections: [],
    };
    for (let i = 1; i < blockList.length; i++) {
      const currObj = props.content.block[blockList[i]];
      if (currObj.value.type === 'sub_header') {
        currH1.sections.push({
          title: currObj.value.properties.title[0][0],
          href: '#' + currObj.value.id.replaceAll(/-/g, ''),
        });
      } else if (currObj.value.type === 'header') {
        actualSidebarContent.push(currH1);
        currH1 = {
          title: currObj.value.properties.title[0][0],
          href: '#' + currObj.value.id.replaceAll(/-/g, ''),
          sections: [],
        };
      }
    }
    actualSidebarContent.push(currH1);
  }

  return (
    <div className="flex flex-col md:flex-row flex-grow flex-wrap">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackerPack Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hackerpackSettings.sidebar && (
        <>
          <HackerpackSidebar content={actualSidebarContent} />
          <MobileDropdownMenu
            name="HackerPack"
            content={actualSidebarContent}
            className="flex md:hidden"
          />
        </>
      )}

      {/* Generate main content based on mainContent setting [notion, markdown, html] */}
      <section id="mainContent" className={`px-6 py-3 relative w-full ${adjustedWidth}`}>
        {hackerpackSettings.mainContent === 'notion' && (
          <NotionRenderer
            recordMap={props.content}
            darkMode={hackerpackSettings.darkMode}
            mapPageUrl={(pageId) => `/hackerpacks/${pageId}`}
          />
        )}

        {hackerpackSettings.mainContent === 'markdown' && (
          <ReactMarkdown
            components={markdownRendering}
            rehypePlugins={[rehypeSlug]}
            remarkPlugins={[remarkGfm]}
          >
            {indexMarkdown}
          </ReactMarkdown>
        )}

        {hackerpackSettings.mainContent === 'html' && (
          <>
            {/* Main content goes in this section if using plain HTML/tailwind */}
            <div
              id="Section1"
              className="font-bold text-2xl md:text-4xl lg-text-6xl before:content-[''] before:block before:h-16 before:-mt-16"
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
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Food</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id volutpat
                lacus laoreet non curabitur. Eget aliquet nibh praesent tristique. In est ante in
                nibh mauris. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sed pulvinar
                proin gravida hendrerit lectus a.
              </p>
              <p>
                <br></br>Cursus mattis molestie a iaculis at. Fusce ut placerat orci nulla
                pellentesque dignissim enim sit amet. Placerat orci nulla pellentesque dignissim
                enim sit amet venenatis. Dolor magna eget est lorem ipsum dolor sit.
              </p>
            </div>
            {/* Section 2 */}
            <div
              id="Subsection2"
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">Mentors</div>
              <div className="grid grid-cols-2 gap-x-4 ">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis
                  metus quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel,
                  sodales proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc
                  neque, fermentum odio elementum.
                </p>
                <p>
                  Luctus elit cursus a habitasse velit. Egestas nisi, vel, sodales proin vitae quam
                  aenean ullamcorper. Fames enim nunc augue velit nunc neque, fermentum odio
                  elementum.
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
              className="font-bold text-2xl md:text-4xl lg-text-6xl before:content-[''] before:block before:h-16 before:-mt-16"
            >
              Tech Workshop Packs
            </div>

            {/* Section 3 */}
            <div
              id="Subsection3"
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
                Name of Workshop 1
              </div>
              <p>
                Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue
                nisi vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus
                imperdiet. Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum.
                Enim sit amet venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur
                adipiscing elit pellentesque. Donec pretium vulputate sapien nec sagittis aliquam
                malesuada bibendum arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
              </p>
            </div>
            {/* Section 4 */}
            <div
              id="Subsection4"
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
                Name of Workshop 2
              </div>
              <p>
                Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Mauris nunc congue
                nisi vitae suscipit. Vestibulum morbi blandit cursus risus at ultrices mi tempus
                imperdiet. Mi proin sed libero enim sed. Sit amet nisl suscipit adipiscing bibendum.
                Enim sit amet venenatis urna cursus eget. Est lorem ipsum dolor sit amet consectetur
                adipiscing elit pellentesque. Donec pretium vulputate sapien nec sagittis aliquam
                malesuada bibendum arcu. Enim nulla aliquet porttitor lacus luctus accumsan tortor.
              </p>
            </div>
            {/* Section 5 */}
            <div
              id="Subsection5"
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
                Name of Workshop 3
              </div>
              <div>
                <p>
                  Turpis egestas pretium aenean pharetra magna. Turpis in eu mi bibendum neque
                  egestas congue quisque egestas. Egestas fringilla phasellus faucibus scelerisque.
                  Tincidunt ornare massa eget egestas purus viverra accumsan in. Elit ut aliquam
                  purus sit. Interdum varius sit amet mattis vulputate enim nulla. Lacinia quis vel
                  eros donec ac odio.
                  <ul className="list-disc list-inside">
                    <li>Cu erat prompta his</li>
                    <li>A habitasse velit </li>
                    <li>Duis at tellus at urna</li>
                    <li>Egestas nisi</li>
                  </ul>
                </p>
              </div>
            </div>

            <div
              id="Section3"
              className="font-bold text-2xl md:text-4xl lg-text-6xl before:content-[''] before:block before:h-16 before:-mt-16"
            >
              Sponsor Workshop Packs
            </div>

            {/* Section 6 */}
            <div
              id="Subsection6"
              className="my-7 before:content-[''] before:block before:h-16 before:-mt-16"
            >
              <div className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
                Name of Workshop 4
              </div>
              <div className="grid grid-cols-2 gap-x-4 ">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu et vitae, in quis
                  metus quam integer et. Luctus elit cursus a habitasse velit. Egestas nisi, vel,
                  sodales proin vitae quam aenean ullamcorper. Fames enim nunc augue velit nunc
                  neque, fermentum odio elementum.
                </p>
                <p>
                  Lacinia quis vel eros donec ac odio tempor orci. Mauris cursus mattis molestie a
                  iaculis at. Ipsum dolor sit amet consectetur adipiscing elit duis. Integer vitae
                  justo eget magna fermentum. Leo in vitae turpis massa sed elementum tempus.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
