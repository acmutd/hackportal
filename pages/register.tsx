import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const router = useRouter();

  const { user, hasProfile, updateProfile } = useAuthContext();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const checkRedirect = async () => {
    if (hasProfile) router.push('/profile');
    else setLoading(false);
  };

  useEffect(() => {
    checkRedirect();
  }, [user]);

  const getExtension = (filename: string) => {
    for (let i = filename.length - 1; i >= 0; i--) {
      if (filename.charAt(i) == '.') return filename.substring(i, filename.length);
    }
    return '';
  };

  const handleSubmit = async (registrationData) => {
    try {
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append(
          'fileName',
          `resume_${registrationData.user.firstName}_${
            registrationData.user.lastName
          }${getExtension(resumeFile.name)}`,
        );
        await fetch('/api/resume/upload', {
          method: 'post',
          body: formData,
        });
      }
      await RequestHelper.post<Registration, any>('/api/applications', {}, registrationData);
      alert('Profile created successful');
      updateProfile(registrationData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
      console.log('Request creation error');
    }
  };

  if (!user) {
    router.push('/');
  }

  if (loading) {
    return <LoadIcon width={200} height={200} />;
  }

  //disables submitting form on enter key press
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <div className="flex flex-col flex-grow bg-white">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for [HACKATHON NAME]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="jumbotron" className="p-2 px-6">
        <div className="max-w-4xl py-6 mx-auto flex flex-col items-center">
          <div className="registrationTitle text-4xl font-bold text-center">
            Hacker Registration
          </div>
          <div className="text-1xl my-4 font-bold font-small text-center">
            Please fill out the following fields. The application should take approximately 5
            minutes.
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <Formik
          initialValues={{
            id: user?.id || '',
            user: {
              id: user?.id || '',
              preferredEmail: user?.preferredEmail || '',
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
              permissions: user?.permissions || ['hacker'],
            },
            age: 18,
            gender: '',
            race: '',
            ethnicity: '',
            university: '',
            major: '',
            studyLevel: '',
            hackathonExperience: 0,
            softwareExperience: 'Beginner',
            heardFrom: 'Instagram',
            size: 'S',
            dietary: [],
            accomodations: '',
            github: '',
            linkedin: '',
            website: '',
            companies: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form
              onKeyDown={onKeyDown}
              noValidate
              className="registrationForm flex flex-col max-w-4xl px-6 w-[56rem] text-lg"
            >
              <div className="text-2xl py-1 border-b-2 border-black mr-auto my-6">General</div>
              <label htmlFor="firstName">*First Name</label>
              <Field
                id="firstName"
                name="user.firstName"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="lastName">*Last Name</label>
              <Field
                id="lastName"
                name="user.lastName"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="email">*Email</label>
              <Field
                id="email"
                name="user.preferredEmail"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="email">*Age</label>
              <input
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
                name="age"
                type="number"
                min="1"
                max="100"
                onChange={handleChange}
                value={values.age}
              />

              <label htmlFor="gender">*Gender</label>
              <Field
                as="select"
                name="gender"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="notSay">Prefer not to say</option>
              </Field>

              <label htmlFor="race">*Race</label>
              <Field
                as="select"
                name="race"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="Native American">Native American</option>
                <option value="Asian">Asian/Pacific Islander</option>
                <option value="Black">Black or African American</option>
                <option value="Hispanic">Hispanic</option>
                <option value="White">White / Caucasian</option>
                <option value="Other">Multiple / Other</option>
                <option value="notSay">Prefer not to answer</option>
              </Field>

              <label htmlFor="ethnicity">*Enthicity</label>
              <Field
                as="select"
                name="ethnicity"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="notHispanic">Not Hispanic or Latino</option>
              </Field>

              <div className="text-2xl py-1 border-b-2 border-black mr-auto my-6">School Info</div>
              <label htmlFor="university">
                *This event is for college students worldwide. Which university do you attend?
              </label>
              <Field
                id="university"
                name="university"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="major">
                *All majors are welcome at this event. What is your major?
              </label>
              <Field
                id="major"
                name="major"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="studyLevel">*Current level of study</label>
              <Field
                as="select"
                name="studyLevel"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="grad">Graduate Student</option>
              </Field>

              <div className="text-2xl py-1 border-b-2 border-black mr-auto my-6">
                Hackathon Experience
              </div>
              <label htmlFor="hackathonExperience">
                *How many hackathons have you attended before?
              </label>
              <input
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
                name="hackathonExperience"
                type="number"
                min="0"
                max="100"
                onChange={handleChange}
                value={values.hackathonExperience}
              />

              <label htmlFor="softwareExperience">*Relative software-building experience:</label>
              <Field
                as="select"
                name="softwareExperience"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Field>

              {/*ORGANIZER CAN CUSTOMIZE DROPDOWN OPTIONS*/}
              <label htmlFor="heardFrom">*Where did you hear about HackPortal?</label>
              <Field
                as="select"
                name="heardFrom"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Site">Event Site</option>
                <option value="Friend">Friend</option>
              </Field>

              <div className="text-2xl py-1 border-b-2 border-black mr-auto my-6">Event Info</div>
              <label htmlFor="size">*Shirt Size</label>
              <Field
                as="select"
                name="size"
                className="border-2 border-gray-400 rounded-md p-1 mb-4 mr-auto"
              >
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </Field>

              <label htmlFor="dietary">Allergies / Dietary Restrictions:</label>
              <div role="group" aria-labelledby="checkbox-group" className="flex flex-col mb-4">
                <label>
                  <Field type="checkbox" name="dietary" value="Vegan" />
                  &nbsp;Vegan
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Vegitarian" />
                  &nbsp;Vegitarian
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Nuts" />
                  &nbsp;Nuts
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Fish" />
                  &nbsp;Fish
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Wheat" />
                  &nbsp;Wheat
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Dairy" />
                  &nbsp;Dairy
                </label>
                <label>
                  <Field type="checkbox" name="dietary" value="Eggs" />
                  &nbsp;Eggs
                </label>
              </div>

              <label htmlFor="accomodations">
                Anything else we can do to better accommodate you at our hackathon?
              </label>
              <Field
                as="textarea"
                name="accomodations"
                placeholder="List any accessibility concerns here"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              ></Field>

              <div className="text-2xl py-1 border-b-2 border-black mr-auto my-6">Sponsor Info</div>
              <label htmlFor="github">Github:</label>
              <Field
                id="github"
                name="github"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="linkedin">LinkedIn:</label>
              <Field
                id="github"
                name="linkedin"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="website">Personal Website:</label>
              <Field
                id="github"
                name="website"
                className="border-2 border-gray-400 rounded-md p-1 mb-4"
              />

              <label htmlFor="companies">Companies to send my resume to:</label>
              <div role="group" aria-labelledby="checkbox-group" className="flex flex-col mb-4">
                <label>
                  <Field type="checkbox" name="companies" value="State Farm" />
                  &nbsp;State Farm
                </label>
                <label>
                  <Field type="checkbox" name="companies" value="American Airlines" />
                  &nbsp;American Airlines
                </label>
                <label>
                  <Field type="checkbox" name="companies" value="Capital One" />
                  &nbsp;Capital One
                </label>
                <label>
                  <Field type="checkbox" name="companies" value="Ebay" />
                  &nbsp;Ebay
                </label>
                <label>
                  <Field type="checkbox" name="companies" value="Facebook" />
                  &nbsp;Facebook
                </label>
              </div>

              <label>
                Upload your resume:
                <br />
                <input
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  name="resume"
                  type="file"
                  formEncType="multipart/form-data"
                />
                <br />
              </label>

              <button
                type="submit"
                className="mr-auto my-8 cursor-pointer px-4 py-2 rounded-md bg-blue-200 hover:bg-blue-300"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
