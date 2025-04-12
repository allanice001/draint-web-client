import React from 'react';
import SelectCustomized from 'components/select-customized/select-customized';
import styles from 'views/website/home/home.module.scss';
export const HomepageArtworksFilters = ({
  filter,
  setFilter,
  filterList,
  centerLabel,
  isCountry,
  type,
}) => {
  return (
    <div className={styles.filters_wrapper}>
      {filterList.map(({ label, options, key }) => (
        <div
          key={`${key}${centerLabel}`}
          className={styles.filters_wrapper__item}
        >
          <SelectCustomized
            filter={key}
            type={type}
            long={isCountry}
            centerLabel={centerLabel}
            label={!isCountry ? label : ''}
            options={options}
            valueToSet={filter[key].key}
            setFilter={setFilter}
          />
        </div>
      ))}
    </div>
  );
};
