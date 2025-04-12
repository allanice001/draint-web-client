import './checkout.scss';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

const EMPTY_FIELD = 'This field cannot be empty';
const DIGIT_FIELD = 'This field can only be digital.';

export default class AddressInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      address,
      handleAddressChange,
      handleEmptyFields,
      emptyFields,
      notNumbers = {},
    } = this.props;
    return (
      <div id="checkout-material-wrapper">
        <div className="form-wrapper">
          <FormControl variant="outlined" error={emptyFields.country}>
            <InputLabel htmlFor="country">Country</InputLabel>
            <OutlinedInput
              id="country"
              aria-describedby="country_helper"
              type="text"
              labelWidth={50}
              onChange={handleAddressChange}
              onBlur={handleEmptyFields}
              value={address.country}
            />
            <FormHelperText id="country_helper">
              {emptyFields.country && EMPTY_FIELD}
            </FormHelperText>
          </FormControl>

          <FormControl variant="outlined" error={emptyFields.region}>
            <InputLabel htmlFor="state">State</InputLabel>
            <OutlinedInput
              id="state"
              aria-describedby="region_helper"
              type="text"
              labelWidth={40}
              onBlur={handleEmptyFields}
              onChange={handleAddressChange}
              value={address.state}
            />
            <FormHelperText id="region_helper">
              {emptyFields.state && EMPTY_FIELD}
            </FormHelperText>
          </FormControl>

          <FormControl variant="outlined" error={emptyFields.city}>
            <InputLabel htmlFor="city">City</InputLabel>
            <OutlinedInput
              id="city"
              aria-describedby="city_helper"
              type="text"
              labelWidth={21}
              onBlur={handleEmptyFields}
              onChange={handleAddressChange}
              value={address.city}
            />
            <FormHelperText id="city_helper">
              {emptyFields.city && EMPTY_FIELD}
            </FormHelperText>
          </FormControl>

          <FormControl variant="outlined" error={emptyFields.addressLine1}>
            <InputLabel htmlFor="addressLine1">Address Line 1</InputLabel>
            <OutlinedInput
              id="addressLine1"
              aria-describedby="street_helper"
              type="text"
              labelWidth={85}
              onBlur={handleEmptyFields}
              onChange={handleAddressChange}
              value={address.addressLine1}
            />
            <FormHelperText id="street_helper">
              {emptyFields.addressLine1 && EMPTY_FIELD}
            </FormHelperText>
          </FormControl>

          <FormControl variant="outlined" error={emptyFields.addressLine2}>
            <InputLabel htmlFor="addressLine2">Address Line 2</InputLabel>
            <OutlinedInput
              id="addressLine2"
              aria-describedby="street_helper"
              type="text"
              labelWidth={85}
              onBlur={handleEmptyFields}
              onChange={handleAddressChange}
              value={address.addressLine2}
            />
            <FormHelperText id="street_helper">
              {emptyFields.addressLine2 && EMPTY_FIELD}
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="outlined"
            error={emptyFields.zipcode || notNumbers.zipcode}
          >
            <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
            <OutlinedInput
              id="zipcode"
              aria-describedby="zip_code_helper"
              type="text"
              labelWidth={48}
              onBlur={handleEmptyFields}
              onChange={handleAddressChange}
              value={address.zipcode}
            />
            <FormHelperText id="zip_code_helper">
              {emptyFields.zipcode
                ? EMPTY_FIELD
                : notNumbers.zipcode
                ? DIGIT_FIELD
                : ''}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    );
  }
}
