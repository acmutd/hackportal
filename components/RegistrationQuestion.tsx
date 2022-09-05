import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 *Text input question Component
 *
 *
 */
function Question(props) {
  if (props.type === 'text') {
    return (
      <Fragment>
        <label htmlFor={props.question.id} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
        <Field
          id={props.question.id}
          name={props.question.name}
          className="input rounded-md px-2 py-1"
        />
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
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
          className="input rounded-md px-2 py-1"
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
          className="input rounded-md px-2 py-1"
        >
          <option value="" disabled selected className="text-black"></option>
          {props.question.options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MLH/mlh-policies/blob/main/member-event-guidelines.md"
            className="mt-4 hover:underline"
          >
            {props.question.required ? '*' : ''}
            {props.question.question}
          </a>
        ) : props.question.name == 'policy' ? (
          <label className="mt-4">
            *I further agree to the terms of both the&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
              className="underline"
            >
              MLH Contest Terms and Conditions
            </a>
            &nbsp;and the&nbsp;
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
  } else if (props.type === 'datalist') {
    return (
      <Fragment>
        <label htmlFor={props.question.name} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
        <Field
          type="text"
          id={props.question.id}
          name={props.question.name}
          list={props.question.datalist}
          className="input rounded-md px-2 py-1"
          autoComplete="off"
        ></Field>
        <datalist id={props.question.datalist}>
          <option value="" disabled selected></option>
        </datalist>
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
          className="input rounded-md px-2 py-1"
        ></Field>
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  }
}

export default Question;
