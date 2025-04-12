import * as Button from 'components/shared/button';
import { COLLECTOR_DASHBOARD_SALES } from 'constants/routes/collector-profile';
import { DECLINED } from 'constants/global';
import Icons from 'components/icons';
import { Link } from 'components/link/link';
import {
  MASTER_PAYOUT_REQUESTS,
  PROFILE_SALES,
} from 'constants/routes/artist-profile';
import React, { useRef } from 'react';
import classnames from 'classnames';
import styles from './order-notification.module.scss';
import { useSelector } from 'react-redux';
import { UpsTrackMessage } from './layouts/ups-track-message';
import { ManualTrackMessage } from './layouts/manual-track-message';
import {
  AUTHENTICITY_CERTIFICATE,
  CHECK_AND_UPLOAD_NEW,
  CONFIRM,
  CONFIRM_PAYMENT,
  CONFIRM_PURCHASE,
  CREATE_CERTIFICATE,
  CREATE_SIGNATURE,
  DECLINE,
  EURO_SYM,
  INSTRUCTION,
  INSTRUCTIONS_MESSAGE,
  MASTER_PAYOUTS,
  OF,
  PAYMENT_IS_CONFIRMED,
  PAYOUT_SUCCESS,
  PLEASE_UPLOAD_THE_REST,
  PROCESSED,
  REQUESTED_PAYOUT,
  SALES_DASHBOARD,
  SCHEDULE_PACKAGE,
  SCHEDULE_PACKAGE_MESSAGE,
  SIGNATURE_IS_CREATED,
  SUCCESS_SCHEDULE_PACKAGE_MESSAGE,
  VERIFY,
  WE_CHECK_YOUR_PHOTOS,
  WRAP_ARTWORK,
  YOUR_PAYOUTS,
  YOU_HAVE,
  YOU_UPLOADED,
} from 'constants/components/orders/constatns';
import { useCollectorTheme } from 'hooks/use-theme';

export const SellerConfirmedNotification = ({ confirmOrderPayment }) => {
  const loading = useSelector(store => store.dashboard.orders.loading);
  const iconClasses = classnames(styles.icon, styles.incoming);
  const successButtonClasses = classnames({
    [styles.success__load]: loading,
  });

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{CONFIRM_PAYMENT}</span>
      </div>
      <div className={styles.actions}>
        <Button.Success
          sm
          className={successButtonClasses}
          onClick={confirmOrderPayment}
          disabled={loading}
        >
          {loading ? PROCESSED : CONFIRM}
        </Button.Success>
      </div>
    </div>
  );
};

export const ConfirmOrderNotification = ({
  onVerify,
  onDecline,
  shipmentId,
}) => {
  const iconClasses = classnames(styles.icon, styles.incoming);

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{CONFIRM_PURCHASE}</span>
      </div>
      <div className={styles.actions}>
        <Button.Danger sm onClick={onDecline}>
          {DECLINE}
        </Button.Danger>

        <Button.Success sm onClick={onVerify} disabled={!shipmentId}>
          {VERIFY}
        </Button.Success>
      </div>
    </div>
  );
};

export const CertificateNotification = ({
  signature,
  onCreateSignature,
  onCreateCertificate,
}) => {
  const isSignet = signature && !Boolean(Object.keys(signature).length);
  const iconClasses = classnames(styles.icon, styles.incoming);

  function getInfo() {
    if (isSignet) {
      return (
        <span>
          {PAYMENT_IS_CONFIRMED}
          <b>{AUTHENTICITY_CERTIFICATE}</b>.
        </span>
      );
    }

    return (
      <span>
        {SIGNATURE_IS_CREATED}
        <b>{AUTHENTICITY_CERTIFICATE}</b>.
      </span>
    );
  }

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        {getInfo()}
      </div>
      <div className={styles.actions}>
        <Button.Secondary
          sm
          onClick={isSignet ? onCreateSignature : onCreateCertificate}
        >
          {isSignet ? CREATE_SIGNATURE : CREATE_CERTIFICATE}
        </Button.Secondary>
      </div>
    </div>
  );
};

export const WrappedInstructionNotification = ({
  onInstructionOpen,
  onArtworkWrapped,
  order,
}) => {
  const iconClasses = classnames(styles.icon, styles.incoming);
  const isDeclined = order.wrappedSteps.filter(
    photos => photos.photo && photos.status === DECLINED
  );
  const isUploaded = order.wrappedSteps.filter(
    photos => photos.photo && photos.uploaded
  );
  const allUploaded = isUploaded.length === order.wrappedSteps.length;
  const haveDeclined = Boolean(isDeclined.length);

  function Notifications({ order }) {
    if (!Boolean(isUploaded.length)) {
      return <span className={styles.info_text}>{INSTRUCTIONS_MESSAGE}</span>;
    }

    if (isUploaded.length < order.wrappedSteps.length) {
      return (
        <span
          className={styles.info_text}
        >{`${YOU_UPLOADED} ${isUploaded.length}${OF}${order.wrappedSteps.length}${PLEASE_UPLOAD_THE_REST}`}</span>
      );
    }

    if (allUploaded && !Boolean(isDeclined.length)) {
      return <span className={styles.info_text}>{WE_CHECK_YOUR_PHOTOS}</span>;
    }

    if (Boolean(isDeclined.length)) {
      return (
        <span
          className={styles.info_text}
        >{`${YOU_HAVE}${isDeclined.length}${CHECK_AND_UPLOAD_NEW}`}</span>
      );
    }

    return <span className={styles.info_text}>{INSTRUCTIONS_MESSAGE}</span>;
  }

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <Notifications order={order} />
      </div>

      {(!allUploaded || haveDeclined) && (
        <div className={styles.actions}>
          <Button.Secondary sm onClick={onInstructionOpen}>
            {INSTRUCTION}
          </Button.Secondary>

          <Button.Success sm onClick={onArtworkWrapped}>
            {WRAP_ARTWORK}
          </Button.Success>
        </div>
      )}
    </div>
  );
};

export const PickupScheduledNotification = ({ onPickupScheduled }) => {
  const iconClasses = classnames(styles.icon, styles.incoming);

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{SCHEDULE_PACKAGE_MESSAGE}</span>
      </div>
      <div className={styles.actions}>
        <Button.Success sm onClick={onPickupScheduled}>
          {SCHEDULE_PACKAGE}
        </Button.Success>
      </div>
    </div>
  );
};

export const ArtworkWaitingSentNotification = ({ onArtworkShipped }) => {
  const iconClasses = classnames(styles.icon, styles.incoming);

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{SUCCESS_SCHEDULE_PACKAGE_MESSAGE}</span>
      </div>
    </div>
  );
};

export const ArtworkSentNotification = ({ order, setOpen }) => {
  const { isManual } = order;

  return (
    <div className={styles.sent_wrapper}>
      {isManual ? (
        <ManualTrackMessage order={order} />
      ) : (
        <UpsTrackMessage order={order} setOpen={setOpen} />
      )}
    </div>
  );
};

export const ArtworkDeliveredNotification = ({
  resale = false,
  masterOrder = false,
}) => {
  const linkRef = useRef();
  useCollectorTheme(linkRef);

  const iconClasses = classnames(styles.icon, styles.incoming);

  function getSalesUrl() {
    if (resale) {
      return COLLECTOR_DASHBOARD_SALES;
    }

    if (masterOrder) {
      return MASTER_PAYOUT_REQUESTS;
    }

    return PROFILE_SALES;
  }

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{masterOrder ? MASTER_PAYOUTS : YOUR_PAYOUTS}</span>
      </div>
      <div className={styles.actions}>
        <Link url={getSalesUrl()} className={styles.link} ref={linkRef}>
          {masterOrder ? REQUESTED_PAYOUT : SALES_DASHBOARD}
        </Link>
      </div>
    </div>
  );
};

export const OrderHasBeenPayoutNotification = ({ price }) => {
  const iconClasses = classnames(styles.icon, styles.incoming);
  const amount = price && Number.parseFloat(price).toFixed(2);

  return (
    <div className={styles.sent_wrapper}>
      <div className={styles.info_wrapper}>
        <Icons.ArrowCircle className={iconClasses} />
        <span>{`${PAYOUT_SUCCESS}${amount} ${EURO_SYM}.`}</span>
      </div>
    </div>
  );
};

function OrderNotification({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default OrderNotification;
