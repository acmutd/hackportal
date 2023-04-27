import { Transition, Dialog } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import React, { Fragment } from 'react';
import EventForm from '../../../components/adminComponents/eventComponents/EventForm';
import EventList from '../../../components/adminComponents/eventComponents/EventList';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import Link from 'next/link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface EventPageProps {
  events_: ScheduleEvent[];
}

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function EventPage({ events_ }: EventPageProps) {
  const { user, isSignedIn } = useAuthContext();
  const [events, setEvents] = React.useState<ScheduleEvent[]>(events_);
  const [currentEventEditIndex, setCurrentEventEditIndex] = React.useState<number>(-1);
  const [currentEventDeleteIndex, setCurrentEventDeleteIndex] = React.useState<number>(-1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const nextEventIndex = events_.reduce((acc, curr) => Math.max(acc, curr.Event), 0) + 1;

  const submitEditEventRequest = async (eventData: ScheduleEvent) => {
    if (eventData.startDate > eventData.endDate) {
      return;
    }
    try {
      const { status, data } = await RequestHelper.post<ScheduleEvent, unknown>(
        '/api/schedule',
        {
          headers: {
            Authorization: user.token,
          },
        },
        eventData,
      );
      if (status === 403) {
        alert('You do not have the permission to peform this functionality');
        return;
      }
      if (status >= 400) throw new Error(`${status} Error`);
      alert('Event info updated');
      setEvents(
        events.map((event, idx) => {
          if (idx === currentEventEditIndex) return eventData;
          return event;
        }),
      );
    } catch (error) {
      alert('Unexpected error! Please try again');
      console.error(error);
    } finally {
      setCurrentEventEditIndex(-1);
    }
  };

  const submitDeleteEventRequest = async () => {
    try {
      const { status } = await RequestHelper.delete<ScheduleEvent, unknown>(
        '/api/schedule',
        {
          headers: {
            Authorization: user.token,
          },
        },
        events[currentEventDeleteIndex],
      );
      if (status === 403) {
        alert('You do not have the permission to peform this functionality');
        return;
      }
      if (status >= 400) throw new Error(`${status} Error`);

      alert('Event deleted successfully');
      setEvents(events.filter((_, idx) => idx !== currentEventDeleteIndex));
      setModalOpen(false);
      setCurrentEventDeleteIndex(-1);
    } catch (error) {
      alert('Unexpected error. Please try again later');
      console.error(error);
    }
  };
  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="2xl:px-36 md:px-16">
      {currentEventEditIndex !== -1 ? (
        <div>
          <EventForm
            event={events[currentEventEditIndex]}
            onSubmitClick={async (event) => {
              await submitEditEventRequest(event);
            }}
            formAction="Edit"
          />
          <button
            onClick={() => setCurrentEventEditIndex(-1)}
            className="font-bold bg-gray-200 hover:bg-gray-300 border border-gray-500 rounded-lg md:p-3 p-1 px-2"
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
          <EventList
            onEventEditClick={(eventIndex) => {
              setCurrentEventEditIndex(eventIndex);
            }}
            onEventDeleteClick={(eventIndex) => {
              setCurrentEventDeleteIndex(eventIndex);
              setModalOpen(true);
            }}
            events={events}
          />
          <div className="p-3">
            <Link href={`/admin/events/add?id=${nextEventIndex}`}>
              <button className="font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 rounded-lg md:p-3 p-1 px-2">
                Add New Event
              </button>
            </Link>
          </div>
        </>
      )}
      {currentEventDeleteIndex !== -1 && (
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
                      Delete Event
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the {events[currentEventDeleteIndex].title}{' '}
                        event?
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-red-800 bg-red-100 hover:bg-red-200 border border-red-400"
                        onClick={async () => {
                          await submitDeleteEventRequest();
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
  const { data } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule`,
    {},
  );
  return {
    props: {
      events_: data,
    },
  };
};
