import { Field, reduxForm } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import {
  phone,
  required,
  userNamePattern,
  username,
} from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './collector-profile.module.scss';

const CollectorProfileForm = function({
  handleSubmit,
  loading,
  reset,
  valid,
  change,
}) {
  const { collectorProfileForm } = useSelector(store => store.form);

  function checkChange() {
    return !!(
      collectorProfileForm.initial.first_name ===
        collectorProfileForm.values.first_name &&
      collectorProfileForm.initial.last_name ===
        collectorProfileForm.values.last_name &&
      collectorProfileForm.initial.username ===
        collectorProfileForm.values.username &&
      collectorProfileForm.initial.phone === collectorProfileForm.values.phone
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form__row}>
        <Field
          component={Input}
          disabled={loading}
          label="First Name"
          name="first_name"
          required
          validate={[required]}
        />
        <Field
          component={Input}
          disabled={loading}
          label="Last Name"
          name="last_name"
          required
          validate={[required]}
        />
      </div>
      <div className={styles.form__row}>
        <Field
          component={Input}
          disabled={loading}
          label="Username"
          name="username"
          onChange={(changeEvent, newValue, previousValue, fieldName) => {
            changeEvent.preventDefault();

            if (
              userNamePattern.test(previousValue) ||
              userNamePattern.test(newValue) ||
              newValue.length < previousValue.length
            ) {
              change(fieldName, newValue);
            }
          }}
          required
          validate={[required, username]}
        />
        <Field
          className={styles.form__field}
          component={Input}
          disabled={loading}
          label="Phone"
          name="phone"
          phone
          validate={[phone]}
        />
      </div>

      <div className={styles.form__footer}>
        <button
          className={`secondary-button ${styles.form__button}`}
          onClick={() => {
            reset();
          }}
          type="button"
          disabled={!valid || loading || checkChange()}
        >
          Clear
        </button>

        <button
          className={`primary-button ${styles.form__button}`}
          disabled={!valid || loading || checkChange()}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

function mapStateToProps(state) {
  const { account = {}, loading } = state.user;

  return {
    loading,
    initialValues: account,
  };
}

CollectorProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'collectorProfileForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(CollectorProfileForm)
);
