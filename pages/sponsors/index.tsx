import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import SponsorCard from '../../components/SponsorCard';
import SponsorHeader from '../../components/SponsorHeader';

/**
 * The sponsors page.
 *
 * Landing: /sponsors
 */
export default function Sponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
    //organize challenges in order by rank given in firebase
  });

  return (
    <div className="flex flex-col flex-grow bg-white">
      <Head>
        <title>HackPortal - Sponsors</title>
        <meta name="description" content="HackPortal's Sponsors Page" />
      </Head>
      <SponsorHeader
        title="Sponsors"
        email="email@organization.com"
        name="HackPortal"
        className=" mb-0"
      ></SponsorHeader>
      <section id="subheader" className="flex justify-center p-4">
        <div className="flex flex-wrap justify-center">
          {sponsor.map(({ link, reference }, idx) => (
            <SponsorCard key={idx} link={link} reference={reference} />
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: sponsorData } = await RequestHelper.get<Sponsor[]>(
    `${protocol}://${context.req.headers.host}/api/sponsor`,
    {},
  );
  return {
    props: {
      sponsorCard: sponsorData,
    },
  };
};
