import React from 'react';
import styles from '../../master-payouts-requests.module.scss';

function EmptyMessage({ message }) {
  return (
    <div className={styles.empty}>
      <p>{ message }</p>
    </div>
  )
}

export default EmptyMessage;
