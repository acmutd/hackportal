import { useRouter } from 'next/router';
import EventForm from '../../../components/EventForm';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import Link from 'next/link';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function AddEventPage() {
  const { user, isSignedIn } = useAuthContext();
  const router = useRouter();

  const submitAddEventRequest = async (eventData: ScheduleEvent) => {
    try {
      await RequestHelper.post<ScheduleEvent, ScheduleEvent>(
        '/api/schedule',
        {
          headers: {
            Authorization: user.token,
          },
        },
        {
          ...eventData,
          Event: parseInt(router.query.id as string),
        },
      );
      alert('Event created');
      router.push('/admin/events');
    } catch (error) {
      alert('Unexpected error! Please try again');
      console.error(error);
    }
  };

  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="p-3">
      <div>
        <EventForm
          onSubmitClick={async (event) => {
            await submitAddEventRequest(event);
          }}
          formAction="Add"
        />
        <Link href="/admin/events">
          <button className="p-3 bg-gray-200 rounded-lg">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
