import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { Field, ErrorMessage, Formik } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
          className="border-2 border-gray-400 rounded-md p-1"
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
          className="border-2 border-gray-400 rounded-md p-1"
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
          className="border-2 border-gray-400 rounded-md p-1 mr-auto"
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
        <label htmlFor={props.question.name} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>
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
          className="border-2 border-gray-400 rounded-md p-1"
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
          className="border-2 border-gray-400 rounded-md p-1"
        ></Field>
        <ErrorMessage
          name={props.question.name}
          render={(msg) => <div className="text-red-600">{msg}</div>}
        />
      </Fragment>
    );
  } else if (props.type === 'availabilityInfo') {
    const addAvailability = () => {
      const clone = JSON.parse(JSON.stringify(props.value));
      clone.push({ start: new Date(), end: new Date() });
      props.onChange('timesOptional', clone, false);
    };

    const removeAvailability = () => {
      const clone = JSON.parse(JSON.stringify(props.value));
      if (clone.length > 1) clone.pop();
      props.onChange('timesOptional', clone, false);
    };
    return (
      <Fragment>
        <label htmlFor={props.question.name} className="mt-4">
          {props.question.required ? '*' : ''}
          {props.question.question}
        </label>

        {props.value.map((elm, idx) => (
          <div className="flex flex-row px-10 py-4 justify-center gap-20" key={idx}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                minDateTime={props.range.start}
                maxDateTime={props.range.end}
                orientation="portrait"
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={elm.start}
                onChange={(val) => {
                  // Perform validation logic here
                  const clone = JSON.parse(JSON.stringify(props.value));
                  clone[idx].start = val;
                  props.onChange('timesOptional', clone, false);
                }}
              />
              <ErrorMessage
                name={props.question.name}
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={elm.end}
                onChange={(val) => {
                  // Perform validation logic here
                  const clone = JSON.parse(JSON.stringify(props.value));
                  clone[idx].end = val;
                  props.onChange('timesOptional', clone, false);
                }}
              />
              <ErrorMessage
                name={props.question.name}
                render={(msg) => <div className="text-red-600">{msg}</div>}
              />
            </LocalizationProvider>
          </div>
        ))}
        <div className="flex flex-row justify-end gap-10">
          <button onClick={addAvailability}> Add </button>
          <button onClick={removeAvailability}> Remove </button>
        </div>
      </Fragment>
    );
  }
}

export default Question;
