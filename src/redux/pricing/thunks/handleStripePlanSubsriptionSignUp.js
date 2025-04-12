import {
  CLOSE_SUBSCRIPTION_MODAL,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from 'constants/redux/pricing';
import {
  getStripeSubscriptionStatus,
  stripeSubscriptionProcess,
  updateCardCountry,
} from 'dataLayer/pricing/subscriptons-data';

import displayMessage from '../../global/notiifcation/actions/displayMessage';
import updateSubscriptionData from '../../user/account/actions/updateUserPricingSubscription';

const handleStripeSubscriptionSignUp = stripe => (dispatch, getStore) => {
  dispatch({ type: SET_LOADING_TRUE });
  dispatch({ type: CLOSE_SUBSCRIPTION_MODAL });
  stripeSubscriptionProcess(
    stripe,
    getStore().pricing.checkedPlanId,
    getStore().user.account.id
  )
    .then(() => {
      // console.log('STRIPE', res);
      dispatch(updateSubscriptionData());
      dispatch({ type: SET_LOADING_FALSE });
      dispatch(
        displayMessage(`You have been subscribed to the
    ${getStore().pricing.checkedPlan} plan!`)
      );
      updateCardCountry(getStore().pricing.userCountry).then(() => {
        // console.log('COUNTRY', res);
        getStripeSubscriptionStatus().then(() => {
          // console.log('STATUS', res);
          // sendAnalyticsEvents(res, getStore().pricing.checkedPlan, getStore().user.account.id);

          if (getStore().user.account.permission === 'master') {
            window.location.replace('/master');
          } else {
            window.location.replace('/gallery');
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_LOADING_FALSE });
      dispatch(displayMessage('Something went wrong', 'error'));
    });
};

export default handleStripeSubscriptionSignUp;
