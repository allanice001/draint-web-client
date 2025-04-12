import {
  CHECKOUT_CONFIRMATION_STEP,
  PAYMENT_INFO_STEP,
  SHIPPING_INFO_STEP,
} from 'constants/components/checkout';
import CheckoutShipping from 'components/cart/checkout-shipping/checkout-shipping';
import CheckoutPaymentDetails from 'components/cart/checkout-payment-detials/checkout-payment-detials';
import CheckoutConfirmation from 'components/cart/checkout-confirmation/checkout-confirmation';
import { pageScroll } from 'services/pageScroller';
import PaymentFactory from 'models/paymentSystems/payment-system-factory';
import React from 'react';

export function CheckoutContent({
  step,
  items,
  removeItemFromShipment,
  confirmShipment,
  cancelShipment,
  handleRateChange,
  paymentSystem,
  selectedPaymentMethod,
  user,
  setPaymentSystem,
  handlePaymentMethodChange,
}) {
  switch (step) {
    case SHIPPING_INFO_STEP:
      return (
        <CheckoutShipping
          items={items}
          removeItemFromShipment={removeItemFromShipment}
          confirmShipment={confirmShipment}
          cancelShipment={cancelShipment}
          handleRateChange={handleRateChange}
        />
      );
    case PAYMENT_INFO_STEP:
      pageScroll();
      if (!Object.keys(paymentSystem).length) {
        const paymentSystem = PaymentFactory.construct(
          selectedPaymentMethod,
          user
        );
        setPaymentSystem(paymentSystem);
      }
      return (
        <CheckoutPaymentDetails
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
          paymentSystem={paymentSystem}
        />
      );
    case CHECKOUT_CONFIRMATION_STEP:
      return <CheckoutConfirmation cartItems={items} user={user} />;
    default:
      return 'Unknown step';
  }
}
