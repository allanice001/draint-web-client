import React from 'react';

export const PAY_PAL = 'PayPal';

export const STRIPE = 'Stripe';

export const SEPA = 'Sepa';

export const SOFORT = 'Sofort';

export const TEST = 'Test';

export const ALL_IN_PLAN_NAME = 'All-In-One';

export const ALL_IN_TRIAL_PLAN_NAME = 'All-In-One Trial';

export const BASIC_PLAN_NAME = 'Basic';

export const BASIC_TRIAL_PLAN_NAME = 'Basic Trial';

export const BASIC_YEARLY_PLAN_NAME = 'Basic Yearly';

export const MONTHLY = 'monthly';

export const MONTH = 'month';

export const PER_MONTH = 'p.m ';

export const PER_YEAR = 'year ';

export const YEARLY = 'yearly';

export const YEAR = 'year';

export const ALL_PLANS = 'all';

export const SEPA_INTENT = 'sepa_debit';

export const SOFORT_INTENT = 'sofort';

export const STRIPE_FORM_REF = React.createRef();

export const IBAN_MANDATE_FOR_FUTURE_PAYMENTS = `By providing your payment information and confirming this payment,
                             you authorise (A) Draint GmbH and Stripe, our payment service
                             provider, to send instructions to your bank to debit your account and
                             (B) your bank to debit your account in accordance with those
                             instructions. As part of your rights, you are entitled to a refund
                             from your bank under the terms and conditions of your agreement with
                             your bank. A refund must be claimed within 8 weeks starting from the
                             date on which your account was debited. Your rights are explained in
                             a statement that you can obtain from your bank. You agree to receive
                             notifications for future debits up to 2 days before they occur.`;

export const CANCEL_MODAL_MESSAGE = `You can't downgrade the subscription since there are more than three artworks in
                             your profile. Please, delete some of the artworks so that the total number does not exceed
                             3 artworks`;

export const CANCEL_MESSAGE = 'Subscription process canceled';

export const SUCCESS_MESSAGE =
  'You have been successfully subscribed. Your plan is';

export const ALREADY_SUBSCRIBED = 'You are already subscribed to this plan';

export const SIGN_IN = '/signin';

export const TRIAL_NAME = 'trial_subscription';

export const TRIAL_DAYS = 'Free-Trial (14 days)';

export const FREE_TRIAL = 'Free-Trial';

export const PRICING_HEADER_TITLE = 'Manage your Draint Subscription';

export const PRICING_HEADER_SELECTED_PLAN_TITLE = 'Your current plan: ';

export const PRICING_HEADER_WITHOUT_PLAN = 'No plan selected';

export const PRICING_HEADER_CANCEL_BUTTON_NAME = 'Cancel your plan';

export const PRICING_FOOTER_POLICY_LINK = '/legal/Refund Policy';

export const PRICING_FOOTER_POLICY_TITLE = 'Refund Policy Page';

export const PRICING_FOOTER_THREE_MONTH =
  '* Three months of minimum runtime. Then downgrade at any time.';

export const PRICING_FOOTER_NINE_MONTH =
  ' ** Nine months of minimum runtime. Then downgrade at any time.';

export const SUBSCRIBE = 'Subscribe';

export const GO_UP = 'Go Up';

export const GO_DOWN = 'Go Down';

export const YOUR_PLAN = 'Your Plan';

export const FAIR_PRICING = 'Fair Pricing';

export const GROW_WITH_US = 'Grow with Us';

export const UNSUBSCRIBE_MESSAGE = 'Your plan was successfully canceled';

export const CARD_PM = 'card';

export const DEBIT_PM = 'sepa_debit';

export const CARD_ELEMENT_OPTIONS = {
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
      color: '#f44336',
    },
  },
};

export const STRIPE_PM_CARD_FORM = 'stripe_pm_card_form';

export const STRIPE_PM_SEPA_DEBIT_FORM = 'stripe_pm_sepa_debit_form';

export const BUTTON_SUBMIT = 'submit';

export const ROW_IBAN = 'IBAN';

export const ROW_CARD_NUMBER = 'Card number';

export const ROW_DATE = 'MM/YY';

export const ROW_CVC = 'CVC';

export const PM_MODAL_TITLE = 'Payment details';

const IBAN_STYLE = {
  base: {
    color: '#424770',
    fontSize: '16px',
    fontFamily: 'Open Sans, sans-serif',
    fontSmoothing: 'antialiased',
    letterSpacing: '0.025em',

    '::placeholder': {
      color: '#aab7c4',
    },

    ':-webkit-autofill': {
      color: '#424770',
    },
  },

  invalid: {
    color: '#c23d4b',
    iconColor: '#c23d4b',

    ':-webkit-autofill': {
      color: '#c23d4b',
    },
  },
};

export const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
};

export const PAYMENT_METHOD_INPUTS = {
  formName: 'payment_method_inputs',
  nameInput: 'name',
  namePlaceholder: 'Jenny Rosen',
  nameLabel: 'Name',
  emailInput: 'email',
  emailPlaceholder: 'jenny.rosen@example.com',
  emailLabel: 'Email address',
};

export const PM_MODAL_CONFIRM_BTN = 'Confirm';

export const PM_DETAIL_BTN = 'Change method';

export const PM_TITLE = 'Payment details';

export const PM_SUB_TITLE = 'Payment method';

export const SKELETON_WAVE = 'wave';
