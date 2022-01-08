import React from 'react';
import Image from 'next/image';

/**
 * Speaker Cards Component
 *
 * Cards for Speaker section
 */
function SpeakerCard(props) {
  return (
    <>
      <div id="SpeakerCards" className="hidden sm:flex flex-wrap justify-center w-full">
        <div className="min-h-[22rem] w-full mx-5 my-3 flex border-pink border-2 rounded-lg">
          <div className=" min-w-[18rem] flex flex-col items-center p-4 ">
            <Image
              className="rounded-lg border-blue border-2"
              src={props.path}
              alt={props.name}
              width={500}
              height={500}
            />
            <br></br>
            <div className="text-2xl lg:hidden inline text-[#00E0FF]">{props.name}</div>
            <p className="text-xl lg:hidden inline">{props.company}</p>
            <p className="text-xl lg:hidden inline text-center">{props.role}</p>
            <div className="text-center">
              <a
                href={props.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#B0F1FF]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
          <div className="h-1/3 p-8 flex flex-col">
            <div className="text-3xl hidden lg:inline text-[#00E0FF]">{props.name}</div>
            <h2 className="text-xl hidden lg:inline">
              {props.company} - {props.role}
            </h2>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </div>
      <div id="SpeakerCards" className="sm:hidden flex flex-wrap justify-center">
        <div className="min-h-[26rem] min-w-[18rem] mx-5 my-3 flex flex-col border-pink border-2 rounded-lg">
          <div className="h-2/5 flex justify-center items-center pt-2">
            <Image
              className="rounded-xl"
              src={props.path}
              alt={props.name}
              width={150}
              height={150}
            />
          </div>
          <div className="p-5">
            <h1>{props.name}</h1>
            <h2>
              {props.company} - {props.role}
            </h2>
            <p className="text-xs">{props.description}</p>
            <div className="text-center py-2">
              <a
                href={props.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#B0F1FF]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeakerCard;
