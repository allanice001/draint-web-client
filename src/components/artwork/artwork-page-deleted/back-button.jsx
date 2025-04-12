import React from 'react';
import styles from './artwork-page-deleted.module.scss';
import { useHistory } from 'react-router';

export function BackButton() {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() => history.goBack()}
      className={`secondary-button ${styles.button}`}
    >
      Back
    </button>
  );
}
