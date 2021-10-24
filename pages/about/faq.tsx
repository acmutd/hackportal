import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';
import FaqDisclosure from '../../components/FaqDisclosure';

interface QA {
  question: string;
  answer: string;
}

/**
 * The about / faq.
 *
 * Landing: /about/faq
 */
export default function faq() {
  const qas: QA[] = [
    {
      question: 'What is a hackathon?',
      answer: 'IDK',
    },
    {
      question: 'Can I participate if I have never hacked before?',
      answer: 'Yes?',
    },
    {
      question: "What if I don't have a team?",
      answer: 'IDK',
    },
    {
      question: 'What do I need to bring?',
      answer: 'IDK',
    },
    {
      question: 'When is HackUTD VIII?',
      answer: 'IDK',
    },
    {
      question: 'When does registration open?',
      answer: 'IDK',
    },
    {
      question: 'How much does it cost?',
      answer: 'IDK',
    },
  ];

  const expandAll = () => {
    // TODO: implement logic to expand all disclosures
  };

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
        <h4 className="font-bold text-3xl">FAQ</h4>
        <button
          onClick={() => {
            expandAll();
          }}
        />
        <div className="w-full my-3 flex flex-col gap-y-4">
          {qas.map(({ question, answer }, idx) => (
            <FaqDisclosure key={idx} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
