import { createSepaSetupIntentMethod } from 'dataLayer/pricing/subscriptons-data';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';

const handleSepaSetupIntent = method => (dispatch, getStore) => {
  const accountId = getStore().user.account.id;
  const { email } = getStore().user.account;
  dispatch(setLoadingState(true));

  return createSepaSetupIntentMethod(accountId, email, method)
    .then(({ data }) => {
      if (data) {
        const { clientSecret } = data;

        return clientSecret;
      }
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingState(false));
    });
};

export default handleSepaSetupIntent;
