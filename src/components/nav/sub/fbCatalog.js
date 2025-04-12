import {
  ARTWORKS,
  FB_CATALOG_ROOT,
  FILE,
} from 'constants/routes/masterModule/fbCatalog';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export function MasterFBCatalogNav() {
  return (
    <nav className={styles.subnav}>
      <NavLink
        exact
        to={`${MASTER_ROOT}${FB_CATALOG_ROOT}${ARTWORKS}`}
        activeClassName={styles.active}
      >
        Artworks
      </NavLink>
      <NavLink
        exact
        to={`${MASTER_ROOT}${FB_CATALOG_ROOT}${FILE}`}
        activeClassName={styles.active}
      >
        Catalog
      </NavLink>
    </nav>
  );
}
