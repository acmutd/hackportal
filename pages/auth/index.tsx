import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/user/AuthContext';
import { useState } from 'react';
import firebase from 'firebase/app';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GoogleIcon from '../../public/icons/googleicon.png';
import Image from 'next/image';
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
  const [showPassword, setShowPassword] = useState(false);

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

  function handleSubmit() {
    if (signInOption) {
      signIn();
    } else {
      signUp();
    }
  }

  if (isSignedIn) {
    router.push('/profile');
  }

  return (
    <>
      <section className="bg-secondary min-h-screen">
        <div className="p-4">
          <Link href="/" passHref>
            <div className="cursor-pointer items-center inline-flex text-primaryDark font-medium">
              <ChevronLeftIcon />
              return to event site
            </div>
          </Link>
        </div>
        <div className="py-2 md:px-16 px-10 flex items-center justify-center flex-wrap">
          <div className="xl:w-1/2 lg:w-2/3 w-5/6 my-4">
            <section
              id="signInSection"
              className="bg-white 2xl:min-h-[30rem] min-h-[28rem] rounded-lg p-6"
            >
              {!passwordResetDialog ? (
                <>
                  <h1 className="md:text-3xl text-2xl font-black text-center text-primaryDark mt-4">
                    {signInOption ? 'Sign in' : 'Create an account'}
                  </h1>
                  <div className="text-center text-complementary/60 mt-4 mb-12">
                    {signInOption ? ' New to HackPortal?' : 'Already have an account?'}{' '}
                    <span
                      onClick={() =>
                        signInOption ? setSignInOption(false) : setSignInOption(true)
                      }
                      className="text-primary cursor-pointer"
                    >
                      {signInOption ? 'Create an account' : 'Sign in'}
                    </span>
                  </div>
                  <React.Fragment>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <input
                        className="w-full rounded-md border border-complementary/20 p-2 mb-4"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        type="text"
                        name="email"
                        autoComplete="email"
                        placeholder="Email Address*"
                      ></input>
                      <input
                        className="w-full rounded-md border border-complementary/20 p-2 mb-2"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password*"
                      ></input>
                      <div className="inline-flex md:flex justify-between md:flex-row flex-col-reverse">
                        <div
                          className="hover:underline cursor-pointer text-left text-primary"
                          onClick={() => {
                            setPasswordResetDialog(true);
                            setErrorMsg('');
                            setSendVerification(false);
                          }}
                        >
                          Forgot password?
                        </div>
                        <div className="text-primaryDark text-base">
                          <input
                            className="mr-2 rounded-md text-primaryDark focus:ring-0 border border-primaryDark"
                            type="checkbox"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                          {showPassword ? 'Hide password' : 'Show password'}
                        </div>
                        <input className="hidden" type="submit" value="Submit" />
                      </div>
                      <div className="flex justify-center mt-6 mb-4">
                        <button
                          type="button"
                          className="rounded-full text-base w-full text-white bg-primaryDark hover:brightness-90 px-4 py-2"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          {signInOption ? 'Sign in' : 'Create an account'}
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
                    <button
                      className="mt-6 px-4 py-2 w-full rounded-full border border-complementary/20 text-complementary bg-white my-4 text-base font-bold text-center flex items-center justify-center"
                      onClick={() => signInWithGoogle()}
                    >
                      <Image src={GoogleIcon} alt="GoogleIcon" width={25} height={25} />
                      <p className="mx-2">Sign in with Google</p>
                    </button>
                  </React.Fragment>
                </>
              ) : (
                <React.Fragment>
                  <div className="text-left">
                    <ArrowBackIcon
                      className="cursor-pointer text-primaryDark"
                      onClick={() => {
                        setPasswordResetDialog(false);
                        setErrorMsg('');
                      }}
                    />
                  </div>
                  <h1 className="md:text-3xl text-2xl font-black text-center text-primaryDark mt-4">
                    Reset Password
                  </h1>
                  <div className="text-center text-complementary/60 mt-4 mb-12">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </div>

                  <input
                    className="w-full rounded-md border border-complementary/20 p-2 mb-4"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="Email Address*"
                  ></input>
                  <div className="flex justify-center mt-6 mb-4">
                    <button
                      type="button"
                      className="rounded-full text-base w-full text-white bg-primaryDark hover:brightness-90 px-4 py-2"
                      onClick={() => {
                        sendResetEmail();
                        setErrorMsg('');
                      }}
                    >
                      Send reset link
                    </button>
                  </div>
                  {/* Error and verification messages */}
                  <div className="text-left">{errorMsg}</div>
                </React.Fragment>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
