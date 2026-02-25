import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import Question from './RegistrationQuestion';
import styles from './DisplayQuestion.module.css';
/**
 *Display registration questions Component
 *
 *
 */

function DisplayQuestion(props) {
  return (
    <Fragment>
      {/* Display text input questions */}
      <div className={styles.textInputQuestionsContainer}>
        {props.obj.textInputQuestions?.map((inputObj) => (
          <Question
            key={inputObj.id}
            type="text"
            question={inputObj}
            value={props.values[inputObj.name]}
            onChange={props.onChange}
          />
        ))}
      </div>
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
      <div className={styles.dropdownQuestionsContainer}>
        {props.obj.dropdownQuestions?.map((inputObj) => (
          <Question
            key={inputObj.id}
            type="dropdown"
            question={inputObj}
            value={props.values[inputObj.name]}
            onChange={props.onChange}
          />
        ))}
      </div>

      {/* Display datalist input questions */}
      {props.obj.datalistQuestions?.map((inputObj) => (
        <Question
          key={inputObj.id}
          type="datalist"
          question={inputObj}
          value={props.values[inputObj.name]}
          onChange={props.onChange}
        />
      ))}
      {/* Display checkbox input questions */}
      {props.obj.checkboxQuestions?.map((inputObj) => (
        <Question
          key={inputObj.id}
          type="checkbox"
          question={inputObj}
          value={props.values[inputObj.name]}
          onChange={props.onChange}
        />
      ))}
      {/* Display text area input questions */}
      {props.obj.textAreaQuestions?.map((inputObj) => (
        <Question
          key={inputObj.id}
          type="textArea"
          question={inputObj}
          value={props.values[inputObj.name]}
          onChange={props.onChange}
        />
      ))}
    </Fragment>
  );
}

export default DisplayQuestion;
