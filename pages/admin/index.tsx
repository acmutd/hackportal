import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import AdminHeader from '../../components/adminComponents/AdminHeader';
import ErrorList from '../../components/ErrorList';
import EventDetailLink from '../../components/adminComponents/eventComponents/EventDetailLink';
import PendingQuestion from '../../components/dashboardComponents/PendingQuestion';
import SuccessCard from '../../components/adminComponents/SuccessCard';
import { RequestHelper } from '../../lib/request-helper';
import { useAuthContext } from '../../lib/user/AuthContext';
import { QADocument } from '../api/questions';

export function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (
    (user.permissions as string[]).includes('admin') ||
    (user.permissions as string[]).includes('organizer') ||
    (user.permissions as string[]).includes('super_admin')
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
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have permission to perform this functionality');
      return;
    }
    try {
      await RequestHelper.post<Announcement, void>(
        '/api/announcements',
        {
          headers: {
            Authorization: user.token,
          },
        },
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
    return <div className="text-2xl font-black text-center bg-blue-200">Unauthorized</div>;

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section className="p-4">
        <AdminHeader />
      </section>
      {user.permissions.includes('super_admin') && (
        <div className="2xl:px-32 md:px-16 px-6">
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
          <h1 className="font-bold lg:text-3xl text-2xl text-complementary mb-4">
            Post Announcement:{' '}
          </h1>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full rounded-xl p-4 bg-secondary border-transparent focus:border-primaryDark caret-primaryDark"
            placeholder="Type your announcement here"
            rows={5}
          ></textarea>
          <div className="flex flex-row justify-end my-4">
            <button
              type="button"
              className="py-1 px-7 rounded-lg font-medium hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
              onClick={() => {
                postAnnouncement();
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
      <div className="2xl:px-32 md:px-16 px-6">
        <h1 className="font-bold text-xl text-complementary">Pending Questions: </h1>
        {questions.map((question, idx) => (
          <Link key={idx} passHref href={`/admin/resolve/${question.id}`}>
            <a>
              <PendingQuestion key={idx} question={question.question} />
            </a>
          </Link>
        ))}
      </div>

      {user.permissions[0] === 'super_admin' && (
        <div className="2xl:px-32 md:px-16 px-6 mt-8">
          <h1 className="font-bold text-xl text-complementary">Event Details: </h1>
          <div className="py-2">
            <EventDetailLink title="View Events" href="/admin/events" />
            <EventDetailLink title="View Challenges" href="/admin/challenges" />
          </div>
        </div>
      )}
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
