import {
  PAY_PAL,
  SEPA,
  SOFORT,
  STRIPE,
} from '../../../../constants/components/pricing';

import Icon from '../../../icons';
import React from 'react';
import styles from '../../subscription-modal.module.scss';

const ICON_SIZE = 40;

function StripeSubscriptionCheckout(props) {
  return (
    <div
      className={
        props.paymentSystem === STRIPE
          ? styles.checked_payment_wrapper
          : styles.payment_wrapper
      }
    >
      <button
        type="button"
        onClick={() => props.handlePaymentSystem(STRIPE)}
        className={styles.check_payment}
      >
        <div className={styles.check_icon}>
          <Icon.CheckCircleGreen />
        </div>
        <div className={styles.payment_icon_wrapper}>
          <div className={styles.payment_icon}>
            {props.paymentSystem === STRIPE ? (
              <Icon.StripeActive param={ICON_SIZE} />
            ) : (
              <Icon.StripeDisabled param={ICON_SIZE} />
            )}
          </div>
          <p className={styles.payment_name}>Stripe Checkout</p>
        </div>
      </button>
    </div>
  );
}

function PayPalComponent(props) {
  return (
    <div
      className={
        props.paymentSystem === PAY_PAL
          ? styles.checked_payment_wrapper
          : styles.payment_wrapper
      }
    >
      <button
        type="button"
        onClick={() => props.handlePaymentSystem(PAY_PAL)}
        className={styles.check_payment}
      >
        <div className={styles.check_icon}>
          <Icon.CheckCircleGreen />
        </div>
        <div className={styles.payment_icon_wrapper}>
          <div className={styles.payment_icon}>
            {props.paymentSystem === PAY_PAL ? (
              <Icon.PayPalIconColorActive param={ICON_SIZE} />
            ) : (
              <Icon.PayPalIconColorDisabled param={ICON_SIZE} />
            )}
          </div>
          <p className={styles.payment_name}>PayPal</p>
        </div>
      </button>
    </div>
  );
}

function SepaComponent(props) {
  return (
    <div
      className={
        props.paymentSystem === SEPA
          ? styles.checked_payment_wrapper
          : styles.payment_wrapper
      }
    >
      <button
        type="button"
        onClick={() => props.handlePaymentSystem(SEPA)}
        className={styles.check_payment}
      >
        <div className={styles.check_icon}>
          <Icon.CheckCircleGreen />
        </div>
        <div className={styles.payment_icon_wrapper}>
          <div className={styles.payment_icon}>
            {props.paymentSystem === SEPA ? (
              <Icon.SepaIconActive param={ICON_SIZE} />
            ) : (
              <Icon.SepaIconDisabled param={ICON_SIZE} />
            )}
          </div>
          <p className={styles.payment_name}>SEPA Debit</p>
        </div>
      </button>
    </div>
  );
}

function SofortComponent(props) {
  return (
    <div
      className={
        props.paymentSystem === SOFORT
          ? styles.checked_payment_wrapper
          : styles.payment_wrapper
      }
    >
      <button
        type="button"
        onClick={() => props.handlePaymentSystem(SOFORT)}
        className={styles.check_payment}
      >
        <div className={styles.check_icon}>
          <Icon.CheckCircleGreen />
        </div>
        <div className={styles.payment_icon_wrapper}>
          <div className={styles.payment_icon}>
            {props.paymentSystem === SOFORT ? (
              <Icon.KlarnaIconActive param={ICON_SIZE} />
            ) : (
              <Icon.KlarnaIconDisabled param={ICON_SIZE} />
            )}
          </div>
          <p className={styles.payment_name}>Klarna Sofort</p>
        </div>
      </button>
    </div>
  );
}

const StripeCheckoutExport = {
  StripeSubscriptionCheckout,
  PayPalComponent,
  SepaComponent,
  SofortComponent,
};

export default StripeCheckoutExport;
