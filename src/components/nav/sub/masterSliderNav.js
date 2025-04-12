import {
  HOMEPAGE,
  MASTER_ROOT,
  SLIDER,
  SLIDES,
} from 'constants/routes/masterModule/dashboard';
import {
  SLIDES_TITLE,
  SLIDE_GENERATOR_TITLE,
} from 'constants/components/homepage';
import { Card } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export const MasterSliderNav = () => {
  return (
    <>
      <Card className={styles.subnav}>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${SLIDER}`}
          activeClassName={styles.active}
        >
          {SLIDE_GENERATOR_TITLE}
        </NavLink>
        <NavLink
          exact
          to={`${MASTER_ROOT}${HOMEPAGE}${SLIDER}${SLIDES}`}
          activeClassName={styles.active}
        >
          {SLIDES_TITLE}
        </NavLink>
      </Card>
    </>
  );
};
