import {
  INVITES,
  MASTER_ROOT,
  PERMISSION,
} from 'constants/routes/masterModule/dashboard';

import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export const MasterPermissionNav = () => {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${PERMISSION}`}
        activeClassName={styles.active}
      >
        Team
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${INVITES}`}
        activeClassName={styles.active}
      >
        Invitation
      </NavLink>
    </nav>
  );
};
