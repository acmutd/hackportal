import { useEffect, useState } from 'react';
import 'firebase/storage';
import firebase from 'firebase';
import defaultPFP from '../public/assets/defaultPFP.jpg';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

/**
 * card for each member of the team
 */

export default function MemberCards(props) {
  const [imageLink, setImageLink] = useState();

  useEffect(() => {
    if (props.fileName !== undefined) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`member_images/${props.fileName}`)
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
    <div className="md:w-52 w-44 h-48 relative mt-24 md:mx-3 mx-2">
      {/* Profile Image */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="rounded-full object-cover"
          src={props.fileName !== undefined && imageLink !== undefined ? imageLink : defaultPFP}
          height={120}
          width={120}
          alt="Your profile"
          layout="fixed"
        />
      </div>
      {/* Main Body */}
      <div className="h-2/5 bg-[#F2F3FF]"></div>
      <div className="h-3/5 bg-[#C1C8FF] p-4">
        <h1 className="text-lg font-black">{props.name}</h1>
        <p>{props.description}</p>
        <div className="flex">
          {props.github !== undefined && (
            <a href={props.github} target="_blank" rel="noreferrer" className="mr-2">
              <GitHubIcon style={{ fontSize: 'large' }} />
            </a>
          )}
          {props.linkedin !== undefined && (
            <a href={props.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon style={{ fontSize: 'x-large' }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
