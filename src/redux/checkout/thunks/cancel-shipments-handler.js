import {
  cancelManualShipmentRequest,
  cancelShipmentRequest,
} from 'dataLayer/shipping/requests';
import { DRAINT_RATE } from 'constants/components/checkout/constants';
import { SET_INITIAL_STATE } from 'constants/redux/checkout';
import getCartItemsResponse from 'redux/cart/thunks/get-cart-items-request';

const cancelShipmentsHandler = items => dispatch => {
  items.forEach(item => {
    const artworkId = item.id;
    const shipmentId = item.shippingId;
    const selectedRate = item.selectedRateId;

    if (artworkId && shipmentId) {
      if (selectedRate === DRAINT_RATE) {
        return cancelManualShipmentRequest(shipmentId, artworkId);
      }

      return cancelShipmentRequest(shipmentId, artworkId);
    }
  });

  dispatch({ type: SET_INITIAL_STATE });
  dispatch(getCartItemsResponse());
};

export default cancelShipmentsHandler;
