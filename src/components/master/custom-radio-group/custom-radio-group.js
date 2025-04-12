import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import React from 'react';

export const CustomRadioGroup = props => {
  const { options, label, value, onChange, name, disabled } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            size="medium"
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
