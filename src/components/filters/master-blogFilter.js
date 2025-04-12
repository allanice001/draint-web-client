import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import React from 'react';
import styles from '../../views/master/artists.module.scss';

export const MasterBlogFilter = props => {
  const { loading, handleFilterChange, name, inputs, value } = props;

  return (
    <div className={styles.wrapper}>
      <div className="filter-item">
        <InputLabel id="seller-select-label" className={styles.name}>
          {name}
        </InputLabel>
        <RadioGroup
          aria-label={name}
          disabled={loading}
          name={name}
          onChange={event => handleFilterChange(event, name)}
          value={value}
        >
          {inputs.map((item, index) => (
            <FormControlLabel
              control={<Radio />}
              label={item.label}
              value={item.value}
              key={item.label}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
