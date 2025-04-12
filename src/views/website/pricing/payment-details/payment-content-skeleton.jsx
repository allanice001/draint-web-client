import * as CONSTANTS from 'constants/components/pricing';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './payment-details.module.scss';

export const PaymentContentSkeleton = () => {
  return (
    <div className={styles.pm_info}>
      <Skeleton
        animation={CONSTANTS.SKELETON_WAVE}
        width={65}
        height={75}
        className={styles.icon}
      />
      <Skeleton animation={CONSTANTS.SKELETON_WAVE} width={150} />
    </div>
  );
};
