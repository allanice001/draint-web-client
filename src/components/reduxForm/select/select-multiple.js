import { Checkbox, MenuItem, Select } from '@material-ui/core';

import React from 'react';
import styles from './select.module.scss';

export default function SelectMultiple({
  input,
  meta,
  label,
  disabled,
  labelWidth,
  list,
}) {
  const { value, onChange } = input;
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <span className={styles.control}>
        <Select
          disableUnderline
          className={styles.select_multiple}
          labelWidth={labelWidth}
          multiple
          value={value || []}
          disabled={disabled}
          onChange={onChange}
          renderValue={selected =>
            list
              .filter(item => selected.includes(item.id))
              .map(x => x.value)
              .join(', ')
          }
        >
          {list.map(item => (
            <MenuItem
              id="multiply-list-for-artwork"
              key={`${item.value}-${item.id}`}
              value={item.id}
            >
              <Checkbox
                color="primary"
                className={styles.checkbox}
                checked={value.indexOf(item.id) > -1}
              />
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </span>
      {meta.touched && meta.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}
