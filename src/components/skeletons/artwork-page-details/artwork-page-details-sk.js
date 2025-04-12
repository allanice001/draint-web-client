import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artwork-page-details-sk.module.scss';

export default function ArtworkDetailsSkeleton() {
  return (
    <div id="artwork_edit_form">
      <h2><Skeleton variant="text" width="100%" height={30} /></h2>
      <h3><Skeleton variant="text" width="40%" height={25} /></h3>
      <div className={styles.description}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="90%" /></span>
          </div>

          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="30%" /></span>
          </div>

          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="60%" /></span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="100%" /></span>
          </div>

          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="90%" /></span>
          </div>

          <div className={styles.field}>
            <label><Skeleton variant="text" width="50%" /></label>
            <span><Skeleton variant="text" width="80%" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
