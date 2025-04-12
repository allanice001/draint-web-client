import {
  HOMEPAGE,
  JOIN_OUR,
  JOIN_US,
  MASTER_ROOT,
  NEWSLETTER_SECTION,
  REVIEWS,
  SHIPMENT_SECTION,
  SLIDER,
} from 'constants/routes/masterModule/dashboard';
import {
  JOIN_OUR_TITLE,
  JOIN_US_TITLE,
  NEWSLETTER_SECTION_TITLE,
  REVIEWS_TITLE,
  SHIPMENT_SECTION_TITLE,
  SLIDER_TITLE,
} from 'constants/components/homepage';
import { Card } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export const MasterHomepageNav = () => {
  return (
    <Card className={styles.subnav}>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${SLIDER}`}
        activeClassName={styles.active}
      >
        {SLIDER_TITLE}
      </NavLink>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${REVIEWS}`}
        activeClassName={styles.active}
      >
        {REVIEWS_TITLE}
      </NavLink>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${JOIN_US}`}
        activeClassName={styles.active}
      >
        {JOIN_US_TITLE}
      </NavLink>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${JOIN_OUR}`}
        activeClassName={styles.active}
      >
        {JOIN_OUR_TITLE}
      </NavLink>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${SHIPMENT_SECTION}`}
        activeClassName={styles.active}
      >
        {SHIPMENT_SECTION_TITLE}
      </NavLink>
      <NavLink
        to={`${MASTER_ROOT}${HOMEPAGE}${NEWSLETTER_SECTION}`}
        activeClassName={styles.active}
      >
        {NEWSLETTER_SECTION_TITLE}
      </NavLink>
    </Card>
  );
};
