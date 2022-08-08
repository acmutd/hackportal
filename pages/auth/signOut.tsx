import { useRouter } from 'next/router';
import React from 'react';
import { useAuthContext } from '../../lib/user/AuthContext';

/**
 * A page that signs the user out and redirects to the index (/) page.
 */
export default function SignOutPage() {
  const { signOut } = useAuthContext();

  const router = useRouter();

  React.useEffect(() => {
    signOut()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Could not sign out', error);
      });
  }, [router]);

  return (
    <div className="background h-screen text-white">
      <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
        Signing out of HackPortal
      </div>
    </div>
  );
}
