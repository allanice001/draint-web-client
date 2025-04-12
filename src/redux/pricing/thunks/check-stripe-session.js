import { checkStripeCheckoutSessionData } from 'dataLayer/pricing/subscriptons-data';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handleCheckStripeCheckoutSession from './handle-stripe-subscription-checkout-session';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';

const checkStripeSession = (accountId, history) => dispatch => {
  dispatch(setLoadingState(true));
  checkStripeCheckoutSessionData(accountId)
    .then(response => {
      const { transferData } = response.data;
      const sessionId = transferData && transferData.session_id;
      if (transferData && sessionId) {
        return dispatch(handleCheckStripeCheckoutSession(sessionId, history));
      }

      dispatch(setLoadingState(false));
    })
    .catch(error => {
      console.log(error);
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(setLoadingState(false));
    });
};

export default checkStripeSession;
