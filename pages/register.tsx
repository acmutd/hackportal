import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/compat/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { hackPortalConfig, formInitialValues } from '../hackportal.config';
import DisplayQuestion from '../components/registerComponents/DisplayQuestion';
import { getFileExtension } from '../lib/util';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GetServerSideProps } from 'next';
import { grid } from '@mui/system';

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
      mediaReleaseQuestions,
      liabilityWaiverQuestions,
      codeOfConductQuestions,
      minorsFormQuestions,
      parentalConsentQuestions,
    },
  } = hackPortalConfig;

  const { user, hasProfile, updateProfile } = useAuthContext();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  // update this to false for testing
  const [loading, setLoading] = useState(true);
  const [formValid, setFormValid] = useState(true);
  const [registrationSection, setRegistrationSection] = useState(0);

  useEffect(() => {
    // wait for auth to resolve
    if (user === undefined) return;

    // not signed in → must authenticate first
    if (user === null) {
      router.replace('/auth');
      return;
    }

    // already registered → profile
    if (hasProfile) {
      router.replace('/profile');
      return;
    }

    // signed in & no profile → allow form
    setLoading(false);
  }, [user, hasProfile, router]);

  // const checkRedirect = async () => {
  //   if (!allowedRegistrations) return;
  //   if (hasProfile) router.push('/profile');
  //   else setLoading(false);
  // };

  useEffect(() => {
    //setting user specific initial values
    formInitialValues['id'] = user?.id || '';
    formInitialValues['preferredEmail'] = user?.preferredEmail || '';
    formInitialValues['firstName'] = user?.firstName?.split(' ')[0] || '';
    formInitialValues['lastName'] = user?.lastName || '';
    formInitialValues['permissions'] = user?.permissions || ['hacker'];
  }, [user]);

  // // disbale this for testing
  // useEffect(() => {
  //   checkRedirect();
  // }, [user]);

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

  // // disable this for testing
  // if (!user) {
  //   router.push('/');
  // }

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
    <div className="flex flex-col flex-grow bg-[#F7B86C]/20">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for NTHS 2026" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="pl-4 relative mb-4">
        <Link href="/" passHref>
          <ChevronLeftIcon className="absolute top-4 z-10 text-[#683201]" fontSize={'large'} />
        </Link>
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
            for (let obj of minorsFormQuestions) {
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
            if (values.phone && !/^\d{3}-\d{3}-\d{4}$/.test(values.phone)) {
              errors.phone = 'Phone number must be in XXX-XXX-XXXX format';
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
            let finalValues: any = { ...values };
            //add user object
            const userValues: any = {
              id: user?.id,
              firstName: user?.firstName?.split(' ')[0] || values.firstName,
              lastName: user?.lastName || values.lastName,
              preferredEmail: user?.preferredEmail || values.preferredEmail,
              permissions: user?.permissions || values.permissions,
            };
            finalValues.user = userValues;
            //delete unnecessary values
            delete finalValues.firstName;
            delete finalValues.lastName;
            delete finalValues.permissions;
            delete finalValues.preferredEmail;

            //submitting
            console.log('SUBMIT USER ID:', finalValues.user?.id); // debugging
            await handleSubmit(finalValues);
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
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-4 py-6 px-8 mb-8 text-[#4C4950]">
                  <header>
                    <h1 className="text-[#683201] lg:text-4xl sm:text-3xl text-2xl font-bold text-center lg:mt-0 mt-4 mb-4 poppins-bold">
                      Hacker Registration
                    </h1>
                    <div style={{ color: '#A6A4A8' }} className="poppins-regular text-center mb-6">
                      Please fill out the following fields. The application should take
                      approximately 5 minutes.
                    </div>
                  </header>
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
              {registrationSection === 3 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full mx-auto rounded-2xl py-10 px-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Media Release</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Event Date: March 28, 2026
                    <br />
                    Location: The University of Texas at Dallas
                  </p>
                  <p className="text-md mb-2">
                    I, the undersigned, hereby grant NTHS Hackathon and its organizers the right to
                    take photographs, video recordings, and/or audio recordings of me/my child
                    during the event. I understand that these media materials may be used in
                    promotional materials, websites, social media, and other marketing efforts.
                    <br />I waive any rights to inspect or approve the media in which my/my child’s
                    likeness appears. I understand that no compensation will be provided for the use
                    of these materials.
                  </p>
                  <p className="text-md mb-2">
                    Participant Information & Consent (To be signed by parent/guardian if under 18):
                    I, the parent/guardian of the minor participant named above, authorize the use
                    of my child’s image and recordings for promotional purposes as outlined in this
                    release.
                  </p>

                  {mediaReleaseQuestions.map((obj, idx) => (
                    <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                  ))}
                </section>
              )}
              {registrationSection === 4 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full mx-auto rounded-2xl py-10 px-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Liability Waiver & Release</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Event Date: March 28, 2026
                    <br />
                    Location: The University of Texas at Dallas
                  </p>
                  <p className="text-md mb-2">
                    I, the undersigned, acknowledge that participation in NTHS Hackathon is
                    voluntary and involves activities that may have inherent risks. I agree to
                    release, indemnify, and hold harmless NTHS Hackathon organizers, The University
                    of Texas at Dallas, event sponsors, and affiliated personnel from any claims,
                    injuries, damages, or liabilities that may arise during my/my child’s
                    participation in the event.
                    <br />I understand that organizers will take reasonable safety precautions, but
                    I assume full responsibility for any personal injury or property damage
                    resulting from my/my child’s participation.
                  </p>
                  <p className="text-md mb-2">
                    Participant Information & Consent (To be signed by parent/guardian if under 18):
                    I, the parent/guardian of the minor participant named above, understand and
                    accept the terms of this waiver and grant permission for my child to
                    participate.
                  </p>

                  {liabilityWaiverQuestions.map((obj, idx) => (
                    <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                  ))}
                </section>
              )}
              {registrationSection === 5 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full mx-auto rounded-2xl py-10 px-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Event Date: March 28, 2026
                    <br />
                    Location: The University of Texas at Dallas
                  </p>
                  <p className="text-md mb-2">
                    NTHS Hackathon is committed to fostering a safe, inclusive, and respectful
                    environment for all participants. By attending, you agree to follow these
                    guidelines:
                    <br />
                    1. Respect – Treat fellow participants, mentors, and organizers with kindness
                    and professionalism. Harassment, discrimination, or inappropriate behavior will
                    not be tolerated.
                    <br />
                    2. Integrity – No plagiarism, cheating, or sabotage of others’ work.
                    <br />
                    3. Safety – Follow all event safety guidelines and UTD’s campus policies.
                    <br />
                    4. Teamwork – Collaboration is encouraged, but all submissions must be the
                    team’s own work.
                    <br />
                    5. Consequences – Violations of this Code of Conduct may result in
                    disqualification, removal from the event, and/or notification of school
                    officials.
                    <br />
                  </p>
                  <p className="text-md mb-2">
                    Participant Agreement & Parental Consent (For Participants Under 18): I, the
                    parent/guardian of the minor participant named above, have reviewed and agree to
                    this Code of Conduct.
                  </p>

                  {codeOfConductQuestions.map((obj, idx) => (
                    <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                  ))}
                </section>
              )}
              {registrationSection === 6 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full mx-auto rounded-2xl py-10 px-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Minor Participant Form</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Event Date: March 28, 2026
                    <br />
                    Location: The University of Texas at Dallas
                  </p>
                  <p className="text-md mb-2">
                    I, the parent/guardian of [Participant&apos;s Name], give my permission for my
                    child to attend and participate in NTHS Hackathon. I understand that this event
                    is hosted at The University of Texas at Dallas and will include supervised
                    activities related to coding, design, and technology.
                  </p>
                  <p className="text-md mb-2">
                    I acknowledge that the nature of the Activity or Trip may expose Participant to
                    hazards or risks that may result in Participant&apos;s illness, personal injury,
                    or death and I understand and appreciate the nature of such hazards and risks.
                  </p>
                  <p className="text-md mb-2">
                    In consideration of Participant being permitted to participate in the Activity
                    or Trip, I hereby
                  </p>

                  <div className="mb-6 rounded-lg border border-[#683201]/20 bg-[#F7B86C]/10 p-4">
                    <p className="text-sm mb-3">
                      Open the official Minor Participant Form PDF while completing this section.
                    </p>
                    <a
                      href="/assets/minorsForm.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-md bg-[#683201] px-4 py-2 text-white hover:brightness-90"
                    >
                      Open Minor Participant Form (PDF)
                    </a>
                  </div>

                  {minorsFormQuestions.map((obj, idx) => (
                    <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                  ))}
                </section>
              )}
              {registrationSection === 7 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full mx-auto rounded-2xl py-10 px-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Parental Consent Form</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Event Date: March 28, 2026
                    <br />
                    Location: The University of Texas at Dallas
                  </p>
                  <p className="text-md mb-2">
                    I, the parent/guardian of [Participant’s Name], give my permission for my child
                    to attend and participate in NTHS Hackathon. I understand that this event is
                    hosted at The University of Texas at Dallas and will include supervised
                    activities related to coding, design, and technology.
                    <br />I acknowledge that my child will be responsible for their own
                    transportation to and from the event (unless otherwise stated) and agree to the
                    event’s liability waiver and code of conduct policies.
                  </p>
                  <p className="text-md mb-2">
                    Emergency Contact Information & Consent Acknowledgment:
                  </p>

                  {parentalConsentQuestions.map((obj, idx) => (
                    <DisplayQuestion key={idx} obj={obj} values={values} onChange={handleChange} />
                  ))}
                </section>
              )}
              {/* Event Questions */}
              {registrationSection == 8 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950]">
                  <h2 className="sm:text-2xl text-xl font-semibold sm:mb-3 mb-1">Event Info</h2>
                  <div className="flex flex-col">
                    {/* apply styling issue fix, it's an ugly fix but this solve the styling issue */}
                    {eventInfoQuestions.map((obj, idx) => {
                      if (idx !== 0)
                        return (
                          <DisplayQuestion
                            key={idx}
                            obj={obj}
                            values={values}
                            onChange={handleChange}
                          />
                        );

                      return (
                        <div style={{ height: '56px' }} className="mb-8" key={idx}>
                          <DisplayQuestion
                            key={idx}
                            obj={obj}
                            values={values}
                            onChange={handleChange}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Submit */}
                  <div className="text-white absolute mt-4">
                    <button
                      type="submit"
                      className="mr-auto cursor-pointer px-4 py-2 rounded-lg bg-[#683201] hover:brightness-90"
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

              {/* Sponsor Questions */}
              {false && registrationSection == 4 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 w-full min-h-[35rem] mx-auto rounded-2xl md:py-10 py-6 px-8 mb-8 text-[#4C4950] relative">
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
                </section>
              )}
            </Form>
          )}
        </Formik>

        {/* Pagniation buttons */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
          className={`lg:block ${
            registrationSection == 0
              ? 'justify-end'
              : registrationSection >= 3
              ? 'justify-start'
              : 'justify-between'
          } lg:pb-4 pb-8 lg:px-4 sm:px-8 px-6 text-primaryDark font-semibold text-primaryDark font-semibold text-md`}
        >
          {registrationSection > 0 && (
            <div
              style={{ gridArea: '1 / 1 / 2 / 2' }}
              // className="lg:fixed 2xl:bottom-8 2xl:left-8 bottom-6 left-6 inline cursor-pointer select-none"
              onClick={() => {
                setRegistrationSection(registrationSection - 1);
              }}
            >
              <div
                style={{ width: 'fit-content' }}
                className="cursor-pointer select-none bg-[#683201] text-white rounded-md p-3"
              >
                <ChevronLeftIcon />
                prev page
              </div>
            </div>
          )}

          <div className="flex justify-center items-center" style={{ gridArea: '1 / 2 / 2 / 3' }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{ backgroundColor: registrationSection == i ? '#4C4950' : '#9F9EA7' }}
                className="rounded-full w-3 h-3 mr-2"
              />
            ))}
          </div>

          {registrationSection < 8 && (
            <div
              className="flex justify-end "
              style={{ gridArea: '1 / 3 / 2 / 4' }}
              onClick={() => {
                setRegistrationSection(registrationSection + 1);
              }}
            >
              <div className="cursor-pointer select-none bg-[#683201] text-white rounded-md p-3">
                next page
                <ChevronRightIcon />
              </div>
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
