import { ERROR, WARNING } from 'constants/components/message-statuses';

import { CANCEL_MESSAGE } from 'constants/components/pricing';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import handleSofortSubscriptionProcess from './handle-sofort-subscription-process';
import { preparePaymentIntent } from 'dataLayer/pricing/subscriptons-data';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';

const handleSofortPlanSubscription = (setupIntentId, history) => dispatch => {
  preparePaymentIntent(setupIntentId)
    .then(response => {
      if (!response.data.setupIntent) {
        dispatch(getUserDataFromStorage());
        return history.push(PROFILE_GALLERY);
      }

      if (response.data.setupIntent.status === 'succeeded') {
        const { setupIntent } = response.data;
        const checkedPlan = setupIntent.metadata.plan;
        const { accountId } = response.data;
        dispatch(setLoadingState(true));

        return dispatch(
          handleSofortSubscriptionProcess(
            setupIntent,
            checkedPlan,
            accountId,
            history
          )
        );
      } else {
        dispatch(displayMessage(CANCEL_MESSAGE, WARNING));

        return history.push(PROFILE_GALLERY);
      }
    })
    .catch(() => {
      history.push(PROFILE_GALLERY);
      dispatch(setLoadingState(false));
      dispatch(displayMessage('Something went wrong', ERROR));
    });
};

export default handleSofortPlanSubscription;
