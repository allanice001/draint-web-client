import * as CONSTANTS from 'constants/components/pricing';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { PaymentInputs } from 'components/materialForm/stripeForm/payment-details-inputs';
import React from 'react';
import StripeElement from './stripe-element';
import cx from 'classnames';
import styles from './stripe-pm-form.module.scss';
import { useBillingPM } from 'hooks/use-billing-PM';
import { useStripeForm } from 'hooks/use-stripe-form';

function CardElement({ handleSubmit, initialValues }) {
  const { error, onChangeErrorHandler } = useStripeForm();
  const cardInput = cx(styles.stripe_input, {
    [styles.stripe_input_error]: error,
  });

  return (
    <form onSubmit={handleSubmit} id={CONSTANTS.STRIPE_PM_CARD_FORM}>
      <div className={styles.stripe_pm_form_wrapper}>
        <div className={styles.payment_inputs_wrapper}>
          <PaymentInputs initialValues={initialValues} />
        </div>
        <div className={styles.stripe_elements}>
          <div className={styles.row_number}>
            <span className={styles.title}>{CONSTANTS.ROW_CARD_NUMBER}</span>
            <CardNumberElement
              options={CONSTANTS.CARD_ELEMENT_OPTIONS}
              className={cardInput}
              onChange={onChangeErrorHandler}
            />
          </div>
          <div className={styles.row}>
            <span className={styles.title}>{CONSTANTS.ROW_DATE}</span>
            <CardExpiryElement
              options={CONSTANTS.CARD_ELEMENT_OPTIONS}
              className={cardInput}
            />
          </div>
          <div className={styles.row_cvc}>
            <span className={styles.title}>{CONSTANTS.ROW_CVC}</span>
            <CardCvcElement
              options={CONSTANTS.CARD_ELEMENT_OPTIONS}
              className={cardInput}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function StripePmCardSubmit() {
  const { paymentMethod } = useBillingPM();
  const { submitPMCardForm } = useStripeForm();

  return (
    <CardElement
      handleSubmit={event => submitPMCardForm(event, paymentMethod)}
      initialValues={paymentMethod}
    />
  );
}

export default function StripePmCardForm() {
  return (
    <StripeElement>
      <StripePmCardSubmit />
    </StripeElement>
  );
}
