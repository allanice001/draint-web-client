import ArtworkPriceChart from 'components/artwork/atrwork-price-chart/artwork-price-chart';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

function PriceDetails() {
  const { loading, editMode } = useArtworkPage();

  const details = classNames(styles.details__part, {
    [styles.disabled]: editMode,
  });

  return (
    <div className={details}>
      {loading ? (
        <div className={styles.details__empty}>
          <Skeleton height={175} variant="circle" width={175} />
          <div className={styles.details__empty_info}>
            <p>
              <Skeleton height={21} variant="text" width="100%" />
            </p>
            <p>
              <Skeleton height={25} variant="text" width="100%" />
            </p>
            <p>
              <Skeleton height={25} variant="text" width="100%" />
            </p>
            <p>
              <Skeleton height={25} variant="text" width="100%" />
            </p>
          </div>
        </div>
      ) : (
        <ArtworkPriceChart />
      )}
    </div>
  );
}

export default PriceDetails;
