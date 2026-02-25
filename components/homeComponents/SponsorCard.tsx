import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import LoadIcon from '../LoadIcon';
import Image from 'next/image';

interface SponsorCardProps {
  link: string;
  reference: string;
}

/**
 * Keynote Speaker card for landing page.
 */
export default function SponsorCard(props: SponsorCardProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>();
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
          console.error('Could not find matching image file:', props.reference, error);
        });
    }
  }, [props.reference]);

  if (loading) return <LoadIcon width={100} height={100} />;

  return (
    <>
      {imgSrc !== undefined && (
        <div className="flex justify-center sponsor-card transition-all duration-300">
          <a href={props.link} target="_blank" className="block m-4" rel="noreferrer">
            <div className="bg-white rounded-xl p-6 w-[280px] h-[160px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                alt={`Sponsor Image ${props.reference}`}
                src={imgSrc}
                width={240}
                height={120}
                layout="fixed"
                objectFit="contain"
              />
            </div>
          </a>
        </div>
      )}
    </>
  );
}
