import { FETCHED, FETCHING } from 'constants/redux/checkout';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import nextStep from 'redux/checkout/actions/nextStep';
import { prepareOrder } from 'dataLayer/checkout/orders';
import setOrders from 'redux/checkout/actions/setOrders';
import setShippingCost from 'redux/checkout/actions/setShipoCost';
import setStripeToken from './setStripeToken';
import { ERROR } from 'constants/components/message-statuses';

const preparingOrder = (items, paymentSystem) => async (dispatch, getState) => {
  try {
    const state = getState();

    if (paymentSystem.preparePaymentSystem) {
      const paymentData = await paymentSystem.preparePaymentSystem();
      setStripeToken(paymentData);

      const orderData = {
        payment_system: paymentSystem.name,
        buyer: state.user.account.id,
        artworks: items,
        ...paymentData,
        paymentSystem: paymentSystem.getDataForPayment(),
      };

      dispatch({ type: FETCHING });

      prepareOrder(orderData)
        .then(({ data }) => {
          if (data.errorMessage) {
            dispatch({ type: FETCHED });
            return dispatch(
              displayMessage(`Card Error: ${data.errorMessage}`, ERROR)
            );
          }

          dispatch({ type: FETCHED });
          dispatch(setOrders(data.orders));
          dispatch(setShippingCost(data.shippingCost));

          ReactGA.event({
            category: 'Checkout',
            label: 'Order finalized and under buyer review',
            action: 'OrderFinalized',
          });

          ReactPixel.trackCustom('OrderFinalized', {
            content_category: 'Checkout',
            content_name: 'Order finalized and under buyer review',
          });

          dispatch(nextStep());
        })
        .catch(error => {
          dispatch(errorMessageHandler(error));
          dispatch({ type: FETCHED, payload: { fetched_success: false } });
        });
    }
  } catch (error) {
    dispatch(errorMessageHandler(error));
  }
};

export default preparingOrder;
