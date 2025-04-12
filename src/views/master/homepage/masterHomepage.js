import {
  HOMEPAGE,
  MASTER_ROOT,
  SLIDER,
} from 'constants/routes/masterModule/dashboard';
import { Redirect, useLocation } from 'react-router-dom';
import { MasterHomepageNav } from 'components/nav/sub/masterHomepageNav';
import React from 'react';
import styles from './homepage.module.scss';

export const MasterHomepage = () => {
  const location = useLocation();

  if (location.pathname === `${MASTER_ROOT}${HOMEPAGE}`) {
    return <Redirect to={`${MASTER_ROOT}${HOMEPAGE}${SLIDER}`} />;
  }
  return (
    <div className={styles.wrapper}>
      <MasterHomepageNav />
    </div>
  );
};
