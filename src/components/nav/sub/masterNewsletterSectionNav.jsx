import {
  HOMEPAGE,
  MASTER_ROOT,
  NEWSLETTER_SECTION,
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

export const MasterNewsLetterSectionNav = () => {
  return (
    <>
      <Card className={styles.subnav}>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${NEWSLETTER_SECTION}`}
          activeClassName={styles.active}
        >
          {SECTION_GENERATOR_TITLE}
        </NavLink>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${NEWSLETTER_SECTION}${SECTIONS}`}
          activeClassName={styles.active}
        >
          {SECTION_TITLE}
        </NavLink>
      </Card>
    </>
  );
};
