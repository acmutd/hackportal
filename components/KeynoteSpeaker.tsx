import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'firebase/storage';
import firebase from 'firebase';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  const [imageLink, setImageLink] = useState();

  useEffect(() => {
    if (props.imageLink !== undefined) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`speaker_images/${props.imageLink}`)
        .getDownloadURL()
        .then((url) => {
          setImageLink(url);
        })
        .catch((error) => {
          console.error('Could not find matching image file');
        });
    }
  }, []);

  return (
    <div className="group flex flex-col items-center sm:w-60 sm:h-80 w-40 h-60 rounded-xl shadow-xl relative transition duration-500 ease-in-out overflow-hidden bg-indigo-100">
      <div className="rounded-t-sm">
        {props.imageLink !== undefined && imageLink !== undefined && (
          <Image
            src={imageLink}
            // make sure width and height matches width and height of parent div
            width={250}
            height={250}
            alt=""
          />
        )}
      </div>
      <div className=" flex-col items-center justify-center  sm:w-60 sm:h-80 w-40 h-60  absolute  translate-y-60 group-hover:translate-y-0 transition duration-500 ease-in-out overflow-hidden ">
        <div className="rounded-b-sm bg-indigo-300  p-2 font-bold ">
          <h1 className="text-lg "> {props.name}</h1>
          {/* show description on hover  by sliding up */}
          <div className="opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out  bg-indigo-300 sm:h-80  h-60">
            <p className="text-xs">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
