import { RESET_PASSWORD_CHECK_EMAIL_FORM } from 'constants/components/forms';
import {
  CHECK_EMAIL,
  EMAIL_FIELD,
  ENTER_EMAIL,
  LINK,
  RESET_BUTTON,
  RESET_YOUR_PASSWORD,
} from 'constants/forgot-password';
import { Field, reduxForm } from 'redux-form';
import { email, required } from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import { Link } from 'react-router-dom';
import React from 'react';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { reset } from 'redux-form';
import { resetPasswordEmailRequest } from 'dataLayer/user/userData';
import styles from './auth.module.scss';

const handleResetPassword = (values, dispatch) => {
  resetPasswordEmailRequest(values)
    .then(() => {
      dispatch(displayMessage(CHECK_EMAIL));
      dispatch(reset(RESET_PASSWORD_CHECK_EMAIL_FORM));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

function ForgotPasswordEmailForm({ valid, handleSubmit }) {
  return (
    <div className="container">
      <div className={styles.auth_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.head}>
            <h2 className={`group-title ${styles.head__title}`}>
              {RESET_YOUR_PASSWORD}
            </h2>
          </div>
          <Field
            name={EMAIL_FIELD.name}
            type={EMAIL_FIELD.type}
            placeholder={EMAIL_FIELD.placeholder}
            component={Input}
            validate={[required, email]}
          />
          <div className={styles.footer}>
            <span>{ENTER_EMAIL}</span>
            <span>
              <Link to={LINK.url} alt={LINK.alt}>
                {LINK.title}
              </Link>
            </span>
          </div>
          <div className={styles.submit_button}>
            <button type="submit" className="primary-button" disabled={!valid}>
              {RESET_BUTTON.title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default reduxForm({
  form: RESET_PASSWORD_CHECK_EMAIL_FORM,
  onSubmit: handleResetPassword,
})(ForgotPasswordEmailForm);
