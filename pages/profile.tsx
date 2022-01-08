import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const router = useRouter();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const query = new URL(`http://localhost:3000/api/userinfo`);
        query.searchParams.append('id', user.uid);

        const temp = await fetch(query.toString().replaceAll('http://localhost:3000', ''), {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (temp.status === 404) {
          router.push('/register');
        } else {
          const data: Registration = await temp.json();

          setUserData({
            id: user.uid,
            preferredEmail: user.email,
            name: user.displayName,
            permissions: data.user.permissions,
            photoUrl: user.photoURL,
            university: data.university,
            major: data.major,
            studyLevel: data.studyLevel,
          });
        }
      } else {
        router.push('/');
      }
    });
  }, []);

  if (!userData) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  // TODO: Make this more robust to null states
  const role = userData.permissions?.length > 0 ? userData.permissions[0] : 'None';

  return (
    <div className="p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <section className="w-full py-5">
          <div className="flex flex-col md:flex-row gap-x-10">
            <div
              className="bg-gray-900 w-full md:w-2/3 rounded-xl p-4 flex flex-col justify-around"
              style={{ minHeight: '500px' }}
            >
              <h1 className="font-bold text-xl text-center">HackUTD VIII: Blast from the Past</h1>
              <div className="mx-auto">
                <Image
                  className="rounded-full object-cover"
                  src={userData.photoUrl}
                  height={180}
                  width={180}
                  alt="Your profile"
                />
              </div>
              <div>
                <h1 className="text-center font-bold text-xl">{userData.name}</h1>
                <p className="text-center">{role}</p>
              </div>
            </div>
            <div className="w-full my-5">
              <div className="profile-view">
                <div className="profile-view-name flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Name</div>
                  <h1 className="font-bold">{userData.name}</h1>
                </div>
                <div className="profile-view-role flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Role</div>
                  <h1 className="font-bold">{role}</h1>
                </div>
                <div className="profile-view-univ flex flex-col gap-y-2">
                  <div className="font-bold text-xl">University</div>
                  <h1 className="font-bold">{userData.university}</h1>
                </div>
                <div className="profile-view-major flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Major</div>
                  <h1 className="font-bold">{userData.major}</h1>
                </div>
                <div className="profile-view-stlvl flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Level of Study</div>
                  <h1 className="font-bold">{userData.studyLevel}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
