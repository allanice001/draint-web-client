import {
  CLOSE_SUBSCRIPTION_MODAL,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from 'constants/redux/pricing';

import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { handleTrialPlan } from '../actions/pricingActions';
import { payPalStartSubscriptionProcess } from 'dataLayer/pricing/subscriptons-data';

const handlePayPalPlanSubscription = () => (dispatch, getStore) => {
  const {
    payPalEmail,
    checkedPlanId,
    isTrial,
    checkedPlanTrialId,
  } = getStore().pricing;

  dispatch({ type: SET_LOADING_TRUE });
  dispatch({ type: CLOSE_SUBSCRIPTION_MODAL });

  const selectedPlan = !isTrial ? checkedPlanId : checkedPlanTrialId;

  payPalStartSubscriptionProcess(payPalEmail, selectedPlan)
    .then(({ data }) => {
      dispatch(handleTrialPlan(false));
      window.location.assign(data.baToken);
    })
    .catch(error => {
      dispatch(displayMessage(error.response.data.message, 'warning'));
      dispatch({ type: SET_LOADING_FALSE });
      window.location.assign(PROFILE_GALLERY);
    });
};

export default handlePayPalPlanSubscription;
