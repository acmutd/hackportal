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
    <div className="p-4 text-center flex flex-col justify-center">
      <div className="max-w-3xl mx-auto p-4">Signing out of HackPortal</div>
    </div>
  );
}
