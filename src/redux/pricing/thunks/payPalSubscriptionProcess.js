import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { SUCCESS_MESSAGE } from 'constants/components/pricing';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import { payPalSubscriptionProcess } from 'dataLayer/pricing/subscriptons-data';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';
import { setUserData } from 'redux/user/account/actions/setUserData';
import { signInAfterSubscription } from 'dataLayer/user/userData';

const payPalSubscription = (subscriptionId, history) => dispatch => {
  signInAfterSubscription(subscriptionId)
    .then(res => {
      if (res.data.account) {
        dispatch(setUserData(res.data.account));

        payPalSubscriptionProcess(subscriptionId)
          .then(response => {
            dispatch(setLoadingState(true));
            dispatch(
              displayMessage(`${SUCCESS_MESSAGE} ${response.data.planName}`)
            );
            history.push(PROFILE_GALLERY);
            dispatch(getUserDataFromStorage());
            dispatch(setLoadingState(false));
          })
          .catch(() => {
            dispatch(displayMessage('Something went wrong', 'error'));
            history.push(PROFILE_GALLERY);
            dispatch(setLoadingState(false));
          });
      } else {
        return dispatch(deleteUserData());
      }
    })
    .catch(() => {
      dispatch(deleteUserData());
    });
};

export default payPalSubscription;
