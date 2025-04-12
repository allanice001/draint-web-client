import * as Button from 'components/shared/button';
import styles from 'components/order/order-notification/order-notification.module.scss';
import Icons from 'components/icons';
import {
  CHECK_IN_UPS,
  CHECK_PACKAGE,
  TRACK_MESSAGE,
  UPS_TRACK_LINK,
} from 'constants/components/orders/constatns';
import React, { useRef } from 'react';
import cx from 'classnames';
import { useCollectorTheme } from 'hooks/use-theme';

export function UpsTrackMessage({ setOpen, order }) {
  const iconRef = useRef();
  useCollectorTheme(iconRef);

  function toUPS() {
    window.open(UPS_TRACK_LINK);
  }

  return (
    <>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle
          className={cx(styles.icon, styles.incoming)}
          ref={iconRef}
        />
        <span>
          {TRACK_MESSAGE}
          {order.trackerNumber && (
            <span className={styles.tracker_number}>{order.trackerNumber}</span>
          )}
        </span>
      </div>
      <div className={styles.actions}>
        <Button.Success sm onClick={toUPS}>
          {CHECK_IN_UPS}
        </Button.Success>

        <Button.Success sm onClick={setOpen}>
          {CHECK_PACKAGE}
        </Button.Success>
      </div>
    </>
  );
}
