import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

interface EventFormProps {
  event?: ScheduleEvent;
  onSubmitClick: (eventData: ScheduleEvent) => Promise<void>;
}

export default function EventForm({ event, onSubmitClick }: EventFormProps) {
  const [eventForm, setEventForm] = useState<typeof event>(
    event || {
      description: '',
      title: '',
      page: '',
      location: '',
      speakers: [],
      startDate: new Date(),
      endDate: new Date(),
      Event: -1,
    },
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
        placeholder="Enter page?"
        className="border-2 p-3 rounded-lg"
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
      <button
        onClick={async () => {
          await onSubmitClick(eventForm);
        }}
        className="p-3 bg-green-400 rounded-lg"
      >
        Edit Event
      </button>
    </div>
  );
}
