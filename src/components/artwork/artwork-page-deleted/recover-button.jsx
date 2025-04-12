import React from 'react';
import { recoverArtwork } from 'redux/artwork/actions/artworkActions';
import styles from './artwork-page-deleted.module.scss';
import { useDispatch } from 'react-redux';

export function RecoverButton({ artworkId, onRecover, accountId }) {
  const dispatch = useDispatch();
  function handleRecover() {
    if (onRecover) {
      return onRecover(artworkId, accountId);
    }

    return dispatch(recoverArtwork({ artworkId, accountId }));
  }

  return (
    <button
      type="button"
      onClick={handleRecover}
      className={`primary-button ${styles.button}`}
    >
      Restore artwork
    </button>
  );
}
