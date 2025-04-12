import { arrayOf, elementType, func, shape, string } from 'prop-types';
import { ArtistCollectorButtons } from 'components/artist-collector-buttons/artist-collector-buttons';
import { Link } from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import styles from './profile-navigation.module.scss';
import { useLocation } from 'react-router';

function ProfileNavigation({ nav }) {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <ul className={styles.nav}>
          {nav.map((link, index) => {
            const { to, Icon, label, onClick } = link;

            return (
              <li key={index}>
                <Link
                  to={to}
                  className={cx(styles.item, {
                    [styles.active]: to === location.pathname,
                  })}
                  onClick={onClick ? onClick : () => {}}
                >
                  <Icon className={styles.icon} width="18" height="18" />{' '}
                  {label}
                </Link>
              </li>
            );
          })}

          <div className={styles.artist_collector_button}>
            <li className={styles.item}>
              <ArtistCollectorButtons />
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

ProfileNavigation.propTypes = {
  nav: arrayOf(
    shape({
      to: string.isRequired,
      label: string.isRequired,
      Icon: elementType.isRequired,
      onClick: func,
    })
  ),
};

export default ProfileNavigation;
