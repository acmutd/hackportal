import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';

export default function HomeSponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
  });

  return (
    sponsor.length != 0 && (
      <section className="pt-60 pb-40 px-4">
        <div className="flex flex-col flex-grow relative">
          <h4
            // change this after updating tailwind font
            className="header-sponsors"
          >
            Our Sponsors
          </h4>
          <h2 className="-mt-[120px] text-center text-white">
            If you would like to sponsor NTHS 2026,
          </h2>
          <h2 className="text-center text-white">
            please reach out to us at&nbsp;
            <a
              href="mailto:email@organization.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              outreach@acmutd.co
            </a>
          </h2>

          {/* Sponsor Card */}
          <section className="flex flex-row justify-center items-center p-4 sponsor-grid">
            {sponsor.map(({ link, reference }, idx) => (
              <SponsorCard key={idx} link={link} reference={reference} />
            ))}
            <div className="flex justify-center sponsor-card transition-all duration-300">
              <a href="https://markcubanai.org" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl p-6 w-[280px] h-[160px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 m-4">
                  <img
                    src="/assets/mcf.png"
                    alt="mcf"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </a>
            </div>
            {/* ECS Outreach Logo */}
            <div className="flex justify-center sponsor-card transition-all duration-300">
              <a href="https://k12.utdallas.edu" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl p-6 w-[280px] h-[160px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 m-4">
                  <p className="text-2xl font-bold text-gray-800">ECS Outreach</p>
                </div>
              </a>
            </div>
            <div className="flex justify-center sponsor-card transition-all duration-300">
              <a href="https://www.infosys.com" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl p-6 w-[280px] h-[160px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 m-4">
                  <img
                    src="/assets/infosys.png"
                    alt="infosys"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </a>
            </div>
          </section>
        </div>
      </section>
    )
  );
}
