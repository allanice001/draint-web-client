import { Field, reduxForm } from 'redux-form';
import { email, latinic } from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import { PAYMENT_METHOD_INPUTS } from 'constants/components/pricing';
import React from 'react';
import styles from './stripe-pm-form.module.scss';

export const PaymentInputs = reduxForm({
  form: PAYMENT_METHOD_INPUTS.formName,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(() => {
  return (
    <div className={styles.inputs_rows}>
      <div className={styles.row}>
        <Field
          name={PAYMENT_METHOD_INPUTS.nameInput}
          subscription
          component={Input}
          validate={[latinic]}
          label={PAYMENT_METHOD_INPUTS.nameLabel}
          placeholder={PAYMENT_METHOD_INPUTS.namePlaceholder}
        />
      </div>
      <div className={styles.row}>
        <Field
          name={PAYMENT_METHOD_INPUTS.emailInput}
          subscription
          component={Input}
          validate={[email, latinic]}
          label={PAYMENT_METHOD_INPUTS.emailLabel}
          placeholder={PAYMENT_METHOD_INPUTS.emailPlaceholder}
        />
      </div>
    </div>
  );
});
