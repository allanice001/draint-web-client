import { Link } from 'react-router-dom';
import React from 'react';
import { TITLE_WASNT_SPECIFIED } from 'constants/components/artworks.contants';
import classnames from 'classnames';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { getUserName } from '../../../services/global';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './artwork-small-card.module.scss';

function ArtworkSmallCard({ artwork, artist, fullName }) {
  const artworkTitleClasses = classnames({
    [styles.title]: !!artwork.title,
    [styles.title__no_title]: !artwork.title,
  });
  return (
    <div className={styles.wrapper}>
      <Link to={getArtworkUrl(artwork.id, artwork.title, artist.username)}>
        <div className={styles.image_wrapper}>
          <img
            alt={artwork.title}
            className={styles.artwork}
            srcSet={artwork.small_image}
            sizes={imageSizes.SM}
            title={artwork.title}
          />
        </div>

        <span className={artworkTitleClasses}>
          {artwork.title || TITLE_WASNT_SPECIFIED}
        </span>
        {!fullName ? (
          <span className={styles.username}>{getUserName(artwork)}</span>
        ) : (
          <span className={styles.username}>{fullName}</span>
        )}
        <div className={styles.footer}>
          {artist?.small_avatar ? (
            <img
              alt={artist?.fullName}
              className={styles.artist_img}
              srcSet={artist?.small_avatar}
              sizes={imageSizes.SM}
              title={artist?.fullName}
            />
          ) : (
            <div className={styles.artist_img__no_img} />
          )}
          <span className={styles.price}>&euro; {artwork.price}</span>
        </div>
      </Link>
    </div>
  );
}

export default ArtworkSmallCard;
