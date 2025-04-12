import { ARTISTS, ARTWORKS } from 'constants/routes/masterModule/artists';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export function MasterArtistsNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${ARTISTS}`}
        activeClassName={styles.active}
      >
        Approvals
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${ARTWORKS}`}
        activeClassName={styles.active}
      >
        Artwork
      </NavLink>
    </nav>
  );
}
