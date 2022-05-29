export const hackPortalConfig: HackPortalConfig = {
  //registration fields are separated by question topics (general, school, hackathon experience, etc. )
  //each question topic is separated by question types(textInput, numberInput, dropdown, etc. )
  //  which hold all the questions of that type
  //add extra questions types(even ones already used) to question topics and add more questions under each question type
  //questions are displayed on page in order
  registrationFields: {
    //Question Topic
    generalQuestions: [
      {
        textInputQuestions: [
          {
            //don't remove; for user account info
            question: 'First Name',
            id: 'firstName',
            name: 'firstName',
            required: true,
            initialValue: '',
          },
          {
            //don't remove; for user account info
            question: 'Last Name',
            id: 'lastName',
            name: 'lastName',
            required: true,
            initialValue: '',
          },
          {
            //don't remove; for user account info
            question: 'Email',
            id: 'email',
            name: 'preferredEmail',
            required: true,
            initialValue: '',
          },
        ],
      },
      {
        numberInputQuestions: [
          {
            //Age question
            question: 'Age',
            required: true,
            id: 'age',
            name: 'age',
            min: '1',
            max: '100',
            pattern: '[0-9]+',
            initialValue: null,
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            //Gender question
            question: 'Gender',
            required: true,
            id: 'gender',
            name: 'gender',
            initialValue: '',
            options: [
              {
                title: 'Female',
                value: 'Female',
              },
              {
                title: 'Male',
                value: 'Male',
              },
              {
                title: 'Other',
                value: 'Other',
              },
              {
                title: 'Prefer not to say',
                value: 'notSay',
              },
            ],
          },
          {
            //Race question
            question: 'Race',
            required: true,
            id: 'race',
            name: 'race',
            initialValue: '',
            options: [
              {
                title: 'Native American',
                value: 'Native American',
              },
              {
                title: 'Asian/Pacific Islander',
                value: 'Asian',
              },
              {
                title: 'Black or African American',
                value: 'Black',
              },
              {
                title: 'Hispanic',
                value: 'Hispanic',
              },
              {
                title: 'White/Caucasian',
                value: 'White',
              },
              {
                title: 'Multiple/Other',
                value: 'Other',
              },
              {
                title: 'Prefer not to answer',
                value: 'notSay',
              },
            ],
          },
          {
            //Ethnicity question
            question: 'Ethnicity',
            required: true,
            id: 'ethnicity',
            name: 'ethnicity',
            initialValue: '',
            options: [
              {
                title: 'Hispanic or Latino',
                value: 'hispanic',
              },
              {
                title: 'Not Hispanic or Latino',
                value: 'notHispanic',
              },
            ],
          },
        ],
      },
    ],
    //Question Topic
    schoolQuestions: [
      {
        datalistQuestions: [
          {
            //University question
            question:
              'This event is for college students worldwide. Which university do you attend?',
            id: 'university',
            name: 'university',
            required: true,
            datalist: 'schools',
            initialValue: '',
          },
          {
            //Major question
            question: 'All majors are welcome at this event. What is your major?',
            id: 'major',
            name: 'major',
            required: true,
            datalist: 'majors',
            initialValue: '',
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            //Grade question
            question: 'Current level of study',
            required: true,
            id: 'studyLevel',
            name: 'studyLevel',
            initialValue: '',
            options: [
              {
                title: 'Freshman',
                value: 'freshman',
              },
              {
                title: 'Sophomore',
                value: 'sophomore',
              },
              {
                title: 'Junior',
                value: 'junior',
              },
              {
                title: 'Senior',
                value: 'senior',
              },
              {
                title: 'Graduate Student',
                value: 'grad',
              },
            ],
          },
        ],
      },
    ],
    //Question Topic
    hackathonExperienceQuestions: [
      {
        numberInputQuestions: [
          {
            //Hackathons attended question
            question: 'How many hackathons have you attended before?',
            required: true,
            id: 'hackathonExperience',
            name: 'hackathonExperience',
            min: '0',
            max: '100',
            pattern: '[0-9]+',
            initialValue: null,
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            //Experience question
            question: 'Relative software-building experience:',
            required: true,
            id: 'softwareExperience',
            name: 'softwareExperience',
            initialValue: '',
            options: [
              {
                title: 'Beginner',
                value: 'Beginner',
              },
              {
                title: 'Intermediate',
                value: 'Intermediate',
              },
              {
                title: 'Advanced',
                value: 'Advanced',
              },
              {
                title: 'Expert',
                value: 'Expert',
              },
            ],
          },
          {
            //Heard from question
            question: 'Where did you hear about HackPortal?',
            required: true,
            id: 'heardFrom',
            name: 'heardFrom',
            initialValue: '',
            options: [
              {
                title: 'Instagram',
                value: 'Instagram',
              },
              {
                title: 'Twitter',
                value: 'Twitter',
              },
              {
                title: 'Event Site',
                value: 'Event Site',
              },
              {
                title: 'Friend',
                value: 'Friend',
              },
              {
                title: 'Other',
                value: 'Other',
              },
            ],
          },
        ],
      },
    ],
    //Question Topic
    eventInfoQuestions: [
      {
        dropdownQuestions: [
          {
            //Shirt size question
            question: 'Shirt Size',
            required: true,
            id: 'size',
            name: 'size',
            initialValue: '',
            options: [
              {
                title: 'S',
                value: 's',
              },
              {
                title: 'M',
                value: 'm',
              },
              {
                title: 'L',
                value: 'l',
              },
              {
                title: 'XL',
                value: 'xl',
              },
            ],
          },
        ],
      },
      {
        checkboxQuestions: [
          {
            //Allergies question
            question: 'Allergies / Dietary Restrictions:',
            required: false,
            id: 'dietary',
            name: 'dietary',
            initialValue: [],
            options: [
              {
                title: 'Vegan',
                value: 'Vegan',
              },
              {
                title: 'Vegetarian',
                value: 'Vegetarian',
              },
              {
                title: 'Nuts',
                value: 'Nuts',
              },
              {
                title: 'Fish',
                value: 'Fish',
              },
              {
                title: 'Wheat',
                value: 'Wheat',
              },
              {
                title: 'Dairy',
                value: 'Dairy',
              },
              {
                title: 'Eggs',
                value: 'Eggs',
              },
            ],
          },
        ],
      },
      {
        textAreaQuestions: [
          {
            //Accomodations question
            question: 'Anything else we can do to better accommodate you at our hackathon?',
            id: 'accomodations',
            name: 'accomodations',
            required: false,
            initialValue: '',
            placeholder: 'List any accessibility concerns here',
          },
        ],
      },
    ],
    //Question Topic
    sponsorInfoQuestions: [
      {
        textInputQuestions: [
          {
            //Github question
            question: 'Github:',
            id: 'github',
            name: 'github',
            required: false,
            initialValue: '',
          },
          {
            //LinkedIn question
            question: 'LinkedIn:',
            id: 'linkedin',
            name: 'linkedin',
            required: false,
            initialValue: '',
          },
          {
            //Website question
            question: 'Personal Website:',
            id: 'website',
            name: 'website',
            required: false,
            initialValue: '',
          },
        ],
      },
      {
        checkboxQuestions: [
          {
            //Companies question
            question: 'Companies to send my resume to:',
            required: false,
            id: 'companies',
            name: 'companies',
            initialValue: [],
            options: [
              {
                title: 'State Farm',
                value: 'State Farm',
              },
              {
                title: 'American Airlines',
                value: 'American Airlines',
              },
              {
                title: 'Capital One',
                value: 'Capital One',
              },
              {
                title: 'Ebay',
                value: 'Ebay',
              },
              {
                title: 'Facebook',
                value: 'Facebook',
              },
            ],
          },
        ],
      },
    ],
  },
  keynoteSpeakers: [
    {
      description:
        'Recipient of the Super Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers.',
      fileName: 'SteveRogers.jpg',
      name: 'Steve Rogers',
    },
    {
      description:
        'Previously on the HackUTD team, Sameer figured it was time to move on to bigger things. He moved to the HackPortal team and does not regret the decision.',
      fileName: '',
      name: 'Sameer',
    },
    {
      description:
        'Sometimes student, sometimes scientist and sometimes photographer, Peter Parker is a full-time super hero better known as the web-slinging and wall-crawling Spider-Man. At a science expo, Peter was bitten by an errant radioactive spider which granted him an array of arachnid powers',
      fileName: 'PeterParker.jpg',
      name: 'Peter Parker',
    },
    {
      description:
        'Anthony Edward "Tony" Stark was a billionaire industrialist, a founding member of the Avengers, and the former CEO of Stark Industries. A brash but brilliant inventor, Stark was self-described as a genius, billionaire, playboy, and philanthropist.',
      fileName: 'TonyStark.jpg',
      name: 'Tony Stark',
    },
    {
      description: 'Minecraft Legend',
      fileName: 'nam.png',
      name: 'Nam',
    },
  ],
  teamMembers: [
    {
      name: 'Very Long Name McFlurry',
      fileName: 'f-erb.jpeg',
      description: 'Mentor',
    },
    {
      rank: 0,
      name: 'Mr. Director Man',
      personalSite: 'https://realhappinessproject.org',
      github: 'https://github.com/acmutd/hackportal',
      description: 'Director',
      fileName: 'director.png',
      linkedin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      fileName: 'harrietupp.jpg',
      name: 'Harriet Upp',
      rank: 1,
      description: 'Experience Lead',
    },
    {
      description: 'Tech Lead',
      rank: 1,
      linkedin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      github: 'https://github.com/acmutd/hackportal',
      name: 'Abdullah Hasani',
      fileName: 'abdullahhasani.png',
    },
    {
      description: 'Logistics Lead',
      rank: 1,
      name: 'Justin Time',
      fileName: 'justintime.jpg',
      github: 'https://github.com/acmutd/hackportal',
    },
    {
      rank: '2',
      name: 'Fan E. Pack',
      description: 'Tech',
    },
    {
      description: 'Experience',
      rank: '4',
      fileName: 'faydaway.jpg',
      name: 'Fay Daway',
    },
    {
      github: 'https://github.com/acmutd/hackportal',
      description: 'Tech',
      rank: 2,
      name: 'Dee End',
      fileName: 'deeend.jpg',
      linkedin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      description: 'Industry',
      rank: 5,
      fileName: 'hankrcheef.jpg',
      name: 'Hank R. Cheef',
    },
    {
      name: 'Teri Dactyl',
      linkedin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      fileName: 'teridactyl.jpg',
      rank: 1,
      description: 'Industry Lead',
    },
    {
      description: 'Logistics',
      rank: 3,
      fileName: 'annetdote.png',
      name: 'Anne T. Dote',
      linkedin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      github: 'https://github.com/acmutd/hackportal',
    },
  ],
  sponsors: [
    {
      reference: 'ebayLogo.png',
    },
    {
      link: 'https://acmutd.co/',
      reference: 'DevBlack.png',
    },
    {
      reference: 'match.png',
    },
    {
      reference: 'state-farm.png',
    },
    {
      link: 'https://acmutd.co/',
      reference: 'HackutdBlack.png',
    },
  ],
};

//add any question data that your org would like to see on the admin stats page
export type statRecordTypes = {
  //name: Record<string || number, number>
  age: Record<number, number>;
  companies: Record<string, number>;
  dietary: Record<string, number>;
  ethnicity: Record<string, number>;
  race: Record<string, number>;
  size: Record<string, number>;
  softwareExperience: Record<string, number>;
  studyLevel: Record<string, number>;
  university: Record<string, number>;
  gender: Record<string, number>;
  hackathonExperience: Record<number, number>;
  heardFrom: Record<string, number>;
};

//add the title for each field that will be displayed as chart titles in admin stats page
export const fieldNames = {
  //name: title
  age: 'Age',
  ethnicity: 'Ethnicity',
  race: 'Race',
  size: 'Shirt Size',
  softwareExperience: 'Software Experience',
  studyLevel: 'Study Level',
  university: 'University',
  gender: 'Gender',
  hackathonExperience: 'Number of Hackathon attended',
  heardFrom: 'Heard of Hackathon from',
  scans: 'Swags', //not part of registration questions, used for scanner
  companies: 'Companies',
  dietary: 'Dietary',
};

//name fields that are checkbox questions belong here
export const arrayField = ['scans', 'companies', 'dietary'];
//any other fields belong here
export const singleField = [
  'age',
  'ethnicity',
  'race',
  'size',
  'softwareExperience',
  'studyLevel',
  'university',
  'gender',
  'hackathonExperience',
  'heardFrom',
];

//not to be edited ⬇︎ (unless there needs to be more question topics)
export interface HackPortalConfig {
  keynoteSpeakers: KeynoteSpeaker[];
  teamMembers: Partial<TeamMember>[];
  sponsors: Partial<Sponsor>[];
  registrationFields: {
    generalQuestions: QuestionTypes[];
    schoolQuestions: QuestionTypes[];
    hackathonExperienceQuestions: QuestionTypes[];
    eventInfoQuestions: QuestionTypes[];
    sponsorInfoQuestions: QuestionTypes[];
  };
}

interface QuestionTypes {
  checkboxQuestions?: CheckboxQuestion[];
  dropdownQuestions?: DropdownQuestion[];
  textInputQuestions?: RegistrationQuestion[];
  numberInputQuestions?: NumberInputQuestion[];
  datalistQuestions?: datalistQuestion[];
  textAreaQuestions?: textAreaQuestion[];
}

interface RegistrationQuestion {
  question: string;
  id: string;
  name: string;
  required: boolean;
  initialValue: any; //value that will be first presented on the form
}

interface CheckboxQuestion extends RegistrationQuestion {
  options: Array<{
    title: string;
    value: string;
  }>;
}

interface DropdownQuestion extends RegistrationQuestion {
  options: Array<{
    title: string;
    value: string;
  }>;
}

interface NumberInputQuestion extends RegistrationQuestion {
  min: string;
  max: string;
  pattern: string;
}

interface datalistQuestion extends RegistrationQuestion {
  datalist: string;
}

interface textAreaQuestion extends RegistrationQuestion {
  placeholder: string;
}

//extracting initial values
var InitialValues: any = {};
const getInitialValues = () => {
  for (let obj of hackPortalConfig.registrationFields.generalQuestions) {
    setInitialValues(obj);
  }
  for (let obj of hackPortalConfig.registrationFields.schoolQuestions) {
    setInitialValues(obj);
  }
  for (let obj of hackPortalConfig.registrationFields.hackathonExperienceQuestions) {
    setInitialValues(obj);
  }
  for (let obj of hackPortalConfig.registrationFields.eventInfoQuestions) {
    setInitialValues(obj);
  }
  for (let obj of hackPortalConfig.registrationFields.sponsorInfoQuestions) {
    setInitialValues(obj);
  }
  return InitialValues;
};
const setInitialValues = (obj) => {
  if (obj.textInputQuestions)
    for (let inputObj of obj.textInputQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
  if (obj.numberInputQuestions)
    for (let inputObj of obj.numberInputQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
  if (obj.dropdownQuestions)
    for (let inputObj of obj.dropdownQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
  if (obj.checkboxQuestions)
    for (let inputObj of obj.checkboxQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
  if (obj.datalistQuestions)
    for (let inputObj of obj.datalistQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
  if (obj.textAreaQuestions)
    for (let inputObj of obj.textAreaQuestions) {
      InitialValues[inputObj.name] = inputObj.initialValue;
    }
};

export const formInitialValues = getInitialValues();

//extracting statRecords for general stats
const getStatRecords = () => {
  let records: any = {};
  for (const field in fieldNames) {
    records[field] = {};
  }
  return records;
};
export const statRecords: statRecordTypes = getStatRecords();
