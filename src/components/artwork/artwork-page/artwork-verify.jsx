import MasterArtworkVerify from './master-artwork-verify';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import getSaleStatus from 'services/artwork-sale-service';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

function ArtworkVerify() {
  const {
    verify,
    isSold,
    currentArtwork,
    loading,
    isOwnerCanEditArtwork,
    artworkSaleStatusData,
    canEditRoles,
  } = useArtworkPage();

  const status = !currentArtwork.verification
    ? 'pending'
    : currentArtwork.verification;

  return loading ? (
    <div className={styles.verification}>
      <Skeleton height={30} variant="text" width="100%" />
    </div>
  ) : (
    <>
      <div className={styles.verification}>
        <div className={styles.verification__status}>
          Status: <span className={styles[status]}>{status}</span>
        </div>
        {canEditRoles && (
          <MasterArtworkVerify
            currentArtwork={currentArtwork}
            verify={verify}
            isOwnerCanEditArtwork={isOwnerCanEditArtwork}
            isSold={isSold}
          />
        )}
      </div>
      <div className={styles.verification__sale_status}>
        Sale Status:{' '}
        <span className={styles.sale}>
          {getSaleStatus(artworkSaleStatusData)}
        </span>
      </div>
    </>
  );
}

export default ArtworkVerify;
