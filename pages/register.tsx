// NOTE: Replaced Typeform stuff with registration form from HackPortal
import Head from 'next/head';
import '@typeform/embed/build/css/widget.css';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RequestHelper } from '../lib/request-helper';
import firebase from 'firebase';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const query = new URL(`http://localhost:3000/api/userinfo`);
        query.searchParams.append('id', user.uid);

        const data = await fetch(query.toString().replaceAll('http://localhost:3000', ''), {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (data.status !== 404) {
          router.push('/profile');
        } else {
          setRegistrationData((prev) => ({
            ...prev,
            id: user.uid,
            user: {
              ...prev.user,
              id: user.uid,
              firstName: user.displayName,
              lastName: '',
              preferredEmail: user.email,
            },
          }));
        }
      } else {
        router.push('/');
      }
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await RequestHelper.post<Registration, void>('/api/applications', {}, registrationData);
      alert('Profile created successful');
      router.push('/profile');
    } catch (error) {
      console.log('Request creation error');
    }
  };

  const [registrationData, setRegistrationData] = useState<Registration>({
    id: '',
    timestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
    user: {
      id: '',
      preferredEmail: '',
      firstName: '',
      lastName: '',
      permissions: ['hacker'],
    },

    university: '',
    major: '',
    studyLevel: 'freshman',
  });

  const updateUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      user: {
        ...registrationData.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const updateRegistrationData = (e: any) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for [HACKATHON NAME]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="jumbotron" className="p-2">
        <div className="max-w-4xl py-6 mx-auto">
          <div className="text-4xl  text-left">Hacker Registration</div>
          <div className="text-1xl my-4 font-bold font-small text-left">
            Please fill out the following fields. The application should take approximately 5
            minutes.
          </div>
        </div>
      </section>
      <section id="registration" className="m-4">
        <div className="max-w-4xl py-4 pt-8 mx-auto text-2xl font-bold text-left">General</div>
        <div className="max-w-4xl py-4 mx-auto">
          <form className="max-w-4xl mx-auto">
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Enter your first name:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-black rounded-md"
                placeholder="John"
                type="text"
                name="firstName"
                autoComplete="given-name"
                required
                value={registrationData.user.firstName}
                onChange={(e) => updateUserData(e)}
              />
              <br />
              <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Enter your last name:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-black rounded-md"
                placeholder="Smith"
                type="text"
                name="lastName"
                autoComplete="family-name"
                required
                value={registrationData.user.lastName}
                onChange={(e) => updateUserData(e)}
              />
              <br />
              <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Enter your email:
              <br />
              <input
                placeholder="email@example.com"
                type="type"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-black rounded-md"
                name="preferredEmail"
                autoComplete="email"
                required
                value={registrationData.user.preferredEmail}
                onChange={(e) => updateUserData(e)}
              />
              <br />
              <br />
            </label>

            <section id="registration">
              <div className="max-w-4xl py-4 pt-8 mx-auto text-2xl font-bold text-left">
                School Info
              </div>
            </section>
            <label className="text-1xl my-4 font-bold font-small text-left">
              *This event is for college students worldwide. Which university do you attend?
              <br />
              <input
                placeholder="University of Knowledge"
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-black rounded-md"
                type="text"
                name="university"
                value={registrationData.university}
                onChange={(e) => updateRegistrationData(e)}
                required
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *All majors are welcome at this event. What is your major?
              <br />
              <input
                placeholder="Computer Science, Accounting, etc."
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-black rounded-md"
                type="text"
                name="major"
                value={registrationData.major}
                onChange={(e) => updateRegistrationData(e)}
                required
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *Current level of study?
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-black rounded-md"
                placeholder="Select One"
                name="studyLevel"
                value={registrationData.studyLevel}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="grad">Graduate Student</option>
              </select>
              <br />
              <br />
            </label>

            <br />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
