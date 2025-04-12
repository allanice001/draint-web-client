import { Field, reduxForm } from 'redux-form';
import {
  changePassword,
  passwordRegExp,
  required,
} from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import styles from './password-form.module.scss';

const PasswordForm = props => {
  const { handleSubmit, valid, disabled } = props;

  return (
    <section className={styles.section}>
      <h3 className={`group-title ${styles.title}`}>Password change</h3>

      <form onSubmit={handleSubmit}>
        <Field
          name="old_password"
          type="password"
          className={styles.form__field}
          validate={[required, passwordRegExp]}
          required
          component={Input}
          label="Old password"
          disabled={disabled}
        />
        <Field
          className={styles.form__field}
          validate={[required, passwordRegExp]}
          type="password"
          required
          name="new_password"
          component={Input}
          label="New password"
          disabled={disabled}
        />
        <Field
          className={styles.form__field}
          validate={[required, passwordRegExp]}
          type="password"
          required
          name="confirm_password"
          component={Input}
          label="Confirm password"
          disabled={disabled}
        />

        <div className={styles.form__footer}>
          <button
            type="submit"
            className={`primary-button ${styles.form__button}`}
            disabled={!valid || disabled}
          >
            Change password
          </button>
        </div>
      </form>
    </section>
  );
};

export default reduxForm({ form: 'passwordForm', validate: changePassword })(
  PasswordForm
);
