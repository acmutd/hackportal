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
          <h2 className="-mt-[120px] text-center text-white">
            If you would like to sponsor HackPortal,
          </h2>
          <h2 className="text-center text-white">
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
          <section className="flex flex-row justify-center items-center p-4 sponsor-grid">
            {sponsor.map(({ link, reference }, idx) => (
              <SponsorCard key={idx} link={link} reference={reference} />
            ))}
            {/* ECS Outreach Logo */}
            <div className="flex justify-center sponsor-card transition-all duration-300">
              <div className="bg-white rounded-xl p-6 w-[280px] h-[160px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 m-4">
                <p className="text-2xl font-bold text-gray-800">ECS Outreach</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    )
  );
}
