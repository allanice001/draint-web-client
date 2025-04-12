import './stripeSepaForm.scss';

import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Field, reduxForm } from 'redux-form';
import {
  IBAN_MANDATE_FOR_FUTURE_PAYMENTS,
  SOFORT_INTENT,
} from 'constants/components/pricing';
import { email, required } from 'components/reduxForm/validators';
import {
  handleChangeSofortCountryCode,
  setLoadingState,
} from 'redux/pricing/actions/pricingActions';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import SelectField from 'components/reduxForm/select/select';
import Settings from 'settings.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handleSofortPaymentIntent from 'redux/pricing/thunks/handleSofortPaymentIntent';
import { isoCountriesSofortList } from 'components/countries/isoCountriesSofortList';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../../basic-modal/subscription-modal.module.scss';

const stripePromise = loadStripe(
  Settings[process.env.NODE_ENV].stripe.publishableAPIKey
);

const SofortInputs = connect(state => {
  let userName = '';
  if (state.user.account.first_name && state.user.account.last_name) {
    userName = `${state.user.account.first_name} ${state.user.account.last_name}`;
  }
  return {
    initialValues: {
      client_country: state.pricing.sofortCountryCode,
      client_name: userName,
      client_email: state.user.account.email,
    },
  };
})(
  reduxForm({
    form: 'SofortInputs',
    destroyOnUnmount: true,
  })(props => (
    <div>
      <div className={styles.select_field_wrapper}>
        <Field
          name="client_country"
          subscription
          component={SelectField}
          validate={required}
          label="Your Country"
          onChange={props.handleChangeSofortCountryCode}
          list={isoCountriesSofortList}
          countriesCodes
          userCountry={!!props.pricing.sofortCountryCode}
        />
      </div>
      <div className="iban_inputs_wrapper">
        <div className="iban_input_name">
          <Field
            name="client_name"
            subscription
            component={Input}
            validate={[required]}
            label="Name"
            placeholder="Jenny Rosen"
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
          />
        </div>
      </div>
      <div className="mandate-acceptance">
        {IBAN_MANDATE_FOR_FUTURE_PAYMENTS}
      </div>
    </div>
  ))
);

function SofortForm(props) {
  return (
    <form onSubmit={props.onSubmit} id="stripe_iban_form">
      <SofortInputs
        handleChangeSofortCountryCode={props.handleChangeSofortCountryCode}
        pricing={props.pricing}
      />
    </form>
  );
}

function PaymentSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const planPrice = props.pricing
    ? props.pricing.checkedPlanPrice / 0.01
    : null;
  const checkedPlanId = props.pricing ? props.pricing.checkedPlanId : null;

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const name = props.inputsData?.values?.client_name;
    const email = props.inputsData?.values?.client_email;
    const country = props.inputsData?.values?.client_country;

    if (!props.inputsData?.syncErrors) {
      const clientSecret = await props.handleSofortPaymentIntent(
        SOFORT_INTENT,
        planPrice,
        checkedPlanId
      );

      if (clientSecret) {
        const sofortPayment = await stripe.confirmSofortSetup(clientSecret, {
          payment_method: {
            sofort: {
              country,
            },

            billing_details: {
              name,
              email,
            },
          },

          return_url: `${
            Settings[process.env.NODE_ENV].front_server
          }/sofort/check-payment`,
        });

        if (sofortPayment?.error) {
          props.displayMessage(sofortPayment?.error.message, 'error');
          props.setLoadingState(false);
        }
      } else {
        props.displayMessage(
          'Something went wrong, please contact Admin',
          'error'
        );
        props.setLoadingState(false);
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

  return (
    <SofortForm
      onSubmit={handleSubmit}
      handleChangeSofortCountryCode={props.handleChangeSofortCountryCode}
      pricing={props.pricing}
    />
  );
}

function StripeSofortForm(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSetupForm
        handleSofortPaymentIntent={props.handleSofortPaymentIntent}
        setLoadingState={props.setLoadingState}
        displayMessage={props.displayMessage}
        inputsData={props.sofortInputs}
        user={props.user}
        handleChangeSofortCountryCode={props.handleChangeSofortCountryCode}
        pricing={props.pricing}
        handleCloseSubscribeModal={props.handleCloseSubscribeModal}
      />
    </Elements>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSofortPaymentIntent,
      displayMessage,
      handleChangeSofortCountryCode,
      setLoadingState,
    },
    dispatch
  );

const mapStateToProps = state => ({
  sofortInputs: state.form.SofortInputs,
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeSofortForm);
