import { ERROR, WARNING } from 'constants/components/message-statuses';
import {
  handleTrialPlan,
  setLoadingState,
} from 'redux/pricing/actions/pricingActions';

import { CLOSE_SUBSCRIPTION_MODAL } from 'constants/redux/pricing';
import Settings from 'settings.json';
import { createCheckout } from 'dataLayer/pricing/subscriptons-data';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  Settings[process.env.NODE_ENV].stripe.publishableAPIKey
);

const handleStripeCheckout = method => async (dispatch, getStore) => {
  const { checkedPlanId, isTrial, checkedPlanTrialId } = getStore().pricing;
  const selectedPlan = !isTrial ? checkedPlanId : checkedPlanTrialId;
  const { email } = getStore().user.account;
  const stripe = await stripePromise;
  dispatch(setLoadingState(true));
  dispatch({ type: CLOSE_SUBSCRIPTION_MODAL });

  createCheckout(method, selectedPlan, email, isTrial)
    .then(async ({ data }) => {
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        dispatch(displayMessage(`${result.error}`, ERROR));
      }

      dispatch(handleTrialPlan(false));
      dispatch(setLoadingState(false));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, WARNING));
      dispatch(handleTrialPlan(false));
      dispatch(setLoadingState(false));
    });
};

export default handleStripeCheckout;
