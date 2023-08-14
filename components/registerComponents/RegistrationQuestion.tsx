import React, { useEffect, useState, useLayoutEffect, Fragment, useRef, forwardRef } from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 *Text input question Component
 *
 *
 */

interface RegistrationQuestionProps {
  question: QuestionObject;
  type: string;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RegistrationQuestion = forwardRef(function Question(props: RegistrationQuestionProps, ref) {
  if (props.type === 'text') {
    return (
      <>
        {props.question.id == 'selfdescribe' ? (
          <div ref={ref as React.RefObject<HTMLDivElement>} className="hidden">
            <label htmlFor={props.question.id} className="mt-4 block">
              {props.question.required ? '*' : ''}
              {props.question.question}
            </label>
            <Field
              id={props.question.id}
              name={props.question.name}
              className="border border-complementary/20 rounded-md md:p-2 p-1"
            />
          </div>
        ) : (
          <Fragment>
            <label htmlFor={props.question.id} className="mt-4">
              {props.question.required ? '*' : ''}
              {props.question.question}
            </label>
            <Field
              id={props.question.id}
              name={props.question.name}
              className="border border-complementary/20 rounded-md md:p-2 p-1"
            />
            <ErrorMessage
              name={props.question.name}
              render={(msg) => <div className="text-red-600">{msg}</div>}
            />
          </Fragment>
        )}
      </>
    );
  } else if (props.type === 'number') {
    return (
      <Fragment key={props.question.id}>
        <label htmlFor={props.question.id} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
        <input
          id={props.question.id}
          className="border border-complementary/20 rounded-md md:p-2 p-1"
          name={props.question.name}
          type="number"
          min={props.question.min}
          max={props.question.max}
          pattern={props.question.pattern}
          onChange={props.onChange}
          value={props.value}
        />
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  } else if (props.type === 'dropdown') {
    return (
      <Fragment>
        <label htmlFor={props.question.id} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
        <Field
          as="select"
          name={props.question.name}
          id={props.question.id}
          className="border border-complementary/20 rounded-md md:pl-2 md:py-2 pl-1 py-1 w-min max-w-full text-sm sm:text-base"
        >
          <option value="" disabled selected></option>
          {props.question.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  } else if (props.type === 'checkbox') {
    return (
      <Fragment>
        {props.question.name == 'CoC' ? (
          <label className="mt-4">
            *I have read and agree to the&thinsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
              className="underline"
            >
              MLH Code of Conduct
            </a>
          </label>
        ) : props.question.name == 'shareApp' ? (
          <label className="mt-4">
            *I authorize you to share my application/registration information with Major League
            Hacking for event administration, ranking, and MLH administration in-line with
            the&thinsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mlh.io/privacy"
              className="underline"
            >
              MLH Privacy Policy
            </a>
            . I further agree to the terms of both the MLH Contest&thinsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
              className="underline"
            >
              Terms and Conditions
            </a>
            &thinsp;and the&thinsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mlh.io/privacy"
              className="underline"
            >
              MLH Privacy Policy
            </a>
          </label>
        ) : (
          <label htmlFor={props.question.name} className="mt-4">
            {props.question.required ? '*' : ''}
            {props.question.question}
          </label>
        )}
        <div role="group" aria-labelledby="checkbox-group" className="flex flex-col">
          {props.question.options.map((option) => (
            <label key={option.value}>
              <Field type="checkbox" name={props.question.name} value={option.value} />
              &nbsp;{option.title}
            </label>
          ))}
        </div>
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  } else if (props.type === 'textArea') {
    return (
      <Fragment>
        <label htmlFor={props.question.name} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
        <Field
          as="textarea"
          name={props.question.name}
          placeholder={props.question.placeholder}
          className="border border-complementary/20 rounded-md md:p-2 p-1"
        ></Field>
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  }
});

export default RegistrationQuestion;
