import { Field, reduxForm } from 'redux-form';
import React, { useEffect, useState } from 'react';
import {
  SIGN_UP_FORM_EMAIL_ERROR,
  SIGN_UP_FORM_USERNAME_ERROR,
} from 'constants/components/signup-page';
import { useDispatch, useSelector } from 'react-redux';
import {
  email,
  instagramUsernameValidator,
  phone,
  updatePasswordByAdmin,
  username,
} from 'components/reduxForm/validators';
import {
  setEmailTakenActions,
  setUsernameTakenActions,
} from 'redux/master/actions/approvalArtistsActions';

import Input from 'components/reduxForm/input/input';
import { MASTER_SETTINGS_UPDATE_FORM } from 'constants/components/forms';
import userEmailChecked from 'services/templateService/chek-email-admin-accoun-edit';
import userNameCheck from 'services/username-check-service';

const MaterArtistSettingsForm = reduxForm({
  form: MASTER_SETTINGS_UPDATE_FORM,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(props => {
  const { handleSubmit, loading } = props;

  const dispatch = useDispatch();

  const { values } = useSelector(
    store => store.form[MASTER_SETTINGS_UPDATE_FORM]
  );
  const { initial } = useSelector(
    store => store.form[MASTER_SETTINGS_UPDATE_FORM]
  );

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  if (values?.username && values?.username !== initial?.username) {
    userNameCheck(values.username, setIsUsernameTaken);
  }

  if (values?.email !== initial?.email) {
    userEmailChecked(values.email, setIsEmailTaken);
  }

  useEffect(() => {
    dispatch(setUsernameTakenActions(isUsernameTaken));
    dispatch(setEmailTakenActions(isEmailTaken));
  }, [dispatch, isUsernameTaken, isEmailTaken]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Field
          validate={[email]}
          name="email"
          component={Input}
          label="Email"
          disabled={loading}
          errorMessage={isEmailTaken && SIGN_UP_FORM_EMAIL_ERROR}
        />
        <Field
          validate={[username]}
          name="username"
          component={Input}
          label="Username"
          disabled={loading}
          errorMessage={isUsernameTaken && SIGN_UP_FORM_USERNAME_ERROR}
        />
        <Field
          validate={[updatePasswordByAdmin]}
          type="password"
          name="new_password"
          component={Input}
          label="New password"
          disabled={loading}
        />
        <Field
          name="first_name"
          component={Input}
          label="First Name"
          disabled={loading}
        />
        <Field
          name="last_name"
          component={Input}
          label="Last Name"
          disabled={loading}
        />
        <Field
          validate={[instagramUsernameValidator]}
          component={Input}
          name="instagram"
          label="Instagram account name"
          disabled={loading}
        />
        <Field
          validate={[phone]}
          name="phone"
          component={Input}
          label="Phone"
          disabled={loading}
          phone
        />
      </form>
    </section>
  );
});

export default MaterArtistSettingsForm;
