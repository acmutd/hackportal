import { ChevronDownIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import FaqDisclosure from './FaqDisclosure';
import { RequestHelper } from '../../lib/request-helper';

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
        <title>HackPortal</title>
        <meta name="description" content="HackPortal's Frequently Asked Questions" />
      </Head>
      {/* <AboutHeader active="/about/faq" /> */}
      <h4 className="md:text-8xl text-2xl text-center excelsior-script">
        Frequently Asked Questions
      </h4>
      <div className="border-y-2 p-[1px] border-[#111A31] w-3/5 mx-auto -mt-3"></div>
      <div className="flex flex-row justify-end items-center py-2 w-3/5 mx-auto">
        <div className="flex flex-row items-center gap-x-2">
          <button
            onClick={() => {
              if (disclosuresStatus.every((status) => status)) {
                closeAll();
              } else {
                expandAll();
              }
            }}
            className="font-bold"
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
      <div className="w-1/3 mx-auto">
        <div className="w-full my-3">
          {faqs.map(({ question, answer }, idx) => (
            <FaqDisclosure
              key={idx}
              question={question}
              answer={answer}
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
