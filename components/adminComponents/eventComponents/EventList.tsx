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
          <h1 className="md:text-lg text-base">{event.title}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => onEventEditClick(idx)}
              className="font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 rounded-lg md:p-3 p-1 px-2 md:text-base text-sm"
            >
              Edit Event
            </button>
            <button
              onClick={() => onEventDeleteClick(idx)}
              className="font-bold text-red-800 bg-red-100 hover:bg-red-200 border border-red-400 rounded-lg md:p-3 p-1 px-2 md:text-base text-sm"
            >
              Delete Event
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
