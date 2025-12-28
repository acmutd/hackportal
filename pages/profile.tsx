import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useAuthContext } from '../lib/user/AuthContext';
import LoadIcon from '../components/LoadIcon';
import { getFileExtension } from '../lib/util';
import QRCode from '../components/dashboardComponents/QRCode';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

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
    <div className="md:px-48 px-8 md:py-16 py-12 text-black">
      <div className="flex flex-col md:flex-row 2xl:gap-x-14 gap-x-12 2xl:justify-center">
        {/* QR Code */}
        <div className="">
          <div className="bg-[#F7B86C]/20 rounded-lg p-8 h-min w-min mx-auto">
            {/* Dark represents dots, Light represents the background */}
            <QRCode
              data={'hack:' + user.id}
              loading={false}
              width={200}
              height={200}
              darkColor="#000000f6"
              lightColor="#0000"
            />
            <div className="text-center text-[#5C2E12] text-md font-semibold">
              {profile.user.group ? profile.user.group : 'Group TBD'}
            </div>
          </div>
          <div className="border-y-[1.2px] border-[#5C2E12]/20 py-4 md:my-8 my-6">
            <div className="font-fredoka font-semibold text-lg">Application Status</div>
            <h1
              className={`font-fredoka text-xl font-semibold ${
                profile.user.status === 'Accepted'
                  ? 'text-[#5DC55B]'
                  : profile.user.status === 'Rejected'
                  ? 'text-[#DE3163]'
                  : 'text-[#5C2E12]'
              }`}
            >
              {profile.user.status ? profile.user.status : 'Pending'}
            </h1>
          </div>

          <div className="flex gap-x-4">
            {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9CA6FF]">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon style={{ fontSize: 29, color: 'white' }} />
              </a>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9CA6FF]">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon style={{ fontSize: 29, color: 'white' }} />
              </a>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9CA6FF]">
              <a href={profile.website} target="_blank" rel="noreferrer">
                <LanguageIcon style={{ fontSize: 29, color: 'white' }} />
              </a>
            </div> */}

            <div className="my-2">
              {/* {!uploading ? (
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
                    className="font-fredoka transition py-3 font-semibold px-6 text-sm text-center whitespace-nowrap text-white w-min bg-[#5C67C9] rounded-full cursor-pointer hover:brightness-110"
                    htmlFor="resume"
                  >
                    Resume
                  </label>
                </>
              ) : (
                <LoadIcon width={16} height={16} />
              )} */}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full">
          <h1 className="font-fredoka font-semibold text-5xl md:mt-0 mt-10 text-[#683201]">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>

          <div className="md:flex items-center md:gap-x-10 mt-4">
            <div className="md:w-1/2">
              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                School
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.school}
              </h1>

              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                School District
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.district}
              </h1>

              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                Grade
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.grade}
              </h1>
            </div>

            <div className="md:w-1/2">
              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                Role
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.user.permissions[0]}
              </h1>

              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                Number of Hackathons Attended
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.hackathonExperience}
              </h1>

              <div className="font-fredoka font-semibold md:text-2xl text-lg mt-6 mb-1 text-[#683201]">
                Preferred Email
              </div>
              <h1 className="px-3 py-1 text-lg border border-3 border-[#C4C4C4] rounded-2xl text-[#4C4950]">
                {profile.user.preferredEmail}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
