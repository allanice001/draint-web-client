import { Field, reduxForm } from 'redux-form';

import { Button } from '@material-ui/core';
import React from 'react';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { connect } from 'react-redux';
import { required } from '../validators';
import textFormComponent from '../fields/textFields';

let AccountPasswordForm = props => {
  const { Form, handleSubmit, disabled = false } = props;
  if (!Form) return <Spinner />;
  const { syncErrors, anyTouched } = Form;
  const isError = syncErrors && Object.keys(syncErrors).length;
  const handleBtnDisabled = !anyTouched || isError;
  return (
    <form className="password-change" onSubmit={handleSubmit}>
      <Field
        type="password"
        name="oldpassword"
        component={textFormComponent}
        validate={required}
        label="Old Password"
        disabled={disabled}
      />
      <Field
        type="password"
        name="newpassword"
        component={textFormComponent}
        validate={required}
        label="New Password"
        disabled={disabled}
      />
      <Button
        disabled={handleBtnDisabled}
        type="submit"
        variant="contained"
        color="primary"
      >
        Change Password
      </Button>
    </form>
  );
};

AccountPasswordForm = reduxForm({
  form: 'accountPasswordForm',
  destroyOnUnmount: false,

  onSubmitSuccess: (result, dispatch, props) => {
    props.reset();
  },
})(AccountPasswordForm);

function mapStateToProps(store) {
  if (store.dashboard.settings.account) {
    return {
      Form: store.form.accountPasswordForm,
      enableReinitialize: true,

      initialValues: {
        ...store.dashboard.settings.account,
      },
    };
  }
  return {};
}

export default AccountPasswordForm = connect(mapStateToProps)(
  AccountPasswordForm
);
