import Icons from 'components/icons';
import { Image } from 'components/image/image';
import React from 'react';
import { TITLE_WASNT_SPECIFIED } from 'constants/components/artworks.contants';
import classnames from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './common-card.module.scss';

function CommonCard({
  title,
  handleClick,
  id,
  type,
  selectedId,
  primary_image,
  small_image,
  featured_image,
}) {
  const titleClasses = classnames({
    [styles.title]: !!title,
    [styles.title__no_title]: !title,
  });
  const wrapperClasses = classnames(styles.wrapper, {
    [styles.wrapper__active]: selectedId.includes(id),
  });
  const iconStyles = classnames(styles.icon, {
    [styles.icon_active]: selectedId.includes(id),
  });
  return (
    <div
      className={wrapperClasses}
      onClick={() => {
        handleClick(type, id);
      }}
    >
      <Icons.Check className={iconStyles} width={12} />
      <Image
        alt={title}
        className={styles.primary_image}
        srcSet={
          small_image ||
          primary_image ||
          featured_image ||
          staticUrls.image.defaultPost
        }
        sizes={imageSizes.ADAPTIVE}
        title={title}
      />
      <span className={titleClasses}>{title || TITLE_WASNT_SPECIFIED}</span>
    </div>
  );
}

export default CommonCard;
