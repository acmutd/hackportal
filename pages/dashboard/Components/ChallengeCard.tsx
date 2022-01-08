import React from 'react';

/**
 * Challenge Cards Component
 *
 * Cards for challenge section in hackercenter
 */

function ChallengeCard(props) {
  var first, second, third;
  if (props.prizes !== null && props.prizes !== undefined && props.size !== 0) {
    first = `1st place: ${props.prizes[0]}`;
    second = props.prizes[1];
    third = props.prizes[2];
  }

  return (
    <div className="border-2 border-green rounded-lg min-w-full min-h-[22rem] m-4">
      <div className="min-h-1/5 border-b-2 border-green flex justify-center items-center hackerPackShadow md:text-3xl text-2xl">
        {props.challenge}
      </div>
      <div className="sm:p-6 p-2">
        <div className=" md:text-lg text-md">{props.description}</div>
        <p className="md:text-lg text-md mt-2">Prizes</p>
        <ul className="list-disc list-inside block">
          <li>1st place: {first}</li>
          <li>2nd place: {second}</li>
          <li>3rd place: {third}</li>
        </ul>
      </div>
    </div>
  );
}

export default ChallengeCard;
