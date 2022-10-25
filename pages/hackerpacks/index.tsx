import Head from 'next/head';
import React from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import GithubSlugger from 'github-slugger';
import DocLink from './Components/DocLinks';
import HackerpackSidebar from './Components/HackerpackSidebar';
import MobileDropdownMenu from './Components/MobileDropdownMenu';
import hackerpackSettings from './Components/hackerpack-settings.json';
import sidebarContent from './Components/sidebar-content.json';
import indexMarkdown from './Components/markdown/index.md';

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

/**
 * NOTE: The current HackerPack contains dummy data (obviously) and
 * needs to be updated to match your hackathon.
 *
 * Check hackerpack-settings.json for the configuration.
 * The main section of this page can either be a Notion page embed,
 * generated from a markdown file, or hardcoded as HTML (see below).
 */

/**
 * The hackerpack page.
 *
 * HackerPack: /
 */
export default function HackerPack(props: { content: any }) {
  // Adjust width of the main content if sidebar is present
  const adjustedWidth = hackerpackSettings.sidebar ? 'md:w-5/6 2xl:w-7/8' : '';

  // Generate the sidebar from markdown
  let actualSidebarContent = sidebarContent;
  if (hackerpackSettings.sidebar && hackerpackSettings.mainContent === 'markdown') {
    // Use regex to parse through the markdown
    const re = /^#(#|) (.*)\n$/gm;
    let m;
    const headingList = [];
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
    // Find the root block because Notion IDs have hyphens
    const rootId = Object.keys(props.content.block).find(
      (k) => k.replaceAll(/-/g, '') === hackerpackSettings.notionPageId,
    );

    // Get the ordered list of blocks
    const rootObj = props.content.block[rootId];
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

  // remove when it's time to reveal page
  return (
    <div className="pt-12 flex flex-col md:flex-row flex-grow flex-wrap home">
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
            darkMode={true}
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
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Load Notion page data from Notion API if using notion
  if (hackerpackSettings.mainContent === 'notion') {
    const notion = new NotionAPI();
    const page = await notion.getPage(hackerpackSettings.notionPageId);
    return { props: { content: page } };
  }
  return { props: { content: null } };
};
