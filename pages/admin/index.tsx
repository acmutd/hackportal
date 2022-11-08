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
    (user.permissions as string[]).includes('organizer') ||
    (user.permissions as string[]).includes('super_admin')
  );
}

/**
 * The main page of Admin Console.
 *
 * Route: /admin
 */
export default function Admin({
  questions,
  preferences,
}: {
  questions: QADocument[];
  preferences;
}) {
  const { user, isSignedIn } = useAuthContext();

  const [announcement, setAnnouncement] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [tracksEnabled, setTracksEnabled] = useState(preferences.tracks);
  const [challengesEnabled, setChallengesEnabled] = useState(preferences.challenges);

  const addError = (errMsg: string) => {
    setErrors((prev) => [...prev, errMsg]);
  };

  const postAnnouncement = async () => {
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
    return (
      <div className="background h-screen">
        <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
          Unauthorized
        </div>
      </div>
    );

  const togglePreferences = (t: string) => {
    const query = new URL(`http://localhost:3000/api/preferences`);
    query.searchParams.append('token', user.token!);
    query.searchParams.append('type', t);
    fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'POST',
    })
      .then(async (result) => {
        if (result.status !== 200) {
          return console.error(`Failed to toggle ${t}...`);
        }
        const { data } = await result.json();
        setTracksEnabled(data.tracks!);
        setChallengesEnabled(data.challenges!);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col flex-grow h-screen background text-white">
      <Head>
        <title>HackUTD IX - Admin</title>
        <meta name="description" content="HackUTD's Admin Page" />
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
        <div className="flex font-bold text-xl mb-4">
          <div
            className={`m-4 transition hover:brightness-125 cursor-pointer p-2 rounded-lg ${
              tracksEnabled ? 'bg-green-400' : 'bg-red-400'
            }`}
            onClick={() => togglePreferences('tracks')}
          >
            {tracksEnabled ? 'Tracks Enabled' : 'Tracks Disabled'}
          </div>
          <div
            className={`m-4 transition hover:brightness-125 cursor-pointer p-2 rounded-lg ${
              challengesEnabled ? 'bg-green-400' : 'bg-red-400'
            }`}
            onClick={() => togglePreferences('challenges')}
          >
            {challengesEnabled ? 'Challenges Enabled' : 'Challenges Disabled'}
          </div>
        </div>
        <h1 className="font-bold text-xl">Post Announcement: </h1>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full rounded-xl p-4 input"
          placeholder="Type your announcement here"
          rows={5}
        ></textarea>
        <div className="flex flex-row justify-end my-4">
          <button
            type="button"
            className="py-2 px-5 rounded-lg font-semibold text-xl post hover:brightness-125"
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<QADocument[]>(
    `${protocol}://${context.req.headers.host}/api/questions/pending`,
    {},
  );
  const {
    data: { data: preferences },
  } = await RequestHelper.get<any>(`${protocol}://${context.req.headers.host}/api/preferences`, {});
  return {
    props: {
      questions: data,
      preferences,
    },
  };
};
