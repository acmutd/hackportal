import { ChevronDownIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import AboutHeader from './AboutHeader';
import FaqDisclosure from './FaqDisclosure';
import { RequestHelper } from '../lib/request-helper';
import Image from 'next/image';

/**
 * The FAQ page.
 *
 * This page contains frequently asked questions for the hackathon.
 *
 * Route: /about/faq
 */
export default function FaqPage({ fetchedFaqs }: { fetchedFaqs: AnsweredQuestion[] }) {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<AnsweredQuestion[]>([]);
  const [disclosuresStatus, setDisclosureStatus] = useState<boolean[]>();

  useEffect(() => {
    setFaqs(fetchedFaqs);
    setDisclosureStatus(fetchedFaqs.map(() => false));
    setLoading(false);
  }, [fetchedFaqs]);

  /**
   *
   * Expand all FAQ disclosures
   *
   */
  const expandAll = () => {
    setDisclosureStatus(new Array(disclosuresStatus.length).fill(true));
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow relative">
      {/* <AboutHeader active="/about/faq" /> */}
      <div className="absolute top-0 right-1/2 z-0 -translate-y-1/2 -translate-x-1/2 2xl:-translate-x-full">
        <div className="relative 2xl:w-[14rem] 2xl:h-[14rem] lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem] rotate-[-30deg]">
          <Image src={'/assets/Shooting-star.png'} alt="comet" layout="fill" />
        </div>
      </div>
      <div className="md:py-12 py-6 border-t-2 border-white xl:w-9/10 w-11/12 m-auto">
        <div className="flex justify-between">
          <h1 className="lg:text-6xl md:text-4xl text-3xl font-semibold textGradient">FAQ</h1>
          <div
            className="flex flex-row items-center gap-x-2 cursor-pointer"
            onClick={() => {
              expandAll();
            }}
          >
            <div className="lg:text-xl sm:text-lg text-base text-bold">Expand All</div>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </div>
        {/* FAQ for lg-md */}
        {/* Uses different section for mobile because using 2 columns is buggy when expanding FAQs */}
        <div className="md:flex hidden justify-between my-6">
          <div className="w-[49%] my-3 ">
            {faqs.map(
              ({ question, answer }, idx) =>
                idx <= faqs.length / 2 && (
                  <FaqDisclosure
                    key={idx}
                    question={question}
                    answer={answer}
                    isOpen={disclosuresStatus[idx]}
                    idx={idx}
                    max={Math.ceil(faqs.length / 2)}
                    toggleDisclosure={() => {
                      const currDisclosure = [...disclosuresStatus];
                      currDisclosure[idx] = !currDisclosure[idx];
                      setDisclosureStatus(currDisclosure);
                    }}
                  />
                ),
            )}
          </div>
          <div className="w-[49%] my-3">
            {faqs.map(
              ({ question, answer }, idx) =>
                idx > faqs.length / 2 && (
                  <FaqDisclosure
                    key={idx}
                    question={question}
                    answer={answer}
                    isOpen={disclosuresStatus[idx]}
                    idx={idx}
                    max={Math.ceil(faqs.length / 2)}
                    toggleDisclosure={() => {
                      const currDisclosure = [...disclosuresStatus];
                      currDisclosure[idx] = !currDisclosure[idx];
                      setDisclosureStatus(currDisclosure);
                    }}
                  />
                ),
            )}
          </div>
        </div>
        {/* FAQ for mobile */}
        <div className="md:hidden">
          <div className="w-full my-3">
            {faqs.map(({ question, answer }, idx) => (
              <FaqDisclosure
                key={idx}
                question={question}
                answer={answer}
                isOpen={disclosuresStatus[idx]}
                idx={idx}
                max={0}
                toggleDisclosure={() => {
                  const currDisclosure = [...disclosuresStatus];
                  currDisclosure[idx] = !currDisclosure[idx];
                  setDisclosureStatus(currDisclosure);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 *
 * Fetch FAQ questions stored in the backend, which will be used as props by FaqPage component upon build time
 *
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<AnsweredQuestion[]>(
    `${protocol}://${context.req.headers.host}/api/questions/faq`,
    {},
  );
  return {
    props: {
      fetchedFaqs: data,
    },
  };
};
