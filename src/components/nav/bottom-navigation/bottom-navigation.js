import { Link } from '../../lib';
import React from 'react';
import { navMap } from '../../../constants/components/navbar/nav.helper';
import styles from './bottom-navigation.module.scss';

export const BottomNavigation = props => {
  const nav = [
    navMap.home,
    navMap.artwork,
    navMap.artist,
    { ...navMap.search, action: props.onSearch },
  ];

  return (
    <div className={styles.nav}>
      <ul className={styles.nav__list}>
        {nav.map(({ label, Icon, url, action }, i) => (
          <li className={styles.nav__item} key={i}>
            {url && (
              <Link
                url={url}
                className={styles.nav__link}
                activeClassName={styles.active}
              >
                <Icon />
                <span className={styles.nav__title}>{label}</span>
              </Link>
            )}

            {action && (
              <button
                type="button"
                className={`reset-btn ${styles.nav__link} ${
                  props.searchActive ? styles.active : ''
                }`}
                onClick={action}
              >
                <Icon />
                <span className={styles.nav__title}>{label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.shadow} />
    </div>
  );
};
