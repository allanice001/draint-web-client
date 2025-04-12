import {
  CLEAR_BUTTON_TEXT,
  MAX_NAME_LENGTH,
  SAVE_BUTTON_TEXT,
} from 'constants/global';
import { Field, reduxForm } from 'redux-form';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import {
  phone,
  required,
  userNamePattern,
  username,
} from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import PropTypes from 'prop-types';
import Radio from 'components/reduxForm/radio/radio';
import { SIGN_UP_FORM_USERNAME_ERROR } from 'constants/components/signup-page';
import classnames from 'classnames';
import styles from './profile-form.module.scss';
import userNameCheck from 'services/username-check-service';

const ProfileForm = ({
  handleSubmit,
  reset,
  valid,
  disabled,
  change,
  className,
}) => {
  const [formReset, setFormReset] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const classNames = classnames(styles.section, className);
  const { initial, values, syncErrors, fields } = useSelector(
    store => store.form.profileForm
  );

  function checkChange() {
    return !!(
      initial.first_name === values.first_name &&
      initial.last_name === values.last_name &&
      initial.username === values.username &&
      initial.phone === values.phone &&
      initial.is_username === values.is_username
    );
  }

  const usernameState = {
    value: values.username || '',
    error: syncErrors?.username || '',
    touched: fields?.username?.touched || false,
  };

  useEffect(() => {
    if (values?.username !== initial?.username) {
      userNameCheck(values.username, setIsUsernameTaken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameState.value]);

  return (
    <section className={classNames}>
      <h3 className={`group-title ${styles.title}`}>Your profile settings</h3>

      <form onSubmit={handleSubmit}>
        <Field
          name="is_username"
          component={Radio}
          validate={required}
          list={[
            {
              value: 'name',
              label: 'Show Full name publicly',
            },
            {
              value: 'username',
              label: 'Show Username publicly',
            },
          ]}
        />
        <Field
          validate={[required]}
          className={styles.form__field}
          required
          name="first_name"
          component={Input}
          label="First Name"
          maxLength={MAX_NAME_LENGTH}
          disabled={disabled}
        />
        <Field
          validate={[required]}
          className={styles.form__field}
          required
          name="last_name"
          component={Input}
          label="Last Name"
          maxLength={MAX_NAME_LENGTH}
          disabled={disabled}
        />

        <Field
          validate={[required, username]}
          className={styles.form__field}
          required
          name="username"
          component={Input}
          label="Username"
          maxLength={MAX_NAME_LENGTH}
          errorMessage={isUsernameTaken && SIGN_UP_FORM_USERNAME_ERROR}
          disabled={disabled}
          onChange={(event, newValue, previousValue, name) => {
            event.preventDefault();
            if (
              userNamePattern.test(previousValue) ||
              userNamePattern.test(newValue) ||
              newValue.length < previousValue.length
            ) {
              change(name, newValue);
            }
          }}
        />
        <Field
          validate={[phone]}
          className={styles.form__field}
          name="phone"
          component={Input}
          label="Phone"
          disabled={disabled}
          reset={formReset}
          setReset={setFormReset}
          phone
        />

        <div className={styles.form__footer}>
          <button
            disabled={!valid || disabled || checkChange()}
            type="button"
            className={`secondary-button ${styles.form__button}`}
            onClick={() => {
              setIsUsernameTaken(false);
              reset();
              setFormReset(true);
            }}
          >
            {CLEAR_BUTTON_TEXT}
          </button>

          <button
            type="submit"
            className={`primary-button ${styles.form__button}`}
            disabled={!valid || disabled || isUsernameTaken || checkChange()}
          >
            {SAVE_BUTTON_TEXT}
          </button>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = state => {
  const { account: dashboardAccount, loading } = state.dashboard.settings;
  const { account: userAccount } = state.user;
  const profileForm =
    state.artwork.artworkData.requiredSaleInfoModalForms.profileForm;
  const artworkUpload = state.form.artworkUpload;
  const { ownerInfo } = state.artwork.artworkData.currentArtwork;
  const artistData = state.artist.currentArtist.account;

  function setInitialValues() {
    if (profileForm && !artworkUpload) {
      return {
        accountId: ownerInfo.account_id,
        ...ownerInfo,
      };
    }

    if (profileForm && artworkUpload) {
      return {
        accountId: artistData.id,
        ...artistData,
      };
    }

    if (dashboardAccount?.username) {
      return {
        accountId: dashboardAccount.id,
        ...dashboardAccount,
      };
    }

    if (dashboardAccount) {
      return {
        accountId: userAccount.id,
        ...userAccount,
      };
    }
  }

  return {
    loading,
    initialValues: setInitialValues(),
  };
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(ProfileForm)
);
