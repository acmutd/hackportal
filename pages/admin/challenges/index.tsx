import { Transition, Dialog } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import React, { Fragment } from 'react';
import ChallengeForm from '../../../components/ChallengeForm';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import Link from 'next/link';
import ChallengeList from '../../../components/ChallengeList';

interface ChallengePageProps {
  challenges_: Challenge[];
}

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function ChallengePage({ challenges_ }: ChallengePageProps) {
  const { user, isSignedIn } = useAuthContext();
  const [challenges, setChallenges] = React.useState<Challenge[]>(challenges_);
  const [currentChallengeEditIndex, setCurrentChallengeEditIndex] = React.useState<number>(-1);
  const [currentChallengeDeleteIndex, setCurrentChallengeDeleteIndex] = React.useState<number>(-1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const nextChallengeIndex = challenges_.reduce((acc, curr) => Math.max(acc, curr.rank), 0) + 1;

  const submitEditChallengeRequest = async (challengeData: Challenge) => {
    try {
      const { status, data } = await RequestHelper.post<Challenge, unknown>(
        '/api/challenges',
        {
          headers: {
            Authorization: user.token,
          },
        },
        challengeData,
      );
      if (status >= 400) throw new Error(`${status} Error`);
      alert('Challenge info updated');
      setChallenges(
        challenges.map((challenge, idx) => {
          if (idx === currentChallengeEditIndex) return challengeData;
          return challenge;
        }),
      );
    } catch (error) {
      alert('Unexpected error! Please try again');
      console.error(error);
    } finally {
      setCurrentChallengeEditIndex(-1);
    }
  };

  const submitDeleteChallengeRequest = async () => {
    try {
      await RequestHelper.delete<Challenge, unknown>(
        '/api/challenges',
        {
          headers: {
            Authorization: user.token,
          },
        },
        challenges[currentChallengeDeleteIndex],
      );
      alert('Challenge deleted successfully');
      setChallenges(challenges.filter((_, idx) => idx !== currentChallengeDeleteIndex));
      setModalOpen(false);
      setCurrentChallengeDeleteIndex(-1);
    } catch (error) {
      alert('Unexpected error. Please try again later');
      console.error(error);
    }
  };
  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="p-3">
      {currentChallengeEditIndex !== -1 ? (
        <div>
          <ChallengeForm
            challenge={challenges[currentChallengeEditIndex]}
            onSubmitClick={async (challenge) => {
              await submitEditChallengeRequest(challenge);
            }}
            formAction="Edit"
          />
          <button
            onClick={() => setCurrentChallengeEditIndex(-1)}
            className="p-3 bg-gray-200 rounded-lg"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <ChallengeList
            onChallengeEditClick={(challengeIndex) => {
              setCurrentChallengeEditIndex(challengeIndex);
            }}
            onChallengeDeleteClick={(challengeIndex) => {
              setCurrentChallengeDeleteIndex(challengeIndex);
              setModalOpen(true);
            }}
            challenges={challenges}
          />
          <div className="p-3 flex gap-x-4">
            <Link href={`/admin/challenges/add?id=${nextChallengeIndex}`}>
              <button className="p-3 bg-green-400 rounded-lg">Add New Challenge</button>
            </Link>
            <Link href="/admin">
              <button className="p-3 bg-gray-200 rounded-lg">Go Back</button>
            </Link>
          </div>
        </>
      )}
      {currentChallengeDeleteIndex !== -1 && (
        <Transition appear show={modalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setModalOpen(false);
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Delete Challenge
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the{' '}
                        {challenges[currentChallengeDeleteIndex].title} challenge?
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={async () => {
                          await submitDeleteChallengeRequest();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<Challenge[]>(
    `${protocol}://${context.req.headers.host}/api/challenges`,
    {},
  );
  return {
    props: {
      challenges_: data,
    },
  };
};
