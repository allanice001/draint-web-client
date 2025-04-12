import React from 'react';
import convertIsoCountry from 'services/convert-iso-country';
import styles from './artwork-page.module.scss';

const Header = ({ currentArtwork, name }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2 className={styles.title_content}>{currentArtwork.title}</h2>
        <p className={styles.user_content}>
          <b>{name()}</b>
          {currentArtwork.ownerAddress.country
            ? `, ${convertIsoCountry(
                currentArtwork.ownerAddress.country,
                true
              )}`
            : ''}
        </p>
      </div>
    </div>
  );
};

export default Header;
