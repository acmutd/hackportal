import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
/**
 * A page that allows a user to create a password based acount
 */
export default function SignupPage() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordBasedSignin, setPasswordBasedSignin] = useState(false);
  const [error, setError] = useState('');

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
            alert('Email sent');
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const verifyEmail = () => {};

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center md:w-96 w-80 h-[28rem] bg-blue-200 p-8">
        <h1 className="text-black text-3xl mb-8">Sign up</h1>
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
          Sign in
        </button>
        {passwordBasedSignin ? (
          <div>Sign in successful! This is a test to see if sign is was successfull</div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    </div>
  );
}
