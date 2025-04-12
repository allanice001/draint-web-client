import { Field, reduxForm } from 'redux-form';
import { email, required } from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import normalizers from 'components/reduxForm/normalizers';
import styles from './signInForm.module.scss';

function SignInForm({
  disabled,
  footer,
  disableTitle,
  handleSubmit,
  valid,
  fetching,
}) {
  return (
    <form className={styles.sign_in_form} onSubmit={handleSubmit}>
      {disableTitle && (
        <div className={styles.head}>
          <h2 className={`group-title ${styles.head__title}`}>
            Sign In to Draint
          </h2>
        </div>
      )}
      <Field
        component={Input}
        disabled={disabled}
        label={false}
        name="email"
        normalize={normalizers.email}
        placeholder="Email"
        type="text"
        validate={[required, email]}
      />
      <Field
        component={Input}
        disabled={disabled}
        label={false}
        name="password"
        placeholder="Password"
        type="password"
        validate={[required]}
      />
      <div className={styles.footer}>{footer}</div>
      <div className={styles.submit_button}>
        <button
          className="primary-button"
          disabled={!valid || fetching}
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'signInForm',
})(SignInForm);
