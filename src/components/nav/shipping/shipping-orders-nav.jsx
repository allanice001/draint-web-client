import {
  SHIPPING_MANUAL,
  SHIPPING_REQUESTS,
} from 'constants/routes/masterModule/dashboard';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from 'components/nav/sub/sub.module.scss';

function ShippingOrdersNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${SHIPPING_REQUESTS}`}
        activeClassName={styles.active}
      >
        UPS
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${SHIPPING_REQUESTS}${SHIPPING_MANUAL}`}
        activeClassName={styles.active}
      >
        Manual
      </NavLink>
    </nav>
  );
}

export default ShippingOrdersNav;
