import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
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
import { EditorState, convertToRaw, RawDraftContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps } from 'react-draft-wysiwyg';
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const roleTypes = [
    { type: 'hacker', name: 'Hacker' },
    { type: 'mentor', name: 'Mentor' },
    { type: 'admin', name: 'Event Administrator' },
    { type: 'sponsor', name: 'Event Sponsor' },
    { type: 'organizer', name: 'Event Organizer' },
    { type: 'super_admin', name: 'Super Admin' },
    { type: 'judge', name: 'Judge' },
  ];
  const [checkedState, setCheckedState] = useState(new Array(roleTypes.length).fill(false));
  const updateChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckedState(updatedCheckedState);
  };

  const getCheckedRoles = () => {
    const checked_roles: string[] = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        checked_roles.push(roleTypes[i].type);
      }
    }
    return checked_roles;
  };

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

  const sendEmail = async () => {
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have permission to perform this functionality');
      return;
    }
    const rawContentState: RawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const formatted_text: string = draftToHtml(rawContentState);
    try {
      await RequestHelper.post<Email, void>(
        '/api/email',
        {
          headers: {
            Authorization: user.token,
          },
        },
        {
          subject: 'Test Email',
          formatted_text,
          user_types: getCheckedRoles(),
        },
      );

      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 2000);
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      addError('Failed to send email! Please try again later');
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
      {user.permissions.includes('super_admin') && (
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
      )}

      {user.permissions.includes('super_admin') && (
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
              <SuccessCard msg="Emails sent successfully" />
            </div>
          )}
          <h1 className="font-bold text-xl">Send Email</h1>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorClassName="w-full rounded-xl p-4"
            editorStyle={{ backgroundColor: '#F2F3FF' }}
            toolbar={{
              image: { uploadEnabled: false },
            }}
          />
          <div className="flex flex-row gap-x-2 items-center my-4">
            <ul>
              {roleTypes.map(({ type, name }, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={name}
                      value={type}
                      checked={checkedState[index]}
                      onChange={() => updateChecked(index)}
                    />
                    <label htmlFor={`checkbox-${index}`}>{name}</label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-row justify-end my-4">
            <button
              type="button"
              className="py-2 px-5 rounded-lg font-bold"
              style={{ backgroundColor: '#9CA6FF', color: 'black' }}
              onClick={() => {
                sendEmail();
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

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

      {user.permissions[0] === 'super_admin' && (
        <div className="p-6">
          <h1 className="font-bold text-xl">Event Details: </h1>
          <div className="p-4">
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
