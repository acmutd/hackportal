import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/user/AuthContext';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GoogleIcon from '../../public/icons/googleicon.png';
import Image from 'next/image';
import NextConnect from 'next-connect';
import LoginImage from '../../public/assets/fillerAsset.png';
/**
 * A page that allows the user to sign in.
 *
 * Route: /auth
 */
export default function AuthPage() {
  const { isSignedIn, signInWithGoogle, updateUser } = useAuthContext();
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordResetDialog, setPasswordResetDialog] = useState(false);
  const [sendVerification, setSendVerification] = useState(false);
  const [signInOption, setSignInOption] = useState(true);

  const router = useRouter();
  const signIn = () => {
    setSendVerification(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(currentEmail, currentPassword)
      .then(async ({ user }) => {
        // Signed in
        if (!user.emailVerified) {
          setSendVerification(true);
          throw new Error('Email is not verified. Verify your email before logging in.');
        }
        await updateUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

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
            alert(
              'Account created! Check your email/spam folder to verify your account and log in.',
            );
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const sendResetEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(currentEmail)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const sendVerificationEmail = () => {
    //send email verification
    try {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          router.push('/auth');
          alert('Verification email sent, check your email to verify your account and log in');
        });
    } catch (error) {
      alert(
        'There has been a problem sending a verfication email.\nWait a few minutes before sending another request.',
      );
    }
  };

  //toggle mask/unmask password in input field
  const showPassword = (id) => {
    var passwordInput = document.getElementById(id) as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  if (isSignedIn) {
    router.push('/profile');
  }

  function handleSubmit(event) {
    signIn();
    event.preventDefault();
  }

  function handleSignUpSubmit(event) {
    signUp();
    event.preventDefault();
  }

  // Switches between sign in and create an account
  const changeOption = (option) => {
    document.getElementById(`signInOption`).style.textDecoration = option ? 'underline' : 'none';
    document.getElementById(`signUpOption`).style.textDecoration = option ? 'none' : 'underline';

    (document.getElementById(`signInSection`) as HTMLElement).style.display = option
      ? 'block'
      : 'none';
    (document.getElementById(`signUpSection`) as HTMLElement).style.display = option
      ? 'none'
      : 'block';
    setErrorMsg('');
  };

  return (
    <>
      <div className="p-4">
        <Link href="/" passHref>
          <div className="cursor-pointer items-center inline-flex">
            <ChevronLeftIcon />
            Return to event site
          </div>
        </Link>
      </div>
      <section className="py-2 md:px-16 px-10 flex lg:justify-between justify-center flex-wrap">
        <div className="xl:w-1/2 lg:w-2/3 w-5/6 my-4">
          <h1 className="md:text-3xl text-2xl font-black">HackUTD VIII Hacker Registration</h1>
          <p className="md:text-base text-sm">
            To complete your application or access event features, please create an account or log
            in with an existing one.
          </p>
          <div className="mt-16 flex text-2xl">
            <div
              id="signInOption"
              className="py-2 mr-6 underline cursor-pointer"
              onClick={() => changeOption(true)}
            >
              Sign In
            </div>
            <div
              id="signUpOption"
              className="py-2 cursor-pointer"
              onClick={() => changeOption(false)}
            >
              Create Account
            </div>
          </div>
          <section
            id="signInSection"
            className="bg-[#F2F3FF] 2xl:min-h-[30rem] min-h-[28rem] rounded-lg p-6"
          >
            {!passwordResetDialog ? (
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                  <h1 className="text-xl font-bold mt-4 mb-2">Email</h1>
                  <input
                    className="w-full rounded-lg p-2"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    style={{ backgroundColor: '#C1C8FF' }}
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                  ></input>
                  <h1 className="text-xl font-bold mt-4 mb-2">Password</h1>
                  <input
                    id="passwordInputLg"
                    className="w-full rounded-lg p-2"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ backgroundColor: '#C1C8FF' }}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                  ></input>
                  <div className="inline-flex md:flex justify-between md:flex-row flex-col-reverse">
                    <div
                      className="hover:underline cursor-pointer text-left"
                      onClick={() => {
                        setPasswordResetDialog(true);
                        setErrorMsg('');
                        setSendVerification(false);
                      }}
                    >
                      Forgot password?
                    </div>
                    <div>
                      <input
                        className="mx-1"
                        type="checkbox"
                        onClick={() => showPassword('passwordInputLg')}
                      />
                      Show Password
                    </div>
                    <input className="hidden" type="submit" value="Submit" />
                  </div>
                  <div className="flex justify-center mt-6 mb-4">
                    <button
                      type="button"
                      className="rounded-md text-xl w-[20rem] bg-[#C1C8FF] hover:brightness-90 px-4 py-2"
                      onClick={() => {
                        signIn();
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                {/* Error and verification messages */}
                <div className="text-center">{errorMsg}</div>
                {/* !change if needed */}
                {/* Uncomment to allow resend verification email option (users could spam) */}
                {/* {sendVerification && (
                    <div className='flex justify-center'>
                      <button className="underline" onClick={() => sendVerificationEmail()}>
                        Resend verification
                      </button>
                    </div>
                  )} */}
                <div className="text-center text-gray-500 text-xl">or</div>
                <button
                  className="px-4 py-2 w-full rounded-md shadow-md bg-white my-4 text-lg font-bold hover:shadow-lg hover:bg-gray-100 text-left flex items-center"
                  onClick={() => signInWithGoogle()}
                >
                  <Image src={GoogleIcon} alt="GoogleIcon" width={25} height={25} />
                  <p className="mx-2">Sign in with Google</p>
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="text-left">
                  <ArrowBackIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswordResetDialog(false);
                      setErrorMsg('');
                    }}
                  />
                </div>
                <h1 className="text-2xl my-4">Reset Password</h1>
                <input
                  className="w-full rounded-lg p-2"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  style={{ backgroundColor: '#C1C8FF' }}
                  placeholder="Email"
                ></input>
                <button
                  className=" px-4 py-2 rounded-md shadow-md bg-[#C1C8FF] hover:brightness-90 my-6"
                  onClick={() => {
                    sendResetEmail();
                    setErrorMsg('');
                  }}
                >
                  Send Reset Email
                </button>
                <div className="text-left">{errorMsg}</div>
              </React.Fragment>
            )}
          </section>
          <section
            id="signUpSection"
            className="hidden bg-[#F2F3FF] 2xl:min-h-[30rem] min-h-[28rem] rounded-lg p-6"
          >
            <form onSubmit={handleSignUpSubmit}>
              <h1 className="text-xl font-bold mt-4 mb-2">Email</h1>
              <input
                className="w-full rounded-lg p-2"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                style={{ backgroundColor: '#C1C8FF' }}
                type="text"
                name="email"
                autoComplete="email"
                placeholder="email@example.com"
              ></input>
              <h1 className="text-xl font-bold mt-4 mb-2">Password</h1>
              <input
                id="passwordInputSignUp"
                className="w-full rounded-lg p-2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ backgroundColor: '#C1C8FF' }}
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
              ></input>
              <div className="flex justify-end">
                <div>
                  <input
                    className="mx-1"
                    type="checkbox"
                    onClick={() => showPassword('passwordInputSignUp')}
                  />
                  Show Password
                </div>
                <input className="hidden" type="submit" value="Submit" />
              </div>
              <div className="flex justify-center mt-6 mb-4">
                <button
                  type="button"
                  className="rounded-md text-xl w-[20rem] bg-[#C1C8FF] hover:brightness-90 px-4 py-2"
                  onClick={() => {
                    signUp();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
            {/* Error and verification messages */}
            <div className="text-center">{errorMsg}</div>
          </section>
        </div>
        <div className="flex xl:w-1/2 w-full items-center xl:justify-center lg:justify-start justify-center">
          <Image alt="login image" src={LoginImage} width={500} height={600}></Image>
        </div>
      </section>
    </>
  );
}
