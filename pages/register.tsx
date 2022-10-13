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
import { getFileExtension } from '../lib/util';

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

  const handleSubmit = async (registrationData) => {
    try {
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('fileName', `${user.id}${getFileExtension(resumeFile.name)}`);
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
