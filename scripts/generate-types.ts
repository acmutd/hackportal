import {
  hackPortalConfig,
  RegistrationQuestion,
  DropdownQuestion,
  QuestionTypes,
  CheckboxQuestion,
} from '../hackportal.config';
import * as fs from 'fs';

interface ParsedSection {
  singleTextFields: string[];
  singleNumberFields: string[];
  dropdownFields: Array<{ name: string; options: string[] }>;
  checkboxFields: Array<{ name: string; options: string[] }>;
}

const {
  eventInfoQuestions,
  generalQuestions,
  hackathonExperienceQuestions,
  schoolQuestions,
  sponsorInfoQuestions,
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
  };
}

function generateSingleFieldRecordTypeDefinition(fieldArray: string[], dataType: string): string {
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

function generateSingleFieldTypeDefinition(fieldArray: string[], dataType: string): string {
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

function main() {
  const unnecessaryFields = ['firstName', 'lastName', 'preferredEmail'];
  const parsedSection = [
    parseSection(generalQuestions),
    parseSection(eventInfoQuestions),
    parseSection(hackathonExperienceQuestions),
    parseSection(schoolQuestions),
    parseSection(sponsorInfoQuestions),
  ].reduce(
    (acc, curr) => {
      return {
        singleNumberFields: [...acc.singleNumberFields, ...curr.singleNumberFields].filter(
          (field) => unnecessaryFields.indexOf(field) === -1,
        ),
        singleTextFields: [...acc.singleTextFields, ...curr.singleTextFields].filter(
          (field) => unnecessaryFields.indexOf(field) === -1,
        ),
        checkboxFields: [...acc.checkboxFields, ...curr.checkboxFields],
        dropdownFields: [...acc.dropdownFields, ...curr.dropdownFields],
      };
    },
    {
      singleNumberFields: [],
      singleTextFields: [],
      checkboxFields: [],
      dropdownFields: [],
    } as ParsedSection,
  );

  const registrationTypeDefinition = `export interface Registration {
    ${generateSingleFieldTypeDefinition(parsedSection.singleTextFields, 'string')}
    ${generateSingleFieldTypeDefinition(parsedSection.singleNumberFields, 'number')}
    ${generateCheckboxTypeDefinition(parsedSection.checkboxFields)}
    ${generateDropdownTypeDefinition(parsedSection.dropdownFields)}
    id: string;
    resume: string;
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
    ${generateSingleFieldRecordTypeDefinition(parsedSection.singleTextFields, 'string')}
    ${generateSingleFieldRecordTypeDefinition(parsedSection.singleNumberFields, 'number')}
    ${generateMultipleChoiceFieldRecordTypeDefinition(parsedSection.checkboxFields)}
    ${generateMultipleChoiceFieldRecordTypeDefinition(parsedSection.dropdownFields)}    
}`;

  if (!fs.existsSync('node_modules/@generated')) {
    fs.mkdirSync('node_modules/@generated');
  }
  fs.writeFile(
    'node_modules/@generated/types.ts',
    `${registrationTypeDefinition}\n\n${statRecordTypeDefinition}`,
    (err) => {
      if (err) {
        console.log('[ERROR] Error generating type definition\n');
        console.error(err);
        process.exit(1);
      }
      console.log('[INFO] Type Definition files generated in node_modules/@types/generated.ts\n');
    },
  );
}

main();

export {};
