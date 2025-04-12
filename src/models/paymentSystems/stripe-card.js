import CardForm from '../../components/cart/checkout-payment-detials/card-form/card-form';
import React from 'react';

class StripeCard {
  name = 'StripeCard';
  cardholder = '';

  constructor(customer) {
    this.setCartHolderName(customer);
    this.stripeInformationForm = React.createRef();
  }

  static create(customer) {
    return new StripeCard(customer);
  }

  set cardHolderChangeName(value) {
    this.cardholder = value;
  }

  setCartHolderName(customer) {
    if (customer.first_name && customer.last_name) {
      return (this.cardholder = `${customer.first_name} ${customer.last_name}`);
    }

    return (this.cardholder = '');
  }

  get cardHolderName() {
    return this.cardholder;
  }

  preparePaymentSystem = async () => {
    this.stripe = await this.stripeInformationForm.current.stripeForm.current.cardForm.current.wrappedInstance.handleSubmit();
    if (this.stripe.error) throw new Error(this.stripe.error.message);

    return {
      token: this.stripe,
      cardholder: this.cardholder,
    };
  };

  handleRedirect = () => {
    window.location.reload();
  };

  getDataForPayment() {
    return {
      name: this.name,
      data: this.stripe,
    };
  }

  getCheckoutFormDetails = () => {
    return (
      <CardForm
        paymentSystem={this}
        stripeInformationForm={this.stripeInformationForm}
      />
    );
  };
}

export default StripeCard;
