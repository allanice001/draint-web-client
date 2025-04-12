import { Card, Checkbox, Select } from '@material-ui/core';
import { arrayOf, func, object, string } from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import styles from './master-country-filter.module.scss';

const getPrintedValue = (label, number) => `${label} (${number})`;

const MasterCountryFilter = function({ countryList, country, selectCounty }) {
  const defaultValue = 'All';
  const isAll = country.includes(defaultValue);
  const isCountryList = countryList && countryList.length > 0;
  const currentCountry = country;
  return (
    <Card className={styles.countries}>
      {isCountryList && (
        <Select
          autoFocus
          fullWidth
          multiple
          onChange={selectCounty}
          renderValue={selected => (isAll ? defaultValue : selected.join(', '))}
          value={currentCountry}
        >
          <MenuItem key={defaultValue} value={defaultValue}>
            <Checkbox checked={isAll} />
            {defaultValue}
          </MenuItem>
          {countryList.map(({ country, count }) => (
            <MenuItem key={country} value={country}>
              <Checkbox
                checked={isAll || currentCountry.includes(country)}
                disabled={isAll}
              />
              {getPrintedValue(country, count)}
            </MenuItem>
          ))}
        </Select>
      )}
    </Card>
  );
};

MasterCountryFilter.propTypes = {
  countryList: arrayOf(object),
  country: arrayOf(string).isRequired,
  selectCounty: func.isRequired,
};

export default MasterCountryFilter;
