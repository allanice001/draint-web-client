import {
  CHECK_CURRENT_USER_SUBSCRIPTION,
  CHECK_PAYMENT_INTENT,
  CHECK_STRIPE_CHECKOUT_RESPONSE,
  CHECK_STRIPE_SESSION_DATA,
  CREATE_KLARNA_PAYMENT_INTENT,
  CREATE_KLARNA_SETUP_INTENT,
  CREATE_SEPA_SETUP_INTENT,
  GET_SUBSCRIPTION_STATUS,
  GET_SUBSCRIPTION_STATUS_DATA,
  PAY_PAL_SUBSCRIPTION_PROCESS,
  PREPARE_PAYMENT_INTENT,
  REDIRECT_TO_PAY_PAL,
  REDIRECT_TO_STRIPE_CHECKOUT,
  STRIPE_SUBSCRIPTION_PROCESS,
  UPDATE_CARD_COUNTRY,
} from 'constants/api-calls/pricing/subscriptions';

import axios, { axiosInstance } from 'dataLayer/axiosInstance';

export const getPlansList = () => axios.get('/api/account/plans');

// TODO 'getStripeSubscriptionStatus' old method, need remove later
export const getStripeSubscriptionStatus = () =>
  axios.get(GET_SUBSCRIPTION_STATUS);

export const updateCardCountry = country =>
  axios.put(UPDATE_CARD_COUNTRY, { country });

export const getStripeSubscriptionData = accountId =>
  axios.post(GET_SUBSCRIPTION_STATUS_DATA, {
    accountId,
  });

export const createCheckout = (method, checkedPlanId, email, isTrial) =>
  axios.post(REDIRECT_TO_STRIPE_CHECKOUT, {
    method,
    checkedPlanId,
    email,
    isTrial,
  });

export const checkCheckoutSession = sessionId =>
  axios.post(CHECK_STRIPE_CHECKOUT_RESPONSE, {
    sessionId,
  });

export const checkCurrentUserSubscription = (accountId, selectedPlanId) =>
  axios.get(CHECK_CURRENT_USER_SUBSCRIPTION, {
    params: { accountId, selectedPlanId },
  });

export const checkStripeCheckoutSessionData = accountId =>
  axios.post(CHECK_STRIPE_SESSION_DATA, {
    accountId,
  });

export const stripeSubscriptionProcess = (stripe, checkedPlanId, accountId) =>
  axios.put(STRIPE_SUBSCRIPTION_PROCESS, {
    ...stripe,
    plan: checkedPlanId,
    accountId,
  });

export const createSepaSetupIntentMethod = (accountId, email, method) =>
  axios.post(CREATE_SEPA_SETUP_INTENT, {
    accountId,
    email,
    method,
  });

export const createSofortPaymentIntentMethod = (
  accountId,
  email,
  method,
  planPrice,
  checkedPlanId
) =>
  axios.post(CREATE_KLARNA_PAYMENT_INTENT, {
    accountId,
    email,
    method,
    planPrice,
    checkedPlanId,
  });

export const createSofortSetupIntentMethod = (
  accountId,
  email,
  method,
  planPrice,
  checkedPlanId
) =>
  axios.post(CREATE_KLARNA_SETUP_INTENT, {
    accountId,
    email,
    method,
    planPrice,
    checkedPlanId,
  });

export const preparePaymentIntent = setupIntentId =>
  axios.post(PREPARE_PAYMENT_INTENT, {
    setupIntentId,
  });

export const checkPaymentIntent = paymentIntendId =>
  axios.post(CHECK_PAYMENT_INTENT, {
    paymentIntendId,
  });

// Klarna.Sofort
export const sofortSubscriptionProcess = (
  paymentIntent,
  checkedPlanId,
  accountId
) =>
  axiosInstance(20000).put(STRIPE_SUBSCRIPTION_PROCESS, {
    paymentIntent,
    plan: checkedPlanId,
    accountId,
  });

export const updateCustomerPaymentMethod = (
  setupIntend,
  checkedPlanId,
  accountId
) =>
  axios.put(STRIPE_SUBSCRIPTION_PROCESS, {
    ...setupIntend,
    plan: checkedPlanId,
    accountId,
  });

export const payPalStartSubscriptionProcess = (payPalEmail, selectedPlanId) =>
  axios.post(REDIRECT_TO_PAY_PAL, {
    payPalEmail,
    selectedPlanId,
  });

export const payPalSubscriptionProcess = subscriptionId =>
  axios.post(PAY_PAL_SUBSCRIPTION_PROCESS, {
    subscriptionId,
  });
