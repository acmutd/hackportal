import { useRouter } from 'next/router';
import React from 'react';
import { useAuthContext } from '../../lib/user/AuthContext';
import Image from 'next/image';

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
    <div className="bg-[url('/assets/hero-bg.png')] min-h-screen  mt-[-5rem] p-4 text-center flex flex-col justify-center text-primary">
      <div>
        <Image
          src="/assets/Logo-Gold.png"
          alt="LoginImage"
          width={300}
          height={350}
          className="w-56 h-56 mx-auto"
        />
      </div>
      <div className="max-w-3xl mx-auto p-4">Signing out of HackUTD X....</div>
    </div>
  );
}
