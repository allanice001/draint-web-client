import { Link } from 'react-router-dom';
import React from 'react';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { imageSizes } from 'constants/media-query/image-sizes';
// import { sliceText, getSize, getWeight } from '../../../../../services/global';
import { sliceText } from 'services/global';
import styles from './payout-list.module.scss';

// function Param({ label, children }) {
//   return (
//     <div className={styles.param}>
//       <b className={styles.param__label}>{label}</b>
//       <p>{children || `No ${label}`}</p>
//     </div>
//   );
// }

function PayoutOrderCard({ artwork, children }) {
  const url = getArtworkUrl(artwork.id, artwork.title, artwork.username);
  return (
    <div className={styles.artwork}>
      <Link to={url} className={styles.image__wrapper}>
        <img
          alt={artwork.title}
          className={styles.image}
          srcSet={artwork.src}
          sizes={imageSizes.ADAPTIVE}
          title={artwork.title}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <Link to={url} className={styles.image__wrapper}>
            <img
              alt={artwork.title}
              className={styles.image}
              srcSet={artwork.src}
              sizes={imageSizes.ADAPTIVE}
              title={artwork.title}
            />
          </Link>

          <div className={styles.header__content}>
            <Link to={url} className={styles.title}>
              {sliceText(artwork.title, 15, '...')}
            </Link>
            <div>
              <span className={styles.name}>{artwork.artist.fullName}</span>
              {artwork.artist.fullName ? ', ' : ''}
              <span className={styles.address}>{artwork.artist.country}</span>
            </div>
          </div>
        </div>

        {/*<div className={styles.params}>*/}
        {/*  <Param label="Size">*/}
        {/*    {getSize(artwork.width, artwork.height, artwork.thickness)}*/}
        {/*  </Param>*/}
        {/*  <div className={styles.param__weight}>*/}
        {/*    <Param label="Weight">{getWeight(artwork.weight)} </Param>*/}
        {/*  </div>*/}
        {/*  <Param label="Style">{artwork.styleList}</Param>*/}
        {/*  <Param label="Medium">{artwork.mediumList}</Param>*/}
        {/*  <Param label="Surface">{artwork.surfaceList}</Param>*/}
        {/*  <Param label="Completed">{artwork.completedFormatDate}</Param>*/}
        {/*</div>*/}
        {children}
        {/*<div className={styles.params_mobile}>*/}
        {/*  <div className={styles.param_mobile}>*/}
        {/*    <Param label="Size">*/}
        {/*      {getSize(artwork.width, artwork.height, artwork.thickness)}*/}
        {/*    </Param>*/}
        {/*    <Param label="Completed">{artwork.completedFormatDate}</Param>*/}
        {/*  </div>*/}
        {/*  <div className={styles.param_mobile}>*/}
        {/*    <Param label="Weight">{getWeight(artwork.weight)} </Param>*/}
        {/*    <Param label="Medium">{artwork.mediumList}</Param>*/}
        {/*    <Param label="Surface">{artwork.surfaceList}</Param>*/}
        {/*  </div>*/}
        {/*  <div className={styles.param_mobile}>*/}
        {/*    <Param label="Style">{artwork.styleList}</Param>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default PayoutOrderCard;
