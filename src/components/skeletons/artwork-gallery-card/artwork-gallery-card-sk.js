import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artwork-gallery-card-sk.module.scss';

export default function ArtworkGalleryCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton height={250} variant="rect" />
      <div className={styles.content}>
        <div className={styles.title}>
          <Skeleton width="60%" height={30} variant="text" />
          <Skeleton width="20%" height={30} variant="text" />
        </div>
        <div className={styles.title}>
          <Skeleton width="70%" height={20} variant="text" />
        </div>
      </div>
    </div>
  );
}
