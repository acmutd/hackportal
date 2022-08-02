import {
  hackPortalConfig,
  RegistrationQuestion,
  DropdownQuestion,
  QuestionTypes,
  CheckboxQuestion,
  DateRange,
} from '../hackportal.config';
import * as fs from 'fs';

interface ParsedSection {
  singleTextFields: string[];
  singleNumberFields: string[];
  dropdownFields: Array<{ name: string; options: string[] }>;
  checkboxFields: Array<{ name: string; options: string[] }>;
  availabilityTimesFields: string[];
}

const {
  eventInfoQuestions,
  generalQuestions,
  hackathonExperienceQuestions,
  schoolQuestions,
  sponsorInfoQuestions,
  availabilityInfoQuestions,
} = hackPortalConfig.registrationFields;

function parseMultipleChoiceQuestion(
  questions: DropdownQuestion[] | CheckboxQuestion[] | undefined,
) {
  if (!questions) return [];
  return questions.map((question) => ({
    name: question.name,
    options: question.options.map((option) => option.value),
  }));
}

function parseSingleValueQuestion(questions: RegistrationQuestion[] | undefined) {
  if (!questions) return [];
  return questions.map((question) => question.name);
}

function parseAvailabilityTimesQuestion(questions: RegistrationQuestion[] | undefined) {
  if (!questions) return [];
  return questions.map((question) => question.name);
}

function parseSection(section: QuestionTypes[]): ParsedSection {
  return {
    singleTextFields: section.reduce((acc, curr) => {
      return [
        ...acc,
        ...parseSingleValueQuestion(curr.textInputQuestions),
        ...parseSingleValueQuestion(curr.datalistQuestions),
        ...parseSingleValueQuestion(curr.textAreaQuestions),
      ];
    }, []),
    singleNumberFields: section.reduce((acc, curr) => {
      return [...acc, ...parseSingleValueQuestion(curr.numberInputQuestions)];
    }, []),
    dropdownFields: section.reduce((acc, curr) => {
      return [...acc, ...parseMultipleChoiceQuestion(curr.dropdownQuestions)];
    }, []),
    checkboxFields: section.reduce((acc, curr) => {
      return [...acc, ...parseMultipleChoiceQuestion(curr.checkboxQuestions)];
    }, []),
    availabilityTimesFields: section.reduce((acc, curr) => {
      return [...acc, ...parseAvailabilityTimesQuestion(curr.availabilityTimesQuestions)];
    }, []),
  };
}

function generateSingleFieldRecordTypeDefinition(fieldArray: string[], dataType: string): string {
  if (fieldArray.length === 0) return '';
  return (
    fieldArray
      .map((field) => `${field}?: Record<${dataType}, number>`)
      .join('; ')
      .trim() + ';'
  );
}

function generateMultipleChoiceFieldRecordTypeDefinition(
  fieldArray: Array<{ name: string; options: string[] }>,
): string {
  if (fieldArray.length === 0) return '';
  return (
    fieldArray
      .map(
        ({ name, options }) =>
          `${name}?: Record<${options.map((option) => `"${option}"`).join('|')}, number>`,
      )
      .join('; ')
      .trim() + ';'
  );
}

function generateAvailabilityTimesTypeDefinition(fieldArray: string[]): string {
  if (fieldArray.length === 0) return '';
  return (
    fieldArray
      .map((field) => `${field}?: DateRange[]`)
      .join('; ')
      .trim() + ';'
  );
}

function generateSingleFieldTypeDefinition(fieldArray: string[], dataType: string): string {
  if (fieldArray.length === 0) return '';
  return (
    fieldArray
      .map((field) => `${field}?: ${dataType}`)
      .join('; ')
      .trim() + ';'
  );
}

function generateCheckboxTypeDefinition(
  fieldArray: Array<{ name: string; options: string[] }>,
): string {
  if (fieldArray.length === 0) return '';
  return (
    fieldArray
      .map(
        ({ name, options }) =>
          `${name}?: Array<${options.map((option) => `"${option}"`).join('|')}>`,
      )
      .join('; ')
      .trim() + ';'
  );
}

function generateDropdownTypeDefinition(
  fieldArray: Array<{ name: string; options: string[] }>,
): string {
  return (
    fieldArray
      .map(({ name, options }) => `${name}?: ${options.map((option) => `"${option}"`).join('|')}`)
      .join('; ')
      .trim() + ';'
  );
}

const unnecessaryFields = ['firstName', 'lastName', 'preferredEmail'];
const createParsedSection = (sections: ParsedSection[]) => {
  return sections.reduce(
    (acc, curr) => {
      // console.log(curr.availabilityTimesFields);
      return {
        singleNumberFields: [...acc.singleNumberFields, ...curr.singleNumberFields].filter(
          (field) => unnecessaryFields.indexOf(field) === -1,
        ),
        singleTextFields: [...acc.singleTextFields, ...curr.singleTextFields].filter(
          (field) => unnecessaryFields.indexOf(field) === -1,
        ),
        checkboxFields: [...acc.checkboxFields, ...curr.checkboxFields],
        dropdownFields: [...acc.dropdownFields, ...curr.dropdownFields],
        availabilityTimesFields: [...acc.availabilityTimesFields, ...curr.availabilityTimesFields],
      };
    },
    {
      singleNumberFields: [],
      singleTextFields: [],
      checkboxFields: [],
      dropdownFields: [],
      availabilityTimesFields: [],
    } as ParsedSection,
  );
};
function main() {
  const parsedHackerSection = createParsedSection([
    parseSection(generalQuestions),
    parseSection(eventInfoQuestions),
    parseSection(hackathonExperienceQuestions),
    parseSection(schoolQuestions),
    parseSection(sponsorInfoQuestions),
  ]);

  const parsedMentorSection = createParsedSection([
    parseSection(generalQuestions),
    parseSection(availabilityInfoQuestions),
  ]);

  const parsedVolunteerSection = createParsedSection([
    parseSection(generalQuestions),
    parseSection(eventInfoQuestions),
    parseSection(hackathonExperienceQuestions),
    parseSection(schoolQuestions),
    parseSection(sponsorInfoQuestions),
    parseSection(availabilityInfoQuestions),
  ]);
  const DateRangeTypeDefinition: string = `export type DateRange = { start: Date; end: Date };`;

  const hackerRegistrationTypeDefinition = `export interface HackerRegistration {
    ${generateSingleFieldTypeDefinition(parsedHackerSection.singleTextFields, 'string')}
    ${generateSingleFieldTypeDefinition(parsedHackerSection.singleNumberFields, 'number')}
    ${generateCheckboxTypeDefinition(parsedHackerSection.checkboxFields)}
    ${generateDropdownTypeDefinition(parsedHackerSection.dropdownFields)}
    ${generateAvailabilityTimesTypeDefinition(parsedHackerSection.availabilityTimesFields)}
    id: string;
    resume?: string;
    scans: string[];
    timestamp: number;
    user: {
        firstName: string;
        lastName: string;
        id: string;
        permissions: string[];
    }
}`;

  const mentorRegistrationTypeDefinition = `export interface MentorRegistration {
  ${generateSingleFieldTypeDefinition(parsedMentorSection.singleTextFields, 'string')}
  ${generateSingleFieldTypeDefinition(parsedMentorSection.singleNumberFields, 'number')}
  ${generateCheckboxTypeDefinition(parsedMentorSection.checkboxFields)}
  ${generateDropdownTypeDefinition(parsedMentorSection.dropdownFields)}
  ${generateAvailabilityTimesTypeDefinition(parsedMentorSection.availabilityTimesFields)}
  id: string;
  resume?: string;
  scans: string[];
  timestamp: number;
  user: {
      firstName: string;
      lastName: string;
      id: string;
      permissions: string[];
  }
}`;
  const volunteerRegistrationTypeDefinition = `export interface VolunteerRegistration {
  ${generateSingleFieldTypeDefinition(parsedVolunteerSection.singleTextFields, 'string')}
  ${generateSingleFieldTypeDefinition(parsedVolunteerSection.singleNumberFields, 'number')}
  ${generateCheckboxTypeDefinition(parsedVolunteerSection.checkboxFields)}
  ${generateDropdownTypeDefinition(parsedVolunteerSection.dropdownFields)}
  ${generateAvailabilityTimesTypeDefinition(parsedVolunteerSection.availabilityTimesFields)}
  id: string;
  resume?: string;
  scans: string[];
  timestamp: number;
  user: {
      firstName: string;
      lastName: string;
      id: string;
      permissions: string[];
  }
}`;

  const statRecordTypeDefinition = `export interface statRecordType {
    ${generateSingleFieldRecordTypeDefinition(parsedHackerSection.singleTextFields, 'string')}
    ${generateSingleFieldRecordTypeDefinition(parsedHackerSection.singleNumberFields, 'number')}
    ${generateMultipleChoiceFieldRecordTypeDefinition(parsedHackerSection.checkboxFields)}
    ${generateMultipleChoiceFieldRecordTypeDefinition(parsedHackerSection.dropdownFields)}    
}`;

  if (!fs.existsSync('node_modules/@generated')) {
    fs.mkdirSync('node_modules/@generated');
  }
  fs.writeFileSync(
    'node_modules/@generated/types.ts',
    `${DateRangeTypeDefinition}\n\n
    ${hackerRegistrationTypeDefinition}\n\n${mentorRegistrationTypeDefinition}\n\n${volunteerRegistrationTypeDefinition}\n\n${statRecordTypeDefinition}`,
  );
  console.log('[INFO] Type Definition files generated in node_modules/@types/generated.ts\n');
}

main();

export {};
