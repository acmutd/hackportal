import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';
import Image from 'next/image';

export default function HomeSponsors() {
  return (
    <section className="2xl:w-2/3 md:w-4/5 w-11/12 mx-auto 2xl:mb-24 md:mb-12">
      <div className="flex justify-center 2xl:mt-20 mt-10 2xl:mb-0 md:mb-5">
        <h4 className="text-center gold-text-gradient font-bold 2xl:text-5xl md:text-4xl text-2xl my-4">
          THANK YOU TO
          <br />
          OUR SPONSORS
        </h4>
      </div>
      {/* Sponsor Cards */}
      <section className="flex flex-wrap justify-center items-center space-y-6 > * + * p-4 2xl:space-x-12 > * + * md:space-x-6 > * + * sm:space-x-3 > * + *">
        <a
          href={'https://www.goldmansachs.com/careers/our-firm/engineering/index.html'}
          target="_blank"
          className="relative w-40 h-40 md:mt-6  md:mx-0 mx-8"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/GoldmanSachs.png'}
            alt="GoldmanSachs"
            layout="fill"
            objectFit="contain"
          />
        </a>
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
        <a
          href={'https://geico.wd1.myworkdayjobs.com/External'}
          target="_blank"
          className="relative w-80 h-28"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/Geico.png'}
            alt="Geico"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'http://patientsafetytech.com/'}
          target="_blank"
          className="relative w-[16rem] h-32"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/PRHI.png'}
            alt="PHRI"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          href={'https://www.corelogic.com/culture/'}
          target="_blank"
          className="relative w-[24rem] h-20"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/CoreLogic.png'}
            alt="CoreLogic"
            layout="fill"
            objectFit="contain"
          />
        </a>
      </section>
      <div className="flex justify-center 2xl:mt-20 md:mt-10 2xl:mb-0 md:mb-5">
        <h4 className="text-center gold-text-gradient font-bold 2xl:text-4xl md:text-3xl text-2xl my-4">
          Special thanks to
        </h4>
      </div>
      <section className="flex flex-wrap justify-center items-center sm:space-y-0 > * + * space-y-6 > * + * p-4 2xl:space-x-12 > * + * md:space-x-6 > * + * sm:space-x-3 > * + *">
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
        <a
          href={'https://modernmarket.com/'}
          target="_blank"
          className="relative w-72 h-32"
          rel="noreferrer"
        >
          <Image
            src={'/assets/sponsorLogos/MME.jpeg'}
            alt="Modern Market Eatery"
            layout="fill"
            objectFit="contain"
          />
        </a>
      </section>
    </section>
  );
}
