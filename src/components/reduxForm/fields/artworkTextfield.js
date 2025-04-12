import './artworkTextfield.scss';

import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

export default function artworkTextField({
  input,
  id,
  meta,
  label,
  type,
  disabled,
  endpoint,
}) {
  const { name } = input;
  return (
    // <div className="text-field-form-wrapper">
    <FormControl
      variant="outlined"
      error={meta.error !== undefined && meta.touched}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        aria-describedby={name}
        labelWidth={
          name === 'addressLine1' || name === 'addressLine2'
            ? 75
            : name === 'zipcode'
            ? 55
            : name === 'country'
            ? 42
            : 30
        }
        fullWidth
        autoFocus
        {...input}
        type={type}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">{endpoint}</InputAdornment>
        }
      />
      <FormHelperText id={name}>
        {meta.touched ? meta.error : ''}
        {!meta.touched ? 'Required' : ''}
      </FormHelperText>
    </FormControl>
    // </div>
  );
}
