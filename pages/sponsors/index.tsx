import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import SponsorCard from '../../components/SponsorCard';

/**
 * The sponsors page.
 *
 * Landing: /sponsors
 */
export default function Sponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
  }, []);

  return (
    <div
      className="flex flex-col flex-grow"
      // style={{ backgroundImage: "url('assets/background.png')" }}
    >
      <Head>
        <title>HackPortal - Sponsors</title>
        <meta name="description" content="HackPortal's Sponsors Page" />
      </Head>

      <h1 className="md:text-8xl text-7xl text-center my-6 text-violet-750">Sponsors</h1>
      <section className="flex flex-wrap justify-center p-4">
        {sponsor.map(({ link, reference }, idx) => (
          <SponsorCard key={idx} link={link} reference={reference} />
        ))}
      </section>
      <h2 className="my-2 text-center">
        If you would like to sponsor HackPortal, please reach out to us at&nbsp;
        <a
          href="mailto:email@organization.com"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          email@organization.com
        </a>
      </h2>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: sponsorData } = await RequestHelper.get<Sponsor[]>(
    `${protocol}://${context.req.headers.host}/api/sponsor`,
    {},
  );
  console.log(`${protocol}://${context.req.headers.host}/api/sponsor`);
  return {
    props: {
      sponsorCard: sponsorData,
    },
  };
};
