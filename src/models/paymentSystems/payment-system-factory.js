import StripeCard from './stripe-card';
import StripeKlarna from './klarna';

const paymentMethods = {
  StripeCard,
  StripeKlarna,
};

class PaymentFactory {
  static construct(system, customer) {
    if (paymentMethods[system]) {
      return paymentMethods[system].create(customer);
    }
    return {};
  }
}

export default PaymentFactory;
