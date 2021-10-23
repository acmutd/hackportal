import React from 'react';

/**
 * Mentor Cards Component
 *
 * Cards for Mentor Center section in hack center
 * Card contains 1 topic
 */

function MentorCard1(props) {
  return (
    <>
      <div className="md:h-80 md:min-w-64 h-64 min-w-56 bg-pink-100 rounded-2xl md:mx-4 mx-2 flex flex-col">
        <div className="h-2/5 p-4 md:text-2xl text-lg font-black">{props.room}</div>
        <div className="h-2/5 bg-pink-300 p-4 flex flex-wrap content-start">
          <p className="text-md w-full">Find help with:</p>
          <div className="bg-pink-100 w-full h-1/4 rounded-full text-center md:text-lg text-md flex items-center justify-center m-1">
            {props.topic}
          </div>
        </div>
        <div className="h-1/5 p-4 md:text-2xl text-lg">{props.status}</div>
      </div>
    </>
  );
}

export default MentorCard1;
