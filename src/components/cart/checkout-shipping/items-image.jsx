import { Link } from 'react-router-dom';
import React from 'react';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './checkout-shipping-info.module.scss';

function ItemsImage({ item }) {
  const url = getArtworkUrl(item.id, item.title, item.username);

  return (
    <div>
      <Link to={url} className={styles.image_wrapper}>
        <img
          alt={item.title}
          className={styles.image}
          srcSet={item.small_image}
          sizes={imageSizes.ADAPTIVE}
          title={item.title}
        />
      </Link>
    </div>
  );
}

export default ItemsImage;
