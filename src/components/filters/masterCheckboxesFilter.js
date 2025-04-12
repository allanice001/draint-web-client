import { Card, Checkbox, FormControlLabel } from '@material-ui/core';

import React from 'react';
import styles from './masterCheckboxesFilter.module.scss';

const OptionCheckbox = ({ name, value, onChange, disabled, selected }) => (
  <FormControlLabel
    className={styles.card__action}
    label={name}
    control={
      <Checkbox
        disabled={disabled}
        checked={selected !== undefined ? selected : value}
        color="secondary"
        onChange={onChange}
      />
    }
  />
);

export const MasterCheckboxesFilter = ({
  options,
  setOptions,
  disabled,
  permission,
}) => {
  const data = !options.length
    ? Object.keys(options).map(key => ({ name: key, value: options[key] }))
    : options;
  return (
    <Card className={styles.wrapper}>
      {data.map(({ name, value, selected, id }, index) => (
        <OptionCheckbox
          key={id || index}
          name={name}
          value={value}
          disabled={disabled}
          onChange={
            !permission
              ? () => setOptions(name, !value)
              : () => setOptions(name, value)
          }
          selected={selected}
        />
      ))}
    </Card>
  );
};
