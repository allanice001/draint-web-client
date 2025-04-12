import { List, Record } from 'components/shared/list';
import { array, bool, func, string } from 'prop-types';

import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import classnames from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './sub-menu.module.scss';

function Tab({
  onBack,
  isActive,
  list = [],
  handleSearch,
  type,
  tabLabel,
  getSearch,
  isArtist,
  setIsOpened,
}) {
  const tabClasses = classnames(styles.tab, { [styles.active]: isActive });
  const getIcon = Icon =>
    !!Icon && <Icon className={styles.navIcon} width={24} height={24} />;

  const button = (type, key, label, Icon) => (
    <button
      className={styles.tab__item}
      onClick={() => {
        setIsOpened(false);
        handleSearch({ type, search: getSearch(key) });
      }}
      type="button"
    >
      {getIcon(Icon)}
      <span className={styles.text}>{label}</span>
    </button>
  );

  const link = (to, label, Icon) => (
    <Link
      to={to}
      className={styles.tab__item}
      onClick={() => setIsOpened(false)}
    >
      {getIcon(Icon)}
      <span className={styles.text}>{label}</span>
    </Link>
  );

  const artistLink = (fullName, avatar, username) => (
    <Link
      className={styles.tab__item}
      to={getArtistGalleryURL(username)}
      onClick={() => setIsOpened(false)}
    >
      <img
        alt={fullName}
        className={styles.tab__avatar}
        srcSet={avatar}
        sizes={imageSizes.SM}
        title={fullName}
      />

      <span className={styles.text}>{fullName}</span>
    </Link>
  );

  return (
    <div className={tabClasses}>
      <div className={styles.header}>
        <button className={styles.arrow} onClick={onBack} type="button">
          <Icons.ArrowRight className={styles.arrow__icon} />
        </button>
        {tabLabel}
      </div>

      {!!list.length && (
        <List className={styles.tab__list}>
          {list.map(
            (
              { key, label, id, small_avatar, username, fullName, to, Icon },
              index
            ) => (
              <Record key={index}>
                {isArtist && artistLink(fullName, small_avatar, username)}

                {!isArtist && to && link(to, label, Icon)}

                {!isArtist && !to && button(type, key, label, Icon)}
              </Record>
            )
          )}
        </List>
      )}
    </div>
  );
}

Tab.propTypes = {
  isActive: bool,
  isArtist: bool,
  list: array,
  handleSearch: func,
  getSearch: func,
  onBack: func,
  type: string,
  tabLabel: string,
};

export default Tab;
