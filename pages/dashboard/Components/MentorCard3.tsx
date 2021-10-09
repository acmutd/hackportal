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
      <div className="h-80 min-w-64 bg-pink-100 rounded-2xl mx-4 flex flex-col">
        <div className="h-2/5 p-4 text-2xl font-black">{props.room}</div>
        <div className="h-2/5 bg-pink-300 p-4 flex flex-wrap content-start">
          <p className="text-md w-full">Find help with:</p>
          <div className="bg-pink-100 w-2/5 h-1/4 rounded-full text-center text-lg flex items-center justify-center m-1">
            {props.topic1}
          </div>
          <div className="bg-pink-100 w-2/5 h-1/4 rounded-full text-center text-lg flex items-center justify-center m-1">
            {props.topic2}
          </div>
          <div className="bg-pink-100 w-2/5 h-1/4 rounded-full text-center text-lg flex items-center justify-center m-1">
            {props.topic3}
          </div>
        </div>
        <div className="h-1/5 p-4 text-2xl">{props.status}</div>
      </div>
    </>
  );
}

export default MentorCard3;
