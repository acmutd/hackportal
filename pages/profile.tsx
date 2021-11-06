import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (!isSignedIn || !user) {
      router.push('/');
    }
  }, [user, isSignedIn, router]);

  if (!isSignedIn || !user) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  // TODO: Make this more robust to null states
  const role = user.permissions?.length > 0 ? user.permissions[0] : 'None';

  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-bold">User Profile</h1>
      <section className="w-full py-5">
        <div className="flex flex-row gap-x-10">
          <div className="bg-gray-300 w-2/5 rounded-xl p-4">
            <h1 className="font-bold text-xl text-center">HackUTD VIII: Blast from the Past</h1>
            <svg className="mx-auto" height="200" width="200">
              <circle cx="100" cy="100" r="80" fill="white" />
            </svg>
            <h1 className="text-center font-bold text-xl">
              {user.firstName + ' ' + user.lastName}
            </h1>
            <p className="text-center">{role}</p>
          </div>
          <div className="w-full">
            <div className="profile-view">
              <div className="profile-view-name flex flex-col gap-y-2">
                <h1>Name</h1>
                <h1 className="font-bold">{user.firstName + ' ' + user.lastName}</h1>
              </div>
              <div className="profile-view-role flex flex-col gap-y-2">
                <h1>Role</h1>
                <h1 className="font-bold">{role}</h1>
              </div>
              <div className="profile-view-univ flex flex-col gap-y-2">
                <h1>University</h1>
                <h1 className="font-bold">The University of Texas at Dallas</h1>
              </div>
              <div className="profile-view-team flex flex-col gap-y-2">
                <h1>Team</h1>
                <h1 className="font-bold">HackerGang</h1>
              </div>
              <div className="profile-view-members flex flex-col gap-y-2">
                <h1>Members</h1>
                <h1 className="font-bold">Chai Dikkala, Abhitej Arora, Alina Tieu</h1>
              </div>
              <div className="profile-view-lunch flex flex-col gap-y-2">
                <h1>Lunch Group</h1>
                <h1 className="font-bold">Group Blue</h1>
              </div>
              <div className="profile-view-interests flex flex-col gap-y-2">
                <h1>Interests</h1>
                <h1 className="font-bold">Web dev, AR, Flutter, Database design</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
