import { getItem, sendCancelShipmentEvents } from 'helpers/shipment/helpers';
import { ERROR } from 'constants/components/message-statuses';
import { SHIPPING_ERROR } from 'constants/components/checkout/constants';
import { cancelManualShipmentRequest } from 'dataLayer/shipping/requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { prepareNewItems } from 'helpers/shipment/helpers';
import { updateCheckout } from 'redux/cart/actions/cart-actions';

const handleCancelManualConfirmShipment = (artwork, items) => dispatch => {
  const item = getItem(items, artwork.id);
  const shipmentId = item.shippingId;
  const artworkId = artwork.id;

  if (shipmentId && artworkId) {
    cancelManualShipmentRequest(shipmentId, artworkId)
      .then(({ data }) => {
        item.shipConfirmCancel = data;
        dispatch(updateCheckout(prepareNewItems(items, artwork)));

        sendCancelShipmentEvents();
      })
      .catch(() => {
        dispatch(displayMessage(SHIPPING_ERROR, ERROR));
      });
  }
};

export default handleCancelManualConfirmShipment;
