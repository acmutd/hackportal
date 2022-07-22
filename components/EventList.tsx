import React from 'react';

interface EventListProps {
  events: ScheduleEvent[];
  onEventEditClick: (eventIndex: number) => void;
  onEventDeleteClick: (eventIndex: number) => void;
}

export default function EventList({
  events,
  onEventEditClick,
  onEventDeleteClick,
}: EventListProps) {
  return (
    <div className="p-5">
      {events.map((event, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 border-2 my-4 rounded-xl">
          <h1 className="text-lg">{event.title}</h1>
          <div className="flex gap-4">
            <button onClick={() => onEventEditClick(idx)} className="p-3 bg-green-400 rounded-lg">
              Edit Event
            </button>
            <button onClick={() => onEventDeleteClick(idx)} className="p-3 bg-red-400 rounded-lg">
              Delete Event
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
