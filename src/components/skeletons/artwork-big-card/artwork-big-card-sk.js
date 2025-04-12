import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artwork-big-card-sk.module.scss';

export default function ArtworkBigCardSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image__wrapper_empty}>
        <Skeleton variant="rect" width="100%" height="100%" />
      </div>
      <div className={styles.content}>
        <div className={styles.description} style={{ width: '70%' }}>
          <br />
          <Skeleton variant="h4" className={styles.title} width="90%" />
          <Skeleton variant="text" className={styles.artist} width="100%" />
          <Skeleton variant="text" className={styles.params} width="100%" />
        </div>
        <Skeleton className={styles.price} width="20%" />
      </div>
    </div>
  );
}
