import React, { useEffect, useRef, useState } from 'react';

import { ArtistPopup } from './artist-popup';
import { ArtworkCardDescription } from './artwork-card-description';
import { ArtworkCardHover } from './artworkCardHover';
import ArtworkCardSkeleton from 'components/skeletons/artwork-card/artwork-card-sk';
import { ArtworkPurchaseHistory } from './artwork-purchase-history';
import { NavLink } from 'react-router-dom';
import { PLATFORM_REGEX } from 'constants/index';
import Popover from '@material-ui/core/Popover';
import classnames from 'classnames';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './artwork-card.module.scss';
import { updateClassList } from 'helpers/utils';

const ArtworkCard = ({
  fullArtworkInfo,
  addToCartFrom,
  artwork,
  fluid,
  showMore,
  onlyHover,
  isCatalog,
  carousel = false,
  withHistory = false,
  artworkMasterCard,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [maxWidth, setMaxWidth] = useState('none');
  const [isLong, setIsLong] = useState();
  const platform = navigator?.platform;
  const isTransaction = PLATFORM_REGEX.test(platform) ? 0 : 'auto';

  const priceRef = useRef(null);
  let imgRef = useRef(null);

  useEffect(() => {
    if (priceRef.current) {
      setMaxWidth(`calc(100% - ${priceRef.current.offsetWidth + 25}px)`);
    }
  }, [priceRef]);

  const handlePopoverOpen = event => {
    if (!artworkMasterCard) {
      setAnchorEl(event.currentTarget);
      updateClassList('add', { el: document.body, className: 'overlay' });
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    updateClassList('remove', { el: document.body, className: 'overlay' });
  };

  const classNames = classnames(styles.card, {
    [styles.fluid]: fluid,
    [styles.carousel]: carousel,
    [styles.showMore]: showMore,
  });

  const navWrapperClassNames = classnames(styles.wrapper_nav, {
    [styles.addHover]: showMore || onlyHover,
  });

  const classNamesImageWrapper = cx(styles.image__wrapper, {
    [styles.image__wrapper__height]: isLong,
  });

  const classNamesImage = cx(styles.image, {
    [styles.image__height]: isLong,
  });

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${artwork.id}` : undefined;

  const handleClick = e => showMore && e.preventDefault();

  useEffect(() => {
    return () => {
      updateClassList('remove', { el: document.body, className: 'overlay' });
    };
  }, []);

  const setImageIsLong = () => {
    setIsLong(imgRef.current.offsetHeight >= imgRef.current.offsetWidth);
  };

  if (!artwork) {
    return <ArtworkCardSkeleton />;
  }

  return (
    <div className={classNames}>
      <div className={navWrapperClassNames}>
        <NavLink
          to={getArtworkUrl(
            artwork.id,
            artwork.title,
            artwork.artist?.username
          )}
          className={classNamesImageWrapper}
          onClick={handleClick}
        >
          <img
            onLoad={setImageIsLong}
            ref={imgRef}
            alt={artwork.title}
            className={classNamesImage}
            srcSet={artwork.src}
            sizes={imageSizes.MD}
            title={artwork.title}
          />
          <div className={styles.shadow} />
        </NavLink>
        <div className={styles.artwork_card_hover}>
          {fullArtworkInfo && (
            <ArtworkCardHover
              fullArtworkInfo={fullArtworkInfo}
              addToCartFrom={addToCartFrom}
            />
          )}
        </div>
      </div>

      <div className={styles.content}>
        <ArtworkCardDescription maxWidth={maxWidth} artwork={artwork} />

        <div ref={priceRef} className={styles.right}>
          {artworkMasterCard ? (
            <NavLink
              to={getArtistGalleryURL(artwork.artist.username)}
              className={styles.artist__name}
            >
              {!isCatalog && (
                <img
                  alt={artwork.artist.fullName}
                  aria-describedby={id}
                  onClick={handlePopoverOpen}
                  className={styles.artist__avatar}
                  role="button"
                  srcSet={artwork.artist.avatar}
                  sizes={imageSizes.SM}
                  title={artwork.artist.fullName}
                />
              )}
            </NavLink>
          ) : (
            !isCatalog && (
              <div className={styles.img_link}>
                <img
                  alt={artwork.artist.fullName}
                  aria-describedby={id}
                  onClick={handlePopoverOpen}
                  className={styles.artist__avatar}
                  role="button"
                  srcSet={artwork.artist.avatar}
                  sizes={imageSizes.SM}
                  title={artwork.artist.fullName}
                />
              </div>
            )
          )}

          <Popover
            transitionDuration={isTransaction}
            id={id}
            open={open}
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
            <ArtistPopup artist={artwork.artist} />
          </Popover>
          <b className={styles.price}>€&nbsp;{parseInt(artwork.price)}</b>
        </div>
      </div>

      {withHistory && artwork.purchase_history.length > 0 && (
        <ArtworkPurchaseHistory artwork={artwork} />
      )}
    </div>
  );
};

export { ArtworkCard };
