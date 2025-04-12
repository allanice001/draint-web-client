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
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import Input from 'components/reduxForm/input/input';
import { MASTER_ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../address-form/address-form-default.module.scss';
import useCountryList from 'hooks/use-country-list';

const MaterArtistAddressForm = connect(store => ({
  enableReinitialize: true,
  initialValues: {
    ...store.master.currentArtist.location,
  },
}))(
  reduxForm({
    form: MASTER_ADDRESS_UPDATE_FORM,
    enableReinitialize: true,
    destroyOnUnmount: true,
  })(props => {
    const { handleSubmit, loading } = props;
    const countries = useCountryList();

    return (
      <section>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__row}>
            <Field
              name={ADDRESS_COUNTRY}
              component={Dropdown}
              list={countries}
              disabled={loading}
              label={ADDRESS_COUNTRY_LABEL}
              placeholder="Country"
              validate={[required, latinic]}
              single
              required
            />
            <Field
              name={ADDRESS_CITY}
              component={Input}
              disabled={loading}
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
              disabled={loading}
              label={ADDRESS_STATE_LABEL}
              placeholder="State, province"
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_ZIPCODE}
              component={Input}
              disabled={loading}
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
              disabled={loading}
              label={ADDRESS_LINE_1_LABEL}
              placeholder="Street address, street number"
              validate={[required, latinic]}
              required
            />
            <Field
              name={ADDRESS_LINE_2}
              component={Input}
              disabled={loading}
              label={ADDRESS_LINE_2_LABEL}
              placeholder="Apartment, suite, unit, building, floor, etc."
              validate={[latinic]}
            />
          </div>
        </form>
      </section>
    );
  })
);

export default MaterArtistAddressForm;
