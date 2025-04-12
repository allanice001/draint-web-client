import { RESET_PASSWORD_FORM } from 'constants/components/forms';
import {
  FORGOT_PASSWORD_ROOT,
  SIGN_IN_ROOT,
} from 'constants/routes/publicModule/auth';
import {
  CONFIRM_PASSWORD_FIELD,
  ENTER_PASSWORD,
  LINK,
  NEW_PASSWORD_FIELD,
  RESET_BUTTON,
  RESET_YOUR_PASSWORD,
  URL_TOKEN,
} from 'constants/forgot-password';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import {
  password,
  passwordRegExp,
  required,
} from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import styles from './auth.module.scss';
import { resetPasswordRequest } from 'dataLayer/user/userData';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

const handleResetPassword = (values, dispatch, props) => {
  const searchQuery = new URLSearchParams(props.location.search);
  const token = searchQuery.get(URL_TOKEN);

  resetPasswordRequest(token, values)
    .then(({ data }) => {
      dispatch(displayMessage(data.message));
      props.history.push(SIGN_IN_ROOT);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      props.history.push(FORGOT_PASSWORD_ROOT);
    });
};

function ResetPasswordForm({ valid, handleSubmit }) {
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
            name={NEW_PASSWORD_FIELD.name}
            type={NEW_PASSWORD_FIELD.type}
            placeholder={NEW_PASSWORD_FIELD.placeholder}
            label={false}
            component={Input}
            validate={[required, passwordRegExp]}
          />
          <Field
            name={CONFIRM_PASSWORD_FIELD.name}
            type={CONFIRM_PASSWORD_FIELD.type}
            placeholder={CONFIRM_PASSWORD_FIELD.placeholder}
            component={Input}
            validate={[required, passwordRegExp]}
          />
          <div className={styles.footer}>
            <span>{ENTER_PASSWORD}</span>
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

export default withRouter(
  reduxForm({
    form: RESET_PASSWORD_FORM,
    onSubmit: handleResetPassword,
    validate: password,
  })(ResetPasswordForm)
);
