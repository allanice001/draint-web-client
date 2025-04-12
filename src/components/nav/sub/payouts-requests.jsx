import {
  PAYOUTS_REQUESTS,
  PAYOUTS_REQUESTS_HISTORY,
} from 'constants/routes/masterModule/dashboard';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

function PayoutsRequestsNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${PAYOUTS_REQUESTS}`}
        activeClassName={styles.active}
      >
        Payouts Requests
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${PAYOUTS_REQUESTS_HISTORY}`}
        activeClassName={styles.active}
      >
        Payouts History
      </NavLink>
    </nav>
  );
}

export default PayoutsRequestsNav;
