import React from 'react';
import { getCountryNameByCode } from 'services/global';
import { getFiltersCount } from 'helpers/dynamic-title/getFiltersCountForTitle';
import styles from '../../search-page.module.scss';

export const ArtistsTitle = ({ filters }) => {
  const filtersCount = getFiltersCount(filters);
  const isAlone = filtersCount === 1;

  if (filtersCount === 0) {
    return <h1 className={styles.message}>Artists around the world</h1>;
  }

  const mediumstyle = (filters.medium || filters.style) && (
    <>
      {filters.country?.length > 0
        ? ' that craft original, '
        : 'Artists that craft original '}
      <b>
        {filters.medium && filters.style
          ? `${filters.medium}, ${filters.style}`
          : filters.medium || filters.style}
      </b>
      {' work '}
    </>
  );

  const surface = filters.surface && (
    <>
      {!mediumstyle && filters.country && ' that craft original work '}
      {isAlone ? ' Artists that craft original work on ' : ' on '}
      <b>{filters.surface}</b>
    </>
  );

  const country = filters.country && (
    <>
      Artists from{' '}
      <b>
        {filters.country?.map(code => getCountryNameByCode(code)).join(', ')}
      </b>
    </>
  );

  return (
    <h1 className={styles.message}>
      {country}
      {mediumstyle}
      {surface}
    </h1>
  );
};
