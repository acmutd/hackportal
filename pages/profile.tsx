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
    <div className="p-4 flex-grow">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold">Hacker information</h1>
        <div className="my-2">
          User information:
          <ul>
            <li>Name: {user.firstName}</li>
            <li>Email: {user.preferredEmail}</li>
            <li>Role: {role}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
