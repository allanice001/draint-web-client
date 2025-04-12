import Icons from 'components/icons';
import React from 'react';
import { getCountryNameByCode } from 'services/global';
import styles from '../../search-page.module.scss';

export const MobileCountryBtn = ({ handleClick, filtersValues }) => {
  return (
    <div>
      <button
        className={styles.country__button}
        onClick={() => handleClick(true)}
      >
        <div>
          <Icons.Map className={styles.icon__map} />
        </div>
        <div>
          {filtersValues && filtersValues.country
            ? getCountryNameByCode(filtersValues.country)
            : 'All Countries'}
        </div>
      </button>
    </div>
  );
};
