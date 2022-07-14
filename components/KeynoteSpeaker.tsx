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
    <div className="flex w-[28rem] h-[9rem] md:mr-20 mr-16 my-4">
      <div
        className={`w-1/4 rounded-l-md ${
          props.idx % 3 === 0
            ? 'bg-primary'
            : props.idx % 3 === 1
            ? 'bg-secondary'
            : 'bg-complementary'
        }`}
      >
        {props.imageLink !== undefined && imageLink !== undefined && (
          <Image
            src={imageLink}
            // make sure width and height matches width and height of parent div
            width={112}
            height={144}
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div
        className={`w-3/4 p-2 rounded-r-md ${
          props.idx % 3 === 0
            ? 'bg-primaryDark'
            : props.idx % 3 === 1
            ? 'bg-secondaryDark'
            : 'bg-complementaryDark'
        }`}
      >
        <h1 className="text-lg font-bold"> {props.name}</h1>
        <div className="text-xs">{props.description}</div>
      </div>
    </div>
  );
}
