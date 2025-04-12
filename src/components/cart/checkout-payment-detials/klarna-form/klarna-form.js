import { Field, reduxForm } from 'redux-form';
import React, { useEffect } from 'react';
import {
  email as emailValidator,
  required,
} from '../../../reduxForm/validators';
import {
  setPaymentSystemAccess,
  setPaymentSystemIsFromValid,
} from '../../../../redux/checkout/actions/paymentSystemActions';

import Input from '../../../reduxForm/input/input';
import RadioButton from '../../../reduxForm/radio/radio';
import displayMessage from '../../../../redux/global/notiifcation/actions/displayMessage';
import styles from '../../../../models/paymentSystems/klarna.module.scss';
import { useDispatch } from 'react-redux';

const KlarnaForm = props => {
  const {
    invalid,
    email,
    first_name,
    last_name,
    onFormValuesChange,
    redirect_method,
    hasUserAccess,
    valid,
  } = props;
  const dispatch = useDispatch();
  const methods = [
    {
      label: 'Pay now',
      name: 'pay now',
      value: 'pay_now',
    },
    {
      label: 'Pay later',
      name: 'pay_now',
      value: 'pay_later',
    },
    {
      label: 'Slice it',
      name: 'slice',
      value: 'pay_over_time',
    },
  ];

  useEffect(() => {
    dispatch(setPaymentSystemIsFromValid(valid));
    props.isFormInValidHandleChange(invalid);
  }, [dispatch, invalid, props, valid]);

  useEffect(() => {
    if (!hasUserAccess) {
      dispatch(displayMessage('Klarna not available in you region.', 'error'));
    }
    dispatch(setPaymentSystemAccess(hasUserAccess));
  }, [dispatch, hasUserAccess]);

  return (
    <div>
      <form>
        <div className={styles.name_wrap}>
          <Field
            name="first_name"
            label="First name"
            component={Input}
            validate={[required]}
            value={first_name}
            onChange={(event, newValue, previousValue, name) => {
              onFormValuesChange(name, newValue);
            }}
            required
            disabled={!hasUserAccess}
          />
          <Field
            name="last_name"
            label="Last name"
            component={Input}
            validate={[required]}
            value={last_name}
            onChange={(event, newValue, previousValue, name) => {
              onFormValuesChange(name, newValue);
            }}
            required
            disabled={!hasUserAccess}
          />
        </div>
        <Field
          name="email"
          label="Email"
          required
          value={email}
          component={Input}
          validate={[required, emailValidator]}
          onChange={(event, newValue, previousValue, name) => {
            onFormValuesChange(name, newValue);
          }}
          disabled={!hasUserAccess}
        />
        <Field
          name="redirect_method"
          value={redirect_method}
          onChange={e => {
            props.setRedirectMethod(e.target.value);
          }}
          className={styles.radio_wrap}
          list={methods}
          component={RadioButton}
          disabled={!hasUserAccess}
        />
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'KlarnaForm',
  enableReinitialize: true,
})(KlarnaForm);
