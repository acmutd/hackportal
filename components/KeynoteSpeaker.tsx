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
    <div className="flex 3xl:w-[32%] lg:w-[48%] w-full my-4">
      <div className="md:min-w-[15rem] md:max-w-[15rem] md:h-[20rem] min-w-[10rem] max-w-[10rem] h-[15rem] relative">
        {props.imageLink !== undefined && imageLink !== undefined && (
          <Image
            src={imageLink}
            // make sure width and height matches width and height of parent div
            layout="fill"
            objectFit="fill"
            alt=""
          />
        )}
      </div>
      <div className=" p-2">
        <h1 className="sm:text-4xl text-2xl font-bold"> {props.name}</h1>
        <div className="2xl:text-base md:text-base sm:text-sm text-xs">{props.description}</div>
      </div>
    </div>
  );
}
