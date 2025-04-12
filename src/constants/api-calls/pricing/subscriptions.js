export const GET_SUBSCRIPTION_STATUS = '/api/dashboard/subscription';

export const UPDATE_CARD_COUNTRY = '/api/account/card';

export const GET_SUBSCRIPTION_STATUS_DATA =
  '/api/subscriptions/stripe/subscription-status';

export const REDIRECT_TO_STRIPE_CHECKOUT =
  '/api/subscriptions/stripe/create-checkout';

export const CHECK_STRIPE_CHECKOUT_RESPONSE =
  '/api/subscriptions/stripe/check-checkout-session';

export const CHECK_CURRENT_USER_SUBSCRIPTION =
  '/api/subscriptions/check-current-user-subscription';

export const CHECK_STRIPE_SESSION_DATA =
  '/api/subscriptions/stripe/check-stripe-session-data';

export const STRIPE_SUBSCRIPTION_PROCESS = '/api/dashboard/subscription';

export const CREATE_SEPA_SETUP_INTENT =
  '/api/subscriptions/stripe/create-sepa-setup-intent';

export const CREATE_KLARNA_PAYMENT_INTENT =
  '/api/subscriptions/stripe/create-sofort-payment-intent';

export const CREATE_KLARNA_SETUP_INTENT =
  '/api/subscriptions/stripe/create-sofort-setup-intent';

export const PREPARE_PAYMENT_INTENT =
  '/api/subscriptions/stripe/prepare-payment-intent';

export const CHECK_PAYMENT_INTENT =
  '/api/subscriptions/stripe/check-payment-intent';

export const REDIRECT_TO_PAY_PAL =
  '/api/subscriptions/paypalCreateSubscription';

export const PAY_PAL_SUBSCRIPTION_PROCESS =
  '/api/subscriptions/paypalSubscribe';
