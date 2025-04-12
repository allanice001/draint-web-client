import { CARD, StripeCard } from 'constants/components/payment-methods';

const PaymentMethods = selectedMethod => {
  return [
    {
      disabled: false,
      label: CARD,
      value: StripeCard,
    },
  ];
};

export default PaymentMethods;
