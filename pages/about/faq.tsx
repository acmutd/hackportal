import { ChevronUpIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import AboutHeader from '../../components/AboutHeader';
import FaqDisclosure from '../../components/FaqDisclosure';
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
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - FAQ</title>
        <meta name="description" content="HackPortal's Frequently Asked Questions" />
      </Head>
      <AboutHeader active="/about/faq" />
      <div className="top-6 p-4">
        <div className="flex flex-row justify-between items-center border-b-2 border-black py-2">
          <h4 className="font-bold text-3xl">FAQ</h4>
          <div className="flex flex-row items-center gap-x-2">
            <button
              onClick={() => {
                expandAll();
              }}
              className="font-bold"
            >
              Expand All
            </button>
            <ChevronUpIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full my-3 flex flex-col gap-y-4">
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
