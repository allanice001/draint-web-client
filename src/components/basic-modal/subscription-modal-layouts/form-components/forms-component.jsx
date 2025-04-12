import {
  PAY_PAL,
  SEPA,
  SOFORT,
  STRIPE,
  TEST,
} from 'constants/components/pricing';

import PayPalFormComponent from './paypal-form-component';
import PropTypes from 'prop-types';
import React from 'react';
import StripeFormComponent from './stripe-form-component';
import StripeSepaForm from 'components/materialForm/stripeForm/stripeSepaForm';
import StripeSofortForm from 'components/materialForm/stripeForm/stripeSofortForm';
import styles from '../../subscription-modal.module.scss';

function FormsComponent({
  paymentSystem,
  checkedPlan,
  countries,
  userCountry,
  handleChangeUserCountry,
}) {
  const activePaymentSystem = paymentSystem || STRIPE;

  return (
    <div className={styles.stripe_form_component_wrapper}>
      {(activePaymentSystem === STRIPE || checkedPlan === TEST) && (
        <div
          className={
            checkedPlan !== TEST
              ? styles.inputs_wrapper
              : styles.inputs_wrapper_pay_pal
          }
        >
          <StripeFormComponent
            checkedPlan={checkedPlan}
            countries={countries}
            handleChangeUserCountry={handleChangeUserCountry}
            userCountry={userCountry}
          />
        </div>
      )}

      {activePaymentSystem === PAY_PAL && checkedPlan !== TEST && (
        <div
          className={
            checkedPlan !== TEST
              ? styles.inputs_wrapper
              : styles.inputs_wrapper_pay_pal
          }
        >
          <PayPalFormComponent />
        </div>
      )}

      {activePaymentSystem === SEPA && checkedPlan !== TEST && (
        <div
          className={
            checkedPlan !== TEST
              ? styles.inputs_wrapper
              : styles.inputs_wrapper_pay_pal
          }
        >
          <StripeSepaForm />
        </div>
      )}

      {activePaymentSystem === SOFORT && checkedPlan !== TEST && (
        <div
          className={
            checkedPlan !== TEST
              ? styles.inputs_wrapper
              : styles.inputs_wrapper_pay_pal
          }
        >
          <StripeSofortForm />
        </div>
      )}
    </div>
  );
}

FormsComponent.propTypes = {
  checkedPlan: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      ccode: PropTypes.string.isRequired,
      cname: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChangeUserCountry: PropTypes.func.isRequired,
  paymentSystem: PropTypes.string.isRequired,
  userCountry: PropTypes.shape({
    ccode: PropTypes.string.isRequired,
    cname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormsComponent;
