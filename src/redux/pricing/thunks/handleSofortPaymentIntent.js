import {
  handleCloseSubscribeModal,
  setLoadingState,
} from 'redux/pricing/actions/pricingActions';

import { createSofortSetupIntentMethod } from 'dataLayer/pricing/subscriptons-data';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

const handleSofortPaymentIntent = (method, planPrice, checkedPlanId) => (
  dispatch,
  getStore
) => {
  const accountId = getStore().user.account.id;
  const { email } = getStore().user.account;
  dispatch(handleCloseSubscribeModal());
  dispatch(setLoadingState(true));
  return createSofortSetupIntentMethod(
    accountId,
    email,
    method,
    planPrice,
    checkedPlanId
  )
    .then(res => res.data.clientSecret)
    .catch(() => {
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(setLoadingState(false));
    });
};

export default handleSofortPaymentIntent;
