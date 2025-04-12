import { ARTWORK_ROOT, ID } from 'constants/routes/publicModule/artwork';

import { Link } from '../../lib';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import styles from './artwork-card.module.scss';

function ArtworkCard({ el, empty, children, className }) {
  if (!el) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.image__wrapper_empty}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
        <div className={styles.content}>
          <div className={styles.description} style={{ width: '70%' }}>
            <br />
            <Skeleton variant="h4" className={styles.title} width="90%" />
            <Skeleton variant="text" className={styles.artist} width="100%" />
            <Skeleton variant="text" className={styles.params} width="100%" />
          </div>
          <Skeleton className={styles.price} width="20%" />
        </div>
      </div>
    );
  }

  const size =
    el.width && el.height
      ? `${el.width}x${el.height}cm`
      : "Size isn't specified";

  const params = `${size} ${
    el.medium && el.surface ? `${el.medium} on ${el.surface}` : ''
  }`;

  const artworkUrl = `${ARTWORK_ROOT}${ID}/${el.id}`;

  if (empty) {
    return (
      <div className={`${styles.wrapper} ${styles.empty} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image__wrapper}>
        <Link url={artworkUrl}>
          <img
            alt={el.title}
            className={styles.image}
            src={el.src}
            title={el.title}
          />
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <h4 className={styles.title}>{el.title}</h4>
          <Link
            url={getArtistGalleryURL(el.username)}
            className={styles.artist}
          >
            {el.name}
          </Link>
          <span className={styles.params}>{params}</span>
        </div>

        {el.price && <span className={styles.price}>€&nbsp;{el.price}</span>}
      </div>
    </div>
  );
}

export { ArtworkCard };
