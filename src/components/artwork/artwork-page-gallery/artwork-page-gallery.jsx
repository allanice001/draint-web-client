import { arrayOf, bool, func, number, object, string } from 'prop-types';
import { QRcodeGenerator } from 'components/qrCode/qr-code';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classnames from 'classnames';
import styles from './artwork-page-gallery.module.scss';

const ArtworkPageGallery = function({
  className,
  loading,
  handleClick,
  currentImg,
  gallery = [],
  galleryLimit,
  title,
}) {
  const pageTemplate = ['', '', '', ''];

  const view = loading
    ? pageTemplate
    : gallery
        .slice(0, galleryLimit)
        .map(
          image =>
            image?.small_image?.split(', ')[0]?.split(' ')[0] || image.imgPath
        );
  const count = gallery.length - view.length;

  function classNames(index) {
    return classnames(styles.image__wrapper, {
      [styles.image__default]: index === currentImg,
    });
  }

  return (
    <div className={`${styles.gallery} ${className}`}>
      {view.map((element, index) =>
        element ? (
          <button
            key={index}
            className={classNames(index)}
            onClick={() => handleClick(index)}
            type="button"
          >
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${element})`,
              }}
            />
            {index === galleryLimit - 1 && count > 0 && (
              <div className={styles.image__count}>+ {count}</div>
            )}
          </button>
        ) : (
          <div key={index} className={classNames(index)}>
            <Skeleton height="100%" variant="rect" width="100%" />
          </div>
        )
      )}

      <QRcodeGenerator className={styles.qrcode} title={title} />
    </div>
  );
};
ArtworkPageGallery.propTypes = {
  className: string,
  loading: bool.isRequired,
  handleClick: func.isRequired,
  currentImg: number,
  gallery: arrayOf(object).isRequired,
  title: string.isRequired,
};

export default ArtworkPageGallery;
