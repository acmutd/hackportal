import { useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';

interface EventFormProps {
  event?: ScheduleEvent;
  onSubmitClick: (eventData: ScheduleEvent) => Promise<void>;
  formAction: 'Edit' | 'Add';
}

export default function EventForm({ event, onSubmitClick, formAction }: EventFormProps) {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [eventForm, setEventForm] = useState<typeof event>(
    formAction === 'Edit'
      ? {
          ...event,
          type: event.type || '',
        }
      : {
          description: '',
          title: '',
          page: '',
          type: '',
          track: '',
          location: '',
          speakers: [],
          startDate: new Date(),
          endDate: new Date(),
          Event: -1,
        },
  );

  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);

  useEffect(() => {
    async function getTracks() {
      try {
        const { status, data } = await RequestHelper.get<[ScheduleEvent]>(`/api/schedule`, {
          headers: {
            Authorization: user.token!,
          },
        });
        const tracks = data.map((event) => event.track);
        const uniqueTracks = new Set(tracks);
        setTracks(Array.from(uniqueTracks));
      } catch (error) {
        console.error(error);
        setErrors((prev) => [...prev, 'Unexpected error. Please try again later']);
      } finally {
        setLoading(false);
      }
    }
    getTracks();
  }, []);

  return (
    <div className="my-3 flex flex-col gap-y-4">
      <input
        value={eventForm.title}
        onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
        type="text"
        placeholder="Enter event title"
        className="border-2 p-3 rounded-lg"
      />
      <input
        value={eventForm.page}
        onChange={(e) => setEventForm((prev) => ({ ...prev, page: e.target.value }))}
        type="text"
        placeholder="Enter page"
        className="border-2 p-3 rounded-lg"
      />
      <select
        className="border-2 p-3 rounded-lg"
        value={eventForm.type}
        onChange={(e) => setEventForm((prev) => ({ ...prev, type: e.target.value }))}
      >
        <option value="" disabled>
          Choose an event type
        </option>
        <option value="social">Social Event</option>
        <option value="sponsor">Sponsor Event</option>
        <option value="workshop">Workshop Event</option>
      </select>
      <input //TODO: convert to a dropdown input that allows selecting multiple tracks, or adding a new one
        //https://react-select.com/creatable
        type="text"
        className="border-2 p-3 rounded-lg"
        placeholder={`Enter track (${tracks.map((track) => '"' + track + '"').join(', ')})`}
        value={eventForm.track}
        onChange={(e) => setEventForm((prev) => ({ ...prev, track: e.target.value }))}
      />
      <input
        value={eventForm.location}
        onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
        type="text"
        placeholder="Enter event location"
        className="border-2 p-3 rounded-lg"
      />
      <textarea
        cols={50}
        className="border-2 p-3 rounded-lg"
        value={eventForm.description}
        placeholder="Enter event description"
        onChange={(e) => {
          setEventForm((prev) => ({
            ...prev,
            description: e.target.value,
          }));
        }}
      />
      <DateTimePicker
        label="Enter start date"
        value={eventForm.startDate}
        onChange={(newValue) => setEventForm((prev) => ({ ...prev, startDate: newValue }))}
        renderInput={(params) => <TextField {...params} />}
      />
      <DateTimePicker
        label="Enter end date"
        value={eventForm.endDate}
        onChange={(newValue) => setEventForm((prev) => ({ ...prev, endDate: newValue }))}
        renderInput={(params) => <TextField {...params} />}
      />
      {eventForm.speakers.map((speaker, idx) => (
        <input
          className="border-2 p-3 rounded-lg"
          value={speaker}
          key={idx}
          type="text"
          placeholder="Enter speaker name"
          onChange={(e) =>
            setEventForm((prev) => ({
              ...prev,
              speakers: prev.speakers.map((sp, i) => {
                if (i === idx) return e.target.value as string;
                return sp;
              }),
            }))
          }
        ></input>
      ))}
      <button
        onClick={() =>
          setEventForm((prev) => ({
            ...prev,
            speakers: [...prev.speakers, ''],
          }))
        }
        className="p-3 bg-green-400 rounded-lg"
      >
        Add Speaker
      </button>
      <button
        disabled={disableSubmit}
        onClick={async () => {
          setDisableSubmit(true);
          try {
            await onSubmitClick(eventForm);
          } catch (error) {
          } finally {
            setDisableSubmit(false);
          }
        }}
        className="p-3 bg-green-400 rounded-lg"
      >
        {formAction} Event
      </button>
    </div>
  );
}
