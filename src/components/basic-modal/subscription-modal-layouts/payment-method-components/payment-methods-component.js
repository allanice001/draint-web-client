import Button from './payment-method-buttons';
import React from 'react';
import styles from '../../subscription-modal.module.scss';

function PaymentMethodsComponent({
  paymentSystem,
  handlePaymentSystem,
  isTrial,
}) {
  return (
    <div className={styles.select_payment_wrapper}>
      {isTrial ? (
        <>
          <div>
            <Button.StripeSubscriptionCheckout
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
            <div className={styles.delimiter} />
            <Button.PayPalComponent
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
          </div>
          <div className={styles.border_line} />
        </>
      ) : (
        <>
          <div>
            <Button.StripeSubscriptionCheckout
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
            <div className={styles.delimiter} />
            <Button.PayPalComponent
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
            <div className={styles.delimiter} />
            <Button.SepaComponent
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
            <div className={styles.delimiter} />
            <Button.SofortComponent
              paymentSystem={paymentSystem}
              handlePaymentSystem={handlePaymentSystem}
            />
          </div>
          <div className={styles.border_line} />
        </>
      )}
    </div>
  );
}

export default PaymentMethodsComponent;
