import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { DEFAULT_EVENT_FORM_DATA } from '../../../lib/data';

interface EventFormProps {
  event?: ScheduleEvent;
  onSubmitClick: (eventData: ScheduleEvent) => Promise<void>;
  formAction: 'Edit' | 'Add';
}

export default function EventForm({ event, onSubmitClick, formAction }: EventFormProps) {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [eventForm, setEventForm] = useState<typeof event>(
    formAction === 'Edit' ? event : DEFAULT_EVENT_FORM_DATA,
  );

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
      <input
        type="text"
        className="border-2 p-3 rounded-lg"
        placeholder={`Enter track ("General", "Technical", etc.)`}
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
        className="font-bold bg-blue-200 hover:bg-blue-300 border border-blue-800 text-blue-900 rounded-lg p-3"
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
        className="font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 rounded-lg p-3"
      >
        {formAction} Event
      </button>
    </div>
  );
}
