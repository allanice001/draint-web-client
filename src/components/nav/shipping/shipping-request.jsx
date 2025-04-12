import {
  SHIPPING_MANUAL,
  SHIPPING_REQUESTS,
  SHIPPING_WRAPPED,
} from 'constants/routes/masterModule/dashboard';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from 'components/nav/sub/sub.module.scss';
import { useLocation } from 'react-router';

function ShippingRequestNav() {
  const location = useLocation();
  const shippingUrls = [
    `${MASTER_ROOT}${SHIPPING_REQUESTS}`,
    `${MASTER_ROOT}${SHIPPING_REQUESTS}${SHIPPING_MANUAL}`,
  ];

  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${SHIPPING_REQUESTS}`}
        activeClassName={styles.active}
        isActive={() => shippingUrls.some(url => url === location.pathname)}
      >
        Shipping orders
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${SHIPPING_REQUESTS}${SHIPPING_WRAPPED}`}
        activeClassName={styles.active}
      >
        Wrapped steps
      </NavLink>
    </nav>
  );
}

export default ShippingRequestNav;
