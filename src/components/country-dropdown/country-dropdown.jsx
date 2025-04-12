import Dropdown from '../reduxForm/dropdown/dropdown';
import Icons from '../icons';
import React from 'react';
import { connect } from 'react-redux';
import { getCountryNameByCode } from '../../services/global';
import styles from './country-dropdown.module.scss';

const CountryDropdown = function(props) {
  const {
    input: { value, onChange },
    mapOpen,
  } = props;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.dropdown}>
          <Dropdown {...props} />
          <Icons.FindCountry className={styles.icon} />
        </div>
      </div>
      <ul className={styles.selectedCountries__wrapper}>
        {mapOpen && (
          <label className={styles.country__label}>Selected countries:</label>
        )}
        {value &&
          [value].map(countryCode => {
            return (
              <li key={countryCode} className={styles.selectedCountries}>
                {getCountryNameByCode(countryCode)}
                <button
                  onClick={() =>
                    onChange(
                      value ? value.filter(item => item !== countryCode) : []
                    )
                  }
                  type="button"
                >
                  <Icons.CloseSmall className={styles.close} />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default connect(state => ({
  mapOpen: state.filters.mapIsOpen,
}))(CountryDropdown);
