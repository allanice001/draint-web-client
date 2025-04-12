import '../signUp.scss';

import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';
import React, { useEffect } from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import autofillDisabler from 'services/autofillDisabler';
import styles from './address-information.module.scss';

const Settings = require('settings.json');

const EMPTY_FIELD = 'This field cannot be empty';
const DIGIT_FIELD = 'This field can only be digital.';
const LATIN_FIELD = 'Address data should contain only latin letters';
const PLACEHOLDER = <span>&nbsp;</span>;

export default function AddressInformation(props) {
  const {
    address,
    handleAddressChange,
    emptyFields,
    cyrillicFields,
    notNumbers,
    onSuggestSelect,
  } = props;

  useEffect(() => {
    autofillDisabler('.container', 'input');
  });

  // console.log(notNumbers);
  // console.log(notNumbers.addressLine2);

  return (
    <div className="container">
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <FormControl className={styles.input__wrapper} variant="outlined">
            <div className={styles.input__label}>Suggest Address</div>
            <GooglePlacesAutocomplete
              inputClassName={styles.input}
              suggestionsClassNames={{ container: styles.input__suggest }}
              apiKey={Settings[process.env.NODE_ENV].mapsAPIKey}
              onSelect={onSuggestSelect}
              debounce={1000}
              placeholder="Start typing address here for autofill..."
              autocompletionRequest={{
                types: ['address'],
              }}
            />
          </FormControl>

          <FormControl
            variant="outlined"
            className={styles.input__wrapper}
            error={emptyFields.country || cyrillicFields.country_cyr}
          >
            <div className={styles.input__label}>Country</div>
            <OutlinedInput
              id="country"
              aria-describedby="country_helper"
              placeholder="ex. United States"
              type="text"
              onChange={handleAddressChange}
              value={address.country}
            />
            {(emptyFields.country || cyrillicFields.country_cyr) && (
              <FormHelperText id="country_helper">
                {emptyFields.country
                  ? EMPTY_FIELD
                  : cyrillicFields.country_cyr
                  ? LATIN_FIELD
                  : PLACEHOLDER}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={emptyFields.state || cyrillicFields.region_cyr}
          >
            <div className={styles.input__label}>Region</div>
            <OutlinedInput
              id="state"
              aria-describedby="state_helper"
              type="text"
              onChange={handleAddressChange}
              placeholder="ex. Region"
              value={address.state}
            />
            {(emptyFields.state || cyrillicFields.region_cyr) && (
              <FormHelperText id="state_helper">
                {emptyFields.state
                  ? EMPTY_FIELD
                  : cyrillicFields.state_cyr
                  ? LATIN_FIELD
                  : PLACEHOLDER}
              </FormHelperText>
            )}
          </FormControl>
        </div>

        <div className={styles.content}>
          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={emptyFields.city || cyrillicFields.city_cyr}
          >
            <div className={styles.input__label}>City</div>
            <OutlinedInput
              id="city"
              aria-describedby="city_helper"
              type="text"
              placeholder="ex. New York"
              onChange={handleAddressChange}
              value={address.city}
              className={styles.input}
            />
            {(emptyFields.city || cyrillicFields.city_cyr) && (
              <FormHelperText id="city_helper">
                {emptyFields.city
                  ? EMPTY_FIELD
                  : cyrillicFields.city_cyr
                  ? LATIN_FIELD
                  : PLACEHOLDER}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={emptyFields.addressLine1 || cyrillicFields.addressLine1_cyr}
          >
            <div className={styles.input__label}>Address Line 1</div>
            <OutlinedInput
              id="addressLine1"
              aria-describedby="addressLine1_helper"
              type="text"
              placeholder="ex. 5th Avenue"
              onChange={handleAddressChange}
              value={address.addressLine1}
            />
            {(emptyFields.addressLine1 || cyrillicFields.addressLine1_cyr) && (
              <FormHelperText id="addressLine1">
                {emptyFields.addressLine1
                  ? EMPTY_FIELD
                  : cyrillicFields.addressLine1_cyr
                  ? LATIN_FIELD
                  : PLACEHOLDER}
              </FormHelperText>
            )}
          </FormControl>

          <div className={styles.subfield__wrapper}>
            <FormControl
              className={styles.subfield}
              variant="outlined"
              error={
                emptyFields.addressLine2 || cyrillicFields.addressLine2_cyr
              }
            >
              <div className={styles.input__label}>Address Line 2</div>
              <OutlinedInput
                id="addressLine2"
                aria-describedby="addressLine2_helper"
                type="text"
                placeholder="ex. 10"
                onChange={handleAddressChange}
                value={address.addressLine2}
                className={styles.input}
              />
              {(emptyFields.addressLine2 ||
                cyrillicFields.addressLine2_cyr) && (
                <FormHelperText id="addressLine2">
                  {emptyFields.addressLine2
                    ? EMPTY_FIELD
                    : cyrillicFields.addressLine2_cyr
                    ? LATIN_FIELD
                    : notNumbers.addressLine2
                    ? DIGIT_FIELD
                    : PLACEHOLDER}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="outlined"
              className={styles.zip}
              error={emptyFields.zipcode || notNumbers.zipcode}
            >
              <div className={styles.input__label}>Zip code</div>
              <OutlinedInput
                id="zipcode"
                aria-describedby="zip_code_helper"
                type="text"
                placeholder="ex. 10001"
                onChange={handleAddressChange}
                value={address.zipcode}
              />
              {(emptyFields.zipcode || notNumbers.zipcode) && (
                <FormHelperText id="zip_code_helper">
                  {emptyFields.zipcode
                    ? EMPTY_FIELD
                    : notNumbers.zipcode
                    ? DIGIT_FIELD
                    : PLACEHOLDER}
                </FormHelperText>
              )}
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
