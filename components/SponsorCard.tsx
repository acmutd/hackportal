import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import LoadIcon from './LoadIcon';
import Image from 'next/image';

interface SponsorCardProps {
  link: string;
  reference: string;
  tier: string;
}

/**
 * Keynote Speaker card for landing page.
 */
export default function SponsorCard(props: SponsorCardProps) {
  const [imgSrc, setImgSrc] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.reference !== undefined) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`sponsor_images/${props.reference}`)
        .getDownloadURL()
        .then((url) => {
          setImgSrc(url);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Could not find matching image file');
        });
    }
  }, []);

  if (loading) return <LoadIcon width={100} height={100} />;

  return (
    <>
      {imgSrc !== undefined && (
        <div className="flex justify-center mx-6 mb-2">
          {props.tier === 'title' ? (
            <a
              href={props.link}
              target="_blank"
              className="relative lg:w-[50rem] lg:h-[20rem] md:w-[38rem] md:h-[15rem] sm:w-[35rem] sm:h-[13rem] w-[23rem] h-[9rem]"
              rel="noreferrer"
            >
              <Image src={imgSrc} layout="fill" alt="sponsorImage" />
            </a>
          ) : (
            <a
              href={props.link}
              target="_blank"
              className="relative lg:w-[20rem] lg:h-[10rem] md:w-[18rem] md:h-[8rem] w-[15rem] h-[5rem]"
              rel="noreferrer"
            >
              <Image src={imgSrc} layout="fill" alt="sponsorImage" objectFit="contain" />
            </a>
          )}
          <br></br>
        </div>
      )}
    </>
  );
}
