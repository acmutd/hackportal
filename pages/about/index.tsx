import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AboutHeader from '../../components/AboutHeader';
import MemberCard from '../../components/MemberCard';
import { fakeHackathonData, fakeMembers } from '../../lib/data';

/**
 * The About page.
 *
 * This page contains some introduction about the hackathon in question. It also includes a section used
 * to introduce the team responsible for organizing the hackathon
 *
 * Route: /about
 */
export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [hackathonData, setHackathonData] = useState<HackathonBio>();
  const [members, setMembers] = useState<TeamMember[]>([]);

  const getHackathonData = () => {
    /* TODO: Work out on how these data will be stored in the backend and replace this code with logic to fetch real data from backend */
    return fakeHackathonData;
  };

  const getMembersData = () => {
    /* TODO: Work out on how these data will be stored in the backend and replace this code with logic to fetch real data from backend */
    return fakeMembers;
  };

  useEffect(() => {
    setHackathonData(getHackathonData());
    setMembers(getMembersData());
    setLoading(false);
  }, []);

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

  const { hackathonDescription, hackathonName } = hackathonData;

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <AboutHeader active="/about" />
      <div className="top-6 p-4 flex flex-col gap-y-3">
        <h4 className="font-bold text-3xl">About {hackathonName}</h4>
        {hackathonDescription.map((description, idx) => (
          <h5 key={idx}>{description}</h5>
        ))}
      </div>

      <div className="top-6 p-6 flex flex-col gap-y-4">
        <h4 className="font-bold text-3xl">Meet Our Team :)</h4>
        <div className="flex flex-col gap-y-4">
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
