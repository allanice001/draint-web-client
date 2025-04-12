import { arrayOf, elementType, func, shape, string } from 'prop-types';

import { Link } from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import styles from './dropdown-navigation.module.scss';
import { useLocation } from 'react-router';

function DropDownNavigation(props) {
  const { nav } = props;
  const location = useLocation();

  return (
    <ul className={cx(styles.nav)}>
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
              <Icon className={styles.icon} width="18" height="18" /> {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

DropDownNavigation.propTypes = {
  nav: arrayOf(
    shape({
      to: string.isRequired,
      label: string.isRequired,
      Icon: elementType.isRequired,
      onClick: func,
    })
  ),
};

export default DropDownNavigation;
