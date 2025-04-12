import { ORDER_CANCELED } from 'constants/components/checkout/constants';
import { WARNING } from 'constants/components/message-statuses';
import cancelShipmentsHandler from './cancel-shipments-handler';
import { deleteOrders } from 'dataLayer/checkout/checkout';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

const cancelOrderHandler = (orders, items) => dispatch => {
  deleteOrders(orders)
    .then(() => {
      dispatch(cancelShipmentsHandler(items));
      dispatch(displayMessage(ORDER_CANCELED, WARNING));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export default cancelOrderHandler;
