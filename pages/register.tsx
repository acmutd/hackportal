import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const user = useUser();
  const router = useRouter();

  const { checkIfProfileExists, updateUser, isSignedIn } = useAuthContext();
  const [resumeFile, setResumeFile] = useState<File>();

  const checkRedirect = async () => {
    const hasProfile = await checkIfProfileExists();
    if (hasProfile) router.push('/profile');
    if (!isSignedIn) router.push('/auth');
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append(
        'fileName',
        `resume_${registrationData.user.firstName}_${registrationData.user.lastName}${getExtension(
          resumeFile.name,
        )}`,
      );
      await fetch('/api/resume/upload', {
        method: 'post',
        body: formData,
      });
      await RequestHelper.post<Registration, void>('/api/applications', {}, registrationData);
      updateUser(firebase.auth().currentUser);
      alert('Profile created successful');
      router.push('/profile');
    } catch (error) {
      console.log('Request creation error');
    }
  };

  const [registrationData, setRegistrationData] = useState<Registration>({
    id: user?.id || '',
    timestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
    user: {
      id: user?.id || '',
      preferredEmail: user?.preferredEmail || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      permissions: user?.permissions || ['hacker'],
    },
    age: 18,
    gender: 'Other',
    race: 'Indian',
    ethnicity: 'hispanic',
    university: '',
    major: '',
    studyLevel: 'freshman',
    hackathonExperience: 0,
    softwareExperience: 'Beginner',
    heardFrom: 'Instagram',
    size: 's',
    dietary: [],
    accomodations: '',
    github: '',
    linkedin: '',
    website: '',
    resume: '',
    companies: [],
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

  const updateDietary = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (registrationData.dietary.includes(e.target.name)) {
      setRegistrationData((prev) => ({
        ...prev,
        dietary: [...prev.dietary].filter((diet) => diet !== e.target.name),
      }));
    } else {
      setRegistrationData((prev) => ({
        ...prev,
        dietary: [...prev.dietary, e.target.name],
      }));
    }
  };

  const updateCompanies = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (registrationData.companies.includes(e.target.name as Companies)) {
      setRegistrationData((prev) => ({
        ...prev,
        companies: [...prev.companies].filter((company) => company !== e.target.name),
      }));
    } else {
      setRegistrationData((prev) => ({
        ...prev,
        companies: [...prev.companies, e.target.name as Companies],
      }));
    }
  };

  if (!user) {
    router.push('/');
  }

  return (
    <div className="flex flex-col flex-grow bg-white">
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
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
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
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
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
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                name="email"
                autoComplete="email"
                required
                value={registrationData.user.preferredEmail}
                onChange={(e) => updateUserData(e)}
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *Age:
              <br />
              <input
                placeholder="18"
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                name="age"
                type="number"
                min="0"
                max="100"
                value={registrationData.age}
                required
                onChange={(e) => updateRegistrationData(e)}
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *Gender:
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="gender"
                value={registrationData.gender}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="Other">Other</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="notSay">Prefer not to say</option>
              </select>
              <br />
              <br />
            </label>

            <label className="text-1xl font-bold font-small text-left">
              *Race:
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="race"
                required
                value={registrationData.race}
                onChange={(e) => updateRegistrationData(e)}
              >
                <option value="Indian">American Indian or Alaska Native</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black or African American</option>
                <option value="Pacific">Native Hawaiian or Other Pacific Islander</option>
                <option value="White">White</option>
              </select>
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *Ethnicity:
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="ethnicity"
                value={registrationData.ethnicity}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="hispanic">Hispanic or Latino</option>
                <option value="notHispanic">Not Hispanic or Latino</option>
              </select>
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
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
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
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
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
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
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
            <section id="registration">
              <div className="max-w-4xl py-4 pt-8 mx-auto text-2xl font-bold text-left">
                Hackathon Experience
              </div>
            </section>
            <label className="text-1xl my-4 font-bold font-small text-left">
              *How many hackathons have you attended before?
              <br />
              <input
                placeholder="0"
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                name="hackathonExperience"
                type="number"
                min="0"
                max="100"
                value={registrationData.hackathonExperience}
                onChange={(e) => updateRegistrationData(e)}
                required
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              *Relative software-building experience:
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="softwareExperience"
                value={registrationData.softwareExperience}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <br />
              <br />
            </label>

            {/*ORGANIZER CAN CUSTOMIZE DROPDOWN OPTIONS*/}
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Where did you hear about [HACKATHON NAME]?
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="heardFrom"
                value={registrationData.heardFrom}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Site">Event Site</option>
                <option value="Friend">Friend</option>
              </select>
              <br />
              <br />
            </label>
            <section id="registration">
              <div className="max-w-4xl py-4 pt-8 mx-auto text-2xl font-bold text-left">
                Event Info
              </div>
            </section>
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Shirt Size:
              <br />
              <select
                className="border min-w-50 px-2 text-grey-darkest absolute h-8 bg-indigo-100 rounded-md"
                name="size"
                value={registrationData.size}
                onChange={(e) => updateRegistrationData(e)}
                required
              >
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Allergies / Dietary Restrictions:
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Vegan"
                type="checkbox"
                checked={registrationData.dietary.includes('Vegan')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Vegan</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Vegitarian"
                type="checkbox"
                checked={registrationData.dietary.includes('Vegitarian')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Vegitarian</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Nuts"
                type="checkbox"
                checked={registrationData.dietary.includes('Nuts')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Nuts</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Fish"
                type="checkbox"
                checked={registrationData.dietary.includes('Fish')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Fish</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Wheat"
                type="checkbox"
                checked={registrationData.dietary.includes('Wheat')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Wheat</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Dairy"
                type="checkbox"
                checked={registrationData.dietary.includes('Dairy')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Dairy</p>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="Eggs"
                type="checkbox"
                checked={registrationData.dietary.includes('Eggs')}
                onChange={(e) => updateDietary(e)}
              />
              <p className="inline-block pl-2">Eggs</p>
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Anything else we can do to better accommodate you at our hackathon?
              <br />
              <textarea
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                placeholder="List any accessibility concerns here"
                name="accomodations"
                value={registrationData.accomodations}
                onChange={(e) => updateRegistrationData(e)}
              />
              <br />
              <br />
            </label>
            <section id="registration">
              <div className="max-w-4xl py-4 pt-8 mx-auto text-2xl font-bold text-left">
                Sponsor Info
              </div>
            </section>
            <label className="text-1xl my-4 font-bold font-small text-left">
              Github:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
                name="github"
                value={registrationData.github}
                onChange={(e) => updateRegistrationData(e)}
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              LinkedIn:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
                value={registrationData.linkedin}
                onChange={(e) => updateRegistrationData(e)}
                name="linkedin"
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Personal Website:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
                value={registrationData.website}
                onChange={(e) => updateRegistrationData(e)}
                name="website"
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Companies to send my resume to:
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="SF"
                type="checkbox"
                checked={registrationData.companies.includes('SF')}
                onChange={(e) => updateCompanies(e)}
              />
              <text className="pl-2">State Farm</text>
              <br />
            </label>
            <label>
              <input
                className="form-checkbox h-5 w-5"
                name="AA"
                type="checkbox"
                checked={registrationData.companies.includes('AA')}
                onChange={(e) => updateCompanies(e)}
              />
              <text className="pl-2">American Airlines</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="C1"
                type="checkbox"
                checked={registrationData.companies.includes('C1')}
                onChange={(e) => updateCompanies(e)}
              />
              <text className="pl-2">Capital One</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="EB"
                type="checkbox"
                checked={registrationData.companies.includes('EB')}
                onChange={(e) => updateCompanies(e)}
              />
              <text className="pl-2">Ebay</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="FB"
                type="checkbox"
                checked={registrationData.companies.includes('FB')}
                onChange={(e) => updateCompanies(e)}
              />
              <text className="pl-2">Facebook</text>
              <br />
              <br />
            </label>

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
