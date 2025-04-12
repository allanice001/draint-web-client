import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getUserCurrentSubscriptionPlan } from 'dataLayer/user/userData';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';
import { setUserCurrentSubscription } from 'redux/user/account/actions/setUserData';

const setUserCurrentPlan = accountId => dispatch => {
  dispatch(setLoadingState(true));
  getUserCurrentSubscriptionPlan(accountId)
    .then(response => {
      dispatch(setUserCurrentSubscription(response.data));
      dispatch(setLoadingState(false));
    })
    .catch(() => {
      dispatch(setLoadingState(false));
      dispatch(displayMessage('Current plan error', 'error'));
    });
};

export default setUserCurrentPlan;
