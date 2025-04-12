import React from 'react';
import { getCountryNameByCode } from 'services/global';
import { getFiltersCount } from 'helpers/dynamic-title/getFiltersCountForTitle';
import styles from '../../search-page.module.scss';

export const ArtworksTitle = ({ filters }) => {
  const filtersCount = getFiltersCount(filters);
  const isAlone = filtersCount === 1;

  if (filtersCount === 0) {
    return <h1 className={styles.message}>Original paintings for sale</h1>;
  }

  const mediumstyle = (filters.medium || filters.style) && (
    <>
      <b>
        {filters.medium && filters.style
          ? `${filters.medium}, ${filters.style}`
          : filters.medium || filters.style}
      </b>{' '}
      paintings {filters.country?.length && !filters.surface && 'from '}
    </>
  );

  const surface = filters.surface && (
    <>
      {(isAlone && 'Paintings') || (!mediumstyle && 'Paintings')} on{' '}
      <b>{filters.surface}</b>
      {filters.country?.length && ' from '}
    </>
  );

  const country = filters.country && (
    <>
      {!isAlone && !mediumstyle && !surface && 'Paintings '}
      {isAlone && 'Paintings from '}
      <b>{filters.country?.map(code => getCountryNameByCode(code))}</b>
    </>
  );

  return (
    <h1 className={styles.message}>
      {mediumstyle}
      {surface}
      {country}
    </h1>
  );
};
