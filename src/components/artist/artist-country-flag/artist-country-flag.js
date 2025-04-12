import React from 'react';
import convertIsoCountry from 'services/convert-iso-country';
import cx from 'classnames';
import styles from './artist-country-flag.module.scss';

const CountryRoundedFlag = ({
  country = '',
  city = '',
  size = '26',
  width,
  height,
  className = '',
  placeholder = '',
  showCountryIso,
}) => {
  const iso = convertIsoCountry(country);

  if (!iso) {
    return (
      <div className={cx(styles.address, className)}>
        <span className={styles.placeholder}>{placeholder}</span>
      </div>
    );
  }

  const address = [
    city,
    showCountryIso
      ? convertIsoCountry(country)
      : convertIsoCountry(country, true),
  ];

  return (
    <div className={cx(styles.address, className)}>
      <div
        className={styles.flag}
        style={{
          width: `${width || size}px`,
          height: `${height || size}px`,
          backgroundImage: `url(../../img/flags-iso/${iso}.png)`,
        }}
      />
      <span>{address.filter(el => !!el).join(', ')}</span>
    </div>
  );
};

export default CountryRoundedFlag;
