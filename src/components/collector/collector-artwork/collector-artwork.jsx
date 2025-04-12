import { ON_RESALE, ON_SALE } from 'constants/components/collector-watchlist';
import React, { useEffect, useRef, useState } from 'react';
import { getSize, getWeight, sliceText } from 'services/global';
import Icons from 'components/icons';
import { Image } from 'components/lib';
import { Link } from 'react-router-dom';
import convertIsoCountry from 'services/convert-iso-country';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './collector-artwork.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function Param({ label, children }) {
  return (
    <div className={styles.param}>
      <b className={styles.param__label}>{label}</b>
      <p>{children || `No ${label}`}</p>
    </div>
  );
}

function CollectorArtwork({
  artwork,
  children,
  canRemoveItem,
  removeItem,
  seller_profile_id,
  position,
  inComing,
  sale,
  resale,
}) {
  const url = getArtworkUrl(
    artwork.id,
    artwork.title,
    artwork?.artist?.username
  );
  const [artist, setArtist] = useState({});

  useEffect(() => {
    if (inComing) {
      return setArtist(artwork.owner);
    }
    if (sale || resale) {
      return setArtist(artwork.artist);
    }

    return setArtist(artwork.artist);
  }, [inComing, sale, resale, artwork, setArtist]);

  const authorInfoRef = useRef();
  useCollectorTheme(authorInfoRef);

  return (
    <div className={styles.artwork}>
      <Link to={url} className={styles.image__wrapper}>
        <img
          alt={artwork.title}
          className={styles.image}
          srcSet={artwork.small_image}
          sizes={imageSizes.SM}
          title={artwork.title}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.image__mobile__wrapper}>
            <div className={styles.header__mobile}>
              <Link to={url} className={styles.image__wrapper}>
                <Image
                  alt={artwork.title}
                  className={styles.image}
                  srcSet={artwork.small_image}
                  sizes={imageSizes.ADAPTIVE}
                  title={artwork.title}
                />
              </Link>
              <div className={styles.header__mobile}>
                <Link to={url} className={styles.title__mobile}>
                  {!!position ? position + '.' : null}{' '}
                  {sliceText(artwork.title, 20, '...')}
                </Link>
                {canRemoveItem && removeItem && (
                  <button
                    className={styles.delete_button}
                    type="button"
                    onClick={() => removeItem(artwork.id, seller_profile_id)}
                  >
                    <Icons.Delete fill="#3f4041" width={20} />
                  </button>
                )}
              </div>
              <div className={styles.content__mobile} ref={authorInfoRef}>
                <div>
                  {sale && (
                    <>
                      <span className={styles.content__mobile__text}>
                        {ON_SALE}
                      </span>
                      <br />
                    </>
                  )}
                  {resale && (
                    <>
                      <span className={styles.content__mobile__text}>
                        {ON_RESALE}
                      </span>
                      <br />
                    </>
                  )}
                  {!!artist.fullName && (
                    <span className={styles.content__mobile__author}>
                      by {artist.fullName}
                    </span>
                  )}
                  {artwork.artist.fullName && artist.locations?.country
                    ? ', '
                    : ''}
                  <span className={styles.content__mobile__address}>
                    {convertIsoCountry(artist.locations?.country, true)}
                  </span>
                  {(sale || resale) && (
                    <div className={styles.content__mobile__wrapper_price}>
                      {!!artwork.prevPrice && (
                        <span
                          className={
                            styles.header__content_watchlist__prev_price
                          }
                        >
                          € {artwork.prevPrice}
                        </span>
                      )}
                      <div>
                        <span
                          className={styles.header__content_watchlist__price}
                        >
                          € {artwork.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {children}
              </div>
            </div>
          </div>

          <div
            className={`${
              sale || resale
                ? styles.header__content_watchlist
                : styles.header__content
            }`}
            ref={authorInfoRef}
          >
            <Link to={url} className={styles.title}>
              {sliceText(artwork.title, 15, '...')}
            </Link>
            <div>
              {sale && <span className={styles.address}>{ON_SALE}</span>}
              {resale && <span className={styles.address}>{ON_RESALE}</span>}
              <span className={styles.name}>{artist.fullName}</span>
              {artwork.artist.fullName && artist.locations?.country ? ', ' : ''}
              <span className={styles.address}>
                {convertIsoCountry(artist.locations?.country, true)}
              </span>
              {(sale || resale) && (
                <div
                  className={styles.header__content_watchlist__wrapper_price}
                >
                  {!!artwork.prevPrice && (
                    <span
                      className={styles.header__content_watchlist__prev_price}
                    >
                      € {artwork.prevPrice}
                    </span>
                  )}
                  <div>
                    <span className={styles.header__content_watchlist__price}>
                      € {artwork.price}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.params}>
          <Param label="Size">
            {getSize(artwork.width, artwork.height, artwork.thickness)}
          </Param>
          <div className={styles.param__weight}>
            <Param label="Weight">{getWeight(artwork.weight)} </Param>
          </div>
          <Param label="Style">
            {sale || resale ? artwork.style[0].style : artwork.styleList}
          </Param>
          <Param label="Medium">
            {sale || resale ? artwork.medium[0].medium : artwork.mediumList}
          </Param>
          <Param label="Surface">
            {sale || resale ? artwork.surface[0].surface : artwork.surfaceList}
          </Param>
          <Param label="Completed">{artwork.completedFormatDate}</Param>

          {canRemoveItem && removeItem && (
            <button
              type="button"
              onClick={() => removeItem(artwork.id, seller_profile_id)}
            >
              <Icons.Delete fill="#3f4041" width={20} />
            </button>
          )}
        </div>
        <div className={styles.content__desktop}>{children}</div>
        <div className={styles.params_mobile}>
          <div className={styles.param_mobile}>
            <Param label="Size">
              {getSize(artwork.width, artwork.height, artwork.thickness)}
            </Param>
            <Param label="Completed">{artwork.completedFormatDate}</Param>
          </div>
          <div className={styles.param_mobile}>
            <Param label="Weight">{getWeight(artwork.weight)} </Param>
            <Param label="Medium">
              {sale || resale ? artwork.medium[0].medium : artwork.mediumList}
            </Param>
            <Param label="Surface">
              {sale || resale
                ? artwork.surface[0].surface
                : artwork.surfaceList}
            </Param>
          </div>
          <div className={styles.param_mobile}>
            <Param label="Style">
              {sale || resale ? artwork.style[0].style : artwork.styleList}
            </Param>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectorArtwork;
