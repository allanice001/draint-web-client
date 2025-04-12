import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styles from './counter.module.scss';

const Counter = ({
  loading, countries, artists, artworks,
}) => {
  const handleRounded = (numb) => {
    if (+numb > 10000) {
      const newNumb = Math.round(numb / 1000);
      return `${newNumb}k`;
    }
    return numb;
  };

  return (
    <section>
      {!loading ? (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.counter}>{countries}</span>
            <br />
            <span className={styles.name}>Countries</span>
          </div>
          <div className={styles.content}>
            <span className={styles.counter}>{handleRounded(artists)}</span>
            <br />
            <span className={styles.name}>Artists</span>
          </div>
          <div className={styles.content}>
            <span className={styles.counter}>{handleRounded(artworks)}</span>
            <br />
            <span className={styles.name}>Artworks</span>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.content}><Skeleton width="100%" height="100%" /></div>
          <div className={styles.content}><Skeleton width="100%" height="100%" /></div>
          <div className={styles.content}><Skeleton width="100%" height="100%" /></div>
        </div>
      )}
    </section>
  );
};

export { Counter };
