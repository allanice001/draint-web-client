import ClientMap from 'components/clientMap/client-map';
import CountryFullSearch from 'components/country-dropdown/country-full-search/country-full-search';
import React from 'react';
import { setShowResultFor } from 'redux/search/action-creators';
import styles from '../../search-page.module.scss';
import { useDispatch } from 'react-redux';

export const SearchMap = ({
  filtersOptions,
  filtersValues,
  currentTabType,
}) => {
  const dispatch = useDispatch();

  const onMapFilterChange = () => {
    dispatch(setShowResultFor({ for: currentTabType }));
  };

  return (
    <div className={`container ${styles.map__wrapper}`}>
      <div className={styles.map__description}>
        <CountryFullSearch
          handleChange={onMapFilterChange}
          options={filtersOptions.country}
        />
      </div>
      <div className={styles.map}>
        <ClientMap filtersValues={filtersValues} />
      </div>
    </div>
  );
};
