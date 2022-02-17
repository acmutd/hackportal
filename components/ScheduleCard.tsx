import React from 'react';

/**
 * card for each event on schedule.
 */
export default function ScheduleCard(props) {
  let Event = 'event';

  if (props.event === 0) Event = 'Sponsor';
  if (props.event === 1) Event = 'Tech Talk';
  if (props.event === 2) Event = 'Workshop';
  if (props.event === 3) Event = 'Social';

  return (
    <div className="flex md:mr-20 ml-10 mr-10 my-4">
      <div style={{ backgroundColor: props.cardColor.light }} className="rounded-l-md"></div>
      <div style={{ backgroundColor: props.cardColor.dark }} className="w-[75%] p-2 rounded-r-md">
        <h1 className="text-lg font-bold pl-2"> {props.title}</h1>
        <div className="flex even:z-20">
          <div className="text-xs p-2">
            {props.startTime} : {props.endTime}
          </div>
          <div className="text-xs p-2">{props.location}</div>
          <div className="text-xs p-2">{Event}</div>
        </div>
      </div>
    </div>
  );
}
