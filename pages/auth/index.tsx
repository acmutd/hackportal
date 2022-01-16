import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/user/AuthContext';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Link from 'next/link';

/**
 * A page that allows the user to sign in.
 *
 * Route: /auth
 */
export default function AuthPage() {
  const { isSignedIn, signInWithGoogle } = useAuthContext();
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordBasedSignin, setPasswordBasedSignin] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(currentEmail, currentPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('success');
        setPasswordBasedSignin(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  if (isSignedIn) {
    router.push('/profile');
  }

  return (
    // <div className="flex flex-col justify-center flex-grow p-8 bg-gray-200">
    //   <div className="max-w-2xl mx-auto">
    //     <div className="p-4 rounded-md bg-white shadow-md mb-4">
    //       <div className="mb-2 text-xl text-center font-bold">Sign in to HackPortal</div>
    //       <div>
    //         Signing into HackPortal lets you save your schedule and get reminders for when events
    //         happen!
    //       </div>
    //     </div>
    //     <div className="text-center">
    //       <button
    //         className="px-4 py-2 rounded-md shadow-md bg-white text-lg font-bold hover:shadow-lg hover:bg-gray-100"
    //         onClick={() => signInWithGoogle()}
    //       >
    //         Sign in with Google
    //       </button>
    //     </div>
    //   </div>

    // </div>
    <>
      {/* md-lg screens */}
      <section className="min-h-screen h-screen flex">
        {/* Login */}
        <div className="h-full w-2/3 flex flex-col justify-center items-center text-center bg-white p-4">
          <h1 className="text-3xl font-black">Login to your account</h1>
          <button
            className="px-4 py-2 rounded-md shadow-md bg-white my-4 text-lg font-bold hover:shadow-lg hover:bg-gray-100"
            onClick={() => signInWithGoogle()}
          >
            Sign in with Google
          </button>
          <div className="text-sm">or</div>
          <div className="w-[24rem]">
            <input
              className="w-full rounded-lg p-2 border-2 border-gray-500"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              style={{ backgroundColor: '#FFF' }}
              placeholder="Email"
            ></input>
            <input
              className="w-full rounded-lg p-2 my-2 border-2 border-gray-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ backgroundColor: '#FFF' }}
              placeholder="Password"
            ></input>
          </div>
          <button
            className="px-4 py-2 rounded-md shadow-md bg-white hover:shadow-lg hover:bg-gray-100"
            onClick={() => signIn()}
          >
            Sign in
          </button>
          {passwordBasedSignin ? (
            <div>Sign in successful! This is a test to see if sign is was successfull</div>
          ) : (
            <div>{error}</div>
          )}
        </div>
        {/* Create new accont */}
        <div className="h-full w-1/3 bg-green-200 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-3xl font-black">Don&#39;t have an account?</h1>
          <p className="my-6">
            Create an account to apply to the hackathon and access user specific perks!
          </p>
          <Link href="/auth/signup">
            <a className="px-4 py-2 rounded-xl shadow-md bg-white hover:shadow-lg hover:bg-gray-100">
              Signup
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
