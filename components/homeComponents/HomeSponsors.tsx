import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';

export default function HomeSponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
  });

  return (
    sponsor.length != 0 && (
      <section className="md:p-40">
        <div className="flex flex-col flex-grow relative">
          <h4
            // change this after updating tailwind font
            className="header-sponsors"
          >
            Our Sponsors
          </h4>
          <h2 className="mt-1 text-center">If you would like to sponsor HackPortal,</h2>
          <h2 className="text-center">
            please reach out to us at&nbsp;
            <a
              href="mailto:email@organization.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              email@organization.com
            </a>
          </h2>
          {/* Sponsor Card */}
          <section className="flex flex-wrap justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {sponsor.map(({ link, reference }, idx) => (
                <SponsorCard key={idx} link={link} reference={reference} />
              ))}
            </div>
          </section>
        </div>
      </section>
    )
  );
}
