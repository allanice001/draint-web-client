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

import AddressFormWrapper from 'components/settings-forms/address-form/address-form-wrapper';
import Input from 'components/reduxForm/input/input';
import { MASTER_ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import React from 'react';
import { connect } from 'socket.io-client';

const MaterArtistAddressForm = connect(store => ({
  enableReinitialize: true,
  initialValues: {
    ...store.master.currentArtist.location,
  },
}))(
  reduxForm({
    form: 'materArtistAddressForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(props => (
    <AddressFormWrapper
      isDisabled={props.isDisabled}
      formName={MASTER_ADDRESS_UPDATE_FORM}
      FormComponent={() => (
        <form onSubmit={props.handleSubmit}>
          <Field
            name={ADDRESS_COUNTRY}
            component={Input}
            disabled={props.isDisabled}
            label={ADDRESS_COUNTRY_LABEL}
            placeholder="Country"
            validate={[required, latinic]}
            required
          />
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
            name={ADDRESS_CITY}
            component={Input}
            disabled={props.isDisabled}
            label={ADDRESS_CITY_LABEL}
            placeholder="City"
            validate={[required, latinic]}
            required
          />
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
          <Field
            name={ADDRESS_ZIPCODE}
            component={Input}
            disabled={props.isDisabled}
            label={ADDRESS_ZIPCODE_LABEL}
            placeholder="Postal code"
            validate={[required, latinic]}
            required
          />
        </form>
      )}
    />
  ))
);

export default MaterArtistAddressForm;
