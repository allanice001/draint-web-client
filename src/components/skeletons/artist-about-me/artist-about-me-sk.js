import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artist-about-me-sk.module.scss';

export default function ArtistAboutMeSkeleton() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.biography}>
        <div className={styles.header}>
          <Skeleton variant="text" width="40%" height={24} />
        </div>
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" width="80%" height={24} />
      </div>

      <div className={styles.block}>
        <div className={styles.list}>
          <div className={`${styles.header} ${styles.space}`}>
            <Skeleton variant="text" width="40%" height={24} />
          </div>
          <Skeleton variant="text" height={24} />
        </div>

        <div className={styles.list}>
          <div className={`${styles.header} ${styles.space}`}>
            <Skeleton variant="text" width="40%" height={24} />
          </div>
          <Skeleton variant="text" height={24} />
        </div>

        <div className={styles.list}>
          <div className={`${styles.header} ${styles.space}`}>
            <Skeleton variant="text" width="40%" height={24} />
          </div>
          <Skeleton variant="text" height={24} />
        </div>

      </div>
    </div>
  );
}
