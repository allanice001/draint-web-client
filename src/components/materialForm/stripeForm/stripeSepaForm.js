import './stripeSepaForm.scss';

import {
  Elements,
  IbanElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Field, reduxForm } from 'redux-form';
import {
  IBAN_MANDATE_FOR_FUTURE_PAYMENTS,
  SEPA_INTENT,
  TEST,
} from '../../../constants/components/pricing';
import { email, required } from '../../reduxForm/validators';

import Input from '../../reduxForm/input/input';
import React from 'react';
import Settings from '../../../settings.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from '../../../redux/global/notiifcation/actions/displayMessage';
import handleSepaPlanSubscription from '../../../redux/pricing/thunks/handle-sepa-plan-subscription';
import handleSepaSetupIntent from '../../../redux/pricing/thunks/handleSepaSetupIntent';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from 'react-router';

const stripePromise = loadStripe(
  Settings[process.env.NODE_ENV].stripe.publishableAPIKey
);

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

const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend that you pass it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
};

const IbanInputs = connect(state => {
  let userName = '';
  if (state.user.account.first_name && state.user.account.last_name) {
    userName = `${state.user.account.first_name} ${state.user.account.last_name}`;
  }
  return {
    initialValues: {
      client_name: userName,
      client_email: state.user.account.email,
    },
  };
})(
  reduxForm({
    form: 'ibanInputs',
    destroyOnUnmount: true,
  })(() => (
    <div className="iban_inputs_wrapper">
      <div className="iban_input_name">
        <Field
          name="client_name"
          subscription
          component={Input}
          validate={[required]}
          label="Name"
          placeholder="Jenny Rosen"
          // disabled={disabled}
        />
      </div>
      <div className="iban_input_email">
        <Field
          name="client_email"
          subscription
          component={Input}
          validate={[required, email]}
          label="Email address"
          placeholder="jenny.rosen@example.com"
          // disabled={disabled}
        />
      </div>
    </div>
  ))
);

function IbanForm(props) {
  const { pricing } = props;
  return (
    <form onSubmit={props.onSubmit} id="stripe_iban_form">
      <IbanInputs />

      {pricing.checkedPlan !== TEST && (
        <>
          <div className="form-wrapper">
            <label className="label">IBAN</label>
            <IbanElement
              className="iban-element"
              options={IBAN_ELEMENT_OPTIONS}
            />
          </div>

          <div className="mandate-acceptance">
            {IBAN_MANDATE_FOR_FUTURE_PAYMENTS}
          </div>
        </>
      )}
    </form>
  );
}

function PaymentSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const name = props.inputsData?.values.client_name;
    const email = props.inputsData?.values.client_email;
    const iban = elements.getElement(IbanElement);

    if (!props.inputsData?.syncErrors) {
      const clientSecret = await props.handleSepaSetupIntent(SEPA_INTENT);

      if (clientSecret) {
        const sepaIntent = await stripe.confirmSepaDebitSetup(clientSecret, {
          payment_method: {
            sepa_debit: iban,

            billing_details: {
              name,
              email,
            },
          },
        });

        if (sepaIntent?.error) {
          props.displayMessage(sepaIntent?.error.message, 'error');
        } else {
          props.handleSepaPlanSubscription(sepaIntent, history);
        }
      } else {
        props.displayMessage(
          'Something went wrong, please contact Admin',
          'error'
        );
      }
    } else {
      if (props.inputsData?.syncErrors?.client_name) {
        props.displayMessage('Name cannot be empty', 'error');
      }
      if (props.inputsData?.syncErrors?.client_email) {
        if (
          props.inputsData?.syncErrors.client_email ===
          'This field cannot be empty'
        ) {
          props.displayMessage('Email cannot be empty', 'error');
        } else {
          props.displayMessage(
            props.inputsData?.syncErrors.client_email,
            'error'
          );
        }
      }
    }
  };

  return <IbanForm onSubmit={handleSubmit} pricing={props.pricing} />;
}

function StripeSepaForm(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSetupForm
        handleSepaSetupIntent={props.handleSepaSetupIntent}
        handleSepaPlanSubscription={props.handleSepaPlanSubscription}
        displayMessage={props.displayMessage}
        inputsData={props.ibanInputs}
        user={props.user}
        pricing={props.pricing}
      />
    </Elements>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSepaSetupIntent,
      handleSepaPlanSubscription,
      displayMessage,
    },
    dispatch
  );

const mapStateToProps = state => ({
  ibanInputs: state.form.ibanInputs,
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeSepaForm);
