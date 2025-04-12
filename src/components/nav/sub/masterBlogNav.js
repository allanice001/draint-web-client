import {
  ATELIER,
  BLOG,
  MASTER_ROOT,
} from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export const MasterBlogNav = () => {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${BLOG}`}
        activeClassName={styles.active}
      >
        Blog
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${ATELIER}`}
        activeClassName={styles.active}
      >
        Atelier
      </NavLink>
    </nav>
  );
};
