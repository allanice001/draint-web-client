import { NavLink } from 'react-router-dom';
import React from 'react';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import styles from './artist-card.module.scss';

const ArtistCard = ({ src = '', name, country, username }) => (
  <div className={styles.card}>
    <NavLink to={getArtistGalleryURL(username)}>
      {!src && <div className={styles.image} />}
      {src && (
        <img alt={name} className={styles.image} src={src} title={name} />
      )}
    </NavLink>
    <h4 className={styles.name}>{name}</h4>
    <p className={styles.country}>{country}</p>
  </div>
);

export { ArtistCard };
