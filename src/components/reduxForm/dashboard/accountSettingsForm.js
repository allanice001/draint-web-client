import { Field, reduxForm } from 'redux-form';
import { phone, required } from '../validators';

import { Button } from '@material-ui/core';
import React from 'react';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { connect } from 'react-redux';
import textFormComponent from '../fields/textFields';

let AccountSettingsForm = props => {
  // console.log(props.accountSettingsForm)
  const { Form, handleSubmit, disabled = false } = props;
  if (!Form) return <Spinner />;
  const { syncErrors, anyTouched } = Form;
  const isError = syncErrors && Object.keys(syncErrors).length;
  const handleBtnDisabled = !anyTouched || isError;
  return (
    <form className="password-change" onSubmit={handleSubmit}>
      <Field
        name="first_name"
        component={textFormComponent}
        validate={required}
        label="First Name"
        disabled={disabled}
      />
      <Field
        name="last_name"
        component={textFormComponent}
        validate={required}
        label="Last Name"
        disabled={disabled}
      />
      <Field
        name="username"
        component={textFormComponent}
        validate={required}
        label="Username"
        disabled={disabled}
      />
      <Field
        name="phone"
        component={textFormComponent}
        validate={[required, phone]}
        label="Phone"
        disabled={disabled}
      />
      <Field
        name="instagram"
        component={textFormComponent}
        // validate={required}
        label="Instagram"
        disabled={disabled}
      />
      <Button
        disabled={handleBtnDisabled}
        type="submit"
        variant="contained"
        color="primary"
      >
        Change Account Data
      </Button>
    </form>
  );
};

AccountSettingsForm = reduxForm({
  form: 'accountSettingsForm',
  destroyOnUnmount: false,
})(AccountSettingsForm);

function mapStateToProps(store) {
  if (store.dashboard.settings.account) {
    return {
      Form: store.form.accountSettingsForm,
      enableReinitialize: true,

      initialValues: {
        ...store.dashboard.settings.account,
      },
    };
  }
  return {};
}

export default AccountSettingsForm = connect(mapStateToProps)(
  AccountSettingsForm
);
