import { PENDING, UNVERIFIED, VERIFIED } from 'constants/statuses';
import { Button } from '@material-ui/core';
import React from 'react';
import styles from './artwork-page.module.scss';

const MasterArtworkVerify = ({
  currentArtwork,
  verify,
  isOwnerCanEditArtwork,
  isSold,
}) => {
  return (
    <div>
      <Button
        className={`${styles.verification__btn} ${styles.verified}`}
        disabled={
          currentArtwork.verification === VERIFIED ||
          !isOwnerCanEditArtwork ||
          isSold
        }
        onClick={() => verify(currentArtwork.id, VERIFIED, currentArtwork.owner_profile_id)}
        variant="contained"
      >
        Verify
      </Button>
      <Button
        className={`${styles.verification__btn} ${styles.unverified}`}
        disabled={
          currentArtwork.verification === UNVERIFIED ||
          !isOwnerCanEditArtwork ||
          isSold
        }
        onClick={() => verify(currentArtwork.id, UNVERIFIED)}
        variant="contained"
      >
        Unverify
      </Button>
      <Button
        className={`${styles.verification__btn} ${styles.pending}`}
        disabled={
          currentArtwork.verification === PENDING ||
          !isOwnerCanEditArtwork ||
          isSold
        }
        onClick={() => verify(currentArtwork.id, PENDING)}
        variant="contained"
      >
        Pending
      </Button>
    </div>
  );
};

export default MasterArtworkVerify;
