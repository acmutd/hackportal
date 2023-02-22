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
    <div className="group flex flex-col items-center w-72 h-72 sm:h-80 rounded-xl shadow-xl relative transition duration-500 ease-in-out overflow-hidden bg-secondary text-white">
      <div className="rounded-t-sm">
        {props.imageLink !== undefined && imageLink !== undefined && (
          <Image
            src={imageLink}
            // make sure width and height matches width and height of parent div
            width={350}
            height={350}
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div className="flex-col items-center justify-center w-full h-72 sm:h-80 absolute translate-y-56 sm:translate-y-64 group-hover:translate-y-0 transition duration-500 ease-in-out overflow-hidden">
        <div className="rounded-b-sm bg-primary p-2 font-semibold">
          <h1 className="text-lg font-medium">{props.name}</h1>
          <h1 className="text-xs font-normal">{props.subtitle}</h1>
          {/* show description on hover by sliding up */}
          <div className="opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out bg-primary sm:h-72 h-80 font-normal overflow-y-scroll">
            <p className="text-[13px] pt-2 pb-24 sm:pb-10">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
