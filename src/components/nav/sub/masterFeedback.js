import {
  FEEDBACK,
  MASTER_ROOT,
  OPTIONS,
} from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';

import React from 'react';
import styles from './sub.module.scss';

export function MasterFeedbackNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${FEEDBACK}`}
        activeClassName={styles.active}
      >
        Feedback
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${FEEDBACK}${OPTIONS}`}
        activeClassName={styles.active}
      >
        Options
      </NavLink>
    </nav>
  );
}
