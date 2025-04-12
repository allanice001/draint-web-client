import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

import Settings from '../../../settings.json';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  Settings[process.env.NODE_ENV].stripe.publishableAPIKey,
  { apiVersion: '2020-08-27' }
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    console.log(stripe);
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'DE',
        currency: 'eur',

        total: {
          label: 'Demo total',
          amount: 1099,
        },

        requestPayerName: true,
        requestPayerEmail: true,
      });
      console.log(pr);

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        console.log(result);
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />;
  }

  return (
    <button type="submit" disabled={!stripe}>
      Payment Request Button
    </button>
  );
};

function StripePRButton() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default StripePRButton;
