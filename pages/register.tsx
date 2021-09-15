import Head from 'next/head';
import React, { useState } from 'react';
import { useUser } from '../lib/profile/user-data';
import { useAuthContext } from '../lib/user/AuthContext';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  // React controlled components
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [uni, setUni] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [hackathonExperience, setHackathonExperience] = useState('');
  const [heardFrom, setHeardFrom] = useState('');
  const [shirtSize, setShirtSize] = useState('');
  const [softwareExperience, setSoftwareExperience] = useState('');
  const [accommodations, setAccommodations] = useState('');
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [allergiesList, setAllergiesList] = useState(new Array(allergies.length).fill(false));

  const [companiesList, setCompaniesList] = useState(new Array(companies.length).fill(false));

  const handleOnChange = (position, stateList, setStateList) => {
    const updatedCheckedState = stateList.map((item, index) => (index === position ? !item : item));
    setStateList(updatedCheckedState);
  };

  // Check if user signed in here
  const { isSignedIn } = useAuthContext();
  const user = useUser();

  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();

    // Check if user signed in
    if (!isSignedIn || !user) {
      alert('Please sign in!');
      return 0;
    }

    // Convert dietary and companies from bools to names
    let finalAllergiesList: Array<string> = [];
    let finalCompaniesList: Array<string> = [];
    for (let i = 0; i < allergies.length; i++) {
      if (allergiesList[i] === true) {
        finalAllergiesList.push(allergies[i]['name']);
      }
    }
    for (let i = 0; i < companies.length; i++) {
      if (companiesList[i] === true) {
        finalCompaniesList.push(companies[i]['name']);
      }
    }

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      age: age,
      gender: gender,
      race: race,
      ethnicity: ethnicity,
      university: uni,
      major: major,
      year: year,
      hackathonExperience: hackathonExperience,
      heardFrom: heardFrom,
      shirtSize: shirtSize,
      softwareExperience: softwareExperience,
      allergies: finalAllergiesList,
      accommodations: accommodations,
      github: github,
      linkedin: linkedin,
      website: website,
      companies: finalCompaniesList,
    };

    // TODO: Implement loading resume

    await fetch('/api/applications', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }).then((result) => {
      if (result.status === 201) {
        alert('Your application has been submitted.');
      } else if (result.status === 500) {
        alert('Server error!');
      } else {
        console.warn('Submission failed.', result);
      }
    });

    // Send email
    await fetch('/api/email', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }).then((result) => {
      if (result.status === 201) {
        alert('Email confirmation sent');
      } else if (result.status === 500) {
        alert('Server error!');
      } else {
        console.warn('Submission failed.', result);
      }
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
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <label className="text-1xl my-4 font-bold font-small text-left">
              *Enter your first name:
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                placeholder="John"
                type="text"
                name="1name"
                autoComplete="given-name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
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
                name="2name"
                autoComplete="family-name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
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
                value={race}
                onChange={(e) => setRace(e.target.value)}
                required
              >
                <option value="">Select an option</option>
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
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                required
              >
                <option value="">Select an option</option>
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
                value={uni}
                onChange={(e) => setUni(e.target.value)}
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
                value={major}
                onChange={(e) => setMajor(e.target.value)}
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
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Select an option</option>
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
                name="numhackathon"
                type="number"
                min="0"
                max="100"
                value={hackathonExperience}
                onChange={(e) => setHackathonExperience(e.target.value)}
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
                name="experience"
                value={softwareExperience}
                onChange={(e) => setSoftwareExperience(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermedate">Intermedate</option>
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
                name="heard"
                value={heardFrom}
                onChange={(e) => setHeardFrom(e.target.value)}
                required
              >
                <option value="">Select an option</option>
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
                value={shirtSize}
                onChange={(e) => setShirtSize(e.target.value)}
                required
              >
                <option value="">Select an option</option>
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

            {allergies.map(({ name }, index) => {
              return (
                <div className="toppings-list-item" key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      key={`custom-checkbox-${index}`}
                      name={name}
                      // value={name}
                      checked={allergiesList[index]}
                      onChange={() => handleOnChange(index, allergiesList, setAllergiesList)}
                    />
                    <text className="pl-2"> {name} </text>
                  </div>
                </div>
              );
            })}

            {/* <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Vegan" type="checkbox" />
              <text className="pl-2">Vegan</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Vegitarian" type="checkbox" />
              <text className="pl-2">Vegitarian</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Nuts" type="checkbox" />
              <text className="pl-2">Nuts</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Fish" type="checkbox" />
              <text className="pl-2">Fish</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Wheat" type="checkbox" />
              <text className="pl-2">Wheat</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Dairy" type="checkbox" />
              <text className="pl-2">Dairy</text>
            </label>
            <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Eggs" type="checkbox" />
              <text className="pl-2">Eggs</text>
              <br />
              <br />
            </label> */}

            <label className="text-1xl my-4 font-bold font-small text-left">
              Anything else we can do to better accomodate you at our hackathon?
              <br />
              <textarea
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                placeholder="List any accessibility concerns here"
                value={accommodations}
                onChange={(e) => setAccommodations(e.target.value)}
                name="accessibility"
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
                value={github}
                onChange={(e) => setGithub(e.target.value)}
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
                name="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
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
                name="site"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Companies to send my resume to:
            </label>

            {companies.map(({ name }, index) => {
              return (
                <div className="toppings-list-item" key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      // value={name}
                      checked={companiesList[index]}
                      onChange={() => handleOnChange(index, companiesList, setCompaniesList)}
                    />
                    <text className="pl-2"> {name} </text>
                  </div>
                </div>
              );
            })}

            {/* <label>
              <br />
              <input className="form-checkbox h-5 w-5" name="Google" type="checkbox" />
              <text className="pl-2">Google</text>
              <br />
            </label>
            <label>
              <input className="form-checkbox h-5 w-5" name="Ebay" type="checkbox" />
              <text className="pl-2">Ebay</text>
              <br />
              <br />
            </label> */}

            <label>
              Upload your resume:
              <br />
              <input name="resume" type="file" />
              <br />
            </label>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
              type="submit"
            >
              Test
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// Not sure where to put this
export const allergies = [
  {
    name: 'Vegan',
  },
  {
    name: 'Vegetarian',
  },
  {
    name: 'Nuts',
  },
  {
    name: 'Wheat',
  },
  {
    name: 'Fish',
  },
  {
    name: 'Dairy',
  },
  {
    name: 'Eggs',
  },
];

/* 
Hard coded as of now; cool if sponsers can add list of sponsers dynamically
 - maybe store that info on Firestore
*/

export const companies = [
  {
    name: 'Google',
  },
  {
    name: 'Facebook',
  },
  {
    name: 'eBay',
  },
  {
    name: 'Amazon',
  },
  {
    name: 'Texas Instruments',
  },
  {
    name: 'Gamestop',
  },
  {
    name: '',
  },
];
