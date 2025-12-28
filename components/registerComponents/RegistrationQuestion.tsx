import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import { MenuItem, TextField } from '@mui/material';

/**
 *Text input question Component
 *
 *
 */
const muiFieldSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#5C2E12' }, // default
    '&:hover fieldset': { borderColor: '#683201' }, // hover
    '&.Mui-focused fieldset': { borderColor: '#683201' }, // focus (kills purple)
  },
  '& .MuiInputLabel-root': { color: '#5C2E12' }, // label default
  '& .MuiInputLabel-root.Mui-focused': { color: '#683201' }, // label focus
};

function Question(props) {
  if (props.type === 'text') {
    return (
      <Fragment>
        <TextField
          required={props.question.required}
          label={props.question.question}
          id={props.question.id}
          name={props.question.name}
          variant="outlined"
          type="text"
          value={props.value ?? ''}
          onChange={props.onChange}
          sx={muiFieldSx}
          InputProps={{
            classes: {
              notchedOutline: '!border-red',
              input: 'focus:ring-offset-0 focus:ring-0 focus:ring-shadow-0',
            },
          }}
          className="!mt-4"
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
        <TextField
          required={props.question.required}
          label={props.question.question}
          id={props.question.id}
          name={props.question.name}
          variant="outlined"
          type="number"
          value={props.value ?? ''}
          sx={muiFieldSx}
          onChange={props.onChange}
          InputProps={{
            inputProps: {
              min: props.question.min,
              max: props.question.max,
              pattern: props.question.pattern,
            },
            classes: {
              notchedOutline: '!border-red',
              input: 'focus:ring-offset-0 focus:ring-0 focus:ring-shadow-0',
            },
          }}
          className="!mt-4"
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
        <TextField
          select
          id={props.question.id}
          required={props.question.required}
          label={props.question.question}
          name={props.question.name}
          value={props.value ?? ''}
          sx={muiFieldSx}
          onChange={props.onChange}
          className="!mt-4"
        >
          <MenuItem disabled value="">
            Select...
          </MenuItem>
          {props.question.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
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
              <Field
                type="checkbox"
                name={props.question.name}
                value={option.value}
                className="mr-2 h-4 w-4 focus:ring-2 focus:ring-[#683201]/30"
                style={{ color: '#683201' }}
              />
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
          className="border border-complementary/20 rounded-md md:p-2 p-1"
          autoComplete="off"
        ></Field>
        <datalist id={props.question.datalist}>
          <option value="" disabled></option>
          {props.question.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
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
          className="border border-complementary/20 rounded-md md:p-2 p-1"
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
