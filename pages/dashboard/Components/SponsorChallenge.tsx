import React from 'react';

/**
 * Sponsor Cards Component
 *
 * Cards for Sponsor Challenge section in hackerpack
 */

function SponsorChallenge(props) {
  return (
    <>
      <div className="border-2 border-aqua md:h-80 md:min-w-64 h-64 min-w-56 md:max-w-[16rem] max-w-[14rem] rounded-2xl md:mx-4 mx-2 my-3 flex flex-col">
        <div className="h-1/3 sponsorBackground rounded-t-xl p-4 md:text-2xl text-lg font-white">
          {props.challenge}
        </div>
        <div className="h-2/3 p-4 md:text-lg sm:text-md text-sm">{props.description}</div>
      </div>
    </>
  );
}

export default SponsorChallenge;
