import { CANCEL_MESSAGE, SUCCESS_MESSAGE } from 'constants/components/pricing';

import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { checkCheckoutSession } from 'dataLayer/pricing/subscriptons-data';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';
import { setUserData } from 'redux/user/account/actions/setUserData';
import { signInAfterSubscription } from 'dataLayer/user/userData';

const handleStripeSubscriptionCheckoutSession = (
  sessionId,
  history
) => dispatch => {
  signInAfterSubscription(sessionId)
    .then(res => {
      if (res.data.account) {
        dispatch(setUserData(res.data.account));

        checkCheckoutSession(sessionId)
          .then(response => {
            dispatch(setLoadingState(true));
            if (response.data.canceled) {
              dispatch(displayMessage(`${CANCEL_MESSAGE}`, 'warning'));
              return history.push(PROFILE_GALLERY);
            }

            const { planName } = response.data;
            dispatch(displayMessage(`${SUCCESS_MESSAGE} ${planName}`));
            dispatch(getUserDataFromStorage());
            history.push(PROFILE_GALLERY);
            dispatch(setLoadingState(false));
          })
          .catch(() => {
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

export default handleStripeSubscriptionCheckoutSession;
