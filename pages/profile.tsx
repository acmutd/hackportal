import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useAuthContext } from '../lib/user/AuthContext';
import LoadIcon from '../components/LoadIcon';
import { getFileExtension } from '../lib/util';
import QRCode from '../components/dashboardComponents/QRCode';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const router = useRouter();
  const { isSignedIn, hasProfile, user, profile } = useAuthContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const resumeRef = useRef(null);

  const handleResumeUpload = (profile) => {
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

    fetch('/api/resume/upload', {
      method: 'post',
      body: formData,
    }).then((res) => {
      if (res.status !== 200) alert('Resume upload failed...');
      else {
        setUploading(false);
        alert('Resume updated...');
      }
    });
  };

  if (!isSignedIn) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  if (!hasProfile) {
    router.push('/register');
    return <div></div>;
  }

  return (
    <div className="xl:px-36 lg:px-28 sm:px-16 px-10 md:py-16 py-12 text-complementary">
      <div className="flex flex-col md:flex-row 2xl:gap-x-32 gap-x-20 2xl:justify-center">
        {/* QR Code */}
        <div className="">
          <div className="bg-secondary rounded-lg p-8 h-min w-min mx-auto">
            {/* Dark represents dots, Light represents the background */}
            <QRCode
              data={'hack:' + user.id}
              loading={false}
              width={200}
              height={200}
              darkColor="#05149C"
              lightColor="#0000"
            />
          </div>
          <div className="border-y-[1.2px] border-primaryDark/20 py-4 md:my-8 my-6">
            <div className="font-bold text-lg">Role</div>
            <h1 className="text-xl">{profile.user.permissions[0]}</h1>
          </div>
        </div>
        {/* Info */}
        <div className="">
          <h1 className="font-semibold md:text-5xl text-4xl">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>

          <div className="font-semibold md:text-2xl text-xl mt-6 mb-1">Major</div>
          <h1 className="text-xl">{profile.major}</h1>

          <div className="font-semibold md:text-2xl text-xl mt-6 mb-1">University</div>
          <h1 className="text-xl">{profile.university}</h1>

          <div className="font-semibold md:text-2xl text-xl mt-6 mb-1">Level of Study</div>
          <h1 className="text-xl">{profile.studyLevel}</h1>

          <div className="font-semibold md:text-2xl text-xl mt-6" mb-1>
            Number of Hackathons Attended
          </div>
          <h1 className="text-xl">{profile.hackathonExperience}</h1>

          <div className="font-semibold md:text-2xl text-xl mt-6 mb-1">Preferred Email</div>
          <h1 className="text-xl">{profile.user.preferredEmail}</h1>

          <div className="my-8">
            {!uploading ? (
              <>
                <input
                  id="resume"
                  style={{ display: 'none' }}
                  type="file"
                  ref={resumeRef}
                  onChange={() => handleResumeUpload(profile)}
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
