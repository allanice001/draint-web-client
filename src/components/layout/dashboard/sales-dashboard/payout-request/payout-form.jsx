import {
  BUTTON_NAME,
  EMAIL,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  METHOD,
  METHOD_LABEL,
} from 'constants/components/payout/payout-form-fielads';
import { Field, reduxForm } from 'redux-form';
import { email, latinic, required } from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import { PAYOUT_FROM } from 'constants/components/forms';
import React from 'react';
import RequestPayoutButton from '../payout-buttons/request-payout-button';
import Select from '../../../../reduxForm/select/select';
import styles from './payout-request.module.scss';

const PayoutForm = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
  form: PAYOUT_FROM,
})(props => {
  function setDisabled() {
    if (props.payoutFrom) {
      if (props.payoutFrom.syncErrors) return true;

      if (!props.payoutFrom.values.email) return true;
    }
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.column}>
        <div className={styles.row}>
          <Field
            name={METHOD}
            label={METHOD_LABEL}
            component={Select}
            list={props.paymentSystems}
          />
        </div>

        <div className={styles.row}>
          <Field
            name={EMAIL}
            component={Input}
            disabled={props.isDisabled}
            label={EMAIL_LABEL}
            placeholder={EMAIL_PLACEHOLDER}
            validate={[required, latinic, email]}
            required
          />
        </div>

        <div className={styles.btn_wrapper}>
          <RequestPayoutButton
            name={BUTTON_NAME}
            senPayoutRequest={props.senPayoutRequest}
            disabled={setDisabled()}
          />
        </div>
      </div>
    </form>
  );
});

export default PayoutForm;
