import React from 'react';
import styles from './list-header.module.scss';

export default function ListHeader(props) {
  const { count = 0, title, countLabel } = props;

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title}</h3>

      {Boolean(count) && (
        <span className={styles.count}>{count} {countLabel}</span>
      )}
    </div>
  );
}
