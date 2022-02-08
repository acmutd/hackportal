import React from 'react';

/**
 * card for each event on schedule.
 */
export default function ScheduleCard(props) {
  return (
    <div className="flex w-[27rem] h-[9rem] md:mr-20 mr-16 my-4">
      <h1>{props.title}</h1>
      <div></div>
      <div>{props.location}</div>
    </div>
  );
}
