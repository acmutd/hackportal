import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';

export default function HomeSponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
  });

  return (
    sponsor.length != 0 && (
      <section className="w-4/5 mx-auto">
        <div className="flex justify-center mt-20">
          <h4 className="text-center gold-text-gradient font-bold md:text-4xl text-2xl my-4">
            THANK YOU TO
            <br />
            OUR SPONSORS
          </h4>
        </div>
        {/* Sponsor Card */}
        <section className="flex flex-wrap justify-center p-4 space-x-6 > * + *">
          {sponsor.map(({ link, reference }, idx) => (
            <SponsorCard key={idx} link={link} reference={reference} />
          ))}
        </section>
        {/* <h2 className="my-2 text-center">
            {' '}
            If you would like to sponsor HackPortal, please reach out to us at&nbsp;
            <a
              href="mailto:email@organization.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              email@organization.com
            </a>
          </h2> */}
      </section>
    )
  );
}
