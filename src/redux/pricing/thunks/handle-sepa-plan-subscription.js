import {
  handleCloseSubscribeModal,
  setLoadingState,
} from 'redux/pricing/actions/pricingActions';

import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { SUCCESS_MESSAGE } from 'constants/components/pricing';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { setUserData } from 'redux/user/account/actions/setUserData';
import { signInAfterKlarnaSubscription } from 'dataLayer/user/userData';
import { updateCustomerPaymentMethod } from 'dataLayer/pricing/subscriptons-data';
import updateSubscriptionData from 'redux/user/account/actions/updateUserPricingSubscription';

const handleSepaPlanSubscription = (setupIntend, history) => (
  dispatch,
  getStore
) => {
  const checkedPlan = getStore().pricing.checkedPlanId;
  const planName = getStore().pricing.checkedPlan;
  const accountId = getStore().user.account.id;

  dispatch(setLoadingState(true));
  dispatch(handleCloseSubscribeModal());

  updateCustomerPaymentMethod(setupIntend, checkedPlan, accountId)
    .then(() => {
      signInAfterKlarnaSubscription(accountId)
        .then(({ data }) => {
          if (data.account) {
            dispatch(setUserData(data.account));
            history.push(PROFILE_GALLERY);
            dispatch(updateSubscriptionData());
            dispatch(setLoadingState(false));

            return dispatch(displayMessage(`${SUCCESS_MESSAGE} ${planName}`));
          }

          return dispatch(deleteUserData());
        })
        .catch(() => {
          dispatch(deleteUserData());
        });
    })
    .catch(error => {
      history.push(PROFILE_GALLERY);
      dispatch(setLoadingState(false));
      dispatch(errorMessageHandler(error));
    });
};

export default handleSepaPlanSubscription;
