import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import React from 'react';

export const CustomSelect = props => {
  const { label, value, onChange, options = [], disabled } = props;

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} disabled={disabled}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
