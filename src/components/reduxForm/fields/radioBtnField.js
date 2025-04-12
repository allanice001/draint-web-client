import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import React from 'react';

export default function radioButtonsComponent({
  input,
  meta,
  label,
  type,
  disabled,
  buttons,
}) {
  return (
    <FormControl
      variant="outlined"
      error={meta.error !== undefined && meta.touched}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        type={type}
        aria-label={label}
        name="radio-group"
        {...input}
        disabled={disabled}
      >
        {buttons.map(btn => (
          <FormControlLabel
            value={btn.value}
            control={<Radio />}
            label={btn.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
