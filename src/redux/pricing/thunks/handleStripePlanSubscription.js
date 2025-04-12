import {
  getStripeSubscriptionStatus,
  stripeSubscriptionProcess,
  updateCardCountry,
} from 'dataLayer/pricing/subscriptons-data';
import {
  handleCloseSubscribeModal,
  setLoadingState,
} from 'redux/pricing/actions/pricingActions';
import { UNSUBSCRIBE_MESSAGE } from 'constants/components/pricing';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import sendAnalyticsEvents from './send-analytics-event';
import updateSubscriptionData from 'redux/user/account/actions/updateUserPricingSubscription';

const handleStripeSubscription = stripe => (dispatch, getStore) => {
  dispatch(setLoadingState(true));
  dispatch(handleCloseSubscribeModal());

  stripeSubscriptionProcess(
    stripe,
    getStore().pricing.checkedPlanId,
    getStore().user.account.id
  )
    .then(() => {
      const { planId } = getStore().user.account;
      dispatch(updateSubscriptionData());
      dispatch(displayMessage(UNSUBSCRIBE_MESSAGE));
      dispatch(setLoadingState(false));
      updateCardCountry(getStore().pricing.userCountry).then(() => {
        getStripeSubscriptionStatus().then(res => {
          sendAnalyticsEvents(res, getStore().user.account.id, planId);
        });
      });
    })
    .catch(error => {
      dispatch(setLoadingState(false));
      dispatch(errorMessageHandler(error));
    });
};

export default handleStripeSubscription;
