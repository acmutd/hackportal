import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import ErrorList from '../../components/ErrorList';
import EventDetailLink from '../../components/EventDetailLink';
import PendingQuestion from '../../components/PendingQuestion';
import SuccessCard from '../../components/SuccessCard';
import { RequestHelper } from '../../lib/request-helper';
import { useAuthContext } from '../../lib/user/AuthContext';
import { QADocument } from '../api/questions';

export function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (
    (user.permissions as string[]).includes('admin') ||
    (user.permissions as string[]).includes('organizer')
  );
}

/**
 * The main page of Admin Console.
 *
 * Route: /admin
 */
export default function Admin({ questions }: { questions: QADocument[] }) {
  const { user, isSignedIn } = useAuthContext();

  const [announcement, setAnnouncement] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const addError = (errMsg: string) => {
    setErrors((prev) => [...prev, errMsg]);
  };

  const postAnnouncement = async () => {
    try {
      await RequestHelper.post<Announcement, void>(
        '/api/announcements',
        {},
        {
          announcement,
        },
      );

      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 2000);
      setAnnouncement('');
    } catch (error) {
      addError('Failed to post announcement! Please try again later');
      console.log(error);
    }
  };

  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <AdminHeader />
      <div className="p-6">
        <ErrorList
          errors={errors}
          onClose={(idx: number) => {
            const newErrorList = [...errors];
            newErrorList.splice(idx, 1);
            setErrors(newErrorList);
          }}
        />
        {showSuccessMsg && (
          <div className="my-2">
            <SuccessCard msg="Announcement posted successfully" />
          </div>
        )}
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
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<QADocument[]>(
    `${protocol}://${context.req.headers.host}/api/questions/pending`,
    {},
  );
  return {
    props: {
      questions: data,
    },
  };
};
