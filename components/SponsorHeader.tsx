import React from 'react';

export default function SponsorHeader(props) {
  return (
    <div className="flex flex-col place-items-center md:mr-20 ml-10 mr-10 my-4 ">
      <h1 className="text-8xl pl-2 decoration-1"> {props.title}</h1>
      <h2 className="m-2">
        If you would like to sponsor {props.name}, please reach out to us at {props.email}
      </h2>
    </div>
  );
}
