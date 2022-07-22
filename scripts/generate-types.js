'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
var hackportal_config_1 = require('../hackportal.config');
var fs = require('fs');
var _a = hackportal_config_1.hackPortalConfig.registrationFields,
  eventInfoQuestions = _a.eventInfoQuestions,
  generalQuestions = _a.generalQuestions,
  hackathonExperienceQuestions = _a.hackathonExperienceQuestions,
  schoolQuestions = _a.schoolQuestions,
  sponsorInfoQuestions = _a.sponsorInfoQuestions;
function parseMultipleChoiceQuestion(questions) {
  if (!questions) return [];
  return questions.map(function (question) {
    return {
      name: question.name,
      options: question.options.map(function (option) {
        return option.value;
      }),
    };
  });
}
function parseSingleValueQuestion(questions) {
  if (!questions) return [];
  return questions.map(function (question) {
    return question.name;
  });
}
function parseSection(section) {
  return {
    singleTextFields: section.reduce(function (acc, curr) {
      return __spreadArray(
        __spreadArray(
          __spreadArray(
            __spreadArray([], acc, true),
            parseSingleValueQuestion(curr.textInputQuestions),
            true,
          ),
          parseSingleValueQuestion(curr.datalistQuestions),
          true,
        ),
        parseSingleValueQuestion(curr.textAreaQuestions),
        true,
      );
    }, []),
    singleNumberFields: section.reduce(function (acc, curr) {
      return __spreadArray(
        __spreadArray([], acc, true),
        parseSingleValueQuestion(curr.numberInputQuestions),
        true,
      );
    }, []),
    dropdownFields: section.reduce(function (acc, curr) {
      return __spreadArray(
        __spreadArray([], acc, true),
        parseMultipleChoiceQuestion(curr.dropdownQuestions),
        true,
      );
    }, []),
    checkboxFields: section.reduce(function (acc, curr) {
      return __spreadArray(
        __spreadArray([], acc, true),
        parseMultipleChoiceQuestion(curr.checkboxQuestions),
        true,
      );
    }, []),
  };
}
function generateSingleFieldRecordTypeDefinition(fieldArray, dataType) {
  return (
    fieldArray
      .map(function (field) {
        return ''.concat(field, '?: Record<').concat(dataType, ', number>');
      })
      .join('; ')
      .trim() + ';'
  );
}
function generateMultipleChoiceFieldRecordTypeDefinition(fieldArray) {
  return (
    fieldArray
      .map(function (_a) {
        var name = _a.name,
          options = _a.options;
        return ''.concat(name, '?: Record<').concat(
          options
            .map(function (option) {
              return '"'.concat(option, '"');
            })
            .join('|'),
          ', number>',
        );
      })
      .join('; ')
      .trim() + ';'
  );
}
function generateSingleFieldTypeDefinition(fieldArray, dataType) {
  return (
    fieldArray
      .map(function (field) {
        return ''.concat(field, '?: ').concat(dataType);
      })
      .join('; ')
      .trim() + ';'
  );
}
function generateCheckboxTypeDefinition(fieldArray) {
  return (
    fieldArray
      .map(function (_a) {
        var name = _a.name,
          options = _a.options;
        return ''.concat(name, '?: Array<').concat(
          options
            .map(function (option) {
              return '"'.concat(option, '"');
            })
            .join('|'),
          '>',
        );
      })
      .join('; ')
      .trim() + ';'
  );
}
function generateDropdownTypeDefinition(fieldArray) {
  return (
    fieldArray
      .map(function (_a) {
        var name = _a.name,
          options = _a.options;
        return ''.concat(name, '?: ').concat(
          options
            .map(function (option) {
              return '"'.concat(option, '"');
            })
            .join('|'),
        );
      })
      .join('; ')
      .trim() + ';'
  );
}
function main() {
  var unnecessaryFields = ['firstName', 'lastName', 'preferredEmail'];
  var parsedSection = [
    parseSection(generalQuestions),
    parseSection(eventInfoQuestions),
    parseSection(hackathonExperienceQuestions),
    parseSection(schoolQuestions),
    parseSection(sponsorInfoQuestions),
  ].reduce(
    function (acc, curr) {
      return {
        singleNumberFields: __spreadArray(
          __spreadArray([], acc.singleNumberFields, true),
          curr.singleNumberFields,
          true,
        ).filter(function (field) {
          return unnecessaryFields.indexOf(field) === -1;
        }),
        singleTextFields: __spreadArray(
          __spreadArray([], acc.singleTextFields, true),
          curr.singleTextFields,
          true,
        ).filter(function (field) {
          return unnecessaryFields.indexOf(field) === -1;
        }),
        checkboxFields: __spreadArray(
          __spreadArray([], acc.checkboxFields, true),
          curr.checkboxFields,
          true,
        ),
        dropdownFields: __spreadArray(
          __spreadArray([], acc.dropdownFields, true),
          curr.dropdownFields,
          true,
        ),
      };
    },
    {
      singleNumberFields: [],
      singleTextFields: [],
      checkboxFields: [],
      dropdownFields: [],
    },
  );
  var registrationTypeDefinition = 'export interface Registration {\n    '
    .concat(generateSingleFieldTypeDefinition(parsedSection.singleTextFields, 'string'), '\n    ')
    .concat(generateSingleFieldTypeDefinition(parsedSection.singleNumberFields, 'number'), '\n    ')
    .concat(generateCheckboxTypeDefinition(parsedSection.checkboxFields), '\n    ')
    .concat(
      generateDropdownTypeDefinition(parsedSection.dropdownFields),
      '\n    id: string;\n    resume?: string;\n    scans: string[];\n    timestamp: number;\n    user: {\n        firstName: string;\n        lastName: string;\n        id: string;\n        permissions: string[];\n    }\n}',
    );
  var statRecordTypeDefinition = 'export interface statRecordType {\n    '
    .concat(
      generateSingleFieldRecordTypeDefinition(parsedSection.singleTextFields, 'string'),
      '\n    ',
    )
    .concat(
      generateSingleFieldRecordTypeDefinition(parsedSection.singleNumberFields, 'number'),
      '\n    ',
    )
    .concat(generateMultipleChoiceFieldRecordTypeDefinition(parsedSection.checkboxFields), '\n    ')
    .concat(
      generateMultipleChoiceFieldRecordTypeDefinition(parsedSection.dropdownFields),
      '    \n}',
    );
  if (!fs.existsSync('node_modules/@generated')) {
    fs.mkdirSync('node_modules/@generated');
  }
  fs.writeFileSync(
    'node_modules/@generated/types.ts',
    ''.concat(registrationTypeDefinition, '\n\n').concat(statRecordTypeDefinition),
  );
  console.log('[INFO] Type Definition files generated in node_modules/@types/generated.ts\n');
}
main();
