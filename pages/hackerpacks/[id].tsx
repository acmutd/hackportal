import { GetServerSideProps } from 'next';
import { NotionAPI } from 'notion-client';
import { useRouter } from 'next/router';

import hackerpackSettings from '../../components/hackerpackComponents/hackerpack-settings.json';
import HackerpackDisplay from '../../components/hackerpackComponents/HackerpackDisplay';

export default function NotionSubpage(props: { content: any; error: boolean }) {
  const router = useRouter();
  // If the hackerpack is not a Notion page, ignore it
  if (props.error) {
    router.push('/hackerpacks');
    return null;
  }

  // Generate the sidebar content from Notion
  // Find the root block because Notion IDs have hyphens
  const rootId = Object.keys(props.content.block).find(
    (k) => k === router.asPath.replace('/hackerpacks/', ''),
  );

  // TODO: Support for Markdown subpages
  return <HackerpackDisplay content={props.content} notionRootId={rootId} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Load Notion page data from Notion API
  // Catch invalid IDs and make sure content is generated from Notion pages
  try {
    if (hackerpackSettings.mainContent === 'notion') {
      const notion = new NotionAPI();
      const page = await notion.getPage(context.params['id'] as string);
      return { props: { content: page, error: false } };
    }
  } catch (err) {}
  return { props: { content: null, error: true } };
};
