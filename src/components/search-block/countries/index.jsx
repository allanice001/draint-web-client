import Icons from '../../icons';
import React from 'react';
import classnames from 'classnames';
import styles from '../search-block.module.scss';

const Countries = ({
  countries,
  handleSubmit,
  input: { onChange, value },
  onClose,
  setOpenCountryFilter,
  isOpen,
  type,
}) => {
  const onCountryApply = () => {
    onClose();
    if (type !== 'filter_form') {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className={styles.header} id="search-header">
        <h3>
          {isOpen && type !== 'select_country' && (
            <span
              className={styles.arrow__back}
              onClick={() => setOpenCountryFilter(false)}
            >
              <Icons.SimpleArrowBack />
            </span>
          )}
          Filter by country
        </h3>
      </div>
      <div className={classnames(styles.filters, styles.country__container)}>
        <div
          className={classnames(
            styles.country,
            (!value || value === 'All countries') && styles.selected__country
          )}
          onClick={() => onChange('')}
        >
          All countries
        </div>
        {countries.map(country => (
          <div
            key={country.id}
            className={classnames(
              styles.country,
              country.key === value && styles.selected__country
            )}
            onClick={() => onChange(country.key)}
          >
            {country.label}
          </div>
        ))}
        <div className={styles.transition} />
        <div className={styles.apply__country}>
          <button className="primary-button" onClick={onCountryApply}>
            Apply country
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countries;
