import {
  ADDRESS_CITY,
  ADDRESS_CITY_LABEL,
  ADDRESS_COUNTRY,
  ADDRESS_COUNTRY_LABEL,
  ADDRESS_LINE_1,
  ADDRESS_LINE_1_LABEL,
  ADDRESS_LINE_2,
  ADDRESS_LINE_2_LABEL,
  ADDRESS_STATE,
  ADDRESS_STATE_LABEL,
  ADDRESS_USER_EMAIL,
  ADDRESS_USER_EMAIL_LABEL,
  ADDRESS_USER_NAME,
  ADDRESS_USER_NAME_LABEL,
  ADDRESS_USER_PHONE,
  ADDRESS_USER_PHONE_LABEL,
  ADDRESS_USER_SURNAME,
  ADDRESS_USER_SURNAME_LABEL,
  ADDRESS_ZIPCODE,
  ADDRESS_ZIPCODE_LABEL,
} from 'constants/components/address/address-form-fields';
import { Field, reduxForm } from 'redux-form';
import {
  email,
  latinic,
  phone,
  required,
} from 'components/reduxForm/validators';

import Dropdown from 'components/reduxForm/dropdown/dropdown';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import ShippingButtons from 'components/cart/checkout-shipping/shipping-buttons';
import styles from './addressInput.module.scss';
import useCountryList from 'hooks/use-country-list';

const ShippingAddressForm = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
})(
  ({
    handleSubmit,
    isDisabled,
    item,
    valid,
    reset,
    confirmShipment,
    cancelShipment,
    removeItemFromShipment,
    calculating,
  }) => {
    const countries = useCountryList();

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.column}>
          <div className={styles.row}>
            <Field
              name={ADDRESS_USER_EMAIL}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_USER_EMAIL_LABEL}
              placeholder="youemailexample@.com"
              validate={[required, latinic, email]}
              required
            />
            <Field
              className={styles.phone_field}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_USER_PHONE_LABEL}
              name={ADDRESS_USER_PHONE}
              phone
              validate={[phone]}
              required
            />
          </div>
          <div className={styles.row}>
            <Field
              name={ADDRESS_USER_NAME}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_USER_NAME_LABEL}
              placeholder={ADDRESS_USER_NAME_LABEL}
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_USER_SURNAME}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_USER_SURNAME_LABEL}
              placeholder={ADDRESS_USER_SURNAME_LABEL}
              validate={[required, latinic]}
              required
            />
          </div>
          <div className={styles.row}>
            <Field
              name={ADDRESS_COUNTRY}
              component={Dropdown}
              list={countries}
              single
              disabled={isDisabled}
              label={ADDRESS_COUNTRY_LABEL}
              placeholder="Country"
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_CITY}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_CITY_LABEL}
              placeholder="City"
              validate={[required, latinic]}
              required
            />
          </div>
          <div className={styles.row}>
            <Field
              name={ADDRESS_STATE}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_STATE_LABEL}
              placeholder="State, province"
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_ZIPCODE}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_ZIPCODE_LABEL}
              placeholder="Postal code"
              validate={[required, latinic]}
              required
            />
          </div>
          <div className={styles.row}>
            <Field
              name={ADDRESS_LINE_1}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_LINE_1_LABEL}
              placeholder="Street address, street number"
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_LINE_2}
              component={Input}
              disabled={isDisabled}
              label={ADDRESS_LINE_2_LABEL}
              placeholder="Apartment, suite, unit, building, floor, etc."
              validate={[latinic]}
            />
          </div>
          <ShippingButtons
            item={item}
            isValid={!valid}
            reset={reset}
            confirmShipment={confirmShipment}
            cancelShipment={cancelShipment}
            removeItemFromShipment={removeItemFromShipment}
            calculating={calculating}
          />
        </div>
      </form>
    );
  }
);

export default ShippingAddressForm;
