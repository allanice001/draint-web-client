import React from 'react';
import * as FIELDS from 'constants/components/master/shipping-manual-form';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import {
  email,
  latinic,
  phone,
  required,
} from 'components/reduxForm/validators';
import useCountryList from 'hooks/use-country-list';
import styles from './shipping-manual-form.module.scss';

export function FormUserContent({ prefix, isDisabled }) {
  const countries = useCountryList();

  function getFormTitle() {
    switch (prefix) {
      case FIELDS.FROM:
        return FIELDS.FROM_ADDRESS;
      case FIELDS.TO:
        return FIELDS.TO_ADDRESS;
      default:
        return FIELDS.ADDRESS;
    }
  }

  return (
    <div className={styles.column}>
      <h3 className={styles.label}>{getFormTitle()}</h3>
      <div className={styles.row}>
        <Field
          name={`${prefix}${FIELDS.USER_EMAIL}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.USER_EMAIL_LABEL}
          placeholder={FIELDS.USER_EMAIL_HOLDER}
          validate={[required, latinic, email]}
          required
        />
        <Field
          name={`${prefix}${FIELDS.USER_PHONE}`}
          className={styles.phone_field}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.USER_PHONE_LABEL}
          phone
          validate={[phone]}
          required
        />
      </div>
      <div className={styles.row}>
        <Field
          name={`${prefix}${FIELDS.USER_NAME}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.USER_NAME_LABEL}
          placeholder={FIELDS.USER_NAME_HOLDER}
          validate={[required, latinic]}
          required
        />
        <Field
          name={`${prefix}${FIELDS.USER_SURNAME}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.USER_SURNAME_LABEL}
          placeholder={FIELDS.USER_SURNAME_HOLDER}
          validate={[required, latinic]}
          required
        />
      </div>
      <div className={styles.row}>
        <Field
          name={`${prefix}${FIELDS.COUNTRY}`}
          component={Dropdown}
          list={countries}
          single
          disabled={isDisabled}
          label={FIELDS.COUNTRY_LABEL}
          placeholder={FIELDS.COUNTRY_HOLDER}
          validate={[required, latinic]}
          required
        />
        <Field
          name={`${prefix}${FIELDS.CITY}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.CITY_LABEL}
          placeholder={FIELDS.CITY_HOLDER}
          validate={[required, latinic]}
          required
        />
      </div>
      <div className={styles.row}>
        <Field
          name={`${prefix}${FIELDS.STATE}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.STATE_LABEL}
          placeholder={FIELDS.STATE_HOLDER}
          validate={[required, latinic]}
          required
        />
        <Field
          name={`${prefix}${FIELDS.ZIPCODE}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.ZIPCODE_LABEL}
          placeholder={FIELDS.ZIPCODE_HOLDER}
          validate={[required, latinic]}
          required
        />
      </div>
      <div className={styles.row}>
        <Field
          name={`${prefix}${FIELDS.LINE_1}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.LINE_1_LABEL}
          placeholder={FIELDS.LINE_1_HOLDER}
          validate={[required, latinic]}
          required
        />
        <Field
          name={`${prefix}${FIELDS.LINE_2}`}
          component={Input}
          disabled={isDisabled}
          label={FIELDS.LINE_2_LABEL}
          placeholder={FIELDS.LINE_2_HOLDER}
          validate={[latinic]}
        />
      </div>
    </div>
  );
}
