import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artist-feed-sk.module.scss';

export default function ArtistFeedSkeleton() {
  return (
    <div className={styles.col}>
      <div className={styles.col}>
        <div className={styles.circle}>
          <Skeleton variant="circle" width={125} height={125} />
        </div>
        <div>
          <Skeleton variant="h3" width={210} />
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <div className={styles.rect}>
          <Skeleton variant="rect" width={370} height={370} />
        </div>
        <div className={styles.rect}>
          <Skeleton variant="rect" width={370} height={370} />
        </div>
        <div className={styles.rect}>
          <Skeleton variant="rect" width={370} height={370} />
        </div>
      </div>
    </div>
  );
}
