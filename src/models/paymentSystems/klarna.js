import KlarnaForm from '../../components/cart/checkout-payment-detials/klarna-form/klarna-form';
import React from 'react';
import displayMessage from '../../redux/global/notiifcation/actions/displayMessage';
import { isoCountry } from '../../components/lib';

class StripeKlarna {
  name = 'StripeKlarna';

  redirect_method = 'pay_now';

  //  Sweden, Norway, Finland, Denmark, Germany, Austria, The Netherlands, Great Britain and the USA.

  countries = ['SE', 'NO', 'FI', 'DK', 'DE', 'AT'];

  isFormInValid = true;

  email = '';

  first_name = '';

  last_name = '';

  hasUserAccess = true;

  address = {};

  constructor(data) {
    if (data) {
      this.first_name = data.first_name || '';
      this.last_name = data.last_name || '';
      this.email = data.email || '';
      this.address = data.address;
      this.hasUserAccess = !!this.countries.includes(
        isoCountry(data.address.country)
      );
    }
  }

  static create(customer) {
    return new StripeKlarna(customer);
  }

  handleRedirect(res) {
    if (res.data.klarna) {
      window.location.href =
        res.data.klarna[`${this.redirect_method}_redirect_url`];
    } else {
      displayMessage('Error occurred. Please, try once more time');
    }
  }

  getDataForPayment() {
    return {
      name: this.name,

      data: {
        customer: {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
        },

        address: this.address,
      },
    };
  }

  handleFormValuesChange = (name, value) => {
    this[name] = value;
  };

  setRedirectMethod = value => {
    this.redirect_method = value;
  };

  isFormInValidHandleChange = value => {
    this.isFormInValid = value;
  };

  getCheckoutFormDetails() {
    return (
      <KlarnaForm
        redirect_method={this.redirect_method}
        setRedirectMethod={this.setRedirectMethod}
        first_name={this.first_name}
        last_name={this.last_name}
        email={this.email}
        onFormValuesChange={this.handleFormValuesChange}
        isFormInValidHandleChange={this.isFormInValidHandleChange}
        initialValues={{
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          redirect_method: this.redirect_method,
        }}
        hasUserAccess={this.hasUserAccess}
      />
    );
  }
}

export default StripeKlarna;
