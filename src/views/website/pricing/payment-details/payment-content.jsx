import * as Button from 'components/shared/button';
import * as CONSTANTS from 'constants/components/pricing';
import { PaymentContentSkeleton } from './payment-content-skeleton';
import React from 'react';
import cx from 'classnames';
import styles from './payment-details.module.scss';
import { useBillingPM } from 'hooks/use-billing-PM';

export const PaymentContent = () => {
  const { isStripe, Icon, title, openPaymentModal, updating } = useBillingPM();

  return (
    <div
      className={cx(styles.root, {
        [styles.root_hide]: !isStripe,
      })}
    >
      <h2 className={cx(styles.title)}>{CONSTANTS.PM_TITLE}</h2>
      <div className={styles.list}>
        <div className={styles.group}>
          <h3
            className={cx(styles.groupTitle, {
              [styles.groupTitle_updating]: updating,
            })}
          >
            {CONSTANTS.PM_SUB_TITLE}
          </h3>
          <div className={styles.content_wrapper}>
            {updating ? (
              <PaymentContentSkeleton />
            ) : (
              <div className={styles.pm_info}>
                <Icon className={styles.icon} width={60} height="100%" />
                <span>{title}</span>
              </div>
            )}
            <div className={styles.footer}>
              <Button.Secondary
                className={styles.button}
                sm
                onClick={!updating && openPaymentModal}
                disabled={updating}
              >
                {CONSTANTS.PM_DETAIL_BTN}
              </Button.Secondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
