import {
  MY_VITA_PROFILES,
  MY_VITA_QUESTIONS,
  MY_VITA_ROOT,
} from 'constants/routes/masterModule/myVita';

import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export function MasterMyVitaNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${MY_VITA_ROOT}${MY_VITA_PROFILES}`}
        activeClassName={styles.active}
      >
        My Vita
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${MY_VITA_ROOT}${MY_VITA_QUESTIONS}`}
        activeClassName={styles.active}
      >
        Questions
      </NavLink>
    </nav>
  );
}
