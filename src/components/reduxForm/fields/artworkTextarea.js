import './artworkTextfield.scss';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

export default function artworkTextArea({
  input,
  meta,
  label,
  type,
  disabled,
}) {
  const { name } = input;
  return (
    <div className="text-area-form-wrapper">
      <FormControl
        variant="outlined"
        error={meta.error !== undefined && meta.touched}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          disabled={disabled}
          type={type}
          fullWidth
          autoFocus
          {...input}
          multiline
          rows={10}
        />
        <FormHelperText id={input.name}>
          {meta.touched ? meta.error : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
