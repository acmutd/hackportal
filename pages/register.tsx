import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { hackPortalConfig, formInitialValues } from '../hackportal.config';
import DisplayQuestion from '../components/registerComponents/DisplayQuestion';
import { getFileExtension } from '../lib/util';
import Link from 'next/link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { GetServerSideProps } from 'next';

interface RegisterPageProps {
  allowedRegistrations: boolean;
}

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register({ allowedRegistrations }: RegisterPageProps) {
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
  const [registrationSection, setRegistrationSection] = useState(0);
  const checkRedirect = async () => {
    if (!allowedRegistrations) return;
    if (hasProfile) router.push('/profile');
    else setLoading(false);
  };

  useEffect(() => {
    //setting user specific initial values
    formInitialValues['id'] = user?.id || '';
    formInitialValues['preferredEmail'] = user?.preferredEmail || '';
    formInitialValues['firstName'] = user?.firstName?.split(' ')[0] || '';
    formInitialValues['lastName'] = user?.lastName || '';
    formInitialValues['permissions'] = user?.permissions || ['hacker'];
  }, []);

  useEffect(() => {
    checkRedirect();
  }, [user]);

  const handleSubmit = async (registrationData) => {
    let resumeUrl: string = '';
    try {
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('fileName', `${user.id}${getFileExtension(resumeFile.name)}`);
        formData.append('studyLevel', registrationData['studyLevel']);
        formData.append('major', registrationData['major']);

        const res = await fetch('/api/resume/upload', {
          method: 'post',
          body: formData,
        });
        resumeUrl = (await res.json()).url;
      }
      await RequestHelper.post<Registration, any>(
        '/api/applications',
        {},
        { ...registrationData, resume: resumeUrl },
      );
      alert('Registered successfully');
      updateProfile(registrationData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
      console.log('Request creation error');
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length !== 1) return alert('Must submit one file');

    const file = e.target.files[0];

    const fileExtension = getFileExtension(file.name);

    const acceptedFileExtensions = [
      '.pdf',
      '.doc',
      '.docx',
      '.png',
      '.jpg',
      '.jpeg',
      '.txt',
      '.tex',
      '.rtf',
    ];

    if (!acceptedFileExtensions.includes(fileExtension))
      return alert(`Accepted file types: ${acceptedFileExtensions.join(' ')}`);

    setResumeFile(file);
  };

  if (!allowedRegistrations) {
    return (
      <h1 className="mx-auto text-2xl mt-4 font-bold">
        Registrations is closed and no longer allowed
      </h1>
    );
  }

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

  const setErrors = (obj, values, errors) => {
    if (obj.textInputQuestions)
      for (let inputObj of obj.textInputQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.numberInputQuestions)
      for (let inputObj of obj.numberInputQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name] && values[inputObj.name] !== 0)
            errors[inputObj.name] = 'Required';
        }
      }
    if (obj.dropdownQuestions)
      for (let inputObj of obj.dropdownQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.checkboxQuestions)
      for (let inputObj of obj.checkboxQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.datalistQuestions)
      for (let inputObj of obj.datalistQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.textAreaQuestions)
      for (let inputObj of obj.textAreaQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }

    return errors;
  };

  return (
    <div className="flex flex-col flex-grow bg-secondary">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for [HACKATHON NAME]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="pt-4 pl-4">
        <Link href="/" passHref>
          <div className="cursor-pointer items-center inline-flex text-primaryDark font-semibold sm:text-lg">
            <ChevronLeftIcon />
            return to event site
          </div>
        </Link>
      </section>
      <section
        id="jumbotron"
        className="text-primaryDark lg:text-4xl sm:text-3xl text-2xl font-bold text-center lg:mt-0 mt-6 mb-6"
      >
        HackPortal Hacker Registration
      </section>

      <section className="relative">
        <Formik
          initialValues={formInitialValues}
          //validation
          //Get condition in which values.[value] is invalid and set error message in errors.[value]. Value is a value from the form(look at initialValues)
          validate={(values) => {
            var errors: any = {};
            for (let obj of generalQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of schoolQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of hackathonExperienceQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of eventInfoQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of sponsorInfoQuestions) {
              errors = setErrors(obj, values, errors);
            }

            //additional custom error validation
            if (
              values.preferredEmail &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.preferredEmail)
            ) {
              //regex matches characters before @, characters after @, and 2 or more characters after . (domain)
              errors.preferredEmail = 'Invalid email address';
            }
            if ((values.age && values.age < 1) || values.age > 100) {
              errors.age = 'Not a valid age';
            }
            if (
              (values.hackathonExperience && values.hackathonExperience < 0) ||
              values.hackathonExperience > 100
            ) {
              errors.hackathonExperience = 'Not a valid number';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            let finalValues: any = values;
            //add user object
            const userValues: any = {
              id: values.id,
              firstName: values.firstName,
              lastName: values.lastName,
              preferredEmail: values.preferredEmail,
              permissions: values.permissions,
            };
            finalValues['user'] = userValues;
            //delete unnecessary values
            delete finalValues.firstName;
            delete finalValues.lastName;
            delete finalValues.permissions;
            delete finalValues.preferredEmail;

            //submitting
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
              className="registrationForm px-6 w-full sm:text-base text-sm"
            >
              {/* General Questions */}
              {registrationSection == 0 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">General</h2>
                  <div className="flex flex-col">
                    {generalQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* School Questions */}
              {registrationSection == 1 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">School Info</h2>
                  <div className="flex flex-col">
                    {schoolQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Hackathon Questions */}
              {registrationSection == 2 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">
                    Hackathon Experience
                  </h2>
                  <div className="flex flex-col">
                    {hackathonExperienceQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Event Questions */}
              {registrationSection == 3 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">Event Info</h2>
                  <div className="flex flex-col">
                    {eventInfoQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Sponsor Questions */}
              {registrationSection == 4 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">Sponsor Info</h2>
                  <div className="flex flex-col">
                    {sponsorInfoQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {/* Resume Upload */}
                  <div className=" mt-8">
                    Upload your resume:
                    <br />
                    <input
                      onChange={(e) => handleResumeFileChange(e)}
                      name="resume"
                      type="file"
                      formEncType="multipart/form-data"
                      accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                      className="cursor-pointer w-full text-complementary border border-complementary/20 rounded-md file:md:p-2 file:p-1 file:bg-primaryDark file:text-white file:cursor-pointer file:h-full file:rounded-l-md file:border-none"
                    />
                    <br />
                    <p className="text-xs text-complementary/50">
                      Accepted file types: .pdf, .doc, .docx, .png, .jpeg, .txt, .tex, .rtf
                    </p>
                  </div>
                  {/* Submit */}
                  <div className="mt-8 text-white">
                    <button
                      type="submit"
                      className="mr-auto cursor-pointer px-4 py-2 rounded-lg bg-primaryDark hover:brightness-90"
                      onClick={() => setFormValid(!(!isValid || !dirty))}
                    >
                      Submit
                    </button>
                    {!isValid && !formValid && (
                      <div className="text-red-600">Error: The form has invalid fields</div>
                    )}
                  </div>
                </section>
              )}
            </Form>
          )}
        </Formik>

        {/* Pagniation buttons */}
        <section
          className={`lg:block flex ${
            registrationSection == 0
              ? 'justify-end'
              : registrationSection >= 4
              ? 'justify-start'
              : 'justify-between'
          } lg:pb-0 pb-8 lg:px-0 sm:px-8 px-6 text-primaryDark font-semibold text-primaryDark font-semibold lg:text-xl md:text-lg`}
        >
          {registrationSection > 0 && (
            <div
              className="lg:fixed 2xl:bottom-8 2xl:left-8 bottom-6 left-6 inline cursor-pointer select-none"
              onClick={() => {
                setRegistrationSection(registrationSection - 1);
              }}
            >
              <ChevronLeftIcon />
              previous page
            </div>
          )}

          {registrationSection < 4 && (
            <div
              className="lg:fixed 2xl:bottom-8 2xl:right-8 bottom-6 right-6 inline cursor-pointer select-none"
              onClick={() => {
                setRegistrationSection(registrationSection + 1);
              }}
            >
              next page
              <ChevronRightIcon />
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<{ allowRegistrations: boolean }>(
    `${protocol}://${context.req.headers.host}/api/registrations/status`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return {
    props: {
      allowedRegistrations: data.allowRegistrations,
    },
  };
};
