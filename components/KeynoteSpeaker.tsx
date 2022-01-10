import React from 'react';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  return (
    <div className="flex w-[27rem] h-[9rem] md:mx-20 mx-16 my-4">
      <div className="w-[25%] bg-blue-200 rounded-l-md"></div>
      <div className="w-[75%] bg-blue-300 p-2 rounded-r-md">
        <h1 className="text-lg font-bold"> {props.name}</h1>
        <div className="text-xs">{props.description}</div>
      </div>
    </div>
  );
}
