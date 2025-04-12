import React from 'react';
import classnames from 'classnames';
import styles from './verification.module.scss';

const VerificationStatus = ({ verification }) => {
  const classes = classnames(styles.button__verification, {
    [styles.button__verification__accepted]: verification === 'verified',
    [styles.button__verification__canceled]: verification === 'declined',
    [styles.button__verification__completed]: verification === 'completed',
  });

  return <div className={classes}>{verification}</div>;
};

export default VerificationStatus;
