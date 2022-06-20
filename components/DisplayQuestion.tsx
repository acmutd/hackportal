import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import Question from './RegistrationQuestion';

/**
 *Display registration questions Component
 *
 *
 */

function DisplayQuestion(props) {
  return (
    <Fragment>
      {/* Display text input questions */}
      {props.obj.textInputQuestions?.map((inputObj) => (
        <Question key={inputObj.id} type="text" question={inputObj} />
      ))}
      {/* Display number input questions */}
      {props.obj.numberInputQuestions?.map((inputObj) => (
        <Question
          key={inputObj.id}
          type="number"
          question={inputObj}
          value={props.values[inputObj.name]}
          onChange={props.onChange}
        />
      ))}
      {/* Display dropdown input questions */}
      {props.obj.dropdownQuestions?.map((inputObj) => (
        <Question key={inputObj.id} type="dropdown" question={inputObj} />
      ))}
      {/* Display datalist input questions */}
      {props.obj.datalistQuestions?.map((inputObj) => (
        <Question key={inputObj.id} type="datalist" question={inputObj} />
      ))}
      {/* Display checkbox input questions */}
      {props.obj.checkboxQuestions?.map((inputObj) => (
        <Question key={inputObj.id} type="checkbox" question={inputObj} />
      ))}
      {/* Display text area input questions */}
      {props.obj.textAreaQuestions?.map((inputObj) => (
        <Question key={inputObj.id} type="textArea" question={inputObj} />
      ))}
    </Fragment>
  );
}

export default DisplayQuestion;
