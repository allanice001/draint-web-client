import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import styles from './artwork-style-list.module.scss';

const Card = function({ item }) {
  const [smallImage, middleImage] =
    item.small_image?.split(', ').map(imageItem => imageItem?.split(' ')[0]) ||
    [];

  return (
    <div className={styles.container}>
      <NavLink
        className={styles.item}
        data-text={item.style}
        style={{
          backgroundImage: `url("${middleImage ||
            smallImage ||
            item.small_image}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        to={`${SEARCH_ARTWORKS}?style=${encodeURIComponent(item.style)}`}
      >
        {item.style}
      </NavLink>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Card;
