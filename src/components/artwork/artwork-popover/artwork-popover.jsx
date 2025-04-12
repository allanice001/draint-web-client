import * as Button from 'components/shared/button';

import CloseIcon from 'components/icons/cancel';
import { Link } from 'react-router-dom';
import React from 'react';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getLongCardName } from 'services/global';
import { imageSizes } from 'constants/media-query/image-sizes';
import moment from 'moment';
import styles from './artwork-popover.module.scss';
import { useArtwork } from 'hooks/use-artwork';

const formatDate = (date, format) => {
  if (date) {
    return moment(new Date(Number(date))).format(format);
  } else {
    return '-';
  }
};

export const ArtworkPopover = ({ id, artist, handlePopoverClose, url }) => {
  const { artwork, loading } = useArtwork(id);

  if (loading || !artwork) {
    return (
      <div className={cx(styles.popover, styles.empty)}>
        <Spinner />
      </div>
    );
  }

  const src = artwork.small_image || artwork.primary_image;

  return (
    <div className={styles.popover}>
      <div className={styles.left}>
        <div className={styles.image_wrapper}>
          <img
            srcSet={src}
            sizes={imageSizes.ADAPTIVE}
            className={styles.image}
            alt={artwork.title}
          />
        </div>

        <div className={styles.header}>
          <h3 className={styles.title}>{artwork.title}</h3>
          <p className={styles.subtitle}>
            <span className={styles.author__label}>By artist:</span>
            <Link
              to={getArtistGalleryURL(artist.username)}
              className={styles.author}
            >
              {getLongCardName(
                artist.fullName,
                artist.username,
                artist.is_username
              )}
            </Link>
          </p>
          <b className={styles.price}>&euro; {artwork.price}</b>
        </div>

        <Link to={url} className={styles.link__tablet}>
          <Button.Primary sm className={styles.button}>
            View painting
          </Button.Primary>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={cx(styles.header, styles.tablet)}>
          <h3 className={styles.title}>{artwork.title}</h3>
          <p className={styles.subtitle}>
            <span>By artist:</span> <br />
            <Link
              to={getArtistGalleryURL(artist.username)}
              className={styles.author}
            >
              {getLongCardName(
                artist.fullName,
                artist.username,
                artist.is_username
              )}
            </Link>
          </p>
          <b className={styles.price}>&euro; {artwork.price}</b>
        </div>

        <div className={styles.params}>
          <div className={styles.param}>
            <label className={styles.label}>Size</label>
            <span>
              {artwork.width || '0'} W x {artwork.height || '0'} H x{' '}
              {artwork.thickness || '0'} Th (cm)
            </span>
          </div>

          <div className={styles.param}>
            <label className={styles.label}>Weight</label>
            <span>{artwork.weight || '0'} g</span>
          </div>

          <div className={styles.param}>
            <label className={styles.label}>Style</label>
            <span>{artwork.styles.join(', ')}</span>
          </div>

          <div className={styles.param}>
            <label className={styles.label}>Completed</label>
            <span>{formatDate(artwork.completed, 'MM / YYYY')}</span>
          </div>

          <div className={styles.param}>
            <label className={styles.label}>Medium</label>
            <span>{artwork.mediums.join(', ')}</span>
          </div>

          <div className={styles.param}>
            <label className={styles.label}>Surface</label>
            <span>{artwork.surfaces.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to={url} className={styles.link}>
          <Button.Primary sm className={styles.button}>
            View painting
          </Button.Primary>
        </Link>
      </div>

      <Button.Link
        className={styles.close}
        xs
        icon={<CloseIcon width="16" height="16" />}
        onClick={handlePopoverClose}
      />
    </div>
  );
};
