import React from 'react';
import Image from 'next/image';

/**
 * Club Cards Component
 *
 * Cards for clubs section in hackerpack
 */

function ClubCard(props) {
  return (
    <>
      <div className="w-full flex flex-wrap">
        <div className="border-2 border-purple min-w-56 rounded-2xl md:mx-4 mx-2 my-3 flex flex-col">
          <div className="min-h-[1/5] border-b-2 border-purple rounded-t-xl p-4 md:text-2xl text-lg font-white flex items-center">
            <Image className="" src={props.path} alt="CLub Picture" width={50} height={50} />
            <p className="mx-4">{props.club}</p>
          </div>
          <div className="p-4 md:text-lg sm:text-md text-sm">{props.description}</div>
        </div>
      </div>
    </>
  );
}

export default ClubCard;
