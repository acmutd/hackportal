import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import EventDetailLink from '../../components/EventDetailLink';
import PendingQuestion from '../../components/PendingQuestion';
import { RequestHelper } from '../../lib/request-helper';
import { useAuthContext } from '../../lib/user/AuthContext';
import { QADocument } from '../api/questions';

export function isAuthorized(user): boolean {
  return user.permissions.includes('admin') || user.permissions.includes('organizer');
}

/**
 * The about page.
 *
 * Landing: /about
 */
export default function Admin({ questions }: { questions: QADocument[] }) {
  const { user, isSignedIn } = useAuthContext();

  const [announcement, setAnnouncement] = useState('');

  const postAnnouncement = () => {
    console.log(`Posted announcement: ${announcement}`);
    setAnnouncement('');
  };

  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="p-4">
        <AdminHeader />
      </section>
      <div className="p-6">
        <h1 className="font-bold text-xl">Post Announcement: </h1>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full rounded-xl p-4"
          style={{ backgroundColor: '#F2F3FF' }}
          placeholder="Type your announcement here"
          rows={5}
        ></textarea>
        <div className="flex flex-row justify-end my-4">
          <button
            type="button"
            className="py-2 px-5 rounded-lg font-bold"
            style={{ backgroundColor: '#9CA6FF', color: 'black' }}
            onClick={() => {
              postAnnouncement();
            }}
          >
            Post
          </button>
        </div>
      </div>
      <div className="p-6">
        <h1 className="font-bold text-xl">Pending Questions: </h1>
        {questions.map((question, idx) => (
          <Link key={idx} passHref href={`/admin/resolve/${question.id}`}>
            <a>
              <PendingQuestion key={idx} question={question.question} />
            </a>
          </Link>
        ))}
      </div>
      <div className="p-6">
        <h1 className="font-bold text-xl">Event Details: </h1>
        <div className="p-4">
          <EventDetailLink title="Add Workshop" />
          <EventDetailLink title="Add Meal Option" />
          <EventDetailLink title="Add Sponsor" />
          <EventDetailLink title="Edit Event Detail" />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context.req.headers.referer);
  const protocol = context.req.headers.referer.split('://')[0];
  const questions = await RequestHelper.get<QADocument[]>(
    `${protocol}://${context.req.headers.host}/api/questions/pending`,
    {},
  );
  return {
    props: {
      questions,
    },
  };
};
