import React from 'react';

/**
 * Mentor Cards Component
 *
 * Cards for Mentor Center section in hack center
 * Card contains 3 topics
 */

function MentorCard3(props) {
  return (
    <>
      <div className="flex flex-col md:h-80 md:min-w-64 h-64 min-w-56 md:mx-4 mx-2 bg-pink-100 rounded-2xl">
        <div className="h-2/5 p-4 md:text-2xl text-lg font-black">{props.room}</div>
        <div className="flex flex-wrap content-start h-2/5 bg-pink-300 p-4">
          <p className="text-md w-full">Find help with:</p>
          <div className="flex items-center justify-center w-2/5 h-1/4 rounded-full text-center md:text-lg text-md m-1 bg-pink-100">
            {props.topic1}
          </div>
          <div className="flex items-center justify-center w-2/5 h-1/4 rounded-full text-center md:text-lg text-md m-1 bg-pink-100">
            {props.topic2}
          </div>
          <div className="flex items-center justify-center w-2/5 h-1/4 rounded-full text-center md:text-lg text-md m-1 bg-pink-100">
            {props.topic3}
          </div>
        </div>
        <div className="h-1/5 p-4 md:text-2xl text-lg">{props.status}</div>
      </div>
    </>
  );
}

export default MentorCard3;
