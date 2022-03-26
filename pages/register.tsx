import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schools from '../public/schools.json';
import majors from '../public/majors.json';

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
              <label htmlFor="firstName" className="mt-4">
                *First Name
              </label>
              <Field
                id="firstName"
                name="user.firstName"
                className="border-2 border-gray-400 rounded-md p-1"
              />
              <ErrorMessage
                name="user.firstName"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="lastName" className="mt-4">
                *Last Name
              </label>
              <Field
                id="lastName"
                name="user.lastName"
                className="border-2 border-gray-400 rounded-md p-1"
              />
              <ErrorMessage
                name="user.lastName"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="email" className="mt-4">
                *Email
              </label>
              <Field
                id="email"
                name="user.preferredEmail"
                className="border-2 border-gray-400 rounded-md p-1"
              />
              <ErrorMessage
                name="user.preferredEmail"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="email" className="mt-4">
                *Age
              </label>
              <input
                id="age"
                className="border-2 border-gray-400 rounded-md p-1"
                name="age"
                type="number"
                min="1"
                max="100"
                pattern="[0-9]+"
                onChange={handleChange}
                value={values.age}
              />
              <ErrorMessage
                name="age"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="gender" className="mt-4">
                *Gender
              </label>
              <Field
                as="select"
                name="gender"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="notSay">Prefer not to say</option>
              </Field>
              <ErrorMessage
                name="gender"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="race" className="mt-4">
                *Race
              </label>
              <Field
                as="select"
                name="race"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
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
              <ErrorMessage
                name="race"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="ethnicity" className="mt-4">
                *Enthicity
              </label>
              <Field
                as="select"
                name="ethnicity"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="notHispanic">Not Hispanic or Latino</option>
              </Field>
              <ErrorMessage
                name="ethnicity"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">School Info</div>
              <label htmlFor="university" className="mt-4">
                {' '}
                {/* !change */}
                *This event is for college students worldwide. Which university do you attend?
              </label>
              <Field
                type="text"
                id="university"
                name="university"
                list="schools"
                className="border-2 border-gray-400 rounded-md p-1"
                autoComplete="off"
              ></Field>
              <datalist id="schools">
                <option value="" disabled selected></option>
              </datalist>
              <ErrorMessage
                name="university"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="major" className="mt-4">
                *All majors are welcome at this event. What is your major?
              </label>
              <Field
                type="text"
                id="major"
                name="major"
                list="majors"
                className="border-2 border-gray-400 rounded-md p-1"
                autoComplete="off"
              ></Field>
              <datalist id="majors">
                <option value="" disabled selected></option>
              </datalist>
              <ErrorMessage
                name="major"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="studyLevel" className="mt-4">
                *Current level of study
              </label>
              <Field
                as="select"
                name="studyLevel"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="grad">Graduate Student</option>
              </Field>
              <ErrorMessage
                name="studyLevel"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">
                Hackathon Experience
              </div>
              <label htmlFor="hackathonExperience" className="mt-4">
                *How many hackathons have you attended before?
              </label>
              <input
                className="border-2 border-gray-400 rounded-md p-1"
                name="hackathonExperience"
                type="number"
                min="0"
                max="100"
                onChange={handleChange}
                value={values.hackathonExperience}
              />
              <ErrorMessage
                name="hackathonExperience"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="softwareExperience" className="mt-4">
                *Relative software-building experience:
              </label>
              <Field
                as="select"
                name="softwareExperience"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Field>
              <ErrorMessage
                name="softwareExperience"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              {/*ORGANIZER CAN CUSTOMIZE DROPDOWN OPTIONS*/}
              {/* !change */}
              <label htmlFor="heardFrom" className="mt-4">
                *Where did you hear about HackPortal?
              </label>
              <Field
                as="select"
                name="heardFrom"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Site">Event Site</option>
                <option value="Friend">Friend</option>
              </Field>
              <ErrorMessage
                name="heardFrom"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">Event Info</div>
              <label htmlFor="size" className="mt-4">
                *Shirt Size
              </label>
              <Field
                as="select"
                name="size"
                className="border-2 border-gray-400 rounded-md p-1 mr-auto"
              >
                <option value="" disabled selected></option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </Field>
              <ErrorMessage
                name="size"
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />

              <label htmlFor="dietary" className="mt-4">
                Allergies / Dietary Restrictions:
              </label>
              <div role="group" aria-labelledby="checkbox-group" className="flex flex-col">
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

              <label htmlFor="accomodations" className="mt-4">
                Anything else we can do to better accommodate you at our hackathon?
              </label>
              <Field
                as="textarea"
                name="accomodations"
                placeholder="List any accessibility concerns here"
                className="border-2 border-gray-400 rounded-md p-1"
              ></Field>

              <div className="text-2xl py-1 border-b-2 border-black mr-auto mt-8">Sponsor Info</div>
              <label htmlFor="github" className="mt-4">
                Github:
              </label>
              <Field
                id="github"
                name="github"
                className="border-2 border-gray-400 rounded-md p-1"
              />

              <label htmlFor="linkedin" className="mt-4">
                LinkedIn:
              </label>
              <Field
                id="github"
                name="linkedin"
                className="border-2 border-gray-400 rounded-md p-1"
              />

              <label htmlFor="website" className="mt-4">
                Personal Website:
              </label>
              <Field
                id="github"
                name="website"
                className="border-2 border-gray-400 rounded-md p-1"
              />

              <label htmlFor="companies" className="mt-4">
                Companies to send my resume to:
              </label>
              {/* !change */}
              <div role="group" aria-labelledby="checkbox-group" className="flex flex-col">
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
