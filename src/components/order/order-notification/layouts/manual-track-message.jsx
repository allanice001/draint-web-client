import * as Button from 'components/shared/button';
import styles from 'components/order/order-notification/order-notification.module.scss';
import Icons from 'components/icons';
import {
  TRACK_MESSAGE,
  TRACK_PACKAGE,
  WITHOUT_TRACK_MANUAL_MESSAGE,
} from 'constants/components/orders/constatns';
import React, { useRef } from 'react';
import cx from 'classnames';
import { useCollectorTheme } from 'hooks/use-theme';

export function ManualTrackMessage({ order }) {
  const iconRef = useRef();
  useCollectorTheme(iconRef);

  const {
    shipment: { tracker_link: trackerLink },
  } = order;

  function to() {
    if (trackerLink) {
      window.open(trackerLink);
    }
  }

  function getNotification() {
    if (trackerLink) {
      return (
        <span>
          {TRACK_MESSAGE}
          {order.trackerNumber && (
            <span className={styles.tracker_number}>{order.trackerNumber}</span>
          )}
        </span>
      );
    }

    return <span>{WITHOUT_TRACK_MANUAL_MESSAGE}</span>;
  }

  return (
    <>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle
          className={cx(styles.icon, styles.incoming)}
          ref={iconRef}
        />
        {getNotification()}
      </div>
      {trackerLink && (
        <div className={styles.actions}>
          <Button.Success sm onClick={to}>
            {TRACK_PACKAGE}
          </Button.Success>
        </div>
      )}
    </>
  );
}
