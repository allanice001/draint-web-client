import { PAY_PAL, SEPA, SOFORT, STRIPE } from 'constants/components/pricing';

import Icon from 'components/icons';
import React from 'react';

const ICON_SIZE = 128;

const menuSteps = [
  {
    name: 'Stripe Checkout',
    label: <Icon.StripeActive param={ICON_SIZE} />,
    paymentSystem: STRIPE,
  },
  {
    name: 'PayPal',
    label: <Icon.PayPalIconColorActive param={ICON_SIZE} />,
    paymentSystem: PAY_PAL,
  },
  {
    name: 'SEPA Debit',
    label: <Icon.SepaIconActive param={ICON_SIZE} />,
    paymentSystem: SEPA,
  },
  {
    name: 'Klarna Sofort',
    label: <Icon.KlarnaIconActive param={ICON_SIZE} />,
    paymentSystem: SOFORT,
  },
];

const getInitialValue = checkedPayment => {
  let initialValue;

  switch (checkedPayment) {
    case STRIPE:
      initialValue = 0;
      break;
    case PAY_PAL:
      initialValue = 1;
      break;
    case SEPA:
      initialValue = 2;
      break;
    case SOFORT:
      initialValue = 3;
      break;
    default:
      initialValue = 0;
  }
  return initialValue;
};

const exports = {
  menuSteps,
  getInitialValue,
};

export default exports;
