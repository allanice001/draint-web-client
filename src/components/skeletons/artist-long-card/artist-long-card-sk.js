import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classnames from 'classnames';
import styles from './artist-long-card-sk.module.scss';

export default function ArtistLongCardSkeleton({ fluid }) {
  const wrapperClasses = classnames(styles.artist__wrapper_empty, {
    [styles.fluid]: fluid,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.artist__content}>
        <h4 className={styles.artist__name}>
          <Skeleton variant="text" width="70%" />
        </h4>
        <Skeleton variant="text" width="60%" />

        <div className={styles.artwork__list}>
          <div className={styles.artwork__wrapper}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
          <div className={styles.artwork__wrapper}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
          <div className={styles.artwork__wrapper}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
