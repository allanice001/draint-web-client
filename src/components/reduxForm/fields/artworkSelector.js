import './artworkTextfield.scss';

import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';

import React from 'react';

export default function DefaultSelect({
  input,
  meta,
  label,
  disabled,
  labelWidth,
  list,
}) {
  const { value, onChange } = input;
  return (
    <div className="text-field-form-wrapper">
      <FormControl
        id="multiply-select-form"
        variant="outlined"
        error={meta.error !== undefined}
      >
        <InputLabel id="multiply-select-form-label">{label}</InputLabel>
        <Select
          labelId="multiply-select-form-label"
          id="multiply-select-form-checkbox"
          labelWidth={labelWidth}
          multiple
          value={value}
          disabled={disabled}
          onChange={onChange}
          autoFocus
          renderValue={selected => selected.join(', ')}
        >
          {list.map(item => (
            <MenuItem
              id="multiply-list-for-artwork"
              key={`${item.value}-${item.id}`}
              value={item.value}
            >
              <Checkbox checked={value.indexOf(item.value) > -1} />
              <ListItemText primary={item.value} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="surface">
          {!meta.touched && !value.length ? 'Required' : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
