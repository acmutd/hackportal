import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/user/AuthContext';

/**
 * A page that allows the user to sign in.
 *
 * Route: /auth
 */
export default function AuthPage() {
  const { isSignedIn, signInWithGoogle } = useAuthContext();

  const router = useRouter();

  if (isSignedIn) {
    router.push('/profile');
  }

  return (
    <div className="flex flex-col justify-center flex-grow p-8 bg-black font-header">
      <div className="max-w-2xl mx-auto">
        <div className="p-4 rounded-md bg-gray-900 shadow-md mb-4">
          <div className="mb-2 text-xl text-center font-bold">Sign in to HackPortal</div>
          <div>
            Signing into HackPortal lets you save your schedule and get reminders for when events
            happen!
          </div>
        </div>
        <div className="text-center">
          <button
            className="px-4 py-2 rounded-md shadow-md bg-gray-900 text-lg font-bold hover:shadow-lg hover:bg-gray-100"
            onClick={() => signInWithGoogle()}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
