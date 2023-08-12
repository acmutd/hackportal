import { ChevronDownIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import FaqDisclosure from './FaqDisclosure';
import { RequestHelper } from '../../lib/request-helper';
import Link from 'next/link';

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
    setDisclosureStatus(fetchedFaqs.map(() => false));
    setLoading(false);
  }, [fetchedFaqs]);

  useEffect(() => {
    setFaqs(fetchedFaqs.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
  }, []);

  /**
   *
   * Expand all FAQ disclosures
   *
   */
  const expandAll = () => {
    setDisclosureStatus(new Array(disclosuresStatus.length).fill(true));
  };

  const closeAll = () => {
    setDisclosureStatus(new Array(disclosuresStatus.length).fill(false));
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="text-[#111A31]">
      <Head>
        <title>HackUTD X</title>
        <meta name="description" content="HackUTD X's Frequently Asked Questions" />
      </Head>
      {/* <AboutHeader active="/about/faq" /> */}
      <h4 className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl text-center excelsior-script">
        Frequently Asked Questions
      </h4>
      <div className="border-y-2 p-[1px] border-[#111A31] xl:w-3/5 sm:w-4/5 w-5/6 mx-auto lg:-mt-3 sm:-mt-2 -mt-1"></div>
      <div className="flex flex-row justify-end items-center py-2 xl:w-3/5 sm:w-4/5 w-5/6 mx-auto">
        <div className="flex flex-row items-center gap-x-2">
          <button
            onClick={() => {
              if (disclosuresStatus.every((status) => status)) {
                closeAll();
              } else {
                expandAll();
              }
            }}
            className="font-bold md:text-base text-sm"
          >
            {disclosuresStatus.every((status) => status) ? 'Close All' : 'Expand All'}
          </button>
          <ChevronDownIcon
            className={`${
              disclosuresStatus.every((status) => status)
                ? 'transform rotate-180 transition duration-500 ease-in-out'
                : 'transition duration-500 ease-in-out'
            } w-5 h-5`}
          />
        </div>
      </div>
      <div className="2xl:2-2/5 lg:w-1/3 md:w-2/5 w-3/5 mx-auto">
        <div className="w-full my-3">
          {faqs.map(({ question, answer, rank }, idx) => (
            <FaqDisclosure
              key={idx}
              question={question}
              answer={
                rank === 8 ? (
                  <span>
                    Your project must be built entirely over the course of the weekend. No previous
                    projects or code may be used. Have fun! Your behavior at this event is subject
                    to the{' '}
                    <Link href="http://hackp.ac/coc">
                      <span className="underline text-primaryDark cursor-pointer">
                        {' '}
                        MLH Code of Conduct
                      </span>
                    </Link>{' '}
                    as well as any applicable UT Dallas guidelines.
                  </span>
                ) : (
                  answer
                )
              }
              isOpen={disclosuresStatus[idx]}
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
