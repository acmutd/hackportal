import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'firebase/storage';
import firebase from 'firebase';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  const [imageLink, setImageLink] = useState();

  var description;
  if (props.description !== undefined && props.description !== null) {
    description = props.description.replaceAll('\\n', '\n');
  }

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
      <div className="md:min-w-[15rem] md:max-w-[15rem] md:h-[15rem] min-w-[10rem] max-w-[10rem] h-[10rem] relative">
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
      <div className=" px-4">
        <h2 className="sm:text-3xl text-2xl font-medium mb-2"> {props.name}</h2>
        <h1 className="sm:text-xl text-lg mb-2">{props.subtitle}</h1>
        <p className="whitespace-pre-line 2xl:text-base md:text-base sm:text-sm text-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
