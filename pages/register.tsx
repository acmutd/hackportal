import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schools from '../public/schools.json';
import majors from '../public/majors.json';
import { hackPortalConfig, formInitialValues } from '../hackportal.config';
import DisplayQuestion from '../components/DisplayQuestion';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Link from 'next/link';

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
      oneLastThing,
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

  const [displayPage, setDisplayPage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      //load json data into dropdown list for universities and majors
      if (document.getElementById('university') !== null) {
        let schoolOptions = [];
        for (let school of schools) {
          schoolOptions.push({ title: school['university'], value: school['university'] });
        }
        schoolQuestions[0].dropdownQuestions[0].options = schoolOptions;
      }
      if (document.getElementById('major') !== null) {
        let majorOptions = [];
        for (let major of majors) {
          majorOptions.push({ title: major['major'], value: major['major'] });
        }
        schoolQuestions[0].dropdownQuestions[1].options = majorOptions;
      }
    }, 0);
    //setting user specific initial values
    formInitialValues['id'] = user?.id || '';
    formInitialValues['preferredEmail'] = user?.preferredEmail || '';
    formInitialValues['firstName'] = user?.firstName || '';
    formInitialValues['lastName'] = user?.lastName || '';
    formInitialValues['permissions'] = user?.permissions || ['hacker'];
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
      alert('Registered successfully');
      updateProfile(registrationData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
      console.log('Request creation error');
    }
  };

  const changePage = (next) => {
    // next signifies if displayPage should go foward or backward (1 or -1)
    let nextPage = displayPage + next;
    if (nextPage < 0 || nextPage > 5) return;

    if (nextPage > 0) {
      (document.getElementById(`previous`) as HTMLElement).style.opacity = '1';
    } else if (nextPage === 0) {
      (document.getElementById(`previous`) as HTMLElement).style.opacity = '0';
    }

    if (nextPage < 5) {
      (document.getElementById(`next`) as HTMLElement).style.opacity = '1';
    } else if (nextPage === 5) {
      (document.getElementById(`next`) as HTMLElement).style.opacity = '0';
    }

    (document.getElementById(`page${displayPage}`) as HTMLElement).style.display = 'none';
    (document.getElementById(`page${nextPage}`) as HTMLElement).style.display = 'flex';
    setDisplayPage(nextPage);
  };

  if (!user) {
    router.push('/auth');
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
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
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
    <div className="flex flex-col flex-grow background text-white">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for [HACKATHON NAME]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 mt-[4rem]">
        <Link href="/" passHref>
          <div className="cursor-pointer items-center inline-flex lg:text-3xl sm:text-xl text-lgfont-medium text-[#7B81FF]">
            <ChevronLeftIcon fontSize="large" />
            Return to event site
          </div>
        </Link>
      </div>

      <section className="mt-10 md:mx-24 mx-8">
        <div className="md:text-4xl text-2xl">HackUTD IX Hacker Registration</div>
        <div className="my-1 md:text-xl text-base font-light">
          Please fill out the following fields. The application should take approximately 5 minutes.
        </div>
      </section>

      {/* <section className="flex-grow flex flex-col justify-between"> */}
      <section className="md:mx-24 mx-8 flex flex-col flex-grow">
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
            for (let obj of oneLastThing) {
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
            if (values.CoC.length == 0) {
              errors.CoC = 'Code of Conduct not accepted';
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
              className="registrationForm flex flex-col flex-grow justify-between text-lg"
            >
              <div id="page0" className="flex flex-col max-w-4xl">
                <div className="text-3xl py-1 mt-8">General</div>
                {generalQuestions.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
              </div>

              <div id="page1" className="flex flex-col hidden max-w-4xl">
                <div className="text-3xl py-1 mt-8">School Info</div>
                {schoolQuestions.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
              </div>

              <div id="page2" className="flex flex-col hidden max-w-4xl">
                <div className="text-3xl py-1 mt-8">Hackathon Experience</div>
                {hackathonExperienceQuestions.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
              </div>

              <div id="page3" className="flex flex-col hidden max-w-4xl">
                <div className="text-3xl py-1 mt-8">Event Info</div>
                {eventInfoQuestions.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
              </div>

              <div id="page4" className="flex flex-col hidden max-w-4xl">
                <div className="text-3xl py-1 mt-8">Sponsor Info</div>
                {sponsorInfoQuestions.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
                <label>
                  <div className="mt-8 text-2xl py-1">Upload your resume</div>
                  <input
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    name="resume"
                    type="file"
                    formEncType="multipart/form-data"
                    accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                  />
                  <br />
                </label>
              </div>

              <div id="page5" className="flex flex-col hidden max-w-4xl">
                <div className="text-3xl py-1 mt-8">One Last Thing</div>
                {oneLastThing.map((obj, idx) => (
                  <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                ))}
              </div>
              <div className="flex justify-between 2xl:mb-24 mb-16 mt-10 select-none">
                <div
                  id="previous"
                  className="opacity-0 cursor-pointer items-center inline-flex lg:text-3xl sm:text-xl text-sm font-medium text-[#7B81FF] raise"
                  onClick={() => {
                    changePage(-1);
                  }}
                >
                  <ChevronLeftIcon fontSize="large" className="" />
                  Previous Page
                </div>
                <div className="lg:text-3xl sm:text-xl text-sm inline-flex items-center font-medium text-[#7B81FF]">
                  {displayPage + 1}/6
                </div>
                <div
                  id="next"
                  className={`cursor-pointer items-center lg:text-3xl sm:text-xl text-sm font-medium text-[#7B81FF] raise ${
                    displayPage + 1 == 6 ? 'hidden' : 'inline-flex'
                  }`}
                  onClick={() => {
                    changePage(1);
                  }}
                >
                  Next Page
                  <ChevronLeftIcon fontSize="large" className="rotate-180" />
                </div>
                <div className={`${displayPage + 1 == 6 ? '' : 'hidden'} text-right`}>
                  <button
                    type="submit"
                    className={`cursor-pointer items-center lg:text-3xl sm:text-xl text-sm text-[#7B81FF] font-bold raise`}
                    onClick={() => setFormValid(!(!isValid || !dirty))}
                  >
                    Submit
                  </button>
                  {!isValid && !formValid && (
                    <div className="text-red-600 lg:text-lg md:text-base sm:text-sm text-xs">
                      Error: The form has invalid fields
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
