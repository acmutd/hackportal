import schools from './public/schools.json';
import majors from './public/majors.json';

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
            options: schools.map(({ university }) => ({
              title: university,
              value: university,
            })),
            initialValue: '',
          },
          {
            //Major question
            question: 'All majors are welcome at this event. What is your major?',
            id: 'major',
            name: 'major',
            required: true,
            datalist: 'majors',
            options: majors.map(({ major }) => ({
              title: major,
              value: major,
            })),
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
  timestamp: Record<string, number>;
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
  timestamp: 'Registration Time',
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
  options: Array<{
    title: string;
    value: string;
  }>;
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
