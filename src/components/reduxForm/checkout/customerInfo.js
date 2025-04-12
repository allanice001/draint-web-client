import { Field, reduxForm } from 'redux-form';

import Input from '../input/input';
import React from 'react';
import { connect } from 'react-redux';
import { required } from '../validators';
import styles from './customerInfo.module.scss';

let CustomerInfo = props => {
  const { handleSubmit, disabled } = props;

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.title}>Personal info</div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className={styles.field}>
          <Field
            name="first_name"
            component={Input}
            validate={required}
            label="First name"
            disabled={disabled}
            required
          />
        </div>
        <div className={styles.field}>
          <Field
            name="last_name"
            component={Input}
            validate={required}
            label="Last name"
            disabled={disabled}
            required
          />
        </div>
      </form>
    </div>
  );
};

CustomerInfo = reduxForm({
  form: 'customerForm',
  destroyOnUnmount: false,
})(CustomerInfo);

export default CustomerInfo = connect(state => ({
  initialValues: {
    first_name: state.user.account.first_name,
    last_name: state.user.account.last_name,
  },
}))(CustomerInfo);
