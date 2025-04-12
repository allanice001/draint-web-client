import {
  HOMEPAGE,
  JOIN_US,
  MASTER_ROOT,
  SECTIONS,
} from 'constants/routes/masterModule/dashboard';

import {
  SECTION_GENERATOR_TITLE,
  SECTION_TITLE,
} from 'constants/components/homepage';
import { Card } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export const MasterJoinUsNav = () => {
  return (
    <>
      <Card className={styles.subnav}>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${JOIN_US}`}
          activeClassName={styles.active}
        >
          {SECTION_GENERATOR_TITLE}
        </NavLink>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${JOIN_US}${SECTIONS}`}
          activeClassName={styles.active}
        >
          {SECTION_TITLE}
        </NavLink>
      </Card>
    </>
  );
};
