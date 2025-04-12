import { PENDING, UNVERIFIED, VERIFIED } from 'constants/statuses';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { changeArtworkStatus } from 'redux/artist/actions/artistProfileActions';
import classNames from 'classnames';
import styles from './verification-buttons.module.scss';

function ArtworkVerification({
  artworkId,
  artistId,
  status,
  artworkDeleted,
  isSold,
  isOwnerCanEditArtwork,
}) {
  const dispatch = useDispatch();

  const { artworks } = useSelector(store => store.artist.currentArtist);
  const { deletedAt } = useSelector(
    store => store.artist.currentArtist.account
  );

  const [verification, setVerification] = useState(status);

  const isVerified = classNames(`${styles.button}`, {
    [styles.button__verified]: verification === VERIFIED,
  });

  const isUnverified = classNames(`${styles.button}`, {
    [styles.button__unverified]: verification === UNVERIFIED,
  });

  const isPending = classNames(`${styles.button}`, {
    [styles.button__pending]: verification === PENDING || verification === null,
  });

  async function handleVerification(artworkId, status, artistId) {
    await dispatch(changeArtworkStatus(artworkId, status, artworks, artistId));
    setVerification(status);
  }

  const disabledAll =
    !!deletedAt || artworkDeleted || isSold || !isOwnerCanEditArtwork;

  return (
    <>
      <div className={styles.button_wrapper}>
        <div className={styles.mr5}>
          <Button
            className={disabledAll ? '' : isVerified}
            variant="contained"
            onClick={() => handleVerification(artworkId, VERIFIED, artistId)}
            disabled={disabledAll || verification === VERIFIED}
          >
            Verify
          </Button>
        </div>

        <div className={styles.mr5}>
          <Button
            className={disabledAll ? '' : isUnverified}
            variant="contained"
            onClick={() => handleVerification(artworkId, UNVERIFIED)}
            disabled={disabledAll || verification === UNVERIFIED}
          >
            Unverify
          </Button>
        </div>

        <div className={styles.mr5}>
          <Button
            className={disabledAll ? '' : isPending}
            variant="contained"
            onClick={() => handleVerification(artworkId, PENDING)}
            disabled={disabledAll || verification === PENDING}
          >
            Pending
          </Button>
        </div>
      </div>
    </>
  );
}

export default ArtworkVerification;
