import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './artist-blog-post-sk.module.scss';

export default function ArtistBlogPostSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.image}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
        <div className={styles.content}>
          <div className={styles.content__title}>
            <Skeleton variant="text" width="50%" height={25} />
          </div>
          <div className={styles.content__date}>
            <Skeleton variant="text" width="30%" height={16} />
          </div>
          <div className={styles.content__description}>
            <p><Skeleton variant="text" width="100%" height={16} /></p>
            <p><Skeleton variant="text" width="100%" height={16} /></p>
            <p><Skeleton variant="text" width="80%" height={16} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}
