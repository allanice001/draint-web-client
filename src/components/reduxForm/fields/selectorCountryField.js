import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import React from 'react';

export default function selectCountryField({
  input,
  children,
  meta,
  label,
  disabled = false,
}) {
  return (
    <FormControl
      variant="outlined"
      error={meta.error !== undefined && meta.touched}
    >
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Select
        labelId={input.label}
        {...input}
        onChange={event => input.onChange(event.target.value)}
        labelWidth={55}
        disabled={disabled}
      >
        {children.map((country, index) => (
          <MenuItem key={index} value={country.props.value}>
            {country.props.children}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText id={input.name}>
        {meta.touched ? meta.error : ''}
      </FormHelperText>
    </FormControl>
  );
}
