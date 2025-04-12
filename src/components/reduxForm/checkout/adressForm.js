import { Field, reduxForm } from 'redux-form';

import React from 'react';
import { connect } from 'react-redux';
import { isoCountries as countries } from '../../countries/list';
import { required } from '../validators';
import selectCountryField from '../fields/selectorCountryField';
import textFormComponent from '../fields/textFields';

let AddressForm = props => {
  const { handleSubmit, disabled = false } = props;
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <Field
            name="country"
            component={selectCountryField}
            validate={required}
            label="Country"
            disabled={disabled}
          >
            {countries.map((country, i) => (
              <option key={i} value={country.ccode}>
                {country.cname}
              </option>
            ))}
          </Field>
          <Field
            name="region"
            component={textFormComponent}
            validate={required}
            label="region"
            disabled={disabled}
          />
          <Field
            name="city"
            component={textFormComponent}
            validate={required}
            label="city"
            disabled={disabled}
          />
          <Field
            name="addressLine1"
            component={textFormComponent}
            validate={required}
            label="Address Line 1"
            disabled={disabled}
          />
          <Field
            name="addressLine2"
            component={textFormComponent}
            label="Address Line 2"
            disabled={disabled}
          />
          <Field
            name="zipcode"
            component={textFormComponent}
            validate={required}
            label="Zip Code"
            disabled={disabled}
          />
        </form>
      </div>
    </div>
  );
};

AddressForm = reduxForm({
  form: 'addressForm',
  destroyOnUnmount: false,
})(AddressForm);

function mapStateToProps(state) {
  if (state.user.account.location) {
    return {
      initialValues: {
        ...state.user.account.location.address,
      },
    };
  }
  return {};
}

export default AddressForm = connect(mapStateToProps)(AddressForm);
