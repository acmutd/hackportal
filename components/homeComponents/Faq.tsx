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
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal</title>
        <meta name="description" content="HackPortal's Frequently Asked Questions" />
      </Head>
      {/* <AboutHeader active="/about/faq" /> */}
      <div className="top-6">
        <div className="flex flex-row justify-between items-center py-2">
          <h4 className="font-bold md:text-4xl text-2xl my-4 text-complementary">FAQ</h4>
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
        {/* FAQ for lg-md */}
        {/* Uses different section for mobile because using 2 columns is buggy when expanding FAQs */}
        <div className="md:flex hidden justify-between p-6">
          <div className="w-[49%] my-3 space-y-4 > * + *">
            {faqs.map(
              ({ question, answer }, idx) =>
                idx % 2 == 0 && (
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
                ),
            )}
          </div>
          <div className="w-[49%] my-3 space-y-4 > * + *">
            {faqs.map(
              ({ question, answer }, idx) =>
                idx % 2 != 0 && (
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
                ),
            )}
          </div>
        </div>
        {/* FAQ for mobile */}
        <div className="md:hidden">
          <div className="w-full my-3 space-y-4 > * + *">
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
