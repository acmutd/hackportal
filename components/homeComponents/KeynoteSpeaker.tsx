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
    <div className="border-2 border-[#111A31] p-[2px]">
      <div className="group flex flex-col items-center w-72 h-72 sm:h-80 shadow-xl relative transition duration-500 ease-in-out overflow-hidden bg-[#9A4343] text-[#111A31] border-2 border-[#111A31]">
        <div className="">
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
          <div className="about-bg p-2 text-center hoefler-text">
            <h1 className="text-base">{props.name}</h1>
            <h1 className="text-base">{props.subtitle}</h1>
            {/* show description on hover by sliding up */}
            <div className="opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out about-bg sm:h-72 h-80 font-normal overflow-y-scroll">
              <p className="text-[13px] pt-2 pb-24 sm:pb-10">{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
