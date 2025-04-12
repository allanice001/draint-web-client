import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'components/reduxForm/radio/radio';
import getPaymentMethods from './payment-methods';
import styles from './checkout-payment-details.module.scss';

const PaymentMethod = function({ selectedMethod, handleMethodChange }) {
  const methods = getPaymentMethods(selectedMethod);

  return (
    <>
      <div className={styles.title}>Payment method</div>
      <div className={styles.methods}>
        <RadioButton
          className={styles.method_selector}
          list={methods}
          name="radio-button-demo"
          onChange={event => handleMethodChange(event.target.value)}
          value={selectedMethod}
        />
      </div>
    </>
  );
};

PaymentMethod.propTypes = {
  selectedMethod: PropTypes.string,
  handleMethodChange: PropTypes.func,
};

const CheckoutPaymentDetails = function({
  paymentSystem,
  handlePaymentMethodChange,
  selectedPaymentMethod,
  modal,
}) {
  const [cardholder, cardHolderChange] = useState('');

  return (
    <div className={`container ${styles.container_additional}`}>
      <div className={styles.form_wrapper}>
        {!modal && (
          <div className={styles.form_left}>
            <PaymentMethod
              cardholder={cardholder}
              cardHolderChange={cardHolderChange}
              handleMethodChange={handlePaymentMethodChange}
              selectedMethod={selectedPaymentMethod}
            />
          </div>
        )}
        <div className={styles.form_right}>
          {paymentSystem.getCheckoutFormDetails &&
            paymentSystem.getCheckoutFormDetails()}
        </div>
      </div>
    </div>
  );
};

CheckoutPaymentDetails.propTypes = {
  paymentSystem: PropTypes.object,
  handlePaymentMethodChange: PropTypes.func,
  selectedPaymentMethod: PropTypes.string,
};

export default CheckoutPaymentDetails;
