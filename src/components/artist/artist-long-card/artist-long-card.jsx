import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ArtistLongCardSkeleton from 'components/skeletons/artist-long-card/artist-long-card-sk';
import { ArtworkPopover } from 'components/artwork/artwork-popover/artwork-popover';
import CountryRoundedFlag from '../artist-country-flag/artist-country-flag';
import { Image } from 'components/lib';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { getLongCardName } from 'services/global';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './artist-long-card.module.scss';
import { updateClassList } from 'helpers/utils';

function ArtistLongCard({
  artist,
  empty = false,
  children,
  className,
  fluid,
  url,
}) {
  const {
    isArtist,
    avatar = '',
    fullName,
    small_avatar,
    country,
    artworks,
    username,
    is_username,
  } = artist;

  if (!artist?.artworks) {
    return <ArtistLongCardSkeleton />;
  }

  if (empty) {
    return (
      <div className={cx(styles.artist__wrapper, styles.empty, className)}>
        {children}
      </div>
    );
  }

  const artistUrl = url || getArtistGalleryURL(username);

  const wrapperClasses = cx(styles.artist__wrapper, {
    [styles.fluid]: fluid,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.artist__card}>
        <Image
          alt={fullName}
          className={styles.artist}
          srcSet={avatar || small_avatar}
          defaultSrc={staticUrls.image.defaultArtist}
          sizes={imageSizes.MD}
          title={fullName}
        />

        <div className={styles.artist__content}>
          <h4 className={styles.artist__name}>
            {getLongCardName(fullName, username, is_username)}
          </h4>

          <CountryRoundedFlag
            country={country || artist.locationCountry}
            className={styles.country}
            size={20}
          />

          {!!artworks.length && (
            <div
              className={cx(styles.artwork__list, {
                [styles.notfull]: artworks.length < 3,
              })}
            >
              {artworks.slice(0, 3).map((el, i, arr) => {
                const count =
                  artworks.length > 3 && i === arr.length - 1
                    ? artworks.length - 3
                    : 0;

                return (
                  <Artwork
                    artwork={el}
                    artist={artist}
                    count={count}
                    url={getArtworkUrl(el.id, el.title, username)}
                    key={el.id}
                  />
                );
              })}
            </div>
          )}
          <Link to={isArtist ? artistUrl : false} className={styles.link} />
        </div>
      </div>
    </div>
  );
}

export default ArtistLongCard;

const Artwork = ({ artwork, count, artist, url }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const src = artwork.small_image || artwork.primary_image;

  useEffect(() => {
    return () => {
      updateClassList('remove', { el: document.body, className: 'overlay' });
    };
  }, []);

  const handlePopoverOpen = useCallback(
    event => {
      if (!anchorEl) {
        setAnchorEl(event.currentTarget);

        updateClassList('add', { el: document.body, className: 'overlay' });
      }
    },
    [anchorEl]
  );

  const handlePopoverClose = useCallback(() => {
    if (anchorEl) {
      setAnchorEl(null);

      updateClassList('remove', { el: document.body, className: 'overlay' });
    }
  }, [anchorEl]);

  const isOpen = useMemo(() => {
    return !!anchorEl;
  }, [anchorEl]);

  return (
    <div className={styles.artwork__wrapper}>
      <img
        alt="artwork"
        className={styles.artwork}
        srcSet={src}
        sizes={imageSizes.SM}
        title="artwork"
        onClick={handlePopoverOpen}
      />

      {count > 0 && <div className={styles.count}>+{count}</div>}

      <Popover
        id={`popover-${artwork.id}`}
        open={isOpen}
        anchorEl={anchorEl}
        classes={{
          paper: styles.paper,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ArtworkPopover
          id={artwork.id}
          artist={artist}
          handlePopoverClose={handlePopoverClose}
          url={url}
        />
      </Popover>
    </div>
  );
};
