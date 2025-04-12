import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artist-profile-info-sk.module.scss';

export default function ArtistProfileInfoSkeleton() {
  return (
    <div className={styles.row}>
      <div className={styles.image__wrapper}>
        <Skeleton variant="rect" width="100%" height="100%" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Skeleton variant="text" width="50%" />
        </h2>
        <p className={styles.description}>
          <Skeleton className={styles.text} variant="text" width="90%" />
          <Skeleton className={styles.text} variant="text" width="90%" />
          <Skeleton className={styles.text} variant="text" width="80%" />
        </p>
        <Skeleton height="10%" width="60%" />
      </div>
    </div>
  );
}
