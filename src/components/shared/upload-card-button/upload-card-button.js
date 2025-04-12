import React from 'react';
import UploadIcon from 'components/icons/upload';
import styles from './upload-card-button.module.scss';

export const UploadCardButton = props => {
  const { children, onClick } = props;

  return (
    <button className={styles.root} type="button" onClick={onClick}>
      <UploadIcon className={styles.icon} />
      <span>{children}</span>
    </button>
  );
};
