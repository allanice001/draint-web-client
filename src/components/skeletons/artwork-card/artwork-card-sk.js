import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artwork-card-sk.module.scss';

export default function ArtworkCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image__wrapper}>
        <Skeleton width="100%" height="100%" variant="rect" />
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <h4 className={styles.title}><Skeleton variant="text" width="60%" /></h4>
          <div className={styles.artist__name}>
            <Skeleton variant="text" width="50%" />
          </div>
          <i className={styles.artwork__details}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="70%" />
          </i>
        </div>

        <div className={styles.right}>
          <div className={styles.artist__avatar}>
            <Skeleton width="100%" height="100%" variant="circle" />
          </div>
          <br />
          <Skeleton variant="text" width={50} />
        </div>
      </div>
    </div>
  );
}
