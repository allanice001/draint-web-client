import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

export default function textFormComponent({
  input,
  meta,
  label,
  type,
  disabled,
}) {
  return (
    <FormControl
      variant="outlined"
      error={meta.error !== undefined && meta.touched}
    >
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <OutlinedInput
        aria-describedby={input.name}
        labelWidth={55}
        {...input}
        type={type}
        disabled={disabled}
      />
      <FormHelperText id={input.name}>
        {meta.touched ? meta.error : ''}
      </FormHelperText>
    </FormControl>
  );
}
