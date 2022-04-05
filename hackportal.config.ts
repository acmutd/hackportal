export const hackPortalConfig: HackPortalConfig = {
  registrationFields: {
    //Question Topic
    generalQuestions: [
      {
        textInputQuestions: [
          {
            question: 'First Name',
            id: 'firstName',
            name: 'user.firstName',
            required: true,
          },
          {
            question: 'Last Name',
            id: 'lastName',
            name: 'user.lastName',
            required: true,
          },
          {
            question: 'Email',
            id: 'email',
            name: 'user.preferredEmail',
            required: true,
          },
        ],
      },
      {
        numberInputQuestions: [
          {
            question: 'Age',
            required: true,
            id: 'age',
            name: 'age',
            min: '1',
            max: '100',
            pattern: '[0-9]+',
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            question: 'Gender',
            required: true,
            id: 'gender',
            name: 'gender',
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
            question: 'Race',
            required: true,
            id: 'race',
            name: 'race',
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
            question: 'Ethnicity',
            required: true,
            id: 'ethnicity',
            name: 'ethnicity',
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
            question:
              'This event is for college students worldwide. Which university do you attend?',
            id: 'university',
            name: 'university',
            required: true,
            datalist: 'schools',
          },
          {
            question: 'All majors are welcome at this event. What is your major?',
            id: 'major',
            name: 'major',
            required: true,
            datalist: 'majors',
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            question: 'Current level of study',
            required: true,
            id: 'studyLevel',
            name: 'studyLevel',
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
            question: 'How many hackathons have you attended before?',
            required: true,
            id: 'hackathonExperience',
            name: 'hackathonExperience',
            min: '0',
            max: '100',
            pattern: '[0-9]+',
          },
        ],
      },
      {
        dropdownQuestions: [
          {
            question: 'Relative software-building experience:',
            required: true,
            id: 'softwareExperience',
            name: 'softwareExperience',
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
            question: 'Where did you hear about HackPortal?',
            required: true,
            id: 'heardFrom',
            name: 'heardFrom',
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
            question: 'Shirt Size',
            required: true,
            id: 'size',
            name: 'size',
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
            question: 'Allergies / Dietary Restrictions:',
            required: false,
            id: 'dietary',
            name: 'dietary',
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
            question: 'Anything else we can do to better accommodate you at our hackathon?',
            id: 'accomodations',
            name: 'accomodations',
            required: false,
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
            question: 'Github:',
            id: 'github',
            name: 'github',
            required: false,
          },
          {
            question: 'LinkedIn:',
            id: 'linkedin',
            name: 'linkedin',
            required: false,
          },
          {
            question: 'Personal Website:',
            id: 'website',
            name: 'website',
            required: false,
          },
        ],
      },
      {
        checkboxQuestions: [
          {
            question: 'Companies to send my resume to:',
            required: false,
            id: 'companies',
            name: 'companies',
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
