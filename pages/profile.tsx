import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const { isSignedIn, checkIfProfileExists } = useAuthContext();
  const user = useUser();

  const router = useRouter();

  async function checkRedirect() {
    const data = await checkIfProfileExists();
    if (!data) router.push('/register');
  }

  React.useEffect(() => {
    checkRedirect();
  });

  React.useEffect(() => {
    if (!isSignedIn || !user) {
      router.push('/');
    }
  }, [user, isSignedIn]);

  if (!isSignedIn || !user) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  // TODO: Make this more robust to null states
  const role =
    user.permissions !== null
      ? user.permissions?.length > 0
        ? user.permissions[0]
        : 'None'
      : 'None';

  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-bold">User Profile</h1>
      <section className="w-full py-5">
        <div className="flex flex-col md:flex-row gap-x-10">
          <div
            className="flex flex-col justify-around w-full md:w-2/5 rounded-xl p-4 bg-gray-300 "
            style={{ minHeight: '500px' }}
          >
            <h1 className="font-bold text-xl text-center">HackPortal 1.0</h1>
            <div className="mx-auto">
              {
                //can switch default pfp to hackathon logo
                <Image
                  className="rounded-full object-cover"
                  src={user.photoUrl !== null ? user.photoUrl : '/../public/assets/dfaultPFP.jpg'}
                  height={180}
                  width={180}
                  alt="Your profile"
                />
              }
            </div>
            <div>
              <h1 className="text-center font-bold text-xl">
                {user.firstName + ' ' + user.lastName}
              </h1>
              <p className="text-center">{role}</p>
            </div>
          </div>
          <div className="w-full my-5">
            <div className="profile-view">
              <div className="flex flex-col profile-view-name gap-y-2">
                <h1>Name</h1>
                <h1 className="font-bold">{user.firstName + ' ' + user.lastName}</h1>
              </div>
              <div className="flex flex-col profile-view-role gap-y-2">
                <h1>Role</h1>
                <h1 className="font-bold">{role}</h1>
              </div>
              <div className="flex flex-col profile-view-univ gap-y-2">
                <h1>University</h1>
                <h1 className="font-bold">{user.university}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
