import Head from 'next/head';
import React from 'react';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
    console.log(data);
    console.info(formData.get('id'));
    const application: WithId<Registration> = {
      id: 'temporary',
      timestamp: new Date().getUTCMilliseconds(),
      user: {
        id: 'fake id',
        permissions: [],
        firstName: data.fname,
        lastName: data.lname,
        preferredEmail: data.email,
      },
      age: data.age,
      gender: data.gender,
      race: data.race,
      ethnicity: data.ethnicity,
      university: data.university,
      major: data.major,
      studyLevel: data.studyLevel,
      hackathonExperience: data.hackathonExperience,
      softwareExperience: data.softwareExperience,
      heardFrom: data.heardFrom,
      size: data.size,
      dietary: formData.getAll('dietary') as [],
      accommodations: data.accommodations,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
      resume: data.resume,
      companies: formData.getAll('companies') as [],
      claims: [],
    };

    //get data out of form
    //make post request to api
    fetch('/api/applications', {
      body: JSON.stringify(application),
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
                name="fname"
                autoComplete="given-name"
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
                name="lname"
                autoComplete="family-name"
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
                name="dietary"
                value="vegan"
                type="checkbox"
              />
              <text className="pl-2">Vegan</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="vegetarian"
                type="checkbox"
              />
              <text className="pl-2">Vegetarian</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="nuts"
                type="checkbox"
              />
              <text className="pl-2">Nuts</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="fish"
                type="checkbox"
              />
              <text className="pl-2">Fish</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="wheat"
                type="checkbox"
              />
              <text className="pl-2">Wheat</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="dairy"
                type="checkbox"
              />
              <text className="pl-2">Dairy</text>
            </label>
            <label>
              <br />
              <input
                className="form-checkbox h-5 w-5"
                name="dietary"
                value="eggs"
                type="checkbox"
              />
              <text className="pl-2">Eggs</text>
              <br />
              <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Anything else we can do to better accommodate you at our hackathon?
              <br />
              <textarea
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                placeholder="List any accessibility concerns here"
                name="accommodations"
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
                name="companies"
                value="Google"
                type="checkbox"
              />
              <text className="pl-2">Google</text>
              <br />
            </label>
            <label>
              <input
                className="form-checkbox h-5 w-5"
                name="companies"
                value="eBay"
                type="checkbox"
              />
              <text className="pl-2">Ebay</text>
              <br />
              <br />
            </label>

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
