import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { SUCCESS_MESSAGE } from 'constants/components/pricing';
import { checkCheckoutSession } from 'dataLayer/pricing/subscriptons-data';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import { setLoadingFalse } from 'redux/pricing/actions/pricingActions';

const handleCheckStripeCheckoutSession = (sessionId, history) => dispatch => {
  checkCheckoutSession(sessionId)
    .then(response => {
      const { planName } = response.data;
      dispatch(displayMessage(`${SUCCESS_MESSAGE} ${planName}`));
      dispatch(getUserDataFromStorage());
      history.push(PROFILE_GALLERY);
      dispatch(setLoadingFalse());
    })
    .catch(() => {
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(setLoadingFalse());
    });
};

export default handleCheckStripeCheckoutSession;
