import { PENDING, UNVERIFIED, VERIFIED } from '../../constants/statuses';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { changeArtistStatus } from '../../redux/artist/actions/artistProfileActions';
import classNames from 'classnames';
import styles from './verification-buttons.module.scss';

function ArtistVerification() {
  const dispatch = useDispatch();

  const { account } = useSelector(store => store.artist.currentArtist);

  const {
    artistVerification,
    id: accountId,
    isActivated,
    isArtist,
    deletedAt,
    IsArtistsHavePaidOrders,
    IsArtistsHaveVerifiedOrders,
  } = useSelector(store => store.artist.currentArtist.account || {});

  const [verification, setVerification] = useState(artistVerification);

  const isVerified = classNames(`${styles.button}`, {
    [styles.button__verified]: verification === VERIFIED,
  });

  const isUnverified = classNames(`${styles.button}`, {
    [styles.button__unverified]: verification === UNVERIFIED,
  });

  const isPending = classNames(`${styles.button}`, {
    [styles.button__pending]: verification === PENDING || verification === null,
  });

  async function handleVerification(accountId, status) {
    await dispatch(changeArtistStatus(accountId, status, account));
    setVerification(status);
  }

  const disableVerify =
    IsArtistsHavePaidOrders ||
    IsArtistsHaveVerifiedOrders ||
    (!isActivated && isArtist) ||
    !!deletedAt;
  const disableOther =
    IsArtistsHavePaidOrders || IsArtistsHaveVerifiedOrders || !!deletedAt;

  return (
    <>
      <div className={styles.button_wrapper}>
        <div className={styles.mr5}>
          <Button
            className={isVerified}
            variant="contained"
            onClick={() => handleVerification(accountId, VERIFIED)}
            disabled={disableVerify || verification === VERIFIED}
          >
            Verify
          </Button>
        </div>

        <div className={styles.mr5}>
          <Button
            className={isUnverified}
            variant="contained"
            onClick={() => handleVerification(accountId, UNVERIFIED)}
            disabled={disableOther || verification === UNVERIFIED}
          >
            Unverify
          </Button>
        </div>

        <div className={styles.mr5}>
          <Button
            className={isPending}
            variant="contained"
            onClick={() => handleVerification(accountId, PENDING)}
            disabled={disableOther || verification === PENDING}
          >
            Pending
          </Button>
        </div>
      </div>
    </>
  );
}

export default ArtistVerification;
