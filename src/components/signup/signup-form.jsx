import { Field, formValueSelector, reduxForm } from 'redux-form';
import {
  INSTAGRAM_LINK_LABEL,
  INSTAGRAM_LINK_PLACEHOLDER,
  SIGN_UP_FORM_EMAIL,
  SIGN_UP_FORM_INSTAGRAM,
  SIGN_UP_FORM_PASSWORD,
  SIGN_UP_FORM_USERNAME,
  SIGN_UP_FORM_USERNAME_ERROR,
} from 'constants/components/signup-page';
import React, { useEffect, useState } from 'react';
import { bool, func, objectOf, string } from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  email,
  instagramUsernameValidator,
  passwordRegExp,
  required,
  username,
  whitespace,
} from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import { MAX_NAME_LENGTH } from 'constants/global';
import { SIGN_UP_FORM } from 'constants/components/forms';
import normalizers from 'components/reduxForm/normalizers';
import { pageScroll } from 'services/pageScroller';
import { sendPermissionToken } from '../../dataLayer/permissions/masterPermissions';
import styles from './signup-form.module.scss';
import { useParams } from 'react-router-dom';
import userEmailCheck from 'services/email-check-service';
import userNameCheck from 'services/username-check-service';

const getSignUpForm = store => store.form.signUpForm;

function SignUpForm({
  handleSubmit,
  isDisabled,
  background,
  values,
  valid,
  setStepValidation,
  isDisabledEmail,
  isArtist,
}) {
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isInvited, setIsInvited] = useState(false);

  const form = useSelector(getSignUpForm);
  const dispatch = useDispatch();
  const { token } = useParams();

  const usernameState = {
    value: values.draint_profile_name || '',
    error: form?.syncErrors?.draint_profile_name || '',
    touched: form?.fields?.draint_profile_name?.touched || false,
  };

  useEffect(() => {
    pageScroll();
    if (token) {
      sendPermissionToken({ token }).then(({ data }) => {
        if (data?.user) {
          for (let value in data.user) {
            dispatch({
              type: '@@redux-form/CHANGE',
              meta: {
                form: 'signUpForm',
                field: value,
                touch: true,
                persistentSubmitErrors: false,
              },
              payload: data.user[value],
            });
          }

          setIsInvited(true);
        }
      });
    }
  }, [dispatch, token]);

  useEffect(() => {
    const isFirstStepValidate = form?.anyTouched && valid && !isUsernameTaken;
    setStepValidation(isFirstStepValidate);
  }, [valid, isUsernameTaken, setStepValidation, form?.anyTouched]);

  useEffect(() => {
    userNameCheck(usernameState.value, setIsUsernameTaken);
  }, [usernameState.value]);

  return (
    <div className={`container ${styles.content_wrapper}`}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <Field
          className={styles.input}
          component={Input}
          disabled={isDisabled}
          endpointClassName={styles.endpoint}
          errorMessage={isUsernameTaken && SIGN_UP_FORM_USERNAME_ERROR}
          label="Draint profile name"
          maxLength={MAX_NAME_LENGTH}
          name={SIGN_UP_FORM_USERNAME}
          required
          validate={[required, username]}
          withStatusIcon
        />
        <Field
          className={styles.input}
          component={Input}
          disabled={isDisabled || isInvited || isDisabledEmail}
          endpointClassName={styles.endpoint}
          label="Email address"
          name={SIGN_UP_FORM_EMAIL}
          normalize={normalizers.email}
          required
          validate={[required, email]}
          withStatusIcon
        />
        <Field
          className={styles.input}
          component={Input}
          disabled={isDisabled}
          endpointClassName={styles.endpoint}
          label="Password"
          name={SIGN_UP_FORM_PASSWORD}
          required
          type="password"
          validate={[required, passwordRegExp]}
          withStatusIcon
        />
        {isArtist && !token && (
          <Field
            className={styles.input}
            component={Input}
            disabled={isDisabled}
            label={INSTAGRAM_LINK_LABEL}
            name={SIGN_UP_FORM_INSTAGRAM}
            placeholder={INSTAGRAM_LINK_PLACEHOLDER}
            validate={[whitespace, instagramUsernameValidator]}
          />
        )}
      </form>
      <div className={styles.image_wrapper}>
        <img alt="background" className={styles.image} src={background} />
      </div>
    </div>
  );
}

SignUpForm.defaultProps = {
  isDisabled: false,
};

SignUpForm.propTypes = {
  background: string.isRequired,
  handleSubmit: func.isRequired,
  isArtist: bool.isRequired,
  isDisabled: bool,
  setStepValidation: func.isRequired,
  valid: bool.isRequired,
  values: objectOf(string).isRequired,
};

function mapStateToProps(state) {
  const selector = formValueSelector(SIGN_UP_FORM);
  return {
    values: selector(
      state,
      SIGN_UP_FORM_USERNAME,
      SIGN_UP_FORM_EMAIL,
      SIGN_UP_FORM_PASSWORD
    ),
  };
}

export default reduxForm({
  form: SIGN_UP_FORM,
  asyncValidate: userEmailCheck,
  asyncChangeFields: [SIGN_UP_FORM_EMAIL, 'token'],
  enableReinitialize: true,
})(connect(mapStateToProps)(SignUpForm));
