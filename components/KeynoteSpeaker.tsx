import React from 'react';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  return (
    <div className="flex w-[27rem] h-[9rem] md:mr-20 mr-16 my-4">
      <div
        style={{ backgroundColor: props.cardColor.light }}
        className="w-[25%] rounded-l-md"
      ></div>
      <div style={{ backgroundColor: props.cardColor.dark }} className="w-[75%] p-2 rounded-r-md">
        <h1 className="text-lg font-bold"> {props.name}</h1>
        <div className="text-xs">{props.description}</div>
      </div>
    </div>
  );
}
