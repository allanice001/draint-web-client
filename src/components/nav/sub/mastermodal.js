import { CONNECT, MODALS_ROOT } from 'constants/routes/masterModule/modal';
import Card from '@material-ui/core/Card';

import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export function MasterModalNav() {
  return (
    <Card className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${MODALS_ROOT}`}
        activeClassName={styles.active}
      >
        Upload Examples
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${MODALS_ROOT}${CONNECT}`}
        activeClassName={styles.active}
      >
        Add to Modal
      </NavLink>
    </Card>
  );
}
