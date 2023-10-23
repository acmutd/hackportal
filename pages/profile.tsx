import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useAuthContext } from '../lib/user/AuthContext';
import LoadIcon from '../components/LoadIcon';
import { getFileExtension } from '../lib/util';
import QRCode from '../components/dashboardComponents/QRCode';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../lib/request-helper';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage({ applicationDecisions }) {
  const router = useRouter();
  const { isSignedIn, hasProfile, user, profile } = useAuthContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const resumeRef = useRef(null);

  const handleResumeUpload = async (profile) => {
    if (resumeRef.current.files.length !== 1) return alert('Must submit one file');

    const fileExtension = getFileExtension(resumeRef.current.files[0].name);
    const acceptedFileExtensions = [
      '.pdf',
      '.doc',
      '.docx',
      '.png',
      '.jpg',
      '.jpeg',
      '.txt',
      '.tex',
      '.rtf',
    ];

    if (!acceptedFileExtensions.includes(fileExtension))
      return alert(`Accepted file types: ${acceptedFileExtensions.join(' ')}`);

    const resumeFile = resumeRef.current.files[0];

    setUploading(true);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('fileName', `${user.id}${fileExtension}`);
    formData.append('studyLevel', profile.studyLevel);
    formData.append('major', profile.major);

    const res = await fetch('/api/resume/upload', {
      method: 'post',
      body: formData,
    });
    if (res.status !== 200) alert('Resume upload failed...');
    else {
      setUploading(false);
      alert('Resume updated...');
    }
  };

  if (!isSignedIn) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  if (!hasProfile) {
    router.push('/register');
    return <div></div>;
  }

  return (
    <div className="xl:px-36 lg:px-28 sm:px-16 px-10 md:py-16 py-12 bg-[url('/assets/hero-bg.png')]  pb-6 text-white">
      <div className="flex flex-col md:flex-row 2xl:gap-x-32 gap-x-20 2xl:justify-center">
        {/* QR Code */}
        <div className="">
          <div className="bg-black rounded-lg p-8 h-min w-min mx-auto">
            {/* Dark represents dots, Light represents the background */}
            <QRCode
              data={'hack:' + user.id}
              loading={false}
              width={200}
              height={200}
              darkColor="#000" //"#F6CC82"
              lightColor="#FFF" //"#0000"
            />
            <p className="text-center text-sm mt-2">{profile.user.group}</p>
          </div>
          <div className="border-y-4 border-primary py-4 md:my-8 my-6 font-secondary space-y-2">
            {applicationDecisions && (
              <div className="flex flex-col items-start justify-start gap-y-1">
                <h1 className="font-bold text-2xl">Application Status</h1>
                <p className="text-xl  animate-text bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent">
                  {profile.status}
                </p>
              </div>
            )}
            <div className="flex flex-row w-full">
              <div className="flex flex-col items-start justify-start gap-y-1">
                <h1 className="font-bold text-xl">Role</h1>
                <p className="text-lg gold-text-gradient">{user.permissions[0]}</p>
              </div>
              {/*<div className="flex flex-col items-start justify-start gap-y-1 ml-8">
                h1 className="font-bold text-xl">Points</h1>
                <p className="text-lg gold-text-gradient font-black mx-auto">{user.points}</p>
            </div>*/}
            </div>
            <div className="flex flex-col items-start justify-start gap-y-1">
              <h1 className="font-bold text-2xl">Application Status</h1>
              <p className="text-xl  animate-text bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent">
                {applicationDecisions ? profile.status : 'Under Review'}
              </p>
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="">
          <h1 className="font-semibold md:text-5xl text-4xl">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>

          <div className="font-semibold md:text-3xl text-2xl mt-6 mb-1 font-secondary text-primary">
            Major
          </div>
          <h1 className="text-xl font-secondary">{profile.major}</h1>

          <div className="font-semibold md:text-3xl text-2xl mt-6 mb-1 font-secondary text-primary">
            University
          </div>
          <h1 className="text-xl font-secondary">{profile.university}</h1>

          <div className="font-semibold md:text-3xl text-2xl mt-6 mb-1 font-secondary text-primary">
            Level of Study
          </div>
          <h1 className="text-xl font-secondary">{profile.studyLevel}</h1>

          <div className="font-semibold md:text-3xl text-2xl mt-6 mb-1 font-secondary text-primary">
            Number of Hackathons Attended
          </div>
          <h1 className="text-xl font-secondary">{profile.hackathonExperience}</h1>

          <div className="font-semibold md:text-3xl text-2xl mt-6 mb-1 font-secondary text-primary">
            Preferred Email
          </div>
          <h1 className="text-xl font-secondary">{profile.user.preferredEmail}</h1>

          <div className="my-8">
            {!uploading ? (
              <>
                <input
                  id="resume"
                  style={{ display: 'none' }}
                  type="file"
                  ref={resumeRef}
                  onChange={async () => {
                    await handleResumeUpload(profile);
                  }}
                  accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                />
                <label
                  id="resume_label"
                  className="transition rounded p-3 text-center whitespace-nowrap text-white w-min bg-gray-500 cursor-pointer font-black gap-y-2 hover:brightness-110"
                  htmlFor="resume"
                >
                  Update Resume
                </label>
              </>
            ) : (
              <LoadIcon width={16} height={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<{ applicationDecisions: boolean }>(
    `${protocol}://${context.req.headers.host}/api/acceptreject/decisions`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return {
    props: {
      applicationDecisions: data.applicationDecisions,
    },
  };
};
