import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';
import Image from 'next/image';

export default function HomeSponsors() {
  return (
    <section className="md:w-4/5 w-11/12 mx-auto">
      <div className="flex justify-center mt-10 md:mb-5">
        <h4 className="text-center gold-text-gradient font-bold md:text-4xl text-2xl my-4">
          THANK YOU TO
          <br />
          OUR SPONSORS
        </h4>
      </div>
      {/* Sponsor Cards */}
      <section className="flex flex-wrap justify-center items-center space-y-6 > * + * p-4 md:space-x-6 > * + * sm:space-x-3 > * + *">
        <a
          href={'https://careers.toyota.com/us/en'}
          target="_blank"
          className="relative w-52 h-32"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/Toyota.jpg'}
            alt="Toyota"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'Leap.FidelityCareers.com'}
          target="_blank"
          className="relative w-[22rem] h-20 "
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/Fidelity.png'}
            alt="Fidelity"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'https://www.statefarm.com/careers'}
          target="_blank"
          className="relative w-80 h-20"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/StateFarm.png'}
            alt="StateFarm"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'https://careers.cbre.com/en_US/careers/JobDetail/135583'}
          target="_blank"
          className="relative w-72 h-20"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/CBRE.png'}
            alt="CBRE"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'https://frontier-careers.com/'}
          target="_blank"
          className="relative w-52 h-52"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/Frontier.png'}
            alt="Frontier"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <div className="relative w-[24rem] h-20">
          <Image
            src={'/assets/sponsorLogos/CoreLogic.png'}
            alt="CoreLogic"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-[16rem] h-32">
          <Image
            src={'/assets/sponsorLogos/PRHI.png'}
            alt="PHRI"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <a
          href={'https://www.standoutstickers.com'}
          target="_blank"
          className="relative w-72 h-32"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/StandOutStickers.jpg'}
            alt="StandOutStickers"
            layout="fill"
            objectFit="contain"
          />
        </a>
      </section>
    </section>
  );
}
