import { Field, reduxForm } from 'redux-form';
import { email, required } from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { SUBSCRIBE_FORM } from 'constants/components/subscribed-artist';

const PersonalSubscribeForm = reduxForm({
  form: SUBSCRIBE_FORM.formName,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  return (
    <form>
      <Field
        component={Input}
        label={SUBSCRIBE_FORM.fieldLabel}
        name={SUBSCRIBE_FORM.fieldName}
        placeholder={SUBSCRIBE_FORM.placeholder}
        validate={[required, email]}
      />
    </form>
  );
});

export default PersonalSubscribeForm;
