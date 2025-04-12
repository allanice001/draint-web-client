import {
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_STATE,
  ADDRESS_ZIPCODE,
} from 'constants/components/address/address-form-fields';
import { change, touch } from 'redux-form';

import { ADDRESS_GET_PLACE } from 'constants/api-calls/pricing/address';
import { ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import AddressFormContent from './address-form-content';
import AddressInput from 'components/reduxForm/address/addressInput';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React from 'react';
import axiosInstanceUnauthorized from 'dataLayer/axiosInstanceUnauthorized';
import { defineAddressParts } from 'services/addressParser';
import updateLocationData from '../../../redux/user/account/actions/updateLocationData';
import { useDispatch } from 'react-redux';

const Settings = require('settings.json');

function AddressFormWrapper({
  isStandard,
  submitCallback,
  disabledSpec = false,
  formName,
  isDisabled,
  withFooter,
  initialValues,
  addressFormContent,
}) {
  const currentFormName = formName || ADDRESS_UPDATE_FORM;
  const dispatch = useDispatch();

  function updateAddressInfo(formData) {
    dispatch(updateLocationData(formData));
  }

  async function suggestionSelect(data) {
    const params = { place_id: data.place_id };
    const place = await axiosInstanceUnauthorized.get(ADDRESS_GET_PLACE, {
      params,
    });
    const addressCollection = defineAddressParts(place.data.address_components);
    const parameters = [
      ADDRESS_LINE_1,
      ADDRESS_LINE_2,
      ADDRESS_CITY,
      ADDRESS_STATE,
      ADDRESS_ZIPCODE,
      ADDRESS_COUNTRY,
    ];
    parameters.forEach(field => {
      dispatch(change(currentFormName, field, addressCollection[field]));
    });
    dispatch(
      touch(
        currentFormName,
        ADDRESS_LINE_1,
        ADDRESS_LINE_2,
        ADDRESS_CITY,
        ADDRESS_STATE,
        ADDRESS_ZIPCODE,
        ADDRESS_COUNTRY
      )
    );
  }

  return (
    <div className="address-change">
      <GooglePlacesAutocomplete
        disabled={isDisabled}
        apiKey={Settings[process.env.NODE_ENV].mapsAPIKey}
        onSelect={suggestionSelect}
        debounce={1000}
        placeholder="Start typing your address here"
        autocompletionRequest={{
          types: ['address'],
        }}
      />
      {addressFormContent ? (
        <AddressFormContent
          onSubmit={submitCallback || updateAddressInfo}
          disabled={disabledSpec}
          withFooter={withFooter}
          initialValues={initialValues}
        />
      ) : (
        <AddressInput
          onSubmit={submitCallback || updateAddressInfo}
          disabled={disabledSpec}
          isStandard={isStandard}
        />
      )}
    </div>
  );
}

export default AddressFormWrapper;
