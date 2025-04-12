import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import Settings from 'settings.json';
import { loadStripe } from '@stripe/stripe-js';

function StripeElement({ children }) {
  const stripePromise = loadStripe(
    Settings[process.env.NODE_ENV].stripe.publishableAPIKey
  );

  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeElement;
