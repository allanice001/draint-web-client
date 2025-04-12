import { ERROR } from 'constants/components/message-statuses';
import { SHIPPING_ERROR } from 'constants/components/checkout/constants';
import { cancelManualShipmentRequest } from 'dataLayer/shipping/requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { sendCancelShipmentEvents } from 'helpers/shipment/helpers';
import { setOfferCheckout } from 'redux/artwork/actions/artworkActions';

const handleCancelManualOfferShipment = artwork => dispatch => {
  const shipmentId = artwork.shippingId;
  const artworkId = artwork.id;

  if (shipmentId && artworkId) {
    cancelManualShipmentRequest(shipmentId, artworkId)
      .then(({ data }) => {
        const { offerPrice } = artwork;

        dispatch(
          setOfferCheckout({
            ...artwork,
            shipConfirmCancel: data,
            shippingId: '',
            shipConfirm: {},
            calculatedRate: [],
            selectedAddress: {},
            totalCost: offerPrice,
          })
        );

        sendCancelShipmentEvents();
      })
      .catch(() => {
        dispatch(displayMessage(SHIPPING_ERROR, ERROR));
      });
  }
};

export default handleCancelManualOfferShipment;
