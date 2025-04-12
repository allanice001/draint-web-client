import {
  handleOpenSubscribeModal,
  setLoadingFalse,
} from 'redux/pricing/actions/pricingActions';
import { ALREADY_SUBSCRIBED } from 'constants/components/pricing';
import { WARNING } from 'constants/components/message-statuses';
import { checkCurrentUserSubscription } from 'dataLayer/pricing/subscriptons-data';
import checkSubscriptionCancelDate from 'redux/pricing/thunks/check-subscription-cancel-date';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';

const checkCurrentSubscription = (
  accountId,
  selectedPlan,
  mode
) => dispatch => {
  checkCurrentUserSubscription(accountId, selectedPlan.id)
    .then(response => {
      const { subscribed } = response.data;

      if (subscribed) {
        dispatch(getUserDataFromStorage());

        return dispatch(displayMessage(ALREADY_SUBSCRIBED, WARNING));
      }

      if (mode) {
        dispatch(setLoadingFalse());

        return dispatch(handleOpenSubscribeModal(selectedPlan));
      }

      dispatch(setLoadingFalse());
      dispatch(checkSubscriptionCancelDate(selectedPlan));
    })
    .catch(error => {
      dispatch(setLoadingFalse());
      dispatch(errorMessageHandler(error));
    });
};

export default checkCurrentSubscription;
