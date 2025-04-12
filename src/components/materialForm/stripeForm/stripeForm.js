import './stripeForm.scss';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  StripeProvider,
  injectStripe,
} from 'react-stripe-elements';
import React, { Component } from 'react';

import Settings from '../../../settings.json';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Open Sans, sans-serif',
      fontSmoothing: 'antialiased',
      letterSpacing: '0.025em',

      '::placeholder': {
        color: '#aab7c4',
      },
    },

    invalid: {
      color: '#c23d4b',
    },
  },
});

class _CardForm extends Component {
  state = {
    errorMessageNumber: '',
    errorMessageExpiry: '',
    errorMessageCvc: '',
    focusedNumber: false,
    focusedExpiry: false,
    focusedCvc: false,
    completeNumber: false,
    completeExpiry: false,
    completeCvc: false,
  };

  handleChange = async e => {
    if (e.error) {
      if (e.elementType === 'cardNumber') {
        this.setState({ errorMessageNumber: e.error.message });
      } else if (e.elementType === 'cardExpiry') {
        this.setState({ errorMessageExpiry: e.error.message });
      } else if (e.elementType === 'cardCvc') {
        this.setState({ errorMessageCvc: e.error.message });
      }
    } else if (e.elementType === 'cardNumber') {
      this.setState({ errorMessageNumber: '' });
    } else if (e.elementType === 'cardExpiry') {
      this.setState({ errorMessageExpiry: '' });
    } else if (e.elementType === 'cardCvc') {
      this.setState({ errorMessageCvc: '' });
    }

    if (e.elementType === 'cardNumber') {
      this.setState({ completeNumber: e.complete });
    } else if (e.elementType === 'cardExpiry') {
      this.setState({ completeExpiry: e.complete });
    } else if (e.elementType === 'cardCvc') {
      this.setState({ completeCvc: e.complete });
    }
  };

  handleFocus = e => {
    if (e.elementType === 'cardNumber') {
      this.setState({ focusedNumber: true });
    } else if (e.elementType === 'cardExpiry') {
      this.setState({ focusedExpiry: true });
    } else if (e.elementType === 'cardCvc') {
      this.setState({ focusedCvc: true });
    }
  };

  handleBlur = e => {
    if (e.elementType === 'cardNumber') {
      this.setState({ focusedNumber: false });
    } else if (e.elementType === 'cardExpiry') {
      this.setState({ focusedExpiry: false });
    } else if (e.elementType === 'cardCvc') {
      this.setState({ focusedCvc: false });
    }
  };

  handleSubmit = async () => {
    if (this.props.stripe) {
      // eslint-disable-next-line no-return-await
      return await this.props.stripe.createToken();
    }
    console.log("Stripe.js hasn't loaded yet.");
  };

  render() {
    return (
      <div id="stripe-form-wrapper">
        <form>
          <div className="inputs-wrapper">
            <div className="number-wrapper">
              <div className="title">Card number</div>
              <div
                className={
                  this.state.errorMessageNumber
                    ? 'stripe-form-error-number'
                    : this.state.focusedNumber || this.state.completeNumber
                    ? 'stripe-form-number-focused'
                    : 'stripe-form-number'
                }
              >
                <CardNumberElement
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  {...createOptions()}
                />
              </div>
            </div>
            <div className="date-wrapper">
              <div className="title">MM/YY</div>
              <div
                className={
                  this.state.errorMessageExpiry
                    ? 'stripe-form-error-date'
                    : this.state.focusedExpiry || this.state.completeExpiry
                    ? 'stripe-form-date-focused'
                    : 'stripe-form-date'
                }
              >
                <CardExpiryElement
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  {...createOptions()}
                />
              </div>
            </div>
            <div className="cvc-wrapper">
              <div className="title">CVC</div>
              <div
                className={
                  this.state.errorMessageCvc
                    ? 'stripe-form-error-csv'
                    : this.state.focusedCvc || this.state.completeCvc
                    ? 'stripe-form-csv-focused'
                    : 'stripe-form-csv'
                }
              >
                <CardCvcElement
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  {...createOptions()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm, { withRef: true });

export default class StripeForm extends Component {
  constructor(props) {
    super(props);
    this.cardForm = React.createRef();
  }

  render() {
    return (
      <StripeProvider
        apiKey={Settings[process.env.NODE_ENV].stripePayments.publishableAPIKey}
      >
        <Elements>
          <CardForm
            ref={this.cardForm}
            handleResult={this.props.handleResult}
          />
        </Elements>
      </StripeProvider>
    );
  }
}
