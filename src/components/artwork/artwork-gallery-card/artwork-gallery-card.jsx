import { ArtworkCardHover } from 'components/artwork/artwork-card/artworkCardHover';
import { HOVER_FROM } from 'constants/components/homepage';
import { Image } from 'components/image/image';
import { Link } from 'components/link/link';
import React from 'react';
import VerificationButtons from 'components/verification-buttons/verification-buttons';
import classnames from 'classnames';
import getSaleStatus from 'services/artwork-sale-service';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './artwork-gallery-card.module.scss';

const Price = ({ price, forSale, last_price }) => {
  const classNames = classnames(styles.price, { [styles.noforsale]: !forSale });

  if (price && forSale) {
    return <b className={classNames}>&euro; {price}</b>;
  }

  if (!forSale && last_price) {
    return (
      <b className={classNames}>
        Sold for <br /> &euro; {last_price}
      </b>
    );
  }

  if (!forSale) {
    return <b className={classNames}>No sale</b>;
  }

  return null;
};

export default function ArtworkGalleryCard({
  id,
  src,
  title,
  price,
  last_price,
  size,
  paints,
  forSale,
  url,
  mediums,
  surfaces,
  isMaster,
  verification,
  isSold,
  artworkDeleted,
  isOwnerCanEditArtwork,
  fullArtworkInfo,
  isArtist,
  canEdit,
  artist_id,
  owner_id,
}) {
  const artwork = {
    artist_id,
    owner: owner_id,
    for_sale: forSale,
    isOwnerCanEditArtwork,
  };

  const saleStatus = getSaleStatus(artwork);

  return (
    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <Link url={url} className={styles.link}>
          <Image
            alt={title}
            className={styles.preview}
            srcSet={src}
            defaultSrc={staticUrls.image.artworkPlaceholder}
            sizes={imageSizes.MD}
          />
        </Link>
        {!canEdit && fullArtworkInfo && (
          <div className={styles.artwork_card_hover}>
            <ArtworkCardHover
              fullArtworkInfo={fullArtworkInfo}
              addToCartFrom={HOVER_FROM.artworkGalleryCard}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>{title || 'Title not specified'}</h4>
          <Price
            price={price}
            forSale={forSale}
            sold={isSold}
            last_price={last_price}
          />
        </div>
        <div className={styles.header}>
          {(size || paints || mediums || surfaces) && (
            <p className={`${styles.row} ${styles.description}`}>
              {size}
              {paints ? `, ${paints}` : ''}
              {mediums.length ? `, ${mediums[0].medium}` : ''}
              {surfaces.length ? ` on ${surfaces[0].surface}` : ''}
            </p>
          )}
          {(isMaster || isArtist) && (
            <div>
              <p className={`${styles.status} ${styles[verification]}`}>
                {verification}
              </p>
              <p className={`${styles.status} ${styles[verification]}`}>
                {saleStatus}
              </p>
            </div>
          )}
        </div>
        {isMaster && (
          <div className={styles.verification_wrapper}>
            <VerificationButtons
              artwork={true}
              artworkId={id}
              artistId={artist_id}
              status={verification}
              artworkDeleted={artworkDeleted}
              isOwnerCanEditArtwork={isOwnerCanEditArtwork}
              isSold={isSold}
            />
          </div>
        )}
      </div>
    </div>
  );
}
