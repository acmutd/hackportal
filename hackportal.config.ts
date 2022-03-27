export const hackPortalConfig: HackPortalConfig = {
  registrationFields: {
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
    ],
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
};

export interface HackPortalConfig {
  registrationFields: {
    checkboxQuestions: CheckboxQuestion[];
    dropdownQuestions: DropdownQuestion[];
    textInputQuestions: RegistrationQuestion[];
    numberInputQuestions: NumberInputQuestion[];
  };
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
