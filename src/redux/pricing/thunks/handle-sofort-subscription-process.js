import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { SUCCESS_MESSAGE } from 'constants/components/pricing';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';
import { setUserData } from 'redux/user/account/actions/setUserData';
import { signInAfterKlarnaSubscription } from 'dataLayer/user/userData';
import { sofortSubscriptionProcess } from 'dataLayer/pricing/subscriptons-data';

const handleSofortSubscriptionProcess = (
  setupIntent,
  checkedPlan,
  accountId,
  history
) => dispatch => {
  sofortSubscriptionProcess(setupIntent, checkedPlan, accountId)
    .then(subscription => {
      signInAfterKlarnaSubscription(accountId)
        .then(({ data }) => {
          if (data.account) {
            dispatch(setUserData(data.account));
            dispatch(setLoadingState(true));
            const { planName } = subscription.data;
            dispatch(displayMessage(`${SUCCESS_MESSAGE} ${planName}`));
            history.push(PROFILE_GALLERY);
            dispatch(getUserDataFromStorage());

            return dispatch(setLoadingState(false));
          }

          return dispatch(deleteUserData());
        })
        .catch(() => {
          dispatch(deleteUserData());
        });
    })
    .catch(error => {
      history.push(PROFILE_GALLERY);
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingState(false));
    });
};

export default handleSofortSubscriptionProcess;
