import {
  CHECKOUT,
  CHECKOUT_CREATED,
  CHECKOUT_CREATED_EVENT,
  FINALIZE_SUCCESS_MESSAGE,
  GET_CART_ITEMS_COUNT,
  STORAGE_CART_ID_KEY,
} from 'constants/components/checkout';
import { FETCHED, FETCHING, SET_INITIAL_STATE } from 'constants/redux/checkout';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { sendCheckout } from 'dataLayer/checkout/checkout';

const sendCheckoutHandler = (orders, paymentSystem, items) => (
  dispatch,
  getState
) => {
  const buyerProfileId = getState().user.account.profile_id;
  dispatch({ type: FETCHING });

  sendCheckout({ orders, paymentSystem, buyerProfileId })
    .then(() => {
      ReactGA.event({
        category: CHECKOUT,
        label: CHECKOUT_CREATED,
        action: CHECKOUT_CREATED_EVENT,
      });
      ReactPixel.trackCustom(CHECKOUT_CREATED_EVENT, {
        content_category: CHECKOUT,
        content_ids: [items.map(item => item.id)],
        content_name: CHECKOUT_CREATED,
        contents: items,
      });

      localStorage.setItem(STORAGE_CART_ID_KEY, 'null');
      window.Echo.emit(GET_CART_ITEMS_COUNT, { id: localStorage.cartId });
      dispatch({ type: SET_INITIAL_STATE });

      dispatch(displayMessage(FINALIZE_SUCCESS_MESSAGE));
      dispatch({ type: FETCHED });
    })
    .catch(error => {
      dispatch({ type: FETCHED });
      dispatch(errorMessageHandler(error));
    });
};

export default sendCheckoutHandler;
