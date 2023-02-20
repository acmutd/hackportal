import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { RequestHelper } from '../lib/request-helper';
import HomeHero from '../components/homeComponents/HomeHero';
import HomeNotif from '../components/homeComponents/HomeNotif';
import HomeVideoStats from '../components/homeComponents/HomeVideoStats';
import HomeAbout from '../components/homeComponents/HomeAbout';
import HomeSpeakers from '../components/homeComponents/HomeSpeakers';
import HomeChallenges from '../components/homeComponents/HomeChallenges';
import HomeTeam from '../components/homeComponents/HomeTeam';
import HomeSponsors from '../components/homeComponents/HomeSponsors';
import HomeFooter from '../components/homeComponents/HomeFooter';

/**
 * The home page.
 *
 * Landing: /
 *
 */
export default function Home(props: {
  keynoteSpeakers: KeynoteSpeaker[];
  challenges: Challenge[];
  answeredQuestion: AnsweredQuestion[];
  fetchedMembers: TeamMember[];
  sponsorCard: Sponsor[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for all components to render before showing page
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>HackPortal</title> {/* !change */}
        <meta name="description" content="A default HackPortal instance" /> {/* !change */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeNotif />
      <HomeHero />
      <HomeVideoStats />
      <HomeAbout />
      <HomeSpeakers keynoteSpeakers={props.keynoteSpeakers} />
      <HomeChallenges challenges={props.challenges} />
      <HomeTeam members={props.fetchedMembers} />
      <HomeSponsors sponsorCard={props.sponsorCard} />
      <HomeFooter />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: keynoteData } = await RequestHelper.get<KeynoteSpeaker[]>(
    `${protocol}://${context.req.headers.host}/api/keynotespeakers`,
    {},
  );
  const { data: challengeData } = await RequestHelper.get<Challenge[]>(
    `${protocol}://${context.req.headers.host}/api/challenges/`,
    {},
  );
  const { data: answeredQuestion } = await RequestHelper.get<AnsweredQuestion[]>(
    `${protocol}://${context.req.headers.host}/api/questions/faq`,
    {},
  );
  const { data: memberData } = await RequestHelper.get<TeamMember[]>(
    `${protocol}://${context.req.headers.host}/api/members`,
    {},
  );
  const { data: sponsorData } = await RequestHelper.get<Sponsor[]>(
    `${protocol}://${context.req.headers.host}/api/sponsor`,
    {},
  );
  return {
    props: {
      keynoteSpeakers: keynoteData,
      challenges: challengeData,
      answeredQuestion: answeredQuestion,
      fetchedMembers: memberData,
      sponsorCard: sponsorData,
    },
  };
};
