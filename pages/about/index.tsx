import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AboutHeader from '../../components/AboutHeader';
import MemberCard from '../../components/MemberCard';
import { RequestHelper } from '../../lib/request-helper';

/**
 * The About page.
 *
 * This page contains some introduction about the hackathon in question. It also includes a section used
 * to introduce the team responsible for organizing the hackathon
 *
 * Route: /about
 */
export default function AboutPage({ fetchedMembers }: { fetchedMembers: TeamMember[] }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setMembers(fetchedMembers);
    setLoading(false);
  }, [fetchedMembers]);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#C1C8FF',
    },
    {
      light: '#D8F8FF',
      dark: '#B0F1FF',
    },
    {
      dark: '#FCD7FF',
      light: '#FDECFF',
    },
  ];

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <AboutHeader active="/about" />
      <div className="top-6 p-4 flex flex-col gap-y-3">
        <h4 className="font-bold text-3xl">About this hackathon</h4>
        <p>
          Here will be a short paragraph providing a general overview of what then hackathon is.
          This can be dates, events, contests, and prizes.
        </p>
        <p>
          This paragraph can be about the size and reach of the hackathon. Can include the number of
          participants every year and the total worth of prizes.
        </p>
        <p>Any additional information can be provided in this paragraph.</p>
      </div>

      <div className="top-6 p-6 flex flex-col gap-y-4">
        <h4 className="font-bold text-3xl">Meet Our Team :)</h4>
        <div className="flex flex-col gap-y-4 w-full">
          {members.map(({ name, description }, idx) => (
            <MemberCard
              key={idx}
              name={name}
              description={description}
              cardColor={colorSchemes[idx % 3]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<TeamMember[]>(
    `${protocol}://${context.req.headers.host}/api/members`,
    {},
  );
  return {
    props: {
      fetchedMembers: data,
    },
  };
};
