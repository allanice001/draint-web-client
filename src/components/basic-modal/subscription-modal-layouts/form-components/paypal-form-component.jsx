import { Field, reduxForm } from 'redux-form';
import { email, required } from '../../../reduxForm/validators';

import Input from '../../../reduxForm/input/input';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../../subscription-modal.module.scss';

const PaypalFormComponent = connect(state => ({
  initialValues: {
    email: state.user.account.email,
  },
}))(
  reduxForm({
    form: 'userEmailInput',
    destroyOnUnmount: false,
  })(() => (
    <div className={styles.select_field_wrapper}>
      <Field
        name="email"
        subscription
        component={Input}
        validate={[required, email]}
        label="Email address"
        // disabled={disabled}
      />
    </div>
  ))
);

const mapStateToProps = state => ({
  emailForm: state.form.userEmailInput,
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, null)(PaypalFormComponent);
