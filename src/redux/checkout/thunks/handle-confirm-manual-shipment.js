import { calculating, updateCheckout } from 'redux/cart/actions/cart-actions';
import {
  getItem,
  prepareNewItems,
  sendConfirmShipmentEvents,
} from 'helpers/shipment/helpers';
import { RATE_FAIL } from 'constants/components/cart/cart';
import { WARNING } from 'constants/components/message-statuses';
import { confirmShipmentManualRequest } from 'dataLayer/shipping/requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

const handleConfirmManualShipment = (
  artwork,
  profileId,
  address,
  items
) => dispatch => {
  dispatch(calculating(true));

  const buyerProfileId = profileId;
  const buyerAddress = address;
  const item = getItem(items, artwork.id);

  confirmShipmentManualRequest(buyerProfileId, buyerAddress, artwork)
    .then(({ data }) => {
      item.shipConfirm = data;
      dispatch(updateCheckout(prepareNewItems(items, artwork)));
      sendConfirmShipmentEvents();
    })
    .catch(() => {
      item.shipError = { shipError: RATE_FAIL };
      dispatch(updateCheckout(prepareNewItems(items, artwork)));
      dispatch(displayMessage(RATE_FAIL, WARNING));
    });
};

export default handleConfirmManualShipment;
