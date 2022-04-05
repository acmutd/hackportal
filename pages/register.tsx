import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schools from '../public/schools.json';
import majors from '../public/majors.json';
import { hackPortalConfig } from '../hackportal.config';
import Question from '../components/RegistrationQuestion';
import DisplayQuestion from '../components/DisplayQuestion';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const router = useRouter();

  const {
    registrationFields: {
      generalQuestions,
      schoolQuestions,
      hackathonExperienceQuestions,
      eventInfoQuestions,
      sponsorInfoQuestions,
    },
  } = hackPortalConfig;

  const { user, hasProfile, updateProfile } = useAuthContext();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValid, setFormValid] = useState(true);

  const checkRedirect = async () => {
    if (hasProfile) router.push('/profile');
    else setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      //load json data into dropdown list for universities and majors
      if (document.getElementById('schools') !== null) {
        for (let school of schools) {
          let option = document.createElement('option');
          option.text = school['university'];
          option.value = school['university'];
          let select = document.getElementById('schools');
          select.appendChild(option);
        }
      }

      if (document.getElementById('majors') !== null) {
        for (let major of majors) {
          let option = document.createElement('option');
          option.text = major['major'];
          option.value = major['major'];
          let select = document.getElementById('majors');
          select.appendChild(option);
        }
      }
    }, 0);
  }, []);

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
            age: null,
            gender: '',
            race: '',
            ethnicity: '',
            university: '',
            major: '',
            studyLevel: '',
            hackathonExperience: null,
            softwareExperience: '',
            heardFrom: '',
            size: '',
            dietary: [],
            accomodations: '',
            github: '',
            linkedin: '',
            website: '',
            companies: [],
          }}
          //validation
          //Get condition in which values.[value] is invalid and set error message in errors.[value]. Value is a value from the form(look at initialValues)
          validate={(values) => {
            const errors: any = {};
            // empErrors for nested user object
            let empErrors: any = {};
            //first name validation
            if (!values.user.firstName) {
              empErrors.firstName = 'Required';
              errors.user = empErrors;
            }
            //last name validation
            if (!values.user.lastName) {
              empErrors.lastName = 'Required';
              errors.user = empErrors;
            }
            //email validation
            if (!values.user.preferredEmail) {
              empErrors.preferredEmail = 'Required';
              errors.user = empErrors;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user.preferredEmail)
            ) {
              //regex matches characters before @, characters after @, and 2 or more characters after . (domain)
              empErrors.preferredEmail = 'Invalid email address';
              errors.user = empErrors;
            }
            //age validation
            if (!values.age) {
              errors.age = 'Required';
            } else if (values.age < 1 || values.age > 100) {
              errors.age = 'Not a valid age';
            }
            //gender validation
            if (!values.gender) {
              errors.gender = 'Required';
            }
            //race validation
            if (!values.race) {
              errors.race = 'Required';
            }
            //ethnicity validation
            if (!values.ethnicity) {
              errors.ethnicity = 'Required';
            }
            //university validation
            if (!values.university) {
              errors.university = 'Required';
            }
            //major validation
            if (!values.major) {
              errors.major = 'Required';
            }
            //studyLevel validation
            if (!values.studyLevel) {
              errors.studyLevel = 'Required';
            }
            //hackathonExperience validation
            if (!values.hackathonExperience && values.hackathonExperience !== 0) {
              errors.hackathonExperience = 'Required';
            } else if (values.hackathonExperience < 0 || values.hackathonExperience > 100) {
              errors.hackathonExperience = 'Not a valid number';
            }
            //softwareExperience validation
            if (!values.softwareExperience) {
              errors.softwareExperience = 'Required';
            }
            //heardFrom validation
            if (!values.heardFrom) {
              errors.heardFrom = 'Required';
            }
            //size validation
            if (!values.size) {
              errors.size = 'Required';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            handleSubmit(values);
            setSubmitting(false);
            // alert(JSON.stringify(values, null, 2)); //Displays form results on submit for testing purposes
          }}
        >
          {({ values, handleChange, isValid, dirty }) => (
            // Field component automatically hooks input to form values. Use name attribute to match corresponding value
            // ErrorMessage component automatically displays error based on validation above. Use name attribute to match corresponding value
            <Form
              onKeyDown={onKeyDown}
              noValidate
              className="registrationForm flex flex-col max-w-4xl px-6 w-[56rem] text-lg"
            >
              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">General</div>
              {generalQuestions.map((obj, idx) => (
                <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
              ))}

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">School Info</div>
              {schoolQuestions.map((obj, idx) => (
                <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
              ))}

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">
                Hackathon Experience
              </div>
              {hackathonExperienceQuestions.map((obj, idx) => (
                <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
              ))}

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">Event Info</div>
              {eventInfoQuestions.map((obj, idx) => (
                <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
              ))}

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">Sponsor Info</div>
              {sponsorInfoQuestions.map((obj, idx) => (
                <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
              ))}

              {/* Resume Upload */}
              {/* Delete if needed */}
              <label className="mt-4">
                Upload your resume:
                <br />
                <input
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  name="resume"
                  type="file"
                  formEncType="multipart/form-data"
                  accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                />
                <br />
              </label>

              {/* Submit */}
              <div className="my-8">
                <button
                  type="submit"
                  className="mr-auto cursor-pointer px-4 py-2 rounded-md bg-blue-200 hover:bg-blue-300"
                  onClick={() => setFormValid(!(!isValid || !dirty))}
                >
                  Submit
                </button>
                {!isValid && !formValid && (
                  <div className="text-red-600">Error: The form has invalid fields</div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
