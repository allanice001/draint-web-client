import {
  MONTHLY,
  PAY_PAL,
  SEPA,
  SOFORT,
  STRIPE,
  TEST,
  TRIAL_DAYS,
  TRIAL_NAME,
  YEARLY,
} from 'constants/components/pricing';
import {
  handleChangeUserCountry,
  handleCloseSubscribeModal,
  handlePaymentSystem,
  setTrialPlan,
} from 'redux/pricing/actions/pricingActions';
import CheckBox from 'components/reduxForm/checkbox/checkbox';
import FormsComponent from './subscription-modal-layouts/form-components/forms-component';
import MobilePaymentMethodsSelect from './subscription-modal-layouts/mobile-payments-select/mobile-payments-select';
import PaymentMethodsComponent from './subscription-modal-layouts/payment-method-components/payment-methods-component';
import PropTypes from 'prop-types';
import React from 'react';
import SubscriptionWrapperModal from './subscription-modal-wrapper';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handlePayPalPlanSubscription from 'redux/pricing/thunks/handlePayPalPlanSubscription';
import handleStripeCheckout from 'redux/pricing/thunks/handleStripeCheckout';
import handleStripeSubscription from 'redux/pricing/thunks/handleStripePlanSubscription';
import styles from './subscription-modal.module.scss';
import theme from 'config/mui-theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SubscriptionModal = ({
  actions,
  countries,
  pricing,
  emailForm,
  isSignUp,
}) => {
  const {
    modalOpen,
    userCountry,
    checkedPlan,
    paymentSystem,
    checkedPlanPrice,
    planPeriod,
    isTrial,
  } = pricing;

  const paymentSelectionQuery = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.md)
  );
  const isMobile = !paymentSelectionQuery;
  const checkBoxClasses = classNames(styles.checkbox, {
    [styles.checkbox__mobile]: isMobile,
  });

  const handleSubscriptions = (paymentSystem, checkedPlan) => {
    if (checkedPlan === TEST) {
      return handleStripeCartForm();
    }

    switch (paymentSystem) {
      case STRIPE:
        handleStripeCheckout();
        break;
      case SEPA:
        handleStripeSepaForm();
        break;
      case SOFORT:
        handleStripeSofortForm();
        break;
      case PAY_PAL:
        actions.handlePayPalPlanSubscription(isTrial);
        break;
      default:
        actions.displayMessage(
          'Something went wrong, try again later ',
          'error'
        );
        break;
    }
  };

  const handleStripeCartForm = () => {
    const stripe = {};
    if (!userCountry) {
      return actions.displayMessage('Chose your country first', 'error');
    }
    actions.handleStripeSubscription(stripe);
  };

  const handleStripeCheckout = () => {
    actions.handleStripeCheckout('card');
  };

  const handleStripeSepaForm = () => {};

  const handleStripeSofortForm = () => {};

  const getPriceInfo = (checkedPlanPrice, planPeriod, isTrial) => {
    if (checkedPlanPrice !== '' && planPeriod !== '' && !isTrial) {
      const period =
        planPeriod === MONTHLY ? 'month' : planPeriod === YEARLY ? 'year' : '';

      return `Price € ${checkedPlanPrice} /${period}`;
    }

    if (checkedPlanPrice !== '' && planPeriod !== '' && isTrial) {
      const period =
        planPeriod === MONTHLY ? 'month' : planPeriod === YEARLY ? 'year' : '';

      return `Price € ${checkedPlanPrice} /${period} after 14 days`;
    }

    return '';
  };

  function handleTrial(event) {
    const { checked } = event.target;
    actions.setTrialPlan(checked, paymentSystem);
  }

  return (
    <SubscriptionWrapperModal
      disabled={paymentSystem === PAY_PAL && emailForm?.syncErrors}
      handleClose={() => {
        actions.handleCloseSubscribeModal();
        actions.handlePaymentSystem();
      }}
      handleSubscriptions={handleSubscriptions}
      isMobile={isMobile}
      isOpen={modalOpen}
      paymentSystem={paymentSystem}
      price={getPriceInfo(checkedPlanPrice, planPeriod, isTrial)}
      title={checkedPlan}
      isTrial={isTrial}
    >
      {checkedPlan === TEST && (
        <div className={styles.content_wrapper}>
          <div className={styles.select_wrapper}>
            <FormsComponent
              checkedPlan={checkedPlan}
              countries={countries}
              handleChangeUserCountry={actions.handleChangeUserCountry}
              paymentSystem={paymentSystem}
              userCountry={userCountry}
            />
          </div>
        </div>
      )}

      {checkedPlan !== TEST && (
        <div className={styles.content_wrapper}>
          <div className={styles.title_wrapper}>
            <span className={styles.title}>Payment method</span>
            {planPeriod === MONTHLY && isSignUp && (
              <div className={checkBoxClasses}>
                <CheckBox
                  name={TRIAL_NAME}
                  label={TRIAL_DAYS}
                  checked={isTrial}
                  onChange={handleTrial}
                />
              </div>
            )}
          </div>
          <div className={styles.select_wrapper}>
            {/*desktop*/}
            {paymentSelectionQuery && (
              <PaymentMethodsComponent
                handlePaymentSystem={actions.handlePaymentSystem}
                paymentSystem={paymentSystem || STRIPE}
                isTrial={isTrial}
              />
            )}

            {!paymentSelectionQuery &&
              (paymentSystem ? (
                <FormsComponent
                  checkedPlan={checkedPlan}
                  countries={countries}
                  handleChangeUserCountry={actions.handleChangeUserCountry}
                  paymentSystem={paymentSystem}
                  userCountry={userCountry}
                />
              ) : (
                <MobilePaymentMethodsSelect
                  checkedPlan={checkedPlan}
                  handlePaymentSystem={actions.handlePaymentSystem}
                  handleSubscriptions={handleSubscriptions}
                  isTrial={isTrial}
                />
              ))}

            {paymentSelectionQuery && (
              <FormsComponent
                checkedPlan={checkedPlan}
                countries={countries}
                handleChangeUserCountry={actions.handleChangeUserCountry}
                paymentSystem={paymentSystem}
                userCountry={userCountry}
              />
            )}
          </div>
        </div>
      )}
    </SubscriptionWrapperModal>
  );
};

SubscriptionModal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
  countries: PropTypes.arrayOf(PropTypes.any).isRequired,
  emailForm: PropTypes.objectOf(PropTypes.any).isRequired,
  handlePayPalPlanSubscription: PropTypes.func.isRequired,
  handleStripeSubscription: PropTypes.func.isRequired,
  pricing: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      displayMessage,
      handleChangeUserCountry,
      handlePaymentSystem,
      handleCloseSubscribeModal,
      handleStripeCheckout,
      handlePayPalPlanSubscription,
      handleStripeSubscription,
      setTrialPlan,
    },
    dispatch
  ),
});

const mapStateToProps = state => ({
  emailForm: state.form.userEmailInput,
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionModal);
