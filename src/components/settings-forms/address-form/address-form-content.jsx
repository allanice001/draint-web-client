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
  ADDRESS_ZIPCODE,
  ADDRESS_ZIPCODE_LABEL,
} from 'constants/components/address/address-form-fields';
import { Field, reduxForm } from 'redux-form';
import { latinic, required } from 'components/reduxForm/validators';

import { ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import styles from './address-form-default.module.scss';
import useCountryList from 'hooks/use-country-list';
import { useSelector } from 'react-redux';

const AddressFormContent = reduxForm({
  form: ADDRESS_UPDATE_FORM,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const { addressUpdateForm } = useSelector(store => store.form);
  const countries = useCountryList();

  function checkChange() {
    return !!(
      addressUpdateForm.initial.country === addressUpdateForm.values.country &&
      addressUpdateForm.initial.city === addressUpdateForm.values.city &&
      addressUpdateForm.initial.state === addressUpdateForm.values.state &&
      addressUpdateForm.initial.zipcode === addressUpdateForm.values.zipcode &&
      addressUpdateForm.initial.addressLine1 ===
        addressUpdateForm.values.addressLine1 &&
      addressUpdateForm.initial.addressLine2 ===
        addressUpdateForm.values.addressLine2
    );
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.form__row}>
        <Field
          name={ADDRESS_COUNTRY}
          component={Dropdown}
          disabled={props.isDisabled}
          list={countries}
          label={ADDRESS_COUNTRY_LABEL}
          placeholder="Country"
          single
          validate={[required, latinic]}
          required
        />
        <Field
          name={ADDRESS_CITY}
          component={Input}
          disabled={props.isDisabled}
          label={ADDRESS_CITY_LABEL}
          placeholder="City"
          validate={[required, latinic]}
          required
        />
      </div>
      <div className={styles.form__row}>
        <Field
          name={ADDRESS_STATE}
          component={Input}
          disabled={props.isDisabled}
          label={ADDRESS_STATE_LABEL}
          placeholder="State, province"
          validate={[required, latinic]}
          required
        />
        <Field
          name={ADDRESS_ZIPCODE}
          component={Input}
          disabled={props.isDisabled}
          label={ADDRESS_ZIPCODE_LABEL}
          placeholder="Postal code"
          validate={[required, latinic]}
          required
        />
      </div>
      <div className={styles.form__row}>
        <Field
          name={ADDRESS_LINE_1}
          component={Input}
          disabled={props.isDisabled}
          label={ADDRESS_LINE_1_LABEL}
          placeholder="Street address, street number"
          validate={[required, latinic]}
          required
        />
        <Field
          name={ADDRESS_LINE_2}
          component={Input}
          disabled={props.isDisabled}
          label={ADDRESS_LINE_2_LABEL}
          placeholder="Apartment, suite, unit, building, floor, etc."
          validate={[latinic]}
        />
      </div>

      {props.withFooter && (
        <div className={styles.form__footer}>
          <button
            disabled={!props.valid || props.isDisabled || checkChange()}
            type="button"
            className={`secondary-button ${styles.form__button}`}
            onClick={props.reset}
          >
            Clear
          </button>
          <button
            type="submit"
            className={`primary-button ${styles.form__button}`}
            disabled={!props.valid || props.isDisabled || checkChange()}
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
});

export default AddressFormContent;
