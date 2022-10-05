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
        <div className="flex justify-center mx-6">
          <a href={props.link} target="_blank" className="" rel="noreferrer">
            {props.tier === 'title' ? (
              <Image
                src={imgSrc}
                width={600}
                height={250}
                layout="fixed"
                objectFit="contain"
                alt="sponsorImage"
              />
            ) : (
              <Image
                src={imgSrc}
                width={300}
                height={200}
                layout="fixed"
                objectFit="contain"
                alt="sponsorImage"
              />
            )}
          </a>
          <br></br>
        </div>
      )}
    </>
  );
}
