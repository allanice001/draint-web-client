import './artworkTextfield.scss';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

export default function addressTextfield({
  input,
  meta,
  label,
  type,
  disabled,
}) {
  const { name } = input;
  return (
    <div className="text-field-form-wrapper">
      <FormControl
        variant="outlined"
        error={meta.error !== undefined && meta.touched}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          aria-describedby={name}
          fullWidth
          {...input}
          type={type}
          disabled={disabled}
        />
        <FormHelperText id={name}>
          {meta.touched ? meta.error : ''}
          {!meta.touched ? 'Required' : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
