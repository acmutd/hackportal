import { Transition, Dialog } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import React, { Fragment } from 'react';
import ChallengeForm from '../../../components/adminComponents/challengeComponents/ChallengeForm';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import Link from 'next/link';
import ChallengeList from '../../../components/adminComponents/challengeComponents/ChallengeList';
import { arrayMove } from '@dnd-kit/sortable';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface ChallengePageProps {
  challenges_: Challenge[];
}

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function ChallengePage({ challenges_ }: ChallengePageProps) {
  const { user, isSignedIn } = useAuthContext();
  const [challenges, setChallenges] = React.useState<SortableObject<Challenge>[]>(
    challenges_.sort((a, b) => a.rank - b.rank).map((obj, i) => ({ ...obj, id: i.toString() })),
  );
  const [currentChallengeEditIndex, setCurrentChallengeEditIndex] = React.useState<number>(-1);
  const [currentChallengeDeleteIndex, setCurrentChallengeDeleteIndex] = React.useState<number>(-1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const nextChallengeIndex = challenges_.reduce((acc, curr) => Math.max(acc, curr.rank), 0) + 1;

  const submitEditChallengeRequest = async (challengeDataWrapper: SortableObject<Challenge>) => {
    const { id, ...challengeData } = challengeDataWrapper;
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
          if (idx === currentChallengeEditIndex) return challengeDataWrapper;
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

  const submitReorderChallengesRequest = async () => {
    try {
      await RequestHelper.post<Challenge[], void>(
        '/api/challenges/reorder',
        {
          headers: {
            Authorization: user.token,
            'Content-Type': 'application/json',
          },
        },
        challenges.map(({ id, ...challenge }) => challenge),
      );
      alert('Reorder request completed');
      setChallenges((prev) => prev.map((obj, idx) => ({ ...obj, rank: idx })));
    } catch (error) {
      alert('Unexpected error! Please check console log for more info :(');
      console.log(error);
    }
  };

  const submitDeleteChallengeRequest = async () => {
    const { id, ...challengeData } = challenges[currentChallengeDeleteIndex];
    try {
      await RequestHelper.delete<Challenge, unknown>(
        '/api/challenges',
        {
          headers: {
            Authorization: user.token,
          },
        },
        challengeData,
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

  const orderChanged = challenges.filter((obj, idx) => obj.rank !== idx).length !== 0;

  return (
    <div className="p-3">
      {currentChallengeEditIndex !== -1 ? (
        <div>
          <ChallengeForm
            challenge={challenges[currentChallengeEditIndex]}
            onSubmitClick={async (challenge) => {
              await submitEditChallengeRequest({
                id: currentChallengeEditIndex.toString(),
                ...challenge,
              });
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
          <div className="mt-4">
            <Link href="/admin" passHref>
              <div className="cursor-pointer items-center inline-flex text-primaryDark font-bold md:text-lg text-base">
                <ChevronLeftIcon />
                return to event dashboard
              </div>
            </Link>
          </div>
          <ChallengeList
            onChallengeEditClick={(challengeIndex) => {
              setCurrentChallengeEditIndex(challengeIndex);
            }}
            onChallengeDeleteClick={(challengeIndex) => {
              setCurrentChallengeDeleteIndex(challengeIndex);
              setModalOpen(true);
            }}
            challenges={challenges}
            onUpdateOrder={(oldIndex, newIndex) => {
              setChallenges((prev) => arrayMove(prev, oldIndex, newIndex));
            }}
          />
          <div className="p-3 flex gap-x-4">
            <Link href={`/admin/challenges/add?id=${nextChallengeIndex}`}>
              <button className="font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 rounded-lg p-3">
                Add New Challenge
              </button>
            </Link>
            {orderChanged && (
              <button
                onClick={async () => {
                  await submitReorderChallengesRequest();
                }}
                className="p-3 bg-green-400 rounded-lg"
              >
                Update Challenge Ranking
              </button>
            )}
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
