import React, { Fragment, forwardRef } from 'react';
import RegistrationQuestion from './RegistrationQuestion';
import { QuestionTypes } from '../../hackportal.config';

/**
 *Display registration questions Component
 *
 *
 */
interface DisplayQuestionProps {
  key: number;
  obj: QuestionTypes;
  values: RegistrationValues;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const DisplayQuestion = forwardRef(function Question(props: DisplayQuestionProps, ref) {
  return (
    <Fragment>
      {/* Display text input questions */}
      {props.obj.textInputQuestions?.map((inputObj) => (
        <RegistrationQuestion key={inputObj.id} type="text" question={inputObj} ref={ref} />
      ))}
      {/* Display number input questions */}
      {props.obj.numberInputQuestions?.map((inputObj) => (
        <RegistrationQuestion
          key={inputObj.id}
          type="number"
          question={inputObj}
          value={props.values[inputObj.name]}
          onChange={props.onChange}
        />
      ))}
      {/* Display dropdown input questions */}
      {props.obj.dropdownQuestions?.map((inputObj) => (
        <RegistrationQuestion key={inputObj.id} type="dropdown" question={inputObj} />
      ))}
      {/* Display checkbox input questions */}
      {props.obj.checkboxQuestions?.map((inputObj) => (
        <RegistrationQuestion key={inputObj.id} type="checkbox" question={inputObj} />
      ))}
      {/* Display text area input questions */}
      {props.obj.textAreaQuestions?.map((inputObj) => (
        <RegistrationQuestion key={inputObj.id} type="textArea" question={inputObj} />
      ))}
    </Fragment>
  );
});

export default DisplayQuestion;
