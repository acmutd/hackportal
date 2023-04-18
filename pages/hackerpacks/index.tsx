import React from 'react';
import { GetStaticProps } from 'next';
import { NotionAPI } from 'notion-client';
import hackerpackSettings from '../../components/hackerpackComponents/hackerpack-settings.json';
import HackerpackDisplay from '../../components/hackerpackComponents/HackerpackDisplay';

/**
 * The hackerpack page.
 *
 * HackerPack: /
 */
export default function HackerPack(props: { content: any }) {
  // Find the root block because Notion IDs have hyphens
  const rootId =
    hackerpackSettings.mainContent === 'notion'
      ? Object.keys(props.content.block).find(
          (k) => k.replaceAll(/-/g, '') === hackerpackSettings.notionPageId,
        )
      : null;

  return <HackerpackDisplay content={props.content} notionRootId={rootId} />;
}

export const getStaticProps: GetStaticProps = async () => {
  // Load Notion page data from Notion API if using notion
  if (hackerpackSettings.mainContent === 'notion') {
    const notion = new NotionAPI();
    const page = await notion.getPage(hackerpackSettings.notionPageId);
    return { props: { content: page } };
  }
  return { props: { content: null } };
};
