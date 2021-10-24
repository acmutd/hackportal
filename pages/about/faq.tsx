import { ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import AboutHeader from '../../components/AboutHeader';
import FaqDisclosure from '../../components/FaqDisclosure';
import { fakeFaqs } from '../../lib/data';

/**
 * The about / faq.
 *
 * Landing: /about/faq
 */
export default function Faq() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<AnsweredQuestion[]>([]);
  const [disclosuresStatus, setDisclosureStatus] = useState<boolean[]>();

  const getFaqs = () => {
    /* TODO: Work out on how these data will be stored in the backend and replace this code
    with logic to fetch real data from backend */
    return fakeFaqs;
  };

  useEffect(() => {
    const fetchedFaqs = getFaqs();
    setFaqs(fetchedFaqs);
    setDisclosureStatus(fetchedFaqs.map(() => false));
    setLoading(false);
  }, []);

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
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Frequently Asked Questions" />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader active="/about/faq" />
      </section>
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
