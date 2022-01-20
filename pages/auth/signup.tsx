import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from 'next/link';
/**
 * A page that allows a user to create a password based acount
 */
export default function SignupPage() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  var getVerified = false;
  const router = useRouter();

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(currentEmail, currentPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        //send email verification
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            router.push('/auth');
            alert('Account created, check your email to verify your account to log in');
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative flex flex-col items-center w-96 h-[28rem] bg-blue-200 p-8">
        <Link href="/auth">
          <a className="absolute top-3 left-3 text-3xl">
            <ArrowBackIcon />
          </a>
        </Link>
        <h1 className="text-center text-black text-3xl my-8">Create an Account</h1>
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
        <button
          className="px-4 py-2 rounded-md shadow-md bg-white hover:shadow-lg hover:bg-gray-100"
          onClick={() => signUp()}
        >
          Sign up
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
}
