import {
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_STATE,
  ADDRESS_ZIPCODE,
} from 'constants/components/address/address-form-fields';
import { change, touch } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { ADDRESS_GET_PLACE } from 'constants/api-calls/pricing/address';
import { ADDRESS_SHIPPING_FORM } from 'constants/components/forms';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ItemsImage from './items-image';
import RatesSelector from './rates-selector';
import React from 'react';
import ShippingAddressForm from 'components/reduxForm/address/shipping-address-form';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import axiosInstanceUnauthorized from 'dataLayer/axiosInstanceUnauthorized';
import { defineAddressParts } from 'services/addressParser';
import styles from './checkout-shipping-info.module.scss';

const Settings = require('settings.json');

function CheckoutShipping({
  handleRateChange,
  confirmShipment,
  cancelShipment,
  removeItemFromShipment,
  items,
}) {
  const dispatch = useDispatch();

  const { calculating } = useSelector(state => state.cart.cartData);
  const { account } = useSelector(state => state.user);
  const { address } = account.location;

  function getInitialValues() {
    return {
      email: account.email,
      phone: account.phone,
      first_name: account.first_name,
      last_name: account.last_name,
      country: address.country,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
    };
  }

  async function suggestionSelect(form, data) {
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
      dispatch(change(form, field, addressCollection[field]));
    });
    dispatch(
      touch(
        form,
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
    <div className="container">
      {!!!items.length ? (
        <Spinner full />
      ) : (
        <div className={styles.shipping_wrapper}>
          {items.map((item, index) => {
            const form = `${ADDRESS_SHIPPING_FORM}-${item.id}`;
            return (
              <div key={index} className={styles.artwork_wrapper}>
                <div className={styles.info}>
                  <div className={styles.rate_wrapper}>
                    <ItemsImage item={item} />
                    <RatesSelector
                      item={item}
                      handleRateChange={handleRateChange}
                    />
                  </div>
                  <div className={styles.address_selector}>
                    <div className={styles.address_form}>
                      <div className={styles.title}>Ship to</div>
                      <div className={styles.autocomplete}>
                        <GooglePlacesAutocomplete
                          disabled={item.shippingId}
                          apiKey={Settings[process.env.NODE_ENV].mapsAPIKey}
                          onSelect={data => suggestionSelect(form, data)}
                          debounce={1000}
                          placeholder="Start typing your address here"
                          autocompletionRequest={{
                            types: ['address'],
                          }}
                        />
                      </div>
                      <ShippingAddressForm
                        form={form}
                        initialValues={getInitialValues()}
                        isDisabled={item.shippingId}
                        item={item}
                        confirmShipment={confirmShipment}
                        cancelShipment={cancelShipment}
                        removeItemFromShipment={removeItemFromShipment}
                        calculating={calculating}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CheckoutShipping;
