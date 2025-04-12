import * as CONSTANTS from 'constants/components/pricing';
import { IbanElement } from '@stripe/react-stripe-js';
import { PaymentInputs } from 'components/materialForm/stripeForm/payment-details-inputs';
import React from 'react';
import StripeElement from './stripe-element';
import cx from 'classnames';
import styles from './stripe-pm-form.module.scss';
import { useBillingPM } from 'hooks/use-billing-PM';
import { useStripeForm } from 'hooks/use-stripe-form';

function IbanPMElement({ handleSubmit, paymentMethod }) {
  const { error, onChangeErrorHandler } = useStripeForm();
  const cardInput = cx(styles.stripe_input, {
    [styles.stripe_input_error]: error,
  });

  return (
    <form onSubmit={handleSubmit} id={CONSTANTS.STRIPE_PM_SEPA_DEBIT_FORM}>
      <div className={styles.stripe_pm_form_wrapper}>
        <div className={styles.payment_inputs_wrapper}>
          <PaymentInputs initialValues={paymentMethod} />
        </div>
        <div className={styles.stripe_elements}>
          <div className={styles.row_iban}>
            <span className={styles.title}>{CONSTANTS.ROW_IBAN}</span>
            <IbanElement
              options={CONSTANTS.IBAN_ELEMENT_OPTIONS}
              className={cardInput}
              onChange={onChangeErrorHandler}
            />
            <div className={styles.acceptance}>
              {CONSTANTS.IBAN_MANDATE_FOR_FUTURE_PAYMENTS}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function StripePmSepaDebitSubmit() {
  const { paymentMethod } = useBillingPM();
  const { submitPMSepaDebit } = useStripeForm();

  return (
    <IbanPMElement
      handleSubmit={event => submitPMSepaDebit(event, paymentMethod)}
      paymentMethod={paymentMethod}
    />
  );
}

export default function StripePmSepaDebitForm() {
  return (
    <StripeElement>
      <StripePmSepaDebitSubmit />
    </StripeElement>
  );
}
