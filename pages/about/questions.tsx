import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';
import AnsweredQuestion from '../../components/AnsweredQuestion';
import PendingQuestion from '../../components/PendingQuestion';

/**
 * The about / questions.
 *
 * Landing: /questions
 */
export default function questions() {
  const pendingQuestions = ['When will my questions be answered?'];
  const answeredQuestion: Array<{
    question: string;
    answer: string;
  }> = [
    {
      question: 'Will my question be answered?',
      answer: 'YES!',
    },
    {
      question: 'Another test question',
      answer: 'This is another test answer',
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Quesiton and Answer Page " />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader active="/about/questions" />
      </section>
      <div className="top-6 p-4 flex flex-col gap-y-3">
        <h4 className="font-bold text-3xl">Ask the organizers a question!</h4>
        <div id="submit-question">
          <textarea
            className="w-full rounded-xl p-4"
            rows={10}
            style={{ backgroundColor: '#F2F3FF' }}
            placeholder="Type your question here"
          ></textarea>
          <div className="flex flex-row justify-end my-4">
            <button
              type="button"
              className="p-2 rounded-lg"
              style={{ backgroundColor: '#9CA6FF', color: 'black' }}
            >
              Submit Question
            </button>
          </div>
        </div>

        <div id="pending-question">
          <h4 className="font-bold text-2xl">My Pending Question</h4>
          {pendingQuestions.map((question, idx) => (
            <PendingQuestion key={idx} question={question} />
          ))}
        </div>

        <div id="answered-question" className="my-4">
          <h4 className="font-bold text-2xl">My Answered Question</h4>
          {answeredQuestion.map(({ question, answer }, idx) => (
            <AnsweredQuestion
              key={idx}
              question={question}
              answer={answer}
              colorCode="#D8F8FF"
              iconColorCode="#00E0FF"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
