import {
  FAQ,
  LEGAL,
  MASTER_ROOT,
} from 'constants/routes/masterModule/dashboard';

import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export function MasterLegalNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${LEGAL}`}
        activeClassName={styles.active}
      >
        Legal
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${FAQ}`}
        activeClassName={styles.active}
      >
        FAQ
      </NavLink>
    </nav>
  );
}
